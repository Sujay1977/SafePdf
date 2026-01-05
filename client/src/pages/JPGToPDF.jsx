import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { imagesToPDF } from '../utils/pdf';
import { saveAs } from 'file-saver';
import { Reorder } from 'framer-motion';
import { Trash2, FileUp, ArrowRight, Loader2, Shield, GripVertical } from 'lucide-react';

const JPGToPDF = () => {
    const [files, setFiles] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            const newFiles = acceptedFiles.map(file => ({
                file,
                id: Math.random().toString(36).substr(2, 9),
                preview: URL.createObjectURL(file)
            }));
            setFiles(prev => [...prev, ...newFiles]);
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.png', '.jpg', '.jpeg'] },
        multiple: true
    });

    const removeFile = (id) => {
        setFiles(prev => prev.filter(f => f.id !== id));
    };

    const handleConvert = async () => {
        if (files.length === 0) return;
        setIsProcessing(true);
        try {
            const pdfBlob = await imagesToPDF(files.map(f => f.file));
            saveAs(pdfBlob, 'converted_images.pdf');
        } catch (error) {
            console.error("Conversion failed", error);
            alert("Failed to convert Images to PDF");
        }
        setIsProcessing(false);
    };

    return (
        <div className="flex-grow flex flex-col items-center w-full px-4 py-8 md:py-12">
            <div className="text-center max-w-2xl mx-auto mb-10">
                <h1 className="text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-3">
                    JPG to PDF
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg font-normal leading-normal">
                    Convert JPG, PNG images to PDF documents. Drag to reorder.
                </p>
            </div>

            <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-1 w-full">
                    <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
                        <h3 className="text-slate-900 dark:text-white text-lg font-bold">Selected Images ({files.length})</h3>
                        <button onClick={() => setFiles([])} className="text-sm font-medium text-red-600 hover:text-red-700">Clear All</button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <div {...getRootProps()} className="aspect-[3/4] rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer flex flex-col items-center justify-center gap-2">
                            <input {...getInputProps()} />
                            <div className="size-10 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                                <FileUp size={20} />
                            </div>
                            <span className="text-xs font-bold text-primary">Add Images</span>
                        </div>

                        <Reorder.Group axis="y" values={files} onReorder={setFiles} className="contents">
                            {files.map(file => (
                                <Reorder.Item key={file.id} value={file} className="contents">
                                    <div className="group relative aspect-[3/4] bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden cursor-grab active:cursor-grabbing">
                                        <button onClick={() => removeFile(file.id)} className="absolute top-1 right-1 z-10 p-1 rounded-full bg-white text-slate-400 hover:text-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={12} /></button>
                                        <img src={file.preview} alt="preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                    </div>
                                </Reorder.Item>
                            ))}
                        </Reorder.Group>
                    </div>
                </div>

                <div className="w-full lg:w-80 shrink-0 sticky top-24">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 flex flex-col gap-6">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Convert Options</h3>
                        <button
                            onClick={handleConvert}
                            disabled={files.length === 0 || isProcessing}
                            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 disabled:bg-slate-400 disabled:cursor-not-allowed text-white text-lg font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-200"
                        >
                            {isProcessing ? <Loader2 className="animate-spin" /> : <span>Create PDF</span>}
                        </button>
                    </div>

                    <div className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20">
                        <Shield className="text-primary mt-0.5 shrink-0" size={20} />
                        <div className="text-sm">
                            <p className="font-bold text-slate-900 dark:text-white mb-1">100% Private</p>
                            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                                Images are processed locally.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JPGToPDF;
