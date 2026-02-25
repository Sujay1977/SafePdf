import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';
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
    const pdfDoc = await PDFDocument.load(arrayBuffer);
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
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const pdfBytes = await mergedPdf.save();
    return new Blob([pdfBytes], { type: 'application/pdf' });
};

export const protectPDF = async (file, password) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);

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
    const pdfDoc = await PDFDocument.load(arrayBuffer);
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
    const pdfDoc = await PDFDocument.load(arrayBuffer);
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

// NEW: Comprehensive Annotation Support with "True Edit" Logic
export const applyAnnotations = async (file, annotations) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
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

            // Draw new text
            const fontSize = ann.fontSize || 12;
            const text = ann.text;
            const maxWidth = maskW * 1.5; // Allow more expansion

            // Word Wrap
            const words = text.split(' ');
            let line = '';
            let currentTempY = pdfTopY - fontSize;

            for (let n = 0; n < words.length; n++) {
                const testLine = line + words[n] + ' ';
                const testWidth = font.widthOfTextAtSize(testLine, fontSize);
                if (testWidth > maxWidth && n > 0) {
                    page.drawText(line, {
                        x: maskX,
                        y: currentTempY,
                        size: fontSize,
                        font: font,
                        color: annColor,
                    });
                    line = words[n] + ' ';
                    currentTempY -= (fontSize * 1.2);
                } else {
                    line = testLine;
                }
            }
            page.drawText(line, {
                x: maskX,
                y: currentTempY,
                size: fontSize,
                font: font,
                color: annColor,
            });
            continue;
        }

        // Standard annotations
        if (ann.type === 'text') {
            const textSize = ann.fontSize || 12;
            if (ann.backgroundColor) {
                // ... Patch mask logic ...
                const textWidth = font.widthOfTextAtSize(ann.text, textSize);
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

            page.drawText(ann.text, {
                x: x + (ann.backgroundColor ? 2 : 0),
                y: y - textSize,
                size: textSize,
                font: font,
                color: annColor,
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
