import React from 'react';
import { Link } from 'react-router-dom';
import RelatedTools from '../RelatedTools';

export const compressFaqs = [
    {
        q: 'Is it safe to compress a PDF online?',
        a: "Yes. SafePDF compresses PDF files entirely inside your browser. Your file is never uploaded to any server, making it 100% private and secure."
    },
    {
        q: 'Will compressing a PDF reduce its quality?',
        a: "The 'Recommended' compression level preserves visual quality while significantly reducing file size. The 'Extreme' option trades some quality for maximum compression."
    },
    {
        q: 'What is the maximum file size I can compress?',
        a: "There is no hard limit enforced by SafePDF. The constraint is your browser's available memory, which typically supports files up to 200MB or more."
    },
    {
        q: 'Is compressing a PDF free?',
        a: "Yes, SafePDF's PDF compression tool is completely free with no file size limits or watermarks."
    }
];

export default function CompressContent() {
    return (
        <section className="w-full max-w-4xl mx-auto px-4 py-16 md:py-24">
            <div className="prose prose-slate dark:prose-invert max-w-none">

                {/* Main Article */}
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
                    Compress PDF Online Free — Reduce File Size Without Losing Quality
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                    Dealing with a PDF that's too large to email, upload, or share? <strong>SafePDF's PDF compressor</strong> lets you{' '}
                    <strong>compress PDF files online for free</strong>, instantly reducing file size while preserving the quality of your text, images,
                    and formatting — all without uploading your file to any server.
                </p>

                {/* How to Compress */}
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    How to Compress a PDF in 3 Easy Steps
                </h2>
                <ol className="space-y-4 mb-8">
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">1</span>
                        <div>
                            <strong className="text-slate-900 dark:text-white">Upload your PDF file.</strong>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">Click the upload area or drag and drop your PDF directly onto the page. The file is loaded entirely in your browser — it never leaves your device.</p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">2</span>
                        <div>
                            <strong className="text-slate-900 dark:text-white">Choose your compression level.</strong>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">Select <em>Recommended</em> for the best balance of quality and size reduction. Choose <em>Extreme</em> for maximum compression when file size is critical, or <em>Less Compression</em> to prioritize image fidelity.</p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">3</span>
                        <div>
                            <strong className="text-slate-900 dark:text-white">Click "Compress PDF" and download.</strong>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">Your compressed PDF is ready in seconds. Click download and save it to your device. No registration, no watermarks, no limits.</p>
                        </div>
                    </li>
                </ol>

                {/* Why Compress */}
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    Why You Should Compress Your PDF
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    Large PDF files can cause a range of practical problems. Email providers like Gmail have a 25 MB attachment limit. Many web forms cap uploads at 5 MB or 10 MB.
                    Cloud storage fills up fast with uncompressed documents. <strong>Compressing your PDF</strong> solves all of these instantly.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                    {[
                        { title: 'Email Attachments', desc: 'Stay under the 25 MB Gmail limit or 10 MB limit on Outlook without splitting your document.' },
                        { title: 'Faster Sharing', desc: 'Smaller files upload and download faster, even on mobile networks.' },
                        { title: 'Form Uploads', desc: 'Government portals, job applications, and legal platforms often restrict upload sizes. Compress first.' },
                        { title: 'Cloud Storage', desc: 'Keep your Google Drive and Dropbox from filling up. Compressed PDFs take up a fraction of the space.' },
                    ].map((item) => (
                        <div key={item.title} className="p-4 bg-blue-50 dark:bg-blue-900/15 rounded-xl border border-blue-100 dark:border-blue-900/30">
                            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">{item.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Security Section */}
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    100% Secure: Your Files Never Leave Your Browser
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    Privacy is at the core of SafePDF. Unlike many competitors that upload your PDFs to remote servers for processing,{' '}
                    <strong>SafePDF compresses PDF files entirely within your browser</strong> using client-side JavaScript and the{' '}
                    <a href="https://pdf-lib.js.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">pdf-lib</a> library.
                    This means:
                </p>
                <ul className="space-y-2 mb-6 text-slate-600 dark:text-slate-400">
                    <li className="flex items-start gap-2"><span className="text-green-500 font-bold mt-1">✓</span> Your PDF never leaves your computer</li>
                    <li className="flex items-start gap-2"><span className="text-green-500 font-bold mt-1">✓</span> No file is stored on any cloud or server</li>
                    <li className="flex items-start gap-2"><span className="text-green-500 font-bold mt-1">✓</span> No account or login required</li>
                    <li className="flex items-start gap-2"><span className="text-green-500 font-bold mt-1">✓</span> Works completely offline once the page has loaded</li>
                    <li className="flex items-start gap-2"><span className="text-green-500 font-bold mt-1">✓</span> GDPR-compliant by design — zero data collection</li>
                </ul>

                {/* Comparison */}
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    SafePDF vs Other PDF Compressors
                </h2>
                <div className="overflow-x-auto mb-8">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="bg-slate-100 dark:bg-slate-800">
                                <th className="p-3 text-left font-bold text-slate-900 dark:text-white rounded-tl-lg">Feature</th>
                                <th className="p-3 text-center font-bold text-blue-600">SafePDF</th>
                                <th className="p-3 text-center font-bold text-slate-500">ILovePDF</th>
                                <th className="p-3 text-center font-bold text-slate-500 rounded-tr-lg">Smallpdf</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                            {[
                                ['100% Free', '✅', '⚠️ Limited free', '⚠️ 2 free/day'],
                                ['Client-side (no upload)', '✅', '❌', '❌'],
                                ['No watermarks', '✅', '✅', '❌'],
                                ['No login required', '✅', '✅', '✅'],
                                ['Works offline', '✅', '❌', '❌'],
                                ['GDPR compliant', '✅', '⚠️', '⚠️'],
                            ].map(([feature, safe, ilove, small]) => (
                                <tr key={feature} className="odd:bg-white dark:odd:bg-slate-900 even:bg-slate-50 dark:even:bg-slate-800/50">
                                    <td className="p-3 font-medium text-slate-700 dark:text-slate-300">{feature}</td>
                                    <td className="p-3 text-center">{safe}</td>
                                    <td className="p-3 text-center text-slate-500">{ilove}</td>
                                    <td className="p-3 text-center text-slate-500">{small}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    Frequently Asked Questions — Compress PDF
                </h2>
                <div className="space-y-5 mb-12">
                    {compressFaqs.map(({ q, a }) => (
                        <div key={q} className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">{q}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{a}</p>
                        </div>
                    ))}
                </div>

                <RelatedTools 
                    tools={[
                        { to: '/merge', emoji: '📄', label: 'Merge PDF', desc: 'Combine multiple PDFs into one' },
                        { to: '/split', emoji: '✂️', label: 'Split PDF', desc: 'Extract pages from a PDF' },
                        { to: '/protect', emoji: '🔒', label: 'Protect PDF', desc: 'Add password encryption' },
                        { to: '/pdf-to-word', emoji: '📝', label: 'PDF to Word', desc: 'Convert PDF to DOCX' },
                    ]}
                    blogs={[
                        { to: '/blog/compress-pdf-without-losing-quality', label: 'How to Compress PDF Without Losing Quality (Full Guide)' },
                        { to: '/blog/is-pdf-compression-safe', label: 'Is PDF Compression Safe? What You Need to Know' },
                        { to: '/blog/best-free-pdf-tools-2026', label: 'Best Free PDF Tools in 2026' },
                    ]}
                />

            </div>
        </section>
    );
}
