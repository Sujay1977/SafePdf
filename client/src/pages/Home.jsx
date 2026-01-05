import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const tools = [
    {
        title: "Merge PDF",
        description: "Combine multiple PDFs into a single unified document in the order you want.",
        icon: "call_merge",
        link: "/merge"
    },
    {
        title: "Split PDF",
        description: "Separate one page or a whole set for easy conversion into independent PDF files.",
        icon: "call_split",
        link: "/split"
    },
    {
        title: "Compress PDF",
        description: "Reduce file size while optimizing for maximal PDF quality.",
        icon: "compress",
        link: "/compress"
    },
    {
        title: "PDF to Word",
        description: "Convert your PDF files to editable Word documents (DOC, DOCX).",
        icon: "article",
        link: "/pdf-to-word"
    },
    {
        title: "Protect PDF",
        description: "Encrypt your PDF file with a password to ensure security.",
        icon: "lock",
        link: "/protect"
    },
    {
        title: "Unlock PDF",
        description: "Remove password security from PDFs, making them free to use.",
        icon: "lock_open",
        link: "/unlock"
    },
    {
        title: "Rotate PDF",
        description: "Rotate your PDF pages. You can select specific pages to rotate.",
        icon: "rotate_right",
        link: "/rotate"
    },
    {
        title: "Organize PDF",
        description: "Sort, add, and delete PDF pages. Drag and drop to reorder.",
        icon: "sort",
        link: "/organize"
    },
    {
        title: "PDF to JPG",
        description: "Convert each PDF page into a JPG or extract all images contained in a PDF.",
        icon: "image",
        link: "/pdf-to-jpg"
    },
    {
        title: "JPG to PDF",
        description: "Convert your images (JPG, PNG, BMP, GIF, TIFF) to PDF files.",
        icon: "picture_as_pdf",
        link: "/jpg-to-pdf"
    },
    {
        title: "Sign PDF",
        description: "Sign your PDF yourself or request electronic signatures from others.",
        icon: "draw",
        link: "/sign"
    },
    {
        title: "Edit PDF",
        description: "Add text, shapes, comments and highlights to your PDF file.",
        icon: "edit_document",
        link: "/edit"
    }
];

const Home = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

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
            <div className="w-full bg-background-light dark:bg-background-dark">
                <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-8 md:py-12">
                    <div className="@container">
                        <div
                            className="flex min-h-[400px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-8 md:p-12 relative overflow-hidden"
                            style={{
                                backgroundImage: `linear-gradient(135deg, rgba(19, 127, 236, 0.9) 0%, rgba(16, 25, 34, 0.8) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDIs0tUHazUU1kt4ipuebzCr9o7ob6hyCGQuWVGTY4yY4CKDXD3FGqNzCLiVvqOdvE2fSZ10HAGrjQzZVYvg_UGq9KucPf6NfBRaq-TjI5WodnAwbgw0Avk6vSYZ5Vk98AaYkvpNdiULc78cvmBmNo4gMtk0HZaCJ9Idrf3scuTPjKvzOUbAMrvdU_PBP5K81FcobKB5cdSiQU3EWZpMgAzsIeIhMo4JwN10Q3bf1MpD3wDFFjF0DQrgVlKp_lUrsgnWGfvhdBCQLG-")`
                            }}
                        >
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                            <div className="flex flex-col gap-4 text-center z-10 max-w-3xl">
                                <div className="flex items-center justify-center gap-2 text-blue-100 font-medium bg-white/10 w-fit mx-auto px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                                    <span className="material-symbols-outlined text-sm">lock</span>
                                    <span className="text-xs tracking-wide uppercase">100% Client-Side Privacy</span>
                                </div>
                                <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight drop-shadow-sm">
                                    Your PDFs, Your Privacy.
                                </h1>
                                <h2 className="text-blue-100 text-lg md:text-xl font-normal leading-relaxed max-w-2xl mx-auto">
                                    Free, secure, and client-side PDF tools. Your files are processed in your browser and never uploaded to any server.
                                </h2>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 z-10 mt-4 w-full justify-center">
                                <button className="flex min-w-[140px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-white text-primary hover:bg-slate-100 text-base font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                                    <span className="truncate">Get Started</span>
                                </button>
                                <button className="flex min-w-[140px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-transparent border-2 border-white/30 text-white hover:bg-white/10 text-base font-bold transition-all backdrop-blur-sm">
                                    <span className="truncate">Learn More</span>
                                </button>
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

            {/* Tools Grid */}
            <div className="layout-container flex grow flex-col w-full max-w-[1280px] mx-auto px-4 md:px-10 py-12">
                <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-end px-2">
                        <h3 className="text-slate-900 dark:text-white text-2xl font-bold tracking-tight">Most Popular Tools</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                        {tools.map((tool) => (
                            <Link to={tool.link} key={tool.title} className="group flex flex-col gap-4 p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-lg dark:hover:shadow-primary/5 transition-all duration-300 transform hover:-translate-y-1">
                                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-3xl">{tool.icon}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h4 className="text-slate-900 dark:text-white text-lg font-bold group-hover:text-primary transition-colors">{tool.title}</h4>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{tool.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Features Section */}
                <div className="mt-24 mb-12">
                    <div className="flex flex-col gap-10 @container">
                        <div className="flex flex-col gap-4 text-center items-center">
                            <h1 className="text-slate-900 dark:text-white tracking-tight text-3xl md:text-4xl font-black leading-tight max-w-[720px]">
                                Why use PDFescape?
                            </h1>
                            <p className="text-slate-600 dark:text-slate-400 text-lg font-normal leading-normal max-w-[600px]">
                                We prioritize your privacy and efficiency. All processing happens directly on your device.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="flex flex-1 gap-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 flex-col shadow-sm">
                                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/30 text-primary">
                                    <span className="material-symbols-outlined text-3xl">shield_lock</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight">100% Client-Side</h2>
                                    <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed">
                                        Files stay on your device. Nothing is uploaded to a server, ensuring maximum confidentiality for your documents.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-1 gap-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 flex-col shadow-sm">
                                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/30 text-primary">
                                    <span className="material-symbols-outlined text-3xl">no_accounts</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight">No Sign-up Required</h2>
                                    <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed">
                                        Start working immediately without creating an account. No email, no newsletters, just tools.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-1 gap-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 flex-col shadow-sm">
                                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/30 text-primary">
                                    <span className="material-symbols-outlined text-3xl">bolt</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight">Lightning Fast</h2>
                                    <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed">
                                        Leverage your device's processing power. No waiting for uploads or downloads.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
