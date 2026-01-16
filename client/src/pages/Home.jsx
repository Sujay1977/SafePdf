import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PrivacySection from '../components/PrivacySection';
import WhySafePdf from '../components/WhySafePdf';
import ToolHeaderFilters from '../components/ToolHeaderFilters';

const tools = [
    {
        title: "Merge PDF",
        description: "Combine multiple PDFs into a single unified document in the order you want.",
        icon: "call_merge",
        link: "/merge",
        category: "Organize PDF"
    },
    {
        title: "Split PDF",
        description: "Separate one page or a whole set for easy conversion into independent PDF files.",
        icon: "call_split",
        link: "/split",
        category: "Organize PDF"
    },
    {
        title: "Compress PDF",
        description: "Reduce file size while optimizing for maximal PDF quality.",
        icon: "compress",
        link: "/compress",
        category: "Optimize PDF"
    },
    {
        title: "PDF to Word",
        description: "Convert your PDF files to editable Word documents (DOC, DOCX).",
        icon: "article",
        link: "/pdf-to-word",
        category: "Convert PDF"
    },
    {
        title: "Protect PDF",
        description: "Encrypt your PDF file with a password to ensure security.",
        icon: "lock",
        link: "/protect",
        category: "PDF Security"
    },
    {
        title: "Unlock PDF",
        description: "Remove password security from PDFs, making them free to use.",
        icon: "lock_open",
        link: "/unlock",
        category: "PDF Security"
    },
    {
        title: "Rotate PDF",
        description: "Rotate your PDF pages. You can select specific pages to rotate.",
        icon: "rotate_right",
        link: "/rotate",
        category: "Organize PDF"
    },
    {
        title: "Organize PDF",
        description: "Sort, add, and delete PDF pages. Drag and drop to reorder.",
        icon: "sort",
        link: "/organize",
        category: "Organize PDF"
    },
    {
        title: "PDF to JPG",
        description: "Convert each PDF page into a JPG or extract all images contained in a PDF.",
        icon: "image",
        link: "/pdf-to-jpg",
        category: "Convert PDF"
    },
    {
        title: "JPG to PDF",
        description: "Convert your images (JPG, PNG, BMP, GIF, TIFF) to PDF files.",
        icon: "picture_as_pdf",
        link: "/jpg-to-pdf",
        category: "Convert PDF"
    },
    {
        title: "Sign PDF",
        description: "Sign your PDF yourself or request electronic signatures from others.",
        icon: "draw",
        link: "/sign",
        category: "PDF Security"
    },
    {
        title: "Edit PDF",
        description: "Add text, shapes, comments and highlights to your PDF file.",
        icon: "edit_document",
        link: "/edit",
        category: "Organize PDF"
    }
];

const Home = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const navigate = useNavigate();
    const toolsRef = useRef(null);

    const scrollToTools = () => {
        const element = document.getElementById('all-tools');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

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
        <div className="flex flex-col w-full">
            {/* Hero Section */}
            <div className="w-full relative overflow-hidden bg-slate-50 dark:bg-slate-900 border-b border-slate-200/50 dark:border-slate-800/50">
                {/* Background Details */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/50 dark:bg-blue-900/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/4 pointer-events-none" />

                <div className="max-w-[1350px] mx-auto px-4 md:px-8 py-16 md:py-24 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                        {/* 1. Left Column: Content */}
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-8">

                            {/* Trust Badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <span className="text-[11px] font-bold tracking-widest text-slate-600 dark:text-slate-300 uppercase">100% Client-Side Privacy</span>
                            </div>

                            {/* Headlines - EXACT COPY MANDATED */}
                            <div className="space-y-6">
                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                                    Your PDFs,<br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                                        Your Privacy.
                                    </span>
                                </h1>
                                <p className="text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
                                    Free, secure, and client-side PDF tools. Your files are processed in your browser and never uploaded to any server.
                                </p>
                            </div>

                            {/* Call to Action */}
                            <button
                                onClick={scrollToTools}
                                className="group flex items-center justify-center gap-3 h-14 px-8 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-lg font-bold shadow-xl shadow-slate-900/10 hover:shadow-2xl hover:shadow-slate-900/20 hover:-translate-y-1 transition-all duration-300 min-w-[200px]"
                            >
                                Get Started
                                <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </button>
                        </div>

                        {/* 2. Right Column: Security Portal Animation */}
                        <div className="relative flex items-center justify-center lg:justify-end">
                            <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
                                {/* Pulsing Rings */}
                                <div className="absolute inset-0 border-[3px] border-blue-500/10 rounded-full animate-[spin_10s_linear_infinite]" />
                                <div className="absolute inset-8 border border-blue-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                                <div className="absolute inset-16 border border-blue-500/30 rounded-full animate-[ping_3s_ease-in-out_infinite] opacity-20" />

                                {/* Central Icon Container */}
                                <div className="absolute inset-0 m-auto w-32 h-32 bg-white dark:bg-slate-800 rounded-3xl shadow-2xl flex items-center justify-center z-10 border border-slate-100 dark:border-slate-700">
                                    <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
                                        <span className="material-symbols-outlined text-4xl text-white">lock</span>
                                        {/* Status Checkmark */}
                                        <div className="absolute -top-3 -right-3 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-slate-800 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-sm text-white font-bold">check</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Elements */}
                                <div className="absolute top-10 right-10 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg shadow-lg border border-slate-100 dark:border-slate-700 animate-bounce delay-700">
                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                        Encrypted
                                    </span>
                                </div>
                                <div className="absolute bottom-10 left-10 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg shadow-lg border border-slate-100 dark:border-slate-700 animate-bounce delay-1000">
                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                        Local
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="w-full bg-background-light dark:bg-background-dark -mt-6 z-20 relative">
                <div className="max-w-[800px] mx-auto px-4 md:px-10">
                    <div className="bg-white dark:bg-slate-800 p-2 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                        <label className="flex items-center h-14 w-full">
                            <div className="text-slate-400 dark:text-slate-500 pl-4 pr-2 flex items-center justify-center">
                                <span className="material-symbols-outlined text-2xl">search</span>
                            </div>
                            <input
                                className="flex w-full flex-1 bg-transparent border-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-lg font-medium focus:outline-0 focus:ring-0 px-2 h-full"
                                placeholder="Search for PDF tools (e.g. Merge, Split)..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleSearch}
                            />
                        </label>
                    </div>
                </div>
            </div>

            {/* Tools Grid Section */}
            <div ref={toolsRef} id="all-tools" className="w-full bg-background-light dark:bg-background-dark pt-4">

                <ToolHeaderFilters
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                />

                <div className="layout-container flex grow flex-col w-full max-w-[1280px] mx-auto px-4 md:px-10 pb-20">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                        {filteredTools.map((tool) => (
                            <Link to={tool.link} key={tool.title} className="group flex flex-col gap-4 p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500/30 dark:hover:border-blue-400/30 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-500/5 dark:bg-blue-500/10 text-primary group-hover:bg-blue-500/10 group-hover:scale-110 transition-all duration-300">
                                    <span className="material-symbols-outlined text-3xl">{tool.icon}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h4 className="text-slate-900 dark:text-white text-lg font-bold group-hover:text-primary transition-colors">{tool.title}</h4>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{tool.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                    {filteredTools.length === 0 && (
                        <div className="col-span-full py-20 text-center">
                            <p className="text-slate-500 text-lg">No tools found matching your criteria.</p>
                        </div>
                    )}
                </div>

                {/* Features Section */}
                <PrivacySection />
                <WhySafePdf />
            </div>
        </div>
    );
};

export default Home;
