import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';

const ACTIVITY_ICONS = ['📸', '🚶', '☕'];
const GALLERY = [
  '/images/activities/rose-garden/z6673899322687_4f7481839fba719ad73a5a1e9db0b56d.jpg',
  '/images/activities/rose-garden/z6673899332333_8fedc8b96c3b5cf517c15f24c16d27ad.jpg',
  '/images/activities/rose-garden/z6673899341091_d9c60cac8444bd7e54120c55a093046b.jpg',
  '/images/activities/rose-garden/z6673899342311_faa9262d1c53465da6f77de62de1ff7b.jpg',
  '/images/activities/rose-garden/z6673899346279_5eaf98282b3b0fd97f5bd98113eada1a.jpg',
  '/images/activities/rose-garden/z6673899355392_30624ec4fee3286b0f300ef5efff79b9.jpg',
  '/images/activities/rose-garden/z6673899356704_185577d64d8d205fff7d7979cc42aa65.jpg',
  '/images/activities/rose-garden/z6673899367675_f6423bccf3167c129c591fa3806f5414.jpg',
  '/images/activities/rose-garden/z6673899375334_37e85c039c37a712206b4e0002ac601d.jpg',
  '/images/activities/rose-garden/z6673899382419_0d01c923313157336b2e2beb062a3aa0.jpg',
  '/images/activities/rose-garden/z6673899382640_e823bb8e5f6add64f5bbe339dca09aa0.jpg',
  '/images/activities/rose-garden/z6673899393745_ff892071104da2fe3f4b70c1bf21bc43.jpg',
];

export default function RoseGarden() {
  const { t } = useLang();
  const activities = t('roseGarden.activities');

  return (
    <div>
      <div className="page-hero" style={{ height: '500px' }}>
        <div className="page-hero-bg"
          style={{ backgroundImage: 'url(/images/activities/rose-garden/z6673899322687_4f7481839fba719ad73a5a1e9db0b56d.jpg)' }} />
        <div className="page-hero-overlay" style={{ background: 'rgba(27,67,50,0.6)' }} />
        <div className="relative z-10 text-center">
          <span className="section-subtitle">{t('roseGarden.heroSub')}</span>
          <h1 className="font-serif text-3xl md:text-5xl text-white mb-4">{t('roseGarden.heroTitle')}</h1>
          <p className="text-white/75 text-base max-w-xl mx-auto">{t('roseGarden.heroDesc')}</p>
        </div>
      </div>

      {/* Intro */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-subtitle">{t('roseGarden.introSub')}</span>
              <h2 className="section-title mb-4">{t('roseGarden.introTitle')}<br /><em>{t('roseGarden.introTitleEm')}</em></h2>
              <div className="w-12 h-0.5 bg-gold mb-6" />
              <p className="text-gray-600 leading-relaxed mb-4">{t('roseGarden.introDesc1')}</p>
              <p className="text-gray-600 leading-relaxed mb-6">{t('roseGarden.introDesc2')}</p>
              <div className="space-y-3">
                {Array.isArray(activities) && activities.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xl">{ACTIVITY_ICONS[i]}</span>
                    <div>
                      <span className="font-semibold text-forest-900 text-sm">{item.label}</span>
                      <span className="text-gray-500 text-sm"> – {item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="img-zoom">
              <img src="/images/activities/rose-garden/z6673899493481_67e06076e4a4426cac6f15d765557341.jpg"
                alt="Rose Garden Trosie" className="w-full h-[500px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <span className="section-subtitle">{t('roseGarden.gallerySub')}</span>
            <h2 className="section-title">{t('roseGarden.galleryTitle')}</h2>
            <div className="w-12 h-0.5 bg-gold mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {GALLERY.map((img, i) => (
              <div key={i} className="img-zoom aspect-square overflow-hidden">
                <img src={img} alt={`Rose garden ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Season note */}
      <section className="py-12 bg-cream">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="text-4xl mb-4">🌹</div>
          <h3 className="font-serif text-xl text-forest-900 mb-3">{t('roseGarden.seasonTitle')}</h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">{t('roseGarden.seasonDesc')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:0961393370" className="btn-primary">{t('roseGarden.ctaCall')}</a>
            <Link to="/lien-he" className="btn-outline">{t('roseGarden.ctaMsg')}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
