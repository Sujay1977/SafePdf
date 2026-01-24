export const toolThemes = {
    // Organize / Blue & Purple
    '/merge': {
        from: '#4facfe',
        to: '#00f2fe',
        shadow: 'rgba(7, 13, 165, 0.4)',
        fadedBg: '#eff6ff', // blue-50
        borderColor: 'rgba(79, 172, 254, 0.2)',
        textColor: '#1e3a8a' // blue-900
    },
    '/split': {
        from: '#43e97b',
        to: '#38f9d7',
        shadow: 'rgba(67, 233, 123, 0.4)',
        fadedBg: '#f0fdf4', // green-50
        borderColor: 'rgba(67, 233, 123, 0.2)',
        textColor: '#14532d' // green-900
    },
    '/organize': {
        from: '#667eea',
        to: '#764ba2',
        shadow: 'rgba(102, 126, 234, 0.4)',
        fadedBg: '#faf5ff', // purple-50
        borderColor: 'rgba(102, 126, 234, 0.2)',
        textColor: '#581c87' // purple-900
    },
    '/rotate': {
        from: '#89f7fe',
        to: '#66a6ff',
        shadow: 'rgba(102, 166, 255, 0.4)',
        fadedBg: '#eff6ff', // blue-50
        borderColor: 'rgba(102, 166, 255, 0.2)',
        textColor: '#1e40af' // blue-800
    },
    '/edit': {
        from: '#c471f5',
        to: '#fa71cd',
        shadow: 'rgba(196, 113, 245, 0.4)',
        fadedBg: '#fdf4ff', // fuchsia-50
        borderColor: 'rgba(196, 113, 245, 0.2)',
        textColor: '#701a75' // fuchsia-900
    },

    // Optimize & Convert / Orange & Red & Pink
    '/compress': {
        from: '#ff9a9e',
        to: '#fecfef',
        shadow: 'rgba(255, 154, 158, 0.4)',
        fadedBg: '#fff1f2', // rose-50
        borderColor: 'rgba(255, 154, 158, 0.2)',
        textColor: '#881337' // rose-900
    },
    '/pdf-to-word': {
        from: '#f6d365',
        to: '#fda085',
        shadow: 'rgba(246, 211, 101, 0.4)',
        fadedBg: '#fff7ed', // orange-50
        borderColor: 'rgba(253, 160, 133, 0.2)',
        textColor: '#7c2d12' // orange-900
    },
    '/pdf-to-jpg': {
        from: '#ff758c',
        to: '#ff7eb3',
        shadow: 'rgba(255, 117, 140, 0.4)',
        fadedBg: '#fff1f2', // rose-50
        borderColor: 'rgba(255, 117, 140, 0.2)',
        textColor: '#9f1239' // rose-800
    },
    '/jpg-to-pdf': {
        from: '#fbc2eb',
        to: '#a6c1ee',
        shadow: 'rgba(251, 194, 235, 0.4)',
        fadedBg: '#fdf2f8', // pink-50
        borderColor: 'rgba(251, 194, 235, 0.2)',
        textColor: '#831843' // pink-900
    },

    // Security / Green & Teal & Cyan
    '/protect': {
        from: '#0ba360',
        to: '#3cba92',
        shadow: 'rgba(11, 163, 96, 0.4)',
        fadedBg: '#ecfdf5', // emerald-50
        borderColor: 'rgba(11, 163, 96, 0.2)',
        textColor: '#064e3b' // emerald-900
    },
    '/unlock': {
        from: '#00c6fb',
        to: '#005bea',
        shadow: 'rgba(0, 198, 251, 0.4)',
        fadedBg: '#f0f9ff', // sky-50
        borderColor: 'rgba(0, 198, 251, 0.2)',
        textColor: '#0c4a6e' // sky-900
    },
    '/sign': {
        from: '#b1f4cf',
        to: '#9890e3',
        shadow: 'rgba(152, 144, 227, 0.4)',
        fadedBg: '#f5f3ff', // violet-50
        borderColor: 'rgba(152, 144, 227, 0.2)',
        textColor: '#4c1d95' // violet-900
    }
};

export const getToolTheme = (link) => {
    return toolThemes[link] || {
        from: '#e0c3fc',
        to: '#8ec5fc',
        shadow: 'rgba(142, 197, 252, 0.4)',
        fadedBg: '#f8fafc',
        borderColor: '#e2e8f0',
        textColor: '#0f172a'
    };
};
