import { PDFDocument, rgb, degrees, StandardFonts, PDFTextField, PDFCheckBox, PDFRadioGroup, PDFDropdown, PDFOptionList } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { Document, Packer, Paragraph, TextRun } from "docx";
import JSZip from 'jszip';

// Set worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const getPDFDocument = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument(arrayBuffer);
    return await loadingTask.promise;
};

// ... [Existing Export Functions] ...
// I will rewrite the file to include everything plus the new helper.
// To avoid accidentally deleting 400 lines of code, I'll be careful to include it all.

export const generateThumbnail = async (file) => {
    try {
        const pdf = await getPDFDocument(file);
        return await getPageThumbnail(pdf, 1);
    } catch (error) {
        console.error("Error generating thumbnail:", error);
        return { thumbnail: null, numPages: 0 };
    }
};

export const getPageThumbnail = async (pdfOrFile, pageNumber) => {
    try {
        let pdf = pdfOrFile;
        if (pdfOrFile instanceof File || pdfOrFile instanceof Blob) {
            pdf = await getPDFDocument(pdfOrFile);
        }

        const page = await pdf.getPage(pageNumber);
        const scale = 1.0;
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
            canvasContext: context,
            viewport: viewport
        }).promise;

        return {
            thumbnail: canvas.toDataURL(),
            numPages: pdf.numPages,
            originalWidth: viewport.width,
            originalHeight: viewport.height,
            pdfDoc: pdf // Return the pdfjs doc for further use if needed
        };
    } catch (error) {
        console.error("Error getting page thumbnail", error);
        return { thumbnail: null, numPages: 0 };
    }
}

// NEW FUNCTION: Extract text with coordinates for "True Edit" mode - Grouped by Blocks
export const getPageTextCheck = async (file, pageIndex) => {
    try {
        const pdf = await getPDFDocument(file);
        const page = await pdf.getPage(pageIndex + 1);
        const viewport = page.getViewport({ scale: 1.0 });
        const textContent = await page.getTextContent();
        const styles = textContent.styles; // Get styles dictionary

        const rawItems = textContent.items.map(item => {
            const tx = pdfjsLib.Util.transform(viewport.transform, item.transform);
            const fontHeight = Math.sqrt((item.transform[2] * item.transform[2]) + (item.transform[3] * item.transform[3]));
            const width = item.width ? item.width * (viewport.scale) : 0;

            // Resolve Font Name
            let fontName = item.fontName;
            if (styles && styles[fontName]) {
                fontName = styles[fontName].fontFamily;
            }

            return {
                str: item.str,
                x: tx[4],
                y: tx[5] - fontHeight,
                width: width,
                height: fontHeight,
                normX: tx[4] / viewport.width,
                normY: (tx[5] - fontHeight) / viewport.height,
                normWidth: width / viewport.width,
                normHeight: fontHeight / viewport.height,
                fontSize: fontHeight,
                fontName: fontName, // Real font family name
                dir: item.dir,
                transform: item.transform
            };
        });

        // Group into Blocks (Paragraphs)
        const blocks = [];
        // Sort by Y (top to bottom), then X
        rawItems.sort((a, b) => {
            if (Math.abs(a.y - b.y) > 10) return a.y - b.y;
            return a.x - b.x;
        });

        let currentBlock = null;

        rawItems.forEach(item => {
            if (!currentBlock) {
                currentBlock = {
                    ...item,
                    fontSize: item.fontSize,
                    fontName: item.fontName,
                    items: [item]
                };
                return;
            }

            const prevItem = currentBlock.items[currentBlock.items.length - 1];
            const lineHeight = Math.max(item.height, prevItem.height);

            const isSameLine = Math.abs(item.y - prevItem.y) < lineHeight * 0.5;
            const isNextLine = Math.abs(item.y - prevItem.y) < lineHeight * 3 && Math.abs(item.y - prevItem.y) > lineHeight * 0.1;

            // Horizontal proximity check: Close enough to be same word or next word
            const isHorizontalClose = (item.x - (prevItem.x + prevItem.width)) < lineHeight * 1.5;

            // Font consistency check (allow small variance)
            const sameFontSize = Math.abs(item.fontSize - currentBlock.fontSize) < 4;
            const sameFont = item.fontName === currentBlock.fontName;

            if (sameFontSize && sameFont && ((isSameLine && isHorizontalClose) || (isNextLine && Math.abs(item.x - currentBlock.x) < 50))) {
                currentBlock.items.push(item);
                // Smart join: detect if space is needed? PDF text often has separate items for letters or words.
                // Simple heuristic: if x gap > small_threshold, add space
                const gap = item.x - (prevItem.x + prevItem.width);
                const separator = (isNextLine) ? '\n' : (gap > 2 ? ' ' : '');

                currentBlock.str += separator + item.str;

                const rightEdge = Math.max(currentBlock.x + currentBlock.width, item.x + item.width);
                currentBlock.width = rightEdge - currentBlock.x;

                const bottomEdge = Math.max(currentBlock.y + currentBlock.height, item.y + item.height);
                currentBlock.height = bottomEdge - currentBlock.y;

                currentBlock.normWidth = currentBlock.width / viewport.width;
                currentBlock.normHeight = currentBlock.height / viewport.height;
            } else {
                blocks.push(currentBlock);
                currentBlock = { ...item, items: [item] };
            }
        });
        if (currentBlock) blocks.push(currentBlock);

        return blocks.map(block => ({
            text: block.str,
            x: block.x / viewport.width,
            y: (viewport.height - (block.y + block.height)) / viewport.height,
            normWidth: block.width / viewport.width,
            normHeight: block.height / viewport.height,
            fontSize: block.fontSize,
            fontName: block.fontName,
            hasEOL: block.hasEOL
        }));
    } catch (error) {
        console.error("Error extracting text", error);
        return [];
    }
};

export const extractPages = async (file, pageIndices) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    const newPdf = await PDFDocument.create();

    const copiedPages = await newPdf.copyPages(pdfDoc, pageIndices);
    copiedPages.forEach((page) => newPdf.addPage(page));

    const pdfBytes = await newPdf.save();
    return new Blob([pdfBytes], { type: 'application/pdf' });
};

export const compressPDF = async (file, qualityLevel = 'recommended') => {
    const settings = {
        extreme: { scale: 0.8, quality: 0.4 },
        recommended: { scale: 1.0, quality: 0.7 },
        less: { scale: 1.0, quality: 0.9 }
    };

    const { scale, quality } = settings[qualityLevel] || settings.recommended;
    const arrayBuffer = await file.arrayBuffer();
    const pdfToLoad = await getPDFDocument(file);
    const numPages = pdfToLoad.numPages;

    const newPdf = await PDFDocument.create();

    for (let i = 1; i <= numPages; i++) {
        const page = await pdfToLoad.getPage(i);
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
            canvasContext: context,
            viewport: viewport
        }).promise;

        const imgDataUrl = canvas.toDataURL('image/jpeg', quality);
        const imgBytes = await fetch(imgDataUrl).then((res) => res.arrayBuffer());

        const jpgImage = await newPdf.embedJpg(imgBytes);
        const jpgDims = jpgImage.scale(1 / scale);

        const newPage = newPdf.addPage([jpgDims.width * scale, jpgDims.height * scale]);
        newPage.setSize(jpgDims.width, jpgDims.height);
        newPage.drawImage(jpgImage, {
            x: 0,
            y: 0,
            width: jpgDims.width,
            height: jpgDims.height,
        });
    }

    const pdfBytes = await newPdf.save();
    return new Blob([pdfBytes], { type: 'application/pdf' });
};

export const convertPDFToWord = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await getPDFDocument(file);
    const numPages = pdf.numPages;

    const doc = new Document({
        sections: [],
    });

    const children = [];

    for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const items = textContent.items.map(item => ({
            str: item.str,
            x: item.transform[4],
            y: item.transform[5],
            hasEOL: item.hasEOL
        }));

        items.sort((a, b) => {
            if (Math.abs(a.y - b.y) > 5) {
                return b.y - a.y;
            }
            return a.x - b.x;
        });

        let currentLineY = -1;
        let currentLineText = [];

        items.forEach((item) => {
            if (currentLineY === -1) currentLineY = item.y;

            if (Math.abs(item.y - currentLineY) > 5) {
                children.push(new Paragraph({
                    children: [new TextRun(currentLineText.join(" "))]
                }));
                currentLineText = [];
                currentLineY = item.y;
            }
            currentLineText.push(item.str);
        });

        if (currentLineText.length > 0) {
            children.push(new Paragraph({
                children: [new TextRun(currentLineText.join(" "))]
            }));
        }
    }

    doc.addSection({
        properties: {},
        children: children,
    });

    const blob = await Packer.toBlob(doc);
    return blob;
};

