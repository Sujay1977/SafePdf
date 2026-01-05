import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, FileText } from 'lucide-react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
            <div className="px-4 md:px-10 py-3 max-w-[1280px] mx-auto flex items-center justify-between whitespace-nowrap">
                <Link to="/" className="flex items-center gap-4 text-slate-900 dark:text-white">
                    <div className="text-primary">
                        <span className="material-symbols-outlined text-3xl">picture_as_pdf</span>
                    </div>
                    <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">SafePDF</h2>
                </Link>
                <div className="flex flex-1 justify-end gap-4 md:gap-8 items-center">
                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/" className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary text-sm font-medium leading-normal transition-colors">All Tools</Link>
                    </div>
                    <button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-primary hover:bg-blue-600 text-white text-sm font-bold leading-normal tracking-wide transition-colors">
                        <span className="truncate">Buy me a coffee</span>
                    </button>

                    <button className="md:hidden text-slate-900 dark:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>
            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-background-dark border-b border-slate-200 dark:border-slate-800 p-4 flex flex-col gap-4 shadow-lg">
                    <Link to="/" className="text-slate-600 dark:text-slate-300 hover:text-primary font-medium" onClick={() => setIsMenuOpen(false)}>All Tools</Link>
                </div>
            )}
        </header>
    );
};

export default Header;
