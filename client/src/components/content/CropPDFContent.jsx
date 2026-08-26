import React from "react";
import { Link } from "react-router-dom";
import RelatedTools from "../RelatedTools";

export const cropFaqs = [
    {
        q: "Is the Crop PDF tool free?",
        a: "Yes. SafePDF's Crop & Resize PDF tool is 100% free with no file-size limits, no watermarks, no signup, and no payment required."
    },
    {
        q: "Are my PDF files uploaded to a server when I crop them?",
        a: "No. Your PDF is processed entirely in your browser using JavaScript. The file is never uploaded to any server. SafePDF has no backend PDF processing service."
    },
    {
        q: 'What is the difference between "Trim Margins" and "Resize Page"?',
        a: "Trim Margins (lossless): adjusts the page's visible boundary (MediaBox/CropBox) without changing the underlying content. It is fast and lossless — the cropped content is hidden but not deleted. Resize Page: embeds the page as a vector graphic and redraws it at a new target size, physically scaling the content. This is also lossless and preserves text and graphics quality."
    },
    {
        q: 'Does "Trim Margins" permanently delete the hidden content?',
        a: "No. Trim Margins only changes which area of the page is displayed. A PDF editor that can set custom crop boxes could make the hidden content visible again. If you need to permanently remove content, use the rasterized crop option, which destroys hidden content by converting the page to an image."
    },
    {
        q: "Can I crop specific pages or all pages at once?",
        a: "Yes. You can apply your crop/resize settings to all pages at once, or to only the currently previewed page. Use the Apply To control in the settings panel."
    },
    {
        q: "Can I resize a PDF to A4 or Letter size?",
        a: "Yes. The Resize Page mode includes preset sizes for A4 Portrait (595x842 pt), A4 Landscape (842x595 pt), Letter Portrait (612x792 pt), Letter Landscape (792x612 pt), and Custom dimensions. You can also enter your own width and height in PDF points."
    },
    {
        q: "Will the text and images stay sharp after resizing?",
        a: "Yes, when using the Resize Page (lossless) mode. The page is embedded as a vector XObject and scaled mathematically — fonts and vector graphics remain sharp at any size. Only images that were already rasterized in the original PDF are affected by the scale."
    },
    {
        q: "Does cropping or resizing work on multi-page PDFs?",
        a: "Yes. You can apply the same crop or resize settings to every page at once, or navigate page by page and apply to individual pages."
    }
];

export default function CropPDFContent() {
    return (
        <section className="w-full max-w-4xl mx-auto px-4 py-16 md:py-24">
            <div className="prose prose-slate dark:prose-invert max-w-none">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
                    Crop & Resize PDF Online Free
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                    Need to remove excessive whitespace, trim scanner borders, or change a PDF to A4 or Letter size?{" "}
                    <strong>SafePDF's Crop & Resize PDF tool</strong> lets you{" "}
                    <strong>crop PDF margins and resize PDF pages online for free</strong> — with no uploads, no watermarks,
                    and no account needed. Everything runs directly in your browser.
                </p>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    How to Crop or Resize a PDF in 3 Easy Steps
                </h2>
                <ol className="space-y-4 mb-8">
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">1</span>
                        <div>
                            <strong className="text-slate-900 dark:text-white">Upload your PDF file.</strong>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">Click the upload area or drag and drop your PDF. The file loads entirely in your browser — it never leaves your device.</p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">2</span>
                        <div>
                            <strong className="text-slate-900 dark:text-white">Choose your mode and configure settings.</strong>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">
                                Select Trim Margins to cut away whitespace by specifying how many points to remove from each edge.
                                Or select Resize Page to scale to a standard size like A4 or Letter, or a custom width and height.
                            </p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">3</span>
                        <div>
                            <strong className="text-slate-900 dark:text-white">Download your cropped or resized PDF.</strong>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">Click Crop & Download PDF. Your browser processes the file and downloads the result immediately.</p>
                        </div>
                    </li>
                </ol>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    Trim Margins vs. Resize Page
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 not-prose">
                    <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                        <h3 className="font-bold text-slate-900 dark:text-white mb-2">Trim Margins (Lossless)</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Adjusts the page visible boundary (MediaBox/CropBox). The PDF remains fully vector-based.
                            Content outside the new boundary is hidden but not deleted.
                            Best for removing scanner borders and whitespace margins.
                        </p>
                        <div className="mt-3 text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 rounded-lg px-3 py-2">
                            Hidden content is not permanently removed. A PDF editor could reveal it.
                        </div>
                    </div>
                    <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                        <h3 className="font-bold text-slate-900 dark:text-white mb-2">Resize Page (Lossless Scale)</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Embeds the page as a vector XObject and redraws it at the target dimensions.
                            Fonts and graphics remain sharp. Use this to convert to A4, Letter, or any custom size.
                        </p>
                        <div className="mt-3 text-xs text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 rounded-lg px-3 py-2">
                            Fully lossless — text remains selectable and searchable.
                        </div>
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    Common Uses for PDF Cropping and Resizing
                </h2>
                <ul className="space-y-2 mb-8 text-slate-600 dark:text-slate-400">
                    <li><strong className="text-slate-900 dark:text-white">Remove scanner borders</strong> — trim the black border that scanners add around scanned documents</li>
                    <li><strong className="text-slate-900 dark:text-white">Standardize page sizes</strong> — convert a mix of page sizes to uniform A4 or Letter</li>
                    <li><strong className="text-slate-900 dark:text-white">Remove headers/footers</strong> — trim the top or bottom of each page</li>
                    <li><strong className="text-slate-900 dark:text-white">Resize for printing</strong> — scale a document to fit a different paper size</li>
                    <li><strong className="text-slate-900 dark:text-white">Optimize for screen reading</strong> — crop to a tighter area for better tablet readability</li>
                </ul>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-4">
                    100% Private — Your PDFs Never Leave Your Device
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-8">
                    SafePDF processes your files entirely within your browser using pdf-lib and pdfjs-dist.
                    No file ever reaches our servers. Your documents stay private by design.
                </p>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-6 mb-12">
                    {cropFaqs.map((faq, i) => (
                        <div key={i} className="not-prose border-b border-slate-100 dark:border-slate-800 pb-6">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">{faq.q}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                        </div>
                    ))}
                </div>

                <div className="not-prose">
                    <RelatedTools
                        tools={[
                            { to: "/compress", label: "Compress PDF", desc: "Reduce PDF file size" },
                            { to: "/rotate", label: "Rotate PDF", desc: "Rotate pages to the right angle" },
                            { to: "/organize", label: "Organize PDF", desc: "Reorder, add, or delete pages" },
                            { to: "/edit", label: "Edit PDF", desc: "Add text, shapes, and highlights" },
                            { to: "/merge", label: "Merge PDF", desc: "Combine PDFs into one file" },
                            { to: "/split", label: "Split PDF", desc: "Extract pages from a PDF" },
                        ]}
                        blogs={[
                            { to: "/blog/best-free-pdf-tools-2026", label: "Best Free PDF Tools 2026" },
                            { to: "/blog/how-to-edit-pdf-online-free", label: "How to Edit a PDF Online for Free" },
                            { to: "/blog/how-to-organize-pdf-pages", label: "How to Organize PDF Pages" },
                        ]}
                    />
                </div>
            </div>
        </section>
    );
}