export const mergePDFs = async (files) => {
    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const pdfBytes = await mergedPdf.save();
    return new Blob([pdfBytes], { type: 'application/pdf' });
};

export const protectPDF = async (file, password) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

    pdfDoc.encrypt({
        userPassword: password,
        ownerPassword: password,
        permissions: {
            printing: 'highResolution',
            modifying: false,
            copying: false,
            annotating: false,
            fillingForms: false,
            contentAccessibility: false,
            documentAssembly: false,
        },
    });

    const pdfBytes = await pdfDoc.save();
    return new Blob([pdfBytes], { type: 'application/pdf' });
};

// ─── Error Helper ────────────────────────────────────────────────────
const createTypedError = (message, code) => {
    const err = new Error(message);
    err.code = code;
    return err;
};

// ─── PDF Header Validation ──────────────────────────────────────────
const isValidPDFHeader = (arrayBuffer) => {
    if (arrayBuffer.byteLength < 5) return false;
    const header = new Uint8Array(arrayBuffer, 0, 5);
    // %PDF- = [0x25, 0x50, 0x44, 0x46, 0x2D]
    return header[0] === 0x25 && header[1] === 0x50 &&
        header[2] === 0x44 && header[3] === 0x46 && header[4] === 0x2D;
};

// ─── Encryption Detection ────────────────────────────────────────────
/**
 * Scans raw PDF bytes to determine the encryption scheme.
 * Returns { isEncrypted, algorithm, keyLength, version, revision }.
 *
 * Limitations:
 *   - Regex-based: can misidentify /V or /R from non-encrypt dictionaries
 *     in edge cases. This is a best-effort heuristic used to pick the
 *     optimal unlock path, not a security gate. PDF.js is the final
 *     authority on whether the password is correct.
 */
export const detectEncryption = (arrayBuffer) => {
    const result = {
        isEncrypted: false,
        algorithm: 'none',    // 'none' | 'RC4' | 'AES-128' | 'AES-256' | 'unknown'
        keyLength: 0,
        version: 0,           // /V value
        revision: 0,          // /R value
    };

    try {
        const bytes = new Uint8Array(arrayBuffer);
        const len = bytes.length;

        // Search up to 16 KB from head and tail, or entire file if smaller
        const searchSize = Math.min(len, 16384);
        const head = bytes.slice(0, searchSize);
        const tail = len > searchSize
            ? bytes.slice(Math.max(0, len - searchSize))
            : new Uint8Array(0); // already covered by head

        const decoder = new TextDecoder('latin1');
        const textToSearch = decoder.decode(head) + decoder.decode(tail);

        // Check for /Encrypt reference
        if (!(/\/Encrypt\b/.test(textToSearch))) {
            return result; // Not encrypted
        }
        result.isEncrypted = true;

        // Extract /V (encryption version)
        const vMatch = textToSearch.match(/\/V\s+(\d+)/);
        if (vMatch) result.version = parseInt(vMatch[1], 10);

        // Extract /R (revision)
        const rMatch = textToSearch.match(/\/R\s+(\d+)/);
        if (rMatch) result.revision = parseInt(rMatch[1], 10);

        // Extract /Length — but ONLY near /Filter /Standard context
        // to avoid matching stream /Length values
        const encryptBlock = textToSearch.match(
            /\/Filter\s*\/Standard[^>]{0,500}/s
        );
        if (encryptBlock) {
            const lengthMatch = encryptBlock[0].match(/\/Length\s+(\d+)/);
            if (lengthMatch) {
                const val = parseInt(lengthMatch[1], 10);
                // Encryption key lengths are 40–256 bits; stream lengths are much larger
                if (val >= 40 && val <= 256) {
                    result.keyLength = val;
                }
            }
        }

        // Determine algorithm from V
        // V=0/1 → RC4 40-bit, V=2 → RC4 128-bit, V=4 → AES-128 or RC4, V=5 → AES-256
        if (result.version <= 2) {
            result.algorithm = 'RC4';
            if (!result.keyLength) {
                result.keyLength = result.version <= 1 ? 40 : 128;
            }
        } else if (result.version === 4) {
            // V=4 can be AES-128 or RC4-128 depending on /CFM
            const cfmMatch = textToSearch.match(/\/CFM\s*\/(\w+)/);
            if (cfmMatch && cfmMatch[1] === 'AESV2') {
                result.algorithm = 'AES-128';
                result.keyLength = 128;
            } else {
                result.algorithm = 'RC4';
                result.keyLength = 128;
            }
        } else if (result.version === 5) {
            result.algorithm = 'AES-256';
            result.keyLength = 256;
        } else {
            result.algorithm = 'unknown';
        }
    } catch {
        result.isEncrypted = true;
        result.algorithm = 'unknown';
    }

    return result;
};

// ─── PDF.js Fallback Unlock (handles AES-256) ────────────────────────
/**
 * Uses pdfjs-dist to decrypt the PDF (it supports AES-256), renders each
 * page to canvas, and re-embeds images into a new pdf-lib document.
 * Output is rasterized (lossy) but the unlock is reliable.
 *
 * Safeguards:
 *   - MAX_PAGES (50) to prevent memory exhaustion
 *   - Reduced scale on mobile (1.5× vs 2.0×)
 *   - canvas.toBlob() instead of toDataURL to avoid base64 overhead
 *   - Canvas refs nulled after each page for GC
 */
const MAX_UNLOCK_PAGES = 50;

const unlockWithPdfJs = async (arrayBuffer, password) => {
    const loadingTask = pdfjsLib.getDocument({
        data: arrayBuffer,
        password: password,
    });

    let pdf;
    try {
        pdf = await loadingTask.promise;
    } catch (pdfJsError) {
        const msg = pdfJsError?.message || '';
        if (msg.includes('Incorrect') || msg.includes('password')) {
            throw createTypedError('The password you entered is incorrect.', 'WRONG_PASSWORD');
        }
        if (msg.includes('Invalid PDF') || msg.includes('stream')) {
            throw createTypedError('The PDF file appears to be damaged or corrupted.', 'CORRUPT_FILE');
        }
        throw createTypedError('Failed to process this PDF: ' + msg, 'UNKNOWN');
    }

    const numPages = pdf.numPages;
    if (numPages > MAX_UNLOCK_PAGES) {
        throw createTypedError(
            `This PDF has ${numPages} pages. In-browser unlock is limited to ${MAX_UNLOCK_PAGES} pages. ` +
            'Please use a smaller file or try the server-side unlock.',
            'TOO_MANY_PAGES'
        );
    }

    const newPdf = await PDFDocument.create();

    // Detect mobile: reduce scale to save memory
    const isMobile = typeof navigator !== 'undefined' && navigator.maxTouchPoints > 1;
    const RENDER_SCALE = isMobile ? 1.5 : 2.0;

    for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: RENDER_SCALE });

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: ctx, viewport }).promise;

        // Use toBlob → arrayBuffer (avoids 33% base64 overhead of toDataURL)
        const imgBytes = await new Promise((resolve, reject) => {
            canvas.toBlob(
                (blob) => {
                    if (!blob) return reject(new Error('Canvas toBlob returned null'));
                    blob.arrayBuffer().then(resolve).catch(reject);
                },
                'image/jpeg',
                0.92
            );
        });

        // Release canvas memory immediately
        canvas.width = 0;
        canvas.height = 0;

        const jpgImage = await newPdf.embedJpg(imgBytes);
        const origWidth = viewport.width / RENDER_SCALE;
        const origHeight = viewport.height / RENDER_SCALE;
        const newPage = newPdf.addPage([origWidth, origHeight]);
        newPage.drawImage(jpgImage, {
            x: 0,
            y: 0,
            width: origWidth,
            height: origHeight,
        });
    }

    const pdfBytes = await newPdf.save();
    return new Blob([pdfBytes], { type: 'application/pdf' });
};

// ─── Main Unlock Orchestrator ────────────────────────────────────────
/**
 * Production-ready PDF unlock with tiered strategy:
 *   1. Validate file (header, size)
 *   2. Detect encryption type
 *   3. RC4 → try pdf-lib (lossless, preserves vectors)
 *   4. AES / fallback → PDF.js render pipeline (lossy but reliable)
 *
 * Returns: { blob: Blob, method: string, lossless: boolean }
 *
 * Thrown errors always have a `.code` property:
 *   WRONG_PASSWORD | NOT_ENCRYPTED | CORRUPT_FILE |
 *   TOO_MANY_PAGES | UNKNOWN
 */
