import React from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

const Sponsor = () => {
    return (
        <div className="flex flex-col w-full bg-background-light dark:bg-background-dark min-h-screen">
            <SEO
                title="Sponsor SafePDF"
                description="Put your product in front of privacy-conscious users with a premium sponsorship placement on SafePDF."
                robots="noindex, nofollow"
            />

            <div className="w-full max-w-[1000px] mx-auto px-4 md:px-8 py-12 md:py-20 lg:py-28">
                {/* 1. Back to SafePDF */}
                <div className="mb-12 md:mb-16">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-1 -ml-1"
                    >
                        <span aria-hidden="true" className="text-lg leading-none">&larr;</span>
                        Back to SafePDF
                    </Link>
                </div>

                {/* 2. Hero / Value Proposition */}
                <div className="flex flex-col gap-6 mb-20 md:mb-28 max-w-3xl">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                        Sponsor SafePDF
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                        Put your product in front of people actively using privacy-focused PDF tools — with one small, clearly labeled premium placement directly on the SafePDF homepage.
                    </p>
                </div>

                {/* 3. Sponsorship Placement Explanation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 md:mb-28">
                    <div className="flex flex-col gap-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 w-fit">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                            <span className="text-[11px] font-bold tracking-widest text-blue-700 dark:text-blue-400 uppercase">One Visible Placement</span>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                            The Homepage Hero
                        </h2>
                        <ul className="flex flex-col gap-4 text-slate-600 dark:text-slate-400">
                            <li className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-green-500 text-xl shrink-0 mt-0.5">check_circle</span>
                                <span>Small, premium "Sponsored" placement in the SafePDF homepage hero.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-green-500 text-xl shrink-0 mt-0.5">check_circle</span>
                                <span>Highly visible immediately above the fold.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-green-500 text-xl shrink-0 mt-0.5">check_circle</span>
                                <span>No intrusive popups, autoplay videos, or disruptive banners.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-green-500 text-xl shrink-0 mt-0.5">check_circle</span>
                                <span>No ad networks or hidden tracking pixels.</span>
                            </li>
                        </ul>
                    </div>
                    {/* Visual representation of the card */}
                    <div className="p-8 rounded-3xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 shadow-inner flex items-center justify-center">
                        <div className="w-full max-w-sm flex items-center justify-between p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg relative transform rotate-1 hover:rotate-0 transition-transform duration-300">
                            <div className="flex flex-col gap-1.5 text-left mr-4">
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Sponsored</span>
                                <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                                <div className="h-3 w-48 bg-slate-100 dark:bg-slate-700/50 rounded mt-1"></div>
                            </div>
                            <div className="h-8 w-24 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-100 dark:border-blue-800/50"></div>
                        </div>
                    </div>
                </div>

                {/* 4. VALUE / TRUST SECTION */}
                <div className="mb-20 md:mb-28">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-8">Why sponsor SafePDF?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="flex flex-col p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 border border-blue-100 dark:border-blue-800/50">
                                <span className="material-symbols-outlined">shield_locked</span>
                            </div>
                            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Client-Side Privacy</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                SafePDF processes PDFs entirely in the browser. A privacy-conscious audience that values secure, local tools without server uploads.
                            </p>
                        </div>
                        <div className="flex flex-col p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4 border border-purple-100 dark:border-purple-800/50">
                                <span className="material-symbols-outlined">code</span>
                            </div>
                            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Open Source</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                SafePDF is fully transparent and publicly auditable. Connect your brand with a transparent, open-source community.
                            </p>
                        </div>
                        <div className="flex flex-col p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mb-4 border border-green-100 dark:border-green-800/50">
                                <span className="material-symbols-outlined">visibility</span>
                            </div>
                            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Focused Placement</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                We feature only one sponsor at a time. The experience stays clean, giving your brand direct, uncrowded visibility.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 5. PRICING SECTION */}
                <div className="mb-20 md:mb-28">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">Simple, transparent pricing</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400">Choose the duration that fits your campaign.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        
                        {/* 14 Days Card */}
                        <div className="flex flex-col p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-shadow relative mt-4 md:mt-0">
                            <div className="mb-6">
                                <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">14 Days</h3>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">$6</span>
                                    <span className="text-slate-500 dark:text-slate-400 font-medium">/ 14 days</span>
                                </div>
                            </div>
                            
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-slate-900 dark:text-white mb-4">14-day homepage sponsorship includes:</p>
                                <ul className="flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-400 mb-8">
                                    <li className="flex items-center gap-3"><span className="material-symbols-outlined text-blue-500 text-[18px]">check</span>Homepage hero placement</li>
                                    <li className="flex items-center gap-3"><span className="material-symbols-outlined text-blue-500 text-[18px]">check</span>Clearly labeled Sponsored badge</li>
                                    <li className="flex items-center gap-3"><span className="material-symbols-outlined text-blue-500 text-[18px]">check</span>Sponsor name / short message / CTA</li>
                                    <li className="flex items-center gap-3"><span className="material-symbols-outlined text-blue-500 text-[18px]">check</span>One sponsor at a time</li>
                                    <li className="flex items-center gap-3"><span className="material-symbols-outlined text-blue-500 text-[18px]">check</span>Direct visibility to homepage visitors</li>
                                </ul>
                            </div>
                            
                            <a 
                                href="#booking-flow" 
                                className="w-full flex items-center justify-center px-6 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                Book This Placement
                            </a>
                        </div>

                        {/* Monthly Card (Recommended) */}
                        <div className="flex flex-col p-8 rounded-3xl bg-slate-900 dark:bg-slate-800/80 border-2 border-blue-500 dark:border-blue-500 shadow-xl relative transform md:-translate-y-4">
                            <div className="absolute -top-4 left-0 right-0 flex justify-center">
                                <span className="bg-blue-500 text-white text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-md">
                                    Recommended
                                </span>
                            </div>
                            
                            <div className="mb-6 mt-2">
                                <h3 className="text-sm font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest mb-2">Monthly</h3>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-black text-white tracking-tight">$10</span>
                                    <span className="text-slate-400 font-medium">/ month</span>
                                </div>
                            </div>
                            
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-white mb-4">30-day homepage sponsorship includes:</p>
                                <ul className="flex flex-col gap-3 text-sm text-slate-300 mb-8">
                                    <li className="flex items-center gap-3"><span className="material-symbols-outlined text-blue-400 text-[18px]">check</span>Homepage hero placement</li>
                                    <li className="flex items-center gap-3"><span className="material-symbols-outlined text-blue-400 text-[18px]">check</span>Clearly labeled Sponsored badge</li>
                                    <li className="flex items-center gap-3"><span className="material-symbols-outlined text-blue-400 text-[18px]">check</span>Sponsor name / short message / CTA</li>
                                    <li className="flex items-center gap-3"><span className="material-symbols-outlined text-blue-400 text-[18px]">check</span>One sponsor at a time</li>
                                    <li className="flex items-center gap-3"><span className="material-symbols-outlined text-blue-400 text-[18px]">check</span>Extended 30-day duration</li>
                                </ul>
                            </div>
                            
                            <a 
                                href="#booking-flow" 
                                className="w-full flex items-center justify-center px-6 py-3.5 rounded-xl bg-blue-500 text-white font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20 focus:ring-2 focus:ring-white focus:outline-none"
                            >
                                Book Monthly Placement
                            </a>
                        </div>
                    </div>
                </div>

                {/* 6. BOOKING EXPLANATION */}
                <div id="booking-flow" className="mb-20 md:mb-28 pt-8 scroll-mt-24">
                    <div className="p-8 md:p-12 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">How to book your sponsorship</h2>
                            <p className="text-slate-600 dark:text-slate-400">Secure your placement in three simple steps.</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                            {/* Connecting Line for Desktop */}
                            <div className="hidden md:block absolute top-6 left-[16%] right-[16%] h-0.5 bg-slate-100 dark:bg-slate-700 -z-10"></div>
                            
                            {/* Step 1 */}
                            <div className="flex flex-col items-center text-center relative z-10">
                                <div className="w-12 h-12 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center text-lg font-black mb-6 shadow-md border-4 border-white dark:border-slate-800">
                                    1
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Choose a placement</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    Decide between the 14-day ($6) or Monthly ($10) sponsorship option.
                                </p>
                            </div>
                            
                            {/* Step 2 */}
                            <div className="flex flex-col items-center text-center relative z-10">
                                <div className="w-12 h-12 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center text-lg font-black mb-6 shadow-md border-4 border-white dark:border-slate-800">
                                    2
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Use Support Me</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    Click the existing <span className="font-semibold text-slate-900 dark:text-white">Support Me</span> button in the top navigation bar to securely complete the payment.
                                </p>
                            </div>
                            
                            {/* Step 3 */}
                            <div className="flex flex-col items-center text-center relative z-10">
                                <div className="w-12 h-12 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center text-lg font-black mb-6 shadow-md border-4 border-white dark:border-slate-800">
                                    3
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Send your details</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    Contact Sujay on X or GitHub with your preferred sponsor copy, link, and start date.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid for Requirements and Privacy Policy */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 md:mb-28">
                    {/* 7. WHAT THE SPONSOR CAN PROVIDE */}
                    <div className="flex flex-col p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-blue-500">design_services</span>
                            Placement Details
                        </h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                            Once payment is complete, please provide the following for your placement card:
                        </p>
                        <ul className="flex flex-col gap-4 text-sm text-slate-700 dark:text-slate-300 flex-1">
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 shrink-0 mt-1.5"></div>
                                <span><strong>Brand/company name</strong></span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 shrink-0 mt-1.5"></div>
                                <span><strong>Short one-line description</strong> to explain your product</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 shrink-0 mt-1.5"></div>
                                <span><strong>Website link</strong> for the button</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 shrink-0 mt-1.5"></div>
                                <span><strong>Short CTA text</strong> (e.g., "Learn More →")</span>
                            </li>
                        </ul>
                    </div>
                    
                    {/* 8. PRIVACY / SPONSOR POLICY */}
                    <div className="flex flex-col p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-green-500">security</span>
                            Privacy Policy
                        </h2>
                        <div className="flex flex-col gap-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed h-full">
                            <p>
                                SafePDF is privacy-first. Sponsorship does not change how PDF files are processed.
                            </p>
                            <p className="font-medium text-slate-700 dark:text-slate-300 border-l-2 border-slate-300 dark:border-slate-600 pl-4 py-1">
                                User PDF files remain strictly processed locally in their browser.
                            </p>
                            <p>
                                Sponsorship does not mean the sponsor gets access to user files, private user information, or hidden analytics. The placement is purely a visible, static link on the homepage.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 9. FINAL CTA & CONTACT */}
                <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
                    <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 shadow-sm border border-blue-200 dark:border-blue-800/50">
                        <span className="material-symbols-outlined text-3xl">handshake</span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
                        Ready to sponsor SafePDF?
                    </h2>
                    
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-10">
                        Choose your placement, complete payment through the <span className="font-semibold text-slate-900 dark:text-white">Support Me</span> button, and contact Sujay to confirm your sponsorship details.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                        <a 
                            href="https://x.com/Sujay__Raj" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto group flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 dark:focus:ring-white focus:outline-none"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0" aria-hidden="true">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.264 5.633 5.9-5.633Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                            <span className="flex items-center gap-2">Contact on X <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">&rarr;</span></span>
                        </a>
                        
                        <a 
                            href="https://github.com/Sujay1977/SafePdf/issues" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto group flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold border border-slate-200 dark:border-slate-700 shadow-sm hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md hover:-translate-y-0.5 transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0" aria-hidden="true">
                                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                            <span className="flex items-center gap-2">Discuss on GitHub <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">&rarr;</span></span>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Sponsor;
