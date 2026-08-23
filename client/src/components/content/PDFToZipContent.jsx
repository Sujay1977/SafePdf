import React from "react";
import { Link } from "react-router-dom";
import RelatedTools from "../RelatedTools";

export const pdfToZipFaqs = [
    {
        q: "Is the PDF to ZIP tool free?",
        a: "Yes. SafePDF's PDF to ZIP converter is 100% free with no file limits, no watermarks, no account registration, and no payment required."
    },
    {
        q: "Are my PDF files uploaded to a server when creating a ZIP archive?",
        a: "No. The ZIP file is generated entirely on your device using client-side JavaScript (JSZip). Your files never leave your computer or mobile browser."
    },
    {
        q: "Does creating a ZIP alter or re-compress the PDF files?",
        a: "No. Each PDF file is preserved byte-for-byte in its original form. The PDF content, text, vectors, images, and digital signatures remain completely unmodified."
    },
    {
        q: "How does the tool handle duplicate file names?",
        a: "If multiple selected files have identical names, SafePDF automatically renames subsequent files with deterministic numeric suffixes like report (2).pdf, report (3).pdf to ensure no files overwrite each other inside the archive."
    },
    {
        q: "How many PDF files can I compress into a ZIP at once?",
        a: "You can archive dozens or even hundreds of PDF files simultaneously. The only constraint is your browser's available memory."
    },
    {
        q: "Can I customize the name of the downloaded ZIP file?",
        a: "Yes. You can enter any custom name for your ZIP archive before downloading, or use the default filename."
    }
];

export default function PDFToZipContent() {
    return (
        <section className="w-full max-w-4xl mx-auto px-4 py-16 md:py-24">
            <div className="prose prose-slate dark:prose-invert max-w-none">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
                    PDF to ZIP Online Free — Bundle Multiple PDFs Into a Single Archive
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                    Need to bundle multiple PDF documents into a single compressed ZIP archive for emailing, sharing, or archiving?{" "}
                    <strong>SafePDF's PDF to ZIP converter</strong> allows you to{" "}
                    <strong>convert multiple PDF files into a ZIP archive online for free</strong> — with 100% client-side privacy,
                    zero uploads, and exact byte-for-byte preservation of your original documents.
                </p>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    How to Convert PDFs to a ZIP File in 3 Easy Steps
                </h2>
                <ol className="space-y-4 mb-8">
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">1</span>
                        <div>
                            <strong className="text-slate-900 dark:text-white">Select or drop your PDF files.</strong>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">Drag and drop multiple PDF files into the upload area or click to select them from your device.</p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">2</span>
                        <div>
                            <strong className="text-slate-900 dark:text-white">Review files and name your archive.</strong>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">Review the list of selected files, remove any unnecessary files, and optionally enter a custom ZIP archive name.</p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">3</span>
                        <div>
                            <strong className="text-slate-900 dark:text-white">Download your ZIP file.</strong>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">Click <em>Convert to ZIP &amp; Download</em>. Your browser bundles all PDFs into a single ZIP archive instantly without sending any data over the internet.</p>
                        </div>
                    </li>
                </ol>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    Why Use SafePDF to Convert PDF to ZIP?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 not-prose">
                    <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                        <h3 className="font-bold text-slate-900 dark:text-white mb-2">🔒 100% Private &amp; Local</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Your files are archived directly in your browser memory using Web APIs. No documents are ever uploaded to cloud servers or stored in any database.
                        </p>
                    </div>
                    <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                        <h3 className="font-bold text-slate-900 dark:text-white mb-2">⚡ Lossless &amp; Unmodified</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Original PDF bytes are copied into the ZIP file without re-rendering or re-encoding. Signatures, forms, and embedded vectors remain intact.
                        </p>
                    </div>
                    <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                        <h3 className="font-bold text-slate-900 dark:text-white mb-2">🏷️ Collision-Safe Renaming</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Duplicate filenames automatically receive clean numeric suffixes like (2), (3) so no files are lost or overwritten inside the archive.
                        </p>
                    </div>
                    <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                        <h3 className="font-bold text-slate-900 dark:text-white mb-2">📦 Unlimited Batch Archiving</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Archive as many files as your device can handle without artificial file-count limits, queues, or paywalls.
                        </p>
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    Common Uses for Bundling PDFs into ZIP Archives
                </h2>
                <ul className="space-y-2 mb-8 text-slate-600 dark:text-slate-400">
                    <li><strong className="text-slate-900 dark:text-white">Email attachments</strong> — send multiple invoices, contracts, or tax forms in a single compact attachment</li>
                    <li><strong className="text-slate-900 dark:text-white">Project packaging</strong> — package all project documents and specifications into a single distribution folder</li>
                    <li><strong className="text-slate-900 dark:text-white">Cloud backup</strong> — group related PDFs together before storing them on backup drives</li>
                    <li><strong className="text-slate-900 dark:text-white">Student &amp; academic submissions</strong> — package multiple assignment papers or research articles into one archive</li>
                </ul>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-4">
                    100% Private — Your PDFs Never Leave Your Device
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-8">
                    SafePDF processes your files entirely within your browser using JSZip.
                    No file ever reaches our servers. Your documents stay private by design.
                </p>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-6 mb-12">
                    {pdfToZipFaqs.map((faq, i) => (
                        <div key={i} className="not-prose border-b border-slate-100 dark:border-slate-800 pb-6">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">{faq.q}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                        </div>
                    ))}
                </div>

                <div className="not-prose">
                    <RelatedTools
                        tools={[
                            { to: "/merge", emoji: "🔗", label: "Merge PDF", desc: "Combine multiple PDFs into one" },
                            { to: "/split", emoji: "✂️", label: "Split PDF", desc: "Extract pages from a PDF" },
                            { to: "/compress", emoji: "🗜️", label: "Compress PDF", desc: "Reduce PDF file size" },
                            { to: "/crop-pdf", emoji: "✂️", label: "Crop & Resize PDF", desc: "Trim margins or resize pages" },
                            { to: "/organize", emoji: "🗂️", label: "Organize PDF", desc: "Reorder, add, or delete pages" },
                            { to: "/pdf-to-jpg", emoji: "🖼️", label: "PDF to JPG", desc: "Extract PDF pages as images" },
                        ]}
                        blogs={[
                            { to: "/blog/best-free-pdf-tools-2026", label: "Best Free PDF Tools 2026" },
                            { to: "/blog/how-to-merge-pdf-online-free", label: "How to Merge PDF Online Free" },
                            { to: "/blog/how-to-organize-pdf-pages", label: "How to Organize PDF Pages" },
                        ]}
                    />
                </div>
            </div>
        </section>
    );
}
