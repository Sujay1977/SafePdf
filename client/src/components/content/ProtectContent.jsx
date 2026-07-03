import React from 'react';
import { Link } from 'react-router-dom';
import RelatedTools from '../RelatedTools';

export const protectFaqs = [
    {
        q: 'How do I add a password to a PDF?',
        a: "Use SafePDF's Protect PDF tool: upload your PDF, enter a password, confirm it, then click 'Protect PDF'. The password-protected file downloads instantly."
    },
    {
        q: "Is my password sent to SafePDF's servers?",
        a: "No. SafePDF encrypts your PDF entirely inside your browser. Your password and your file never leave your device."
    },
    {
        q: 'What encryption standard does SafePDF use for PDF protection?',
        a: "SafePDF uses standard AES-based PDF encryption as defined in the PDF specification, compatible with all major PDF readers including Adobe Acrobat."
    },
    {
        q: 'Can I remove the password from a PDF later?',
        a: "Yes. Use SafePDF's Unlock PDF tool to remove the password from a PDF you own."
    }
];

export default function ProtectContent() {
    return (
        <section className="w-full max-w-4xl mx-auto px-4 py-16 md:py-24">
            <div className="prose prose-slate dark:prose-invert max-w-none">

                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
                    Protect PDF with Password Online — Encrypt PDF Files Securely
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                    Want to <strong>add password protection to a PDF</strong>? SafePDF's free PDF encryption tool lets you{' '}
                    <strong>protect a PDF with a password online</strong> in seconds — without uploading your file to any server.
                    Your document and your password stay entirely on your device, giving you military-grade privacy.
                </p>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    How to Password Protect a PDF in 3 Steps
                </h2>
                <ol className="space-y-4 mb-8">
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">1</span>
                        <div>
                            <strong className="text-slate-900 dark:text-white">Upload your PDF file.</strong>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">Click the upload zone or drag and drop your PDF. The file is loaded into your browser's memory and never transmitted anywhere.</p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">2</span>
                        <div>
                            <strong className="text-slate-900 dark:text-white">Enter and confirm your password.</strong>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">Type a strong password and confirm it. SafePDF validates that both fields match before proceeding — your password is never sent anywhere.</p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">3</span>
                        <div>
                            <strong className="text-slate-900 dark:text-white">Click "Protect PDF" and download.</strong>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">SafePDF encrypts your PDF and downloads the protected version. Open it in any PDF reader and it will require the password you set.</p>
                        </div>
                    </li>
                </ol>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    Why Password-Protect a PDF?
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    PDFs are the most widely shared document format in the world. But by default, anyone who receives a PDF can open, copy,
                    and share it freely. <strong>Adding a password to your PDF</strong> ensures only authorized people can access
                    the contents.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                    {[
                        { title: 'Protect Confidential Files', desc: 'Business contracts, financial statements, and HR documents should always be password-protected before sharing.' },
                        { title: 'Client Deliverables', desc: 'Ensure reports, proposals, and invoices can only be opened by the intended recipient.' },
                        { title: 'Legal Documents', desc: 'Encrypted PDFs are harder to tamper with and demonstrate intent to keep content controlled.' },
                        { title: 'Personal Documents', desc: 'Protect tax returns, medical records, identity documents, and other sensitive personal files.' },
                    ].map((item) => (
                        <div key={item.title} className="p-4 bg-blue-50 dark:bg-blue-900/15 rounded-xl border border-blue-100 dark:border-blue-900/30">
                            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">{item.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    How SafePDF Encrypts Your PDF — The Technical Details
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    SafePDF uses <a href="https://pdf-lib.js.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">pdf-lib</a>,
                    an open-source JavaScript library, to apply standard <strong>PDF password encryption</strong> as defined in the PDF specification
                    (ISO 32000). This produces a file that is compatible with all major PDF readers including:
                </p>
                <ul className="space-y-2 mb-6 text-slate-600 dark:text-slate-400">
                    <li className="flex items-start gap-2"><span className="text-blue-500 font-bold mt-1">•</span> Adobe Acrobat Reader (all versions)</li>
                    <li className="flex items-start gap-2"><span className="text-blue-500 font-bold mt-1">•</span> Apple Preview on macOS and iOS</li>
                    <li className="flex items-start gap-2"><span className="text-blue-500 font-bold mt-1">•</span> Google Chrome's built-in PDF viewer</li>
                    <li className="flex items-start gap-2"><span className="text-blue-500 font-bold mt-1">•</span> Foxit Reader, PDF Expert, and all other standard PDF applications</li>
                </ul>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    Critically, <strong>your password is never sent to SafePDF's servers</strong>. The entire encryption process runs inside
                    your browser tab. The only things that leave your browser are the download of the encrypted PDF to your device.
                </p>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    Tips for Creating a Strong PDF Password
                </h2>
                <div className="space-y-3 mb-8">
                    {[
                        { tip: 'Use at least 12 characters', desc: 'Longer passwords are exponentially harder to crack. Aim for 12+ characters minimum.' },
                        { tip: 'Mix letters, numbers, and symbols', desc: 'A combination like "Th3r@in!nSp@in" is far stronger than a simple word.' },
                        { tip: 'Avoid personal information', desc: "Don't use your name, birthday, or pet's name — these are the first things attackers try." },
                        { tip: 'Store your password securely', desc: 'Write it down or use a password manager. SafePDF cannot recover your password if you forget it.' },
                    ].map((item) => (
                        <div key={item.tip} className="flex gap-3 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                            <span className="text-green-500 font-bold text-lg mt-0.5 shrink-0">✓</span>
                            <div>
                                <p className="font-semibold text-slate-900 dark:text-white text-sm">{item.tip}</p>
                                <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    Frequently Asked Questions — Protect PDF
                </h2>
                <div className="space-y-5 mb-12">
                    {protectFaqs.map(({ q, a }) => (
                        <div key={q} className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">{q}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{a}</p>
                        </div>
                    ))}
                </div>

                <RelatedTools 
                    tools={[
                        { to: '/unlock', emoji: '🔓', label: 'Unlock PDF', desc: 'Remove password from PDF' },
                        { to: '/merge', emoji: '📄', label: 'Merge PDF', desc: 'Combine multiple PDFs' },
                        { to: '/compress', emoji: '📦', label: 'Compress PDF', desc: 'Reduce PDF file size' },
                        { to: '/sign', emoji: '✍️', label: 'Sign PDF', desc: 'Add signature to PDF' },
                    ]}
                    blogs={[
                        { to: '/blog/how-to-protect-pdf-with-password', label: 'How to Protect a PDF with a Password (Free & Secure)' },
                        { to: '/blog/how-to-protect-pdf-with-password-securely', label: 'PDF Password Security Best Practices Guide' },
                        { to: '/blog/how-to-unlock-pdf-without-password', label: 'How to Unlock a Password-Protected PDF' },
                    ]}
                />

            </div>
        </section>
    );
}
