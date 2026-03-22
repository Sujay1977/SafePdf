import React from 'react';
import { Link } from 'react-router-dom';

/**
 * RelatedTools - Reusable component for linking to related tools + blogs.
 * Keeps tool pages well-interlinked for SEO and UX.
 *
 * tools: Array of { to, emoji, label, desc }
 * blogs: Array of { to, label }
 */
export default function RelatedTools({ tools = [], blogs = [] }) {
    if (!tools.length && !blogs.length) return null;

    return (
        <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-700">
            {tools.length > 0 && (
                <>
                    <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">🔧 Related Tools</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                        {tools.map((tool) => (
                            <Link
                                key={tool.to}
                                to={tool.to}
                                className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all group"
                            >
                                <span className="text-2xl">{tool.emoji}</span>
                                <div>
                                    <div className="font-semibold text-slate-800 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {tool.label}
                                    </div>
                                    {tool.desc && (
                                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{tool.desc}</div>
                                    )}
                                </div>
                                <span className="ml-auto text-slate-400 group-hover:text-blue-500 transition-colors text-sm">→</span>
                            </Link>
                        ))}
                    </div>
                </>
            )}

            {blogs.length > 0 && (
                <>
                    <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">📖 Related Guides</h2>
                    <div className="flex flex-col gap-2">
                        {blogs.map((blog) => (
                            <Link
                                key={blog.to}
                                to={blog.to}
                                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                            >
                                <span>→</span>
                                <span>{blog.label}</span>
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
