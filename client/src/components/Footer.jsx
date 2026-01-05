import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-10 mt-auto">
            <div className="max-w-[1280px] mx-auto px-4 md:px-10 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                        <span className="material-symbols-outlined text-primary">picture_as_pdf</span>
                        <span className="font-bold text-lg">SafePDF</span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        © 2026 SafePDF • Made by <a href="https://x.com/sujay__raj" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Sujay</a>
                    </p>
                </div>
                <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                    <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors">Privacy Policy</a>
                    <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors">Terms of Service</a>
                    <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors">Contact</a>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full border border-green-200 dark:border-green-800">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    <span className="text-xs font-bold uppercase tracking-wide">Processed Locally</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
