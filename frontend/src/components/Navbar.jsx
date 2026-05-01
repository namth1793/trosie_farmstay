import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV = [
  { label: 'Câu Chuyện', href: '/#ve-chung-toi' },
  {
    label: 'Phòng Farmstay', href: '/phong-farmstay',
    children: [
      { label: 'Phòng Farm', href: '/phong-farmstay/phong-farm' },
      { label: 'Phòng Garden', href: '/phong-farmstay/phong-garden' },
      { label: 'Phòng Mountain', href: '/phong-farmstay/phong-mountain' },
    ],
  },
  { label: 'Nhà Hàng & Bar', href: '/nha-hang-bar' },
  { label: 'Herbal Spa', href: '/herbal-spa' },
  { label: 'Hoạt Động', href: '/hoat-dong' },
  { label: 'Ưu Đãi', href: '/uu-dai' },
  { label: 'Tin Tức', href: '/tin-tuc' },
  { label: 'Liên Hệ', href: '/lien-he' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileRoom, setMobileRoom] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

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
          <Link to="/" className={`flex items-center gap-2 font-serif ${solid ? 'text-forest-900' : 'text-white'}`}>
            <svg className="w-8 h-8" viewBox="0 0 40 40" fill="currentColor">
              <path d="M20 3C11.7 3 5 9.7 5 18c0 5.5 2.8 10.4 7.1 13.3L20 37l7.9-5.7C32.2 28.4 35 23.5 35 18c0-8.3-6.7-15-15-15zm0 5c3.3 0 6.2 1.5 8.2 3.8-1.2-.5-2.6-.8-4.2-.8-4.4 0-8 2.9-8 6.5 0 2.4 1.5 4.5 3.8 5.7L20 25l-.2-1.8C17.5 22 16 19.9 16 17.5c0-3.6-3.6-6.5-8-6.5-.2 0-.4 0-.6.1C9.3 9.2 14.3 8 20 8z"/>
            </svg>
            <div>
              <div className="text-sm font-bold tracking-widest uppercase leading-none">Chày Lập</div>
              <div className="text-[10px] tracking-widest opacity-70 font-sans">FARMSTAY</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-0.5">
            {NAV.map(item =>
              item.children ? (
                <div key={item.label} className="relative group">
                  <Link to={item.href} className={`flex items-center gap-1 px-3 py-2 text-[11px] font-semibold tracking-widest uppercase transition-colors ${tc}`}>
                    {item.label}
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                  <div className="absolute top-full left-0 bg-white shadow-xl min-w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pt-1">
                    {item.children.map(c => (
                      <Link key={c.href} to={c.href}
                        className="block px-5 py-3 text-[11px] tracking-widest uppercase text-forest-800 hover:bg-forest-50 hover:text-gold border-b border-gray-50 last:border-0 transition-colors">
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={item.label} to={item.href}
                  className={`px-3 py-2 text-[11px] font-semibold tracking-widest uppercase transition-colors ${tc}`}>
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/lien-he"
              className="hidden xl:block bg-forest-700 hover:bg-forest-600 text-white text-[11px] font-semibold tracking-widest uppercase px-5 py-2.5 transition-colors">
              Đặt Phòng
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
                  <button onClick={() => setMobileRoom(!mobileRoom)}
                    className="w-full flex items-center justify-between px-6 py-4 text-[11px] font-semibold tracking-widest uppercase text-forest-800 hover:bg-forest-50 border-b border-gray-100">
                    {item.label}
                    <svg className={`w-3 h-3 transition-transform ${mobileRoom ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {mobileRoom && item.children.map(c => (
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
          <div className="p-4">
            <Link to="/lien-he" className="btn-primary w-full text-center block">Đặt Phòng Ngay</Link>
          </div>
        </div>
      )}
    </header>
  );
}
