import React from 'react';
import { Link } from 'react-router-dom';
import RelatedTools from '../RelatedTools';

export const mergeFaqs = [
    {
        q: 'How do I merge PDF files online for free?',
        a: "Upload your PDF files to SafePDF, arrange them in your desired order by dragging and dropping, then click 'Merge PDF'. Your merged file downloads instantly."
    },
    {
        q: 'Is there a limit on how many PDFs I can merge?',
        a: "SafePDF does not impose a limit on the number of PDFs you can merge. The only constraint is your browser's available memory."
    },
    {
        q: 'Are my merged PDF files secure?',
        a: "Absolutely. All merging happens inside your browser using client-side JavaScript. Your files are never sent to any server."
    },
    {
        q: 'Can I reorder PDFs before merging?',
        a: "Yes! SafePDF lets you drag and drop PDF thumbnails to reorder them before merging, giving you full control over the final document."
    }
];

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
                    Frequently Asked Questions — Merge PDF
                </h2>
                <div className="space-y-5 mb-12">
                    {mergeFaqs.map(({ q, a }) => (
                        <div key={q} className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">{q}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{a}</p>
                        </div>
                    ))}
                </div>

                <RelatedTools 
                    tools={[
                        { to: '/compress', emoji: '📦', label: 'Compress PDF', desc: 'Reduce PDF file size' },
                        { to: '/split', emoji: '✂️', label: 'Split PDF', desc: 'Extract specific pages' },
                        { to: '/protect', emoji: '🔒', label: 'Protect PDF', desc: 'Password-encrypt a PDF' },
                        { to: '/rotate', emoji: '🔄', label: 'Rotate PDF', desc: 'Rotate pages in a PDF' },
                    ]}
                    blogs={[
                        { to: '/blog/how-to-merge-pdf-online-free', label: 'How to Merge PDF Files Online for Free (Full Guide)' },
                        { to: '/blog/how-to-organize-pdf-pages', label: 'How to Organize PDF Pages After Merging' },
                        { to: '/blog/best-free-pdf-tools-2026', label: 'Best Free PDF Tools in 2026' },
                    ]}
                />

            </div>
        </section>
    );
}
