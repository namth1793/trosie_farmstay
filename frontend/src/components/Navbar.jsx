import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../context/LangContext';

export default function Navbar() {
  const { lang, toggleLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCafe, setMobileCafe] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const NAV = [
    { label: t('nav.about'), href: '/gioi-thieu' },
    {
      label: t('nav.coffee'), href: '/ca-phe',
      children: [
        { label: t('nav.coffeePage'), href: '/ca-phe' },
        { label: t('nav.coffeeShop'), href: '/ca-phe/shop' },
      ],
    },
    { label: t('nav.stay'), href: '/luu-tru' },
    { label: t('nav.restaurant'), href: '/nha-hang' },
    { label: t('nav.sup'), href: '/cheo-sup' },
    { label: t('nav.roseGarden'), href: '/vuon-hoa-hong' },
    { label: t('nav.activities'), href: '/hoat-dong' },
    { label: t('nav.blog'), href: '/tin-tuc' },
    { label: t('nav.contact'), href: '/lien-he' },
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setMobileOpen(false); setMobileCafe(false); }, [location]);

  const solid = scrolled || !isHome;
  const tc = solid ? 'text-forest-900 hover:text-gold' : 'text-white/90 hover:text-gold';
  const bg = solid ? 'bg-white shadow-md' : 'bg-transparent';

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${bg}`}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link to="/" className={`flex items-center gap-2 font-serif ${solid ? 'text-forest-900' : 'text-white'}`}>
            <svg className="w-8 h-8 text-gold" viewBox="0 0 40 40" fill="currentColor">
              <path d="M20 4C10.6 4 3 11.6 3 21c0 6 3.1 11.3 7.8 14.4L20 41l9.2-5.6C33.9 32.3 37 27 37 21 37 11.6 29.4 4 20 4zm0 4c2.8 0 5.4 1 7.4 2.6-1-.4-2.2-.6-3.4-.6-4 0-7.2 2.7-7.2 6 0 2.2 1.3 4.1 3.3 5.2L20 23l-.1-1.8C17.9 20 16.8 18.2 16.8 16c0-3.3-3.2-6-7.2-6-.2 0-.3 0-.5.1C10.6 7.1 15 8 20 8z"/>
              <circle cx="20" cy="16" r="3" opacity=".4"/>
            </svg>
            <div>
              <div className="text-sm font-bold tracking-widest uppercase leading-none">Trosie</div>
              <div className="text-[10px] tracking-widest opacity-70 font-sans">GARDEN KHE SANH</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-0">
            {NAV.map(item =>
              item.children ? (
                <div key={item.label} className="relative group">
                  <Link to={item.href} className={`flex items-center gap-1 px-2.5 py-2 text-[10px] font-semibold tracking-widest uppercase transition-colors ${tc}`}>
                    {item.label}
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                  <div className="absolute top-full left-0 bg-white shadow-xl min-w-44 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pt-1">
                    {item.children.map(c => (
                      <Link key={c.href} to={c.href}
                        className="block px-5 py-3 text-[10px] tracking-widest uppercase text-forest-800 hover:bg-forest-50 hover:text-gold border-b border-gray-50 last:border-0 transition-colors">
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={item.label} to={item.href}
                  className={`px-2.5 py-2 text-[10px] font-semibold tracking-widest uppercase transition-colors ${tc}`}>
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <button
              onClick={toggleLang}
              title={lang === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
              className={`flex items-center gap-1 px-2.5 py-1.5 border text-[10px] font-bold tracking-wider uppercase transition-all ${
                solid
                  ? 'border-forest-300 text-forest-700 hover:border-gold hover:text-gold'
                  : 'border-white/40 text-white/80 hover:border-gold hover:text-gold'
              }`}
            >
              <span className={lang === 'vi' ? 'text-gold' : 'opacity-50'}>VI</span>
              <span className="opacity-30">|</span>
              <span className={lang === 'en' ? 'text-gold' : 'opacity-50'}>EN</span>
            </button>

            <a href="tel:0961393370"
              className={`hidden xl:flex items-center gap-1.5 text-[10px] font-semibold tracking-wide ${solid ? 'text-forest-700' : 'text-white/80'}`}>
              <svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              0961 393 370
            </a>
            <Link to="/lien-he"
              className="hidden xl:block bg-gold hover:bg-gold-dark text-white text-[10px] font-semibold tracking-widest uppercase px-4 py-2.5 transition-colors">
              {t('nav.bookNow')}
            </Link>
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className={`xl:hidden p-2 ${solid ? 'text-forest-900' : 'text-white'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="xl:hidden bg-white shadow-xl border-t border-gray-100 max-h-[80vh] overflow-y-auto">
          {NAV.map(item => (
            <div key={item.label}>
              {item.children ? (
                <>
                  <button onClick={() => setMobileCafe(!mobileCafe)}
                    className="w-full flex items-center justify-between px-6 py-4 text-[11px] font-semibold tracking-widest uppercase text-forest-800 hover:bg-forest-50 border-b border-gray-100">
                    {item.label}
                    <svg className={`w-3 h-3 transition-transform ${mobileCafe ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {mobileCafe && item.children.map(c => (
                    <Link key={c.href} to={c.href}
                      className="block pl-10 pr-6 py-3 text-[11px] tracking-widest uppercase text-gray-600 hover:bg-forest-50 hover:text-gold border-b border-gray-50">
                      — {c.label}
                    </Link>
                  ))}
                </>
              ) : (
                <Link to={item.href}
                  className="block px-6 py-4 text-[11px] font-semibold tracking-widest uppercase text-forest-800 hover:bg-forest-50 hover:text-gold border-b border-gray-100">
                  {item.label}
                </Link>
              )}
            </div>
          ))}
          <div className="p-4 flex flex-col gap-3">
            <button onClick={toggleLang}
              className="text-center text-[11px] font-bold tracking-widest uppercase text-forest-700 border border-forest-200 py-2.5 hover:border-gold hover:text-gold transition-colors">
              {lang === 'vi' ? '🌐 Switch to English' : '🌐 Chuyển sang Tiếng Việt'}
            </button>
            <a href="tel:0961393370" className="text-center text-sm text-forest-700 font-semibold py-2">📞 0961 393 370</a>
            <Link to="/lien-he" className="btn-gold w-full text-center block">{t('nav.bookNow')}</Link>
          </div>
        </div>
      )}
    </header>
  );
}
