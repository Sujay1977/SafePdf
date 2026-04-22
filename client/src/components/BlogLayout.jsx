import React from 'react';
import { Link } from 'react-router-dom';
import SEO from './SEO';

export default function BlogLayout({ 
    title, 
    description, 
    slug, 
    publishDate, 
    readingTime, 
    children,
    relatedTools = []
}) {
    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', { 
            year: 'numeric', month: 'long', day: 'numeric' 
        });
    };

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": description,
        "datePublished": publishDate,
        "dateModified": publishDate,
        "author": {
            "@type": "Person",
            "name": "Sujay",
            "url": "https://x.com/sujay__raj"
        },
        "publisher": {
            "@type": "Organization",
            "name": "SafePDF",
            "url": "https://safepdf.site",
            "logo": {
                "@type": "ImageObject",
                "url": "https://safepdf.site/logo.png"
            }
        },
        "url": `https://safepdf.site/blog/${slug}`,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://safepdf.site/blog/${slug}`
        }
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://safepdf.site/" },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://safepdf.site/blog" },
            { "@type": "ListItem", "position": 3, "name": title, "item": `https://safepdf.site/blog/${slug}` }
        ]
    };

    return (
        <>
            <SEO title={title} description={description} url={`/blog/${slug}`} type="article">
                <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
                <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
            </SEO>

            <article className="w-full">
                {/* Hero */}
                <div className="w-full bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 border-b border-slate-200/50 dark:border-slate-800/50 py-16 px-4">
                    <div className="max-w-3xl mx-auto">
                        {/* Breadcrumb */}
                        <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
                            <span>/</span>
                            <Link to="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
                            <span>/</span>
                            <span className="text-slate-900 dark:text-white truncate max-w-[200px]">{title}</span>
                        </nav>

                        <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight mb-6">{title}</h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">{description}</p>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
                                {formatDate(publishDate)}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                                {readingTime} min read
                            </span>
                            <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-semibold uppercase tracking-wide">PDF Guide</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-3xl mx-auto px-4 py-12">
                    <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-black prose-h2:text-2xl prose-h3:text-xl prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
                        {children}
                    </div>

                    {/* Related Tools CTA */}
                    {relatedTools.length > 0 && (
                        <div className="mt-16 p-6 bg-blue-50 dark:bg-blue-900/15 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Try These Free Tools</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {relatedTools.map((tool) => (
                                    <Link
                                        key={tool.to}
                                        to={tool.to}
                                        className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:shadow-md transition-all group"
                                    >
                                        <span className="text-2xl">{tool.emoji}</span>
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors text-sm">{tool.label}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{tool.desc}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Back to Blog */}
                    <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
                        <Link to="/blog" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                            ← Back to Blog
                        </Link>
                    </div>
                </div>
            </article>
        </>
    );
}
