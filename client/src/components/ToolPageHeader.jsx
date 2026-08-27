import React from 'react';
import { useLocation } from 'react-router-dom';
import SponsorCard from './SponsorCard';
import { isSponsorPage } from '../utils/sponsorConfig';

/**
 * ToolPageHeader — A reusable header component for SafePDF tool pages.
 * 
 * Features:
 * - Displays the tool title and description.
 * - Conditionally integrates SponsorCard on the 5 approved tool routes.
 * - When sponsored: Uses an asymmetric responsive grid:
 *   - Desktop: Title/description in left 7-8 columns, SponsorCard in right 4-5 columns.
 *   - Mobile: Stacks naturally (Title -> SponsorCard -> Tool).
 * - When unsponsored: Automatically reclaims full width in a clean, balanced centered layout.
 *   Zero empty column, zero reserved sponsor width, zero layout shifts.
 */
export default function ToolPageHeader({ title, description, children, showSponsor }) {
    const location = useLocation();
    const shouldShowSponsor = showSponsor !== undefined ? showSponsor : isSponsorPage(location.pathname);

    if (!shouldShowSponsor) {
        return (
            <div className="w-full max-w-4xl mx-auto mb-8 sm:mb-10 text-center pt-2">
                <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-3 lg:mb-4">
                    {title}
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg font-normal leading-relaxed max-w-2xl mx-auto">
                    {description}
                </p>
                {children}
            </div>
        );
    }

    return (
        <div className="w-full max-w-6xl mx-auto mb-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-16 items-center lg:items-start pt-2">
            
            {/* Main Title & Description (7-8 columns) */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col text-center lg:text-left justify-center order-1">
                <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-3 lg:mb-4">
                    {title}
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                    {description}
                </p>
                {children}
            </div>
            
            {/* SponsorCard (4-5 columns) */}
            <div className="lg:col-span-5 xl:col-span-4 w-full flex justify-center lg:justify-end order-2 mt-4 lg:mt-2">
                <div className="w-full max-w-[360px] lg:max-w-full">
                    <SponsorCard />
                </div>
            </div>
            
        </div>
    );
}
