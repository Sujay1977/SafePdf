import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { unlockPDF } from '../utils/pdf';
import { saveAs } from 'file-saver';
import { Trash2, FileUp, ArrowRight, Loader2, Link, Shield, Lock, Unlock as UnlockIcon } from 'lucide-react';
import clsx from 'clsx';
import ClientOnly from '../components/ClientOnly';

const Unlock = () => {
    const [file, setFile] = useState(null);
    const [password, setPassword] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            setFile(acceptedFiles[0]);
            setError('');
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    });

    const handleUnlock = async () => {
        if (!file || !password) return;
        setIsProcessing(true);
        setError('');
        try {
            const unlockedBlob = await unlockPDF(file, password);
            saveAs(unlockedBlob, `unlocked_${file.name}`);
        } catch (error) {
            console.error("Unlock failed", error);
            setError("Incorrect password or failed to unlock.");
        }
        setIsProcessing(false);
    };

    return (
        <div className="flex-grow flex flex-col items-center w-full px-4 py-8 md:py-12">
            <div className="text-center max-w-2xl mx-auto mb-10">
                <h1 className="text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-3">
                    Unlock PDF
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg font-normal leading-normal">
                    Remove password security from PDFs, making them free to use.
                </p>
            </div>

            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Left: Upload */}
                <div className="flex flex-col gap-4">
                    {!file ? (
                        <div {...getRootProps()} className="group relative flex flex-col items-center justify-center aspect-square rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-primary transition-all cursor-pointer">
                            <input {...getInputProps()} />
                            <div className="flex flex-col items-center gap-2 text-center p-6">
                                <ClientOnly>
                                    <span className="material-symbols-outlined text-4xl text-slate-400 group-hover:text-primary transition-colors">cloud_upload</span>
                                </ClientOnly>
                                <p className="text-sm font-medium text-slate-900 dark:text-white">Drop PDF here</p>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 flex flex-col items-center gap-6 aspect-square justify-center relative">
                            <button onClick={() => setFile(null)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors">
                                <Trash2 size={20} />
                            </button>
                            <div className="size-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-primary">
                                <UnlockIcon size={40} />
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 break-all">{file.name}</h3>
                                <p className="text-slate-500 dark:text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right: Settings */}
                <div className="flex flex-col gap-6">
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 flex flex-col gap-6">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Unlock Settings</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Enter the current password to remove it.</p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter current password"
                                    className={clsx(
                                        "w-full rounded-lg bg-transparent dark:text-white focus:ring-primary focus:border-primary",
                                        error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-slate-300 dark:border-slate-600"
                                    )}
                                />
                                {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
                            </div>
                        </div>

                        <div className="mt-4">
                            <button
                                onClick={handleUnlock}
                                disabled={!file || !password || isProcessing}
                                className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-6 bg-primary hover:bg-blue-600 disabled:bg-slate-400 disabled:cursor-not-allowed text-white text-base font-bold leading-normal tracking-[0.015em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:scale-[1.01] active:scale-[0.98]"
                            >
                                {isProcessing ? <Loader2 className="animate-spin" /> : <span className="flex items-center gap-2">Unlock PDF <ArrowRight size={20} /></span>}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20">
                        <Shield className="text-primary mt-0.5 shrink-0" size={20} />
                        <div className="text-sm">
                            <p className="font-bold text-slate-900 dark:text-white mb-1">Secure Decryption</p>
                            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                                Your password allows us to unlock the file locally. It is not stored or sent anywhere.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Unlock;
