import SEO from '../components/SEO';
import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { getPageThumbnail, extractPages, generateThumbnail } from '../utils/pdf';
import * as pdfjsLib from 'pdfjs-dist';
import { saveAs } from 'file-saver';
import { Trash2, FileUp, ArrowRight, Loader2, Check, Shield } from 'lucide-react';
import clsx from 'clsx';
import { getToolTheme } from '../utils/theme';
import ToolHeroIcon from '../components/ToolHeroIcon';

const Split = () => {
    const [file, setFile] = useState(null);
    const [pages, setPages] = useState([]);
    const [selectedPages, setSelectedPages] = useState(new Set());
    const [isProcessing, setIsProcessing] = useState(false);
    const [isLoadingPages, setIsLoadingPages] = useState(false);

    // Load pages when file is set
    useEffect(() => {
        if (!file) return;

        const loadPages = async () => {
            setIsLoadingPages(true);
            try {
                const arrayBuffer = await file.arrayBuffer();
                const loadingTask = pdfjsLib.getDocument(arrayBuffer);
                const pdf = await loadingTask.promise;
                const numPages = pdf.numPages;

                const newPages = [];
                // Generate thumbnails for all pages (Note: for large PDFs this should be virtualized or lazy loaded)
                // For MVP we limit to first 20 pages or just load them sequentially
                for (let i = 1; i <= numPages; i++) {
                    const { thumbnail } = await getPageThumbnail(pdf, i);
                    newPages.push({ pageNumber: i, thumbnail });
                }
                setPages(newPages);
                // Default select all? Or none? checking UI, usually none or all. Let's select all by default so user can remove what they don't want, OR select none.
                // Usually split means "Extract specific pages", so select none is better.
                // But if they want to split into single pages, that's different.
                // Let's start with Select None.
            } catch (error) {
                console.error("Error loading pages", error);
            }
            setIsLoadingPages(false);
        };

        loadPages();
    }, [file]);

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            setFile(acceptedFiles[0]);
            setPages([]);
            setSelectedPages(new Set());
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    });

    const togglePage = (pageNumber) => {
        const newSelected = new Set(selectedPages);
        if (newSelected.has(pageNumber)) {
            newSelected.delete(pageNumber);
        } else {
            newSelected.add(pageNumber);
        }
        setSelectedPages(newSelected);
    };

    const handleSplit = async () => {
        if (!file || selectedPages.size === 0) return;
        setIsProcessing(true);
        try {
            // Sort pages
            const sortedPages = Array.from(selectedPages).sort((a, b) => a - b);
            // pdf-lib uses 0-based indices
            const pageIndices = sortedPages.map(p => p - 1);

            const newPdfBlob = await extractPages(file, pageIndices);
            saveAs(newPdfBlob, `split_${file.name}`);
        } catch (error) {
            console.error("Split failed", error);
            alert("Failed to split PDF");
        }
        setIsProcessing(false);
    };

    const selectAll = () => {
        if (pages.length === 0) return;
        if (selectedPages.size === pages.length) {
            setSelectedPages(new Set());
        } else {
            setSelectedPages(new Set(pages.map(p => p.pageNumber)));
        }
    }

    return (
        <div className="flex-grow flex flex-col items-center w-full px-4 py-8 md:py-12">
            <SEO
                title="Split PDF | Extract Pages from PDF Online"
                description="Split multiple PDF pages into separate documents securely in your browser. No upload required, 100% free and private."
                url="/split"
            >
                <link rel="canonical" href="https://safepdf.site/split" />
            </SEO>
            <div className="text-center max-w-2xl mx-auto mb-10">
                <h1 className="text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-3">
                    Split PDF File
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg font-normal leading-normal">
                    Select specific pages to extract into a new PDF document.
                </p>
            </div>

            {!file ? (
                <div className="w-full max-w-3xl mx-auto">
                    <div {...getRootProps()} className="relative flex flex-col items-center justify-center w-full h-80 rounded-3xl bg-white dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-md">
                        <input {...getInputProps()} className="hidden" />
                        <div className="flex flex-col items-center gap-4 text-center">
                            <ToolHeroIcon icon="call_split" theme={getToolTheme('/split')} />
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    Click to Select PDF
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 text-base font-medium">
                                    or drag and drop file here
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-[1280px] flex flex-col lg:flex-row gap-8 items-start">
                    {/* Left Column: Grid */}
                    <div className="flex-1 w-full bg-slate-100 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 md:p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                                Page Preview
                            </h3>
                            <div className="flex items-center gap-4">
                                <button onClick={selectAll} className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                                    {selectedPages.size === pages.length ? 'Deselect All' : 'Select All'}
                                </button>
                                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">{file.name} ({pages.length} Pages)</span>
                            </div>
                        </div>

                        {isLoadingPages ? (
                            <div className="flex flex-col items-center justify-center py-20">
                                <Loader2 className="animate-spin text-primary mb-4" size={40} />
                                <p className="text-slate-500">Loading pages...</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                                {pages.map((page) => {
                                    const isSelected = selectedPages.has(page.pageNumber);
                                    return (
                                        <div
                                            key={page.pageNumber}
                                            onClick={() => togglePage(page.pageNumber)}
                                            className="group relative flex flex-col gap-2 cursor-pointer"
                                        >
                                            <div className={clsx(
                                                "relative w-full aspect-[1/1.4] bg-white dark:bg-slate-700 rounded-lg shadow-sm border-2 overflow-hidden transition-all hover:-translate-y-1",
                                                isSelected ? "border-primary" : "border-transparent border-slate-200 dark:border-slate-600 hover:border-primary/50"
                                            )}>
                                                <img src={page.thumbnail} alt={`Page ${page.pageNumber}`} className={clsx("w-full h-full object-contain", isSelected ? "opacity-40" : "opacity-100")} />

                                                {isSelected && (
                                                    <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                                                        <div className="bg-primary text-white rounded-full p-1 shadow-md transform scale-110">
                                                            <Check size={20} />
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded backdrop-blur-sm">P. {page.pageNumber}</div>
                                            </div>
                                            <span className={clsx("text-center text-sm font-medium", isSelected ? "text-primary" : "text-slate-500 dark:text-slate-400")}>
                                                {isSelected ? 'Selected' : `Page ${page.pageNumber}`}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="w-full lg:w-96 shrink-0 flex flex-col gap-6">
                        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 sticky top-24">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-700">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Split Options</h3>
                            </div>

                            <div className="space-y-6">
                                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-700">
                                    <p className="text-sm font-medium text-slate-900 dark:text-white mb-2">Selected Pages: {selectedPages.size}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        {selectedPages.size > 0
                                            ? Array.from(selectedPages).sort((a, b) => a - b).join(', ')
                                            : 'No pages selected'}
                                    </p>
                                </div>

                                <button
                                    onClick={handleSplit}
                                    disabled={selectedPages.size === 0 || isProcessing}
                                    className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 disabled:bg-slate-400 disabled:cursor-not-allowed text-white text-lg font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-200"
                                >
                                    {isProcessing ? <Loader2 className="animate-spin" /> : <><span>Extract Pages</span><ArrowRight size={20} /></>}
                                </button>

                                <button onClick={() => setFile(null)} className="w-full py-2 text-sm text-slate-500 hover:text-red-500 transition-colors">
                                    Cancel / New File
                                </button>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20">
                            <Shield className="text-primary mt-0.5" size={20} />
                            <div className="text-sm">
                                <p className="font-bold text-slate-900 dark:text-white mb-1">100% Secure</p>
                                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                                    All splitting happens in your browser. Your PDF file is never uploaded to any server.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Split;
