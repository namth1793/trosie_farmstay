import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLang } from '../context/LangContext';

export default function Coffee() {
  const { t } = useLang();
  const [products, setProducts] = useState([]);
  const process = t('coffee.process');

  useEffect(() => {
    axios.get('/api/products').then(r => setProducts(r.data.slice(0, 4))).catch(() => {});
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/coffee/cafe-area/DSCF0163.JPG)' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
        <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto">
          <p className="text-[11px] tracking-widest uppercase text-gold font-semibold mb-4">
            {t('coffee.heroSub')}
          </p>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-6">
            {t('coffee.heroTitle')}
          </h1>
          <p className="text-white/80 text-lg mb-4 italic">
            {t('coffee.heroSlogan')}
          </p>
          <p className="text-white/65 text-sm mb-10 max-w-xl mx-auto leading-relaxed">
            {t('coffee.heroDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/ca-phe/shop" className="btn-gold">{t('coffee.heroShop')}</Link>
            <a href="#gioi-thieu" className="btn-outline !border-white/50 !text-white hover:!bg-white/10 hover:!text-white">
              {t('coffee.heroLearn')}
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="gioi-thieu" className="py-12 md:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              <span className="section-subtitle">{t('coffee.aboutSub')}</span>
              <h2 className="section-title mb-4">{t('coffee.aboutTitle')}<br /><em>{t('coffee.aboutTitleEm')}</em></h2>
              <div className="w-12 h-0.5 bg-gold mb-6" />
              <p className="text-gray-600 leading-relaxed mb-4">{t('coffee.aboutDesc1')}</p>
              <p className="text-gray-600 leading-relaxed mb-8">{t('coffee.aboutDesc2')}</p>
              <div className="flex flex-wrap gap-3">
                <Link to="/ca-phe/shop" className="btn-primary">{t('coffee.viewProducts')}</Link>
                <Link to="/menu"
                  className="inline-flex items-center gap-2 bg-forest-800 hover:bg-forest-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors">
                  <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Xem menu cà phê
                </Link>
              </div>
            </div>
            <div className="img-zoom">
              <img src="/images/coffee/cafe-area/z6673902262574_ba371fdf56beb4a954af29a5ed722b0b.jpg"
                alt="Trosie Coffee" className="w-full h-auto md:h-[450px] md:object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-12 md:py-20 bg-forest-900">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <span className="section-subtitle">{t('coffee.processSub')}</span>
            <h2 className="font-serif text-3xl text-white">{t('coffee.processTitle')}<br /><em className="text-gold">{t('coffee.processTitleEm')}</em></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.isArray(process) && process.map((p, i) => (
              <div key={i} className="text-center">
                <div className="font-serif text-5xl text-gold/30 mb-2">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="font-serif text-lg text-white mb-3">{p.label}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products preview */}
      {products.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <span className="section-subtitle">{t('coffee.productsSub')}</span>
              <h2 className="section-title">{t('coffee.productsTitle')}</h2>
              <div className="w-12 h-0.5 bg-gold mx-auto mt-4" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map(p => (
                <Link key={p.id} to={`/ca-phe/shop/${p.slug}`} className="group block">
                  <div className="img-zoom mb-4 relative">
                    <img src={p.image} alt={p.name} className="w-full aspect-[4/3] object-cover" />
                    {p.badge && (
                      <span className="absolute top-2 left-2 bg-gold text-white text-[10px] font-bold tracking-wide px-2 py-1 uppercase">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-base text-forest-900 group-hover:text-gold transition-colors mb-1 line-clamp-2">{p.name}</h3>
                  <div className="text-gold font-semibold text-sm mb-1">{p.price?.toLocaleString('vi-VN')}đ</div>
                  <div className="text-xs text-gray-400">{p.weight}</div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link to="/ca-phe/shop" className="btn-outline">{t('coffee.viewAll')}</Link>
            </div>
          </div>
        </section>
      )}

      {/* Cafe Space */}
      <section className="py-12 md:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="grid grid-cols-2 gap-3">
              {[
                '/images/coffee/cafe-area/DSCF0240.JPG',
                '/images/coffee/cafe-area/z6673899525879_7c195ab7b7964eb8c66ccbd97abe22ce.jpg',
                '/images/coffee/cafe-area/z6673899540727_8ff55c5b2c40ed3684531d0d242e4f08.jpg',
                '/images/coffee/cafe-area/z6673900740557_666f02250eb025f86fee55920caf494e.jpg',
              ].map((img, i) => (
                <div key={i} className="img-zoom aspect-[4/3] overflow-hidden">
                  <img src={img} alt={`Cafe space ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div>
              <span className="section-subtitle">{t('coffee.spaceSub')}</span>
              <h2 className="section-title mb-4">{t('coffee.spaceTitle')}<br /><em>{t('coffee.spaceTitleEm')}</em></h2>
              <div className="w-12 h-0.5 bg-gold mb-6" />
              <p className="text-gray-600 leading-relaxed mb-4">{t('coffee.spaceDesc1')}</p>
              <p className="text-gray-600 leading-relaxed">{t('coffee.spaceDesc2')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cafe Area Gallery */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <span className="section-subtitle">{t('coffee.gallerySub')}</span>
            <h2 className="section-title">{t('coffee.galleryTitle')}</h2>
            <div className="w-12 h-0.5 bg-gold mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              '/images/coffee/cafe-area/z6649009570055_d50c460157a845e591f168629f5912db.jpg',
              '/images/coffee/cafe-area/z6649009578222_9ac387fc5ffd6d046c5bef3b87116579.jpg',
              '/images/coffee/cafe-area/z6673900727809_04919ec614e1c769fbc8ddf213d5d369.jpg',
              '/images/coffee/cafe-area/z6673902293422_21ed52ab7c17728c1ac9b9771cf7ced7.jpg',
              '/images/coffee/cafe-area/z6673902262574_ba371fdf56beb4a954af29a5ed722b0b.jpg',
              '/images/coffee/cafe-area/DSCF0163.JPG',
              '/images/coffee/cafe-area/DSCF0240.JPG',
              '/images/coffee/cafe-area/z6673900740557_666f02250eb025f86fee55920caf494e.jpg',
            ].map((img, i) => (
              <div key={i} className="img-zoom aspect-[4/3] overflow-hidden">
                <img src={img} alt={`Cafe area ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coffee Menu */}
      <section className="py-12 md:py-16 bg-cream">
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-8">
            <span className="section-subtitle">{t('coffee.menuSub')}</span>
            <h2 className="section-title">{t('coffee.menuTitle')}</h2>
            <div className="w-12 h-0.5 bg-gold mx-auto mt-4" />
          </div>
          <div className="img-zoom overflow-hidden border border-gray-200">
            <img src="/images/restaurant/menu/menu-coffee-trosie.jpg"
              alt="Coffee Menu" className="w-full h-auto object-contain" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-cream text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="section-title mb-4">{t('coffee.ctaTitle')}</h2>
          <p className="text-gray-600 text-sm mb-8">{t('coffee.ctaDesc')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/ca-phe/shop" className="btn-primary">{t('coffee.ctaShop')}</Link>
            <a href="tel:0961393370" className="btn-outline">{t('coffee.ctaWholesale')}</a>
          </div>
        </div>
      </section>
    </div>
  );
}
