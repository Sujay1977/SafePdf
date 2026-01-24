import React from 'react';
import SEO from '../components/SEO';
import ClientOnly from '../components/ClientOnly';

const updates = [
    {
        date: "January 24, 2026",
        title: "Modern UI/UX Overhaul",
        features: [
            "Complete redesign of Tool Cards with unique gradients",
            "Improved hover interactions and shadows",
            "Added All Tools, Workflows, Pricing, and Updates pages",
            "Fixed icon alignment and clipping issues"
        ]
    },
    {
        date: "January 20, 2026",
        title: "SEO Engine Upgrade",
        features: [
            "Implemented Client-Side Pre-rendering",
            "Added dynamic social previews (Open Graph)",
            "Enhanced structured data for Google Rich Results"
        ]
    },
    {
        date: "January 15, 2026",
        title: "Dodo Payments Integration",
        features: [
            "Added 'Support Me' functionality",
            "Secure seamless payment flow for donations"
        ]
    },
    {
        date: "January 1, 2026",
        title: "Initial Launch",
        features: [
            "Released 12 core PDF tools",
            "Implemented 100% offline-capable architecture",
            "Launched PWA support"
        ]
    }
];

const Updates = () => {
    return (
        <div className="flex flex-col w-full min-h-screen bg-slate-50 dark:bg-slate-900">
            <SEO
                title="Latest Updates & Changelog | SafePDF"
                description="Stay up to date with the latest features, improvements, and releases for SafePDF."
            />

            <div className="w-full py-16 px-4">
                <div className="max-w-3xl mx-auto flex flex-col gap-12">
                    <div className="text-center flex flex-col gap-4">
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
                            What's New
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            We're constantly improving to make SafePDF better for you.
                        </p>
                    </div>

                    <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-4 md:ml-12 space-y-12 pl-8 md:pl-12 py-4">
                        {updates.map((update, index) => (
                            <div key={index} className="relative">
                                {/* Timeline Dot */}
                                <div className="absolute -left-[41px] md:-left-[58px] top-1.5 w-6 h-6 rounded-full bg-white dark:bg-slate-900 border-4 border-blue-500 shadow-sm z-10"></div>

                                <div className="flex flex-col gap-3">
                                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{update.title}</h3>
                                        <span className="text-sm font-medium px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 w-fit">
                                            {update.date}
                                        </span>
                                    </div>

                                    <ul className="space-y-2 mt-2">
                                        {update.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-2 text-slate-600 dark:text-slate-400 leading-relaxed">
                                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600 shrink-0"></div>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Updates;
