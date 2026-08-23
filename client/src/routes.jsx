import React, { Suspense, lazy, Component } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';

// ── Chunk load error fallback ────────────────────────────────────────────────
// Shown when a JS chunk fails to fetch in production (MIME error, network etc.)
const ChunkError = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
        <p className="text-xl font-bold text-slate-800 dark:text-white">Failed to load this page.</p>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Please check your connection and&nbsp;
            <button onClick={() => window.location.reload()} className="text-blue-600 underline">reload</button>.
        </p>
    </div>
);

const safeLazy = (importFn) => lazy(() => importFn().catch(() => ({ default: ChunkError })));

// ── Error boundary for render-time errors in lazy pages ──────────────────────
class PageErrorBoundary extends Component {
    constructor(props) { super(props); this.state = { hasError: false }; }
    static getDerivedStateFromError() { return { hasError: true }; }
    componentDidCatch(err) { console.error('Page render error:', err); }
    render() {
        if (this.state.hasError) return <ChunkError />;
        return this.props.children;
    }
}

// Lazy load tool pages to prevent SSG build issues with browser-only dependencies
const Merge = safeLazy(() => import('./pages/Merge'));
const Split = safeLazy(() => import('./pages/Split'));
const Compress = safeLazy(() => import('./pages/Compress'));
const PDFToWord = safeLazy(() => import('./pages/PDFToWord'));
const Protect = safeLazy(() => import('./pages/Protect'));
const Unlock = safeLazy(() => import('./pages/Unlock'));
const Rotate = safeLazy(() => import('./pages/Rotate'));
const Organize = safeLazy(() => import('./pages/Organize'));
const PDFToJPG = safeLazy(() => import('./pages/PDFToJPG'));
const JPGToPDF = safeLazy(() => import('./pages/JPGToPDF'));
const Sign = safeLazy(() => import('./pages/Sign'));

const Edit = safeLazy(() => import('./pages/Edit'));
const CropPDF = safeLazy(() => import('./pages/CropPDF'));
const PDFToZip = safeLazy(() => import('./pages/PDFToZip'));
const AllTools = safeLazy(() => import('./pages/AllTools'));
const Workflows = safeLazy(() => import('./pages/Workflows'));
const Pricing = safeLazy(() => import('./pages/Pricing'));
const Updates = safeLazy(() => import('./pages/Updates'));
const Sponsor = safeLazy(() => import('./pages/Sponsor'));

// Blog pages
const BlogIndex = safeLazy(() => import('./pages/blog/BlogIndex'));
const CompressPDFGuide = safeLazy(() => import('./pages/blog/CompressPDFGuide'));
const MergePDFGuide = safeLazy(() => import('./pages/blog/MergePDFGuide'));
const PDFCompressionSafe = safeLazy(() => import('./pages/blog/PDFCompressionSafe'));
const BestPDFTools = safeLazy(() => import('./pages/blog/BestPDFTools'));
const ProtectPDFGuide = safeLazy(() => import('./pages/blog/ProtectPDFGuide'));
// New blog posts
const SplitPDFGuide = safeLazy(() => import('./pages/blog/SplitPDFGuide'));
const PDFToWordGuide = safeLazy(() => import('./pages/blog/PDFToWordGuide'));
const JPGToPDFGuide = safeLazy(() => import('./pages/blog/JPGToPDFGuide'));
const EditPDFGuide = safeLazy(() => import('./pages/blog/EditPDFGuide'));
const OrganizePDFGuide = safeLazy(() => import('./pages/blog/OrganizePDFGuide'));
const RotatePDFGuide = safeLazy(() => import('./pages/blog/RotatePDFGuide'));
const UnlockPDFGuide = safeLazy(() => import('./pages/blog/UnlockPDFGuide'));
const SignPDFGuide = safeLazy(() => import('./pages/blog/SignPDFGuide'));
const ProtectPDFSecureGuide = safeLazy(() => import('./pages/blog/ProtectPDFSecureGuide'));
const PDFToJPGGuide = safeLazy(() => import('./pages/blog/PDFToJPGGuide'));

const Loading = () => <div className="flex items-center justify-center min-h-[70vh]"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;

// Suspense wrapper with error boundary
const Page = ({ children }) => (
    <PageErrorBoundary>
        <Suspense fallback={<Loading />}>{children}</Suspense>
    </PageErrorBoundary>
);

