import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './routes.jsx'
import './index.css'
import ReactGA from 'react-ga4'

if (import.meta.env.PROD) {
    ReactGA.initialize('G-SV9Q7DEW95');
}

const router = createBrowserRouter(routes);

const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
    ReactDOM.hydrateRoot(rootElement, (
        <React.StrictMode>
            <HelmetProvider>
                <RouterProvider router={router} />
            </HelmetProvider>
        </React.StrictMode>
    ));
} else {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <HelmetProvider>
                <RouterProvider router={router} />
            </HelmetProvider>
        </React.StrictMode>,
    );
}
