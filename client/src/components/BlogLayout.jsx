import { Link } from 'react-router-dom';
import SEO from './SEO';
import { tools as allTools } from '../utils/toolsData';

export default function BlogLayout({
    title,
    seoTitle,
    description,
    deck,
    slug,
    publishDate,
    readingTime,
    wordCount,
    children,
    relatedTools = [],
    category = 'PDF Guide',
    image,
    schemaType = 'Article',
    variant = 'standard'
}) {
    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    };

    const articleImage = image
        ? (image.startsWith('http') ? image : `https://safepdfs.com${image}`)
        : "https://safepdfs.com/og-image.png";

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": schemaType,
        "headline": seoTitle || title,
        "description": description,
        "image": articleImage,
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
            "url": "https://safepdfs.com",
            "logo": {
                "@type": "ImageObject",
                "url": "https://safepdfs.com/logo.png"
            }
        },
        "url": `https://safepdfs.com/blog/${slug}`,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://safepdfs.com/blog/${slug}`
        }
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://safepdfs.com/" },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://safepdfs.com/blog" },
            { "@type": "ListItem", "position": 3, "name": title, "item": `https://safepdfs.com/blog/${slug}` }
        ]
    };

    return (
        <>
            <SEO title={seoTitle || title} description={description} url={`/blog/${slug}`} type="article" image={image}>
                <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
                <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
            </SEO>

            <article className="w-full">
                {/* Hero */}
                {variant === 'editorial' ? (
                    <div className="w-full bg-white dark:bg-background-dark border-b border-slate-200/60 dark:border-slate-800/80 pt-10 sm:pt-14 pb-12 sm:pb-16 px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            {/* Breadcrumb */}
                            <nav className="flex items-center justify-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-6">
                                <Link to="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">Home</Link>
                                <span className="text-slate-300 dark:text-slate-700">/</span>
                                <Link to="/blog" className="hover:text-slate-900 dark:hover:text-white transition-colors">Blog</Link>
                                <span className="text-slate-300 dark:text-slate-700">/</span>
                                <span className="text-slate-700 dark:text-slate-300">{category}</span>
                            </nav>

                            {/* Publication Metadata */}
                            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6 tracking-normal">
                                <time dateTime={publishDate}>{formatDate(publishDate)}</time>
                                <span className="text-slate-300 dark:text-slate-700">&middot;</span>
                                {wordCount && (
                                    <>
                                        <span>{wordCount} words</span>
                                        <span className="text-slate-300 dark:text-slate-700">&middot;</span>
                                    </>
                                )}
                                <span>{readingTime} min read</span>
                            </div>

                            {/* Title */}
                            <h1 className="text-[32px] sm:text-[42px] md:text-[50px] lg:text-[52px] font-bold text-slate-900 dark:text-white tracking-tight leading-[1.08] max-w-[920px] mx-auto [text-wrap:balance]">
                                {title}
                            </h1>

                            {/* Deck */}
                            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-[720px] mx-auto mt-6 mb-8 font-normal [text-wrap:balance]">
                                {deck || description}
                            </p>

                            {/* Author / Editorial identity */}
                            <div className="flex items-center justify-center gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                                <div className="w-5 h-5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-[10px]">
                                    S
                                </div>
                                <span className="font-medium text-slate-900 dark:text-white">Sujay</span>
                                <span className="text-slate-300 dark:text-slate-700">&middot;</span>
                                <span>SafePDF / ShipNLaunch</span>
                                <span className="text-slate-300 dark:text-slate-700">&middot;</span>
                                <span className="text-blue-600 dark:text-blue-400 font-medium">{category}</span>
                            </div>
                        </div>
                    </div>
                ) : (
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
                                <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-semibold uppercase tracking-wide">{category}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Content */}
                <div className={`mx-auto px-4 ${variant === 'editorial' ? 'max-w-[740px] py-12 md:py-16' : 'max-w-3xl py-12'}`}>
                    <div className={variant === 'editorial'
                        ? "editorial-prose text-[18px] sm:text-[19px] leading-[1.8] text-slate-700 dark:text-slate-300 [&>p]:mb-7 [&>ul]:mb-8 [&>ol]:mb-8 [&>h2]:text-[28px] sm:[&>h2]:text-[34px] [&>h2]:font-bold [&>h2]:text-slate-900 dark:[&>h2]:text-white [&>h2]:mt-16 sm:[&>h2]:mt-20 [&>h2]:mb-6 [&>h2]:tracking-tight [&>h2]:leading-tight [&>h3]:text-[22px] sm:[&>h3]:text-[24px] [&>h3]:font-bold [&>h3]:text-slate-900 dark:[&>h3]:text-white [&>h3]:mt-10 [&>h3]:mb-4 [&>h3]:tracking-tight [&>ul]:list-disc [&>ul]:pl-6 [&>ol]:list-decimal [&>ol]:pl-6 [&_li]:mb-3.5 [&_li]:leading-relaxed [&_p_a]:text-blue-600 dark:[&_p_a]:text-blue-400 [&_p_a]:font-medium hover:[&_p_a]:underline [&_li_a]:text-blue-600 dark:[&_li_a]:text-blue-400 [&_li_a]:font-medium hover:[&_li_a]:underline"
                        : "prose prose-slate dark:prose-invert max-w-none prose-headings:font-black prose-h2:text-2xl prose-h3:text-xl prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline"
                    }>
                        {children}
                    </div>

                    {/* Related Tools CTA */}
                    {relatedTools.length > 0 && (
                        <div className="mt-16 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-700">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Related Free Tools</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {relatedTools.map((tool) => {
                                    const matched = allTools.find(t => t.link === tool.to);
                                    const iconName = tool.icon || matched?.icon || 'description';

                                    return (
                                        <Link
                                            key={tool.to}
                                            to={tool.to}
                                            className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-sm transition-all group"
                                        >
                                            <span className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700/60 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/40 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors shrink-0">
                                                <span className="material-symbols-outlined text-base">{iconName}</span>
                                            </span>
                                            <div className="min-w-0 flex-1">
                                                <p className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-sm truncate">{tool.label}</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{tool.desc}</p>
                                            </div>
                                        </Link>
                                    );
                                })}
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
