import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';

export default function Footer() {
  const { t } = useLang();
  const [openPolicy, setOpenPolicy] = useState(null);
  const links = t('footer.links');
  const policies = t('footer.policies');

  return (
    <footer className="bg-forest-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-5 text-white">
              <svg className="w-8 h-8 text-gold" viewBox="0 0 40 40" fill="currentColor">
                <path d="M20 4C10.6 4 3 11.6 3 21c0 6 3.1 11.3 7.8 14.4L20 41l9.2-5.6C33.9 32.3 37 27 37 21 37 11.6 29.4 4 20 4zm0 4c2.8 0 5.4 1 7.4 2.6-1-.4-2.2-.6-3.4-.6-4 0-7.2 2.7-7.2 6 0 2.2 1.3 4.1 3.3 5.2L20 23l-.1-1.8C17.9 20 16.8 18.2 16.8 16c0-3.3-3.2-6-7.2-6-.2 0-.3 0-.5.1C10.6 7.1 15 8 20 8z"/>
              </svg>
              <div>
                <div className="font-bold tracking-widest uppercase text-sm font-serif">TROSIE GARDEN</div>
                <div className="text-[10px] tracking-widest text-gray-400 font-sans">KHE SANH</div>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">{t('footer.desc')}</p>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/trosiegardenks" target="_blank" rel="noreferrer"
                className="w-9 h-9 bg-forest-700 hover:bg-gold flex items-center justify-center rounded-full transition-colors" title="Facebook">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/trosiegarden.khesanh/" target="_blank" rel="noreferrer"
                className="w-9 h-9 bg-forest-700 hover:bg-gold flex items-center justify-center rounded-full transition-colors" title="Instagram">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@trosiegardenkhesanh" target="_blank" rel="noreferrer"
                className="w-9 h-9 bg-forest-700 hover:bg-gold flex items-center justify-center rounded-full transition-colors" title="TikTok">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.73a8.22 8.22 0 004.82 1.56V6.85a4.85 4.85 0 01-1.05-.16z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white text-[11px] font-bold tracking-widest uppercase mb-5">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2.5">
              {Array.isArray(links) && links.map(([label, href]) => (
                <li key={href}><Link to={href} className="text-sm text-gray-400 hover:text-gold transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-[11px] font-bold tracking-widest uppercase mb-5">{t('footer.contactTitle')}</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex gap-3">
                <svg className="w-4 h-4 text-gold mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span className="whitespace-pre-line">{t('footer.address')}</span>
              </li>
              <li className="flex gap-3">
                <svg className="w-4 h-4 text-gold mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <div>
                  <a href="tel:0345424342" className="block hover:text-gold">0345 424 342</a>
                  <a href="tel:0961393370" className="block hover:text-gold">0961 393 370</a>
                </div>
              </li>
              <li className="flex gap-3">
                <svg className="w-4 h-4 text-gold mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <a href="mailto:trosiegardenks@gmail.com" className="hover:text-gold break-all">trosiegardenks@gmail.com</a>
              </li>
              <li className="flex gap-3">
                <svg className="w-4 h-4 text-gold mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span className="whitespace-pre-line">{t('footer.hours')}</span>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-white text-[11px] font-bold tracking-widest uppercase mb-5">{t('footer.policiesTitle')}</h4>
            <div className="space-y-2">
              {Array.isArray(policies) && policies.map((p, i) => (
                <div key={i} className="border border-forest-700">
                  <button
                    onClick={() => setOpenPolicy(openPolicy === i ? null : i)}
                    className="w-full flex items-center justify-between px-4 py-3 text-xs text-gray-300 hover:text-gold transition-colors text-left">
                    <span className="font-semibold">{p.title}</span>
                    <svg className={`w-3 h-3 shrink-0 transition-transform ${openPolicy === i ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openPolicy === i && (
                    <div className="px-4 pb-4 text-xs text-gray-400 leading-relaxed whitespace-pre-line border-t border-forest-700">
                      {p.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-forest-800">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>{t('footer.copyright')}</p>
          <div className="flex gap-5">
            <a href="https://maps.app.goo.gl/ZUgWJvEWemr2TMnh7" target="_blank" rel="noreferrer" className="hover:text-gold">{t('footer.mapLink')}</a>
            <a href="mailto:trosiegardenks@gmail.com" className="hover:text-gold">{t('footer.contactLink')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
