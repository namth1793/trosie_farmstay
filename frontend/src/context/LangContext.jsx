import React, { createContext, useContext, useEffect, useState } from 'react';
import vi from '../i18n/vi';
import en from '../i18n/en';

const DICTS = { vi, en };
const LangContext = createContext();

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('trosie_lang') || 'vi');
  const [dbContent, setDbContent] = useState({});

  useEffect(() => {
    fetch(`/api/content?lang=${lang}`)
      .then(r => r.json())
      .then(setDbContent)
      .catch(() => {});
  }, [lang]);

  // t(dotKey) — checks DB override first, falls back to i18n
  const t = (key) => {
    const parts = key.split('.');
    const section = parts[0];
    const subkey = parts.slice(1).join('.');

    if (subkey && dbContent[section]?.[subkey] !== undefined) {
      const val = dbContent[section][subkey];
      if (typeof val === 'string' && (val.startsWith('[') || val.startsWith('{'))) {
        try { return JSON.parse(val); } catch {}
      }
      return val;
    }

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
