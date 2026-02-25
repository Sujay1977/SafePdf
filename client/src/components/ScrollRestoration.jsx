import { useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/**
 * ScrollRestoration — resets scroll to top on PUSH navigations.
 *
 * Why this exists:
 *   React Router v6 does NOT handle scroll restoration for SPAs.
 *   In a traditional MPA, the browser resets scroll on each full page load.
 *   In an SPA, route changes swap components without a page load, so the
 *   browser keeps the current scroll position — meaning users who click
 *   a link from the footer land halfway down the new page.
 *
 * Architecture decisions:
 *
 *   1. useNavigationType — distinguishes PUSH (user clicked a link) from
 *      POP (browser back/forward). We only scroll on PUSH. POP lets the
 *      browser restore its saved scroll position natively.
 *
 *   2. location.hash — if the URL has a hash (#features), we skip
 *      scrolling so the browser can navigate to the anchor element.
 *
 *   3. useLayoutEffect (not useEffect) — fires synchronously after the
 *      DOM mutation but before the browser paints. This prevents the user
 *      from ever seeing the old scroll position flash before the reset,
 *      eliminating layout shift (CLS = 0 for this interaction).
 *      useEffect would fire after paint, causing a visible jump.
 *
 *   4. Instant scroll (not smooth) — smooth scroll on route change causes
 *      a visible animation from footer to top, which feels broken. Instant
 *      is imperceptible and matches native browser behavior.
 *
 *   5. No global listeners — we rely entirely on React Router's hooks,
 *      which are already subscribed to the history stack. Zero overhead.
 *
 * Placement: render inside <App /> alongside <Outlet />.
 * This component renders nothing — it's a side-effect-only hook wrapper.
 */
const ScrollRestoration = () => {
    const { pathname, hash } = useLocation();
    const navigationType = useNavigationType();

    useLayoutEffect(() => {
        // Only reset on forward navigation (user clicked a link)
        // Skip if there's a hash fragment (let browser handle anchor scroll)
        if (navigationType === 'PUSH' && !hash) {
            window.scrollTo(0, 0);
        }
    }, [pathname, hash, navigationType]);

    return null;
};

export default ScrollRestoration;
