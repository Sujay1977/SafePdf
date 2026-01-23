import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { convertPDFToWord } from '../utils/pdf';
import { saveAs } from 'file-saver';
import { Trash2, FileUp, ArrowRight, Loader2, Link, Shield, FileText } from 'lucide-react';
import ClientOnly from '../components/ClientOnly';

const PDFToWord = () => {
    const [file, setFile] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

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

    const handleConvert = async () => {
        if (!file) return;
        setIsProcessing(true);
        try {
            const docBlob = await convertPDFToWord(file);
            saveAs(docBlob, `${file.name.replace('.pdf', '')}.docx`);
        } catch (error) {
            console.error("Conversion failed", error);
            alert("Failed to convert PDF to Word");
        }
        setIsProcessing(false);
    };

    return (
        <div className="flex-grow flex flex-col items-center w-full px-4 py-8 md:py-12">
            <div className="text-center max-w-2xl mx-auto mb-10">
                <h1 className="text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-3">
                    PDF to Word
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg font-normal leading-normal">
                    Convert your PDF files to editable Word documents (DOCX).
                    <br /><span className="text-sm italic opacity-75">(Note: Client-side conversion extracts text but may lose complex layout)</span>
                </p>
            </div>

            <div className="w-full max-w-3xl mx-auto">
                {!file ? (
                    <div {...getRootProps()} className="group relative flex flex-col items-center justify-center h-64 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-primary transition-all cursor-pointer">
                        <input {...getInputProps()} />
                        <div className="flex flex-col items-center gap-2 text-center">
                            <ClientOnly>
                                <span className="material-symbols-outlined text-4xl text-slate-400 group-hover:text-primary transition-colors">cloud_upload</span>
                            </ClientOnly>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">Click to select PDF or drag and drop</p>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 flex flex-col items-center gap-6">
                        <div className="size-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-primary">
                            <FileText size={40} />
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{file.name}</h3>
                            <p className="text-slate-500 dark:text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>

                        <div className="flex gap-4 w-full max-w-md">
                            <button onClick={() => setFile(null)} className="flex-1 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                Change File
                            </button>
                            <button
                                onClick={handleConvert}
                                disabled={isProcessing}
                                className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5"
                            >
                                {isProcessing ? <Loader2 className="animate-spin" /> : <span>Convert to Word</span>}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-12 flex items-start gap-3 max-w-lg p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20">
                <Shield className="text-primary mt-0.5 shrink-0" size={20} />
                <div className="text-sm">
                    <p className="font-bold text-slate-900 dark:text-white mb-1">100% Private Conversion</p>
                    <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                        Unlike other converters, we don't send your file to a server. Conversion happens right here using your browser's power.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PDFToWord;
