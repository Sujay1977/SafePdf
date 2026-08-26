import React from 'react';
import { Link } from 'react-router-dom';
import RelatedTools from '../RelatedTools';

export const rotateFaqs = [
    {
        q: 'Will rotating my PDF reduce its quality?',
        a: "No. Rotating a PDF file simply alters the orientation metadata of the pages. Quality is retained 100%."
    },
    {
        q: 'Can I rotate just one page instead of the whole document?',
        a: "Yes! SafePDF provides separate rotate buttons under each page thumbnail, allowing individual rotation."
    }
];

export default function RotateContent() {
    return (
        <section className="w-full max-w-4xl mx-auto px-4 py-16 md:py-24">
            <div className="prose prose-slate dark:prose-invert max-w-none">

                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
                    Rotate PDF Pages Online Free — Straighten PDF Documents Securely
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                    Got a scanned document that's upside down? SafePDF's <strong>Rotate PDF</strong> tool allows you to permanently rotate individual PDF pages or entire documents. Our tool is designed for <strong>100% privacy</strong>—all processing happens directly in your web browser. Rotate PDFs left, right, or upside down instantly without worrying about data leaks or long upload times.
                </p>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    How to Rotate PDF Files in 3 Steps
                </h2>
                <ol className="space-y-4 mb-8">
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">1</span>
                        <div>
                            <strong className="text-slate-900 dark:text-white">Upload your file.</strong>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">Select the PDF you need to straighten. Our browser-based PDF reader will instantly generate thumbnails for every page.</p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">2</span>
                        <div>
                            <strong className="text-slate-900 dark:text-white">Rotate pages individually or all at once.</strong>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">Hover over any page thumbnail and click the rotate left or right icons. You can also use the "Rotate All Left/Right" buttons to flip the entire document.</p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">3</span>
                        <div>
                            <strong className="text-slate-900 dark:text-white">Save and download.</strong>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">Click "Save Rotated PDF". Your new, perfectly oriented PDF document will be downloaded to your device immediately.</p>
                        </div>
                    </li>
                </ol>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    Why Use SafePDF to Rotate Pages?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                    {[
                        { title: 'Visual Page Previews', desc: 'See high-quality thumbnails of every page so you know exactly what you are rotating.' },
                        { title: 'Individual Page Control', desc: 'Sometimes a scanner only messes up one page. SafePDF lets you rotate specific pages while leaving the rest intact.' },
                        { title: 'Zero Data Uploads', desc: 'Your PDFs never leave your device. Complete privacy is guaranteed since everything happens in your local browser.' },
                        { title: 'Permanent Rotation', desc: 'Unlike basic PDF readers that only change your view temporarily, SafePDF permanently saves the new rotation orientation inside the file.' },
                    ].map((item) => (
                        <div key={item.title} className="p-4 bg-blue-50 dark:bg-blue-900/15 rounded-xl border border-blue-100 dark:border-blue-900/30">
                            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">{item.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    Frequently Asked Questions — Rotate PDF
                </h2>
                <div className="space-y-5">
                    {[
                        {
                            q: 'Will rotating my PDF reduce its quality?',
                            a: 'No. Rotating a PDF file simply alters the orientation metadata of the pages. The actual visual content is not recompressed or degraded.'
                        },
                        {
                            q: 'Can I rotate just one page instead of the whole document?',
                            a: 'Yes! SafePDF provides separate rotate buttons under each page thumbnail, allowing you to selectively straighten individual pages.'
                        },
                        {
                            q: 'Is the new rotation saved permanently?',
                            a: 'Yes. When you download the file from SafePDF, the new rotation is permanently written into the PDF file structure, so it opens correctly in any reader.'
                        },
                    ].map(({ q, a }) => (
                        <div key={q} className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">{q}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{a}</p>
                        </div>
                    ))}
                </div>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    Frequently Asked Questions — Rotate PDF
                </h2>
                <div className="space-y-5 mb-12">
                    {rotateFaqs.map(({ q, a }) => (
                        <div key={q} className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">{q}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{a}</p>
                        </div>
                    ))}
                </div>

                <RelatedTools 
                    tools={[
                        { to: '/organize', label: 'Organize PDF', desc: 'Reorder and delete pages' },
                        { to: '/split', label: 'Split PDF', desc: 'Extract pages from PDF' },
                        { to: '/merge', label: 'Merge PDF', desc: 'Combine multiple PDFs' },
                        { to: '/compress', label: 'Compress PDF', desc: 'Reduce PDF file size' },
                    ]}
                    blogs={[
                        { to: '/blog/how-to-rotate-pdf-pages', label: 'How to Permanently Rotate PDF Pages' },
                        { to: '/organize', label: 'Need to delete or reorder pages? Try Organize PDF' }
                    ]}
                />

            </div>
        </section>
    );
}
