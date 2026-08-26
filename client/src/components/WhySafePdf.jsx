import React from 'react';
import { Shield, Ban, Zap, Monitor, Download } from 'lucide-react';

const WhySafePdf = () => {
    return (
        <section className="w-full bg-slate-50 dark:bg-[#0B1120] py-24 px-4 md:px-10 overflow-hidden relative">
            <div className="max-w-[1280px] mx-auto">
                <div className="flex flex-col gap-6 text-center items-center mb-16">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
                        The Desktop Experience, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                            inside your Browser.
                        </span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg font-medium leading-relaxed max-w-2xl">
                        Powerful PDF tools that run entirely on your device. No uploads, no waiting, no compromise.
                    </p>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">

                    {/* Feature 1: Privacy by Default (Large Card) */}
                    <div className="md:col-span-2 group relative p-8 md:p-10 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-200">
                        <div className="flex flex-col h-full justify-between">
                            <div className="size-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                                <Shield size={24} strokeWidth={1.75} />
                            </div>
                            <div>
                                <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
                                    Privacy by Default
                                </h3>
                                <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed max-w-md font-medium">
                                    No 'Incognito' mode needed; your files never touch the cloud.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Feature 2: Native Performance (Vertical Card) */}
                    <div className="group relative p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-200">
                        <div className="size-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                            <Zap size={24} strokeWidth={1.75} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
                            Native Performance
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed font-medium">
                            Processes large PDFs in milliseconds using your local CPU/GPU.
                        </p>
                    </div>

                    {/* Feature 3: Zero Friction (Standard Card) */}
                    <div className="group relative p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-200">
                        <div className="size-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                            <Ban size={24} strokeWidth={1.75} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
                            Zero Friction
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed font-medium">
                            No accounts, no cookies, no subscriptions. Just open and work.
                        </p>
                    </div>

                    {/* Feature 4: Works Offline (Wide Card) */}
                    <div className="md:col-span-2 group relative p-8 md:p-10 rounded-2xl bg-slate-900 dark:bg-slate-800/90 text-white border border-slate-800 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-200">
                        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                            <div className="max-w-md">
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 dark:bg-slate-700 border border-slate-700 dark:border-slate-600 text-slate-300 text-xs font-medium mb-4">
                                    <Monitor size={13} />
                                    <span>PWA Ready</span>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-black mb-2 tracking-tight">
                                    Works Offline
                                </h3>
                                <p className="text-slate-300 dark:text-slate-400 text-base leading-relaxed">
                                    Lost connection? No problem. SafePDF is a Progressive Web App (PWA) that works perfectly without internet.
                                </p>
                            </div>
                            <div className="shrink-0 size-12 rounded-xl bg-slate-800 dark:bg-slate-700 flex items-center justify-center text-blue-400 border border-slate-700 dark:border-slate-600">
                                <Download size={24} strokeWidth={1.75} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WhySafePdf;