export const unlockPDF = async (file, password) => {
    // ── Read file ──
    let rawBuffer;
    try {
        rawBuffer = await file.arrayBuffer();
    } catch {
        throw createTypedError('Could not read the uploaded file.', 'CORRUPT_FILE');
    }

    // ── Validate header ──
    if (rawBuffer.byteLength < 64 || !isValidPDFHeader(rawBuffer)) {
        throw createTypedError(
            'This file is not a valid PDF document.',
            'CORRUPT_FILE'
        );
    }

    // ── Single defensive clone — all consumers use this ──
    const buffer = rawBuffer.slice(0);

    // ── Step 1: Detect encryption ──
    const encryption = detectEncryption(buffer);

    if (!encryption.isEncrypted) {
        throw createTypedError(
            'This PDF is not password-protected.',
            'NOT_ENCRYPTED'
        );
    }

    const trimmedPassword = (password || '').trim();

    // ── Step 2: Try pdf-lib for RC4 (lossless) ──
    if (encryption.algorithm === 'RC4') {
        try {
            const pdfDoc = await PDFDocument.load(buffer.slice(0), {
                password: trimmedPassword,
            });
            const pdfBytes = await pdfDoc.save();
            return {
                blob: new Blob([pdfBytes], { type: 'application/pdf' }),
                method: 'pdf-lib',
                lossless: true,
            };
        } catch (pdfLibError) {
            // Inspect error: if it's clearly a wrong password, fail fast
            // instead of wasting time on the PDF.js fallback
            const msg = (pdfLibError?.message || '').toLowerCase();
            if (msg.includes('password') || msg.includes('decrypt')) {
                throw createTypedError(
                    'The password you entered is incorrect.',
                    'WRONG_PASSWORD'
                );
            }
            // Other pdf-lib failure (corrupt xref, unsupported feature) →
            // fall through to PDF.js
        }
    }

    // ── Step 3: PDF.js fallback (AES-128, AES-256, or RC4 edge cases) ──
    const blob = await unlockWithPdfJs(buffer.slice(0), trimmedPassword);
    return {
        blob,
        method: 'pdfjs',
        lossless: false,
    };
};

export const rotatePDF = async (file, rotations) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    const pages = pdfDoc.getPages();

    Object.keys(rotations).forEach(pageIndex => {
        const page = pages[parseInt(pageIndex)];
        if (page) {
            page.setRotation(degrees(rotations[pageIndex]));
        }
    });

    const pdfBytes = await pdfDoc.save();
    return new Blob([pdfBytes], { type: 'application/pdf' });
};

export const pdfToImages = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await getPDFDocument(file);
    const numPages = pdf.numPages;
    const zip = new JSZip();

    for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const scale = 2.0;
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
            canvasContext: context,
            viewport: viewport
        }).promise;

        const imgData = canvas.toDataURL('image/jpeg', 0.9);
        const imgDataBase64 = imgData.split(',')[1];

        zip.file(`page_${i}.jpg`, imgDataBase64, { base64: true });
    }

    return await zip.generateAsync({ type: 'blob' });
};

export const imagesToPDF = async (files) => {
    const newPdf = await PDFDocument.create();

    for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        let image;

        if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
            image = await newPdf.embedJpg(arrayBuffer);
        } else if (file.type === 'image/png') {
            image = await newPdf.embedPng(arrayBuffer);
        } else {
            // Try to embed as jpg if unknown
            try {
                image = await newPdf.embedJpg(arrayBuffer);
            } catch (e) {
                try {
                    image = await newPdf.embedPng(arrayBuffer);
                } catch (e2) {
                    continue;
                }
            }
        }

        const { width, height } = image.scale(1);
        const page = newPdf.addPage([width, height]);
        page.drawImage(image, {
            x: 0,
            y: 0,
            width,
            height,
        });
    }

    const pdfBytes = await newPdf.save();
    return new Blob([pdfBytes], { type: 'application/pdf' });
};

export const addSignatureToPDF = async (file, signatureImageBase64, position) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    const pages = pdfDoc.getPages();
    const page = pages[position.pageIndex];

    if (page) {
        const pngImage = await pdfDoc.embedPng(signatureImageBase64);
        const { width: pageWidth, height: pageHeight } = page.getSize();

        // Calculate position
        const x = position.x * pageWidth;
        // PDF coordinates start from bottom-left
        const y = pageHeight - (position.y * pageHeight) - (position.height * pageHeight);

        page.drawImage(pngImage, {
            x,
            y,
            width: position.width * pageWidth,
            height: position.height * pageHeight,
        });
    }

    const pdfBytes = await pdfDoc.save();
    return new Blob([pdfBytes], { type: 'application/pdf' });
};

// HELPER: Hex to RGB
const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? rgb(
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255
    ) : rgb(0, 0, 0);
}



// HELPER: Map Font Config to StandardFont
const getStandardFont = (family, bold, italic) => {
    if (family && family.toLowerCase().includes('times')) {
        if (bold && italic) return StandardFonts.TimesRomanBoldItalic;
        if (bold) return StandardFonts.TimesRomanBold;
        if (italic) return StandardFonts.TimesRomanItalic;
        return StandardFonts.TimesRoman;
    }
    if (family && family.toLowerCase().includes('courier')) {
        if (bold && italic) return StandardFonts.CourierBoldOblique;
        if (bold) return StandardFonts.CourierBold;
        if (italic) return StandardFonts.CourierOblique;
        return StandardFonts.Courier;
    }
    // Default Helvetica
    if (bold && italic) return StandardFonts.HelveticaBoldOblique;
    if (bold) return StandardFonts.HelveticaBold;
    if (italic) return StandardFonts.HelveticaOblique;
    return StandardFonts.Helvetica;
};

// ─── Text Sanitizer ─────────────────────────────────────────────────
/**
 * Strips characters that WinAnsi (pdf-lib default) cannot encode.
 * - Removes carriage returns (\r) and tab chars (normalised to space)
 * - Keeps printable ASCII (0x20–0x7E) and newlines; removes everything else
 * Returns an empty string rather than crashing if the input is falsy.
 */
const sanitizeText = (text) => {
    if (!text) return '';
    return String(text)
        .replace(/\r/g, '')          // remove carriage returns
        .replace(/\t/g, ' ')         // tabs → single space
        .replace(/[^\x20-\x7E\n]/g, ''); // keep printable ASCII + newline only
};

