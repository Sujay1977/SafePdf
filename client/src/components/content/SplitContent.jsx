import React from 'react';
import { Link } from 'react-router-dom';

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
                    Explore More SafePDF Tools
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                    {[
                        { to: '/merge', label: '📄 Merge PDF', desc: 'Combine PDFs into one' },
                        { to: '/compress', label: '📦 Compress PDF', desc: 'Reduce PDF file size' },
                        { to: '/protect', label: '🔒 Protect PDF', desc: 'Add password encryption' },
                        { to: '/organize', label: '🗂️ Organize PDF', desc: 'Reorder & delete pages' },
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
                    FAQ — Splitting PDFs Online
                </h2>
                <div className="space-y-5">
                    {[
                        {
                            q: 'How do I split a PDF online for free?',
                            a: 'Go to safepdf.site/split, upload your PDF, select the pages you want to extract by clicking their thumbnails, then click Extract Pages. Your new PDF downloads instantly — no account, no uploads to servers.'
                        },
                        {
                            q: 'How do I split a PDF into individual pages?',
                            a: 'Upload your PDF to SafePDF, click "Select All" to select every page, then click "Extract Pages". SafePDF will create a new PDF with all the pages in the same order. Alternatively, select specific pages to extract only those.'
                        },
                        {
                            q: 'Can I extract non-consecutive pages from a PDF?',
                            a: 'Yes. Click on any individual page thumbnails to select them regardless of order. SafePDF will extract exactly the pages you select.'
                        },
                        {
                            q: 'Is there a page limit for PDF splitting?',
                            a: 'No. SafePDF can display and process PDFs with any number of pages. Very large PDFs may take a moment to load their thumbnails, but the extraction works for the full document.'
                        },
                        {
                            q: 'Will splitting a PDF reduce its quality?',
                            a: 'No. SafePDF extracts pages without recompressing or modifying the content. The extracted pages are identical in quality to the original.'
                        },
                        {
                            q: 'Is it safe to split a PDF with confidential information?',
                            a: 'Yes. SafePDF splits PDFs entirely in your browser — your file is never uploaded to any server. It works safely for medical records, legal documents, financial statements, and other sensitive files.'
                        },
                        {
                            q: 'Can I split a PDF on my phone?',
                            a: 'Yes. SafePDF works in mobile browsers on iPhone (Safari) and Android (Chrome). Upload, select pages, and download the split PDF entirely from your phone — no app installation needed.'
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
                        { to: '/blog/how-to-split-pdf-online-free', label: 'How to Split a PDF Online Free — Full Guide' },
                        { to: '/blog/how-to-organize-pdf-pages', label: 'How to Organize PDF Pages (Reorder & Delete)' },
                        { to: '/blog/how-to-merge-pdf-online-free', label: 'How to Merge PDF Files Free' },
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
