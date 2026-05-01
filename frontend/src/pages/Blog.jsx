import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HERO = 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1920&q=80';

const CATS = ['Tất cả', 'Kham pha', 'Huong dan', 'Am thuc', 'Hoat dong', 'Lifestyle'];

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState('Tất cả');

  useEffect(() => {
    axios.get('/api/blog').then(r => { setPosts(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const displayed = cat === 'Tất cả' ? posts : posts.filter(p => p.category === cat);

  return (
    <div>
      <div className="page-hero">
        <div className="page-hero-bg" style={{ backgroundImage: `url(${HERO})` }} />
        <div className="page-hero-overlay" />
        <div className="relative z-10 text-center">
          <span className="section-subtitle">Cảm Hứng Du Lịch</span>
          <h1 className="font-serif text-3xl md:text-5xl text-white">Tin Tức & Bài Viết</h1>
        </div>
      </div>

      {/* Filter */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 flex flex-wrap gap-2 justify-center">
          {CATS.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-4 py-2 text-[11px] font-semibold tracking-widest uppercase transition-colors ${cat === c ? 'bg-forest-700 text-white' : 'bg-cream text-forest-800 hover:bg-forest-100'}`}>
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {loading ? (
            <div className="text-center py-20 text-gray-400">Đang tải...</div>
          ) : (
            <>
              {/* Featured (first post large) */}
              {displayed.length > 0 && (
                <Link to={`/tin-tuc/${displayed[0].slug}`} className="group mb-12 block">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-cream">
                    <div className="img-zoom">
                      <img src={displayed[0].image} alt={displayed[0].title} className="w-full h-72 lg:h-96 object-cover" />
                    </div>
                    <div className="p-8 lg:p-10">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[11px] bg-gold/20 text-gold-dark px-2 py-0.5 font-bold uppercase tracking-wider">{displayed[0].category}</span>
                        <span className="text-xs text-gray-400">{new Date(displayed[0].published_at).toLocaleDateString('vi-VN')}</span>
                      </div>
                      <h2 className="font-serif text-2xl text-forest-900 group-hover:text-gold transition-colors mb-3">{displayed[0].title}</h2>
                      <p className="text-gray-500 leading-relaxed mb-5">{displayed[0].excerpt}</p>
                      <span className="text-[11px] font-bold tracking-widest uppercase text-forest-700 group-hover:text-gold border-b border-current pb-0.5 transition-colors">
                        Đọc Tiếp →
                      </span>
                    </div>
                  </div>
                </Link>
              )}

              {/* Rest grid */}
              {displayed.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {displayed.slice(1).map(p => (
                    <Link key={p.id} to={`/tin-tuc/${p.slug}`} className="group block">
                      <div className="img-zoom mb-4">
                        <img src={p.image} alt={p.title} className="w-full h-52 object-cover" />
                      </div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[11px] bg-forest-100 text-forest-700 px-2 py-0.5 font-bold uppercase tracking-wider">{p.category}</span>
                        <span className="text-xs text-gray-400">{new Date(p.published_at).toLocaleDateString('vi-VN')}</span>
                      </div>
                      <h3 className="font-serif text-lg text-forest-900 group-hover:text-gold transition-colors mb-2 line-clamp-2">{p.title}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2">{p.excerpt}</p>
                    </Link>
                  ))}
                </div>
              )}

              {displayed.length === 0 && (
                <div className="text-center py-16 text-gray-400">Không có bài viết nào.</div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
