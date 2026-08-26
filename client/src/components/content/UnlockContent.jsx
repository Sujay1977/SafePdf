import React from 'react';
import { Link } from 'react-router-dom';
import RelatedTools from '../RelatedTools';

export const unlockFaqs = [
    {
        q: "Can I unlock a PDF if I don't know the password?",
        a: "No. SafePDF is not a password cracking tool. You must know the current password to decrypt the file."
    },
    {
        q: "Is it safe to type my password here?",
        a: "Yes. Because SafePDF operates entirely client-side, your password is never transmitted over the internet."
    }
];

export default function UnlockContent() {
    return (
        <section className="w-full max-w-4xl mx-auto px-4 py-16 md:py-24">
            <div className="prose prose-slate dark:prose-invert max-w-none">

                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
                    Unlock PDF Online Free — Remove PDF Passwords Instantly
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                    Locked out of your own document? SafePDF's <strong>Unlock PDF</strong> tool lets you remove password protection from PDFs in seconds. 
                    Unlike other tools, we decrypt your files locally in your browser. This means you can <strong>remove PDF passwords</strong> completely securely, 
                    without uploading sensitive files to any cloud server.
                </p>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    How to Remove a PDF Password in 3 Steps
                </h2>
                <ol className="space-y-4 mb-8">
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">1</span>
                        <div>
                            <strong className="text-slate-900 dark:text-white">Select your locked PDF.</strong>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">Drag and drop the encrypted PDF into the box above, or click to upload it from your device.</p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">2</span>
                        <div>
                            <strong className="text-slate-900 dark:text-white">Enter the current password.</strong>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">Provide the known password to unlock the file. SafePDF needs the correct password to decrypt and permanently remove the protection.</p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">3</span>
                        <div>
                            <strong className="text-slate-900 dark:text-white">Unlock and Download.</strong>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">Click "Unlock PDF." The security restrictions are instantly removed, and you can download the unlocked file immediately.</p>
                        </div>
                    </li>
                </ol>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    Why Use SafePDF to Unlock PDFs?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                    {[
                        { title: '100% Client-Side Decryption', desc: 'We never upload your file or your password to our servers. All decryption happens securely inside your browser.' },
                        { title: 'Permanent Unlocking', desc: 'Once unlocked, the PDF remains permanently password-free so you can view or print without restrictions.' },
                        { title: 'Fast & Reliable', desc: 'Since there is no uploading or downloading of large files, the unlock process is near-instant.' },
                        { title: 'Free Forever', desc: 'Remove passwords from as many PDFs as you need. There are no limits and no fees.' },
                    ].map((item) => (
                        <div key={item.title} className="p-4 bg-blue-50 dark:bg-blue-900/15 rounded-xl border border-blue-100 dark:border-blue-900/30">
                            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">{item.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    Frequently Asked Questions — Unlock PDF
                </h2>
                <div className="space-y-5">
                    {[
                        {
                            q: 'Can I unlock a PDF if I don\'t know the password?',
                            a: 'No. SafePDF is not a password cracking tool. You must know the current password to decrypt the file. SafePDF simply removes the password requirement for future access.'
                        },
                        {
                            q: 'Is it safe to type my password here?',
                            a: 'Yes. Because SafePDF operates entirely client-side, your password is never transmitted over the internet or logged in any database.'
                        },
                        {
                            q: 'Will the contents of my PDF be changed?',
                            a: 'No. SafePDF only modifies the encryption layer of the document. All text, images, and formatting remain completely intact.'
                        },
                    ].map(({ q, a }) => (
                        <div key={q} className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">{q}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{a}</p>
                        </div>
                    ))}
                </div>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    Frequently Asked Questions — Unlock PDF
                </h2>
                <div className="space-y-5 mb-12">
                    {unlockFaqs.map(({ q, a }) => (
                        <div key={q} className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">{q}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{a}</p>
                        </div>
                    ))}
                </div>

                <RelatedTools 
                    tools={[
                        { to: '/protect', label: 'Protect PDF', desc: 'Add password to PDF' },
                        { to: '/merge', label: 'Merge PDF', desc: 'Combine multiple PDFs' },
                        { to: '/compress', label: 'Compress PDF', desc: 'Reduce PDF file size' },
                        { to: '/edit', label: 'Edit PDF', desc: 'Add text and edit PDF' },
                    ]}
                    blogs={[
                        { to: '/blog/how-to-unlock-pdf-without-password', label: 'How to Unlock a Password-Protected PDF' },
                        { to: '/protect', label: 'Want to add a password instead? Try Protect PDF' }
                    ]}
                />

            </div>
        </section>
    );
}
