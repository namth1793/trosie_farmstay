import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';

export default function LuuTru() {
  const { t } = useLang();
  const homestayFeatures = t('stay.homestayFeatures');
  const campingFeatures = t('stay.campingFeatures');

  return (
    <div>
      <div className="page-hero" style={{ height: '420px' }}>
        <div className="page-hero-bg"
          style={{ backgroundImage: 'url(/images/activities/camping/DSCF8247.JPG)' }} />
        <div className="page-hero-overlay" />
        <div className="relative z-10 text-center px-4">
          <span className="section-subtitle">{t('stay.landingSub')}</span>
          <h1 className="font-serif text-3xl md:text-5xl text-white mb-4">
            {t('stay.landingTitle')}<br /><em>{t('stay.landingTitleEm')}</em>
          </h1>
        </div>
      </div>

      {/* Intro */}
      <section className="py-10 md:py-14 bg-cream">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-12 h-0.5 bg-gold mx-auto mb-6" />
          <p className="text-gray-600 leading-relaxed text-base">{t('stay.landingDesc')}</p>
        </div>
      </section>

      {/* Two options */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">

          {/* Homestay card */}
          <div className="group relative overflow-hidden">
            <div className="img-zoom">
              <img src="/images/rooms/homestay/common/682102137_122270991656137494_8915823433484477129_n.jpg"
                alt="Homestay" className="w-full h-auto md:h-[420px] md:object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="text-[10px] tracking-widest text-gold font-bold uppercase mb-2">{t('stay.homestayTag')}</div>
              <h2 className="font-serif text-2xl md:text-3xl text-white mb-3">{t('stay.homestayTitle')}</h2>
              <p className="text-white/80 text-sm leading-relaxed mb-4 hidden sm:block">{t('stay.homestayDesc')}</p>
              {Array.isArray(homestayFeatures) && (
                <ul className="space-y-1 mb-5 hidden md:block">
                  {homestayFeatures.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-white/70">
                      <svg className="w-3 h-3 text-gold shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              )}
              <Link to="/luu-tru/homestay"
                className="inline-block bg-gold hover:bg-gold-dark text-white text-[10px] font-bold tracking-widest uppercase px-6 py-3 transition-colors">
                {t('stay.homestayTitle')} →
              </Link>
            </div>
          </div>

          {/* Camping card */}
          <div className="group relative overflow-hidden">
            <div className="img-zoom">
              <img src="/images/activities/camping/DSCF8273.JPG"
                alt="Camping" className="w-full h-auto md:h-[420px] md:object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="text-[10px] tracking-widest text-gold font-bold uppercase mb-2">{t('stay.campingTag')}</div>
              <h2 className="font-serif text-2xl md:text-3xl text-white mb-3">{t('stay.campingTitle')}</h2>
              <p className="text-white/80 text-sm leading-relaxed mb-4 hidden sm:block">{t('stay.campingDesc')}</p>
              {Array.isArray(campingFeatures) && (
                <ul className="space-y-1 mb-5 hidden md:block">
                  {campingFeatures.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-white/70">
                      <svg className="w-3 h-3 text-gold shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              )}
              <Link to="/luu-tru/camping"
                className="inline-block bg-gold hover:bg-gold-dark text-white text-[10px] font-bold tracking-widest uppercase px-6 py-3 transition-colors">
                {t('stay.campingTitle')} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Night experience */}
      <section className="py-12 md:py-16 bg-forest-900">
        <div className="max-w-5xl mx-auto px-4 lg:px-8 text-center">
          <span className="section-subtitle">{t('stay.nightSub')}</span>
          <h2 className="font-serif text-3xl text-white mb-12">{t('stay.nightTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['🔥', '⛺', '🌄'].map((icon, i) => {
              const items = t('stay.nightItems');
              const item = Array.isArray(items) ? items[i] : {};
              return (
                <div key={i} className="bg-forest-800 p-6 text-center">
                  <div className="text-3xl mb-3">{icon}</div>
                  <div className="text-gold text-[10px] font-bold tracking-widest uppercase mb-2">{item.time}</div>
                  <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-cream text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="section-title mb-4">{t('stay.ctaTitle')}</h2>
          <p className="text-gray-600 text-sm mb-8">{t('stay.ctaDesc')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:0961393370" className="btn-primary">{t('stay.ctaCall')}</a>
            <Link to="/lien-he" className="btn-outline">{t('stay.ctaMsg')}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
