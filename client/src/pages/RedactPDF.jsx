import SEO from '../components/SEO';
import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { getPageThumbnail, redactPDF } from '../utils/pdf';
import { saveAs } from 'file-saver';
import {
    FileUp, ArrowRight, Loader2, Check, Download, Shield, AlertTriangle,
    Trash2, RefreshCw, Layers, EyeOff, ChevronLeft, ChevronRight,
    Square, Info, X, Plus
} from 'lucide-react';
import clsx from 'clsx';
import { getToolTheme } from '../utils/theme';
import ToolHeroIcon from '../components/ToolHeroIcon';
import ToolPageHeader from '../components/ToolPageHeader';
import RedactPDFContent, { redactPDFFaqs } from '../components/content/RedactPDFContent';

const REDACTION_COLORS = [
    { label: 'Blackout', value: '#000000', bgClass: 'bg-black text-white' },
    { label: 'Whiteout', value: '#FFFFFF', bgClass: 'bg-white text-slate-900 border border-slate-300' },
    { label: 'Dark Grey', value: '#374151', bgClass: 'bg-gray-700 text-white' },
];

const RedactPDF = () => {
    const theme = getToolTheme('/redact-pdf');

    // Document state
    const [file, setFile] = useState(null);
    const [numPages, setNumPages] = useState(1);
    const [pages, setPages] = useState([]);
    const [activePageIndex, setActivePageIndex] = useState(0);
    const [pageLoading, setPageLoading] = useState(false);

    // Redaction state: array of { id, pageIndex, x, y, width, height, color } (normalized 0-1)
    const [redactions, setRedactions] = useState([]);
    const [selectedRedactionId, setSelectedRedactionId] = useState(null);
    const [activeColor, setActiveColor] = useState('#000000');

    // Drawing state
    const [isDrawing, setIsDrawing] = useState(false);
    const [drawStart, setDrawStart] = useState(null);
    const [currentDrawBox, setCurrentDrawBox] = useState(null);

    // Export & progress state
    const [isProcessing, setIsProcessing] = useState(false);
    const [processProgress, setProcessProgress] = useState(0);
    const [downloadDone, setDownloadDone] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const canvasContainerRef = useRef(null);

    // Load active page thumbnail
    useEffect(() => {
        if (!file) return;
        let cancelled = false;
        setPageLoading(true);

        const loadActive = async () => {
            try {
                if (!pages[activePageIndex]) {
                    const result = await getPageThumbnail(file, activePageIndex + 1);
                    if (!cancelled && result) {
                        if (result.numPages) setNumPages(result.numPages);
                        setPages(prev => {
                            const newPages = [...prev];
                            newPages[activePageIndex] = result;
                            return newPages;
                        });
                    }
                }
            } catch (err) {
                console.error('Failed to load page:', err);
                if (!cancelled) setErrorMessage('Could not render page preview.');
            } finally {
                if (!cancelled) setPageLoading(false);
            }
        };

        loadActive();
        return () => { cancelled = true; };
    }, [file, activePageIndex, pages]);

    // Dropzone callback
    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            setFile(acceptedFiles[0]);
            setPages([]);
            setActivePageIndex(0);
            setNumPages(1);
            setRedactions([]);
            setSelectedRedactionId(null);
            setErrorMessage('');
            setDownloadDone(false);
            setProcessProgress(0);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    });

    const getNormalizedCoords = (e) => {
        const container = canvasContainerRef.current;
        if (!container) return { x: 0, y: 0 };
        const rect = container.getBoundingClientRect();
        const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
        const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
        const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
        return { x, y };
    };

    const handlePointerDown = (e) => {
        if (!pages[activePageIndex] || isProcessing) return;
        if (e.target.closest('.redaction-handle') || e.target.closest('.redaction-delete')) return;

        const coords = getNormalizedCoords(e);
        setIsDrawing(true);
        setDrawStart(coords);
        setCurrentDrawBox({ x: coords.x, y: coords.y, width: 0, height: 0 });
        setSelectedRedactionId(null);

        // Capture pointer if available
        if (e.currentTarget.setPointerCapture && e.pointerId !== undefined) {
            try {
                e.currentTarget.setPointerCapture(e.pointerId);
            } catch (err) {
                // Ignore pointer capture errors
            }
        }
    };

    const handlePointerMove = (e) => {
        if (!isDrawing || !drawStart) return;
        const coords = getNormalizedCoords(e);

        const x = Math.min(drawStart.x, coords.x);
        const y = Math.min(drawStart.y, coords.y);
        const width = Math.abs(coords.x - drawStart.x);
        const height = Math.abs(coords.y - drawStart.y);

        setCurrentDrawBox({ x, y, width, height });
    };

    const handlePointerUp = () => {
        if (!isDrawing || !currentDrawBox) {
            setIsDrawing(false);
            setDrawStart(null);
            setCurrentDrawBox(null);
            return;
        }

        // Add box if width & height > 0.5%
        if (currentDrawBox.width > 0.005 && currentDrawBox.height > 0.005) {
            const newBox = {
                id: `redact_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
                pageIndex: activePageIndex,
                x: currentDrawBox.x,
                y: currentDrawBox.y,
                width: currentDrawBox.width,
                height: currentDrawBox.height,
                color: activeColor,
            };

            setRedactions(prev => [...prev, newBox]);
            setSelectedRedactionId(newBox.id);
            setErrorMessage('');
        }

        setIsDrawing(false);
        setDrawStart(null);
        setCurrentDrawBox(null);
    };

    // Add preset redaction box at center
    const handleAddCenterRedaction = () => {
        if (!pages[activePageIndex]) return;
        const newBox = {
            id: `redact_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
            pageIndex: activePageIndex,
            x: 0.2,
            y: 0.25,
            width: 0.6,
            height: 0.06,
            color: activeColor,
        };
        setRedactions(prev => [...prev, newBox]);
        setSelectedRedactionId(newBox.id);
        setErrorMessage('');
    };

    const removeRedaction = (id) => {
        setRedactions(prev => prev.filter(r => r.id !== id));
        if (selectedRedactionId === id) setSelectedRedactionId(null);
    };

    const clearCurrentPageRedactions = () => {
        setRedactions(prev => prev.filter(r => r.pageIndex !== activePageIndex));
        setSelectedRedactionId(null);
    };

    const clearAllRedactions = () => {
        setRedactions([]);
        setSelectedRedactionId(null);
    };

    // Redact & Export
    const handleApplyRedaction = async () => {
        if (!file || redactions.length === 0 || isProcessing) return;

        setIsProcessing(true);
        setProcessProgress(0);
        setErrorMessage('');
        setDownloadDone(false);

        try {
            const blob = await redactPDF(file, redactions, {
                onProgress: (pct) => setProcessProgress(pct),
                redactionColor: activeColor
            });

            saveAs(blob, `redacted_${file.name}`);
            setDownloadDone(true);
            setTimeout(() => setDownloadDone(false), 4000);
        } catch (err) {
            console.error('Redaction failed:', err);
            setErrorMessage(err.message || 'Failed to redact PDF.');
        } finally {
            setIsProcessing(false);
        }
    };

    const activePage = pages[activePageIndex];
    const currentPageRedactions = useMemo(() => {
        return redactions.filter(r => r.pageIndex === activePageIndex);
    }, [redactions, activePageIndex]);

    const distinctRedactedPagesCount = useMemo(() => {
        const pagesSet = new Set(redactions.map(r => r.pageIndex));
        return pagesSet.size;
    }, [redactions]);

    const pageSchema = [
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": redactPDFFaqs.map(faq => ({
                "@type": "Question",
                "name": faq.q,
                "acceptedAnswer": { "@type": "Answer", "text": faq.a }
            }))
        },
        {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "SafePDF Redact PDF",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Windows, macOS, Linux, Chrome OS",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://safepdf.site/" },
                { "@type": "ListItem", "position": 2, "name": "Redact PDF", "item": "https://safepdf.site/redact-pdf" }
            ]
        }
    ];

    return (
        <article className="flex-grow flex flex-col items-center w-full px-4 py-8 md:py-12 relative">
            <SEO
                title="Redact PDF Online Free | Irreversible PDF Redaction | SafePDF"
                description="Permanently redact sensitive text, numbers, and images from PDF documents. Irreversible pixel-level sanitization with 100% browser-based privacy."
                url="/redact-pdf"
            >
                <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
            </SEO>

            <ToolPageHeader
                title="Redact PDF Document"
                description="Permanently black out or white out confidential text and images. 100% irreversible — your files never leave your computer."
            />

            {!file ? (
                /* Initial Dropzone */
                <div
                    {...getRootProps()}
                    className={clsx(
                        "w-full max-w-4xl h-80 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all shadow-sm group",
                        isDragActive
                            ? "border-red-500 bg-red-50 dark:bg-red-900/20 shadow-md"
                            : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-red-400 dark:hover:border-red-500 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:shadow-md"
                    )}
                >
                    <input {...getInputProps()} id="redact-upload" name="redact-upload" aria-label="Upload PDF to redact" className="hidden" />
                    <div className="flex flex-col items-center gap-4 text-center px-6">
                        <ToolHeroIcon icon="shield_locked" theme={theme} />
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-red-600 transition-colors">
                                {isDragActive ? "Drop PDF file here" : "Click to Upload PDF to Redact"}
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                                or drag and drop your document here
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                /* Main Workspace */
                <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* ── LEFT COLUMN: Page Thumbnails & Canvas Viewport ── */}
                    <div className="lg:col-span-8 flex flex-col gap-4">
                        {/* File Header Bar */}
                        <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="size-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 shrink-0">
                                    <EyeOff size={20} />
                                </div>
                                <div className="truncate">
                                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{file.name}</p>
                                    <span className="text-xs text-slate-500 dark:text-slate-400">
                                        Page {activePageIndex + 1} of {numPages} • {redactions.length} zone{redactions.length === 1 ? '' : 's'} defined
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleAddCenterRedaction}
                                    className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 flex items-center gap-1.5"
                                    title="Add redaction zone"
                                >
                                    <Plus size={14} />
                                    <span>Add Box</span>
                                </button>
                                <button
                                    onClick={() => { setFile(null); setRedactions([]); }}
                                    className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                    title="Remove file"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Interactive Canvas Viewport */}
                        <div className="flex flex-col items-center bg-slate-100 dark:bg-slate-950 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden relative">
                            <div className="w-full flex items-center justify-between text-xs text-slate-500 mb-3 px-2">
                                <span className="font-semibold">Click and drag over sensitive text/images to place redaction boxes</span>
                                <span>{currentPageRedactions.length} on this page</span>
                            </div>

                            {pageLoading && !activePage ? (
                                <div className="h-96 flex flex-col items-center justify-center gap-3 text-slate-400">
                                    <Loader2 className="animate-spin text-red-500" size={32} />
                                    <span className="text-xs font-medium">Rendering high-resolution page preview…</span>
                                </div>
                            ) : activePage ? (
                                <div
                                    ref={canvasContainerRef}
                                    onPointerDown={handlePointerDown}
                                    onPointerMove={handlePointerMove}
                                    onPointerUp={handlePointerUp}
                                    className="relative shadow-2xl rounded-sm cursor-crosshair select-none bg-white max-w-full touch-none"
                                    style={{
                                        width: activePage.originalWidth || 595,
                                        height: activePage.originalHeight || 842,
                                        aspectRatio: `${activePage.originalWidth || 595} / ${activePage.originalHeight || 842}`
                                    }}
                                >
                                    <img
                                        src={activePage.thumbnail}
                                        alt={`Page ${activePageIndex + 1}`}
                                        className="w-full h-full object-contain pointer-events-none select-none"
                                        draggable={false}
                                    />

                                    {/* Placed Redaction Boxes */}
                                    {currentPageRedactions.map((box) => {
                                        const isSelected = selectedRedactionId === box.id;
                                        return (
                                            <div
                                                key={box.id}
                                                style={{
                                                    position: 'absolute',
                                                    left: `${box.x * 100}%`,
                                                    top: `${box.y * 100}%`,
                                                    width: `${box.width * 100}%`,
                                                    height: `${box.height * 100}%`,
                                                    backgroundColor: box.color || '#000000',
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedRedactionId(box.id);
                                                }}
                                                className={clsx(
                                                    "group transition-shadow cursor-pointer",
                                                    box.color === '#FFFFFF' ? "border border-slate-300 shadow-sm" : "",
                                                    isSelected ? "ring-2 ring-blue-500 shadow-lg" : "hover:ring-1 hover:ring-red-400"
                                                )}
                                            >
                                                {/* Delete Button on Hover / Selected */}
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeRedaction(box.id);
                                                    }}
                                                    className="redaction-delete absolute -top-3 -right-3 size-6 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-20"
                                                    title="Delete this redaction"
                                                >
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        );
                                    })}

                                    {/* Active Drawing Box */}
                                    {isDrawing && currentDrawBox && (
                                        <div
                                            style={{
                                                position: 'absolute',
                                                left: `${currentDrawBox.x * 100}%`,
                                                top: `${currentDrawBox.y * 100}%`,
                                                width: `${currentDrawBox.width * 100}%`,
                                                height: `${currentDrawBox.height * 100}%`,
                                                backgroundColor: activeColor,
                                                opacity: 0.85
                                            }}
                                            className="border-2 border-red-500 border-dashed pointer-events-none"
                                        />
                                    )}
                                </div>
                            ) : null}

                            {/* Multi-page Navigation Strip */}
                            {numPages > 1 && (
                                <div className="flex items-center justify-center gap-3 mt-4">
                                    <button
                                        onClick={() => setActivePageIndex(p => Math.max(0, p - 1))}
                                        disabled={activePageIndex === 0}
                                        className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40"
                                    >
                                        <ChevronLeft size={18} />
                                    </button>
                                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                                        Page {activePageIndex + 1} of {numPages}
                                    </span>
                                    <button
                                        onClick={() => setActivePageIndex(p => Math.min(numPages - 1, p + 1))}
                                        disabled={activePageIndex >= numPages - 1}
                                        className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40"
                                    >
                                        <ChevronRight size={18} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ── RIGHT COLUMN: Controls & Redaction Summary ── */}
                    <div className="lg:col-span-4 flex flex-col gap-5 lg:sticky lg:top-24">
                        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 flex flex-col gap-5">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Redaction Settings</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Configure fill style and verify target regions before applying.
                                </p>
                            </div>

                            {/* Redaction Style Selector */}
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Box Style</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {REDACTION_COLORS.map(c => (
                                        <button
                                            key={c.value}
                                            onClick={() => setActiveColor(c.value)}
                                            className={clsx(
                                                "py-2 px-2 text-xs font-semibold rounded-xl border transition-all flex flex-col items-center gap-1.5",
                                                activeColor === c.value
                                                    ? "border-primary ring-2 ring-primary/20 bg-slate-50 dark:bg-slate-900"
                                                    : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
                                            )}
                                        >
                                            <span className={clsx("size-4 rounded-md shadow-inner", c.bgClass)} />
                                            <span>{c.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Redaction Stats */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700/60">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">Total Zones</span>
                                    <p className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">{redactions.length}</p>
                                </div>
                                <div className="p-3.5 rounded-xl bg-red-50/50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30">
                                    <span className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase">Pages Affected</span>
                                    <p className="text-xl font-bold text-red-700 dark:text-red-300 mt-0.5">{distinctRedactedPagesCount}</p>
                                </div>
                            </div>

                            {/* Irreversible Warning Box */}
                            <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30">
                                <AlertTriangle className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" size={18} />
                                <div className="space-y-1 text-xs text-amber-900 dark:text-amber-300 leading-relaxed">
                                    <p className="font-bold">Permanent Sanitization</p>
                                    <p className="text-[11px] text-amber-800 dark:text-amber-400">
                                        Redacted areas are permanently burned into page graphics. All underlying text, font streams, and metadata are destroyed.
                                    </p>
                                </div>
                            </div>

                            {/* Actions: Clear Current Page / Clear All */}
                            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100 dark:border-slate-700">
                                <button
                                    onClick={clearCurrentPageRedactions}
                                    disabled={currentPageRedactions.length === 0}
                                    className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-semibold disabled:opacity-40"
                                >
                                    Clear Page {activePageIndex + 1}
                                </button>
                                <button
                                    onClick={clearAllRedactions}
                                    disabled={redactions.length === 0}
                                    className="text-red-500 hover:text-red-600 font-semibold disabled:opacity-40"
                                >
                                    Clear All Zones
                                </button>
                            </div>

                            {/* Progress bar */}
                            {isProcessing && (
                                <div className="flex flex-col gap-1.5 animate-in fade-in">
                                    <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
                                        <span>Rasterizing &amp; Sanitizing Pages…</span>
                                        <span>{processProgress}%</span>
                                    </div>
                                    <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                                        <div
                                            className="bg-red-600 h-full transition-all duration-300 rounded-full"
                                            style={{ width: `${processProgress}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Error notification */}
                            {errorMessage && (
                                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30">
                                    <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={16} />
                                    <p className="text-xs text-red-700 dark:text-red-400">{errorMessage}</p>
                                </div>
                            )}

                            {/* Export / Download Button */}
                            <button
                                onClick={handleApplyRedaction}
                                disabled={redactions.length === 0 || isProcessing}
                                className={clsx(
                                    "flex w-full items-center justify-center gap-2 rounded-xl h-12 px-6 text-white text-base font-bold tracking-[0.015em] shadow-lg transition-all",
                                    downloadDone
                                        ? "bg-green-600 hover:bg-green-700 shadow-green-500/20"
                                        : "bg-red-600 hover:bg-red-700 shadow-red-500/20 hover:shadow-xl hover:scale-[1.01] active:scale-[0.98]",
                                    (redactions.length === 0 || isProcessing) && "!bg-slate-400 !shadow-none cursor-not-allowed scale-100"
                                )}
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        <span>Burning Redactions…</span>
                                    </>
                                ) : downloadDone ? (
                                    <>
                                        <Check size={20} />
                                        <span>Downloaded!</span>
                                    </>
                                ) : (
                                    <>
                                        <EyeOff size={20} />
                                        <span>Apply Redactions &amp; Download</span>
                                    </>
                                )}
                            </button>

                            {/* Privacy Guarantee */}
                            <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20">
                                <Shield className="text-primary mt-0.5 shrink-0" size={16} />
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Your files are processed locally in your browser and never uploaded.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <RedactPDFContent />
        </article>
    );
};

export default RedactPDF;
