import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';

const TYPE_ICONS = ['🏕', '🌿'];
const AMENITY_ICONS = ['🍳', '🔇', '👨‍👩‍👧', '🌄', '🔥', '🌳'];
const NIGHT_ICONS = ['🔥', '⛺', '🌄'];

const TYPE_IMGS = [
  '/images/activities/camping/DSCF8235.JPG',
  '/images/activities/camping/DSCF8247.JPG',
];

export default function LuuTru() {
  const { t } = useLang();
  const types = t('stay.types');
  const nightItems = t('stay.nightItems');
  const amenities = t('stay.amenities');

  return (
    <div>
      <div className="page-hero" style={{ height: '400px' }}>
        <div className="page-hero-bg"
          style={{ backgroundImage: 'url(/images/activities/camping/DSCF0852.JPG)' }} />
        <div className="page-hero-overlay" />
        <div className="relative z-10 text-center">
          <span className="section-subtitle">{t('stay.heroSub')}</span>
          <h1 className="font-serif text-3xl md:text-5xl text-white">{t('stay.heroTitle')}</h1>
        </div>
      </div>

      {/* Intro */}
      <section className="py-16 bg-cream">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="section-subtitle">{t('stay.introSub')}</span>
          <h2 className="section-title mb-4">{t('stay.introTitle')}</h2>
          <div className="w-12 h-0.5 bg-gold mx-auto mb-6" />
          <p className="text-gray-600 leading-relaxed">{t('stay.introDesc')}</p>
        </div>
      </section>

      {/* Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <span className="section-subtitle">{t('stay.typesSub')}</span>
            <h2 className="section-title">{t('stay.typesTitle')}</h2>
            <div className="w-12 h-0.5 bg-gold mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {Array.isArray(types) && types.map((type, i) => (
              <div key={i} className="group">
                <div className="img-zoom mb-6">
                  <img src={TYPE_IMGS[i]} alt={type.label} className="w-full h-72 object-cover" />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{TYPE_ICONS[i]}</span>
                  <h3 className="font-serif text-xl text-forest-900">{type.label}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{type.desc}</p>
                <ul className="space-y-1.5">
                  {Array.isArray(type.features) && type.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-gold shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Camping Gallery */}
      <section className="py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-8">
            <span className="section-subtitle">{t('stay.gallerySub')}</span>
            <h2 className="section-title">{t('stay.galleryTitle')}</h2>
            <div className="w-12 h-0.5 bg-gold mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              '/images/activities/camping/DSCF8258.JPG',
              '/images/activities/camping/DSCF8260.JPG',
              '/images/activities/camping/DSCF8261.JPG',
              '/images/activities/camping/DSCF8265.JPG',
              '/images/activities/camping/DSCF8273.JPG',
              '/images/activities/camping/DSCF8275.JPG',
              '/images/activities/camping/DSCF8285.JPG',
              '/images/activities/camping/DSCF0865.JPG',
            ].map((img, i) => (
              <div key={i} className="img-zoom aspect-square overflow-hidden">
                <img src={img} alt={`Camping ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience timeline */}
      <section className="py-20 bg-forest-900">
        <div className="max-w-5xl mx-auto px-4 lg:px-8 text-center">
          <span className="section-subtitle">{t('stay.nightSub')}</span>
          <h2 className="font-serif text-3xl text-white mb-12">{t('stay.nightTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.isArray(nightItems) && nightItems.map((item, i) => (
              <div key={i} className="bg-forest-800 p-6 text-center">
                <div className="text-3xl mb-3">{NIGHT_ICONS[i]}</div>
                <div className="text-gold text-[10px] font-bold tracking-widest uppercase mb-2">{item.time}</div>
                <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-16 bg-cream">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <span className="section-subtitle">{t('stay.amenitiesSub')}</span>
            <h2 className="section-title">{t('stay.amenitiesTitle')}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.isArray(amenities) && amenities.map((label, i) => (
              <div key={i} className="bg-white p-5 flex items-center gap-3">
                <span className="text-2xl">{AMENITY_ICONS[i]}</span>
                <span className="text-sm font-semibold text-forest-900">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-forest-900 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="font-serif text-2xl text-white mb-4">{t('stay.ctaTitle')}</h2>
          <p className="text-gray-400 text-sm mb-8">{t('stay.ctaDesc')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:0961393370" className="btn-gold">{t('stay.ctaCall')}</a>
            <Link to="/lien-he" className="btn-outline !border-white/50 !text-white hover:!bg-white/10 hover:!text-white">
              {t('stay.ctaMsg')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
