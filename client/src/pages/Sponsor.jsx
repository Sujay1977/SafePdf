import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import SponsorCard from '../components/SponsorCard';
import {
    ArrowLeft,
    ArrowRight,
    Check,
    ExternalLink,
    ShieldCheck,
    EyeOff,
    Monitor,
    Tag,
    FileText,
    Heart,
    Lock,
    HelpCircle,
    MessageSquare,
    Sparkles
} from 'lucide-react';

const Sponsor = () => {
    return (
        <div className="flex flex-col w-full bg-slate-50/50 dark:bg-slate-950 min-h-screen font-sans">
            <SEO
                title="Sponsor SafePDF | Reach Privacy-Focused PDF Users"
                description="Sponsor SafePDF and put your brand in front of privacy-conscious users with a clear, restrained commercial sponsorship placement."
                robots="index, follow"
            />

            <div className="w-full max-w-5xl mx-auto px-4 md:px-8 py-10 md:py-16">
                
                {/* 1. Back to SafePDF */}
                <div className="mb-10">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-1.5 py-1 -ml-1.5"
                    >
                        <ArrowLeft size={16} aria-hidden="true" />
                        <span>Back to SafePDF</span>
                    </Link>
                </div>

                {/* 2. Hero Section */}
                <section className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 md:mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200/80 dark:border-blue-800/60 text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-widest mb-5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                        SafePDF Sponsorship
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6">
                        Sponsor SafePDF
                    </h1>

                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-2xl mb-8">
                        Reach a privacy-conscious audience through a small, clearly labeled placement inside SafePDF.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto">
                        <a
                            href="#pricing"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm shadow-md hover:bg-slate-800 dark:hover:bg-slate-100 hover:shadow-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                        >
                            <span>View Pricing & Packages</span>
                            <ArrowRight size={15} aria-hidden="true" />
                        </a>
                        <a
                            href="#mockup"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-bold text-sm border border-slate-200 dark:border-slate-800 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                        >
                            <span>See Placement Mockup</span>
                        </a>
                        <a
                            href="#how-to-book"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-300 font-bold text-sm border border-amber-200/80 dark:border-amber-800/50 hover:bg-amber-100/70 dark:hover:bg-amber-900/40 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                        >
                            <Heart size={14} className="fill-amber-500/30 stroke-amber-600 dark:stroke-amber-400" aria-hidden="true" />
                            <span>How to Book</span>
                        </a>
                    </div>
                </section>

                {/* 3. HTML/CSS Placement Mockup */}
                <section id="mockup" className="mb-20 md:mb-28 scroll-mt-24">
                    <div className="flex flex-col gap-3 text-center max-w-2xl mx-auto mb-8">
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                            Spatial Representation
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                            Where Your Sponsor Card Appears
                        </h2>
                        <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
                            The sponsor card is positioned directly in the upper right of the homepage hero on desktop, and stacks neatly above the security illustration on mobile.
                        </p>
                    </div>

                    {/* Browser Shell Mockup */}
                    <div className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden">
                        {/* Chrome bar */}
                        <div className="flex items-center justify-between px-4 py-3 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800">
                            <div className="flex items-center gap-1.5">
                                <span className="w-3 h-3 rounded-full bg-red-400/80"></span>
                                <span className="w-3 h-3 rounded-full bg-amber-400/80"></span>
                                <span className="w-3 h-3 rounded-full bg-emerald-400/80"></span>
                            </div>
                            <div className="flex items-center gap-1.5 px-4 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 text-[11px] font-mono text-slate-500 dark:text-slate-400 select-none">
                                <Lock size={11} className="text-emerald-600 dark:text-emerald-400" />
                                <span>safepdf.site</span>
                            </div>
                            <div className="w-12"></div>
                        </div>

                        {/* Viewport content */}
                        <div className="p-4 sm:p-6 md:p-8 bg-slate-50 dark:bg-slate-900/60">
                            {/* Mini SafePDF Navbar */}
                            <div className="w-full pb-6 mb-6 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-lg bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">
                                        PDF
                                    </div>
                                    <span className="font-bold text-slate-900 dark:text-white text-sm">SafePDF</span>
                                </div>
                                <div className="hidden sm:flex items-center gap-4 text-xs font-medium text-slate-600 dark:text-slate-400">
                                    <span>Merge PDF</span>
                                    <span>Split PDF</span>
                                    <span>Compress PDF</span>
                                    <span>All Tools</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFBF00] text-slate-950 font-bold text-[11px] shadow-sm select-none">
                                        <Heart size={11} className="fill-slate-950/20 stroke-[2.5px]" />
                                        <span>Support Me</span>
                                    </div>
                                    <div className="hidden sm:block px-3 py-1 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[11px] font-bold">
                                        Explore Tools
                                    </div>
                                </div>
                            </div>

                            {/* Mini Hero Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                                {/* Left: Hero Copy */}
                                <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-4">
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                        100% Client-Side Privacy
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                                        Your PDFs,<br />
                                        <span className="text-blue-600 dark:text-blue-400">Your Privacy.</span>
                                    </h3>
                                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md">
                                        Free, secure, and client-side PDF tools. Files are processed locally in your browser and never uploaded to any server.
                                    </p>
                                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs shadow-md mt-2">
                                        <span>Start Editing Your PDF</span>
                                        <ArrowRight size={13} />
                                    </div>
                                </div>

                                {/* Right: Live SponsorCard placement */}
                                <div className="lg:col-span-5 flex flex-col items-center lg:items-end gap-5 w-full">
                                    <div className="w-full max-w-[360px] pointer-events-none transform transition-transform">
                                        <div className="ring-2 ring-blue-500/30 dark:ring-blue-400/20 rounded-2xl">
                                            <SponsorCard />
                                        </div>
                                    </div>

                                    {/* Mini Security Portal illustration placeholder */}
                                    <div className="w-36 h-36 rounded-full border-2 border-dashed border-blue-200 dark:border-blue-900/60 flex items-center justify-center relative">
                                        <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md flex items-center justify-center">
                                            <Lock size={20} className="text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[9px] font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                                            <Check size={9} />
                                            <span>Encrypted</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Where else it appears */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                        {[
                            { name: 'Homepage Hero', desc: 'Top-right above fold on desktop' },
                            { name: 'All 19 Tool Pages', desc: 'Integrated into tool headers' },
                            { name: 'Tools Directory', desc: 'Visible alongside tool filters' },
                            { name: 'Blog Index', desc: 'Prominent header placement' },
                        ].map((loc, i) => (
                            <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-left">
                                <span className="p-1 rounded-md bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0">
                                    <Check size={12} strokeWidth={3} />
                                </span>
                                <div>
                                    <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{loc.name}</h4>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{loc.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 4. Pricing Section */}
                <section id="pricing" className="mb-20 md:mb-28 scroll-mt-24">
                    <div className="text-center mb-12">
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                            Transparent Pricing
                        </span>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mt-2 mb-3">
                            Sponsorship Packages
                        </h2>
                        <p className="text-slate-600 dark:text-slate-300 text-base max-w-xl mx-auto">
                            Flat-rate pricing for homepage visibility. Simple booking handled through Support Me.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
                        {/* 14 Days Card */}
                        <div className="flex flex-col p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                            <div className="mb-6">
                                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-2">
                                    14 Days Placement
                                </span>
                                <div className="flex items-baseline gap-1.5">
                                    <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">$6</span>
                                    <span className="text-slate-500 dark:text-slate-400 font-medium text-sm">/ 14 days</span>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                                    Ideal for product launches, short-term campaigns, or utility promotions.
                                </p>
                            </div>
                            
                            <div className="flex-1 border-t border-slate-100 dark:border-slate-800 pt-6">
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-4">
                                    Package Details:
                                </p>
                                <ul className="flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-300 mb-8">
                                    <li className="flex items-center gap-3">
                                        <span className="p-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 shrink-0">
                                            <Check size={14} strokeWidth={3} />
                                        </span>
                                        <span>Homepage hero placement</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="p-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 shrink-0">
                                            <Check size={14} strokeWidth={3} />
                                        </span>
                                        <span>Clear &quot;Sponsored&quot; label</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="p-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 shrink-0">
                                            <Check size={14} strokeWidth={3} />
                                        </span>
                                        <span>Direct link to sponsor destination</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="p-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 shrink-0">
                                            <Check size={14} strokeWidth={3} />
                                        </span>
                                        <span>Non-intrusive card layout</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="p-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 shrink-0">
                                            <Check size={14} strokeWidth={3} />
                                        </span>
                                        <span>No tracking pixels &amp; no data access</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="p-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 shrink-0">
                                            <Check size={14} strokeWidth={3} />
                                        </span>
                                        <span>14-day continuous placement</span>
                                    </li>
                                </ul>
                            </div>

                            <a
                                href="#how-to-book"
                                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                <span>Choose 14 Days</span>
                                <ArrowRight size={14} />
                            </a>
                        </div>

                        {/* Monthly Card (Recommended) */}
                        <div className="flex flex-col p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-blue-500 shadow-xl relative mt-4 md:mt-0">
                            <div className="absolute -top-3.5 left-0 right-0 flex justify-center">
                                <span className="bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wider py-1 px-3.5 rounded-full shadow-sm">
                                    Recommended · Best Value
                                </span>
                            </div>
                            
                            <div className="mb-6 mt-1">
                                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-2">
                                    1 Month Placement
                                </span>
                                <div className="flex items-baseline gap-1.5">
                                    <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">$10</span>
                                    <span className="text-slate-500 dark:text-slate-400 font-medium text-sm">/ month</span>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                                    Longer continuous exposure and maximum visibility across SafePDF.
                                </p>
                            </div>
                            
                            <div className="flex-1 border-t border-slate-100 dark:border-slate-800 pt-6">
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-4">
                                    Package Details:
                                </p>
                                <ul className="flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-300 mb-8">
                                    <li className="flex items-center gap-3 font-semibold text-slate-900 dark:text-white">
                                        <span className="p-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 shrink-0">
                                            <Check size={14} strokeWidth={3} />
                                        </span>
                                        <span>Homepage hero placement</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="p-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 shrink-0">
                                            <Check size={14} strokeWidth={3} />
                                        </span>
                                        <span>Clear &quot;Sponsored&quot; label</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="p-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 shrink-0">
                                            <Check size={14} strokeWidth={3} />
                                        </span>
                                        <span>Direct link to sponsor destination</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="p-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 shrink-0">
                                            <Check size={14} strokeWidth={3} />
                                        </span>
                                        <span>Non-intrusive card layout</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="p-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 shrink-0">
                                            <Check size={14} strokeWidth={3} />
                                        </span>
                                        <span>No tracking pixels &amp; no data access</span>
                                    </li>
                                    <li className="flex items-center gap-3 font-semibold text-blue-600 dark:text-blue-400">
                                        <span className="p-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 shrink-0">
                                            <Check size={14} strokeWidth={3} />
                                        </span>
                                        <span>Extended 30-day continuous visibility</span>
                                    </li>
                                </ul>
                            </div>

                            <a
                                href="#how-to-book"
                                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                <span>Choose Monthly</span>
                                <ArrowRight size={14} />
                            </a>
                        </div>
                    </div>
                </section>

                {/* 5. What You Get */}
                <section className="mb-20 md:mb-28">
                    <div className="text-center mb-12">
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                            Commercial Standards
                        </span>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mt-2 mb-3">
                            What You Get
                        </h2>
                        <p className="text-slate-600 dark:text-slate-300 text-base max-w-xl mx-auto">
                            A clean, respectful sponsorship designed for privacy-minded audiences.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {[
                            {
                                icon: Monitor,
                                title: "Homepage Hero Placement",
                                desc: "Prominently featured in the SafePDF homepage hero section for immediate visibility."
                            },
                            {
                                icon: Tag,
                                title: "Clear Sponsored Label",
                                desc: "Ethically labeled with a clear 'Sponsored' tag and an open availability indicator."
                            },
                            {
                                icon: ExternalLink,
                                title: "Direct Destination Link",
                                desc: "A direct, unencumbered link to your product, company, or campaign landing page."
                            },
                            {
                                icon: EyeOff,
                                title: "Non-Intrusive Placement",
                                desc: "No popups, no takeover overlays, and no intrusive animations that degrade user trust."
                            },
                            {
                                icon: ShieldCheck,
                                title: "No Tracking Pixels",
                                desc: "SafePDF does not load ad tracking networks, telemetry scripts, or invasive pixels."
                            },
                            {
                                icon: FileText,
                                title: "No Access to User Files",
                                desc: "All PDF workflows process 100% locally in the browser. Sponsors never receive user file data."
                            },
                            {
                                icon: Sparkles,
                                title: "Privacy-First Environment",
                                desc: "Align your product with a privacy-conscious user base that values secure, local-first tools."
                            }
                        ].map((item, idx) => {
                            const IconComponent = item.icon;
                            return (
                                <div key={idx} className="flex flex-col p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 border border-blue-100 dark:border-blue-900/40">
                                        <IconComponent size={20} />
                                    </div>
                                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">{item.title}</h3>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* 6. How to Book (3-4 step relationship with Support Me) */}
                <section id="how-to-book" className="mb-20 md:mb-28 scroll-mt-24">
                    <div className="p-8 md:p-12 rounded-3xl bg-slate-900 dark:bg-slate-800 text-white shadow-xl relative overflow-hidden">
                        <div className="text-center max-w-2xl mx-auto mb-10">
                            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                                Simple Booking Process
                            </span>
                            <h2 className="text-3xl font-bold tracking-tight mt-2 mb-3">
                                How to Book
                            </h2>
                            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                                Sponsorship payments are completed directly using the existing <span className="text-[#FFBF00] font-semibold">Support Me</span> button in the top navigation bar.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
                            {[
                                {
                                    step: "1",
                                    title: "Choose Duration",
                                    desc: "Select either the 14-day ($6) or 1-month ($10) sponsorship duration."
                                },
                                {
                                    step: "2",
                                    title: "Click Support Me",
                                    desc: "Click the yellow Support Me button in the navbar to launch the payment checkout."
                                },
                                {
                                    step: "3",
                                    title: "Complete Payment",
                                    desc: "Enter the amount for your selected duration ($6 or $10) and complete payment."
                                },
                                {
                                    step: "4",
                                    title: "Send Details",
                                    desc: "Contact Sujay via X or GitHub with your transaction confirmation and copy."
                                }
                            ].map((s, idx) => (
                                <div key={idx} className="flex flex-col items-center text-center p-4 rounded-2xl bg-slate-800/80 dark:bg-slate-900/60 border border-slate-700/60">
                                    <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-black mb-4 shadow-sm">
                                        {s.step}
                                    </div>
                                    <h3 className="text-sm font-bold text-white mb-1.5">{s.title}</h3>
                                    <p className="text-xs text-slate-300 leading-relaxed">{s.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 7. Privacy Guarantee & FAQ */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 md:mb-28 items-start">
                    {/* Privacy Guarantee */}
                    <div className="lg:col-span-5 flex flex-col gap-5 p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-100 dark:border-emerald-900/40">
                            <ShieldCheck size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                            Your Sponsorship Does Not Give You Access to User Data
                        </h3>
                        <div className="flex flex-col gap-3 text-slate-600 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                            <p>
                                SafePDF is a strictly client-side platform. All document conversions, splits, merges, and edits occur solely inside the visitor&apos;s browser memory.
                            </p>
                            <p className="font-semibold text-slate-800 dark:text-slate-200 border-l-2 border-emerald-500 pl-3 py-1">
                                Sponsors do not receive user files, metadata, or contact information through this placement.
                            </p>
                            <p>
                                Sponsorship is purely a visible, static link displayed in the agreed placement, maintaining complete respect for our users&apos; privacy.
                            </p>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="lg:col-span-7 flex flex-col gap-5">
                        <div className="flex items-center gap-2">
                            <HelpCircle size={18} className="text-slate-400" />
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                                Frequently Asked Questions
                            </h3>
                        </div>
                        
                        <div className="flex flex-col gap-4">
                            {[
                                {
                                    q: "Where does my sponsor card appear?",
                                    a: "It appears on the SafePDF homepage hero, the SafePDF blog, and five select core tool pages (Merge, Compress, Split, PDF to Word, and Edit)."
                                },
                                {
                                    q: "Can multiple sponsors appear simultaneously?",
                                    a: "No. Placements are limited to one sponsor at a time so your brand receives focused attention without ad clutter."
                                },
                                {
                                    q: "What details do I need to send after paying?",
                                    a: "Send your company or brand name, a concise 1-line description, your destination URL, and preferred CTA button text."
                                },
                                {
                                    q: "How do I contact Sujay to activate my spot?",
                                    a: "Reach out via X (@Sujay__Raj) or open an issue on the SafePDF GitHub repository with your transaction reference."
                                }
                            ].map((faq, idx) => (
                                <div key={idx} className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mb-1">{faq.q}</h4>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 8. Final CTA & Booking Step */}
                <section id="booking-cta" className="flex flex-col items-center text-center max-w-2xl mx-auto scroll-mt-24 pb-8">
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-5 border border-amber-200/70 dark:border-amber-800/50 shadow-sm">
                        <Heart size={26} className="fill-amber-500/20" />
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
                        Ready to Sponsor SafePDF?
                    </h2>
                    
                    <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 mb-8 max-w-lg">
                        Use the <span className="font-bold text-slate-900 dark:text-white">Support Me</span> button in the top navigation bar to complete payment, then contact Sujay on X or GitHub with your sponsor copy.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
                        <button
                            type="button"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#FFBF00] hover:bg-[#F2B600] text-black font-bold text-sm shadow-[0_2px_10px_rgba(255,191,0,0.2)] hover:shadow-[0_4px_15px_rgba(255,191,0,0.3)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                        >
                            <Heart size={15} className="fill-black/10 stroke-[2.5px]" />
                            <span>Click Support Me in Navbar</span>
                        </button>
                        
                        <a 
                            href="https://x.com/Sujay__Raj" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-bold text-sm border border-slate-200 dark:border-slate-800 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                        >
                            <MessageSquare size={15} />
                            <span>Contact on X</span>
                        </a>

                        <a
                            href="https://github.com/Sujay1977/SafePdf/issues"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-bold text-sm border border-slate-200 dark:border-slate-800 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                        >
                            <ExternalLink size={15} />
                            <span>GitHub Issues</span>
                        </a>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default Sponsor;