// NEW: Comprehensive Annotation Support with "True Edit" Logic
export const applyAnnotations = async (file, annotations) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    const pages = pdfDoc.getPages();

    // Embed Standard Fonts as needed
    // We'll embed on the fly or pre-embed common ones? On the fly is safer/cleaner.

    for (const ann of annotations) {
        const page = pages[ann.pageIndex];
        if (!page) continue;

        // Embed font requested
        const fontToEmbed = getStandardFont(ann.fontFamily, ann.isBold, ann.isItalic);
        const font = await pdfDoc.embedFont(fontToEmbed);

        const { width: pageWidth, height: pageHeight } = page.getSize();
        const x = ann.x * pageWidth;
        const y = pageHeight - (ann.y * pageHeight); // Top-left origin conversion

        // Guard: skip annotation if coordinates are invalid (NaN/Infinity)
        if (!Number.isFinite(x) || !Number.isFinite(y)) {
            console.warn('applyAnnotations: skipping annotation with invalid coordinates', { x: ann.x, y: ann.y, computed: { x, y } });
            continue;
        }

        const annColor = hexToRgb(ann.color || '#000000');
        const borderColor = hexToRgb(ann.strokeColor || '#000000');

        // REPLACEMENT LOGIC
        if (ann.isReplacement) {
            const maskX = ann.originalX * pageWidth;
            const pdfTopY = pageHeight - (ann.originalY * pageHeight);
            const maskW = ann.originalWidth * pageWidth;
            const maskH = ann.originalHeight * pageHeight;

            // Draw white masking rect
            page.drawRectangle({
                x: maskX - 2,
                y: pdfTopY - maskH - 2,
                width: maskW + 4,
                height: maskH + 4,
                color: rgb(1, 1, 1),
                opacity: 1
            });

                    // Draw new text — split on \n first, then word-wrap each logical line
            const fontSize = ann.fontSize || 12;
            const lineHeight = fontSize * 1.2;
            const rawText = sanitizeText(ann.text);
            const logicalLines = rawText.split('\n');
            const maxWidth = maskW * 1.5;

            let currentTempY = pdfTopY - fontSize;

            for (const logicalLine of logicalLines) {
                // Word-wrap each logical line
                const words = logicalLine.split(' ');
                let line = '';

                for (let n = 0; n < words.length; n++) {
                    const testLine = line + words[n] + ' ';
                    const testWidth = font.widthOfTextAtSize(testLine, fontSize);
                    if (testWidth > maxWidth && n > 0) {
                        const safeLine = sanitizeText(line);
                        if (safeLine) {
                            console.log('Drawing replacement text:', safeLine);
                            page.drawText(safeLine, {
                                x: maskX,
                                y: currentTempY,
                                size: fontSize,
                                font: font,
                                color: annColor,
                            });
                        }
                        line = words[n] + ' ';
                        currentTempY -= lineHeight;
                    } else {
                        line = testLine;
                    }
                }
                // Draw remaining text on this logical line
                const safeRemainder = sanitizeText(line);
                if (safeRemainder) {
                    console.log('Drawing replacement text:', safeRemainder);
                    page.drawText(safeRemainder, {
                        x: maskX,
                        y: currentTempY,
                        size: fontSize,
                        font: font,
                        color: annColor,
                    });
                }
                currentTempY -= lineHeight; // advance past this logical line
            }
            continue;
        }

        // Standard text annotation — split on \n, draw each line
        if (ann.type === 'text') {
            const textSize = ann.fontSize || 12;
            const lineHeight = textSize * 1.2;
            const safeText = sanitizeText(ann.text);
            const lines = safeText.split('\n');

            if (ann.backgroundColor) {
                // Background rect sized to first line only (simple approximation)
                const textWidth = font.widthOfTextAtSize(lines[0] || '', textSize);
                const textHeight = textSize;
                page.drawRectangle({
                    x: x,
                    y: y - textHeight,
                    width: textWidth + 4,
                    height: textHeight + 4,
                    color: hexToRgb(ann.backgroundColor),
                    opacity: 1,
                });
            }

            const drawX = x + (ann.backgroundColor ? 2 : 0);
            lines.forEach((line, i) => {
                const safeLine = sanitizeText(line);
                if (!safeLine) return; // skip blank lines
                console.log('Drawing text:', safeLine);
                page.drawText(safeLine, {
                    x: drawX,
                    y: y - textSize - (i * lineHeight),
                    size: textSize,
                    font: font,
                    color: annColor,
                });
            });
        }
        // ... (Rect, Circle, Line etc. use defaults/existing)
        else if (ann.type === 'rectangle') {
            const w = ann.width * pageWidth;
            const h = ann.height * pageHeight;
            page.drawRectangle({
                x: x,
                y: y - h,
                width: w,
                height: h,
                borderColor: borderColor,
                borderWidth: ann.strokeWidth || 1,
                color: ann.fillColor ? hexToRgb(ann.fillColor) : undefined,
                opacity: ann.opacity || 1
            });
        } else if (ann.type === 'circle') {
            const w = ann.width * pageWidth;
            const h = ann.height * pageHeight;
            const size = Math.min(w, h); // force circle
            page.drawCircle({
                x: x + (w / 2),
                y: y - (h / 2),
                size: size / 2,
                borderColor: borderColor,
                borderWidth: ann.strokeWidth || 1,
                color: ann.fillColor ? hexToRgb(ann.fillColor) : undefined,
            });
        } else if (ann.type === 'line') {
            const w = ann.width * pageWidth;
            const h = ann.height * pageHeight;
            page.drawLine({
                start: { x: x, y: y },
                end: { x: x + w, y: y - h },
                thickness: ann.strokeWidth || 2,
                color: borderColor
            });
        } else if (ann.type === 'highlight') {
            const w = ann.width * pageWidth;
            const h = ann.height * pageHeight;
            page.drawRectangle({
                x: x,
                y: y - h,
                width: w,
                height: h,
                color: rgb(1, 1, 0), // Yellow
                opacity: 0.35,
            });
        } else if (ann.type === 'image') {
            if (ann.imageData) {
                let embeddedImage;
                if (ann.imageData.startsWith('data:image/png')) {
                    embeddedImage = await pdfDoc.embedPng(ann.imageData);
                } else {
                    embeddedImage = await pdfDoc.embedJpg(ann.imageData);
                }
                const w = ann.width * pageWidth;
                const h = ann.height * pageHeight;
                page.drawImage(embeddedImage, {
                    x: x,
                    y: y - h,
                    width: w,
                    height: h,
                });
            }
        }
    }

    const pdfBytes = await pdfDoc.save();
    return new Blob([pdfBytes], { type: 'application/pdf' });
};

export const addTextToPDF = async (file, textData) => {
    return applyAnnotations(file, [{
        type: 'text',
        pageIndex: textData.pageIndex,
        x: textData.x,
        y: textData.y,
        text: textData.text,
        fontSize: textData.size,
        color: '#000000'
    }]);
};

// ════════════════════════════════════════════════════════════════════
// PHASE 1 — SHARED PDF PROCESSING FOUNDATION
// All functions below are 100% browser-side. No network requests are
// made during PDF processing. Files are never uploaded anywhere.
// ════════════════════════════════════════════════════════════════════

// ─── Internal: XFA Form Detection ───────────────────────────────────
/**
 * Scans raw PDF bytes for the /XFA dictionary entry.
 * XFA forms (Adobe LiveCycle) cannot be reliably processed with pdf-lib.
 * Returns true if XFA markers are found.
 *
 * Search scope: first 64 KB of the file (the AcroForm dict is always
 * early in the cross-reference table).
 */
const hasXFAForm = (arrayBuffer) => {
    const bytes = new Uint8Array(arrayBuffer);
    const scanSize = Math.min(bytes.length, 65536);
    const decoder = new TextDecoder('latin1');
    const text = decoder.decode(bytes.slice(0, scanSize));
    return /\/XFA\b/.test(text);
};

// ─── Internal: Typed Error Factory ──────────────────────────────────
/**
 * Creates an Error with a machine-readable .code property so UI layers
 * can render appropriate messages without parsing error strings.
 */
const makeError = (message, code) => {
    const err = new Error(message);
    err.code = code;
    return err;
};

// ═══════════════════════════════════════════════════════════════════
// 1. PDF TO ZIP
// ═══════════════════════════════════════════════════════════════════
/**
 * Bundles multiple PDF files into a single ZIP archive.
 *
 * Files are added as-is — no re-processing or re-compression of the
 * PDF content itself. Original quality is fully preserved.
 *
 * Filename collision handling: if two or more files share the same
 * name the duplicates receive a numeric suffix:
 *   "report.pdf"  →  "report.pdf" / "report (2).pdf" / "report (3).pdf"
 *
 * @param {File[]} files - Array of PDF File objects
 * @returns {Promise<Blob>} ZIP blob (application/zip)
 * @throws {Error} with code 'NO_FILES' | 'INVALID_FILE'
 */
