import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../context/LangContext';

export default function Navbar() {
  const { lang, toggleLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const NAV = [
    { label: t('nav.about'), href: '/gioi-thieu' },
    { label: t('nav.coffee'), href: '/ca-phe' },
    { label: t('nav.stay'), href: '/luu-tru' },
    { label: t('nav.restaurant'), href: '/nha-hang' },
    { label: t('nav.sup'), href: '/cheo-sup' },
    { label: t('nav.roseGarden'), href: '/vuon-hoa-hong' },
    { label: t('nav.activities'), href: '/hoat-dong' },
    { label: t('nav.blog'), href: '/tin-tuc' },
    { label: t('nav.menu'), href: '/menu' },
    { label: t('nav.contact'), href: '/lien-he' },
    { label: t('nav.policy'), href: '/chinh-sach' },
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const solid = scrolled || !isHome;
  const tc = solid ? 'text-forest-900 hover:text-gold' : 'text-white/90 hover:text-gold';
  const bg = solid ? 'bg-white shadow-md' : 'bg-transparent';

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${bg}`}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="Trosie Garden" className="h-12 lg:h-14 w-auto object-contain" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-0">
            {NAV.map(item => (
              <Link key={item.href} to={item.href}
                className={`px-2.5 py-2 text-[10px] font-semibold tracking-widest uppercase transition-colors ${tc}`}>
                {item.label}
              </Link>
            ))}
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
        <div className="xl:hidden bg-white shadow-xl border-t border-gray-100 max-h-[85vh] overflow-y-auto overscroll-contain">
          {NAV.map(item => (
            <Link key={item.href} to={item.href}
              className="block px-6 py-4 text-[11px] font-semibold tracking-widest uppercase text-forest-800 hover:bg-forest-50 hover:text-gold border-b border-gray-100">
              {item.label}
            </Link>
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
