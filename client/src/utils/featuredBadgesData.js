/**
 * Directory and publication badges where SafePDF has been officially featured.
 * 
 * BADGE MANAGEMENT GUIDELINES:
 * 1. Only genuine features/mentions should be added.
 * 2. Each badge should point to the official directory/publication page.
 * 3. The image should be the official badge supplied by that site.
 * 4. Do not add badges for sites where SafePDF has not actually been featured.
 * 5. Do not use the section for paid advertising unless explicitly intended.
 * 
 * To add a new badge in the future, append a new object to FEATURED_BADGES:
 * {
 *   name: "Example Directory",
 *   href: "https://example.com",
 *   image: "https://example.com/badge.svg",
 *   alt: "Featured on Example Directory",
 *   width: 200,   // Optional explicit intrinsic width (default: 200)
 *   height: 54,   // Optional explicit intrinsic height (default: 54)
 * }
 */

export const FEATURED_BADGES = [
    {
        name: "Wired Business",
        href: "https://wired.business",
        image: "https://wired.business/badge0-light.svg",
        alt: "Featured on Wired Business",
        width: 200,
        height: 54,
    },
];
