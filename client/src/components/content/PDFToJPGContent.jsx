import React from 'react';
import { Link } from 'react-router-dom';

export default function PDFToJPGContent() {
    return (
        <section className="w-full max-w-4xl mx-auto px-4 py-16 md:py-24">
            <div className="prose prose-slate dark:prose-invert max-w-none">

                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
                    Convert PDF to JPG Online Free — Extract High-Quality Images
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                    Need to share a document as an image or use a PDF page in a presentation? SafePDF's <strong>PDF to JPG</strong> converter allows you to instantly extract every page of your PDF into high-resolution JPG images. Because the conversion process runs directly inside your browser, your files remain <strong>completely private</strong> and secure from unauthorized access.
                </p>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    How to Convert a PDF to JPG in 3 Steps
                </h2>
                <ol className="space-y-4 mb-8">
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">1</span>
                        <div>
                            <strong className="text-slate-900 dark:text-white">Upload your PDF document.</strong>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">Select the PDF file you wish to turn into images. Our client-side rendering engine will immediately begin processing it.</p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">2</span>
                        <div>
                            <strong className="text-slate-900 dark:text-white">Preview the extracted pages.</strong>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">SafePDF will show you a grid of all available pages as high-quality thumbnails.</p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">3</span>
                        <div>
                            <strong className="text-slate-900 dark:text-white">Download as JPG files.</strong>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">Click the download button to save individual pages as JPG images, or download all pages packaged in a convenient format.</p>
                        </div>
                    </li>
                </ol>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    Why Use Our PDF to JPG Converter?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                    {[
                        { title: 'High-Resolution Extraction', desc: 'Pages are converted to images at high resolutions, ensuring crisp text and sharp visuals.' },
                        { title: 'Completely Secure', desc: 'No uploads! Your confidential PDFs are parsed precisely within your local machine.' },
                        { title: 'Instant Processing', desc: 'Skip the wait times associated with uploading large PDFs and waiting for remote servers to process them.' },
                        { title: 'Download Selected Pages', desc: 'Only need page 3? Download specific pages instead of extracting the entire document.' },
                    ].map((item) => (
                        <div key={item.title} className="p-4 bg-blue-50 dark:bg-blue-900/15 rounded-xl border border-blue-100 dark:border-blue-900/30">
                            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">{item.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    Frequently Asked Questions — PDF to JPG
                </h2>
                <div className="space-y-5">
                    {[
                        {
                            q: 'Will I lose image quality during conversion?',
                            a: 'No. SafePDF generates the JPG images using a high pixel density multiplier to ensure the resulting images look exactly like the original PDF document.'
                        },
                        {
                            q: 'Is it free to convert PDF files to images?',
                            a: 'Yes, absolutely. SafePDF does not have premium tiers, file size limits, or daily usage caps.'
                        },
                        {
                            q: 'Does this tool extract images embedded in the PDF, or does it convert the whole page?',
                            a: 'This tool converts the entire visual page into a single JPG file (rasterization). If you need to extract individual embedded logos or photos from the PDF, you would need an image extractor tool.'
                        },
                    ].map(({ q, a }) => (
                        <div key={q} className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">{q}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{a}</p>
                        </div>
                    ))}
                </div>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    Related Guides
                </h2>
                <div className="flex flex-col gap-3 mb-8">
                    <Link to="/blog/how-to-compress-pdf-for-email" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                        <span>→</span><span>Need the file smaller instead? Try Compress PDF</span>
                    </Link>
                    <Link to="/jpg-to-pdf" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                        <span>→</span><span>Want to go the other way? Try JPG to PDF</span>
                    </Link>
                </div>

            </div>
        </section>
    );
}
