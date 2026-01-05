import React from 'react';

const Placeholder = ({ title }) => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-800 dark:text-white">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p>This feature is coming soon.</p>
    </div>
);

export default Placeholder;
