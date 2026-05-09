import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLang } from '../context/LangContext';

const HERO_SLIDES = [
  '/images/slider/z7799481255541_5c95e2dbf3f8ae6a61df5c7052e75c2b.jpg',
  '/images/slider/z7799481328127_3b71269ff4e4ab455766e8a5d6e32ec5.jpg',
  '/images/slider/z7799481452894_c4def1f11d478f97a74d0573314b33ff.jpg',
  '/images/slider/z7799481534790_1b1d70a2ca16c1cce88d9a132be510d8.jpg',
  '/images/slider/z7799481641566_f55e5097612c5b642668ff939142eee9.jpg',
  '/images/slider/z7799481747402_3cf603b614507014360f6f91219d23db.jpg',
];
const CTA_BG = '/images/activities/camping/DSCF8235.JPG';

const SERVICE_IMGS = [
  '/images/coffee/cafe-area/DSCF0163.JPG',
  '/images/activities/camping/DSCF0852.JPG',
  '/images/restaurant/gallery/DSCF6002.JPG',
  '/images/activities/sup/z6675583185740_e3d20bed681974dca792a6368981c4f7.jpg',
  '/images/activities/rose-garden/z6673899322687_4f7481839fba719ad73a5a1e9db0b56d.jpg',
  '/images/activities/ep-hoa-kho/DSCF0062.JPG',
];
const SERVICE_ICONS = ['☕', '🏕', '🍽', '🛶', '🌹', '🌿'];
const SERVICE_HREFS = ['/ca-phe', '/luu-tru', '/nha-hang', '/cheo-sup', '/vuon-hoa-hong', '/hoat-dong'];
const TIMELINE_ICONS = ['☕', '🍽', '🛶', '🔥'];
const CHECKIN_IMGS = [
  '/images/gallery/checkin/z6673902322313_77a98fc5b609a9836b6c55e2388bba83.jpg',
  '/images/gallery/checkin/z6673902331887_fb0223028c3f18db46a01ffba48bf64f.jpg',
  '/images/gallery/checkin/z6673902364455_3ccb72a9d70161457a7432a173249cee.jpg',
  '/images/gallery/checkin/z6673902371745_97bf5508c093ef65676aab117a85f901.jpg',
  '/images/gallery/checkin/z6673902394002_47d0f7d9f33bdae2d4f893941301fcff.jpg',
  '/images/gallery/checkin/z6673902404703_2e3f2f4e64754144218af1aedba8b928.jpg',
  '/images/gallery/checkin/z6673902442783_d2adafc060da8806c098ce40cf32e315.jpg',
  '/images/gallery/checkin/z6673902451299_f7b69b5c7c30a0cccb131f6e390dabb5.jpg',
];

