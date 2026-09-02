import React, { useState, useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { pdfsToZip } from "../utils/pdf";
import { saveAs } from "file-saver";
import { Trash2, FileUp, ArrowRight, Loader2, Shield, CheckCircle, FolderArchive, AlertTriangle, FileText, Download } from "lucide-react";
import clsx from "clsx";
import ClientOnly from "../components/ClientOnly";
import { getToolTheme } from "../utils/theme";
import ToolHeroIcon from "../components/ToolHeroIcon";
import SEO from "../components/SEO";
import ToolPageHeader from "../components/ToolPageHeader";
import PDFToZipContent, { pdfToZipFaqs } from "../components/content/PDFToZipContent";

const formatBytes = (bytes) => {
    if (!bytes || bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

const PDFToZip = () => {
    const theme = getToolTheme("/pdf-to-zip");

    // File state
    const [files, setFiles] = useState([]);
    const [zipFileName, setZipFileName] = useState("documents");
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [downloadDone, setDownloadDone] = useState(false);
    const [error, setError] = useState(null);

    // Calculate total size
    const totalSize = useMemo(() => {
        return files.reduce((acc, curr) => acc + (curr.file?.size || 0), 0);
    }, [files]);

    // Dropzone callback
    const onDrop = useCallback((acceptedFiles, fileRejections) => {
        setError(null);
        setDownloadDone(false);

        if (fileRejections && fileRejections.length > 0) {
            setError("Some files were rejected. Please select valid PDF documents.");
        }

        if (!acceptedFiles || acceptedFiles.length === 0) return;

        const newItems = acceptedFiles.map((file) => ({
            id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            file,
            name: file.name,
            size: file.size,
        }));

        setFiles((prev) => [...prev, ...newItems]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "application/pdf": [".pdf"] },
        multiple: true,
    });

    const removeFile = (id) => {
        setFiles((prev) => prev.filter((f) => f.id !== id));
        setError(null);
        setDownloadDone(false);
    };

    const clearAll = () => {
        setFiles([]);
        setError(null);
        setDownloadDone(false);
        setProgress(0);
    };

    // Handle ZIP generation
    const handleCreateZip = async () => {
        if (files.length === 0 || isProcessing) return;

        setIsProcessing(true);
        setError(null);
        setDownloadDone(false);
        setProgress(0);

        try {
            const rawFiles = files.map((f) => f.file);
            const zipBlob = await pdfsToZip(rawFiles, {
                onProgress: (pct) => setProgress(pct),
            });

            // Clean custom filename
            let outName = (zipFileName || "documents").trim();
            if (!outName.toLowerCase().endsWith(".zip")) outName += ".zip";

            saveAs(zipBlob, outName);
            setDownloadDone(true);
            setTimeout(() => setDownloadDone(false), 4000);
        } catch (err) {
            console.error("PDF to ZIP failed:", err);
            if (err.code === "INVALID_FILE") {
                setError(`Validation error: ${err.message}`);
            } else if (err.code === "NO_FILES") {
                setError("Please select at least one PDF file to convert.");
            } else {
                setError(err.message || "Failed to create ZIP archive. Please try again.");
            }
        } finally {
            setIsProcessing(false);
        }
    };

    // SEO Schemas
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": pdfToZipFaqs.map((faq) => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": { "@type": "Answer", "text": faq.a },
        })),
    };

    const pageSchema = [
        faqSchema,
        {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "SafePDF PDF to ZIP Converter",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Windows, macOS, Linux, Chrome OS",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://safepdfs.com/" },
                { "@type": "ListItem", "position": 2, "name": "PDF to ZIP", "item": "https://safepdfs.com/pdf-to-zip" },
            ],
        },
        {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "PDF to ZIP Online Free | Compress PDFs into ZIP Archive",
            "url": "https://safepdfs.com/pdf-to-zip",
        },
    ];

    return (
        <article className="flex-grow flex flex-col items-center w-full px-4 py-8 md:py-12">
            <SEO
                title="PDF to ZIP Online Free | SafePDF"
                description="Convert multiple PDF files into a single compressed ZIP archive. 100% free, secure, fast, and processed locally in your browser."
                url="/pdf-to-zip"
            >
                <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
            </SEO>

            <ToolPageHeader
                title="PDF to ZIP Converter"
                description="Compress and package multiple Portable Document Format (PDF) files into a single ZIP archive. 100% private — your files never leave your device."
            />

            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* ── LEFT COLUMN: File Selection & Grid ──────────── */}
                <div className="lg:col-span-7 flex flex-col gap-4">
                    {files.length === 0 ? (
                        /* Initial Dropzone */
                        <div
                            {...getRootProps()}
                            className={clsx(
                                "relative flex flex-col items-center justify-center h-80 rounded-3xl border-2 border-dashed transition-all cursor-pointer shadow-sm",
                                isDragActive
                                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md"
                                    : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-blue-400 hover:shadow-md group"
                            )}
                        >
                            <input {...getInputProps()} id="zip-upload" aria-label="Upload PDF documents to convert to ZIP" />
                            <div className="flex flex-col items-center gap-4 text-center px-6">
                                <ToolHeroIcon icon="folder_zip" theme={theme} />
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                                        {isDragActive ? "Drop PDF files here" : "Click to Select PDFs"}
                                    </h2>
                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                        or drag and drop multiple PDF files here
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Selected Files View */
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between px-1">
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                    Selected PDFs ({files.length})
                                </h2>
                                <button
                                    onClick={clearAll}
                                    className="flex items-center gap-1.5 text-xs font-semibold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                                >
                                    <Trash2 size={14} />
                                    <span>Clear all</span>
                                </button>
                            </div>

                            {/* File List Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[460px] overflow-y-auto pr-1">
                                {files.map((item, idx) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-3 p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm relative group hover:border-blue-300 dark:hover:border-blue-600 transition-all"
                                    >
                                        <div className="flex-shrink-0 size-10 rounded-lg bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
                                            <ClientOnly>
                                                <span className="material-symbols-outlined text-xl">picture_as_pdf</span>
                                            </ClientOnly>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-slate-900 dark:text-white truncate" title={item.name}>
                                                {item.name}
                                            </p>
                                            <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full inline-block mt-0.5">
                                                {formatBytes(item.size)}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => removeFile(item.id)}
                                            aria-label={`Remove ${item.name}`}
                                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}

                                {/* Add More Files Dropzone Box */}
                                <div
                                    {...getRootProps()}
                                    className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed border-primary/30 dark:border-primary/40 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer text-center min-h-[72px]"
                                >
                                    <input {...getInputProps()} id="zip-upload-more" aria-label="Add more PDF files" />
                                    <div className="flex items-center gap-2 text-primary font-bold text-sm">
                                        <FileUp size={18} />
                                        <span>Add more PDFs</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* ── RIGHT COLUMN: Archive Settings & Actions ──── */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 flex flex-col gap-5 lg:sticky lg:top-24">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">ZIP Archive Settings</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Configure your output ZIP archive name.</p>
                        </div>

                        {/* Archive Name Input */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="zip-name-input" className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                                Archive Name
                            </label>
                            <div className="relative flex items-center">
                                <input
                                    id="zip-name-input"
                                    type="text"
                                    value={zipFileName}
                                    onChange={(e) => setZipFileName(e.target.value)}
                                    placeholder="documents"
                                    className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm px-3 py-2.5 pr-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <span className="absolute right-3 text-xs font-semibold text-slate-400">.zip</span>
                            </div>
                        </div>

                        {/* Summary Box */}
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex flex-col gap-2">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500 dark:text-slate-400">Total PDF files:</span>
                                <span className="font-bold text-slate-900 dark:text-white">{files.length}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500 dark:text-slate-400">Combined size:</span>
                                <span className="font-bold text-slate-900 dark:text-white">{formatBytes(totalSize)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500 dark:text-slate-400">Compression:</span>
                                <span className="font-semibold text-green-600 dark:text-green-400">Standard DEFLATE</span>
                            </div>
                        </div>

                        {/* Progress Bar (when processing) */}
                        {isProcessing && (
                            <div className="flex flex-col gap-1.5">
                                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                                    <span>Compressing files...</span>
                                    <span>{progress}%</span>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                                    <div
                                        className="bg-primary h-2 rounded-full transition-all duration-200"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Error Alert */}
                        {error && (
                            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30">
                                <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={16} />
                                <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                            </div>
                        )}

                        {/* Action Button */}
                        <button
                            onClick={handleCreateZip}
                            disabled={files.length === 0 || isProcessing}
                            className={clsx(
                                "flex w-full items-center justify-center gap-2 rounded-xl h-12 px-6 text-white text-base font-bold tracking-[0.015em] shadow-lg transition-all",
                                downloadDone
                                    ? "bg-green-600 hover:bg-green-700 shadow-green-500/20"
                                    : "bg-primary hover:bg-blue-600 shadow-primary/20 hover:shadow-xl hover:scale-[1.01] active:scale-[0.98]",
                                (files.length === 0 || isProcessing) && "!bg-slate-400 !shadow-none cursor-not-allowed scale-100"
                            )}
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    <span>Creating ZIP ({progress}%)…</span>
                                </>
                            ) : downloadDone ? (
                                <>
                                    <CheckCircle size={20} />
                                    <span>Downloaded!</span>
                                </>
                            ) : (
                                <>
                                    <Download size={20} />
                                    <span>Convert to ZIP &amp; Download</span>
                                </>
                            )}
                        </button>

                        {/* Privacy Notice */}
                        <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20">
                            <Shield className="text-primary mt-0.5 shrink-0" size={16} />
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                Your files are processed locally in your browser and never uploaded.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <PDFToZipContent />
        </article>
    );
};

export default PDFToZip;
