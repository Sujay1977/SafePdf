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

export const unlockPDF = async (file, password) => {
    const arrayBuffer = await file.arrayBuffer();
    try {
        const pdfDoc = await PDFDocument.load(arrayBuffer, { password });
        const pdfBytes = await pdfDoc.save();
        return new Blob([pdfBytes], { type: 'application/pdf' });
    } catch (error) {
        throw new Error("Incorrect password or file error");
    }
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
