import React from 'react';
import { Link } from 'react-router-dom';
import RelatedTools from '../RelatedTools';

export const editFaqs = [
    {
        q: 'Is it free to edit PDFs?',
        a: "Yes, SafePDF is completely free to use. There are no limits on the number of PDFs you can edit."
    },
    {
        q: 'Is it safe to edit confidential documents like bank statements?',
        a: "Absolutely. SafePDF processes everything directly within your computer's memory, so no data is uploaded."
    }
];

export default function EditContent() {
    return (
        <section className="w-full max-w-4xl mx-auto px-4 py-16 md:py-24">
            <div className="prose prose-slate dark:prose-invert max-w-none">

                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
                    Edit PDF Online Free — The Ultimate Browser PDF Editor
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                    Discover the easiest way to <strong>edit PDF files online securely</strong>. SafePDF's free PDF editor allows you to add text, annotate, highlight, draw, and modify existing content directly from your browser. What makes it unique? All text extraction and rendering happen on your device, ensuring <strong>100% privacy</strong> for your sensitive documents. No installations, no sign-ups, and no uploads.
                </p>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    How to Edit a PDF Online
                </h2>
                <ol className="space-y-4 mb-8">
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">1</span>
                        <div>
                            <strong className="text-slate-900 dark:text-white">Upload your PDF file.</strong>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">Select the PDF document you want to edit. It loads instantly into our powerful browser-based viewer.</p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">2</span>
                        <div>
                            <strong className="text-slate-900 dark:text-white">Select your editing tools.</strong>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">Use the toolbar to select the text tool, highlighter, shapes, or the content editor. You can change font sizes, colors, and styles seamlessly.</p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">3</span>
                        <div>
                            <strong className="text-slate-900 dark:text-white">Apply edits and download.</strong>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">Once you're satisfied with your changes, click "Apply Edits". Your updated PDF will be generated and saved to your device immediately.</p>
                        </div>
                    </li>
                </ol>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    Powerful PDF Editing Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                    {[
                        { title: 'Add & Modify Text', desc: 'Type directly onto the PDF. Change fonts, sizes, and colors to match your existing document formatting.' },
                        { title: 'Highlight & Annotate', desc: 'Mark up important sections with the highlight tool, draw shapes to call out areas, or use the freehand pen.' },
                        { title: 'Eraser Tool', desc: 'Hide sensitive information or remove mistakes effortlessly with the whiteout/eraser tool.' },
                        { title: 'Completely Client-Side', desc: 'Your document is never uploaded to an external server. Feel safe editing tax forms, invoices, and legal contracts.' },
                    ].map((item) => (
                        <div key={item.title} className="p-4 bg-blue-50 dark:bg-blue-900/15 rounded-xl border border-blue-100 dark:border-blue-900/30">
                            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">{item.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    Frequently Asked Questions — Edit PDF
                </h2>
                <div className="space-y-5">
                    {[
                        {
                            q: 'Is it free to edit PDFs?',
                            a: 'Yes, SafePDF is completely free to use. There are no limits on the number of PDFs you can edit or the number of annotations you can make.'
                        },
                        {
                            q: 'Will my PDF have a watermark after editing?',
                            a: 'No. SafePDF never adds watermarks to your documents. The final PDF will only contain the original content plus the edits you actively made.'
                        },
                        {
                            q: 'Is it safe to edit confidential documents like bank statements?',
                            a: 'Absolutely. Unlike most online PDF editors that upload your files to their servers, SafePDF processes everything directly within your computer\'s memory.'
                        },
                        {
                            q: 'Can I edit existing text in the PDF?',
                            a: 'SafePDF allows you to overlay new text, cover up old text with the eraser tool, and modify the rendered text layer. Advanced paragraph reflowing is limited dynamically by browser capabilities.'
                        },
                    ].map(({ q, a }) => (
                        <div key={q} className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">{q}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{a}</p>
                        </div>
                    ))}
                </div>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    Frequently Asked Questions — Edit PDF
                </h2>
                <div className="space-y-5 mb-12">
                    {editFaqs.map(({ q, a }) => (
                        <div key={q} className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">{q}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{a}</p>
                        </div>
                    ))}
                </div>

                <RelatedTools 
                    tools={[
                        { to: '/sign', emoji: '✍️', label: 'Sign PDF', desc: 'Add signature to PDF' },
                        { to: '/merge', emoji: '📄', label: 'Merge PDF', desc: 'Combine multiple PDFs' },
                        { to: '/pdf-to-word', emoji: '📝', label: 'PDF to Word', desc: 'Convert PDF to Word' },
                        { to: '/protect', emoji: '🔒', label: 'Protect PDF', desc: 'Add password to PDF' },
                    ]}
                    blogs={[
                        { to: '/blog/how-to-edit-pdf-online-free', label: 'How to Edit a PDF Document Online for Free' },
                        { to: '/sign', label: 'Need to add a signature? Try Sign PDF' }
                    ]}
                />

            </div>
        </section>
    );
}
