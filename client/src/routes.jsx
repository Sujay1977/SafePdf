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

const Loading = () => <div className="flex items-center justify-center min-h-[50vh]"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;

export const routes = [
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
];
