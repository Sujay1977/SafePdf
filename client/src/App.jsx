import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

import { Analytics } from '@vercel/analytics/react';

function App() {
    const location = useLocation();

    useEffect(() => {
        if (import.meta.env.PROD) {
            ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
        }
    }, [location]);

    return (
        <>
            <Outlet />
            <Analytics />
        </>
    );
}

export default App;
