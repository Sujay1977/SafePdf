import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';
import { toolThemes } from '../utils/theme';

const Layout = ({ children }) => {
    const location = useLocation();
    const currentTheme = toolThemes[location.pathname];
    const pageBg = currentTheme ? currentTheme.fadedBg : undefined;

    return (
        <div
            className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-display transition-colors duration-500"
            style={{
                backgroundColor: pageBg || ''
            }}
        >
            {/* If no pageBg, fall back to class names. If pageBg exists, it overrides specific inline background. 
                But to ensure fallback works for home/others, we keep the default classes and let inline override.
                However, inline style for bg overrides tailwind classes usually. 
                So if pageBg is undefined, we want standard classes. */}
            <div className={`absolute inset-0 -z-10 ${!pageBg ? 'bg-background-light dark:bg-background-dark' : ''}`}></div>

            <Header />
            <main className="flex-grow flex flex-col w-full">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
