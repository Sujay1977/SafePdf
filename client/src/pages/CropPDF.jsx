import React, { useState, useCallback, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { cropResizePDF } from "../utils/pdf";
import { saveAs } from "file-saver";
import { Trash2, ArrowRight, Loader2, Shield, CheckCircle, ChevronLeft, ChevronRight, Download, AlertTriangle } from "lucide-react";
import clsx from "clsx";
import ClientOnly from "../components/ClientOnly";
import { getToolTheme } from "../utils/theme";
import ToolHeroIcon from "../components/ToolHeroIcon";
import SEO from "../components/SEO";
import ToolPageHeader from "../components/ToolPageHeader";
import CropPDFContent, { cropFaqs } from "../components/content/CropPDFContent";

// ── Standard page size presets (in PDF points; 1pt = 1/72 inch) ──
const PAGE_PRESETS = [
    { label: "A4 Portrait (595 x 842 pt)",   w: 595,  h: 842  },
    { label: "A4 Landscape (842 x 595 pt)",  w: 842,  h: 595  },
    { label: "Letter Portrait (612 x 792 pt)", w: 612, h: 792  },
    { label: "Letter Landscape (792 x 612 pt)", w: 792, h: 612 },
    { label: "Legal Portrait (612 x 1008 pt)", w: 612, h: 1008 },
    { label: "Custom",                         w: null, h: null },
];

const RENDER_SCALE = 1.5; // canvas preview resolution

// ── CropPDF ────────────────────────────────────────────────────────
const CropPDF = () => {
    const theme = getToolTheme("/crop-pdf");

    // File state
    const [file,       setFile]      = useState(null);
    const [numPages,   setNumPages]  = useState(0);
    const [pageIndex,  setPageIndex] = useState(0); // 0-based

    // Preview canvas
    const canvasRef = useRef(null);
    const [previewLoading, setPreviewLoading] = useState(false);
    const [previewError,   setPreviewError]   = useState(null);
    const pdfJsDocRef = useRef(null); // holds pdfjs PDFDocumentProxy

    // Crop mode
    const [mode, setMode] = useState("trim"); // "trim" | "resize"

    // Trim Margins settings (in points)
    const [margins, setMargins] = useState({ top: 0, bottom: 0, left: 0, right: 0 });

    // Resize settings
    const [presetIndex, setPresetIndex] = useState(0);
    const [customW, setCustomW] = useState(595);
    const [customH, setCustomH] = useState(842);

    // Apply-to scope
    const [applyScope, setApplyScope] = useState("all"); // "all" | "current"

    // Processing / download state
    const [isProcessing, setIsProcessing] = useState(false);
    const [downloadDone,  setDownloadDone] = useState(false);
    const [error,         setError]        = useState(null);

    // ── Dropzone ──────────────────────────────────────────────────
    const onDrop = useCallback((accepted) => {
        if (!accepted?.length) return;
        const f = accepted[0];
        setFile(f);
        setPageIndex(0);
        setError(null);
        setDownloadDone(false);
        pdfJsDocRef.current = null;
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept:   { "application/pdf": [".pdf"] },
        multiple: false,
    });

    const handleRemoveFile = () => {
        setFile(null);
        setNumPages(0);
        setPageIndex(0);
        setError(null);
        setDownloadDone(false);
        pdfJsDocRef.current = null;
    };

    // ── Render page preview on canvas ────────────────────────────
    useEffect(() => {
        if (!file) return;

        let cancelled = false;
        setPreviewLoading(true);
        setPreviewError(null);

        (async () => {
            try {
                // Lazy-import pdfjs to keep chunk small
                const pdfjsLib = await import("pdfjs-dist");
                const pdfjsWorker = await import("pdfjs-dist/build/pdf.worker.min.mjs?url");
                pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker.default;

                // Load doc only once, re-use for page navigation
                if (!pdfJsDocRef.current) {
                    const buf = await file.arrayBuffer();
                    pdfJsDocRef.current = await pdfjsLib.getDocument({ data: buf }).promise;
                    if (!cancelled) setNumPages(pdfJsDocRef.current.numPages);
                }

                const page     = await pdfJsDocRef.current.getPage(pageIndex + 1);
                const viewport = page.getViewport({ scale: RENDER_SCALE });

                if (!canvasRef.current || cancelled) return;
                const canvas = canvasRef.current;
                canvas.width  = viewport.width;
                canvas.height = viewport.height;
                const ctx = canvas.getContext("2d");
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                await page.render({ canvasContext: ctx, viewport }).promise;
            } catch (err) {
                if (!cancelled) {
                    console.error("Preview render error:", err);
                    setPreviewError("Could not render preview. The file may be encrypted or damaged.");
                }
            } finally {
                if (!cancelled) setPreviewLoading(false);
            }
        })();

        return () => { cancelled = true; };
    }, [file, pageIndex]);

    // ── Derived page resize target ────────────────────────────────
    const selectedPreset = PAGE_PRESETS[presetIndex];
    const targetW = selectedPreset.w ?? customW;
    const targetH = selectedPreset.h ?? customH;

    // ── Crop margin clamping helper ────────────────────────────────
    const setMargin = (key, rawVal) => {
        const val = Math.max(0, Math.min(500, Number(rawVal) || 0));
        setMargins(prev => ({ ...prev, [key]: val }));
    };

    // ── Build cropResizePDF options ───────────────────────────────
    const buildOptions = () => {
        const opts = { rasterize: false };

        if (mode === "trim") {
            opts.cropTop    = margins.top;
            opts.cropBottom = margins.bottom;
            opts.cropLeft   = margins.left;
            opts.cropRight  = margins.right;
            // pages filter — if "current", pass single page index
            if (applyScope === "current") opts.pages = [pageIndex];
        } else {
            // resize mode — XObject lossless scale
            opts.targetWidth  = targetW;
            opts.targetHeight = targetH;
            if (applyScope === "current") opts.pages = [pageIndex];
        }

        return opts;
    };

    // ── Validation ────────────────────────────────────────────────
    const validate = () => {
        if (mode === "trim") {
            if (margins.top < 0 || margins.bottom < 0 || margins.left < 0 || margins.right < 0)
                return "Margin values must be non-negative.";
            // We cannot know page dims here without re-loading; let cropResizePDF throw on invalid dims.
        }
        if (mode === "resize") {
            if (!targetW || !targetH || targetW <= 0 || targetH <= 0)
                return "Target width and height must be positive numbers.";
            if (targetW > 14400 || targetH > 14400)
                return "Target dimensions cannot exceed 14400 pt (200 inches).";
        }
        return null;
    };

    // ── Handle crop & download ─────────────────────────────────────
    const handleCrop = async () => {
        if (!file || isProcessing) return;

        const validationError = validate();
        if (validationError) { setError(validationError); return; }

        setIsProcessing(true);
        setError(null);
        setDownloadDone(false);

        try {
            const opts  = buildOptions();
            const blob  = await cropResizePDF(file, opts);
            const outName = `cropped_${file.name}`;
            saveAs(blob, outName);
            setDownloadDone(true);
            setTimeout(() => setDownloadDone(false), 4000);
        } catch (err) {
            console.error("Crop failed:", err);
            // Provide a user-friendly message depending on error code
            if (err.code === "INVALID_CROP") setError(`Invalid crop: ${err.message}`);
            else if (err.code === "LOAD_FAILED") setError("Could not open the PDF. It may be damaged or password-protected.");
            else setError(err.message || "An unexpected error occurred during processing.");
        } finally {
            setIsProcessing(false);
        }
    };

    // ── Page schema ───────────────────────────────────────────────
    const faqSchema = {
        "@context": "https://schema.org",
        "@type":    "FAQPage",
        "mainEntity": cropFaqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": { "@type": "Answer", "text": faq.a }
        }))
    };

    const pageSchema = [
        faqSchema,
        {
            "@context": "https://schema.org",
            "@type":    "SoftwareApplication",
            "name":     "SafePDF Crop & Resize PDF",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Windows, macOS, Linux, Chrome OS",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
        },
        {
            "@context": "https://schema.org",
            "@type":    "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home",         "item": "https://safepdf.site/" },
                { "@type": "ListItem", "position": 2, "name": "Crop PDF", "item": "https://safepdf.site/crop-pdf" }
            ]
        }
    ];

    // ── Render ────────────────────────────────────────────────────
    return (
        <article className="flex-grow flex flex-col items-center w-full px-4 py-8 md:py-12">
            <SEO
                title="Crop & Resize PDF Online Free | SafePDF"
                description="Crop PDF margins or resize PDF pages to A4, Letter, or custom dimensions — free, no upload, no watermark. Processed entirely in your browser."
                url="/crop-pdf"
            >
                <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
            </SEO>

            <ToolPageHeader
                title="Crop & Resize PDF"
                description="Trim PDF margins or resize pages to A4, Letter, or any custom size. Lossless processing runs entirely in your browser — your files are never uploaded."
            />

            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                {/* ── LEFT: Preview ──────────────────────────────── */}
                <div className="lg:col-span-7 flex flex-col gap-4">

                    {!file ? (
                        // Dropzone
                        <div
                            {...getRootProps()}
                            className={clsx(
                                "relative flex flex-col items-center justify-center h-80 rounded-3xl border-2 border-dashed transition-all cursor-pointer shadow-sm",
                                isDragActive
                                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md"
                                    : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-blue-400 hover:shadow-md group"
                            )}
                        >
                            <input {...getInputProps()} id="crop-upload" aria-label="Upload PDF document" />
                            <div className="flex flex-col items-center gap-4 text-center px-6">
                                <ToolHeroIcon icon="crop" theme={theme} />
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                                        {isDragActive ? "Drop your PDF here" : "Click to Select PDF"}
                                    </h2>
                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                        or drag and drop file here
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Preview area
                        <div className="flex flex-col gap-3">
                            {/* File info bar */}
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
                                <div className="flex-shrink-0 size-10 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400">
                                    <ClientOnly>
                                        <span className="material-symbols-outlined text-xl">picture_as_pdf</span>
                                    </ClientOnly>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{file.name}</p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">
                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </span>
                                        {numPages > 0 && (
                                            <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">
                                                {numPages} {numPages === 1 ? "page" : "pages"}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={handleRemoveFile}
                                    aria-label="Remove file"
                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            {/* Canvas preview */}
                            <div className="relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 min-h-[360px] flex items-center justify-center">
                                {previewLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-slate-50/80 dark:bg-slate-900/80 z-10">
                                        <Loader2 className="animate-spin text-blue-600" size={32} />
                                    </div>
                                )}
                                {previewError ? (
                                    <div className="flex flex-col items-center gap-3 p-8 text-center">
                                        <AlertTriangle className="text-amber-500" size={32} />
                                        <p className="text-sm text-slate-600 dark:text-slate-400">{previewError}</p>
                                    </div>
                                ) : (
                                    <canvas
                                        ref={canvasRef}
                                        className="max-w-full h-auto rounded-xl shadow-sm"
                                        style={{ display: previewLoading ? "none" : "block" }}
                                    />
                                )}
                            </div>

                            {/* Page navigation */}
                            {numPages > 1 && (
                                <div className="flex items-center justify-center gap-3">
                                    <button
                                        onClick={() => setPageIndex(p => Math.max(0, p - 1))}
                                        disabled={pageIndex === 0}
                                        aria-label="Previous page"
                                        className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronLeft size={18} />
                                    </button>
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Page {pageIndex + 1} of {numPages}
                                    </span>
                                    <button
                                        onClick={() => setPageIndex(p => Math.min(numPages - 1, p + 1))}
                                        disabled={pageIndex === numPages - 1}
                                        aria-label="Next page"
                                        className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronRight size={18} />
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* ── RIGHT: Settings panel ────────────────────── */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 flex flex-col gap-5 lg:sticky lg:top-24">

                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Crop & Resize Settings</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Configure how your PDF pages will be modified.</p>
                        </div>

                        {/* ── Mode Toggle ──────────────────────── */}
                        <div>
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 block">Mode</label>
                            <div className="flex rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                                {[
                                    { id: "trim",   label: "Trim Margins" },
                                    { id: "resize", label: "Resize Page" },
                                ].map(({ id, label }) => (
                                    <button
                                        key={id}
                                        onClick={() => setMode(id)}
                                        className={clsx(
                                            "flex-1 py-2.5 text-sm font-semibold transition-all",
                                            mode === id
                                                ? "bg-primary text-white"
                                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
                                        )}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* ── Trim Margins inputs ──────────────── */}
                        {mode === "trim" && (
                            <div className="flex flex-col gap-4">
                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30 rounded-lg px-3 py-2">
                                    <strong className="text-amber-700 dark:text-amber-400">Note:</strong> Trim Margins hides content outside the new boundary but does not permanently delete it. Use Resize Page to physically scale content.
                                </p>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { key: "top",    label: "Top"    },
                                        { key: "bottom", label: "Bottom" },
                                        { key: "left",   label: "Left"   },
                                        { key: "right",  label: "Right"  },
                                    ].map(({ key, label }) => (
                                        <div key={key} className="flex flex-col gap-1">
                                            <label htmlFor={`margin-${key}`} className="text-xs font-semibold text-slate-600 dark:text-slate-400">{label}</label>
                                            <div className="relative flex items-center">
                                                <input
                                                    id={`margin-${key}`}
                                                    type="number"
                                                    min="0"
                                                    max="500"
                                                    value={margins[key]}
                                                    onChange={e => setMargin(key, e.target.value)}
                                                    className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                                <span className="absolute right-2.5 text-xs text-slate-400">pt</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setMargins({ top: 0, bottom: 0, left: 0, right: 0 })}
                                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline text-left"
                                >
                                    Reset margins
                                </button>
                            </div>
                        )}

                        {/* ── Resize Page inputs ───────────────── */}
                        {mode === "resize" && (
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="preset-select" className="text-xs font-semibold text-slate-600 dark:text-slate-400">Target Page Size</label>
                                    <select
                                        id="preset-select"
                                        value={presetIndex}
                                        onChange={e => setPresetIndex(Number(e.target.value))}
                                        className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {PAGE_PRESETS.map((p, i) => (
                                            <option key={i} value={i}>{p.label}</option>
                                        ))}
                                    </select>
                                </div>
                                {!selectedPreset.w && (
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="flex flex-col gap-1">
                                            <label htmlFor="custom-w" className="text-xs font-semibold text-slate-600 dark:text-slate-400">Width (pt)</label>
                                            <input
                                                id="custom-w"
                                                type="number"
                                                min="1"
                                                max="14400"
                                                value={customW}
                                                onChange={e => setCustomW(Number(e.target.value) || 595)}
                                                className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label htmlFor="custom-h" className="text-xs font-semibold text-slate-600 dark:text-slate-400">Height (pt)</label>
                                            <input
                                                id="custom-h"
                                                type="number"
                                                min="1"
                                                max="14400"
                                                value={customH}
                                                onChange={e => setCustomH(Number(e.target.value) || 842)}
                                                className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                )}
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    1 pt = 1/72 inch. A4 = 595 x 842 pt, US Letter = 612 x 792 pt.
                                </p>
                            </div>
                        )}

                        {/* ── Apply To ────────────────────────────── */}
                        {file && numPages > 1 && (
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Apply To</label>
                                <div className="flex flex-col gap-2">
                                    {[
                                        { id: "all",     label: "All pages" },
                                        { id: "current", label: `Current page only (page ${pageIndex + 1})` },
                                    ].map(({ id, label }) => (
                                        <label key={id} className="flex items-center gap-2.5 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="apply-scope"
                                                value={id}
                                                checked={applyScope === id}
                                                onChange={() => setApplyScope(id)}
                                                className="accent-blue-600"
                                            />
                                            <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ── Error message ────────────────────────── */}
                        {error && (
                            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30">
                                <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={16} />
                                <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                            </div>
                        )}

                        {/* ── Action button ─────────────────────────── */}
                        <button
                            onClick={handleCrop}
                            disabled={!file || isProcessing}
                            className={clsx(
                                "flex w-full items-center justify-center gap-2 rounded-xl h-12 px-6 text-white text-base font-bold tracking-[0.015em] shadow-lg transition-all",
                                downloadDone
                                    ? "bg-green-600 hover:bg-green-700 shadow-green-500/20"
                                    : "bg-primary hover:bg-blue-600 shadow-primary/20 hover:shadow-xl hover:scale-[1.01] active:scale-[0.98]",
                                (!file || isProcessing) && "!bg-slate-400 !shadow-none cursor-not-allowed scale-100"
                            )}
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    <span>Processing…</span>
                                </>
                            ) : downloadDone ? (
                                <>
                                    <CheckCircle size={20} />
                                    <span>Downloaded!</span>
                                </>
                            ) : (
                                <>
                                    <Download size={20} />
                                    <span>Crop & Download PDF</span>
                                </>
                            )}
                        </button>

                        {/* ── Privacy notice ────────────────────────── */}
                        <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20">
                            <Shield className="text-primary mt-0.5 shrink-0" size={16} />
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                Your files are processed locally in your browser and never uploaded.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <CropPDFContent />
        </article>
    );
};

export default CropPDF;