export const pdfsToZip = async (files) => {
    if (!files || files.length === 0) {
        throw makeError('No files provided.', 'NO_FILES');
    }

    const zip = new JSZip();
    // Map: sanitized base name → how many times seen so far
    const seenNames = new Map();

    for (const file of files) {
        // ── Validate each file is a PDF ─────────────────────────────
        if (file.type && file.type !== 'application/pdf') {
            throw makeError(
                `"${file.name}" does not appear to be a PDF file.`,
                'INVALID_FILE'
            );
        }

        const arrayBuffer = await file.arrayBuffer();

        // ── Sanitize filename ────────────────────────────────────────
        // Remove path separators and illegal filename characters.
        let name = (file.name || 'document.pdf')
            .replace(/[/\\:*?"<>|]/g, '_')
            .trim();
        if (!name) name = 'document.pdf';
        if (!name.toLowerCase().endsWith('.pdf')) name += '.pdf';

        // ── Handle collisions ────────────────────────────────────────
        if (seenNames.has(name)) {
            const count = seenNames.get(name) + 1;
            seenNames.set(name, count);
            const dotIdx = name.lastIndexOf('.');
            const uniqueName =
                dotIdx >= 0
                    ? `${name.slice(0, dotIdx)} (${count})${name.slice(dotIdx)}`
                    : `${name} (${count})`;
            zip.file(uniqueName, arrayBuffer);
        } else {
            seenNames.set(name, 1);
            zip.file(name, arrayBuffer);
        }
    }

    return await zip.generateAsync({
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 },
        comment: 'Created by SafePDF — files processed locally in your browser.',
    });
};

// ═══════════════════════════════════════════════════════════════════
// 2. CROP & RESIZE PDF
// ═══════════════════════════════════════════════════════════════════
/**
 * Crops and/or resizes PDF pages using one of two strategies:
 *
 * ── Strategy A: MediaBox (default) — LOSSLESS, FAST ──────────────
 *   Adjusts each page's MediaBox and CropBox to change the visible
 *   area. The document remains fully vector/text-based. Content
 *   outside the new box is HIDDEN but NOT physically removed from
 *   the file. Ideal for trimming margins.
 *
 *   IMPORTANT: Because this strategy only hides — not deletes —
 *   content, the original data outside the crop region remains
 *   accessible to PDF editors that can set custom crop boxes.
 *   Do NOT use this strategy if removing hidden content is a
 *   security or privacy requirement; use rasterize=true instead.
 *
 * ── Strategy B: Rasterize (rasterize=true) — DESTRUCTIVE ─────────
 *   Renders each page via pdfjs to an HTML Canvas, applies the crop
 *   region on the canvas, then embeds the result as a JPEG image
 *   in a new pdf-lib document. Content outside the crop is
 *   permanently destroyed. Output is image-based (not selectable).
 *
 * ── Lossless Resize (targetWidth / targetHeight, no rasterize) ───
 *   Uses pdf-lib's embedPages + drawPage (XObject) to scale the
 *   visible page area to the requested dimensions. Vectors, fonts,
 *   and text layers are preserved.
 *
 * All measurements are in PDF points (pt). 1 pt = 1/72 inch.
 * Common sizes: A4 = 595 × 842 pt, Letter = 612 × 792 pt.
 *
 * @param {File} file
 * @param {Object} [options]
 * @param {number} [options.cropTop=0]       Points to remove from the top edge
 * @param {number} [options.cropBottom=0]    Points to remove from the bottom edge
 * @param {number} [options.cropLeft=0]      Points to remove from the left edge
 * @param {number} [options.cropRight=0]     Points to remove from the right edge
 * @param {number} [options.targetWidth]     Target width in points (optional)
 * @param {number} [options.targetHeight]    Target height in points (optional)
 * @param {boolean} [options.rasterize=false] Use destructive rasterization
 * @param {number} [options.renderScale=2.0] Canvas render scale (rasterize only)
 * @returns {Promise<Blob>} application/pdf
 * @throws {Error} with code 'INVALID_CROP' | 'LOAD_FAILED'
 */
export const cropResizePDF = async (file, options = {}) => {
    const {
        cropTop = 0,
        cropBottom = 0,
        cropLeft = 0,
        cropRight = 0,
        targetWidth,
        targetHeight,
        rasterize = false,
        renderScale,
        pages, // optional array of 0-based page indices to apply to; undefined = all pages
    } = options;

    // ── Input validation ────────────────────────────────────────────
    if ([cropTop, cropBottom, cropLeft, cropRight].some(v => v < 0)) {
        throw makeError('Crop values must be non-negative numbers.', 'INVALID_CROP');
    }

    if (rasterize) {
        return _cropRasterized(file, { cropTop, cropBottom, cropLeft, cropRight, targetWidth, targetHeight, renderScale });
    }

    // ── Strategy A / B: MediaBox or Lossless Resize ─────────────────
    let arrayBuffer;
    try {
        arrayBuffer = await file.arrayBuffer();
    } catch {
        throw makeError('Could not read the file.', 'LOAD_FAILED');
    }

    const hasResize = targetWidth && targetHeight;

    if (hasResize) {
        // ── Lossless resize via XObject embedding ───────────────────
        // Load source PDF
        const sourcePdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
        const sourcePages = sourcePdf.getPages();
        const newPdf = await PDFDocument.create();
        const pageSetResize = pages ? new Set(pages) : null; // null means all pages

        // Build bounding boxes for crop (PDF uses bottom-left origin)
        const boundingBoxes = sourcePages.map(page => {
            const { width, height } = page.getSize();
            return {
                left: cropLeft,
                bottom: cropBottom,
                right: Math.max(width - cropRight, cropLeft + 1),
                top: Math.max(height - cropTop, cropBottom + 1),
            };
        });

        // Embed all source pages as XObjects in the new document
        const embeddedPages = await newPdf.embedPages(sourcePages, boundingBoxes);

        for (let i = 0; i < embeddedPages.length; i++) {
            const shouldResize = !pageSetResize || pageSetResize.has(i);
            const srcPage = sourcePages[i];
            const { width: origW, height: origH } = srcPage.getSize();

            if (shouldResize) {
                // Resize to target dimensions
                const newPage = newPdf.addPage([targetWidth, targetHeight]);
                newPage.drawPage(embeddedPages[i], {
                    x: 0, y: 0,
                    width: targetWidth,
                    height: targetHeight,
                });
            } else {
                // Keep original size — draw at original dimensions
                const newPage = newPdf.addPage([origW, origH]);
                newPage.drawPage(embeddedPages[i], {
                    x: 0, y: 0,
                    width: origW,
                    height: origH,
                });
            }
        }

        const pdfBytes = await newPdf.save();
        return new Blob([pdfBytes], { type: 'application/pdf' });
    }

    // ── Pure MediaBox crop (in-place, lossless) ─────────────────────
    const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    const allPages = pdfDoc.getPages();
    const pageSet = pages ? new Set(pages) : null; // null means all pages

    for (let i = 0; i < allPages.length; i++) {
        // Skip if pages filter is set and this index is not in the set
        if (pageSet && !pageSet.has(i)) continue;

        const page = allPages[i];
        const { width, height } = page.getSize();
        const newLeft   = cropLeft;
        const newBottom = cropBottom;
        const newRight  = width - cropRight;
        const newTop    = height - cropTop;

        if (newRight <= newLeft || newTop <= newBottom) {
            throw makeError(
                'Crop values exceed page dimensions. Reduce the crop amounts.',
                'INVALID_CROP'
            );
        }

        const boxWidth  = newRight - newLeft;
        const boxHeight = newTop   - newBottom;

        // MediaBox controls the full page area
        page.setMediaBox(newLeft, newBottom, boxWidth, boxHeight);
        // CropBox is what PDF viewers display — must match or be inside MediaBox
        page.setCropBox(newLeft, newBottom, boxWidth, boxHeight);
    }

    const pdfBytes = await pdfDoc.save();
    return new Blob([pdfBytes], { type: 'application/pdf' });
};

/**
 * Internal: rasterized crop using pdfjs canvas rendering.
 * This DESTROYS the original PDF content stream — text is gone permanently.
 * Output is entirely image-based.
 */
const _cropRasterized = async (file, { cropTop, cropBottom, cropLeft, cropRight, targetWidth, targetHeight, renderScale }) => {
    const isMobile = typeof navigator !== 'undefined' && navigator.maxTouchPoints > 1;
    const SCALE = renderScale || (isMobile ? 1.5 : 2.0);

    const pdfJsDoc = await getPDFDocument(file);
    const numPages = pdfJsDoc.numPages;
    const newPdf   = await PDFDocument.create();

    for (let i = 1; i <= numPages; i++) {
        const page     = await pdfJsDoc.getPage(i);
        const viewport = page.getViewport({ scale: SCALE });

        // Full-page canvas
        const canvas = document.createElement('canvas');
        const ctx    = canvas.getContext('2d');
        canvas.width  = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: ctx, viewport }).promise;

        // Crop region in canvas pixels (note: pdfjs Y axis is top-down)
        const srcX = cropLeft  * SCALE;
        const srcY = cropTop   * SCALE;
        const srcW = Math.max(1, viewport.width  - (cropLeft + cropRight)  * SCALE);
        const srcH = Math.max(1, viewport.height - (cropTop  + cropBottom) * SCALE);

        // Output dimensions
        const outW = targetWidth  ? targetWidth  * SCALE : srcW;
        const outH = targetHeight ? targetHeight * SCALE : srcH;

        // Cropped (and optionally resized) canvas
        const cropped = document.createElement('canvas');
        cropped.width  = outW;
        cropped.height = outH;
        cropped.getContext('2d').drawImage(canvas, srcX, srcY, srcW, srcH, 0, 0, outW, outH);

        // canvas → JPEG blob → ArrayBuffer (avoids base64 overhead)
        const imgBytes = await new Promise((resolve, reject) => {
            cropped.toBlob(
                blob => blob ? blob.arrayBuffer().then(resolve).catch(reject)
                             : reject(new Error('Canvas toBlob returned null')),
                'image/jpeg',
                0.92
            );
        });

        // Release canvas memory before embedding
        canvas.width  = 0; canvas.height  = 0;
        cropped.width = 0; cropped.height = 0;

        const finalW = targetWidth  || (srcW / SCALE);
        const finalH = targetHeight || (srcH / SCALE);
        const jpgImg = await newPdf.embedJpg(imgBytes);
        const newPage = newPdf.addPage([finalW, finalH]);
        newPage.drawImage(jpgImg, { x: 0, y: 0, width: finalW, height: finalH });
    }

    const pdfBytes = await newPdf.save();
    return new Blob([pdfBytes], { type: 'application/pdf' });
};

