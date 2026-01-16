import React from 'react';
import { Shield, Ban, Zap, Monitor, Lock, Download } from 'lucide-react';

const WhySafePdf = () => {
    return (
        <section className="w-full bg-slate-50 dark:bg-[#0B1120] py-24 px-4 md:px-10 overflow-hidden relative">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] -z-10" />

            <div className="max-w-[1280px] mx-auto">
                <div className="flex flex-col gap-6 text-center items-center mb-16">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
                        The Desktop Experience, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
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
                    <div className="md:col-span-2 group relative p-8 md:p-10 rounded-3xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-blue-500/20 overflow-hidden">
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/30">
                                <Shield size={28} strokeWidth={1.5} />
                            </div>
                            <div>
                                <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
                                    Privacy by Default
                                </h3>
                                <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed max-w-md font-medium">
                                    No 'Incognito' mode needed; your files never touch the cloud.
                                </p>
                            </div>
                        </div>

                        {/* Decorative Background Element */}
                        <div className="absolute right-0 bottom-0 w-64 h-64 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-tl-[100px] -mr-8 -mb-8 group-hover:scale-110 transition-transform duration-500 ease-out" />
                        <Lock className="absolute right-10 top-10 text-slate-200 dark:text-slate-700/30 w-32 h-32 -rotate-12 group-hover:rotate-0 transition-all duration-500" strokeWidth={1} />
                    </div>

                    {/* Feature 2: Native Performance (Vertical Card) */}
                    <div className="group relative p-8 rounded-3xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-purple-500/20">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/30">
                            <Zap size={28} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
                            Native Performance
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed font-medium">
                            Processes large PDFs in milliseconds using your local CPU/GPU.
                        </p>
                        <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="h-1 w-12 bg-purple-500/20 rounded-full overflow-hidden">
                                <div className="h-full w-full bg-purple-500 animate-[loading_1s_ease-in-out_infinite] origin-left" />
                            </div>
                        </div>
                    </div>

                    {/* Feature 3: Zero Friction (Standard Card) */}
                    <div className="group relative p-8 rounded-3xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-rose-500/20">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-rose-500/30">
                            <Ban size={28} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
                            Zero Friction
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed font-medium">
                            No accounts, no cookies, no subscriptions. Just open and work.
                        </p>
                    </div>

                    {/* Feature 4: Works Offline (Wide Card) */}
                    <div className="md:col-span-2 group relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-blue-600/30 overflow-hidden">
                        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                            <div className="max-w-md">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-blue-100 text-sm font-medium mb-4">
                                    <Monitor size={14} />
                                    <span>PWA Ready</span>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-black mb-2 tracking-tight">
                                    Works Offline
                                </h3>
                                <p className="text-blue-100 text-lg leading-relaxed font-medium">
                                    Lost connection? No problem. SafePDF is a Progressive Web App (PWA) that works perfectly without internet.
                                </p>
                            </div>
                            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform duration-300 border border-white/10">
                                <Download size={32} className="text-white" strokeWidth={1.5} />
                            </div>
                        </div>
                        {/* Abstract Shapes */}
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-indigo-900/30 rounded-full blur-3xl" />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WhySafePdf;
