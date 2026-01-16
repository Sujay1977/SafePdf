import React from 'react';
import { Shield, Lock, EyeOff, Cpu, Globe, ServerOff } from 'lucide-react';

const PrivacySection = () => {
    return (
        <section className="relative w-full py-24 px-4 md:px-10 overflow-hidden bg-slate-50 dark:bg-[#0B1120]">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] -z-10" />

            <div className="max-w-[1280px] mx-auto">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">

                    {/* Left Column: Trust Engine */}
                    <div className="flex-1 w-full max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
                            <Shield size={14} className="animate-pulse" />
                            <span>Client-Side Architecture</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] mb-6 tracking-tight">
                            Your documents are <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                                none of our business.
                            </span>
                        </h2>

                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10 max-w-lg">
                            We've re-engineered the standard PDF editor. By removing the server from the equation, we guarantee your data never leaves your device.
                        </p>

                        {/* Trust Tiles Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                {
                                    icon: EyeOff,
                                    title: "No Tracking",
                                    desc: "Zero analytics or data collection scripts."
                                },
                                {
                                    icon: Lock,
                                    title: "Local Processing",
                                    desc: "All code runs directly in your browser."
                                },
                                {
                                    icon: ServerOff,
                                    title: "0% Server Data",
                                    desc: "We literally cannot see your files."
                                },
                                {
                                    icon: Cpu,
                                    title: "Native Speed",
                                    desc: "Powered by WebAssembly for raw performance."
                                }
                            ].map((item, index) => (
                                <div key={index} className="group p-5 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200/50 dark:border-white/5 hover:border-blue-500/30 dark:hover:border-blue-400/30 transition-all duration-300 hover:-translate-y-1">
                                    <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-3 group-hover:scale-110 transition-transform">
                                        <item.icon size={20} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-snug">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Security Terminal */}
                    <div className="relative flex-1 w-full max-w-lg flex justify-center lg:justify-end">
                        {/* Decorative background elements */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-3xl opacity-30 animate-pulse" />

                        <div className="relative w-full aspect-square max-h-[500px] bg-slate-900/95 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8 flex flex-col items-center justify-center overflow-hidden group">

                            {/* Terminal Header */}
                            <div className="absolute top-0 left-0 w-full p-6 flex items-center justify-between border-b border-white/5 bg-white/5">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                </div>
                                <div className="text-xs font-mono text-slate-400">SECURE_TUNNEL_ACTIVE</div>
                            </div>

                            {/* Center Security Visualization */}
                            <div className="relative z-10 my-auto">
                                {/* Rotating Rings */}
                                <div className="absolute inset-0 border border-blue-500/30 rounded-full animate-[spin_10s_linear_infinite]" />
                                <div className="absolute -inset-4 border border-dashed border-indigo-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                                <div className="absolute -inset-8 border border-white/5 rounded-full" />

                                {/* Glowing Shield */}
                                <div className="relative w-32 h-32 flex items-center justify-center bg-blue-500/10 rounded-full shadow-[0_0_50px_rgba(59,130,246,0.3)] backdrop-blur-sm">
                                    <Shield size={64} className="text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                                    <div className="absolute inset-0 bg-blue-400/20 blur-xl rounded-full animate-pulse" />
                                </div>
                            </div>

                            {/* Simulated Terminal Text */}
                            <div className="w-full mt-8 space-y-2 font-mono text-xs md:text-sm">
                                <div className="flex items-center gap-2 text-green-400">
                                    <span className="opacity-50">{'>'}</span>
                                    <span>Initiating local environment...</span>
                                </div>
                                <div className="flex items-center gap-2 text-green-400 delay-100">
                                    <span className="opacity-50">{'>'}</span>
                                    <span>Blocking external requests...</span>
                                </div>
                                <div className="flex items-center gap-2 text-blue-400 delay-200">
                                    <span className="opacity-50">{'>'}</span>
                                    <span>Status: <span className="text-white font-bold blink">100% Client-Side</span></span>
                                </div>
                            </div>

                            {/* Overlay Grid */}
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default PrivacySection;
