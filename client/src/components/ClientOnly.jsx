import { useState, useEffect } from 'react';

const ClientOnly = ({ children }) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null; // Or a placeholder if needed, but for icons, null avoids text flash
    }

    return children;
};

export default ClientOnly;
