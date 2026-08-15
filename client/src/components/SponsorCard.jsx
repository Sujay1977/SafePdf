import React from 'react';
import { Link } from 'react-router-dom';

/**
 * SponsorCard — A compact, premium sponsorship placement for the hero.
 *
 * Desktop: Anchored to the top of the right hero column (upper-right of hero).
 * Mobile:  Stacks naturally below the left-column CTA, above the illustration.
 *
 * Design principles:
 * - Visually secondary to SafePDF's primary content.
 * - Uses only existing SafePDF Tailwind token palette (slate / blue / white).
 * - Frosted-glass surface integrates into the hero's bg-slate-50 / dark:bg-slate-900.
 * - No external scripts, images, iframes, or tracking.
 * - Lightweight: static JSX + Tailwind classes only.
 */
const SponsorCard = () => {
    return (
        <aside aria-label="Sponsorship opportunity" className="w-full">
            <Link
                to="/sponsor"
                className={[
                    // Layout
                    'group flex items-center gap-4 w-full',
                    'px-4 py-3.5',
                    // Shape & surface
                    'rounded-2xl',
                    'bg-white/75 dark:bg-slate-800/70',
                    'backdrop-blur-md',
                    // Border & shadow
                    'border border-slate-200/80 dark:border-slate-700/60',
                    'shadow-[0_2px_12px_rgba(0,0,0,0.05)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.2)]',
                    // Hover
                    'hover:border-blue-200/70 dark:hover:border-blue-700/50',
                    'hover:shadow-[0_4px_18px_rgba(59,130,246,0.10)]',
                    'hover:bg-white/90 dark:hover:bg-slate-800/90',
                    // Transition
                    'transition-all duration-200 ease-out',
                    // Focus
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
                ].join(' ')}
            >
                {/* Left: text content */}
                <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 leading-none select-none">
                        Sponsored
                    </span>
                    <p className="text-[12.5px] font-semibold text-slate-700 dark:text-slate-200 leading-snug mt-0.5">
                        Reach privacy-conscious users with SafePDF.
                    </p>
                </div>

                {/* Right: CTA */}
                <span
                    aria-label="Learn about becoming a SafePDF sponsor"
                    className={[
                        'shrink-0 flex items-center gap-1',
                        'text-[11px] font-bold',
                        'text-blue-600 dark:text-blue-400',
                        'group-hover:text-blue-700 dark:group-hover:text-blue-300',
                        'whitespace-nowrap',
                        'transition-colors duration-200',
                    ].join(' ')}
                >
                    <span>Become a Sponsor</span>
                    <span
                        aria-hidden="true"
                        className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block"
                    >
                        →
                    </span>
                </span>
            </Link>
        </aside>
    );
};

export default SponsorCard;