// ═══════════════════════════════════════════════════════════════════
// 3a. GET PDF FORM FIELDS (read-only enumeration)
// ═══════════════════════════════════════════════════════════════════
/**
 * Returns a description of all fillable AcroForm fields without
 * modifying the document. Use this to render a form UI before the
 * user provides values.
 *
 * Throws with code 'XFA_UNSUPPORTED' for XFA forms, 'NO_FIELDS' when
 * no form fields are present, or 'LOAD_FAILED' on a corrupt file.
 *
 * @param {File} file
 * @returns {Promise<Array<{
 *   name: string,
 *   type: string,
 *   value: string|boolean|string[],
 *   options?: string[],
 *   isMultiline?: boolean,
 *   isRequired?: boolean,
 *   error?: string
 * }>>}
 */
export const getPDFFormFields = async (file) => {
    const arrayBuffer = await file.arrayBuffer();

    if (hasXFAForm(arrayBuffer)) {
        throw makeError(
            'This PDF uses XFA forms (Adobe LiveCycle), which are not supported in the browser. ' +
            'Please use Adobe Acrobat or another desktop application to fill this form.',
            'XFA_UNSUPPORTED'
        );
    }

    let pdfDoc;
    try {
        pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    } catch (e) {
        throw makeError(
            'Could not open the PDF. The file may be damaged or encrypted.',
            'LOAD_FAILED'
        );
    }

    const form   = pdfDoc.getForm();
    const fields = form.getFields();

    if (fields.length === 0) {
        throw makeError(
            'This PDF does not contain any fillable form fields.',
            'NO_FIELDS'
        );
    }

    return fields.map(field => {
        const name = field.getName();
        let info = { name, type: 'unknown', value: null };

        try {
            if (field instanceof PDFTextField) {
                info.type      = 'text';
                info.value     = field.getText() || '';
                // isMultiline/isRequired may not exist on all versions — guard
                info.isMultiline = typeof field.isMultiline === 'function' ? field.isMultiline() : false;
                info.isRequired  = typeof field.isRequired  === 'function' ? field.isRequired()  : false;
            } else if (field instanceof PDFCheckBox) {
                info.type  = 'checkbox';
                info.value = field.isChecked();
            } else if (field instanceof PDFRadioGroup) {
                info.type    = 'radio';
                info.value   = field.getSelected() || '';
                info.options = field.getOptions();
            } else if (field instanceof PDFDropdown) {
                info.type    = 'dropdown';
                info.value   = field.getSelected() || [];
                info.options = field.getOptions();
            } else if (field instanceof PDFOptionList) {
                info.type    = 'optionList';
                info.value   = field.getSelected() || [];
                info.options = field.getOptions();
            } else {
                info.type = field.constructor.name || 'unknown';
            }
        } catch (e) {
            info.error = e.message;
        }

        return info;
    });
};

// ═══════════════════════════════════════════════════════════════════
// 3b. FILL PDF FORM
// ═══════════════════════════════════════════════════════════════════
/**
 * Fills AcroForm fields in a PDF and returns the modified document.
 *
 * Field type support:
 *   PDFTextField  → setText()   (value: string)
 *   PDFCheckBox   → check/uncheck (value: boolean/truthy)
 *   PDFRadioGroup → select()    (value: string option label)
 *   PDFDropdown   → select()    (value: string option label)
 *   PDFOptionList → select()    (value: string option label)
 *
 * Unsupported field types are skipped with a console warning.
 * Unsupported XFA forms throw immediately with code 'XFA_UNSUPPORTED'.
 * Missing form fields throw with code 'NO_FIELDS'.
 *
 * @param {File} file
 * @param {Object} fieldValues  Map of fieldName → value
 * @param {Object} [options]
 * @param {boolean} [options.flatten=false]  Flatten form fields after filling
 *   (makes values permanent and removes interactive field widgets)
 * @returns {Promise<{ blob: Blob, fields: Object[] }>}
 *   blob: the filled PDF, fields: same structure as getPDFFormFields
 */
export const fillPDFForm = async (file, fieldValues = {}, options = {}) => {
    const { flatten = false } = options;

    const arrayBuffer = await file.arrayBuffer();

    // ── XFA guard ───────────────────────────────────────────────────
    if (hasXFAForm(arrayBuffer)) {
        throw makeError(
            'This PDF uses XFA forms (Adobe LiveCycle), which are not supported in the browser. ' +
            'Please use Adobe Acrobat or another desktop application to fill this form.',
            'XFA_UNSUPPORTED'
        );
    }

    let pdfDoc;
    try {
        pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    } catch (e) {
        throw makeError(
            'Could not open the PDF. The file may be damaged or encrypted.',
            'LOAD_FAILED'
        );
    }

    const form   = pdfDoc.getForm();
    const fields = form.getFields();

    if (fields.length === 0) {
        throw makeError(
            'This PDF does not contain any fillable form fields.',
            'NO_FIELDS'
        );
    }

    const fieldReport = [];

    for (const field of fields) {
        const name = field.getName();
        const info = { name };

        try {
            if (field instanceof PDFTextField) {
                info.type  = 'text';
                info.value = field.getText() || '';
                if (Object.prototype.hasOwnProperty.call(fieldValues, name)) {
                    // sanitizeText strips chars that pdf-lib WinAnsi cannot encode
                    field.setText(sanitizeText(String(fieldValues[name])));
                    info.value = sanitizeText(String(fieldValues[name]));
                }
            } else if (field instanceof PDFCheckBox) {
                info.type  = 'checkbox';
                info.value = field.isChecked();
                if (Object.prototype.hasOwnProperty.call(fieldValues, name)) {
                    if (fieldValues[name]) field.check();
                    else field.uncheck();
                    info.value = !!fieldValues[name];
                }
            } else if (field instanceof PDFRadioGroup) {
                info.type    = 'radio';
                info.value   = field.getSelected() || '';
                info.options = field.getOptions();
                if (Object.prototype.hasOwnProperty.call(fieldValues, name)) {
                    field.select(String(fieldValues[name]));
                    info.value = String(fieldValues[name]);
                }
            } else if (field instanceof PDFDropdown) {
                info.type    = 'dropdown';
                info.value   = field.getSelected() || [];
                info.options = field.getOptions();
                if (Object.prototype.hasOwnProperty.call(fieldValues, name)) {
                    field.select(String(fieldValues[name]));
                    info.value = String(fieldValues[name]);
                }
            } else if (field instanceof PDFOptionList) {
                info.type    = 'optionList';
                info.value   = field.getSelected() || [];
                info.options = field.getOptions();
                if (Object.prototype.hasOwnProperty.call(fieldValues, name)) {
                    field.select(String(fieldValues[name]));
                    info.value = String(fieldValues[name]);
                }
            } else {
                info.type    = 'unsupported';
                info.warning = 'This field type is not supported and was skipped.';
                console.warn(`fillPDFForm: unsupported field type for "${name}"`, field.constructor.name);
            }
        } catch (fieldErr) {
            console.warn(`fillPDFForm: error processing field "${name}":`, fieldErr.message);
            info.error = fieldErr.message;
        }

        fieldReport.push(info);
    }

    if (flatten) {
        try {
            form.flatten();
        } catch (flattenErr) {
            // Flatten failure is non-fatal — return the filled (but interactive) PDF
            console.warn('fillPDFForm: form.flatten() failed — returning unflatttened PDF:', flattenErr.message);
        }
    }

    const pdfBytes = await pdfDoc.save();
    return {
        blob:   new Blob([pdfBytes], { type: 'application/pdf' }),
        fields: fieldReport,
    };
};

