import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FEATURED_BADGES } from '../utils/featuredBadgesData';

export { FEATURED_BADGES };

const FeaturedBadges = ({ badges = FEATURED_BADGES }) => {
    const scrollContainerRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [failedBadges, setFailedBadges] = useState(new Set());

    const handleImageError = (badgeName) => {
        setFailedBadges((prev) => {
            const next = new Set(prev);
            next.add(badgeName);
            return next;
        });
    };

    const visibleBadges = (badges || []).filter((b) => !failedBadges.has(b.name));

    const checkScroll = useCallback(() => {
        const el = scrollContainerRef.current;
        if (!el) return;
        const { scrollLeft, scrollWidth, clientWidth } = el;
        setCanScrollLeft(scrollLeft > 6);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 6);
    }, []);

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, [checkScroll, visibleBadges.length]);

    const scroll = (direction) => {
        const el = scrollContainerRef.current;
        if (!el) return;
        const scrollAmount = Math.max(el.clientWidth * 0.7, 220);
        el.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth',
        });
    };

    if (visibleBadges.length === 0) {
        return null;
    }

    const hasScrollControls = canScrollLeft || canScrollRight;

    return (
        <section
            aria-labelledby="featured-on-heading"
            className="w-full bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800 transition-colors py-10 sm:py-12"
        >
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                <h2
                    id="featured-on-heading"
                    className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-center"
                >
                    Featured on
                </h2>

                <div className="relative mt-5 sm:mt-6 flex items-center justify-center">
                    {/* Left Scroll Button (shown only when content is scrollable) */}
                    {hasScrollControls && (
                        <button
                            type="button"
                            onClick={() => scroll('left')}
                            disabled={!canScrollLeft}
                            aria-label="Scroll featured badges left"
                            className={`hidden md:flex absolute left-0 z-10 p-1.5 rounded-full bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                                canScrollLeft
                                    ? 'hover:text-blue-600 dark:hover:text-blue-400 opacity-100 cursor-pointer'
                                    : 'opacity-0 pointer-events-none'
                            }`}
                        >
                            <ChevronLeft size={16} />
                        </button>
                    )}

                    {/* Scrollable Track */}
                    <div
                        ref={scrollContainerRef}
                        onScroll={checkScroll}
                        className={`flex items-center gap-6 sm:gap-8 overflow-x-auto py-2 px-2 sm:px-4 scroll-smooth w-full max-w-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
                            hasScrollControls ? 'justify-start' : 'justify-center'
                        }`}
                    >
                        {visibleBadges.map((badge) => (
                            <a
                                key={badge.name}
                                href={badge.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center justify-center p-1 sm:p-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 transition-all duration-200 flex-shrink-0"
                                aria-label={`${badge.name} (opens in a new tab)`}
                            >
                                <img
                                    src={badge.image}
                                    alt={badge.alt}
                                    width={badge.width || 200}
                                    height={badge.height || 54}
                                    style={{ aspectRatio: `${badge.width || 200} / ${badge.height || 54}` }}
                                    loading="lazy"
                                    decoding="async"
                                    onError={() => handleImageError(badge.name)}
                                    className="h-10 sm:h-11 md:h-12 w-auto max-w-[200px] object-contain transition-opacity duration-200 group-hover:opacity-95"
                                />
                            </a>
                        ))}
                    </div>

                    {/* Right Scroll Button (shown only when content is scrollable) */}
                    {hasScrollControls && (
                        <button
                            type="button"
                            onClick={() => scroll('right')}
                            disabled={!canScrollRight}
                            aria-label="Scroll featured badges right"
                            className={`hidden md:flex absolute right-0 z-10 p-1.5 rounded-full bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                                canScrollRight
                                    ? 'hover:text-blue-600 dark:hover:text-blue-400 opacity-100 cursor-pointer'
                                    : 'opacity-0 pointer-events-none'
                            }`}
                        >
                            <ChevronRight size={16} />
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default FeaturedBadges;
