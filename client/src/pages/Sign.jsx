import SEO from "../components/SEO";
import React, { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { getPageThumbnail, addSignatureToPDF } from "../utils/pdf";
import { saveAs } from "file-saver";
import {
    Trash2, FileUp, ArrowRight, Loader2, PenTool, Check, X,
    Type, Upload, ChevronLeft, ChevronRight, Download, Shield, AlertTriangle, Sparkles, RefreshCw
} from "lucide-react";
import clsx from "clsx";
import { getToolTheme } from "../utils/theme";
import ToolHeroIcon from "../components/ToolHeroIcon";
import ToolPageHeader from "../components/ToolPageHeader";
import SignContent, { signFaqs } from "../components/content/SignContent";
const SignatureCanvas = React.lazy(() => import("react-signature-canvas"));

const CURSIVE_FONTS = [
    { name: "Elegant Script", font: "38px 'Brush Script MT', 'Dancing Script', cursive" },
    { name: "Casual Flow",   font: "34px 'Caveat', 'Comic Sans MS', cursive" },
    { name: "Classic Calligraphy", font: "36px 'Great Vibes', 'Lucida Calligraphy', cursive" },
    { name: "Modern Handwriting",  font: "32px 'Segoe Script', cursive" },
];

const INK_COLORS = [
    { label: "Black",     value: "#111827" },
    { label: "Navy Blue", value: "#1e3a8a" },
    { label: "Dark Red",  value: "#991b1b" },
];

const Sign = () => {
    const theme = getToolTheme("/sign");

    // Document state
    const [file, setFile] = useState(null);
    const [page, setPage] = useState(null); // { thumbnail, width, height, numPages }
    const [pageIndex, setPageIndex] = useState(0);
    const [numPages, setNumPages] = useState(1);
    const [pageLoading, setPageLoading] = useState(false);

    // Signature creation modal state
    const [showSigModal, setShowSigModal] = useState(false);
    const [sigMode, setSigMode] = useState("draw"); // "draw" | "type" | "upload"
    const [typedName, setTypedName] = useState("");
    const [selectedFontIdx, setSelectedFontIdx] = useState(0);
    const [selectedInkColor, setSelectedInkColor] = useState("#111827");
    const [uploadedSigData, setUploadedSigData] = useState(null);

    // Active signature asset { dataUrl, aspectRatio, width, height }
    const [activeSignature, setActiveSignature] = useState(null);

    // Placed signatures across pages: [{ id, image, pageIndex, x, y, width, height, aspectRatio }]
    const [placedSignatures, setPlacedSignatures] = useState([]);
    const [sigScalePreset, setSigScalePreset] = useState(0.22); // fraction of page width

    // Workflow state
    const [isProcessing, setIsProcessing] = useState(false);
    const [downloadDone, setDownloadDone] = useState(false);
    const [signError, setSignError] = useState("");

    const sigCanvasRef = useRef(null);
    const fileInputRef = useRef(null);

    // Load page thumbnail
    useEffect(() => {
        if (!file) return;
        let cancelled = false;
        setPageLoading(true);

        (async () => {
            try {
                const result = await getPageThumbnail(file, pageIndex + 1);
                if (!cancelled && result) {
                    setPage(result);
                    if (result.numPages) setNumPages(result.numPages);
                }
            } catch (e) {
                console.error("Failed to load page thumbnail:", e);
                if (!cancelled) setSignError("Could not render page preview.");
            } finally {
                if (!cancelled) setPageLoading(false);
            }
        })();

        return () => { cancelled = true; };
    }, [file, pageIndex]);

    // Dropzone for initial PDF
    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            setFile(acceptedFiles[0]);
            setPageIndex(0);
            setPlacedSignatures([]);
            setSignError("");
            setDownloadDone(false);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "application/pdf": [".pdf"] },
        multiple: false
    });

    // Generate PNG from typed text using Canvas
    const generateTypedSignaturePng = (text, fontStyle, color) => {
        const canvas = document.createElement("canvas");
        canvas.width = 600;
        canvas.height = 180;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = fontStyle;
        ctx.fillStyle = color;
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText(text || "Your Signature", canvas.width / 2, canvas.height / 2);
        return {
            dataUrl: canvas.toDataURL("image/png"),
            aspectRatio: canvas.width / canvas.height,
        };
    };

    // Save signature from modal
    const handleSaveCreatedSignature = () => {
        if (sigMode === "draw") {
            if (!sigCanvasRef.current || sigCanvasRef.current.isEmpty()) return;
            const dataUrl = sigCanvasRef.current.toDataURL("image/png");
            const canvas = sigCanvasRef.current.getCanvas();
            const aspectRatio = (canvas.width || 500) / (canvas.height || 200);
            setActiveSignature({ dataUrl, aspectRatio });
        } else if (sigMode === "type") {
            if (!typedName.trim()) return;
            const fontObj = CURSIVE_FONTS[selectedFontIdx];
            const sig = generateTypedSignaturePng(typedName.trim(), fontObj.font, selectedInkColor);
            setActiveSignature(sig);
        } else if (sigMode === "upload") {
            if (!uploadedSigData) return;
            setActiveSignature(uploadedSigData);
        }

        setShowSigModal(false);
        setSignError("");
    };

    // Handle Upload image file
    const handleImageUpload = (e) => {
        const imgFile = e.target.files?.[0];
        if (!imgFile) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const aspectRatio = img.width / img.height;
                setUploadedSigData({ dataUrl: event.target.result, aspectRatio });
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(imgFile);
    };

    // Click on page preview to place or move signature
    const handleClickPage = (e) => {
        if (!activeSignature || !page) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = (e.clientX - rect.left) / rect.width;
        const clickY = (e.clientY - rect.top) / rect.height;

        const widthNorm = sigScalePreset;
        const pageAspect = (page.originalWidth || 595) / (page.originalHeight || 842);
        const heightNorm = (widthNorm * pageAspect) / (activeSignature.aspectRatio || 2.5);

        const xNorm = Math.max(0, Math.min(1 - widthNorm, clickX - (widthNorm / 2)));
        const yNorm = Math.max(0, Math.min(1 - heightNorm, clickY - (heightNorm / 2)));

        const newSig = {
            id: `sig_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
            image: activeSignature.dataUrl,
            pageIndex: pageIndex,
            x: xNorm,
            y: yNorm,
            width: widthNorm,
            height: heightNorm,
            aspectRatio: activeSignature.aspectRatio,
        };

        setPlacedSignatures((prev) => {
            const otherPages = prev.filter((s) => s.pageIndex !== pageIndex);
            return [...otherPages, newSig];
        });
        setSignError("");
    };

    const removeCurrentPageSignature = () => {
        setPlacedSignatures((prev) => prev.filter((s) => s.pageIndex !== pageIndex));
    };

    // Export PDF with signatures
    const handleSignExport = async () => {
        if (!file || placedSignatures.length === 0 || isProcessing) return;

        setIsProcessing(true);
        setSignError("");
        setDownloadDone(false);

        try {
            const blob = await addSignatureToPDF(file, placedSignatures);
            saveAs(blob, `signed_${file.name}`);
            setDownloadDone(true);
            setTimeout(() => setDownloadDone(false), 4000);
        } catch (e) {
            console.error("Signing failed:", e);
            const msg = (e?.message || "").toLowerCase();
            if (msg.includes("encrypt") || msg.includes("password") || msg.includes("decrypt")) {
                setSignError("This PDF is password protected. Please unlock it first using the Unlock tool.");
            } else {
                setSignError(e.message || "Failed to sign PDF. Please try another file.");
            }
        } finally {
            setIsProcessing(false);
        }
    };

    const currentPageSigs = useMemo(() => {
        return placedSignatures.filter((s) => s.pageIndex === pageIndex);
    }, [placedSignatures, pageIndex]);

    const pageSchema = [
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": signFaqs.map((faq) => ({
                "@type": "Question",
                "name": faq.q,
                "acceptedAnswer": { "@type": "Answer", "text": faq.a },
            })),
        },
        {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "SafePDF Sign",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Windows, macOS, Linux, Chrome OS",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://safepdfs.com/" },
                { "@type": "ListItem", "position": 2, "name": "Sign PDF", "item": "https://safepdfs.com/sign" },
            ],
        },
    ];

    return (
        <article className="flex-grow flex flex-col items-center w-full px-4 py-8 md:py-12 relative">
            <SEO
                title="Sign PDF Online Free | SafePDF"
                description="Sign PDF documents online directly in your browser. Draw, type, or upload your signature and place it securely on any page without uploads."
                url="/sign"
            >
                <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
            </SEO>

            {/* Signature Creation Modal */}
            {showSigModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl w-full max-w-xl border border-slate-100 dark:border-slate-700 flex flex-col gap-5">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <PenTool size={20} className="text-primary" />
                                <span>Create Your Signature</span>
                            </h2>
                            <button
                                onClick={() => setShowSigModal(false)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Mode Switcher */}
                        <div className="flex rounded-xl bg-slate-100 dark:bg-slate-700 p-1">
                            {[
                                { id: "draw",   label: "Draw",   icon: PenTool },
                                { id: "type",   label: "Type",   icon: Type    },
                                { id: "upload", label: "Upload", icon: Upload  },
                            ].map(({ id, label, icon: Icon }) => (
                                <button
                                    key={id}
                                    onClick={() => setSigMode(id)}
                                    className={clsx(
                                        "flex-1 py-2 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all",
                                        sigMode === id
                                            ? "bg-white dark:bg-slate-800 text-primary shadow-sm"
                                            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                                    )}
                                >
                                    <Icon size={16} />
                                    <span>{label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Draw Mode */}
                        {sigMode === "draw" && (
                            <div className="flex flex-col gap-3">
                                <div className="border-2 border-dashed border-slate-200 dark:border-slate-600 rounded-2xl overflow-hidden bg-white">
                                    <React.Suspense fallback={<div className="h-48 flex items-center justify-center text-slate-400">Loading signature canvas...</div>}>
                                        <SignatureCanvas
                                            ref={sigCanvasRef}
                                            canvasProps={{ width: 500, height: 180, className: "w-full h-48 cursor-crosshair" }}
                                            penColor={selectedInkColor}
                                        />
                                    </React.Suspense>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-slate-400">Use your mouse or fingertip to sign</span>
                                    <button
                                        onClick={() => sigCanvasRef.current?.clear()}
                                        className="text-primary font-semibold hover:underline flex items-center gap-1"
                                    >
                                        <RefreshCw size={12} />
                                        <span>Clear drawing</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Type Mode */}
                        {sigMode === "type" && (
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="type-name-input" className="text-xs font-bold uppercase text-slate-500">Your Full Name</label>
                                    <input
                                        id="type-name-input"
                                        type="text"
                                        placeholder="e.g. Jane Doe"
                                        value={typedName}
                                        onChange={(e) => setTypedName(e.target.value)}
                                        className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-base px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        autoFocus
                                    />
                                </div>

                                {/* Font Selector */}
                                <div className="flex flex-col gap-2">
                                    <span className="text-xs font-bold uppercase text-slate-500">Choose Style</span>
                                    <div className="grid grid-cols-2 gap-2">
                                        {CURSIVE_FONTS.map((item, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setSelectedFontIdx(idx)}
                                                className={clsx(
                                                    "p-3 rounded-xl border text-center transition-all bg-slate-50 dark:bg-slate-900",
                                                    selectedFontIdx === idx
                                                        ? "border-primary ring-2 ring-primary/20"
                                                        : "border-slate-200 dark:border-slate-700 hover:border-slate-300"
                                                )}
                                            >
                                                <p className="text-lg italic truncate text-slate-900 dark:text-white" style={{ fontFamily: "cursive" }}>
                                                    {typedName || "Jane Doe"}
                                                </p>
                                                <span className="text-[10px] text-slate-400 block mt-1">{item.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Ink Color */}
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold uppercase text-slate-500">Ink Color:</span>
                                    <div className="flex gap-2">
                                        {INK_COLORS.map((c) => (
                                            <button
                                                key={c.value}
                                                onClick={() => setSelectedInkColor(c.value)}
                                                className={clsx(
                                                    "size-7 rounded-full border-2 transition-transform",
                                                    selectedInkColor === c.value ? "scale-110 border-blue-500 ring-2 ring-blue-300" : "border-transparent"
                                                )}
                                                style={{ backgroundColor: c.value }}
                                                title={c.label}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Upload Mode */}
                        {sigMode === "upload" && (
                            <div className="flex flex-col gap-3">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageUpload}
                                    accept="image/png,image/jpeg,image/jpg"
                                    className="hidden"
                                />
                                {uploadedSigData ? (
                                    <div className="flex flex-col items-center p-6 border rounded-2xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 gap-3">
                                        <img src={uploadedSigData.dataUrl} alt="Uploaded Signature Preview" className="max-h-32 object-contain" />
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            className="text-xs text-primary font-semibold hover:underline"
                                        >
                                            Choose different image
                                        </button>
                                    </div>
                                ) : (
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="h-44 border-2 border-dashed rounded-2xl border-slate-200 dark:border-slate-600 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors p-4 text-center"
                                    >
                                        <Upload className="text-slate-400" size={28} />
                                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Click to upload signature image</p>
                                        <p className="text-xs text-slate-400">PNG or JPEG with clear background recommended</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Modal Footer */}
                        <div className="flex justify-end gap-3 pt-2 border-t border-slate-100 dark:border-slate-700">
                            <button
                                onClick={() => setShowSigModal(false)}
                                className="px-5 py-2.5 text-sm font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveCreatedSignature}
                                className="px-6 py-2.5 bg-primary hover:bg-blue-600 text-white text-sm font-bold rounded-xl shadow-md transition-all active:scale-95"
                            >
                                Use This Signature
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ToolPageHeader
                title="Sign PDF Document"
                description="Draw, type, or upload your electronic signature and place it securely on any page. 100% private — your files are never uploaded."
            />

            {!file ? (
                /* Initial Dropzone */
                <div
                    {...getRootProps()}
                    className={clsx(
                        "w-full max-w-4xl h-80 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all shadow-sm group",
                        isDragActive
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md"
                            : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:shadow-md"
                    )}
                >
                    <input {...getInputProps()} id="sign-upload" name="sign-upload" aria-label="Upload PDF document to sign" className="hidden" />
                    <div className="flex flex-col items-center gap-4 text-center px-6">
                        <ToolHeroIcon icon="signature" theme={theme} />
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                                {isDragActive ? "Drop PDF file here" : "Click to Select PDF"}
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                                or drag and drop your document here
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                /* Main Workspace */
                <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* LEFT COLUMN: Page Preview & Canvas Placement */}
                    <div className="lg:col-span-7 flex flex-col gap-3">
                        {/* File details bar */}
                        <div className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="size-9 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-red-600 shrink-0">
                                    <PenTool size={18} />
                                </div>
                                <div className="truncate">
                                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{file.name}</p>
                                    <span className="text-xs text-slate-500 dark:text-slate-400">
                                        Page {pageIndex + 1} of {numPages} • {placedSignatures.length} signature{placedSignatures.length === 1 ? "" : "s"} placed
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => { setFile(null); setPlacedSignatures([]); }}
                                className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                title="Remove document"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>

                        {/* Interactive Page Viewport */}
                        <div className="relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 min-h-[460px] flex items-center justify-center p-4">
                            {pageLoading ? (
                                <div className="flex flex-col items-center gap-3 text-slate-400">
                                    <Loader2 className="animate-spin text-primary" size={32} />
                                    <span className="text-xs font-medium">Loading page preview...</span>
                                </div>
                            ) : page ? (
                                <div
                                    className="relative shadow-md cursor-crosshair inline-block max-w-full"
                                    onClick={handleClickPage}
                                >
                                    <img
                                        src={page.thumbnail}
                                        alt={`PDF Page ${pageIndex + 1}`}
                                        className="max-w-full h-auto block select-none pointer-events-none rounded-lg"
                                    />

                                    {/* Render placed signatures on this page */}
                                    {currentPageSigs.map((sig) => (
                                        <div
                                            key={sig.id}
                                            style={{
                                                position: "absolute",
                                                left: `${sig.x * 100}%`,
                                                top: `${sig.y * 100}%`,
                                                width: `${sig.width * 100}%`,
                                                height: `${sig.height * 100}%`,
                                            }}
                                            className="border-2 border-blue-500 border-dashed bg-white/40 shadow-sm rounded group cursor-move p-0.5"
                                        >
                                            <img
                                                src={sig.image}
                                                alt="Placed Signature"
                                                className="w-full h-full object-contain pointer-events-none select-none"
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : null}
                        </div>

                        {/* Multi-page Navigation */}
                        {numPages > 1 && (
                            <div className="flex items-center justify-center gap-3">
                                <button
                                    onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
                                    disabled={pageIndex === 0}
                                    className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 disabled:opacity-40"
                                >
                                    <ChevronLeft size={18} />
                                </button>
                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    Page {pageIndex + 1} of {numPages}
                                </span>
                                <button
                                    onClick={() => setPageIndex((p) => Math.min(numPages - 1, p + 1))}
                                    disabled={pageIndex >= numPages - 1}
                                    className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 disabled:opacity-40"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN: Signature Controls & Export */}
                    <div className="lg:col-span-5 flex flex-col gap-4">
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 flex flex-col gap-5 lg:sticky lg:top-24">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Signature Controls</h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    {activeSignature ? "Click anywhere on the document to position your signature." : "Create your signature first to place it on pages."}
                                </p>
                            </div>

                            {/* Active Signature Preview / Create Button */}
                            {activeSignature ? (
                                <div className="flex flex-col gap-3">
                                    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 flex flex-col items-center gap-2">
                                        <span className="text-[10px] uppercase font-bold text-slate-400">Current Signature</span>
                                        <img src={activeSignature.dataUrl} alt="Active Signature" className="max-h-20 object-contain" />
                                    </div>
                                    <button
                                        onClick={() => setShowSigModal(true)}
                                        className="py-2 text-xs font-semibold text-primary hover:underline text-center"
                                    >
                                        Change or Redraw Signature
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setShowSigModal(true)}
                                    className="w-full py-3.5 bg-primary/10 hover:bg-primary/15 text-primary rounded-xl font-bold flex items-center justify-center gap-2 border border-primary/20 transition-all"
                                >
                                    <PenTool size={18} />
                                    <span>Create Signature (Draw / Type / Upload)</span>
                                </button>
                            )}

                            {/* Signature Size / Scale Options */}
                            {activeSignature && (
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Signature Size</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {[
                                            { label: "Small",  scale: 0.16 },
                                            { label: "Medium", scale: 0.24 },
                                            { label: "Large",  scale: 0.34 },
                                        ].map((s) => (
                                            <button
                                                key={s.label}
                                                onClick={() => setSigScalePreset(s.scale)}
                                                className={clsx(
                                                    "py-1.5 text-xs font-semibold rounded-lg border transition-all",
                                                    sigScalePreset === s.scale
                                                        ? "bg-primary text-white border-primary"
                                                        : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
                                                )}
                                            >
                                                {s.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Placed signature count & actions */}
                            {currentPageSigs.length > 0 && (
                                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-slate-700">
                                    <span className="text-green-600 dark:text-green-400 font-semibold flex items-center gap-1">
                                        <Check size={14} /> Signature placed on Page {pageIndex + 1}
                                    </span>
                                    <button
                                        onClick={removeCurrentPageSignature}
                                        className="text-red-500 hover:underline"
                                    >
                                        Remove from this page
                                    </button>
                                </div>
                            )}

                            {/* Error display */}
                            {signError && (
                                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30">
                                    <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={16} />
                                    <p className="text-sm text-red-700 dark:text-red-400">{signError}</p>
                                </div>
                            )}

                            {/* Download Action Button */}
                            <button
                                onClick={handleSignExport}
                                disabled={placedSignatures.length === 0 || isProcessing}
                                className={clsx(
                                    "flex w-full items-center justify-center gap-2 rounded-xl h-12 px-6 text-white text-base font-bold tracking-[0.015em] shadow-lg transition-all",
                                    downloadDone
                                        ? "bg-green-600 hover:bg-green-700 shadow-green-500/20"
                                        : "bg-primary hover:bg-blue-600 shadow-primary/20 hover:shadow-xl hover:scale-[1.01] active:scale-[0.98]",
                                    (placedSignatures.length === 0 || isProcessing) && "!bg-slate-400 !shadow-none cursor-not-allowed scale-100"
                                )}
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        <span>Embedding Signatures…</span>
                                    </>
                                ) : downloadDone ? (
                                    <>
                                        <Check size={20} />
                                        <span>Downloaded!</span>
                                    </>
                                ) : (
                                    <>
                                        <Download size={20} />
                                        <span>Download Signed PDF</span>
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
            )}

            <SignContent />
        </article>
    );
};

export default Sign;