export default function Home() {
  const { t } = useLang();
  const [posts, setPosts] = useState([]);
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    axios.get('/api/blog?limit=3').then(r => setPosts(r.data)).catch(() => {});
  }, []);

  const next = useCallback(() => setSlide(s => (s + 1) % HERO_SLIDES.length), []);
  const prev = useCallback(() => setSlide(s => (s - 1 + HERO_SLIDES.length) % HERO_SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, next]);

  const services = t('home.services');
  const timeline = t('home.timeline');
  const reviews = t('home.reviews');

  return (
    <div>
      {/* ── Hero Carousel ── */}
      <section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}>

        {/* Slides */}
        {HERO_SLIDES.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{
              backgroundImage: `url(${src})`,
              opacity: i === slide ? 1 : 0,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 w-full max-w-4xl mx-auto">
          <p className="text-[11px] tracking-widest uppercase text-gold font-semibold mb-4">
            {t('home.heroLocation')}
          </p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight mb-6">
            {t('home.heroTitle')}<br /><em>{t('home.heroTitleEm')}</em>
          </h1>
          <p className="text-white/80 text-lg md:text-xl mb-4 font-light italic">
            {t('home.heroSlogan')}
          </p>
          <div className="text-white/70 text-sm mb-10 space-y-1.5">
            <p>{t('home.heroLine1')}</p>
            <p>{t('home.heroLine2')}</p>
            <p>{t('home.heroLine3')}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/lien-he" className="btn-gold text-center">{t('home.bookBtn')}</Link>
            <Link to="/gioi-thieu" className="btn-outline !border-white/60 !text-white hover:!bg-white/10 hover:!text-white text-center">
              {t('home.exploreBtn')}
            </Link>
          </div>
        </div>

        {/* Prev / Next arrows */}
        <button
          onClick={prev}
          className="absolute left-4 md:left-8 z-20 w-10 h-10 flex items-center justify-center bg-black/30 hover:bg-black/60 text-white transition-colors rounded-full">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={next}
          className="absolute right-4 md:right-8 z-20 w-10 h-10 flex items-center justify-center bg-black/30 hover:bg-black/60 text-white transition-colors rounded-full">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`transition-all duration-300 rounded-full ${
                i === slide ? 'w-8 h-2 bg-gold' : 'w-2 h-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce z-10">
          <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="py-16 bg-cream">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="section-subtitle">{t('home.introSub')}</span>
          <h2 className="section-title mb-4">{t('home.introTitle')}<br /><em>{t('home.introTitleEm')}</em></h2>
          <div className="w-12 h-0.5 bg-gold mx-auto mb-6" />
          <p className="text-gray-600 leading-relaxed text-base">{t('home.introDesc')}</p>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <span className="section-subtitle">{t('home.servicesSub')}</span>
            <h2 className="section-title">{t('home.servicesTitle')}</h2>
            <div className="w-12 h-0.5 bg-gold mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.isArray(services) && services.map((s, i) => (
              <Link key={i} to={SERVICE_HREFS[i]} className="group block">
                <div className="img-zoom mb-4 aspect-[4/3] overflow-hidden">
                  <img src={SERVICE_IMGS[i]} alt={s.label} className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{SERVICE_ICONS[i]}</span>
                  <h3 className="font-serif text-lg text-forest-900 group-hover:text-gold transition-colors">{s.label}</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed mb-3">{s.desc}</p>
                <span className="text-[11px] font-semibold tracking-widest uppercase text-gold border-b border-gold pb-0.5">
                  {t('home.viewMore')}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Một ngày ở Trosie ── */}
      <section className="py-20 bg-forest-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="section-subtitle">{t('home.daySub')}</span>
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-3">{t('home.dayTitle')}</h2>
          <p className="text-gray-400 mb-2 italic">{t('home.dayNote')}</p>
          <div className="w-12 h-0.5 bg-gold mx-auto mb-12" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.isArray(timeline) && timeline.map((item, i) => (
              <div key={i} className="relative">
                {i < timeline.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-forest-700" />
                )}
                <div className="relative bg-forest-800 p-5 text-center">
                  <div className="text-3xl mb-2">{TIMELINE_ICONS[i]}</div>
                  <div className="text-gold text-[10px] font-bold tracking-widest uppercase mb-1">{item.time}</div>
                  <p className="text-gray-300 text-sm leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-gray-400 mt-10 text-sm italic max-w-xl mx-auto">{t('home.dayFooter')}</p>
        </div>
      </section>

      {/* ── Coffee highlight ── */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="img-zoom">
              <img src="/images/coffee/cafe-area/DSCF0211.JPG"
                alt="Trosie Coffee" className="w-full h-[450px] object-cover" />
            </div>
            <div>
              <span className="section-subtitle">{t('home.coffeeSub')}</span>
              <h2 className="section-title mb-2">{t('home.coffeeTitle')}<br /><em>{t('home.coffeeTitleEm')}</em></h2>
              <div className="w-12 h-0.5 bg-gold mb-6" />
              <p className="text-gray-600 leading-relaxed mb-4">{t('home.coffeeDesc1')}</p>
              <p className="text-gray-600 leading-relaxed mb-6">{t('home.coffeeDesc2')}</p>
              <div className="flex gap-3 flex-wrap">
                <Link to="/ca-phe" className="btn-outline">{t('home.coffeeLearn')}</Link>
                <Link to="/ca-phe/shop" className="btn-gold">{t('home.coffeeBuy')}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Guest Gallery ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <span className="section-subtitle">{t('home.gallerySub')}</span>
            <h2 className="section-title">{t('home.galleryTitle')}</h2>
            <div className="w-12 h-0.5 bg-gold mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {CHECKIN_IMGS.map((img, i) => (
              <div key={i} className="img-zoom aspect-square overflow-hidden">
                <img src={img} alt={`Guest check-in ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-subtitle">{t('home.reviewsSub')}</span>
            <h2 className="section-title">{t('home.reviewsTitle')}</h2>
            <div className="w-12 h-0.5 bg-gold mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.isArray(reviews) && reviews.map((r, i) => (
              <div key={i} className="bg-cream p-8 relative">
                <svg className="w-8 h-8 text-gold/30 absolute top-6 right-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
                <p className="text-gray-600 leading-relaxed mb-6 italic">"{r.text}"</p>
                <div>
                  <div className="font-semibold text-forest-900 text-sm">{r.name}</div>
                  <div className="text-xs text-gray-400">{r.from}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Blog ── */}
      {posts.length > 0 && (
        <section className="py-20 bg-cream">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <span className="section-subtitle">{t('home.blogSub')}</span>
              <h2 className="section-title">{t('home.blogTitle')}</h2>
              <div className="w-12 h-0.5 bg-gold mx-auto mt-4" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posts.map(p => (
                <Link key={p.id} to={`/tin-tuc/${p.slug}`} className="group block">
                  <div className="img-zoom mb-4">
                    <img src={p.image} alt={p.title} className="w-full h-52 object-cover" />
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[11px] bg-forest-100 text-forest-700 px-2 py-0.5 font-semibold uppercase tracking-wider">{p.category}</span>
                    <span className="text-xs text-gray-400">{new Date(p.published_at).toLocaleDateString('vi-VN')}</span>
                  </div>
                  <h3 className="font-serif text-lg text-forest-900 group-hover:text-gold transition-colors mb-2 line-clamp-2">{p.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{p.excerpt}</p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link to="/tin-tuc" className="btn-outline">{t('home.blogViewAll')}</Link>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="relative py-28 text-center overflow-hidden"
        style={{ backgroundImage: `url(${CTA_BG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-forest-900/80" />
        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <span className="section-subtitle">{t('home.ctaSub')}</span>
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
            {t('home.ctaTitle')}<br /><em>{t('home.ctaTitleEm')}</em>
          </h2>
          <p className="text-gray-300 text-sm mb-8 leading-relaxed">{t('home.ctaDesc')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:0961393370" className="btn-gold">{t('home.ctaCall')}</a>
            <Link to="/lien-he" className="btn-outline !border-white/60 !text-white hover:!bg-white/10 hover:!text-white">
              {t('home.ctaContact')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
