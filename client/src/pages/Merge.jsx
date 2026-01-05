import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { generateThumbnail, mergePDFs } from '../utils/pdf';
import { saveAs } from 'file-saver';
import { Trash2, GripVertical, FileUp, ArrowRight, Loader2, CheckCircle, Shield } from 'lucide-react';
import { Reorder } from 'framer-motion';

const Merge = () => {
    const [files, setFiles] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const onDrop = useCallback(async (acceptedFiles) => {
        setIsProcessing(true);
        const newFiles = await Promise.all(acceptedFiles.map(async (file) => {
            const { thumbnail, numPages } = await generateThumbnail(file);
            return {
                id: Math.random().toString(36).substr(2, 9),
                file,
                thumbnail,
                numPages,
                name: file.name,
                size: (file.size / 1024 / 1024).toFixed(2) // MB
            };
        }));
        setFiles((prev) => [...prev, ...newFiles]);
        setIsProcessing(false);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] }
    });

    const removeFile = (id) => {
        setFiles(files.filter(f => f.id !== id));
    };

    const handleMerge = async () => {
        if (files.length === 0) return;
        setIsProcessing(true);
        try {
            const mergedBlob = await mergePDFs(files.map(f => f.file));
            saveAs(mergedBlob, 'merged.pdf');
        } catch (error) {
            console.error("Merge failed", error);
            alert("Failed to merge PDFs");
        }
        setIsProcessing(false);
    };

    const formatSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = 2;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };

    return (
        <div className="flex-grow flex flex-col items-center w-full px-4 py-8 md:py-12">
            <div className="text-center max-w-2xl mx-auto mb-10">
                <h1 className="text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-3">
                    Merge PDF Files
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg font-normal leading-normal">
                    Combine PDFs in the order you want with the easiest PDF merger available.
                </p>
            </div>

            <div className="w-full max-w-[1200px] flex flex-col lg:flex-row gap-8 items-start">
                {/* Left Column: File Management */}
                <div className="flex-1 w-full">
                    <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
                        <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Selected Files ({files.length})</h3>
                        <div className="flex gap-2">
                            <button onClick={() => setFiles([])} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                                <Trash2 size={18} />
                                <span>Clear All</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 gap-4">
                        {/* Drop Zone */}
                        <div {...getRootProps()} className="group relative flex flex-col items-center justify-center gap-3 aspect-[3/4] rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer">
                            <input {...getInputProps()} />
                            <div className="size-12 rounded-full bg-primary/20 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                                <FileUp size={24} />
                            </div>
                            <p className="text-primary font-bold text-center text-sm px-4">Add files</p>
                        </div>

                        {/* File List */}
                        <Reorder.Group axis="y" values={files} onReorder={setFiles} className="contents">
                            {files.map((file) => (
                                <Reorder.Item key={file.id} value={file} className="contents">
                                    <div className="group relative flex flex-col bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-primary/50 transition-all cursor-grab active:cursor-grabbing overflow-hidden aspect-[3/4]">
                                        <button onClick={() => removeFile(file.id)} className="absolute top-2 right-2 z-10 size-7 flex items-center justify-center rounded-full bg-white dark:bg-slate-700 text-slate-500 hover:text-red-500 hover:bg-red-50 shadow-sm border border-slate-200 dark:border-slate-600 opacity-0 group-hover:opacity-100 transition-all transform hover:scale-110">
                                            <Trash2 size={14} />
                                        </button>

                                        <div className="flex-1 w-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
                                            {file.thumbnail ? (
                                                <div className="w-full h-full shadow-lg rounded-sm relative">
                                                    <img src={file.thumbnail} alt="Preview" className="w-full h-full object-contain bg-white" />
                                                </div>
                                            ) : (
                                                <div className="text-slate-400">Loading...</div>
                                            )}
                                        </div>

                                        <div className="p-3 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700">
                                            <p className="text-slate-900 dark:text-white text-xs font-bold truncate mb-1" title={file.name}>{file.name}</p>
                                            <p className="text-slate-500 dark:text-slate-400 text-[10px] font-medium uppercase tracking-wide">{file.numPages} Pages • {file.size} MB</p>
                                        </div>
                                    </div>
                                </Reorder.Item>
                            ))}
                        </Reorder.Group>
                    </div>
                </div>

                {/* Right Column: Actions */}
                <div className="w-full lg:w-[340px] flex flex-col gap-6 shrink-0">
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 sticky top-24">
                        <h3 className="text-slate-900 dark:text-white text-xl font-bold mb-6">Merge Options</h3>
                        <div className="space-y-4 mb-8">
                            <p className="text-sm text-slate-500 dark:text-slate-400">Drag and drop files to reorder them before merging.</p>
                        </div>

                        <button
                            onClick={handleMerge}
                            disabled={files.length < 2 || isProcessing}
                            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 disabled:bg-slate-400 disabled:cursor-not-allowed text-white h-14 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/30 transition-all transform active:scale-[0.98]"
                        >
                            {isProcessing ? <Loader2 className="animate-spin" /> : <><span>Merge PDF</span><ArrowRight size={20} /></>}
                        </button>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30">
                        <div className="size-8 rounded-full bg-white dark:bg-blue-900/30 flex items-center justify-center shrink-0 text-primary shadow-sm">
                            <Shield size={18} />
                        </div>
                        <div>
                            <h4 className="text-slate-900 dark:text-white text-sm font-bold mb-1">100% Secure & Private</h4>
                            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                                Your files are processed directly in your browser. No data leaves your device.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Merge;
