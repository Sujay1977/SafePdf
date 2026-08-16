import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import SponsorCard from '../components/SponsorCard';

const Sponsor = () => {
    return (
        <div className="flex flex-col w-full bg-background-light dark:bg-background-dark min-h-screen font-sans">
            <SEO
                title="Sponsor SafePDF | Reach Privacy-Focused PDF Users"
                description="Sponsor SafePDF and put your brand in front of people actively using privacy-focused PDF tools with a simple, transparent sponsorship placement."
                robots="index, follow"
            />

            <div className="w-full max-w-[1100px] mx-auto px-4 md:px-8 py-12 md:py-20 lg:py-24">
                
                {/* 1. Back to SafePDF */}
                <div className="mb-12">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-1 -ml-1"
                    >
                        <span aria-hidden="true" className="text-lg leading-none">&larr;</span>
                        Back to SafePDF
                    </Link>
                </div>

                {/* 2. Hero Section */}
                <section className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-24 md:mb-32">
                    <div className="flex flex-col gap-6 flex-1 max-w-3xl">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            SafePDF Sponsorship
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-[56px] font-black tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                            Put Your Brand in Front of People Already Using PDF Tools
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium max-w-2xl">
                            Reach a privacy-conscious audience with a clearly labeled, premium sponsorship placement integrated seamlessly into the SafePDF experience.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                            <a 
                                href="#pricing" 
                                className="w-full sm:w-auto flex items-center justify-center px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 dark:focus:ring-white focus:outline-none"
                            >
                                Book a Sponsor Spot
                            </a>
                            <a 
                                href="#preview" 
                                className="w-full sm:w-auto flex items-center justify-center px-8 py-4 rounded-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold border border-slate-200 dark:border-slate-700 shadow-sm hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md hover:-translate-y-0.5 transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                See Placement
                            </a>
                        </div>
                    </div>
                    
                    {/* Hero Visual Mockup */}
                    <div className="flex-1 w-full max-w-lg lg:max-w-none relative rounded-3xl bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 p-8 overflow-hidden shadow-inner hidden md:block">
                        <div className="absolute top-0 right-0 p-8 w-full max-w-sm ml-auto opacity-40 blur-3xl -z-10 bg-blue-400 dark:bg-blue-600 rounded-full h-full"></div>
                        <div className="w-full flex flex-col gap-4">
                            <div className="h-8 w-48 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                            <div className="h-4 w-full max-w-[80%] bg-slate-200/60 dark:bg-slate-700/60 rounded"></div>
                            <div className="h-4 w-full max-w-[60%] bg-slate-200/60 dark:bg-slate-700/60 rounded"></div>
                            <div className="mt-6 pointer-events-none transform shadow-2xl hover:-translate-y-1 transition-transform">
                                <SponsorCard />
                            </div>
                            <div className="h-32 w-full mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm"></div>
                        </div>
                    </div>
                </section>

                {/* 3. Where Your Brand Appears & Preview */}
                <section id="preview" className="mb-24 md:mb-32 scroll-mt-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                        <div className="lg:col-span-5 flex flex-col gap-6">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                                Where Your Brand Appears
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                Your placement is integrated into SafePDF's website rather than appearing as a disruptive ad.
                                The sponsor card is placed prominently in the upper right on desktop, and neatly stacked on mobile.
                            </p>
                            <ul className="flex flex-col gap-4 mt-2">
                                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
                                    <span className="material-symbols-outlined text-green-500 shrink-0">check_circle</span>
                                    Homepage Hero
                                </li>
                                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
                                    <span className="material-symbols-outlined text-green-500 shrink-0">check_circle</span>
                                    All 12+ PDF Tool Pages (Merge, Split, Compress, etc.)
                                </li>
                                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
                                    <span className="material-symbols-outlined text-green-500 shrink-0">check_circle</span>
                                    All Tools Directory
                                </li>
                                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
                                    <span className="material-symbols-outlined text-green-500 shrink-0">check_circle</span>
                                    Blog Articles
                                </li>
                            </ul>
                        </div>
                        
                        <div className="lg:col-span-7 flex flex-col gap-6">
                            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest pl-2">See Your Brand in Action</h3>
                            <div className="p-8 md:p-12 rounded-3xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 shadow-inner flex flex-col items-center justify-center min-h-[250px]">
                                <div className="w-full max-w-sm pointer-events-none transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                                    <SponsorCard />
                                </div>
                                <p className="text-xs text-slate-400 dark:text-slate-500 mt-6 text-center max-w-xs">
                                    This is exactly how the placement renders across the site. Clicking it currently reloads this page.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. Why Sponsor SafePDF */}
                <section className="mb-24 md:mb-32">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">Why Sponsor SafePDF?</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            We offer a clean, honest business model. You get focused visibility, and our users get to keep a fast, privacy-first PDF tool without ad networks.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: "target",
                                title: "Reach an Intent-Driven Audience",
                                desc: "Your message is displayed alongside users actively engaging with PDF utilities and document workflows."
                            },
                            {
                                icon: "star",
                                title: "Premium, Focused Visibility",
                                desc: "We feature only one sponsor at a time. Your brand never competes with multiple banners for attention."
                            },
                            {
                                icon: "block",
                                title: "Non-Intrusive Placement",
                                desc: "No popups, no autoplay videos, and no disruptive full-page interstitial ads. Just a clean static card."
                            },
                            {
                                icon: "shield_locked",
                                title: "Privacy-First Environment",
                                desc: "Align your brand with a product that respects user privacy. We don't use tracking pixels or invasive ad networks."
                            },
                            {
                                icon: "branding_watermark",
                                title: "Clear Brand Placement",
                                desc: "Your company name, a short descriptive message, and a clear call-to-action are presented directly."
                            },
                            {
                                icon: "speed",
                                title: "Simple Sponsorship",
                                desc: "A straightforward model with transparent pricing. No bidding, no complicated dashboard, just direct placement."
                            }
                        ].map((card, idx) => (
                            <div key={idx} className="flex flex-col p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-5 border border-blue-100 dark:border-blue-800/50">
                                    <span className="material-symbols-outlined">{card.icon}</span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{card.title}</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {card.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. Simple 3-Step Process */}
                <section className="mb-24 md:mb-32">
                    <div className="p-8 md:p-12 lg:p-16 rounded-[2.5rem] bg-slate-900 dark:bg-slate-800 text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 p-8 w-full max-w-xl opacity-20 blur-3xl -z-10 bg-blue-500 rounded-full h-full transform translate-x-1/3 -translate-y-1/4"></div>
                        
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold tracking-tight mb-4">How It Works</h2>
                            <p className="text-slate-300 text-lg">Secure your placement in three simple steps.</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                            {/* Connecting Line for Desktop */}
                            <div className="hidden md:block absolute top-6 left-[16%] right-[16%] h-0.5 bg-slate-700 -z-10"></div>
                            
                            <div className="flex flex-col items-center text-center">
                                <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-black mb-6 shadow-md border-4 border-slate-900 dark:border-slate-800">1</div>
                                <h3 className="text-lg font-bold text-white mb-2">Choose Your Placement</h3>
                                <p className="text-sm text-slate-300 px-4">Select between the 14-day or 30-day sponsorship option below.</p>
                            </div>
                            
                            <div className="flex flex-col items-center text-center">
                                <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-black mb-6 shadow-md border-4 border-slate-900 dark:border-slate-800">2</div>
                                <h3 className="text-lg font-bold text-white mb-2">Submit Details</h3>
                                <p className="text-sm text-slate-300 px-4">Provide your company name, short description, link, and CTA text via X or GitHub.</p>
                            </div>
                            
                            <div className="flex flex-col items-center text-center">
                                <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-black mb-6 shadow-md border-4 border-slate-900 dark:border-slate-800">3</div>
                                <h3 className="text-lg font-bold text-white mb-2">Get Featured</h3>
                                <p className="text-sm text-slate-300 px-4">Your approved sponsor card is placed into the SafePDF experience for your selected duration.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. Pricing Section */}
                <section id="pricing" className="mb-24 md:mb-32 scroll-mt-24">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">Sponsorship Packages</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400">Transparent pricing for premium visibility.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* 14 Days Card */}
                        <div className="flex flex-col p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-shadow relative mt-4 md:mt-0">
                            <div className="mb-6">
                                <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">14 Days</h3>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">$6</span>
                                    <span className="text-slate-500 dark:text-slate-400 font-medium">/ flat rate</span>
                                </div>
                            </div>
                            
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Includes placement on:</p>
                                <ul className="flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-400 mb-8">
                                    <li className="flex items-center gap-3"><span className="material-symbols-outlined text-blue-500 text-[18px]">check</span>Homepage Hero</li>
                                    <li className="flex items-center gap-3"><span className="material-symbols-outlined text-blue-500 text-[18px]">check</span>All 12+ PDF Tool Pages</li>
                                    <li className="flex items-center gap-3"><span className="material-symbols-outlined text-blue-500 text-[18px]">check</span>All Tools Directory & Blog</li>
                                    <li className="flex items-center gap-3"><span className="material-symbols-outlined text-blue-500 text-[18px]">check</span>Clearly labeled Sponsored badge</li>
                                    <li className="flex items-center gap-3"><span className="material-symbols-outlined text-blue-500 text-[18px]">check</span>One exclusive sponsor at a time</li>
                                    <li className="flex items-center gap-3"><span className="material-symbols-outlined text-blue-500 text-[18px]">check</span>14-day duration</li>
                                </ul>
                            </div>
                            
                            <a 
                                href="#booking-cta" 
                                className="w-full flex items-center justify-center px-6 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                Book 14 Days
                            </a>
                        </div>

                        {/* Monthly Card (Recommended) */}
                        <div className="flex flex-col p-8 rounded-3xl bg-white dark:bg-slate-800 border-2 border-blue-500 shadow-xl relative transform md:-translate-y-4">
                            <div className="absolute -top-4 left-0 right-0 flex justify-center">
                                <span className="bg-blue-500 text-white text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-md">
                                    Recommended
                                </span>
                            </div>
                            
                            <div className="mb-6 mt-2">
                                <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2">Monthly</h3>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">$10</span>
                                    <span className="text-slate-500 dark:text-slate-400 font-medium">/ 30 days</span>
                                </div>
                            </div>
                            
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Includes placement on:</p>
                                <ul className="flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-400 mb-8">
                                    <li className="flex items-center gap-3"><span className="material-symbols-outlined text-blue-500 text-[18px]">check</span>Homepage Hero</li>
                                    <li className="flex items-center gap-3"><span className="material-symbols-outlined text-blue-500 text-[18px]">check</span>All 12+ PDF Tool Pages</li>
                                    <li className="flex items-center gap-3"><span className="material-symbols-outlined text-blue-500 text-[18px]">check</span>All Tools Directory & Blog</li>
                                    <li className="flex items-center gap-3"><span className="material-symbols-outlined text-blue-500 text-[18px]">check</span>Clearly labeled Sponsored badge</li>
                                    <li className="flex items-center gap-3"><span className="material-symbols-outlined text-blue-500 text-[18px]">check</span>One exclusive sponsor at a time</li>
                                    <li className="flex items-center gap-3 font-semibold text-slate-900 dark:text-white"><span className="material-symbols-outlined text-blue-500 text-[18px]">check</span>Extended 30-day duration</li>
                                </ul>
                            </div>
                            
                            <a 
                                href="#booking-cta" 
                                className="w-full flex items-center justify-center px-6 py-3.5 rounded-xl bg-blue-500 text-white font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                Book Monthly
                            </a>
                        </div>
                    </div>
                </section>

                {/* 7. Privacy & Trust + FAQ */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24 md:mb-32 items-start">
                    {/* Privacy */}
                    <div className="flex flex-col gap-6 p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                        <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mb-2 border border-green-100 dark:border-green-800/50">
                            <span className="material-symbols-outlined">security</span>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                            Your Sponsorship Does Not Give You Access to User Data
                        </h2>
                        <div className="flex flex-col gap-4 text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">
                            <p>
                                SafePDF is a privacy-first platform. All PDF processing happens strictly locally in the user's browser.
                            </p>
                            <p className="font-medium text-slate-700 dark:text-slate-300 border-l-2 border-slate-300 dark:border-slate-600 pl-4 py-1">
                                Sponsors do not receive user PDF files or private user information through this placement.
                            </p>
                            <p>
                                The sponsorship does not change SafePDF's behavior or introduce hidden tracking. The placement is purely a visible, static link on the supported pages, honoring our promise to users.
                            </p>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="flex flex-col gap-6">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                            Frequently Asked Questions
                        </h2>
                        
                        <div className="flex flex-col gap-6">
                            <div>
                                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Where exactly will my sponsor card appear?</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">It appears in the hero section of the homepage, the header grid of all PDF tool pages, the All Tools page, and the Blog index.</p>
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Can multiple sponsors appear at once?</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">No. We feature one exclusive sponsor at a time to ensure your message is not crowded out by competitors or ad networks.</p>
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Can I include a website link?</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Yes. The entire card acts as a link to your specified URL, along with a custom CTA text (e.g. "Learn More").</p>
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">What information do I need to provide?</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">We need your brand/company name, a short one-line description, the website URL, and short CTA text.</p>
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Can I cancel or modify my sponsorship?</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Purchases are flat-rate for the duration booked. You can contact Sujay to request minor copy updates during your run.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 8. Final CTA */}
                <section id="booking-cta" className="flex flex-col items-center text-center max-w-2xl mx-auto scroll-mt-24 pb-12">
                    <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 shadow-sm border border-blue-200 dark:border-blue-800/50">
                        <span className="material-symbols-outlined text-3xl">campaign</span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
                        Ready to Put Your Brand in Front of SafePDF Users?
                    </h2>
                    
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-10">
                        To book your spot, use the <span className="font-semibold text-slate-900 dark:text-white">Support Me</span> button in the top navigation bar to complete payment, then contact Sujay to provide your details.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                        {/* Navigating to top simulates telling them to use the nav button */}
                        <a 
                            href="#" 
                            className="w-full sm:w-auto flex items-center justify-center px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 dark:focus:ring-white focus:outline-none"
                            onClick={(e) => {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                        >
                            Book Your Sponsor Spot
                        </a>
                        
                        <a 
                            href="https://x.com/Sujay__Raj" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto group flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold border border-slate-200 dark:border-slate-700 shadow-sm hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md hover:-translate-y-0.5 transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0" aria-hidden="true">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.264 5.633 5.9-5.633Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                            <span>Contact Us</span>
                        </a>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default Sponsor;
