import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';

const VALUE_ICONS = ['🌿', '🤲', '♻️'];

export default function About() {
  const { t } = useLang();
  const values = t('about.values');
  const journeyItems = t('about.journeyItems');

  return (
    <div>
      <div className="page-hero" style={{ height: '400px' }}>
        <div className="page-hero-bg" style={{ backgroundImage: 'url(/images/activities/rose-garden/z6673899382640_e823bb8e5f6add64f5bbe339dca09aa0.jpg)' }} />
        <div className="page-hero-overlay" />
        <div className="relative z-10 text-center">
          <span className="section-subtitle">{t('about.heroSub')}</span>
          <h1 className="font-serif text-3xl md:text-5xl text-white">{t('about.heroTitle')}</h1>
        </div>
      </div>

      {/* Story */}
      <section className="py-12 md:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="img-zoom">
              <img src="/images/home/overview/z6673902458111_fe821ddbb3c9b237ab485b12b6b678e8.jpg"
                alt="Trosie Garden" className="w-full h-auto md:h-[500px] md:object-cover" />
            </div>
            <div>
              <span className="section-subtitle">{t('about.storySub')}</span>
              <h2 className="section-title mb-2">{t('about.storyTitle')}<br /><em>{t('about.storyTitleEm')}</em></h2>
              <div className="w-12 h-0.5 bg-gold mb-6" />
              <p className="text-gray-600 leading-relaxed mb-4 text-base">
                {t('about.storyP1')} <strong>{t('about.storyBold')}</strong>
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">{t('about.storyP2')}</p>
              <p className="text-gray-600 leading-relaxed mb-4">{t('about.storyP3')}</p>
              <p className="text-gray-600 leading-relaxed">{t('about.storyP4')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-12 md:py-20 bg-forest-900 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="section-subtitle">{t('about.missionSub')}</span>
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
            {t('about.missionTitle')}<br /><em>{t('about.missionTitleEm')}</em>
          </h2>
          <div className="w-12 h-0.5 bg-gold mx-auto" />
        </div>
      </section>

      {/* Values */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-subtitle">{t('about.valuesSub')}</span>
            <h2 className="section-title">{t('about.valuesTitle')}</h2>
            <div className="w-12 h-0.5 bg-gold mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.isArray(values) && values.map((v, i) => (
              <div key={i} className="bg-cream p-8 text-center">
                <div className="text-4xl mb-4">{VALUE_ICONS[i]}</div>
                <h3 className="font-serif text-xl text-forest-900 mb-3">{v.label}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="py-12 md:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              <span className="section-subtitle">{t('about.journeySub')}</span>
              <h2 className="section-title mb-4">{t('about.journeyTitle')}<br /><em>{t('about.journeyTitleEm')}</em></h2>
              <div className="w-12 h-0.5 bg-gold mb-8" />
              <div className="space-y-6">
                {Array.isArray(journeyItems) && journeyItems.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 bg-gold text-white flex items-center justify-center font-serif text-lg shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-forest-900 mb-1">{item.label}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="img-zoom">
              <img src="/images/coffee/cafe-area/DSCF0211.JPG"
                alt="Trosie Coffee Farm" className="w-full h-auto md:h-[500px] md:object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-forest-900 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-serif text-2xl md:text-3xl text-white mb-4">{t('about.ctaTitle')}</h2>
          <p className="text-gray-400 text-sm mb-8">{t('about.ctaDesc')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:0961393370" className="btn-gold">{t('about.ctaCall')}</a>
            <Link to="/lien-he" className="btn-outline !border-white/50 !text-white hover:!bg-white/10 hover:!text-white">
              {t('about.ctaMsg')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
