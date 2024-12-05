'use client';

import React, { createContext, useContext, useState } from 'react';
import i18n from '../i18n';

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');

    const changeLanguage = (lang) => {
        setLanguage(lang);
        i18n.changeLanguage(lang);
    };

    return (
        <TranslationContext.Provider value={{ language, changeLanguage }}>
            {children}
        </TranslationContext.Provider>
    );
};

export const useTranslationContext = () => useContext(TranslationContext);
