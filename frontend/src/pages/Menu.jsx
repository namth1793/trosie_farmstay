import React, { useState } from 'react';

const RESTAURANT_MENU = Array.from({ length: 13 }, (_, i) => `/images/restaurant/menu/${i + 1}.jpg`);

const COFFEE_MENU = [
  '/images/restaurant/menu/menu-coffee-trosie.jpg',
  '/images/restaurant/menu/menu coffee trosie 40-70 (6).jpg',
];

function ImageLightbox({ images, startIndex, onClose }) {
  const [idx, setIdx] = useState(startIndex);
  const touchStartX = React.useRef(null);

  const prev = () => setIdx(i => (i - 1 + images.length) % images.length);
  const next = () => setIdx(i => (i + 1) % images.length);

  const onTouchStart = e => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = e => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
    touchStartX.current = null;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}>
      <button onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center text-xl transition-colors z-10">
        ✕
      </button>
      {images.length > 1 && (
        <>
          <button onClick={e => { e.stopPropagation(); prev(); }}
            className="absolute left-3 md:left-6 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors z-10">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button onClick={e => { e.stopPropagation(); next(); }}
            className="absolute right-3 md:right-6 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors z-10">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
      <img
        src={images[idx]}
        alt={`Menu ${idx + 1}`}
        className="max-h-[90vh] max-w-[95vw] object-contain"
        onClick={e => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      />
      <div className="absolute bottom-4 text-white/60 text-sm">{idx + 1} / {images.length}</div>
    </div>
  );
}

function MenuSection({ title, subtitle, images }) {
  const [lightbox, setLightbox] = useState(null);

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <p className="text-gold text-xs tracking-[0.3em] uppercase font-sans mb-2">{subtitle}</p>
          <h2 className="font-serif text-2xl md:text-3xl text-forest-900">{title}</h2>
          <div className="w-12 h-0.5 bg-gold mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
          {images.map((src, i) => (
            <button key={i} onClick={() => setLightbox(i)}
              className="group overflow-hidden focus:outline-none">
              <img src={src} alt={`${title} ${i + 1}`}
                className="w-full h-auto aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-300" />
            </button>
          ))}
        </div>
        <p className="text-center text-xs text-gray-400 mt-6">Nhấn vào ảnh để xem lớn hơn</p>
      </div>
      {lightbox !== null && (
        <ImageLightbox images={images} startIndex={lightbox} onClose={() => setLightbox(null)} />
      )}
    </section>
  );
}

export default function Menu() {
  return (
    <div className="min-h-screen bg-cream pt-20">
      {/* Hero */}
      <div className="bg-forest-900 py-14 px-4 text-center mb-2">
        <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-sans">Trosie Garden Khe Sanh</p>
        <h1 className="font-serif text-white text-3xl md:text-4xl font-semibold">Menu</h1>
        <div className="w-16 h-0.5 bg-gold mx-auto mt-5" />
      </div>

      <MenuSection
        title="Menu Nhà Hàng"
        subtitle="Ẩm Thực Trosie"
        images={RESTAURANT_MENU}
      />

      <div className="h-px bg-forest-100 mx-4 lg:mx-8" />

      <MenuSection
        title="Menu Cà Phê"
        subtitle="Đặc Sản Khe Sanh"
        images={COFFEE_MENU}
      />

      {/* CTA */}
      <div className="py-12 text-center bg-forest-900">
        <p className="text-gray-300 text-sm mb-2">Đặt bàn hoặc hỏi thêm về thực đơn?</p>
        <p className="text-white font-serif text-lg mb-5">Liên hệ Trosie Garden</p>
        <a href="tel:0961393370"
          className="inline-flex items-center gap-2 bg-gold hover:bg-yellow-600 text-forest-900 font-semibold text-sm px-6 py-3 rounded-full transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          0961 393 370
        </a>
      </div>
    </div>
  );
}
