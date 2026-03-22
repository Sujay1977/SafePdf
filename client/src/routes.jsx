import React, { Suspense, lazy } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';

// Lazy load tool pages to prevent SSG build issues with browser-only dependencies
const Merge = lazy(() => import('./pages/Merge'));
const Split = lazy(() => import('./pages/Split'));
const Compress = lazy(() => import('./pages/Compress'));
const PDFToWord = lazy(() => import('./pages/PDFToWord'));
const Protect = lazy(() => import('./pages/Protect'));
const Unlock = lazy(() => import('./pages/Unlock'));
const Rotate = lazy(() => import('./pages/Rotate'));
const Organize = lazy(() => import('./pages/Organize'));
const PDFToJPG = lazy(() => import('./pages/PDFToJPG'));
const JPGToPDF = lazy(() => import('./pages/JPGToPDF'));
const Sign = lazy(() => import('./pages/Sign'));

const Edit = lazy(() => import('./pages/Edit'));
const AllTools = lazy(() => import('./pages/AllTools'));
const Workflows = lazy(() => import('./pages/Workflows'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Updates = lazy(() => import('./pages/Updates'));

// Blog pages
const BlogIndex = lazy(() => import('./pages/blog/BlogIndex'));
const CompressPDFGuide = lazy(() => import('./pages/blog/CompressPDFGuide'));
const MergePDFGuide = lazy(() => import('./pages/blog/MergePDFGuide'));
const PDFCompressionSafe = lazy(() => import('./pages/blog/PDFCompressionSafe'));
const BestPDFTools = lazy(() => import('./pages/blog/BestPDFTools'));
const ProtectPDFGuide = lazy(() => import('./pages/blog/ProtectPDFGuide'));
// New blog posts
const SplitPDFGuide = lazy(() => import('./pages/blog/SplitPDFGuide'));
const PDFToWordGuide = lazy(() => import('./pages/blog/PDFToWordGuide'));
const JPGToPDFGuide = lazy(() => import('./pages/blog/JPGToPDFGuide'));
const EditPDFGuide = lazy(() => import('./pages/blog/EditPDFGuide'));
const OrganizePDFGuide = lazy(() => import('./pages/blog/OrganizePDFGuide'));
const RotatePDFGuide = lazy(() => import('./pages/blog/RotatePDFGuide'));
const UnlockPDFGuide = lazy(() => import('./pages/blog/UnlockPDFGuide'));
const SignPDFGuide = lazy(() => import('./pages/blog/SignPDFGuide'));
const ProtectPDFSecureGuide = lazy(() => import('./pages/blog/ProtectPDFSecureGuide'));
const PDFToJPGGuide = lazy(() => import('./pages/blog/PDFToJPGGuide'));

const Loading = () => <div className="flex items-center justify-center min-h-[50vh]"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;

import App from './App';

export const routes = [
    {
        element: <App />,
        children: [
            { path: '/', element: <Layout><Home /></Layout> },
            { path: '/merge', element: <Layout><Suspense fallback={<Loading />}><Merge /></Suspense></Layout> },
            { path: '/split', element: <Layout><Suspense fallback={<Loading />}><Split /></Suspense></Layout> },
            { path: '/compress', element: <Layout><Suspense fallback={<Loading />}><Compress /></Suspense></Layout> },
            { path: '/pdf-to-word', element: <Layout><Suspense fallback={<Loading />}><PDFToWord /></Suspense></Layout> },
            { path: '/protect', element: <Layout><Suspense fallback={<Loading />}><Protect /></Suspense></Layout> },
            { path: '/unlock', element: <Layout><Suspense fallback={<Loading />}><Unlock /></Suspense></Layout> },
            { path: '/rotate', element: <Layout><Suspense fallback={<Loading />}><Rotate /></Suspense></Layout> },
            { path: '/organize', element: <Layout><Suspense fallback={<Loading />}><Organize /></Suspense></Layout> },
            { path: '/pdf-to-jpg', element: <Layout><Suspense fallback={<Loading />}><PDFToJPG /></Suspense></Layout> },
            { path: '/jpg-to-pdf', element: <Layout><Suspense fallback={<Loading />}><JPGToPDF /></Suspense></Layout> },
            { path: '/sign', element: <Layout><Suspense fallback={<Loading />}><Sign /></Suspense></Layout> },
            { path: '/edit', element: <Layout><Suspense fallback={<Loading />}><Edit /></Suspense></Layout> },

            { path: '/tools', element: <Layout><Suspense fallback={<Loading />}><AllTools /></Suspense></Layout> },
            { path: '/workflows', element: <Layout><Suspense fallback={<Loading />}><Workflows /></Suspense></Layout> },
            { path: '/pricing', element: <Layout><Suspense fallback={<Loading />}><Pricing /></Suspense></Layout> },
            { path: '/updates', element: <Layout><Suspense fallback={<Loading />}><Updates /></Suspense></Layout> },

            // Blog routes
            { path: '/blog', element: <Layout><Suspense fallback={<Loading />}><BlogIndex /></Suspense></Layout> },
            { path: '/blog/compress-pdf-without-losing-quality', element: <Layout><Suspense fallback={<Loading />}><CompressPDFGuide /></Suspense></Layout> },
            { path: '/blog/how-to-merge-pdf-online-free', element: <Layout><Suspense fallback={<Loading />}><MergePDFGuide /></Suspense></Layout> },
            { path: '/blog/is-pdf-compression-safe', element: <Layout><Suspense fallback={<Loading />}><PDFCompressionSafe /></Suspense></Layout> },
            { path: '/blog/best-free-pdf-tools-2026', element: <Layout><Suspense fallback={<Loading />}><BestPDFTools /></Suspense></Layout> },
            { path: '/blog/how-to-protect-pdf-with-password', element: <Layout><Suspense fallback={<Loading />}><ProtectPDFGuide /></Suspense></Layout> },
            // New blog posts
            { path: '/blog/how-to-split-pdf-online-free', element: <Layout><Suspense fallback={<Loading />}><SplitPDFGuide /></Suspense></Layout> },
            { path: '/blog/pdf-to-word-converter-online-free', element: <Layout><Suspense fallback={<Loading />}><PDFToWordGuide /></Suspense></Layout> },
            { path: '/blog/jpg-to-pdf-converter-free', element: <Layout><Suspense fallback={<Loading />}><JPGToPDFGuide /></Suspense></Layout> },
            { path: '/blog/how-to-edit-pdf-online-free', element: <Layout><Suspense fallback={<Loading />}><EditPDFGuide /></Suspense></Layout> },
            { path: '/blog/how-to-organize-pdf-pages', element: <Layout><Suspense fallback={<Loading />}><OrganizePDFGuide /></Suspense></Layout> },
            { path: '/blog/how-to-rotate-pdf-pages-online', element: <Layout><Suspense fallback={<Loading />}><RotatePDFGuide /></Suspense></Layout> },
            { path: '/blog/how-to-unlock-pdf-without-password', element: <Layout><Suspense fallback={<Loading />}><UnlockPDFGuide /></Suspense></Layout> },
            { path: '/blog/how-to-sign-pdf-online-free', element: <Layout><Suspense fallback={<Loading />}><SignPDFGuide /></Suspense></Layout> },
            { path: '/blog/how-to-protect-pdf-with-password-securely', element: <Layout><Suspense fallback={<Loading />}><ProtectPDFSecureGuide /></Suspense></Layout> },
            { path: '/blog/pdf-to-jpg-converter-online', element: <Layout><Suspense fallback={<Loading />}><PDFToJPGGuide /></Suspense></Layout> },
            // Alternate URL alias for unlock post
            { path: '/blog/how-to-unlock-pdf-online-free', element: <Layout><Suspense fallback={<Loading />}><UnlockPDFGuide /></Suspense></Layout> },
        ]
    }
];
