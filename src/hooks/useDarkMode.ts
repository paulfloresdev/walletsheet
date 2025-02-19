import { useState, useEffect } from 'react';

const useDarkMode = (): boolean => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    useEffect(() => {
        //Creates MediaQueryList object to detect dark mode
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        // Init state
        setIsDarkMode(darkModeMediaQuery.matches);

        // Func to manage theme change
        const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);

        // Add changes listener
        darkModeMediaQuery.addEventListener('change', handleChange);

        // Clean listener
        return () => darkModeMediaQuery.removeEventListener('change', handleChange);
    }, []);

    return isDarkMode;
};

export default useDarkMode;
