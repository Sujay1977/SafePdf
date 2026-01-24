import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Github } from 'lucide-react';
import { DodoPayments } from 'dodopayments-checkout';

import ClientOnly from './ClientOnly';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const [userAuth, setUserAuth] = useState(false);

    // 10x FIX: Initialize globally to ensure the library is ready
    useEffect(() => {
        const publicKey = import.meta.env.VITE_DODO_PUBLIC_KEY;
        if (publicKey) {
            DodoPayments.Initialize({
                publicKey: publicKey,
                mode: 'live',
            });
        }
    }, []);

    const handleSupportMe = (e) => {
        e.preventDefault();

        const publicKey = import.meta.env.VITE_DODO_PUBLIC_KEY;
        const productId = 'pdt_0NWNP0K7PftXJmjaCc5fF'; // LIVE Product ID

        try {
            // 10x FIX: Re-initialize right before opening to prevent "Missing Key" errors
            DodoPayments.Initialize({
                publicKey: publicKey,
                mode: 'live',
            });

            DodoPayments.Checkout.open({
                productId: productId,
                quantity: 1
            });
        } catch (error) {
            console.error("Dodo Payments checkout error:", error);
            // Bulletproof Fallback (Live URL)
            window.open(`https://checkout.dodopayments.com/buy/${productId}`, "_blank");
        }
    };

    const handleGetStarted = () => {
        const element = document.getElementById('all-tools');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    const navLinks = [
        { name: 'Merge PDF', path: '/merge' },
        { name: 'Split PDF', path: '/split' },
        { name: 'Compress PDF', path: '/compress' },
        { name: 'Convert PDF', path: '/pdf-to-word' },
        { name: 'All Tools', path: '/tools' },
    ];

    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-all duration-300">
            <div className="max-w-[1350px] mx-auto px-4 md:px-8 h-18 flex items-center justify-between py-3">

                {/* 1. Brand (Left) - Clean & Modern */}
                <Link to="/" className="flex items-center gap-2.5 group">
                    <div className="w-9 h-9 rounded-xl bg-blue-600/5 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm border border-blue-100 dark:border-blue-900/30">
                        <ClientOnly>
                            <span className="material-symbols-outlined text-xl">picture_as_pdf</span>
                        </ClientOnly>
                    </div>
                    <span className="font-bold font-display text-xl tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">SafePDF</span>
                </Link>

                {/* 2. Navigation (Center) - Desktop */}
                <nav className="hidden lg:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`
                                px-4 py-2 text-sm font-medium rounded-full transition-all duration-200
                                ${isActive(link.path)
                                    ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400'
                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'}
                            `}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* 3. Actions (Right) */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleSupportMe}
                        className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFBF00] hover:bg-[#F2B600] text-black text-sm font-bold shadow-[0_2px_10px_rgba(255,191,0,0.2)] hover:shadow-[0_4px_15px_rgba(255,191,0,0.3)] hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
                    >
                        <Heart size={16} className="fill-black/10 stroke-[2.5px]" />
                        <span>Support Me</span>
                    </button>

                    <a
                        href="https://github.com/Sujay1977/SafePdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:flex items-center justify-center p-2 rounded-full text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
                        aria-label="View Source on GitHub"
                    >
                        <Github size={22} strokeWidth={2} />
                    </a>

                    <button
                        onClick={handleGetStarted}
                        className="hidden sm:flex items-center justify-center px-6 py-2.5 rounded-full bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 text-sm font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
                    >
                        {userAuth ? 'Dashboard' : 'Get Started'}
                    </button>

                    <button
                        className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Drawer */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col p-6 gap-3 animate-in slide-in-from-top-4 duration-300 z-40">
                    <div className="flex flex-col gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={`
                                    flex items-center p-4 rounded-xl text-base font-medium transition-colors
                                    ${isActive(link.path)
                                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}
                                `}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <div className="h-px bg-slate-100 dark:bg-slate-800 my-2"></div>
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={handleSupportMe}
                            className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#FFBF00] text-black text-sm font-bold shadow-md hover:bg-[#F2B600] transition-all"
                        >
                            <Heart size={18} className="fill-black/10 stroke-[2.5px]" />
                            Support Me
                        </button>
                        <a
                            href="https://github.com/Sujay1977/SafePdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold shadow-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                        >
                            <Github size={18} />
                            GitHub
                        </a>
                        <button
                            onClick={() => {
                                handleGetStarted();
                                setIsMenuOpen(false);
                            }}
                            className="flex items-center justify-center px-5 py-3.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold shadow-md"
                        >
                            {userAuth ? 'Dashboard' : 'Get Started'}
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