// ═══════════════════════════════════════════════════════════════════
// 4. REDACT PDF — GENUINE, IRREVERSIBLE REDACTION
// ═══════════════════════════════════════════════════════════════════
/**
 * Permanently redacts regions of a PDF by full-page rasterization.
 *
 * ── How it works ─────────────────────────────────────────────────
 * Every page of the source PDF is rendered to an HTML Canvas via
 * pdfjs-dist. On pages that contain redaction regions, opaque filled
 * rectangles are drawn directly onto the canvas BEFORE the image is
 * captured. The final image (with black boxes already baked in) is
 * then embedded as a JPEG into a brand-new pdf-lib document.
 *
 * The resulting PDF contains ONLY rasterized images — there is no
 * original text layer, no font resources, and no content stream from
 * the source document. Redacted content cannot be recovered by:
 *   • text selection or copy/paste
 *   • search (Ctrl+F)
 *   • PDF text-extraction tools (pdftotext, iTextSharp, etc.)
 *   • inspecting PDF content streams in a hex editor
 *
 * ── Trade-offs (clearly documented) ─────────────────────────────
 *   • Output is image-based: not selectable, not searchable
 *   • Screen readers cannot read the resulting PDF
 *   • File size may be larger than the original
 *   • Visual quality depends on renderScale (default 2× = 144 dpi)
 *   • ALL pages are rasterized (not just redacted pages) for consistency
 *
 * ── WARNING ───────────────────────────────────────────────────────
 *   Redaction is IRREVERSIBLE. Verify the output before distributing.
 *   The original file is NOT modified — always keep a secure backup.
 *
 * @param {File} file
 * @param {Array<{
 *   pageIndex: number,    0-based page index
 *   x:         number,    Normalized horizontal start (0–1, left=0)
 *   y:         number,    Normalized vertical start   (0–1, top=0)
 *   width:     number,    Normalized width  (0–1)
 *   height:    number,    Normalized height (0–1)
 * }>} redactions
 * @param {Object} [options]
 * @param {number} [options.renderScale=2.0]   Higher = better quality, more memory
 * @param {string} [options.redactionColor='#000000']  Fill color (CSS hex)
 * @returns {Promise<Blob>}
 * @throws {Error} with code 'NO_REDACTIONS' | 'LOAD_FAILED'
 */
export const redactPDF = async (file, redactions = [], options = {}) => {
    if (!redactions || redactions.length === 0) {
        throw makeError('No redaction regions were specified.', 'NO_REDACTIONS');
    }

    const isMobile = typeof navigator !== 'undefined' && navigator.maxTouchPoints > 1;
    const SCALE = options.renderScale || (isMobile ? 1.5 : 2.0);
    const redactionColor = options.redactionColor || '#000000';

    // Parse hex color once
    const colorMatch = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(redactionColor);
    const [rR, rG, rB] = colorMatch
        ? [parseInt(colorMatch[1], 16), parseInt(colorMatch[2], 16), parseInt(colorMatch[3], 16)]
        : [0, 0, 0];
    const cssColor = `rgb(${rR},${rG},${rB})`;

    // Group redactions by page index for O(1) lookup per page
    const byPage = {};
    for (const r of redactions) {
        (byPage[r.pageIndex] || (byPage[r.pageIndex] = [])).push(r);
    }

    let pdfJsDoc;
    try {
        pdfJsDoc = await getPDFDocument(file);
    } catch (e) {
        throw makeError('Could not open the PDF for rendering.', 'LOAD_FAILED');
    }

    const numPages = pdfJsDoc.numPages;
    const newPdf   = await PDFDocument.create();

    for (let i = 0; i < numPages; i++) {
        const page     = await pdfJsDoc.getPage(i + 1);
        const viewport = page.getViewport({ scale: SCALE });

        const canvas = document.createElement('canvas');
        canvas.width  = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');

        // 1. Render the PDF page onto the canvas
        await page.render({ canvasContext: ctx, viewport }).promise;

        // 2. Paint redaction boxes over the rendered content.
        //    Normalized coords (0–1) are converted to canvas pixels.
        //    pdfjs renders with Y-axis going top-down (same as canvas),
        //    so no Y-flip is needed here.
        if (byPage[i]) {
            ctx.fillStyle = cssColor;
            for (const r of byPage[i]) {
                ctx.fillRect(
                    r.x      * viewport.width,
                    r.y      * viewport.height,
                    r.width  * viewport.width,
                    r.height * viewport.height
                );
            }
        }

        // 3. Capture the canvas (with boxes already baked in) as JPEG.
        //    Using toBlob avoids the ~33% base64 overhead of toDataURL.
        const imgBytes = await new Promise((resolve, reject) => {
            canvas.toBlob(
                blob => blob
                    ? blob.arrayBuffer().then(resolve).catch(reject)
                    : reject(new Error('Canvas toBlob returned null')),
                'image/jpeg',
                0.92
            );
        });

        // 4. Release canvas memory immediately (important for large PDFs)
        canvas.width  = 0;
        canvas.height = 0;

        // 5. Embed the JPEG (with redactions) into the new PDF.
        //    The original PDF content stream is NEVER copied — only
        //    the rendered (and now partially painted) bitmap is used.
        const origW = viewport.width  / SCALE;
        const origH = viewport.height / SCALE;
        const img   = await newPdf.embedJpg(imgBytes);
        const newPage = newPdf.addPage([origW, origH]);
        newPage.drawImage(img, { x: 0, y: 0, width: origW, height: origH });
    }

    const pdfBytes = await newPdf.save();
    return new Blob([pdfBytes], { type: 'application/pdf' });
};

// ═══════════════════════════════════════════════════════════════════
// 5. ADD WATERMARK TO PDF
// ═══════════════════════════════════════════════════════════════════
/**
 * Adds a text watermark to PDF pages.
 *
 * Output is VECTOR-BASED and LOSSLESS — no rasterization.
 * The watermark text is embedded directly in each page's content stream
 * using pdf-lib standard fonts (Helvetica / Times Roman / Courier).
 *
 * Character support: WinAnsi (printable ASCII + Latin-1 subset).
 * Unsupported characters are silently stripped by sanitizeText().
 *
 * @param {File} file
 * @param {Object} options
 * @param {string}  options.text                  Watermark text (required)
 * @param {'diagonal'|'center'|
 *          'top-left'|'top-center'|'top-right'|
 *          'bottom-left'|'bottom-center'|'bottom-right'} [options.position='diagonal']
 * @param {number}  [options.opacity=0.3]         0 = transparent, 1 = opaque
 * @param {number}  [options.fontSize=48]         Point size
 * @param {string}  [options.color='#808080']     Hex color
 * @param {number}  [options.rotation]            Degrees; defaults: 45 (diagonal), 0 (others)
 * @param {string}  [options.fontFamily='Helvetica']  'Helvetica' | 'Times' | 'Courier'
 * @param {boolean} [options.bold=false]
 * @param {boolean} [options.italic=false]
 * @param {number[]} [options.pages]              0-indexed; omit for all pages
 * @returns {Promise<Blob>}
 * @throws {Error} with code 'INVALID_TEXT' | 'LOAD_FAILED'
 */
