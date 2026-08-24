import React from 'react';
import { ShieldCheck, EyeOff, Lock, AlertTriangle, FileText, CheckCircle2, Layers } from 'lucide-react';
import RelatedTools from '../RelatedTools';

export const redactPDFFaqs = [
    {
        q: "How does SafePDF ensure redactions are truly irreversible?",
        a: "Unlike tools that merely place a black rectangle over existing text (leaving the underlying text stream readable in the PDF code), SafePDF rasterizes each page into pixel graphics with the redaction blocks burned directly into the image matrix. A brand-new PDF is then constructed containing only these pixels. There is no underlying text layer, font stream, or metadata to extract."
    },
    {
        q: "Can redacted text be selected, searched, or recovered?",
        a: "No. Because the exported PDF is newly generated from rasterized page pixels, the original text operators and vectors are completely discarded. Content cannot be recovered through text selection, copy-pasting, search (Ctrl+F), or command-line PDF extraction utilities."
    },
    {
        q: "Are my files or sensitive data sent to a remote server?",
        a: "No. All rendering, canvas rasterization, and PDF rebuilding happen 100% locally inside your web browser. Your confidential records, personal identification, and financial data never leave your device."
    },
    {
        q: "Why does the exported PDF no longer have selectable text?",
        a: "Full-page pixel rasterization is the only cryptographically sound method to ensure that all metadata, hidden vector streams, and font glyphs are permanently destroyed without proprietary desktop software. As a trade-off, the resulting PDF contains image-based pages."
    },
    {
        q: "Can I redact multiple pages in a single document?",
        a: "Yes. You can navigate through all document pages, draw redaction regions on any page, and export the entire completed document in a single step."
    },
    {
        q: "Does SafePDF keep a copy of my original PDF or redactions?",
        a: "No. SafePDF operates with a zero-retention client-side model. When you close or refresh your browser tab, all document buffers and memory are immediately erased."
    }
];

const RedactPDFContent = () => {
    return (
        <div className="w-full max-w-5xl mx-auto px-4 py-16 text-slate-800 dark:text-slate-200">
            {/* Value Proposition Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                <div className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                    <div className="size-12 rounded-xl bg-red-50 dark:bg-red-950/50 flex items-center justify-center text-red-600 mb-6">
                        <EyeOff size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Permanent Pixel Destruction</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        Redacted areas are permanently baked into the image matrix. No underlying text layer or hidden vector streams remain.
                    </p>
                </div>

                <div className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                    <div className="size-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 mb-6">
                        <ShieldCheck size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Zero-Server Privacy</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        Redact SSNs, account numbers, and sensitive client information locally. Your files are never uploaded to any cloud server.
                    </p>
                </div>

                <div className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                    <div className="size-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 mb-6">
                        <Layers size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Multi-Page Support</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        Draw and customize multiple redaction zones across any page of your document with real-time visual coordinate feedback.
                    </p>
                </div>
            </div>

            {/* How It Works */}
            <div className="mb-20">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
                        How to Permanently Redact a PDF
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-base">
                        Secure your confidential documents in three straightforward steps.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center text-center p-6">
                        <div className="size-10 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold flex items-center justify-center mb-4 text-sm">
                            1
                        </div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-2">Upload Document</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Select or drag and drop your PDF. The document is rendered locally in high resolution.
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-center p-6">
                        <div className="size-10 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold flex items-center justify-center mb-4 text-sm">
                            2
                        </div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-2">Draw Redaction Areas</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Click and drag over confidential text or images. Position multiple boxes on any page.
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-center p-6">
                        <div className="size-10 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold flex items-center justify-center mb-4 text-sm">
                            3
                        </div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-2">Burn &amp; Export</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Apply permanent pixel-level redaction and download a newly generated, sanitized PDF.
                        </p>
                    </div>
                </div>
            </div>

            {/* Technical Security & Trade-offs Notice */}
            <div className="mb-20 p-8 rounded-3xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="flex items-start gap-4">
                    <div className="size-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-700 dark:text-amber-400 shrink-0 mt-1">
                        <AlertTriangle size={20} />
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                            Understanding Client-Side Redaction Architecture
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            Many online PDF tools create pseudo-redactions by simply overlaying colored rectangle objects on the PDF vector tree. When opened in professional software, users can simply delete the rectangle or copy the underlying text stream.
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            SafePDF performs genuine redaction by completely rasterizing the document into raw canvas pixels, painting over the target coordinates, and constructing an entirely new PDF file. Because the final PDF is pixel-based, the original text cannot be selected or extracted.
                        </p>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="mb-20">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-base">
                        Everything you need to know about secure client-side PDF redaction.
                    </p>
                </div>

                <div className="space-y-4 max-w-3xl mx-auto">
                    {redactPDFFaqs.map((faq, index) => (
                        <div
                            key={index}
                            className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-sm"
                        >
                            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                                {faq.q}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                {faq.a}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Related Tools */}
            <RelatedTools currentTool="/redact-pdf" />
        </div>
    );
};

export default RedactPDFContent;
