import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ClientOnly from '../components/ClientOnly';

const Workflows = () => {
    const workflows = [
        {
            title: "Secure Contract Signing",
            description: "Finalize agreements securely without ever uploading your documents to a server.",
            steps: [
                { icon: "draw", title: "Sign PDF", link: "/sign", color: "text-purple-500" },
                { icon: "lock", title: "Protect PDF", link: "/protect", color: "text-green-500" }
            ]
        },
        {
            title: "Optimize for Email",
            description: "Prepare large reports for email attachments by compressing and merging them.",
            steps: [
                { icon: "call_merge", title: "Merge PDF", link: "/merge", color: "text-blue-500" },
                { icon: "compress", title: "Compress PDF", link: "/compress", color: "text-pink-500" }
            ]
        },
        {
            title: "Document Reorganization",
            description: "Clean up scanned documents by removing unwanted pages and fixing orientation.",
            steps: [
                { icon: "organize", title: "Organize", link: "/organize", color: "text-indigo-500" },
                { icon: "rotate_right", title: "Rotate", link: "/rotate", color: "text-cyan-500" }
            ]
        }
    ];

    return (
        <div className="flex flex-col w-full min-h-screen bg-slate-50 dark:bg-slate-900">
            <SEO
                title="PDF Workflows & Solutions | SafePDF"
                description="Discover efficient PDF workflows. Learn how to combine SafePDF tools to solve complex document problems securely."
            />

            <div className="w-full py-16 px-4">
                <div className="max-w-4xl mx-auto flex flex-col gap-12">
                    <div className="text-center flex flex-col gap-4">
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
                            Workflows
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Combine powerful tools to streamline your document tasks.
                        </p>
                    </div>

                    <div className="grid gap-8">
                        {workflows.map((flow, index) => (
                            <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{flow.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 mb-8">{flow.description}</p>

                                <div className="flex flex-wrap items-center gap-4">
                                    {flow.steps.map((step, stepIndex) => (
                                        <React.Fragment key={step.title}>
                                            <Link to={step.link} className="flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500/50 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors group">
                                                <div className={`p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm ${step.color}`}>
                                                    <ClientOnly>
                                                        <span className="material-symbols-outlined text-2xl">{step.icon}</span>
                                                    </ClientOnly>
                                                </div>
                                                <span className="font-semibold text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{step.title}</span>
                                            </Link>

                                            {/* Connector Arrow if not last item */}
                                            {stepIndex < flow.steps.length - 1 && (
                                                <div className="text-slate-300 dark:text-slate-600">
                                                    <ClientOnly>
                                                        <span className="material-symbols-outlined text-2xl">arrow_forward</span>
                                                    </ClientOnly>
                                                </div>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Workflows;
