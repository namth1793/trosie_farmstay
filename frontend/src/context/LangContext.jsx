import React, { createContext, useContext, useState } from 'react';
import vi from '../i18n/vi';
import en from '../i18n/en';

const DICTS = { vi, en };
const LangContext = createContext();

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('trosie_lang') || 'vi');

  const t = (key) => {
    const parts = key.split('.');
    let val = DICTS[lang];
    for (const k of parts) val = val?.[k];
    return val ?? key;
  };

  const toggleLang = () => {
    const next = lang === 'vi' ? 'en' : 'vi';
    setLang(next);
    localStorage.setItem('trosie_lang', next);
  };

  return (
    <LangContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
