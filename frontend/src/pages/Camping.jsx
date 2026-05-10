import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';

const CAMPING_GALLERY = [
  '/images/activities/camping/DSCF8235.JPG',
  '/images/activities/camping/DSCF8247.JPG',
  '/images/activities/camping/DSCF8258.JPG',
  '/images/activities/camping/DSCF8260.JPG',
  '/images/activities/camping/DSCF8261.JPG',
  '/images/activities/camping/DSCF8265.JPG',
  '/images/activities/camping/DSCF8273.JPG',
  '/images/activities/camping/DSCF8275.JPG',
  '/images/activities/camping/DSCF8285.JPG',
  '/images/activities/camping/DSCF0852.JPG',
  '/images/activities/camping/DSCF0865.JPG',
  '/images/activities/camping/DSCF8260.JPG',
];

const NOTE_ICONS = ['📅', '🕒', '🍖', '⛅'];

export default function Camping() {
  const { t } = useLang();
  const features = t('camping.features');
  const priceIncludes = t('camping.priceIncludes');
  const notes = t('camping.notes');

  return (
    <div>
      <div className="page-hero" style={{ height: '420px' }}>
        <div className="page-hero-bg"
          style={{ backgroundImage: 'url(/images/activities/camping/DSCF8273.JPG)' }} />
        <div className="page-hero-overlay" />
        <div className="relative z-10 text-center px-4">
          <span className="section-subtitle">{t('camping.heroSub')}</span>
          <h1 className="font-serif text-3xl md:text-5xl text-white mb-4">{t('camping.heroTitle')}</h1>
          <p className="text-white/75 text-sm max-w-md mx-auto">{t('camping.heroDesc')}</p>
        </div>
      </div>

      {/* Back link */}
      <div className="bg-cream border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3">
          <Link to="/luu-tru" className="text-xs text-gray-500 hover:text-gold transition-colors tracking-wide">
            {t('camping.backBtn')}
          </Link>
        </div>
      </div>

      {/* Intro */}
      <section className="py-12 md:py-16 bg-cream">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="section-subtitle">{t('camping.introSub')}</span>
          <h2 className="section-title mb-4">{t('camping.introTitle')}<br /><em>{t('camping.introTitleEm')}</em></h2>
          <div className="w-12 h-0.5 bg-gold mx-auto mb-6" />
          <p className="text-gray-600 leading-relaxed">{t('camping.introDesc')}</p>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <span className="section-subtitle">{t('camping.priceSub')}</span>
              <h2 className="section-title mb-6">{t('camping.priceTitle')}</h2>
              <div className="bg-forest-900 p-6 md:p-8 text-center mb-6">
                <div className="font-serif text-5xl md:text-6xl text-gold mb-2">{t('camping.price')}</div>
                <div className="text-gray-300 text-sm">{t('camping.priceUnit')}</div>
                <div className="text-gray-400 text-xs mt-1">{t('camping.priceCapacity')}</div>
              </div>
              <h4 className="text-forest-900 text-xs font-bold tracking-widest uppercase mb-3">Bao gồm:</h4>
              <ul className="space-y-2">
                {Array.isArray(priceIncludes) && priceIncludes.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-gold shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="section-subtitle">{t('camping.featuresSub')}</span>
              <h2 className="section-title mb-6">{t('camping.featuresTitle')}</h2>
              <div className="space-y-4">
                {Array.isArray(features) && features.map((f, i) => (
                  <div key={i} className="flex gap-4 items-start border-b border-gray-100 pb-4 last:border-0">
                    <div className="w-10 h-10 bg-forest-100 flex items-center justify-center text-lg shrink-0 font-serif text-gold font-bold">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <div className="text-[10px] font-bold tracking-widest uppercase text-gold mb-1">{f.time}</div>
                      <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-10 md:py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <span className="section-subtitle">{t('camping.gallerySub')}</span>
            <h2 className="section-title">{t('camping.galleryTitle')}</h2>
            <div className="w-12 h-0.5 bg-gold mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {CAMPING_GALLERY.map((img, i) => (
              <div key={i} className="img-zoom aspect-square overflow-hidden">
                <img src={img} alt={`Camping ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notes */}
      <section className="py-10 md:py-14 bg-forest-900">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-8">
            <span className="section-subtitle">{t('camping.noteSub')}</span>
            <h2 className="font-serif text-2xl text-white">{t('camping.noteTitle')}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.isArray(notes) && notes.map((note, i) => (
              <div key={i} className="bg-forest-800 p-4 flex items-start gap-3">
                <span className="text-xl shrink-0">{NOTE_ICONS[i]}</span>
                <p className="text-gray-300 text-sm leading-relaxed">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-cream text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="section-title mb-4">{t('camping.ctaTitle')}</h2>
          <p className="text-gray-600 text-sm mb-8">{t('camping.ctaDesc')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:0961393370" className="btn-primary">{t('camping.ctaCall')}</a>
            <Link to="/lien-he" className="btn-outline">{t('camping.ctaMsg')}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
