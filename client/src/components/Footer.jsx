import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Zap, Github, ExternalLink } from 'lucide-react';
import ClientOnly from './ClientOnly';

const productLinks = [
    { name: 'All Tools', href: '/tools' },
    { name: 'Workflows', href: '/workflows' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Updates', href: '/updates' },
    { name: 'Sponsor', href: '/sponsor' },
];

const popularTools = [
    { name: 'Merge PDF', href: '/merge' },
    { name: 'Split PDF', href: '/split' },
    { name: 'Compress PDF', href: '/compress' },
    { name: 'PDF to Word', href: '/pdf-to-word' },
    { name: 'Protect PDF', href: '/protect' },
    { name: 'Unlock PDF', href: '/unlock' },
];

const resourceLinks = [
    { name: 'Blog', href: '/blog' },
    { name: 'PDF Privacy Guide', href: '/blog/is-pdf-compression-safe' },
    { name: 'Best PDF Tools', href: '/blog/best-free-pdf-tools-2026' },
    { name: 'Compress Guide', href: '/blog/compress-pdf-without-losing-quality' },
    { name: 'GitHub Repository', href: 'https://github.com/Sujay1977/SafePdf', isExternal: true },
];

const trustItems = [
    {
        icon: ShieldCheck,
        title: 'Privacy-first',
        description: 'Files stay in your browser',
    },
    {
        icon: Lock,
        title: 'Local processing',
        description: "PDFs aren't uploaded for processing",
    },
    {
        icon: Zap,
        title: 'No signup',
        description: 'Start using the tools directly',
    },
];

const Footer = () => {
    return (
        <footer className="w-full bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800 transition-colors mt-auto">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 md:pt-14 md:pb-10">

                {/* 1. Main Columns Grid */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">

                    {/* Brand Column */}
                    <div className="col-span-2 md:col-span-1 lg:col-span-2 flex flex-col items-start">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
                            aria-label="SafePDF Homepage"
                        >
                            <div className="w-8 h-8 rounded-lg bg-blue-600/10 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-200 border border-blue-100 dark:border-blue-900/40">
                                <ClientOnly>
                                    <span className="material-symbols-outlined text-lg leading-none">picture_as_pdf</span>
                                </ClientOnly>
                            </div>
                            <span className="font-bold font-display text-lg tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                SafePDF
                            </span>
                        </Link>
                        <p className="mt-3.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
                            Private PDF tools that work directly in your browser.
                        </p>
                    </div>

                    {/* Product */}
                    <div className="col-span-1">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                            Product
                        </h3>
                        <ul className="mt-3.5 space-y-2.5">
                            {productLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150 inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Popular Tools */}
                    <div className="col-span-1">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                            Popular Tools
                        </h3>
                        <ul className="mt-3.5 space-y-2.5">
                            {popularTools.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150 inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="col-span-2 md:col-span-1 lg:col-span-1">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                            Resources
                        </h3>
                        <ul className="mt-3.5 grid grid-cols-2 md:grid-cols-1 gap-2.5 md:space-y-2.5 md:gap-0">
                            {resourceLinks.map((link) => (
                                <li key={link.name}>
                                    {link.isExternal ? (
                                        <a
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150 inline-flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                                        >
                                            <span>{link.name}</span>
                                            <ExternalLink size={12} className="opacity-70 flex-shrink-0" />
                                        </a>
                                    ) : (
                                        <Link
                                            to={link.href}
                                            className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150 inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                                        >
                                            {link.name}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* 2. Compact Horizontal Trust Strip */}
                <div className="mt-10 pt-8 border-t border-slate-200/80 dark:border-slate-800">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {trustItems.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div key={index} className="flex items-start gap-3">
                                    <div className="flex-shrink-0 mt-0.5 w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-100 dark:border-blue-900/30">
                                        <Icon size={15} strokeWidth={2} />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
                                            {item.title}
                                        </h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* 3. Bottom Bar */}
                <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <p className="text-center sm:text-left">
                        © 2026 SafePDF · Made by{' '}
                        <a
                            href="https://x.com/sujay__raj"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 rounded"
                        >
                            Sujay
                        </a>
                    </p>

                    <div className="flex items-center flex-wrap justify-center gap-5 sm:gap-6">
                        <Link
                            to="/updates"
                            className="hover:text-slate-900 dark:hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 rounded"
                        >
                            Updates
                        </Link>
                        <a
                            href="https://github.com/Sujay1977/SafePdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-slate-900 dark:hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 rounded inline-flex items-center gap-1.5"
                        >
                            <Github size={13} />
                            <span>GitHub</span>
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
