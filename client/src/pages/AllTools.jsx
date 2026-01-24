import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import ClientOnly from '../components/ClientOnly';
import { tools } from '../utils/toolsData';
import { getToolTheme } from '../utils/theme';

const AllTools = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const navigate = useNavigate();

    // Extract unique categories
    const categories = ["All", ...new Set(tools.map(tool => tool.category))];

    const filteredTools = tools.filter(tool => {
        const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === "All" || tool.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            const matchedTool = tools.find(tool =>
                tool.title.toLowerCase().includes(query) ||
                tool.description.toLowerCase().includes(query)
            );
            if (matchedTool) {
                navigate(matchedTool.link);
            }
        }
    };

    return (
        <div className="flex flex-col w-full min-h-screen bg-slate-50 dark:bg-slate-900">
            <SEO
                title="All PDF Tools | SafePDF"
                description="Explore our complete collection of free, secure, and client-side PDF tools. Merge, Split, Compress, Convert, and more."
            />

            <div className="max-w-6xl mx-auto px-4 md:px-10 py-12 w-full">
                {/* Integrated Header & Search */}
                <div className="flex flex-col lg:flex-row justify-between items-end gap-6 mb-8">
                    <div className="w-full lg:w-auto text-left">
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-1">
                            All Tools
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 text-base">
                            Everything you need to manage your PDF files.
                        </p>
                    </div>

                    <div className="w-full lg:w-96 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <ClientOnly>
                                <span className="material-symbols-outlined text-xl">search</span>
                            </ClientOnly>
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-4 py-2.5 bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-medium"
                            placeholder="Search tools..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                        />
                    </div>
                </div>

                {/* Category Navigation - Faded Pills */}
                <div className="flex flex-wrap items-center gap-3 mb-10">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`
                                px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border
                                ${activeCategory === category
                                    ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800'
                                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700 dark:hover:bg-slate-700'}
                            `}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Tools Grid - Clean & Standard */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTools.map((tool) => {
                        const theme = getToolTheme(tool.link);
                        return (
                            <Link
                                to={tool.link}
                                key={tool.title}
                                style={{
                                    '--theme-shadow': theme.shadow,
                                    '--theme-text': theme.textColor
                                }}
                                className="group relative flex flex-col gap-5 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-[0_20px_40px_-5px_var(--theme-shadow)] transition-all duration-300 transform hover:-translate-y-2"
                            >
                                {/* Content */}
                                <div className="relative z-10 flex flex-col gap-5">
                                    <div
                                        style={{
                                            background: `linear-gradient(135deg, ${theme.from} 0%, ${theme.to} 100%)`
                                        }}
                                        className="w-14 h-14 flex items-center justify-center rounded-2xl shadow-md group-hover:scale-110 transition-transform duration-300 ring-1 ring-white/20"
                                    >
                                        <ClientOnly>
                                            <span className="material-symbols-outlined text-3xl text-white font-medium">{tool.icon}</span>
                                        </ClientOnly>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h4
                                            className="text-xl font-bold text-slate-900 dark:text-white transition-colors group-hover:text-[var(--theme-text)]"
                                        >
                                            {tool.title}
                                        </h4>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-2">
                                            {tool.description}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
                {filteredTools.length === 0 && (
                    <div className="text-center py-20 text-slate-500">
                        No tools found matching "{searchQuery}"
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllTools;
