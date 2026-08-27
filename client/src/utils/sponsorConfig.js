/**
 * Central sponsorship placement configuration for SafePDF.
 * 
 * SponsorCard appears on ONLY 7 page types:
 * 1. Homepage: '/'
 * 2. Blog: '/blog'
 * 3. Merge PDF: '/merge'
 * 4. Compress PDF: '/compress'
 * 5. Split PDF: '/split'
 * 6. PDF to Word: '/pdf-to-word'
 * 7. Edit PDF: '/edit'
 * 
 * All other 14 PDF tool pages and directory pages must NOT render SponsorCard.
 */

export const SPONSOR_PAGES = [
    '/',
    '/blog',
    '/merge',
    '/compress',
    '/split',
    '/pdf-to-word',
    '/edit'
];

/**
 * Checks if a given pathname qualifies for sponsor placement.
 * Uses exact match (ignoring trailing slash) to avoid brittle substring matching.
 * 
 * @param {string} pathname 
 * @returns {boolean}
 */
export const isSponsorPage = (pathname) => {
    if (!pathname) return false;
    const normalized = pathname.length > 1 && pathname.endsWith('/')
        ? pathname.slice(0, -1)
        : pathname;
    return SPONSOR_PAGES.includes(normalized);
};