import App from './App';


export const routes = [
    {
        element: <App />,
        children: [
            { path: '/', element: <Layout><Home /></Layout> },
            { path: '/merge', element: <Layout><Page><Merge /></Page></Layout> },
            { path: '/split', element: <Layout><Page><Split /></Page></Layout> },
            { path: '/compress', element: <Layout><Page><Compress /></Page></Layout> },
            { path: '/pdf-to-word', element: <Layout><Page><PDFToWord /></Page></Layout> },
            { path: '/protect', element: <Layout><Page><Protect /></Page></Layout> },
            { path: '/unlock', element: <Layout><Page><Unlock /></Page></Layout> },
            { path: '/rotate', element: <Layout><Page><Rotate /></Page></Layout> },
            { path: '/organize', element: <Layout><Page><Organize /></Page></Layout> },
            { path: '/pdf-to-jpg', element: <Layout><Page><PDFToJPG /></Page></Layout> },
            { path: '/jpg-to-pdf', element: <Layout><Page><JPGToPDF /></Page></Layout> },
            { path: '/sign', element: <Layout><Page><Sign /></Page></Layout> },
            { path: '/edit', element: <Layout><Page><Edit /></Page></Layout> },
            { path: '/crop-pdf', element: <Layout><Page><CropPDF /></Page></Layout> },
            { path: '/pdf-to-zip', element: <Layout><Page><PDFToZip /></Page></Layout> },

            { path: '/tools', element: <Layout><Page><AllTools /></Page></Layout> },
            { path: '/workflows', element: <Layout><Page><Workflows /></Page></Layout> },
            { path: '/pricing', element: <Layout><Page><Pricing /></Page></Layout> },
            { path: '/updates', element: <Layout><Page><Updates /></Page></Layout> },
            { path: '/sponsor', element: <Layout><Page><Sponsor /></Page></Layout> },

            // Blog routes
            { path: '/blog', element: <Layout><Page><BlogIndex /></Page></Layout> },
            { path: '/blog/compress-pdf-without-losing-quality', element: <Layout><Page><CompressPDFGuide /></Page></Layout> },
            { path: '/blog/how-to-merge-pdf-online-free', element: <Layout><Page><MergePDFGuide /></Page></Layout> },
            { path: '/blog/is-pdf-compression-safe', element: <Layout><Page><PDFCompressionSafe /></Page></Layout> },
            { path: '/blog/best-free-pdf-tools-2026', element: <Layout><Page><BestPDFTools /></Page></Layout> },
            { path: '/blog/how-to-protect-pdf-with-password', element: <Layout><Page><ProtectPDFGuide /></Page></Layout> },
            // New blog posts
            { path: '/blog/how-to-split-pdf-online-free', element: <Layout><Page><SplitPDFGuide /></Page></Layout> },
            { path: '/blog/pdf-to-word-converter-online-free', element: <Layout><Page><PDFToWordGuide /></Page></Layout> },
            { path: '/blog/jpg-to-pdf-converter-free', element: <Layout><Page><JPGToPDFGuide /></Page></Layout> },
            { path: '/blog/how-to-edit-pdf-online-free', element: <Layout><Page><EditPDFGuide /></Page></Layout> },
            { path: '/blog/how-to-organize-pdf-pages', element: <Layout><Page><OrganizePDFGuide /></Page></Layout> },
            { path: '/blog/how-to-rotate-pdf-pages-online', element: <Layout><Page><RotatePDFGuide /></Page></Layout> },
            { path: '/blog/how-to-unlock-pdf-without-password', element: <Layout><Page><UnlockPDFGuide /></Page></Layout> },
            { path: '/blog/how-to-sign-pdf-online-free', element: <Layout><Page><SignPDFGuide /></Page></Layout> },
            { path: '/blog/how-to-protect-pdf-with-password-securely', element: <Layout><Page><ProtectPDFSecureGuide /></Page></Layout> },
            { path: '/blog/pdf-to-jpg-converter-online', element: <Layout><Page><PDFToJPGGuide /></Page></Layout> },
            // Alternate URL alias for unlock post
            { path: '/blog/how-to-unlock-pdf-online-free', element: <Layout><Page><UnlockPDFGuide /></Page></Layout> },
        ]
    }
];
