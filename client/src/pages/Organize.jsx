import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { getPageThumbnail, extractPages } from '../utils/pdf';
import * as pdfjsLib from 'pdfjs-dist';
import { saveAs } from 'file-saver';
import { Reorder } from 'framer-motion';
import { Trash2, FileUp, ArrowRight, Loader2, GripVertical, Shield, Plus } from 'lucide-react';
import clsx from 'clsx';

const Organize = () => {
    const [file, setFile] = useState(null);
    const [pages, setPages] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isLoadingPages, setIsLoadingPages] = useState(false);

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
                for (let i = 1; i <= numPages; i++) {
                    const { thumbnail } = await getPageThumbnail(pdf, i);
                    newPages.push({ id: `p-${i}`, originalIndex: i - 1, thumbnail, pageNumber: i });
                }
                setPages(newPages);
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
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    });

    const removePage = (id) => {
        setPages(pages.filter(p => p.id !== id));
    };

    const handleSave = async () => {
        if (!file || pages.length === 0) return;
        setIsProcessing(true);
        try {
            const pageIndices = pages.map(p => p.originalIndex);
            const newPdfBlob = await extractPages(file, pageIndices);
            saveAs(newPdfBlob, `organized_${file.name}`);
        } catch (error) {
            console.error("Organize failed", error);
            alert("Failed to organize PDF");
        }
        setIsProcessing(false);
    };

    return (
        <div className="flex-grow flex flex-col items-center w-full px-4 py-8 md:py-12">
            <div className="text-center max-w-2xl mx-auto mb-10">
                <h1 className="text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-3">
                    Organize PDF
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg font-normal leading-normal">
                    Sort, delete, and reorder PDF pages.
                </p>
            </div>

            {!file ? (
                <div className="w-full max-w-3xl mx-auto">
                    <div {...getRootProps()} className="relative flex flex-col items-center justify-center w-full h-64 rounded-xl bg-white dark:bg-slate-800 border-2 border-dashed border-primary/40 hover:border-primary transition-all duration-300 cursor-pointer group">
                        <input {...getInputProps()} />
                        <div className="flex flex-col items-center gap-3 p-6 text-center">
                            <div className="size-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-primary mb-2 group-hover:scale-110 transition-transform">
                                <FileUp size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Drag & drop your PDF here</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">or click to browse your files</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-[1280px] flex flex-col lg:flex-row gap-8 items-start">
                    {/* Left: Reorder Grid */}
                    <div className="flex-1 w-full bg-slate-100 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 md:p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">Drag to Reorder</h3>
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">{pages.length} Pages</span>
                        </div>

                        {isLoadingPages ? (
                            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={40} /></div>
                        ) : (
                            <Reorder.Group axis="y" values={pages} onReorder={setPages} className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                                {pages.map((page) => (
                                    <Reorder.Item key={page.id} value={page} className="group relative flex flex-col gap-2 cursor-grab active:cursor-grabbing">
                                        <div className="relative w-full aspect-[1/1.4] bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-slate-200 dark:border-slate-600 hover:border-primary dark:hover:border-primary transition-all hover:scale-[1.02]">
                                            <button onClick={(e) => { e.stopPropagation(); removePage(page.id); }} className="absolute -top-2 -right-2 z-10 p-1.5 rounded-full bg-white dark:bg-slate-600 text-slate-400 hover:text-red-500 hover:bg-red-50 shadow-md border border-slate-200 dark:border-slate-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={14} /></button>
                                            <img src={page.thumbnail} alt={`Page ${page.pageNumber}`} className="w-full h-full object-contain p-2" />
                                            <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded backdrop-blur-sm">P. {page.pageNumber}</div>
                                        </div>
                                        <div className="flex justify-center">
                                            <GripVertical size={16} className="text-slate-300" />
                                        </div>
                                    </Reorder.Item>
                                ))}
                            </Reorder.Group>
                        )}
                    </div>

                    {/* Right: Actions */}
                    <div className="w-full lg:w-80 shrink-0 flex flex-col gap-6 sticky top-24">
                        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Organize Options</h3>
                            <button
                                onClick={handleSave}
                                disabled={isProcessing}
                                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 disabled:bg-slate-400 disabled:cursor-not-allowed text-white text-lg font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-200"
                            >
                                {isProcessing ? <Loader2 className="animate-spin" /> : <span>Save Organized PDF</span>}
                            </button>
                        </div>

                        <button onClick={() => setFile(null)} className="flex items-center justify-center gap-2 text-slate-500 hover:text-red-500 transition-colors">
                            <Trash2 size={16} /> Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Organize;
