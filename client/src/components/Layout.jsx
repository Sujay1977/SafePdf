import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display">
            <Header />
            <main className="flex-grow flex flex-col w-full">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
