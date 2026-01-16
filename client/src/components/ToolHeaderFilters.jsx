import React from 'react';

const ToolHeaderFilters = ({ activeCategory, onCategoryChange }) => {
    const categories = [
        "All",
        "Organize PDF",
        "Optimize PDF",
        "Convert PDF",
        "PDF Security"
    ];

    return (
        <section className="pt-8 pb-4 w-full px-4 md:px-10">
            <div className="max-w-7xl mx-auto flex flex-col items-center">

                {/* Filter Pills Container */}
                <div className="w-full flex justify-center">
                    <div className="flex gap-3 overflow-x-auto pb-4 px-4 w-full md:w-auto scrollbar-hide -mx-4 md:mx-0 snap-x">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => onCategoryChange(category)}
                                className={`
                                    whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-200 snap-center
                                    ${activeCategory === category
                                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md transform scale-105'
                                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700'}
                                `}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ToolHeaderFilters;
