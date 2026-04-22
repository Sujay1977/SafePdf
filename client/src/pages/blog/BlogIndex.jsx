import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';

const POSTS = [
    {
        slug: 'compress-pdf-without-losing-quality',
        title: 'How to Compress a PDF Without Losing Quality in 2026',
        excerpt: 'Learn the best techniques to reduce PDF file size while preserving text clarity and image quality — all locally in your browser.',
        date: '2026-03-15',
        readingTime: 8,
        category: 'Compression',
        emoji: '📦',
    },
    {
        slug: 'how-to-merge-pdf-online-free',
        title: 'How to Merge PDF Files Online for Free (2026 Guide)',
        excerpt: 'Combine multiple PDF documents into a single file in seconds using free browser-based tools — no uploads, no accounts required.',
        date: '2026-03-10',
        readingTime: 7,
        category: 'Merging',
        emoji: '📄',
    },
    {
        slug: 'how-to-split-pdf-online-free',
        title: 'How to Split a PDF Online Free — Extract Pages Easily',
        excerpt: 'Extract any pages from a large PDF in seconds. Learn how to split PDFs safely and privately using browser-based processing.',
        date: '2026-03-18',
        readingTime: 8,
        category: 'Splitting',
        emoji: '✂️',
    },
    {
        slug: 'pdf-to-word-converter-online-free',
        title: 'PDF to Word Converter Online Free — Full Guide 2026',
        excerpt: 'Convert any PDF to an editable Word document free in your browser. Preserve formatting and keep your document completely private.',
        date: '2026-03-16',
        readingTime: 8,
        category: 'Conversion',
        emoji: '📝',
    },
    {
        slug: 'jpg-to-pdf-converter-free',
        title: 'JPG to PDF Converter Free | Combine Images into PDF',
        excerpt: 'Turn JPG images and photos into professional PDF documents online. Combine multiple images into one multi-page PDF instantly.',
        date: '2026-03-14',
        readingTime: 7,
        category: 'Conversion',
        emoji: '🖼️',
    },
    {
        slug: 'pdf-to-jpg-converter-online',
        title: 'PDF to JPG Converter Online Free | Extract PDF Pages as Images',
        excerpt: 'Convert every PDF page to a high-quality JPG image in your browser. Extract single pages or all pages — free, private, no uploads.',
        date: '2026-03-19',
        readingTime: 7,
        category: 'Conversion',
        emoji: '📸',
    },
    {
        slug: 'how-to-edit-pdf-online-free',
        title: 'How to Edit PDF Online Free Without Adobe',
        excerpt: 'Add text, annotations, and drawings to any PDF in your browser. No software installation, no account, no file upload required.',
        date: '2026-03-12',
        readingTime: 8,
        category: 'Editing',
        emoji: '✏️',
    },
    {
        slug: 'how-to-organize-pdf-pages',
        title: 'How to Organize PDF Pages Online | Reorder & Delete',
        excerpt: 'Reorder, delete, and rearrange PDF pages with simple drag-and-drop. All processing happens in your browser for complete privacy.',
        date: '2026-03-11',
        readingTime: 7,
        category: 'Organization',
        emoji: '🗂️',
    },
    {
        slug: 'how-to-rotate-pdf-pages-online',
        title: 'How to Rotate PDF Pages Online Free | Fix Sideways PDFs',
        excerpt: 'Fix sideways, upside-down, or incorrectly oriented PDF pages in seconds — no software, no upload, works on any device.',
        date: '2026-03-09',
        readingTime: 6,
        category: 'Editing',
        emoji: '🔄',
    },
    {
        slug: 'how-to-unlock-pdf-without-password',
        title: 'How to Unlock a PDF Online Free | Remove PDF Password',
        excerpt: 'Remove PDF password protection and owner restrictions instantly in your browser. Safe, private, and completely free.',
        date: '2026-03-07',
        readingTime: 7,
        category: 'Security',
        emoji: '🔓',
    },
    {
        slug: 'how-to-sign-pdf-online-free',
        title: 'How to Sign a PDF Online Free | SafePDF Signature Tool',
        excerpt: 'Add a legally valid digital signature to any PDF in seconds. Draw, type, or upload your signature — no printing required.',
        date: '2026-03-06',
        readingTime: 8,
        category: 'Signing',
        emoji: '✍️',
    },
    {
        slug: 'how-to-protect-pdf-with-password-securely',
        title: 'How to Protect PDF with a Strong Password Securely',
        excerpt: 'A complete guide to PDF password protection — strong password tips, GDPR compliance, secure sharing, and client-side encryption.',
        date: '2026-03-04',
        readingTime: 8,
        category: 'Security',
        emoji: '🛡️',
    },
    {
        slug: 'is-pdf-compression-safe',
        title: 'Is PDF Compression Safe? What You Need to Know',
        excerpt: 'Understand the privacy risks of online PDF compression and why client-side tools like SafePDF offer a fundamentally safer approach.',
        date: '2026-03-05',
        readingTime: 6,
        category: 'Security',
        emoji: '🔒',
    },
    {
        slug: 'best-free-pdf-tools-2026',
        title: 'Best Free PDF Tools in 2026: The Complete Guide',
        excerpt: 'A comprehensive review of the best free PDF tools available online, covering compression, merging, splitting, conversion, and more.',
        date: '2026-02-28',
        readingTime: 10,
        category: 'Reviews',
        emoji: '⭐',
    },
    {
        slug: 'how-to-protect-pdf-with-password',
        title: 'How to Protect a PDF with a Password (Free & Secure)',
        excerpt: 'Step-by-step guide to adding password protection to any PDF file for free, with tips on choosing strong passwords and encryption standards.',
        date: '2026-02-20',
        readingTime: 7,
        category: 'Security',
        emoji: '🛡️',
    },
];

const blogIndexSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "SafePDF Blog",
    "url": "https://safepdf.site/blog",
    "description": "PDF guides, tutorials, and tips from SafePDF — the free, private, browser-based PDF tool.",
    "publisher": {
        "@type": "Organization",
        "name": "SafePDF",
        "url": "https://safepdf.site"
    }
};

export default function BlogIndex() {
    return (
        <div className="flex flex-col w-full">
            <SEO
                title="PDF Blog — Guides, Tips & Tutorials | SafePDF"
                description="Practical PDF guides and tutorials. Learn how to compress, merge, split, protect, and convert PDFs online for free using SafePDF's browser-based tools."
                url="/blog"
            >
                <script type="application/ld+json">{JSON.stringify(blogIndexSchema)}</script>
            </SEO>

            {/* Hero */}
            <div className="w-full bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 border-b border-slate-200/50 dark:border-slate-800/50 py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                        📖 SafePDF Blog
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight tracking-tight mb-4">
                        PDF Guides & Tutorials
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Practical guides to help you compress, merge, split, protect, and convert PDFs — all for free,
                        all securely in your browser.
                    </p>
                </div>
            </div>

            {/* Posts Grid */}
            <div className="max-w-5xl mx-auto w-full px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {POSTS.map((post) => (
                        <Link
                            key={post.slug}
                            to={`/blog/${post.slug}`}
                            className="group flex flex-col bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                        >
                            <div className="p-6 flex flex-col gap-4 flex-1">
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">{post.emoji}</span>
                                    <span className="px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                                        {post.category}
                                    </span>
                                </div>

                                <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                                    {post.title}
                                </h2>
                                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed flex-1">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                                    <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
                                        <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                        <span>•</span>
                                        <span>{post.readingTime} min read</span>
                                    </div>
                                    <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm group-hover:translate-x-1 transition-transform inline-block">
                                        Read →
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* CTA Banner */}
                <div className="mt-16 p-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-white text-center">
                    <h2 className="text-2xl font-black mb-3">Ready to try the tools?</h2>
                    <p className="text-blue-100 mb-6 text-sm">All SafePDF tools are free, private, and work in your browser.</p>
                    <Link to="/" className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-6 py-3 rounded-xl hover:shadow-lg transition-all">
                        Explore All Tools →
                    </Link>
                </div>
            </div>
        </div>
    );
}
