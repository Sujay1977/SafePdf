import React from 'react';
import { Link } from 'react-router-dom';
import RelatedTools from '../RelatedTools';

export const organizeFaqs = [
    {
        q: 'Does organizing pages change the text or images in my PDF?',
        a: "No. SafePDF extracts and repackages the entire page exactly as it was originally created."
    },
    {
        q: 'Is there a limit to how many pages I can organize?',
        a: "There are no strict limits from SafePDF. The capacity is determined solely by your computer's memory."
    }
];

export default function OrganizeContent() {
    return (
        <section className="w-full max-w-4xl mx-auto px-4 py-16 md:py-24">
            <div className="prose prose-slate dark:prose-invert max-w-none">

                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
                    Organize PDF Pages Online Free — Reorder, Sort, and Delete Pages Securely
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                    Is your PDF out of order, or does it contain pages you no longer need? SafePDF's <strong>Organize PDF</strong> tool makes it incredibly easy to reorder pages using drag-and-drop, delete unwanted pages, and clean up your documents. Best of all, your files are processed entirely in your web browser ensuring <strong>zero data leaks</strong> and ultra-fast performance.
                </p>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    How to Reorder and Clean Up PDF Pages
                </h2>
                <ol className="space-y-4 mb-8">
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">1</span>
                        <div>
                            <strong className="text-slate-900 dark:text-white">Select your PDF file.</strong>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">Upload the document you want to organize. SafePDF instantly splits the file visually into an interactive page grid.</p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">2</span>
                        <div>
                            <strong className="text-slate-900 dark:text-white">Drag and drop to reorder.</strong>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">Click and hold any page thumbnail, then drag it to its new position. Use the trash icon on the corner of a thumbnail to delete specific pages.</p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">3</span>
                        <div>
                            <strong className="text-slate-900 dark:text-white">Save and download.</strong>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">Once you have perfectly arranged your document, click "Save Organized PDF" to download your newly minted file.</p>
                        </div>
                    </li>
                </ol>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    Features of the PDF Organizer Tool
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                    {[
                        { title: 'Interactive Drag & Drop', desc: 'Rearrange your document visually. You see a clear preview of every page instead of working blindly with page numbers.' },
                        { title: 'Delete Unused Pages', desc: 'Got a blank page or a section you don\'t need anymore? Easily tap the delete button to slim down the file.' },
                        { title: 'Total Privacy Guarantee', desc: 'We respect your data. Your files are organized locally on your device without ever touching our servers.' },
                        { title: 'No Watermarks or Subscriptions', desc: 'Our tools are entirely free. You will never be asked to pay, and we will never stick a watermark on your file.' },
                    ].map((item) => (
                        <div key={item.title} className="p-4 bg-blue-50 dark:bg-blue-900/15 rounded-xl border border-blue-100 dark:border-blue-900/30">
                            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">{item.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    Frequently Asked Questions — Organize PDF
                </h2>
                <div className="space-y-5">
                    {[
                        {
                            q: 'Does organizing pages change the text or images in my PDF?',
                            a: 'No. SafePDF extracts and repackages the entire page exactly as it was originally created, preserving all layout, text, and images.'
                        },
                        {
                            q: 'Can I undo a page deletion?',
                            a: 'Since SafePDF works instantly in your browser, if you make a mistake, you can simply refresh the page or cancel and upload the original file again.'
                        },
                        {
                            q: 'Is there a limit to how many pages I can organize?',
                            a: 'There are no strict limits from SafePDF. The capacity is determined solely by your computer or phone\'s available memory capacity.'
                        },
                    ].map(({ q, a }) => (
                        <div key={q} className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">{q}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{a}</p>
                        </div>
                    ))}
                </div>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    Frequently Asked Questions — Organize PDF
                </h2>
                <div className="space-y-5 mb-12">
                    {organizeFaqs.map(({ q, a }) => (
                        <div key={q} className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">{q}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{a}</p>
                        </div>
                    ))}
                </div>

                <RelatedTools 
                    tools={[
                        { to: '/split', emoji: '✂️', label: 'Split PDF', desc: 'Extract pages from PDF' },
                        { to: '/rotate', emoji: '🔄', label: 'Rotate PDF', desc: 'Rotate pages in PDF' },
                        { to: '/merge', emoji: '📄', label: 'Merge PDF', desc: 'Combine multiple PDFs' },
                        { to: '/compress', emoji: '📦', label: 'Compress PDF', desc: 'Reduce PDF file size' },
                    ]}
                    blogs={[
                        { to: '/blog/how-to-organize-pdf-pages', label: 'How to Organize PDF Pages: A Complete Guide' },
                        { to: '/merge', label: 'Need to combine multiple documents? Try Merge PDF' }
                    ]}
                />

            </div>
        </section>
    );
}
