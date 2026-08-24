import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, Zap, Layers, Sparkles, FileText, Check, Lock } from 'lucide-react';
import RelatedTools from '../RelatedTools';

export const fillPDFFormFaqs = [
    {
        q: "Are my PDF form data and files uploaded to any server?",
        a: "No. SafePDF processes and fills your PDF forms completely in your local browser using WebAssembly and JavaScript. Your sensitive personal data, tax information, and document content never leave your computer."
    },
    {
        q: "What types of PDF form fields are supported?",
        a: "SafePDF supports all standard AcroForm fields including text input fields, multiline text areas, checkboxes, radio button groups, dropdown selection menus, and option lists."
    },
    {
        q: "What does 'Flatten Form' mean and should I use it?",
        a: "Flattening converts interactive, fillable form fields into permanent, static page content. This prevents anyone from accidentally modifying or tampering with your filled responses after downloading. It is recommended when submitting completed official applications or signed forms."
    },
    {
        q: "Does SafePDF support dynamic XFA forms (Adobe LiveCycle)?",
        a: "Dynamic XFA forms are proprietary Adobe XML-based forms that require Adobe's proprietary render engine. Standard browser-based PDF engines support AcroForms (which comprise over 95% of fillable PDFs). If an XFA form is detected, SafePDF will notify you clearly."
    },
    {
        q: "Can I edit pre-filled values in a PDF form?",
        a: "Yes. When you load a PDF that already contains values, SafePDF detects and populates them into the editor so you can review, update, or clear any field before exporting."
    },
    {
        q: "Is there a limit on the number of fields or file size?",
        a: "Because processing takes place entirely on your device, there are no artificial file size limits or paywalls. You can fill documents with single or multiple pages smoothly."
    }
];

const FillPDFFormContent = () => {
    return (
        <div className="w-full max-w-5xl mx-auto px-4 py-16 text-slate-800 dark:text-slate-200">
            {/* Value Proposition Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                <div className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                    <div className="size-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 mb-6">
                        <ShieldCheck size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">100% Private &amp; Secure</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        Fill sensitive tax forms, financial applications, and legal contracts with complete confidence. Your data stays in your browser.
                    </p>
                </div>

                <div className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                    <div className="size-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 mb-6">
                        <Layers size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Complete Field Support</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        Seamlessly edit text boxes, toggle checkboxes, pick radio choices, and select from dropdown lists across all document pages.
                    </p>
                </div>

                <div className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                    <div className="size-12 rounded-xl bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center text-purple-600 mb-6">
                        <Lock size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Form Flattening Option</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        Lock in your completed responses by flattening form fields into permanent page graphics to prevent subsequent modifications.
                    </p>
                </div>
            </div>

            {/* How to Fill PDF Forms Step-by-Step */}
            <div className="mb-20">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
                        How to Fill PDF Forms Online
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-base">
                        Complete your interactive PDF documents in three easy steps without software installation.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center text-center p-6">
                        <div className="size-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center mb-4 text-sm">
                            1
                        </div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-2">Upload Your Form</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Drag and drop your fillable PDF file into the dropzone. All fields are recognized instantly.
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-center p-6">
                        <div className="size-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center mb-4 text-sm">
                            2
                        </div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-2">Fill In Your Information</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Enter text, check boxes, and choose dropdown options. Values are updated immediately.
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-center p-6">
                        <div className="size-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center mb-4 text-sm">
                            3
                        </div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-2">Export &amp; Download</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Choose whether to flatten your form or keep it interactive, then download your completed PDF.
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
                        Everything you need to know about browser-based PDF form filling and privacy.
                    </p>
                </div>

                <div className="space-y-4 max-w-3xl mx-auto">
                    {fillPDFFormFaqs.map((faq, index) => (
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
            <RelatedTools currentTool="/fill-pdf-form" />
        </div>
    );
};

export default FillPDFFormContent;
