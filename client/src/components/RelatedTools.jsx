import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { tools as allTools } from '../utils/toolsData';

/**
 * RelatedTools - Reusable component for linking to related tools + blogs.
 * Keeps tool pages well-interlinked for SEO and UX.
 *
 * tools: Array of { to, label, desc, icon? }
 * blogs: Array of { to, label }
 * currentTool: Optional string route (e.g. "/fill-pdf-form") to auto-populate tools if not provided
 */
export default function RelatedTools({ tools = [], blogs = [], currentTool }) {
    // If tools not provided but currentTool is, pick 4 related tools from toolsData
    const resolvedTools = tools.length > 0
        ? tools
        : currentTool
            ? allTools
                .filter(t => t.link !== currentTool)
                .slice(0, 4)
                .map(t => ({
                    to: t.link,
                    label: t.title,
                    desc: t.description,
                    icon: t.icon
                }))
            : [];

    if (!resolvedTools.length && !blogs.length) return null;

    return (
        <section aria-label="Related tools and guides" className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-700">
            {resolvedTools.length > 0 && (
                <>
                    <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Related Tools</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                        {resolvedTools.map((tool) => {
                            const matched = allTools.find(t => t.link === tool.to);
                            const iconName = tool.icon || matched?.icon || 'description';

                            return (
                                <Link
                                    key={tool.to}
                                    to={tool.to}
                                    className="flex items-center gap-3 p-4 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-sm transition-all group"
                                >
                                    <span className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-700/60 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/40 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors shrink-0">
                                        <span className="material-symbols-outlined text-lg">{iconName}</span>
                                    </span>
                                    <div className="min-w-0 flex-1">
                                        <div className="font-semibold text-slate-800 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                                            {tool.label}
                                        </div>
                                        {tool.desc && (
                                            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{tool.desc}</div>
                                        )}
                                    </div>
                                    <ArrowRight size={15} className="ml-auto text-slate-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all shrink-0" />
                                </Link>
                            );
                        })}
                    </div>
                </>
            )}

            {blogs.length > 0 && (
                <>
                    <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Related Guides</h2>
                    <div className="flex flex-col gap-2">
                        {blogs.map((blog) => (
                            <Link
                                key={blog.to}
                                to={blog.to}
                                className="group inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium w-fit"
                            >
                                <ArrowRight size={14} className="text-blue-500 group-hover:translate-x-0.5 transition-transform" />
                                <span>{blog.label}</span>
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}
