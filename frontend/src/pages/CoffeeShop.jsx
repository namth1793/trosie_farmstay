import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLang } from '../context/LangContext';

const CAT_IDS = ['all', 'dac-san', 'hat', 'bot', 'tui-nhung', 'tra'];

export default function CoffeeShop() {
  const { t } = useLang();
  const [products, setProducts] = useState([]);
  const [cat, setCat] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/products')
      .then(r => { setProducts(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const cats = t('coffeeShop.cats');
  const filtered = cat === 'all' ? products : products.filter(p => p.category === cat);

  return (
    <div>
      <div className="page-hero" style={{ height: '320px' }}>
        <div className="page-hero-bg"
          style={{ backgroundImage: 'url(/images/coffee/cafe-area/679930378_122270991404137494_3572875436896164920_n.jpg)' }} />
        <div className="page-hero-overlay" />
        <div className="relative z-10 text-center">
          <span className="section-subtitle">{t('coffeeShop.heroSub')}</span>
          <h1 className="font-serif text-3xl md:text-5xl text-white">{t('coffeeShop.heroTitle')}</h1>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">

          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {CAT_IDS.map(id => (
              <button key={id} onClick={() => setCat(id)}
                className={`px-5 py-2 text-[11px] font-semibold tracking-widest uppercase border transition-colors ${
                  cat === id
                    ? 'bg-forest-700 text-white border-forest-700'
                    : 'border-gray-300 text-gray-600 hover:border-forest-700 hover:text-forest-700'
                }`}>
                {cats?.[id] ?? id}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-20 text-gray-400">{t('coffeeShop.loading')}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filtered.map(p => (
                <Link key={p.id} to={`/ca-phe/shop/${p.slug}`} className="group block">
                  <div className="img-zoom mb-4 relative overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full aspect-[4/3] object-cover" />
                    {p.badge && (
                      <span className="absolute top-2 left-2 bg-gold text-white text-[10px] font-bold tracking-wide px-2.5 py-1 uppercase">
                        {p.badge}
                      </span>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 bg-white text-forest-900 text-[11px] font-bold tracking-widest uppercase px-4 py-2 transition-opacity">
                        {t('coffeeShop.viewDetail')}
                      </span>
                    </div>
                  </div>
                  <div className="text-[10px] text-gold uppercase tracking-widest mb-1 font-semibold">{p.weight}</div>
                  <h3 className="font-serif text-base text-forest-900 group-hover:text-gold transition-colors mb-2 leading-snug">{p.name}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-3">{p.short_desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gold font-bold text-sm">{p.price?.toLocaleString('vi-VN')}đ</span>
                    {p.tags && p.tags.length > 0 && (
                      <span className="text-[10px] bg-forest-50 text-forest-700 px-2 py-0.5">{p.tags[0]}</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">{t('coffeeShop.empty')}</div>
          )}
        </div>
      </section>

      {/* Contact for wholesale */}
      <section className="py-12 bg-forest-900 text-center">
        <div className="max-w-xl mx-auto px-4">
          <p className="text-gray-300 text-sm mb-3">{t('coffeeShop.wholesale')}</p>
          <a href="tel:0961393370" className="font-serif text-2xl text-gold hover:text-white transition-colors block mb-2">
            0961 393 370
          </a>
          <p className="text-gray-500 text-xs">Hotline / Zalo · trosiegardenks@gmail.com</p>
        </div>
      </section>
    </div>
  );
}
