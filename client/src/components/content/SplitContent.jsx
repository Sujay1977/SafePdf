import React from 'react';
import { Link } from 'react-router-dom';
import RelatedTools from '../RelatedTools';

export const splitFaqs = [
    {
        q: 'How do I split a PDF online for free?',
        a: "Upload your PDF to SafePDF, select the pages you want to extract by clicking on their thumbnails, then click 'Extract Pages'. The new PDF downloads instantly to your device."
    },
    {
        q: 'Can I extract specific pages from a PDF?',
        a: "Yes. SafePDF lets you select any combination of pages from your PDF and extract them into a new document. Just click the page thumbnails to select them."
    },
    {
        q: 'Are my PDF files safe when splitting online?',
        a: "Yes. SafePDF processes PDFs entirely inside your browser. Your files are never uploaded to any server, ensuring complete privacy."
    },
    {
        q: 'Is there a limit on PDF size for splitting?',
        a: "There is no enforced limit. Your browser's available memory determines how large a file you can split, typically 200MB or more."
    }
];

export default function SplitContent() {
    return (
        <section className="w-full max-w-4xl mx-auto px-4 py-16 md:py-24">
            <div className="prose prose-slate dark:prose-invert max-w-none">

                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
                    Split PDF Online Free — Extract Pages from Any PDF Instantly
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                    Need to extract a few pages from a large PDF? <strong>SafePDF's free PDF splitter</strong> lets you{' '}
                    <strong>split a PDF online</strong> by selecting any combination of pages and downloading them as a new document.
                    No uploads, no account, no waiting — your files stay on your device the entire time.
                </p>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    How to Split a PDF Online — Step by Step
                </h2>
                <ol className="space-y-4 mb-8">
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">1</span>
                        <div>
                            <strong className="text-slate-900 dark:text-white">Upload your PDF.</strong>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">Click the upload zone or drag and drop your PDF. SafePDF instantly renders thumbnails of every page so you can see exactly what you're working with.</p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">2</span>
                        <div>
                            <strong className="text-slate-900 dark:text-white">Select the pages you want to extract.</strong>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">Click any page thumbnail to select or deselect it. Use "Select All" to quickly grab every page. The sidebar shows exactly which pages are selected.</p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">3</span>
                        <div>
                            <strong className="text-slate-900 dark:text-white">Click "Extract Pages" and download.</strong>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">SafePDF builds a new PDF containing only your selected pages. The file downloads instantly — no email, no wait, no server.</p>
                        </div>
                    </li>
                </ol>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    Why Split a PDF? Common Use Cases
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    PDF splitting is useful in dozens of everyday situations. Here are the most common reasons people use SafePDF's{' '}
                    <strong>free PDF page extractor</strong>:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                    {[
                        { title: 'Extract Invoice Pages', desc: 'Pull specific invoice pages from a multi-month statement without editing the original file.' },
                        { title: 'Separate a Report', desc: 'Share only the relevant chapters of a long report with different team members.' },
                        { title: 'Extract Form Pages', desc: 'Pull out fillable forms buried in a multi-page government document.' },
                        { title: 'Create Study Guides', desc: 'Extract key pages from a textbook PDF to create focused study materials.' },
                        { title: 'Legal Exhibits', desc: 'Isolate specific pages to use as standalone exhibits in legal proceedings.' },
                        { title: 'Portfolio Samples', desc: 'Extract select work samples from a larger portfolio PDF to send to clients.' },
                    ].map((item) => (
                        <div key={item.title} className="p-4 bg-blue-50 dark:bg-blue-900/15 rounded-xl border border-blue-100 dark:border-blue-900/30">
                            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">{item.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    Split PDF Securely — No Uploads Ever
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    Traditional online PDF tools upload your file to their servers for processing. This creates serious{' '}
                    <strong>privacy and security risks</strong> — especially for confidential documents like medical records, legal files,
                    financial statements, or personal identification documents.
                </p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    SafePDF eliminates that risk entirely. <strong>PDF splitting happens 100% inside your browser</strong> using
                    client-side JavaScript. Your file is read into browser memory, processed, and the output is generated —
                    all without a single byte of your PDF being sent over the network.
                </p>
                <ul className="space-y-2 mb-6 text-slate-600 dark:text-slate-400">
                    <li className="flex items-start gap-2"><span className="text-green-500 font-bold mt-1">✓</span> Zero network traffic for your documents</li>
                    <li className="flex items-start gap-2"><span className="text-green-500 font-bold mt-1">✓</span> No server storage — nothing is saved remotely</li>
                    <li className="flex items-start gap-2"><span className="text-green-500 font-bold mt-1">✓</span> Works with confidential documents safely</li>
                    <li className="flex items-start gap-2"><span className="text-green-500 font-bold mt-1">✓</span> No account or login required</li>
                </ul>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    Frequently Asked Questions — Split PDF
                </h2>
                <div className="space-y-5 mb-12">
                    {splitFaqs.map(({ q, a }) => (
                        <div key={q} className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">{q}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{a}</p>
                        </div>
                    ))}
                </div>

                <RelatedTools 
                    tools={[
                        { to: '/merge', label: 'Merge PDF', desc: 'Combine PDFs into one' },
                        { to: '/compress', label: 'Compress PDF', desc: 'Reduce PDF file size' },
                        { to: '/protect', label: 'Protect PDF', desc: 'Add password encryption' },
                        { to: '/organize', label: 'Organize PDF', desc: 'Reorder & delete pages' },
                    ]}
                    blogs={[
                        { to: '/blog/how-to-split-pdf-online-free', label: 'How to Split a PDF Online Free — Full Guide' },
                        { to: '/blog/how-to-organize-pdf-pages', label: 'How to Organize PDF Pages (Reorder & Delete)' },
                        { to: '/blog/how-to-merge-pdf-online-free', label: 'How to Merge PDF Files Free' },
                    ]}
                />

            </div>
        </section>
    );
}
