import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { getPageThumbnail, applyAnnotations, getPageTextCheck } from '../utils/pdf';
import { saveAs } from 'file-saver';
import {
    MousePointer2, Type, Square, Circle, Minus,
    Pen, Highlighter, Undo, Redo, Eraser, FilePenLine,
    ChevronDown, Trash2, ArrowLeft, Check, Lock, Loader2, Edit3,
    Bold, Italic, ChevronLeft, ChevronRight, Download, Shield, AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { getToolTheme } from '../utils/theme';
import ToolHeroIcon from '../components/ToolHeroIcon';
import ToolPageHeader from '../components/ToolPageHeader';
import SEO from '../components/SEO';
import EditContent, { editFaqs } from '../components/content/EditContent';

const FONTS = [
    { name: 'Helvetica', value: 'Helvetica', css: 'Helvetica, Arial, sans-serif' },
    { name: 'Times Roman', value: 'Times', css: '"Times New Roman", Times, serif' },
    { name: 'Courier', value: 'Courier', css: '"Courier New", Courier, monospace' }
];

const Edit = () => {
    const theme = getToolTheme('/edit');

    // Document state
    const [file, setFile] = useState(null);
    const [numPages, setNumPages] = useState(1);
    const [pages, setPages] = useState([]); // array of page thumbnails/dimensions
    const [activePageIndex, setActivePageIndex] = useState(0);
    const [pageLoading, setPageLoading] = useState(false);

    // Editor state
    const [tool, setTool] = useState('select'); // select, text, eraser, rect, highlight, edit-content
    const [annotations, setAnnotations] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [isProcessing, setIsProcessing] = useState(false);
    const [downloadDone, setDownloadDone] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Content text replacement state
    // Key: `${pageIndex}_${idx}` -> replacement state
    const [editedTextSchema, setEditedTextSchema] = useState({});
    const [pageTextItemsMap, setPageTextItemsMap] = useState({}); // pageIndex -> textItems array

    // Tool properties
    const [fontSize, setFontSize] = useState(16);
    const [fontColor, setFontColor] = useState('#000000');

    // Load active page preview and extracted text items
    useEffect(() => {
        if (!file) return;
        let cancelled = false;
        setPageLoading(true);

        const loadActivePage = async () => {
            try {
                // Load thumbnail if not already cached
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

                // Load text items for content editing if not cached
                if (!pageTextItemsMap[activePageIndex]) {
                    const textItems = await getPageTextCheck(file, activePageIndex);
                    if (!cancelled) {
                        setPageTextItemsMap(prev => ({
                            ...prev,
                            [activePageIndex]: textItems || []
                        }));
                    }
                }
            } catch (e) {
                console.error("Error loading page:", e);
                if (!cancelled) setErrorMessage("Failed to render page preview.");
            } finally {
                if (!cancelled) setPageLoading(false);
            }
        };

        loadActivePage();
        return () => { cancelled = true; };
    }, [file, activePageIndex, pages, pageTextItemsMap]);

    // Dropzone callback
    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            setFile(acceptedFiles[0]);
            setPages([]);
            setActivePageIndex(0);
            setNumPages(1);
            setAnnotations([]);
            setHistory([]);
            setHistoryIndex(-1);
            setEditedTextSchema({});
            setPageTextItemsMap({});
            setErrorMessage('');
            setDownloadDone(false);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    });

    const addToHistory = (newAnnotations) => {
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(newAnnotations);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
        setAnnotations(newAnnotations);
    };

    const handleUndo = () => {
        if (historyIndex > 0) {
            setHistoryIndex(historyIndex - 1);
            setAnnotations(history[historyIndex - 1]);
        } else if (historyIndex === 0) {
            setHistoryIndex(-1);
            setAnnotations([]);
        }
    };

    const handleRedo = () => {
        if (historyIndex < history.length - 1) {
            setHistoryIndex(historyIndex + 1);
            setAnnotations(history[historyIndex + 1]);
        }
    };

    const handleCanvasClick = (e) => {
        if (!pages[activePageIndex]) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        if (tool === 'text') {
            const newAnn = {
                id: crypto.randomUUID(),
                type: 'text',
                pageIndex: activePageIndex,
                x,
                y,
                text: 'Add text',
                fontSize: fontSize,
                color: fontColor,
                fontFamily: 'Helvetica'
            };
            addToHistory([...annotations, newAnn]);
            setTool('select');
            setSelectedId(newAnn.id);
        } else if (tool === 'eraser') {
            const newAnn = {
                id: crypto.randomUUID(),
                type: 'rectangle',
                pageIndex: activePageIndex,
                x: Math.max(0, x - 0.05),
                y: Math.max(0, y - 0.025),
                width: 0.1,
                height: 0.05,
                strokeWidth: 0,
                fillColor: '#FFFFFF',
                opacity: 1
            };
            addToHistory([...annotations, newAnn]);
            setTool('select');
            setSelectedId(newAnn.id);
        } else if (tool === 'rect') {
            const newAnn = {
                id: crypto.randomUUID(),
                type: 'rectangle',
                pageIndex: activePageIndex,
                x: Math.max(0, x - 0.1),
                y: Math.max(0, y - 0.05),
                width: 0.2,
                height: 0.1,
                strokeColor: fontColor,
                strokeWidth: 2
            };
            addToHistory([...annotations, newAnn]);
            setTool('select');
            setSelectedId(newAnn.id);
        } else if (tool === 'highlight') {
            const newAnn = {
                id: crypto.randomUUID(),
                type: 'highlight',
                pageIndex: activePageIndex,
                x: Math.max(0, x - 0.1),
                y: Math.max(0, y - 0.025),
                width: 0.2,
                height: 0.05
            };
            addToHistory([...annotations, newAnn]);
            setTool('select');
            setSelectedId(newAnn.id);
        }

        if (tool === 'select') {
            if (e.target === e.currentTarget) {
                setSelectedId(null);
            }
        }
    };

    const updateAnnotation = (id, updates) => {
        const updated = annotations.map(a => a.id === id ? { ...a, ...updates } : a);
        addToHistory(updated);
    };

    const deleteSelected = () => {
        if (selectedId) {
            const updated = annotations.filter(a => a.id !== selectedId);
            addToHistory(updated);
            setSelectedId(null);
        }
    };

    // --- CONTENT EDITING HELPERS ---
    const pageTextItems = pageTextItemsMap[activePageIndex] || [];

    const getEditedState = (pIdx, itemIdx) => {
        const key = `${pIdx}_${itemIdx}`;
        if (editedTextSchema[key]) return editedTextSchema[key];
        const items = pageTextItemsMap[pIdx] || [];
        const item = items[itemIdx];
        if (!item) return { text: '', fontSize: 12, fontFamily: 'Helvetica', isBold: false, isItalic: false, color: '#000000' };

        let family = 'Helvetica';
        const fName = (item.fontName || '').toLowerCase();
        if (fName.includes('times') || fName.includes('roman') || fName.includes('serif')) {
            family = 'Times';
        } else if (fName.includes('courier') || fName.includes('mono') || fName.includes('typewriter')) {
            family = 'Courier';
        }

        return {
            text: item.text || '',
            fontSize: item.fontSize || 12,
            fontFamily: family,
            isBold: fName.includes('bold') || fName.includes('black') || fName.includes('heavy'),
            isItalic: fName.includes('italic') || fName.includes('oblique'),
            color: '#000000'
        };
    };

    const updateContentEdit = (pIdx, itemIdx, updates) => {
        const key = `${pIdx}_${itemIdx}`;
        const currentState = getEditedState(pIdx, itemIdx);
        setEditedTextSchema({
            ...editedTextSchema,
            [key]: { ...currentState, ...updates }
        });
    };

    // Save and export PDF with annotations from ALL pages
    const handleSave = async () => {
        if (!file) return;
        setIsProcessing(true);
        setErrorMessage('');
        setDownloadDone(false);

        try {
            // Collect replacements across all pages
            const replacements = Object.keys(editedTextSchema).map(key => {
                const [pIdxStr, itemIdxStr] = key.split('_');
                const pIdx = parseInt(pIdxStr, 10);
                const itemIdx = parseInt(itemIdxStr, 10);
                const items = pageTextItemsMap[pIdx] || [];
                const original = items[itemIdx];
                const state = editedTextSchema[key];

                if (!original) return null;

                const normX = Number.isFinite(original.x) ? original.x : 0;
                const normY = Number.isFinite(original.y) ? original.y : 0;
                const normW = Number.isFinite(original.normWidth) ? original.normWidth : 0;
                const normH = Number.isFinite(original.normHeight) ? original.normHeight : 0;
                const safeFontSize = Number.isFinite(state.fontSize) && state.fontSize > 0 ? state.fontSize : 12;

                return {
                    id: `rep-${key}`,
                    type: 'text',
                    isReplacement: true,
                    pageIndex: pIdx,
                    x: normX,
                    y: normY + normH,
                    text: state.text,
                    fontSize: safeFontSize,
                    fontFamily: state.fontFamily,
                    isBold: state.isBold,
                    isItalic: state.isItalic,
                    color: state.color,
                    originalX: normX,
                    originalY: normY,
                    originalWidth: normW,
                    originalHeight: normH
                };
            }).filter(Boolean);

            const validReplacements = replacements.filter(r =>
                Number.isFinite(r.x) && Number.isFinite(r.y) &&
                Number.isFinite(r.originalX) && Number.isFinite(r.originalY)
            );

            const validAnnotations = annotations.filter(a =>
                Number.isFinite(a.x) && Number.isFinite(a.y)
            );

            const finalAnnotations = [...validAnnotations, ...validReplacements];
            const blob = await applyAnnotations(file, finalAnnotations);
            saveAs(blob, `edited_${file.name}`);
            setDownloadDone(true);
            setTimeout(() => setDownloadDone(false), 4000);
        } catch (e) {
            console.error("Save edits error:", e);
            const msg = e?.message || '';
            if (msg.includes('NaN') || msg.includes('number')) {
                setErrorMessage('Some elements have invalid positions. Please reselect and try again.');
            } else {
                setErrorMessage(e.message || 'Failed to save edits. Please try again.');
            }
        } finally {
            setIsProcessing(false);
        }
    };

    const editFaqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": editFaqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": { "@type": "Answer", "text": faq.a }
        }))
    };

    const pageSchema = [
        editFaqSchema,
        {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "SafePDF Edit",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Windows, macOS, Linux, Chrome OS",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://safepdfs.com/" },
                { "@type": "ListItem", "position": 2, "name": "Edit PDF", "item": "https://safepdfs.com/edit" }
            ]
        },
        {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Edit PDF Online Free | Add Text, Highlight, Annotate",
            "url": "https://safepdfs.com/edit"
        }
    ];

    if (!file) return (
        <article className="flex flex-col flex-grow">
            <SEO
                title="Edit PDF Online Free | SafePDF"
                description="Free browser-based PDF editor. Add text, erase, highlight, and annotate your PDF files securely online without uploads."
                url="/edit"
            >
                <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
            </SEO>
            <div className="flex-grow flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-slate-900">
                <ToolPageHeader
                    title="PDF Editor"
                    description="Upload a PDF to start editing text, shapes, and annotations."
                />
                <div {...getRootProps()} className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl p-12 bg-white dark:bg-slate-800 cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all shadow-sm hover:shadow-md group w-full max-w-3xl">
                    <label htmlFor="edit-upload" className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                        <div className="flex flex-col items-center gap-4 text-center">
                            <ToolHeroIcon icon="edit_document" theme={theme} />
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {isDragActive ? "Drop PDF file here" : "Click to Upload PDF"}
                                </h2>
                                <p className="text-slate-500 dark:text-slate-400 text-base font-medium">
                                    Start editing your document immediately
                                </p>
                            </div>
                        </div>
                    </label>
                    <input {...getInputProps()} id="edit-upload" name="edit-upload" aria-label="Upload PDF document" className="hidden" />
                </div>
            </div>
            <div className="bg-gray-50 dark:bg-slate-900">
                <EditContent />
            </div>
        </article>
    );

    const activePage = pages[activePageIndex];
    const selectedContentIdx = selectedId?.startsWith('content-') ? parseInt(selectedId.split('-')[1], 10) : null;

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-gray-100 dark:bg-slate-900">
            {/* Top Toolbar */}
            <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-4 py-2.5 z-20 flex flex-wrap items-center justify-between gap-3 shadow-sm">
                <div className="flex items-center gap-2">
                    <Link to="/" className="text-slate-500 hover:text-primary flex items-center gap-1 text-sm font-medium pr-2 border-r border-slate-200 dark:border-slate-700">
                        <ArrowLeft size={16} /> <span className="hidden sm:inline">Back</span>
                    </Link>
                    <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-700/60 rounded-xl">
                        <button
                            onClick={() => setTool('select')}
                            aria-label="Select Tool"
                            className={clsx("p-2 rounded-lg transition-colors", tool === 'select' ? 'bg-white dark:bg-slate-800 text-primary shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white')}
                            title="Select & Move"
                        >
                            <MousePointer2 size={18} />
                        </button>
                        <button
                            onClick={() => setTool('edit-content')}
                            aria-label="Edit Content Tool"
                            className={clsx("p-2 rounded-lg transition-colors", tool === 'edit-content' ? 'bg-white dark:bg-slate-800 text-primary shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white')}
                            title="Edit Existing Text"
                        >
                            <Edit3 size={18} />
                        </button>
                        <div className="w-px h-5 bg-slate-300 dark:bg-slate-600 mx-0.5"></div>
                        <button
                            onClick={() => setTool('text')}
                            aria-label="Add Text Tool"
                            className={clsx("p-2 rounded-lg transition-colors", tool === 'text' ? 'bg-white dark:bg-slate-800 text-primary shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white')}
                            title="Add Text"
                        >
                            <Type size={18} />
                        </button>
                        <button
                            onClick={() => setTool('rect')}
                            aria-label="Draw Rectangle Tool"
                            className={clsx("p-2 rounded-lg transition-colors", tool === 'rect' ? 'bg-white dark:bg-slate-800 text-primary shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white')}
                            title="Rectangle"
                        >
                            <Square size={18} />
                        </button>
                        <button
                            onClick={() => setTool('eraser')}
                            aria-label="Eraser Tool"
                            className={clsx("p-2 rounded-lg transition-colors", tool === 'eraser' ? 'bg-white dark:bg-slate-800 text-primary shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white')}
                            title="Whiteout / Eraser"
                        >
                            <Eraser size={18} />
                        </button>
                        <button
                            onClick={() => setTool('highlight')}
                            aria-label="Highlight Tool"
                            className={clsx("p-2 rounded-lg transition-colors", tool === 'highlight' ? 'bg-white dark:bg-slate-800 text-primary shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white')}
                            title="Highlight"
                        >
                            <Highlighter size={18} />
                        </button>
                        <div className="w-px h-5 bg-slate-300 dark:bg-slate-600 mx-0.5"></div>
                        <button onClick={handleUndo} disabled={historyIndex < 0} aria-label="Undo" className="p-2 rounded-lg text-slate-500 hover:text-slate-900 disabled:opacity-30">
                            <Undo size={18} />
                        </button>
                        <button onClick={handleRedo} disabled={historyIndex >= history.length - 1} aria-label="Redo" className="p-2 rounded-lg text-slate-500 hover:text-slate-900 disabled:opacity-30">
                            <Redo size={18} />
                        </button>
                        {selectedId && (
                            <button onClick={deleteSelected} aria-label="Delete selected" className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20" title="Delete element">
                                <Trash2 size={18} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Right Action */}
                <div className="flex items-center gap-3">
                    {errorMessage && (
                        <span className="text-xs text-red-500 font-medium truncate max-w-xs">{errorMessage}</span>
                    )}
                    <button
                        onClick={handleSave}
                        disabled={isProcessing}
                        className={clsx(
                            "flex items-center gap-2 px-5 py-2 text-white text-sm font-bold rounded-xl shadow-md transition-all",
                            downloadDone ? "bg-green-600 hover:bg-green-700" : "bg-primary hover:bg-blue-600 shadow-primary/20",
                            isProcessing && "!bg-slate-400 cursor-not-allowed"
                        )}
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="animate-spin" size={16} />
                                <span>Saving Edits…</span>
                            </>
                        ) : downloadDone ? (
                            <>
                                <Check size={16} />
                                <span>Downloaded!</span>
                            </>
                        ) : (
                            <>
                                <Download size={16} />
                                <span>Save &amp; Download PDF</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Contextual Text Properties Bar */}
            {selectedContentIdx !== null && (
                <div className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-2 flex items-center gap-3 text-xs z-10 animate-in fade-in">
                    <span className="font-bold text-slate-500 uppercase">Text Style:</span>
                    <select
                        className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded px-2 py-1 text-slate-700 dark:text-slate-200 text-xs"
                        value={getEditedState(activePageIndex, selectedContentIdx).fontFamily}
                        onChange={(e) => updateContentEdit(activePageIndex, selectedContentIdx, { fontFamily: e.target.value })}
                    >
                        {FONTS.map(f => <option key={f.value} value={f.value}>{f.name}</option>)}
                    </select>

                    <div className="flex items-center gap-1">
                        <span>Size:</span>
                        <input
                            type="number"
                            min="6"
                            max="72"
                            className="w-14 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded px-1.5 py-1 text-center text-xs"
                            value={Math.round(getEditedState(activePageIndex, selectedContentIdx).fontSize)}
                            onChange={(e) => updateContentEdit(activePageIndex, selectedContentIdx, { fontSize: Number(e.target.value) || 12 })}
                        />
                        <span>pt</span>
                    </div>

                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => updateContentEdit(activePageIndex, selectedContentIdx, { isBold: !getEditedState(activePageIndex, selectedContentIdx).isBold })}
                            className={clsx("p-1 rounded border", getEditedState(activePageIndex, selectedContentIdx).isBold ? "bg-blue-100 border-blue-400 text-primary" : "border-slate-300 dark:border-slate-600 text-slate-600")}
                            title="Bold"
                        >
                            <Bold size={14} />
                        </button>
                        <button
                            onClick={() => updateContentEdit(activePageIndex, selectedContentIdx, { isItalic: !getEditedState(activePageIndex, selectedContentIdx).isItalic })}
                            className={clsx("p-1 rounded border", getEditedState(activePageIndex, selectedContentIdx).isItalic ? "bg-blue-100 border-blue-400 text-primary" : "border-slate-300 dark:border-slate-600 text-slate-600")}
                            title="Italic"
                        >
                            <Italic size={14} />
                        </button>
                    </div>
                </div>
            )}

            {/* Workspace Area: Left Thumbnails + Center Canvas */}
            <div className="flex-1 flex overflow-hidden relative">
                {/* Left: Page Thumbnails Sidebar */}
                <div className="w-52 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 overflow-y-auto hidden md:flex flex-col p-3 gap-3">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Pages ({numPages})
                    </span>
                    <div className="flex flex-col gap-3">
                        {Array.from({ length: numPages }).map((_, idx) => {
                            const cachedPage = pages[idx];
                            const isActive = idx === activePageIndex;
                            const pageAnnCount = annotations.filter(a => a.pageIndex === idx).length;

                            return (
                                <button
                                    key={idx}
                                    onClick={() => setActivePageIndex(idx)}
                                    className={clsx(
                                        "relative aspect-[1/1.4] rounded-xl overflow-hidden border-2 transition-all p-1 text-left bg-slate-50 dark:bg-slate-900 group",
                                        isActive
                                            ? "border-primary ring-2 ring-primary/20 shadow-md"
                                            : "border-slate-200 dark:border-slate-700 hover:border-slate-300"
                                    )}
                                >
                                    {cachedPage ? (
                                        <img src={cachedPage.thumbnail} alt={`Page ${idx + 1}`} className="w-full h-full object-contain" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                                            Page {idx + 1}
                                        </div>
                                    )}
                                    <div className="absolute bottom-1.5 right-1.5 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
                                        {idx + 1}
                                    </div>
                                    {pageAnnCount > 0 && (
                                        <div className="absolute top-1.5 left-1.5 bg-blue-600 text-white text-[9px] px-1 py-0.2 rounded-full font-bold">
                                            {pageAnnCount} edit{pageAnnCount > 1 ? 's' : ''}
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Center: Canvas Viewport */}
                <div className="flex-1 bg-gray-100 dark:bg-slate-950 overflow-auto flex flex-col items-center justify-start p-6 relative">
                    {pageLoading && !activePage ? (
                        <div className="flex flex-col items-center gap-3 my-auto text-slate-400">
                            <Loader2 className="animate-spin text-primary" size={32} />
                            <span className="text-sm font-medium">Loading page {activePageIndex + 1}...</span>
                        </div>
                    ) : activePage ? (
                        <div
                            className="relative bg-white shadow-2xl rounded-sm my-auto"
                            style={{
                                width: activePage.originalWidth || 595,
                                height: activePage.originalHeight || 842,
                                maxWidth: '100%',
                            }}
                            onClick={handleCanvasClick}
                        >
                            <img
                                src={activePage.thumbnail}
                                alt={`Page ${activePageIndex + 1}`}
                                className="absolute inset-0 w-full h-full pointer-events-none select-none"
                            />

                            {/* Content Edit Layer */}
                            {tool === 'edit-content' && (
                                <div className="absolute inset-0 z-30">
                                    {pageTextItems.map((item, idx) => {
                                        const state = getEditedState(activePageIndex, idx);
                                        const isSelected = selectedId === `content-${idx}`;
                                        const cssFont = FONTS.find(f => f.value === state.fontFamily)?.css || FONTS[0].css;

                                        return (
                                            <div
                                                key={idx}
                                                className={clsx("absolute rounded transition-all group", isSelected ? "z-50" : "z-auto hover:z-40")}
                                                style={{
                                                    top: `${item.normY * 100}%`,
                                                    left: `${item.normX * 100}%`,
                                                    width: `${item.normWidth * 100}%`,
                                                    height: `${item.normHeight * 100}%`,
                                                    pointerEvents: 'auto'
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedId(`content-${idx}`);
                                                }}
                                            >
                                                <div className={clsx("absolute -inset-1 border-2 border-transparent transition-colors pointer-events-none", isSelected ? "border-blue-500 bg-white shadow-lg" : "group-hover:border-blue-400 group-hover:bg-blue-50/10")} />

                                                {isSelected ? (
                                                    <textarea
                                                        id={`text-editor-${idx}`}
                                                        value={state.text}
                                                        autoFocus
                                                        onChange={(e) => updateContentEdit(activePageIndex, idx, { text: e.target.value })}
                                                        className="relative w-full h-full p-0 m-0 border-none bg-transparent resize-none overflow-hidden outline-none text-slate-900"
                                                        style={{
                                                            fontSize: `${state.fontSize}px`,
                                                            fontFamily: cssFont,
                                                            fontWeight: state.isBold ? 'bold' : 'normal',
                                                            fontStyle: state.isItalic ? 'italic' : 'normal',
                                                            lineHeight: 1.1,
                                                            whiteSpace: 'pre-wrap'
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="w-full h-full cursor-text" title={`Font: ${state.fontFamily}, Size: ${Math.round(state.fontSize)}px`} />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Annotations Layer */}
                            <div className="absolute inset-0 z-20 pointer-events-none">
                                {tool !== 'edit-content' && annotations.filter(a => a.pageIndex === activePageIndex).map(ann => (
                                    <RndObject
                                        key={ann.id}
                                        ann={ann}
                                        isSelected={selectedId === ann.id}
                                        onSelect={() => { setSelectedId(ann.id); setTool('select'); }}
                                        onChange={(newAttrs) => updateAnnotation(ann.id, newAttrs)}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>

            {/* Bottom Navigation & Status Bar */}
            <div className="h-12 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 flex items-center justify-between px-6 z-20 text-xs">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setActivePageIndex(p => Math.max(0, p - 1))}
                        disabled={activePageIndex === 0}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 disabled:opacity-40"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                        Page {activePageIndex + 1} of {numPages}
                    </span>
                    <button
                        onClick={() => setActivePageIndex(p => Math.min(numPages - 1, p + 1))}
                        disabled={activePageIndex >= numPages - 1}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 disabled:opacity-40"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>

                <div className="flex items-center gap-2 text-slate-500">
                    <Shield size={14} className="text-primary" />
                    <span className="hidden sm:inline">Processed locally in your browser</span>
                </div>
            </div>
        </div>
    );
};

// RndObject
const RndObject = ({ ann, isSelected, onSelect, onChange }) => {
    const style = {
        position: 'absolute',
        left: `${ann.x * 100}%`,
        top: `${ann.y * 100}%`,
        width: ann.width ? `${ann.width * 100}%` : 'auto',
        height: ann.height ? `${ann.height * 100}%` : 'auto',
        cursor: isSelected ? 'move' : 'pointer',
        border: isSelected ? '1px dashed #137fec' : 'none',
        zIndex: isSelected ? 10 : 1,
        pointerEvents: 'auto'
    };

    const handleContentChange = (e) => {
        onChange({ text: e.target.innerText });
    };

    if (ann.type === 'text') {
        return (
            <div style={style} onClick={(e) => { e.stopPropagation(); onSelect(); }} className="group">
                {isSelected && <div className="absolute -top-4 left-0 text-[10px] bg-primary text-white px-1 rounded">Text</div>}
                <div
                    contentEditable={isSelected}
                    suppressContentEditableWarning
                    onBlur={handleContentChange}
                    style={{
                        fontSize: `${ann.fontSize}px`,
                        color: ann.color,
                        fontFamily: 'Helvetica, sans-serif',
                        whiteSpace: 'nowrap',
                        outline: 'none'
                    }}
                >
                    {ann.text}
                </div>
            </div>
        );
    }

    if (ann.type === 'rectangle') {
        const isEraser = ann.fillColor === '#FFFFFF';
        return (
            <div
                style={{
                    ...style,
                    border: ann.strokeWidth > 0 ? `${ann.strokeWidth || 2}px solid ${ann.strokeColor}` : 'none',
                    backgroundColor: ann.fillColor || 'transparent',
                    opacity: ann.opacity || 1
                }}
                onClick={(e) => { e.stopPropagation(); onSelect(); }}
            >
                {isEraser && isSelected && (
                    <div className="absolute inset-0 border border-gray-300 opacity-50 flex items-center justify-center text-[8px] text-gray-500">Eraser</div>
                )}
            </div>
        );
    }

    if (ann.type === 'highlight') {
        return (
            <div style={{ ...style, backgroundColor: 'yellow', opacity: 0.35, mixBlendMode: 'multiply' }} onClick={(e) => { e.stopPropagation(); onSelect(); }} />
        );
    }

    return null;
};

export default Edit;
