import React from 'react';
import { Link } from 'react-router-dom';
import RelatedTools from '../RelatedTools';

export const jpgToPdfFaqs = [
    {
        q: 'Can I combine multiple JPG files into one PDF?',
        a: "Yes! You can upload multiple images simultaneously. SafePDF will place each image onto its own page."
    },
    {
        q: 'Are my photos uploaded to the internet?',
        a: "No. SafePDF works entirely offline inside your web browser. Your private photos never leave your computer."
    }
];

export default function JPGToPDFContent() {
    return (
        <section className="w-full max-w-4xl mx-auto px-4 py-16 md:py-24">
            <div className="prose prose-slate dark:prose-invert max-w-none">

                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
                    Convert JPG to PDF Online Free — Fast & Secure Image Converter
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                    Need to turn photos or scanned images into a professional document? SafePDF's <strong>JPG to PDF</strong> converter allows you to quickly transform your images into a single PDF file. Best of all, image conversion happens directly in your browser ensuring <strong>100% privacy</strong> for your personal photos and documents. No watermarks, no sign-ups, and completely free.
                </p>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    How to Convert Images to PDF in 3 Steps
                </h2>
                <ol className="space-y-4 mb-8">
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">1</span>
                        <div>
                            <strong className="text-slate-900 dark:text-white">Upload your JPG/PNG images.</strong>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">Select one or multiple image files from your computer or drag and drop them into the converter box.</p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">2</span>
                        <div>
                            <strong className="text-slate-900 dark:text-white">Reorder if needed.</strong>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">If you upload multiple images, you can drag and drop them to arrange the final order of pages in your new PDF.</p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">3</span>
                        <div>
                            <strong className="text-slate-900 dark:text-white">Convert and Download.</strong>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">Click "Convert to PDF." SafePDF instantly packages your images into a single, high-quality PDF document ready for download.</p>
                        </div>
                    </li>
                </ol>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    Why Use Our JPG to PDF Tool?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                    {[
                        { title: 'Multiple Formats Supported', desc: 'Although called JPG to PDF, our tool seamlessly supports PNG, JPEG, and WebP images.' },
                        { title: 'Zero Compression Loss', desc: 'Your images are safely embedded into the PDF format without any reduction in quality or resolution.' },
                        { title: 'Total Privacy Guarantee', desc: 'Your photos stay yours. Images are processed locally on your device and are never uploaded to any server.' },
                        { title: 'Fast Image Processing', desc: 'Because the conversion uses client-side JavaScript, it is virtually instantaneous.' },
                    ].map((item) => (
                        <div key={item.title} className="p-4 bg-blue-50 dark:bg-blue-900/15 rounded-xl border border-blue-100 dark:border-blue-900/30">
                            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">{item.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    Frequently Asked Questions — JPG to PDF
                </h2>
                <div className="space-y-5">
                    {[
                        {
                            q: 'Can I combine multiple JPG files into one PDF?',
                            a: 'Yes! You can upload multiple images simultaneously. SafePDF will place each image onto its own page within a single PDF document.'
                        },
                        {
                            q: 'Will my converted PDF have a watermark?',
                            a: 'No. SafePDF never applies watermarks to your documents. The service is entirely free and professional-grade.'
                        },
                        {
                            q: 'Are my photos uploaded to the internet?',
                            a: 'No. SafePDF works entirely offline inside your web browser. Your private photos never leave your computer or phone.'
                        },
                    ].map(({ q, a }) => (
                        <div key={q} className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">{q}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{a}</p>
                        </div>
                    ))}
                </div>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    Frequently Asked Questions — JPG to PDF
                </h2>
                <div className="space-y-5 mb-12">
                    {jpgToPdfFaqs.map(({ q, a }) => (
                        <div key={q} className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">{q}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{a}</p>
                        </div>
                    ))}
                </div>

                <RelatedTools 
                    tools={[
                        { to: '/pdf-to-jpg', emoji: '📸', label: 'PDF to JPG', desc: 'Extract images from PDF' },
                        { to: '/merge', emoji: '📄', label: 'Merge PDF', desc: 'Combine multiple PDFs' },
                        { to: '/compress', emoji: '📦', label: 'Compress PDF', desc: 'Reduce PDF file size' },
                        { to: '/organize', emoji: '🗂️', label: 'Organize PDF', desc: 'Reorder and delete pages' },
                    ]}
                    blogs={[
                        { to: '/blog/how-to-convert-jpg-to-pdf', label: 'How to Convert Images to PDF Formats Like a Pro' },
                        { to: '/pdf-to-word', label: 'Looking to convert a PDF to a Word Document? Try PDF to Word' }
                    ]}
                />

            </div>
        </section>
    );
}
