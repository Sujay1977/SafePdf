import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * SponsorCard — A compact, commercial sponsorship placement for SafePDF.
 *
 * Desktop: Anchored to the top of the right hero column (upper-right of hero),
 *          and integrated into ToolPageHeader, AllTools, and Blog.
 * Mobile:  Stacks naturally below hero content, remaining compact and tap-friendly.
 *
 * Information hierarchy:
 * 1. SPONSORED · SPONSOR SPOT OPEN (restrained status dot)
 * 2. Homepage Placement label
 * 3. Value proposition: "Reach privacy-conscious users with SafePDF."
 * 4. Concise commercial pricing: 14 days ($6) & 1 month ($10, value)
 * 5. Limited placement indicator & "Become a Sponsor →" CTA
 *
 * Design constraints:
 * - Visually secondary to SafePDF's primary content.
 * - Uses existing SafePDF Tailwind tokens (slate / blue / white / emerald).
 * - Zero external scripts, images, tracking pixels, or dependencies.
 * - Zero decorative emojis.
 */
const SponsorCard = () => {
    return (
        <aside aria-label="Sponsorship opportunity" className="w-full max-w-[380px]">
            <Link
                to="/sponsor"
                className={[
                    // Layout
                    'group block w-full text-left',
                    'p-3.5 sm:p-4',
                    // Shape & surface
                    'rounded-2xl',
                    'bg-white/90 dark:bg-slate-800/90',
                    'backdrop-blur-md',
                    // Border & shadow
                    'border border-slate-200/90 dark:border-slate-700/80',
                    'shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.25)]',
                    // Hover
                    'hover:border-blue-300 dark:hover:border-blue-600/70',
                    'hover:shadow-[0_4px_20px_rgba(37,99,235,0.09)]',
                    'hover:bg-white dark:hover:bg-slate-800',
                    // Transition
                    'transition-all duration-200 ease-out',
                    // Focus
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
                ].join(' ')}
            >
                {/* 1. Header: Eyebrow + Availability Status */}
                <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500 select-none">
                        Sponsored
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 text-[9.5px] font-bold text-emerald-700 dark:text-emerald-400 tracking-wider uppercase whitespace-nowrap">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                        Sponsor Spot Open
                    </span>
                </div>

                {/* 2. Placement & Value Proposition */}
                <div className="mb-2.5">
                    <span className="text-[10.5px] font-semibold text-slate-500 dark:text-slate-400 block mb-0.5">
                        Homepage Placement
                    </span>
                    <p className="text-[13px] font-semibold text-slate-800 dark:text-slate-100 leading-snug">
                        Reach privacy-conscious users with SafePDF.
                    </p>
                </div>

                {/* 3. Concise Commercial Pricing */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-700/60">
                        <span className="text-[11.5px] text-slate-600 dark:text-slate-400 font-medium">14 days</span>
                        <span className="text-[12px] font-bold text-slate-900 dark:text-white">$6</span>
                    </div>
                    <div className="flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-800/50">
                        <div className="flex items-center gap-1">
                            <span className="text-[11.5px] text-blue-700 dark:text-blue-300 font-semibold">1 month</span>
                            <span className="text-[8.5px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 px-1 py-0.5 rounded leading-none">
                                Value
                            </span>
                        </div>
                        <span className="text-[12px] font-black text-blue-700 dark:text-blue-300">$10</span>
                    </div>
                </div>

                {/* 4. Action Row: Limited placement + CTA */}
                <div className="w-full flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
                    <span className="text-[10.5px] font-medium text-slate-500 dark:text-slate-400">
                        Limited placement
                    </span>
                    <span
                        aria-label="Become a SafePDF sponsor"
                        className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors whitespace-nowrap"
                    >
                        <span>Become a Sponsor</span>
                        <ArrowRight
                            size={13}
                            className="group-hover:translate-x-0.5 transition-transform duration-200"
                            aria-hidden="true"
                        />
                    </span>
                </div>
            </Link>
        </aside>
    );
};

export default SponsorCard;
