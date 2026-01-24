import React from 'react';

const ToolHeroIcon = ({ icon, theme, title }) => {
    // Default fallback if theme is missing
    const safeTheme = theme || { from: '#e0c3fc', to: '#8ec5fc', shadow: 'rgba(142, 197, 252, 0.4)' };

    return (
        <div // turbo
            className="w-20 h-20 mb-4 rounded-2xl flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110"
            style={{
                background: `linear-gradient(135deg, ${safeTheme.from} 0%, ${safeTheme.to} 100%)`,
                boxShadow: `0 10px 25px -5px ${safeTheme.shadow}`
            }}
        >
            <span className="material-symbols-outlined text-4xl text-white">
                {icon || 'cloud_upload'}
            </span>
        </div>
    );
};

export default ToolHeroIcon;
