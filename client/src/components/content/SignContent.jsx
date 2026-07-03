import React from 'react';
import { Link } from 'react-router-dom';
import RelatedTools from '../RelatedTools';

export const signFaqs = [
    {
        q: 'Is this electronic signature legally binding?',
        a: "In most jurisdictions, yes. Electronic signatures are legally binding for most agreements."
    },
    {
        q: 'Does SafePDF save my drawn signature?',
        a: "No. SafePDF does not store, save, or upload your signature."
    }
];

export default function SignContent() {
    return (
        <section className="w-full max-w-4xl mx-auto px-4 py-16 md:py-24 mt-auto">
            <div className="prose prose-slate dark:prose-invert max-w-none">

                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
                    Sign PDF Online Free — Add Electronic Signatures Instantly
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                    Need to sign a contract, lease, or application? SafePDF's <strong>Sign PDF</strong> tool provides a fast, free, and secure way to electronically sign PDF documents directly in your browser. With our zero-upload guarantee, your highly sensitive documents never touch our servers, ensuring absolute <strong>privacy and confidentiality</strong> for your digital signatures.
                </p>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    How to Sign a PDF Document Online
                </h2>
                <ol className="space-y-4 mb-8">
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">1</span>
                        <div>
                            <strong className="text-slate-900 dark:text-white">Upload your document.</strong>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">Select the PDF you need to sign. SafePDF loads the document securely into your browser memory.</p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">2</span>
                        <div>
                            <strong className="text-slate-900 dark:text-white">Create your electronic signature.</strong>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">Click "Create Signature" and use your mouse, trackpad, or touch screen to draw your signature just like you would on paper.</p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">3</span>
                        <div>
                            <strong className="text-slate-900 dark:text-white">Place and download.</strong>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">Click anywhere on the document to place your signature. When you're ready, click "Download Signed PDF" to save the finalized file to your device.</p>
                        </div>
                    </li>
                </ol>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    Why Use SafePDF for Electronic Signatures?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                    {[
                        { title: 'Maximum Privacy', desc: 'Signing documents involves highly sensitive personal data. SafePDF processes everything client-side so your signature is never uploaded.' },
                        { title: 'No Account Required', desc: 'Skip the lengthy registration processes of other e-signature platforms. Sign your PDFs instantly for free.' },
                        { title: 'Cross-Device Compatible', desc: 'Draw your signature smoothly using a mouse on a desktop, or your finger on a mobile or tablet screen.' },
                        { title: 'Secure Integration', desc: 'The signature is permanently burned into the PDF matrix, making it a standard, universally viewable electronic signature.' },
                    ].map((item) => (
                        <div key={item.title} className="p-4 bg-blue-50 dark:bg-blue-900/15 rounded-xl border border-blue-100 dark:border-blue-900/30">
                            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">{item.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    Frequently Asked Questions — Sign PDF
                </h2>
                <div className="space-y-5">
                    {[
                        {
                            q: 'Is this electronic signature legally binding?',
                            a: 'In most jurisdictions, electronic signatures created by drawing your name are legally binding for most business and personal agreements. However, check your local laws for specific contract types.'
                        },
                        {
                            q: 'Does SafePDF save my drawn signature?',
                            a: 'No. SafePDF does not store, save, or upload your signature. Once you close the tab, the signature data is completely erased from memory.'
                        },
                        {
                            q: 'Can I sign a PDF on my phone?',
                            a: 'Yes! SafePDF is fully responsive. It is actually easier to draw a natural-looking signature using your touchscreen device.'
                        },
                    ].map(({ q, a }) => (
                        <div key={q} className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">{q}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{a}</p>
                        </div>
                    ))}
                </div>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    Frequently Asked Questions — Sign PDF
                </h2>
                <div className="space-y-5 mb-12">
                    {signFaqs.map(({ q, a }) => (
                        <div key={q} className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">{q}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{a}</p>
                        </div>
                    ))}
                </div>

                <RelatedTools 
                    tools={[
                        { to: '/protect', emoji: '🔒', label: 'Protect PDF', desc: 'Add password to PDF' },
                        { to: '/edit-pdf', emoji: '✏️', label: 'Edit PDF', desc: 'Add text and edit PDF' },
                        { to: '/merge', emoji: '📄', label: 'Merge PDF', desc: 'Combine multiple PDFs' },
                        { to: '/compress', emoji: '📦', label: 'Compress PDF', desc: 'Reduce PDF file size' },
                    ]}
                    blogs={[
                        { to: '/blog/how-to-sign-pdf-online-free', label: 'How to Electronically Sign a PDF for Free' },
                        { to: '/edit-pdf', label: 'Need to fill out text fields first? Try Edit PDF' }
                    ]}
                />

            </div>
        </section>
    );
}
