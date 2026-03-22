import React from 'react';
import { Link } from 'react-router-dom';

export default function MergeContent() {
    return (
        <section className="w-full max-w-4xl mx-auto px-4 py-16 md:py-24">
            <div className="prose prose-slate dark:prose-invert max-w-none">

                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
                    Merge PDF Files Online Free — Combine PDFs Instantly in Your Browser
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                    Need to <strong>combine multiple PDF files into one document</strong>? SafePDF's free PDF merger lets you{' '}
                    <strong>merge PDF files online</strong> in seconds — no sign-up, no installs, no uploads. Whether you're combining reports,
                    contracts, invoices, or lecture slides, SafePDF handles it all securely inside your browser.
                </p>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    How to Merge PDF Files Online in 3 Steps
                </h2>
                <ol className="space-y-4 mb-8">
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">1</span>
                        <div>
                            <strong className="text-slate-900 dark:text-white">Upload your PDF files.</strong>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">Click the upload area or drag and drop multiple PDFs at once. You can add as many files as you need — SafePDF generates thumbnail previews for each page.</p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">2</span>
                        <div>
                            <strong className="text-slate-900 dark:text-white">Arrange the files in your preferred order.</strong>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">Drag and drop the PDF cards to reorder them. The final merged document will follow the order you set.</p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">3</span>
                        <div>
                            <strong className="text-slate-900 dark:text-white">Click "Merge PDF" and download.</strong>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">SafePDF combines all your PDFs into a single document. Click the download button and your merged PDF is saved to your device — instantly.</p>
                        </div>
                    </li>
                </ol>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    Why Use SafePDF to Merge PDF Files?
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    Merging PDFs is one of the most common document tasks, and most tools make it harder than it should be.
                    SafePDF is designed to be the <strong>fastest, most private free PDF merger</strong> available online.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                    {[
                        { title: 'No Upload Required', desc: 'Processing happens entirely in your browser. Your sensitive documents never touch a server.' },
                        { title: 'Merge Unlimited PDFs', desc: 'There is no cap on the number of files. Add as many PDFs as you need in a single session.' },
                        { title: 'Drag-to-Reorder', desc: "Instantly reorder PDF documents with drag-and-drop. Your merged file follows the exact order you set." },
                        { title: 'Free Forever', desc: 'No subscriptions, no watermarks, no hidden limits. SafePDF\'s merger is permanently free.' },
                    ].map((item) => (
                        <div key={item.title} className="p-4 bg-blue-50 dark:bg-blue-900/15 rounded-xl border border-blue-100 dark:border-blue-900/30">
                            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">{item.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    100% Private — Client-Side PDF Merging
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    When you <strong>combine PDF files</strong> using SafePDF, none of your files are transmitted over the internet.
                    The merging process uses <a href="https://pdf-lib.js.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">pdf-lib</a>,
                    a powerful open-source JavaScript library running entirely inside your browser tab.
                </p>
                <ul className="space-y-2 mb-6 text-slate-600 dark:text-slate-400">
                    <li className="flex items-start gap-2"><span className="text-green-500 font-bold mt-1">✓</span> No server uploads — zero network traffic for your documents</li>
                    <li className="flex items-start gap-2"><span className="text-green-500 font-bold mt-1">✓</span> No account required — merge without signing up</li>
                    <li className="flex items-start gap-2"><span className="text-green-500 font-bold mt-1">✓</span> No watermarks on the merged output</li>
                    <li className="flex items-start gap-2"><span className="text-green-500 font-bold mt-1">✓</span> GDPR-compliant — no personal data collected</li>
                </ul>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    Common Use Cases for Merging PDFs
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {[
                        { title: 'Business Reports', desc: 'Combine financial statements, executive summaries, and appendices into a single professional report.' },
                        { title: 'Legal Documents', desc: 'Merge contracts, amendments, and supporting exhibits into one organized document package.' },
                        { title: 'Academic Work', desc: 'Combine research chapters, bibliography, and figures into a single thesis or assignment submission.' },
                    ].map((item) => (
                        <div key={item.title} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                            <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">{item.title}</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    More PDF Tools From SafePDF
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                    {[
                        { to: '/compress', label: '📦 Compress PDF', desc: 'Reduce PDF file size' },
                        { to: '/split', label: '✂️ Split PDF', desc: 'Extract specific pages' },
                        { to: '/protect', label: '🔒 Protect PDF', desc: 'Password-encrypt a PDF' },
                        { to: '/rotate', label: '🔄 Rotate PDF', desc: 'Rotate pages in a PDF' },
                    ].map((tool) => (
                        <Link
                            key={tool.to}
                            to={tool.to}
                            className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:shadow-md transition-all group"
                        >
                            <p className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">{tool.label}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{tool.desc}</p>
                        </Link>
                    ))}
                </div>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    Frequently Asked Questions — Merge PDF
                </h2>
                <div className="space-y-5">
                    {[
                        {
                            q: 'How can I merge PDF files online for free?',
                            a: 'Go to safepdf.site/merge, upload your PDF files, drag to arrange them in the order you want, and click Merge PDF. The combined file downloads instantly — free, no account required.'
                        },
                        {
                            q: 'How many PDFs can I merge at once?',
                            a: 'SafePDF has no preset limit on the number of PDFs you can merge. You can combine as many files as your browser memory allows — typically dozens or more.'
                        },
                        {
                            q: 'Will the quality of my PDFs be reduced after merging?',
                            a: 'No. SafePDF merges PDFs without recompressing or altering any content. Text, images, and formatting are preserved exactly as they appear in the originals.'
                        },
                        {
                            q: 'Can I merge password-protected PDFs?',
                            a: 'Password-protected PDFs need to be unlocked first. Use the SafePDF Unlock PDF tool to remove the password, then merge them.'
                        },
                        {
                            q: 'Is the PDF merger free to use?',
                            a: 'Yes, completely free. No file limits, no watermarks, no subscription required. SafePDF is built to be permanently free for everyone.'
                        },
                        {
                            q: 'Is it safe to merge confidential PDFs online?',
                            a: 'With SafePDF yes — your PDF documents are merged entirely inside your browser. No data is uploaded to any server. Your files never leave your device.'
                        },
                        {
                            q: 'Can I reorder pages after merging PDFs?',
                            a: 'Yes. After merging, use SafePDF\'s Organize PDF tool to reorder, delete, or duplicate individual pages in the combined document.'
                        },
                    ].map(({ q, a }) => (
                        <div key={q} className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">{q}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{a}</p>
                        </div>
                    ))}
                </div>

                {/* Related Guides */}
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    Related Guides
                </h2>
                <div className="flex flex-col gap-3 mb-8">
                    {[
                        { to: '/blog/how-to-merge-pdf-online-free', label: 'How to Merge PDF Files Online for Free (Full Guide)' },
                        { to: '/blog/how-to-organize-pdf-pages', label: 'How to Organize PDF Pages After Merging' },
                        { to: '/blog/best-free-pdf-tools-2026', label: 'Best Free PDF Tools in 2026' },
                    ].map((b) => (
                        <Link key={b.to} to={b.to} className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                            <span>→</span><span>{b.label}</span>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}
