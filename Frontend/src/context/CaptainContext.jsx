import { createContext, useState, useEffect, useContext, useCallback } from 'react';

export const CaptainDataContext = createContext();

export const useCaptainContext = () => {
    const context = useContext(CaptainDataContext);
    if (!context) {
        throw new Error('useCaptainContext must be used within a CaptainContext Provider');
    }
    return context;
};

const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState(() => {
        try {
            const savedCaptain = localStorage.getItem('captain');
            return savedCaptain ? JSON.parse(savedCaptain) : null;
        } catch (error) {
            console.error('Error parsing captain data:', error);
            return null;
        }
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Save to localStorage whenever captain changes
    useEffect(() => {
        if (captain && Object.keys(captain).length > 0) {
            localStorage.setItem('captain', JSON.stringify(captain));
        }
    }, [captain]);

    const updateCaptain = useCallback((captainData) => {
        setCaptain(captainData);
    }, []);

    const logout = useCallback(() => {
        setCaptain(null);
        localStorage.removeItem('captain');
        localStorage.removeItem('token');
    }, []);

    const value = {
        captain,
        setCaptain,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateCaptain,
        logout
    };

    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainContext;
