import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';

const PROGRAM_ICONS = ['⛺', '🎨', '🌸'];
const FOR_ICONS = ['🎒', '👨‍👩‍👧', '🏢'];

export default function Activities() {
  const { t } = useLang();
  const programs = t('activities.programs');
  const forItems = t('activities.forItems');

  return (
    <div>
      <div className="page-hero" style={{ height: '400px' }}>
        <div className="page-hero-bg"
          style={{ backgroundImage: 'url(/images/activities/camping/DSCF8273.JPG)' }} />
        <div className="page-hero-overlay" />
        <div className="relative z-10 text-center">
          <span className="section-subtitle">{t('activities.heroSub')}</span>
          <h1 className="font-serif text-3xl md:text-5xl text-white">{t('activities.heroTitle')}</h1>
        </div>
      </div>

      {/* Intro */}
      <section className="py-16 bg-cream">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="section-subtitle">{t('activities.introSub')}</span>
          <h2 className="section-title mb-4">{t('activities.introTitle')}<br /><em>{t('activities.introTitleEm')}</em></h2>
          <div className="w-12 h-0.5 bg-gold mx-auto mb-6" />
          <p className="text-gray-600 leading-relaxed">{t('activities.introDesc')}</p>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <span className="section-subtitle">{t('activities.programsSub')}</span>
            <h2 className="section-title">{t('activities.programsTitle')}</h2>
            <div className="w-12 h-0.5 bg-gold mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.isArray(programs) && programs.map((p, i) => (
              <div key={i} className="group">
                <div className="img-zoom mb-5">
                  <img src={[
                    '/images/activities/camping/DSCF8260.JPG',
                    '/images/activities/ve-chai-lo/DSCF1070.JPG',
                    '/images/activities/ep-hoa-kho/DSCF0062.JPG',
                  ][i]} alt={p.label} className="w-full h-56 object-cover" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{PROGRAM_ICONS[i]}</span>
                  <h3 className="font-serif text-lg text-forest-900">{p.label}</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">{p.desc}</p>
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  <span className="text-xs text-gray-400 uppercase tracking-wide">{p.target}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activity Detail Galleries */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-20">

          {/* Vẽ chai lọ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-subtitle">{t('activities.bottleSub')}</span>
              <h2 className="section-title mb-4">{t('activities.bottleTitle')}<br /><em>{t('activities.bottleTitleEm')}</em></h2>
              <div className="w-12 h-0.5 bg-gold mb-6" />
              <p className="text-gray-600 leading-relaxed mb-4">{t('activities.bottleDesc1')}</p>
              <p className="text-gray-600 leading-relaxed">{t('activities.bottleDesc2')}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                '/images/activities/ve-chai-lo/DSCF1072.JPG',
                '/images/activities/ve-chai-lo/DSCF1074.JPG',
                '/images/activities/ve-chai-lo/DSCF1080.JPG',
                '/images/activities/ve-chai-lo/DSCF1084.JPG',
              ].map((img, i) => (
                <div key={i} className="img-zoom aspect-square overflow-hidden">
                  <img src={img} alt={`Bottle painting ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Ép hoa khô */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-3 order-2 lg:order-1">
              {[
                '/images/activities/ep-hoa-kho/DSCF0081.JPG',
                '/images/activities/ep-hoa-kho/DSCF0082.JPG',
                '/images/activities/ep-hoa-kho/DSCF0089.JPG',
                '/images/activities/ep-hoa-kho/DSCF0094.JPG',
              ].map((img, i) => (
                <div key={i} className="img-zoom aspect-square overflow-hidden">
                  <img src={img} alt={`Pressed flower ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="order-1 lg:order-2">
              <span className="section-subtitle">{t('activities.flowerSub')}</span>
              <h2 className="section-title mb-4">{t('activities.flowerTitle')}<br /><em>{t('activities.flowerTitleEm')}</em></h2>
              <div className="w-12 h-0.5 bg-gold mb-6" />
              <p className="text-gray-600 leading-relaxed mb-4">{t('activities.flowerDesc1')}</p>
              <p className="text-gray-600 leading-relaxed">{t('activities.flowerDesc2')}</p>
            </div>
          </div>

        </div>
      </section>

      {/* For who */}
      <section className="py-16 bg-forest-900">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <span className="section-subtitle">{t('activities.forSub')}</span>
            <h2 className="font-serif text-3xl text-white">{t('activities.forTitle')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.isArray(forItems) && forItems.map((f, i) => (
              <div key={i} className="bg-forest-800 p-6 text-center">
                <div className="text-4xl mb-3">{FOR_ICONS[i]}</div>
                <h3 className="font-serif text-lg text-white mb-2">{f.label}</h3>
                <p className="text-gray-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-cream text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="section-title mb-4">{t('activities.ctaTitle')}</h2>
          <p className="text-gray-600 text-sm mb-8">{t('activities.ctaDesc')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:0961393370" className="btn-primary">{t('activities.ctaCall')}</a>
            <Link to="/lien-he" className="btn-outline">{t('activities.ctaMsg')}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
