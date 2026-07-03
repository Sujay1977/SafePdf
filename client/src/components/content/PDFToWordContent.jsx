import React from 'react';
import { Link } from 'react-router-dom';
import RelatedTools from '../RelatedTools';

export const pdfToWordFaqs = [
    {
        q: 'Can it convert scanned PDFs into Word?',
        a: "If the PDF consists solely of scanned images without a readable text layer, it requires OCR. This tool requires a valid text layer in the PDF to function."
    },
    {
        q: 'Is my document uploaded to the cloud?',
        a: "Never. Like all SafePDF tools, the conversion happens locally on your own computer."
    }
];

export default function PDFToWordContent() {
    return (
        <section className="w-full max-w-4xl mx-auto px-4 py-16 md:py-24">
            <div className="prose prose-slate dark:prose-invert max-w-none">

                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
                    Convert PDF to Word Online Free — Simple & Private
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                    Need to edit the text inside a PDF but don't have the original document? SafePDF's <strong>PDF to Word</strong> converter allows you to quickly transform your PDF into an editable text document. Our lightweight extraction tool runs entirely in your web browser, ensuring that your confidential documents are never exposed to external servers. No hidden fees, no limits.
                </p>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    How to Convert a PDF to Word in 3 Steps
                </h2>
                <ol className="space-y-4 mb-8">
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">1</span>
                        <div>
                            <strong className="text-slate-900 dark:text-white">Upload your PDF.</strong>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">Select the PDF document you want to convert. The file is instantly read by our secure local processing engine.</p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">2</span>
                        <div>
                            <strong className="text-slate-900 dark:text-white">Start the conversion.</strong>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">Click the "Convert to Doc" button. SafePDF scans the file and extracts all available text layers into a continuous document.</p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">3</span>
                        <div>
                            <strong className="text-slate-900 dark:text-white">Download your Word file.</strong>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">Once generated, click to save the newly created .doc file to your device. You can immediately open it in Microsoft Word, Google Docs, or Pages to start editing.</p>
                        </div>
                    </li>
                </ol>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    Why Use Our PDF to Word Tool?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                    {[
                        { title: 'Offline-Grade Privacy', desc: 'Operating purely through client-side scripting, your sensitive corporate or personal data is strictly confined to your screen.' },
                        { title: 'Lightning Fast', desc: 'No upload speeds to worry about. The extraction process is remarkably fast, even for large, text-heavy books.' },
                        { title: 'Always Free', desc: 'Many PDF to Word tools limit you to two pages for free. We place absolutely no limits on how much text you can extract.' },
                        { title: 'Universal .doc Format', desc: 'The resulting file uses standard document formatting that works seamlessly across all major word processors.' },
                    ].map((item) => (
                        <div key={item.title} className="p-4 bg-blue-50 dark:bg-blue-900/15 rounded-xl border border-blue-100 dark:border-blue-900/30">
                            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">{item.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    Frequently Asked Questions — PDF to Word
                </h2>
                <div className="space-y-5">
                    {[
                        {
                            q: 'Does this tool preserve exact layouts, columns, and images?',
                            a: 'This specific utility focuses on high-speed text extraction for quick editing. Complex formatting, embedded images, and columns are stripped away to provide pure, editable text in a document format.'
                        },
                        {
                            q: 'Can it convert scanned PDFs into Word?',
                            a: 'If the PDF consists solely of scanned images without a readable text layer, it requires OCR (Optical Character Recognition) to extract the words. This tool requires a valid text layer in the PDF to function.'
                        },
                        {
                            q: 'Is my document uploaded to the cloud?',
                            a: 'Never. Like all SafePDF tools, the conversion happens locally on your own computer or mobile device.'
                        },
                    ].map(({ q, a }) => (
                        <div key={q} className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">{q}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{a}</p>
                        </div>
                    ))}
                </div>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    Frequently Asked Questions — PDF to Word
                </h2>
                <div className="space-y-5 mb-12">
                    {pdfToWordFaqs.map(({ q, a }) => (
                        <div key={q} className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">{q}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{a}</p>
                        </div>
                    ))}
                </div>

                <RelatedTools 
                    tools={[
                        { to: '/edit-pdf', emoji: '✏️', label: 'Edit PDF', desc: 'Add text and edit PDF' },
                        { to: '/sign', emoji: '✍️', label: 'Sign PDF', desc: 'Add signature to PDF' },
                        { to: '/merge', emoji: '📄', label: 'Merge PDF', desc: 'Combine multiple PDFs' },
                        { to: '/compress', emoji: '📦', label: 'Compress PDF', desc: 'Reduce PDF file size' },
                    ]}
                    blogs={[
                        { to: '/edit-pdf', label: 'Looking to edit without converting? Try Edit PDF' },
                        { to: '/pdf-to-jpg', label: 'Need the pages as pictures instead? Try PDF to JPG' }
                    ]}
                />

            </div>
        </section>
    );
}