export const addWatermarkToPDF = async (file, options = {}) => {
    const {
        text,
        position   = 'diagonal',
        opacity    = 0.3,
        fontSize   = 48,
        color      = '#808080',
        rotation:  rotationOverride,
        fontFamily = 'Helvetica',
        bold       = false,
        italic     = false,
        pages:     pageFilter,
    } = options;

    const safeText = sanitizeText(text || '');
    if (!safeText) {
        throw makeError(
            'Watermark text is required and must contain printable ASCII characters.',
            'INVALID_TEXT'
        );
    }

    let arrayBuffer;
    try {
        arrayBuffer = await file.arrayBuffer();
    } catch {
        throw makeError('Could not read the file.', 'LOAD_FAILED');
    }

    const pdfDoc    = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    const pages     = pdfDoc.getPages();
    const fontKey   = getStandardFont(fontFamily, bold, italic);
    const font      = await pdfDoc.embedFont(fontKey);
    const fillColor = hexToRgb(color);
    const safeOpacity = Math.max(0, Math.min(1, opacity));

    const targetIndices = pageFilter || pages.map((_, i) => i);

    for (const pageIdx of targetIndices) {
        const page = pages[pageIdx];
        if (!page) continue;

        const { width, height } = page.getSize();
        const textWidth  = font.widthOfTextAtSize(safeText, fontSize);

        let x, y, rotation;

        switch (position) {
            case 'center':
                x        = (width  - textWidth) / 2;
                y        = (height - fontSize)  / 2;
                rotation = rotationOverride ?? 0;
                break;
            case 'top-left':
                x        = 20;
                y        = height - fontSize - 20;
                rotation = rotationOverride ?? 0;
                break;
            case 'top-center':
                x        = (width - textWidth) / 2;
                y        = height - fontSize - 20;
                rotation = rotationOverride ?? 0;
                break;
            case 'top-right':
                x        = width - textWidth - 20;
                y        = height - fontSize - 20;
                rotation = rotationOverride ?? 0;
                break;
            case 'bottom-left':
                x        = 20;
                y        = 20;
                rotation = rotationOverride ?? 0;
                break;
            case 'bottom-center':
                x        = (width - textWidth) / 2;
                y        = 20;
                rotation = rotationOverride ?? 0;
                break;
            case 'bottom-right':
                x        = width - textWidth - 20;
                y        = 20;
                rotation = rotationOverride ?? 0;
                break;
            case 'diagonal':
            default:
                // Center of page; rotation creates the diagonal sweep
                x        = width  / 2;
                y        = height / 2;
                rotation = rotationOverride ?? 45;
                break;
        }

        page.drawText(safeText, {
            x,
            y,
            size:    fontSize,
            font,
            color:   fillColor,
            opacity: safeOpacity,
            rotate:  degrees(rotation),
        });
    }

    const pdfBytes = await pdfDoc.save();
    return new Blob([pdfBytes], { type: 'application/pdf' });
};

// ═══════════════════════════════════════════════════════════════════
// 6. ADD PAGE NUMBERS TO PDF
// ═══════════════════════════════════════════════════════════════════
/**
 * Inserts page numbers into all (or selected) pages.
 * Output is VECTOR-BASED and LOSSLESS.
 *
 * Supports prefix/suffix text and an automatic "of N" total.
 *
 * @param {File} file
 * @param {Object} [options]
 * @param {'top-left'|'top-center'|'top-right'|
 *          'bottom-left'|'bottom-center'|'bottom-right'} [options.position='bottom-center']
 * @param {number}  [options.startNumber=1]     Page number for the first page
 * @param {string}  [options.prefix='']         Text before the number (e.g. 'Page ')
 * @param {string}  [options.suffix='']         Text after the number
 * @param {boolean} [options.showTotal=false]   Appends " of N" automatically
 * @param {number}  [options.fontSize=10]
 * @param {string}  [options.color='#000000']   Hex color
 * @param {string}  [options.fontFamily='Helvetica']
 * @param {boolean} [options.bold=false]
 * @param {boolean} [options.italic=false]
 * @param {number}  [options.margin=20]         Distance from page edge in points
 * @param {number[]} [options.pages]            0-indexed page indices; omit for all
 * @returns {Promise<Blob>}
 */
export const addPageNumbersToPDF = async (file, options = {}) => {
    const {
        position    = 'bottom-center',
        startNumber = 1,
        prefix      = '',
        suffix      = '',
        showTotal   = false,
        fontSize    = 10,
        color       = '#000000',
        fontFamily  = 'Helvetica',
        bold        = false,
        italic      = false,
        margin      = 20,
        pages:      pageFilter,
    } = options;

    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc      = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    const pages       = pdfDoc.getPages();
    const totalPages  = pages.length;

    const fontKey   = getStandardFont(fontFamily, bold, italic);
    const font      = await pdfDoc.embedFont(fontKey);
    const fillColor = hexToRgb(color);

    const targetIndices = pageFilter || pages.map((_, i) => i);

    const isTop    = position.startsWith('top');
    const isLeft   = position.endsWith('left');
    const isRight  = position.endsWith('right');

    targetIndices.forEach((pageIdx, loopIdx) => {
        const page = pages[pageIdx];
        if (!page) return;

        const { width, height } = page.getSize();
        const pageNum = startNumber + loopIdx;
        const totalPart = showTotal ? ` of ${totalPages}` : suffix;
        const label = sanitizeText(`${prefix}${pageNum}${totalPart}`);
        if (!label) return;

        const textWidth = font.widthOfTextAtSize(label, fontSize);

        // X position
        const x = isLeft  ? margin
                : isRight ? width - textWidth - margin
                :           (width - textWidth) / 2;  // center

        // Y position (pdf-lib: origin = bottom-left)
        const y = isTop ? height - margin - fontSize : margin;

        page.drawText(label, { x, y, size: fontSize, font, color: fillColor });
    });

    const pdfBytes = await pdfDoc.save();
    return new Blob([pdfBytes], { type: 'application/pdf' });
};

// ═══════════════════════════════════════════════════════════════════
// 7. ADD HEADER & FOOTER TO PDF
// ═══════════════════════════════════════════════════════════════════
/**
 * Adds a header and/or footer to all (or selected) pages.
 * Output is VECTOR-BASED and LOSSLESS.
 *
 * Text supports dynamic placeholders:
 *   {PAGE}  → current page number (1-based within selected pages)
 *   {TOTAL} → total pages in the document
 *   {DATE}  → today's date (en-US, short format: "Aug 21, 2026")
 *
 * Character support: WinAnsi (ASCII + Latin-1). sanitizeText() strips
 * any characters that pdf-lib cannot encode.
 *
 * @param {File} file
 * @param {Object} options
 * @param {string}  [options.headerText='']      Header content (empty = no header)
 * @param {string}  [options.footerText='']      Footer content (empty = no footer)
 * @param {'left'|'center'|'right'} [options.alignment='center']
 * @param {number}  [options.fontSize=10]
 * @param {string}  [options.color='#000000']    Hex color
 * @param {string}  [options.fontFamily='Helvetica']
 * @param {boolean} [options.bold=false]
 * @param {boolean} [options.italic=false]
 * @param {number}  [options.margin=20]          Distance from page edge in points
 * @param {number[]} [options.pages]             0-indexed; omit for all pages
 * @returns {Promise<Blob>}
 * @throws {Error} with code 'MISSING_CONTENT'
 */
export const addHeaderFooterToPDF = async (file, options = {}) => {
    const {
        headerText = '',
        footerText = '',
        alignment  = 'center',
        fontSize   = 10,
        color      = '#000000',
        fontFamily = 'Helvetica',
        bold       = false,
        italic     = false,
        margin     = 20,
        pages:     pageFilter,
    } = options;

    if (!headerText && !footerText) {
        throw makeError(
            'At least one of headerText or footerText must be provided.',
            'MISSING_CONTENT'
        );
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc      = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    const pages       = pdfDoc.getPages();
    const totalPages  = pages.length;

    const fontKey   = getStandardFont(fontFamily, bold, italic);
    const font      = await pdfDoc.embedFont(fontKey);
    const fillColor = hexToRgb(color);

    // Human-readable date for {DATE} placeholder
    const today = new Date().toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric',
    });

    const resolvePlaceholders = (template, pageNum) =>
        sanitizeText(
            template
                .replace(/\{PAGE\}/gi,  String(pageNum))
                .replace(/\{TOTAL\}/gi, String(totalPages))
                .replace(/\{DATE\}/gi,  today)
        );

    const calcX = (textWidth, pageWidth) => {
        if (alignment === 'left')  return margin;
        if (alignment === 'right') return pageWidth - textWidth - margin;
        return (pageWidth - textWidth) / 2; // center
    };

    const targetIndices = pageFilter || pages.map((_, i) => i);

    targetIndices.forEach((pageIdx, loopIdx) => {
        const page = pages[pageIdx];
        if (!page) return;

        const { width, height } = page.getSize();
        const pageNum = loopIdx + 1;

        // ── Header ──────────────────────────────────────────────────
        if (headerText) {
            const text = resolvePlaceholders(headerText, pageNum);
            if (text) {
                const tw = font.widthOfTextAtSize(text, fontSize);
                page.drawText(text, {
                    x:    calcX(tw, width),
                    y:    height - margin - fontSize,
                    size: fontSize,
                    font,
                    color: fillColor,
                });
            }
        }

        // ── Footer ──────────────────────────────────────────────────
        if (footerText) {
            const text = resolvePlaceholders(footerText, pageNum);
            if (text) {
                const tw = font.widthOfTextAtSize(text, fontSize);
                page.drawText(text, {
                    x:    calcX(tw, width),
                    y:    margin,
                    size: fontSize,
                    font,
                    color: fillColor,
                });
            }
        }
    });

    const pdfBytes = await pdfDoc.save();
    return new Blob([pdfBytes], { type: 'application/pdf' });
};
