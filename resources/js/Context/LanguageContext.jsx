import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../Utils/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('lang') || 'en';
        }
        return 'en';
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('lang', lang);
        }
    }, [lang]);

    const toggleLanguage = () => {
        setLang((prev) => (prev === 'en' ? 'id' : 'en'));
    };

    const t = translations[lang] || translations.en;

    return (
        <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
