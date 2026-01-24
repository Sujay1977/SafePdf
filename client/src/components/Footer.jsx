import React from 'react';
import { Link } from 'react-router-dom';
import ClientOnly from './ClientOnly';

const Footer = () => {
    return (
        <footer className="w-full bg-gray-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-16 mt-auto">
            <div className="max-w-[1280px] mx-auto px-4 md:px-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">

                    {/* Column 1: Brand & Info */}
                    <div className="flex flex-col gap-6">
                        <Link to="/" className="flex items-center gap-2 text-slate-900 dark:text-white">
                            <ClientOnly>
                                <span className="material-symbols-outlined text-primary text-3xl">picture_as_pdf</span>
                            </ClientOnly>
                            <span className="font-bold text-xl">SafePDF</span>
                        </Link>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-[280px]">
                            Professional-grade PDF tools processed entirely in your browser for maximum privacy. No server uploads, ever.
                        </p>
                        <div className="text-slate-500 dark:text-slate-500 text-xs mt-auto">
                            © 2026 SafePDF • Made by <a href="https://x.com/sujay__raj" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Sujay</a>
                        </div>
                    </div>

                    {/* Column 2: Product Navigation */}
                    <div className="flex flex-col gap-6">
                        <h4 className="font-semibold text-slate-900 dark:text-white text-base">Product</h4>
                        <div className="flex flex-col gap-3">
                            <Link to="/tools" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">All Tools</Link>
                            <Link to="/workflows" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">Workflows</Link>
                            <Link to="/pricing" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">Pricing (Free)</Link>
                            <Link to="/updates" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">Updates</Link>
                        </div>
                    </div>

                    {/* Column 3: Popular Tools */}
                    <div className="flex flex-col gap-6">
                        <h4 className="font-semibold text-slate-900 dark:text-white text-base">Popular Tools</h4>
                        <div className="flex flex-col gap-3">
                            <Link to="/merge" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">Merge PDF</Link>
                            <Link to="/split" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">Split PDF</Link>
                            <Link to="/compress" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">Compress PDF</Link>
                            <Link to="/pdf-to-word" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">PDF to Word</Link>
                            <Link to="/protect" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">Protect PDF</Link>
                        </div>
                    </div>

                    {/* Column 4: Trust Signals */}
                    <div className="flex flex-col gap-6">
                        <h4 className="font-semibold text-slate-900 dark:text-white text-base">Trust & Security</h4>
                        <ul className="flex flex-col gap-3">
                            <li className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <span className="text-slate-600 dark:text-slate-400 text-sm">100% Client-Side Processing</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <span className="text-slate-600 dark:text-slate-400 text-sm">No Data Collection</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <span className="text-slate-600 dark:text-slate-400 text-sm">GDPR Compliant Privacy</span>
                            </li>
                        </ul>

                        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full border border-green-200 dark:border-green-800 w-fit mt-2">
                            <ClientOnly>
                                <span className="material-symbols-outlined text-base">check_circle</span>
                            </ClientOnly>
                            <span className="text-xs font-bold uppercase tracking-wide">Processed Locally</span>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
