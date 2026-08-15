import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { getPageThumbnail, applyAnnotations, getPageTextCheck } from '../utils/pdf';
import { saveAs } from 'file-saver';
import {
    MousePointer2, Type, Square, Circle, Minus,
    Pen, Highlighter, Undo, Redo, Eraser, FilePenLine,
    ChevronDown, Trash2, ArrowLeft, Check, Lock, Loader2, Edit3,
    Bold, Italic
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getToolTheme } from '../utils/theme';
import ToolHeroIcon from '../components/ToolHeroIcon';
import ToolPageHeader from '../components/ToolPageHeader';
import SEO from '../components/SEO';
import EditContent, { editFaqs } from '../components/content/EditContent';

const Edit = () => {
    const [file, setFile] = useState(null);
    const [pages, setPages] = useState([]);
    const [activePageIndex, setActivePageIndex] = useState(0);

    // Editor State
    const [tool, setTool] = useState('select'); // select, text, eraser, rect, highlight, edit-content
    const [annotations, setAnnotations] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [isProcessing, setIsProcessing] = useState(false);

    // Content Editing State
    const [pageTextItems, setPageTextItems] = useState([]);
    const [editedTextSchema, setEditedTextSchema] = useState({}); // originalIndex -> { text, fontSize, family, bold, italic, color }

    // Tool Properties
    const [fontSize, setFontSize] = useState(16);
    const [fontColor, setFontColor] = useState('#000000');

    // Default Font Config
    const fonts = [
        { name: 'Helvetica', value: 'Helvetica', css: 'Helvetica, Arial, sans-serif' },
        { name: 'Times Roman', value: 'Times', css: '"Times New Roman", Times, serif' },
        { name: 'Courier', value: 'Courier', css: '"Courier New", Courier, monospace' }
    ];

    // Load Pages & Content
    useEffect(() => {
        if (!file) return;
        const loadPages = async () => {
            try {
                const result = await getPageThumbnail(file, activePageIndex + 1);
                setPages(prev => {
                    const newPages = [...prev];
                    newPages[activePageIndex] = result;
                    return newPages;
                });
                const textItems = await getPageTextCheck(file, activePageIndex);
                setPageTextItems(textItems);
            } catch (e) { console.error(e); }
        };
        loadPages();
    }, [file, activePageIndex]);

    // Dropzone
    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            setFile(acceptedFiles[0]);
            setPages([]);
            setActivePageIndex(0);
            setAnnotations([]);
            setHistory([]);
            setHistoryIndex(-1);
            setPageTextItems([]);
            setEditedTextSchema({});
        }
    }, []);
    const { getRootProps, getInputProps } = useDropzone({
        onDrop, accept: { 'application/pdf': ['.pdf'] }, multiple: false
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
            const newAnn = { id: crypto.randomUUID(), type: 'text', pageIndex: activePageIndex, x, y, text: 'Add text', fontSize: fontSize, color: fontColor, fontFamily: 'Helvetica' };
            addToHistory([...annotations, newAnn]);
            setTool('select');
            setSelectedId(newAnn.id);
        } else if (tool === 'eraser') {
            const newAnn = { id: crypto.randomUUID(), type: 'rectangle', pageIndex: activePageIndex, x: x - 0.05, y: y - 0.025, width: 0.1, height: 0.05, strokeWidth: 0, fillColor: '#FFFFFF', opacity: 1 };
            addToHistory([...annotations, newAnn]);
            setTool('select');
            setSelectedId(newAnn.id);
        } else if (tool === 'rect') {
            const newAnn = { id: crypto.randomUUID(), type: 'rectangle', pageIndex: activePageIndex, x: x - 0.1, y: y - 0.05, width: 0.2, height: 0.1, strokeColor: fontColor, strokeWidth: 2 };
            addToHistory([...annotations, newAnn]);
            setTool('select');
            setSelectedId(newAnn.id);
        } else if (tool === 'highlight') {
            const newAnn = { id: crypto.randomUUID(), type: 'highlight', pageIndex: activePageIndex, x: x - 0.1, y: y - 0.025, width: 0.2, height: 0.05 };
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

    // --- CONTENT EDITING ---
    const getEditedState = (idx) => {
        if (editedTextSchema[idx]) return editedTextSchema[idx];
        const item = pageTextItems[idx];
        if (!item) return { text: '', fontSize: 12, fontFamily: 'Helvetica', isBold: false, isItalic: false, color: '#000000' };

        // Heuristic to detect font family from extracted item
        let family = 'Helvetica';
        const fName = (item.fontName || '').toLowerCase();

        if (fName.includes('times') || fName.includes('roman') || fName.includes('serif')) {
            family = 'Times';
        } else if (fName.includes('courier') || fName.includes('mono') || fName.includes('typewriter')) {
            family = 'Courier';
        }

        return {
            text: item.text || '', // Fixed: was item.str
            fontSize: item.fontSize,
            fontFamily: family,
            isBold: fName.includes('bold') || fName.includes('black') || fName.includes('heavy'),
            isItalic: fName.includes('italic') || fName.includes('oblique'),
            color: '#000000'
        };
    };

    const updateContentEdit = (idx, updates) => {
        const currentState = getEditedState(idx);
        setEditedTextSchema({
            ...editedTextSchema,
            [idx]: { ...currentState, ...updates }
        });
    };

    const handleSave = async () => {
        if (!file) return;
        setIsProcessing(true);
        try {
            const replacements = Object.keys(editedTextSchema).map(idx => {
                const original = pageTextItems[idx];
                const state = editedTextSchema[idx];

                // original.x and original.y are the normalized coords returned by getPageTextCheck
                // (normX/normY are NOT on the returned object — x/y are the normalized values)
                const normX = Number.isFinite(original.x) ? original.x : 0;
                const normY = Number.isFinite(original.y) ? original.y : 0;
                const normW = Number.isFinite(original.normWidth) ? original.normWidth : 0;
                const normH = Number.isFinite(original.normHeight) ? original.normHeight : 0;
                const safeFontSize = Number.isFinite(state.fontSize) && state.fontSize > 0 ? state.fontSize : 12;

                if (!Number.isFinite(original.x) || !Number.isFinite(original.y)) {
                    console.warn('Invalid coordinates for text item', idx, original);
                }

                return {
                    id: `rep-${idx}`,
                    type: 'text',
                    isReplacement: true,
                    pageIndex: activePageIndex,
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
            });

            // Filter out any replacement that still has bad coordinates
            const validReplacements = replacements.filter(r =>
                Number.isFinite(r.x) && Number.isFinite(r.y) &&
                Number.isFinite(r.originalX) && Number.isFinite(r.originalY)
            );

            // Also guard regular annotations
            const validAnnotations = annotations.filter(a =>
                Number.isFinite(a.x) && Number.isFinite(a.y)
            );

            console.log('Saving annotations:', validAnnotations.length, 'replacements:', validReplacements.length);

            const finalAnnotations = [...validAnnotations, ...validReplacements];
            const blob = await applyAnnotations(file, finalAnnotations);
            saveAs(blob, `edited_${file.name}`);
        } catch (e) {
            console.error(e);
            const msg = e?.message || '';
            if (msg.includes('NaN') || msg.includes('number')) {
                alert('Some elements have invalid positions. Please reselect text and try again.');
            } else {
                alert('Failed to save edits. Please try again.');
            }
        }
        setIsProcessing(false);
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
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://safepdf.site/" },
                { "@type": "ListItem", "position": 2, "name": "Edit PDF", "item": "https://safepdf.site/edit-pdf" }
            ]
        },
        {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Edit PDF Online Free | Add Text, Highlight, Annotate",
            "url": "https://safepdf.site/edit-pdf"
        }
    ];

    if (!file) return (
        <article className="flex flex-col flex-grow">
            <SEO
                title="Edit PDF Online Free | SafePDF"
                description="Free browser-based PDF editor. Add text, erase, highlight, and annotate your PDF files securely online without uploads."
                url="/edit-pdf"
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
                            <ToolHeroIcon icon="edit_document" theme={getToolTheme('/edit-pdf')} />
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    Click to Upload PDF
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
    const selectedContentIdx = selectedId?.startsWith('content-') ? selectedId.split('-')[1] : null;

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-gray-100 dark:bg-slate-900">
            {/* Toolbar */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
                <div className="flex items-center gap-1 p-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-200 dark:border-slate-700">
                    <button onClick={() => setTool('select')} aria-label="Select Tool" className={`p-2 rounded-lg ${tool === 'select' ? 'bg-blue-50 text-primary' : 'text-slate-500 hover:bg-gray-50'}`}><MousePointer2 size={20} /></button>
                    <div className="w-px h-6 bg-gray-200 dark:bg-slate-700 mx-1"></div>
                    <button onClick={() => setTool('edit-content')} aria-label="Edit Content Tool" className={`p-2 rounded-lg ${tool === 'edit-content' ? 'bg-blue-50 text-primary' : 'text-slate-500 hover:bg-gray-50'}`}><Edit3 size={20} /></button>
                    <div className="w-px h-6 bg-gray-200 dark:bg-slate-700 mx-1"></div>
                    <button onClick={() => setTool('text')} aria-label="Add Text Tool" className={`p-2 rounded-lg ${tool === 'text' ? 'bg-blue-50 text-primary' : 'text-slate-500 hover:bg-gray-50'}`}><Type size={20} /></button>
                    <button onClick={() => setTool('rect')} aria-label="Draw Rectangle Tool" className={`p-2 rounded-lg ${tool === 'rect' ? 'bg-blue-50 text-primary' : 'text-slate-500 hover:bg-gray-50'}`}><Square size={20} /></button>
                    <button onClick={() => setTool('eraser')} aria-label="Eraser Tool" className={`p-2 rounded-lg ${tool === 'eraser' ? 'bg-blue-50 text-primary' : 'text-slate-500 hover:bg-gray-50'}`}><Eraser size={20} /></button>
                    <button onClick={() => setTool('highlight')} aria-label="Highlight Tool" className={`p-2 rounded-lg ${tool === 'highlight' ? 'bg-blue-50 text-primary' : 'text-slate-500 hover:bg-gray-50'}`}><Highlighter size={20} /></button>
                    <div className="w-px h-6 bg-gray-200 dark:bg-slate-700 mx-1"></div>
                    <button onClick={handleUndo} disabled={historyIndex < 0} aria-label="Undo" className="p-2 rounded-lg text-slate-500 hover:bg-gray-50 disabled:opacity-30"><Undo size={20} /></button>
                    <button onClick={handleRedo} disabled={historyIndex >= history.length - 1} aria-label="Redo" className="p-2 rounded-lg text-slate-500 hover:bg-gray-50 disabled:opacity-30"><Redo size={20} /></button>
                </div>

                {/* Text Properties Bar (Contextual) */}
                {selectedContentIdx && (
                    <div className="flex items-center gap-2 px-3 py-2 bg-white/95 backdrop-blur rounded-lg shadow-sm border border-gray-200 animate-in fade-in slide-in-from-top-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Text</span>
                        <div className="w-px h-4 bg-gray-200"></div>

                        {/* Font Family */}
                        <label htmlFor={`font-family-${selectedContentIdx}`} className="sr-only">Font Family</label>
                        <select id={`font-family-${selectedContentIdx}`} name={`font-family-${selectedContentIdx}`} className="bg-transparent text-sm border-none focus:ring-0 p-0 w-24 text-slate-700 font-medium cursor-pointer"
                            value={getEditedState(selectedContentIdx).fontFamily}
                            onChange={(e) => updateContentEdit(selectedContentIdx, { fontFamily: e.target.value })}
                        >
                            {fonts.map(f => <option key={f.value} value={f.value}>{f.name}</option>)}
                        </select>

                        <div className="w-px h-4 bg-gray-200"></div>

                        {/* Font Size */}
                        <label htmlFor={`font-size-${selectedContentIdx}`} className="sr-only">Font Size</label>
                        <input id={`font-size-${selectedContentIdx}`} name={`font-size-${selectedContentIdx}`} type="number"
                            className="w-12 bg-transparent text-sm border-none focus:ring-0 p-0 text-center"
                            value={Math.round(getEditedState(selectedContentIdx).fontSize)}
                            onChange={(e) => updateContentEdit(selectedContentIdx, { fontSize: Number(e.target.value) })}
                        />
                        <span className="text-xs text-slate-400">px</span>

                        <div className="w-px h-4 bg-gray-200"></div>

                        {/* Bold/Italic */}
                        <button
                            onClick={() => updateContentEdit(selectedContentIdx, { isBold: !getEditedState(selectedContentIdx).isBold })}
                            aria-label="Toggle Bold"
                            className={`p-1 rounded ${getEditedState(selectedContentIdx).isBold ? 'bg-blue-100 text-blue-600' : 'text-slate-500 hover:bg-gray-50'}`}
                        >
                            <Bold size={16} />
                        </button>
                        <button
                            onClick={() => updateContentEdit(selectedContentIdx, { isItalic: !getEditedState(selectedContentIdx).isItalic })}
                            aria-label="Toggle Italic"
                            className={`p-1 rounded ${getEditedState(selectedContentIdx).isItalic ? 'bg-blue-100 text-blue-600' : 'text-slate-500 hover:bg-gray-50'}`}
                        >
                            <Italic size={16} />
                        </button>
                    </div>
                )}
            </div>

            {/* Canvas */}
            <div className="flex-1 flex overflow-hidden relative">
                <div className="w-64 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 overflow-y-auto hidden md:block">
                    <div className="p-4">
                        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Pages</h2>
                        <div className="aspect-[1/1.4] bg-gray-100 rounded-lg border-2 border-primary ring-2 ring-primary/20 relative overflow-hidden">
                            {activePage && <img src={activePage.thumbnail} alt="PDF Page Preview" loading="lazy" decoding="async" className="w-full h-full object-contain" />}
                            <div className="absolute bottom-1 right-1 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded">1</div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 bg-gray-100 dark:bg-slate-950 overflow-auto flex justify-center p-10 relative">
                    {activePage ? (
                        <div className="relative bg-white shadow-2xl"
                            style={{ width: activePage.originalWidth, height: activePage.originalHeight, transform: 'scale(1)', transformOrigin: 'top center' }}
                            onClick={handleCanvasClick}
                        >
                            <img src={activePage.thumbnail} alt="PDF Page Preview" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full pointer-events-none select-none" />

                            {/* Content Edit Layer */}
                            {tool === 'edit-content' && (
                                <div className="absolute inset-0 z-30">
                                    {pageTextItems.map((item, idx) => {
                                        const state = getEditedState(idx);
                                        const isSelected = selectedId === `content-${idx}`;
                                        const cssFont = fonts.find(f => f.value === state.fontFamily)?.css || fonts[0].css;

                                        // Debug log for first render
                                        if (idx === 0) console.log("Rendering Text Items:", pageTextItems.length);

                                        return (
                                            <div
                                                key={idx}
                                                className={`absolute rounded transition-all group ${isSelected ? 'z-50' : 'z-auto hover:z-40'}`}
                                                style={{
                                                    top: `${item.normY * 100}%`,
                                                    left: `${item.normX * 100}%`,
                                                    width: `${item.normWidth * 100}%`,
                                                    height: `${item.normHeight * 100}%`,
                                                    pointerEvents: 'auto'
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    console.log("Clicked text item", idx);
                                                    setSelectedId(`content-${idx}`);
                                                }}
                                            >
                                                {/* Hover Outline (PDFelement style) */}
                                                <div className={`absolute -inset-1 border-2 border-transparent transition-colors pointer-events-none ${isSelected ? 'border-blue-500 bg-white shadow-lg' : 'group-hover:border-blue-400 group-hover:bg-blue-50/10'
                                                    }`} />

                                                {/* Editor or Preview */}
                                                {isSelected ? (
                                                    <React.Fragment>
                                                        <label htmlFor={`text-editor-${idx}`} className="sr-only">Edit text content</label>
                                                        <textarea id={`text-editor-${idx}`} name={`text-editor-${idx}`}
                                                        value={state.text}
                                                        autoFocus
                                                        onChange={(e) => updateContentEdit(idx, { text: e.target.value })}
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
                                                    </React.Fragment>
                                                ) : (
                                                    // Invisible overlay to capture clicks, but lets you see original text
                                                    <div className="w-full h-full cursor-text" title={`Font: ${state.fontFamily}, Size: ${Math.round(state.fontSize)}px`} />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Annotations */}
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
                    ) : <div className="flex items-center justify-center text-slate-400">Loading page...</div>}
                </div>
            </div>

            {/* Footer */}
            <div className="h-16 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 flex items-center justify-between px-6 z-30">
                <Link to="/" className="text-slate-500 hover:text-primary flex items-center gap-2 text-sm font-medium">
                    <ArrowLeft size={18} /> Back to Dashboard
                </Link>
                <button onClick={handleSave} disabled={isProcessing} className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-blue-600 text-white rounded-lg font-bold shadow-lg shadow-primary/20 transition-all active:scale-95 disabled:bg-slate-400">
                    {isProcessing ? <Loader2 className="animate-spin" size={20} /> : <Check size={20} />}
                    Apply Edits
                </button>
            </div>
        </div>
    );
};

// RndObject (Same as before but ensures types are correct)
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
}

export default Edit;
