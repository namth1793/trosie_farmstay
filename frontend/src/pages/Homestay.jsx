import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';

const ROOMS = [
  {
    key: 'room-01',
    imgs: [
      '/images/rooms/homestay/room-01/DSCF1015.JPG',
      '/images/rooms/homestay/room-01/DSCF1022.JPG',
      '/images/rooms/homestay/room-01/DSCF5627.jpg',
      '/images/rooms/homestay/room-01/DSCF5639.jpg',
    ],
  },
  {
    key: 'room-02',
    imgs: [
      '/images/rooms/homestay/room-02/DSCF5655.jpg',
      '/images/rooms/homestay/room-02/DSCF5658.jpg',
      '/images/rooms/homestay/room-02/DSCF5671.jpg',
      '/images/rooms/homestay/room-02/DSCF5680.jpg',
    ],
  },
  {
    key: 'room-03',
    imgs: [
      '/images/rooms/homestay/room-03/DSCF5705.jpg',
      '/images/rooms/homestay/room-03/DSCF5710.jpg',
      '/images/rooms/homestay/room-03/DSCF5713.jpg',
      '/images/rooms/homestay/room-03/DSCF5728.jpg',
    ],
  },
  {
    key: 'room-04',
    imgs: [
      '/images/rooms/homestay/room-04/DSCF5758.jpg',
      '/images/rooms/homestay/room-04/DSCF5760.jpg',
      '/images/rooms/homestay/room-04/DSCF5766.jpg',
      '/images/rooms/homestay/room-04/DSCF5779.jpg',
    ],
  },
  {
    key: 'room-05',
    imgs: [
      '/images/rooms/homestay/room-05/DSCF5748.jpg',
      '/images/rooms/homestay/room-05/DSCF5798.jpg',
      '/images/rooms/homestay/room-05/DSCF5808.jpg',
      '/images/rooms/homestay/room-05/DSCF5816.jpg',
    ],
  },
];

const COMMON_IMGS = [
  '/images/rooms/homestay/common/DSCF1019.JPG',
  '/images/rooms/homestay/common/DSCF5625.jpg',
  '/images/rooms/homestay/common/DSCF5769.jpg',
  '/images/rooms/homestay/common/z6415720390997_d948d360d493718fb4b215e79797c0ca.jpg',
  '/images/rooms/homestay/common/z6415720538523_6c0ca1a71e66ad438fa1ae3e45e177f8.jpg',
  '/images/rooms/homestay/common/649760029_122265138458137494_6440739021830012325_n.jpg',
];

function RoomCard({ room, info }) {
  const [activeImg, setActiveImg] = useState(0);
  return (
    <div className="bg-white group">
      <div className="relative overflow-hidden">
        <img
          src={room.imgs[activeImg]}
          alt={info.name}
          className="w-full h-64 sm:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {room.imgs.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {room.imgs.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === activeImg ? 'bg-gold scale-125' : 'bg-white/70'}`}
              />
            ))}
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-serif text-lg text-forest-900 mb-2">{info.name}</h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-3">{info.desc}</p>
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1 text-gray-500">
            <svg className="w-3.5 h-3.5 text-gold" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            {info.capacity}
          </span>
          <span className="text-gold font-semibold">{info.price}</span>
        </div>
      </div>
    </div>
  );
}

export default function Homestay() {
  const { t } = useLang();
  const rooms = t('homestay.rooms');

  return (
    <div>
      <div className="page-hero" style={{ height: '420px' }}>
        <div className="page-hero-bg"
          style={{ backgroundImage: 'url(/images/rooms/homestay/common/682102137_122270991656137494_8915823433484477129_n.jpg)' }} />
        <div className="page-hero-overlay" />
        <div className="relative z-10 text-center px-4">
          <span className="section-subtitle">{t('homestay.heroSub')}</span>
          <h1 className="font-serif text-3xl md:text-5xl text-white mb-4">{t('homestay.heroTitle')}</h1>
          <p className="text-white/75 text-sm max-w-md mx-auto">{t('homestay.heroDesc')}</p>
        </div>
      </div>

      {/* Back link */}
      <div className="bg-cream border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3">
          <Link to="/luu-tru" className="text-xs text-gray-500 hover:text-gold transition-colors tracking-wide">
            {t('homestay.backBtn')}
          </Link>
        </div>
      </div>

      {/* Intro */}
      <section className="py-12 md:py-16 bg-cream">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="section-subtitle">{t('homestay.introSub')}</span>
          <h2 className="section-title mb-4">{t('homestay.introTitle')}<br /><em>{t('homestay.introTitleEm')}</em></h2>
          <div className="w-12 h-0.5 bg-gold mx-auto mb-6" />
          <p className="text-gray-600 leading-relaxed">{t('homestay.introDesc')}</p>
        </div>
      </section>

      {/* Rooms */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {Array.isArray(rooms) && rooms.map((info, i) => (
              <RoomCard key={i} room={ROOMS[i]} info={info} />
            ))}
          </div>
        </div>
      </section>

      {/* Price list */}
      <section className="py-10 md:py-16 bg-cream">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="section-subtitle">{t('homestay.priceListTitle')}</span>
          <p className="text-gray-500 text-sm mb-6">{t('homestay.priceListNote')}</p>
          <div className="img-zoom overflow-hidden border border-gray-200">
            <img src="/images/rooms/price-list/price-list.jpg"
              alt="Price list" className="w-full h-auto object-contain" />
          </div>
        </div>
      </section>

      {/* Common areas */}
      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <span className="section-subtitle">{t('homestay.amenitiesSub')}</span>
            <h2 className="section-title">{t('homestay.amenitiesTitle')}</h2>
            <div className="w-12 h-0.5 bg-gold mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {COMMON_IMGS.map((img, i) => (
              <div key={i} className="img-zoom aspect-[4/3] overflow-hidden">
                <img src={img} alt={`Common area ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-forest-900 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="font-serif text-2xl text-white mb-4">{t('homestay.ctaTitle')}</h2>
          <p className="text-gray-400 text-sm mb-8">{t('homestay.ctaDesc')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:0961393370" className="btn-gold">{t('homestay.ctaCall')}</a>
            <Link to="/lien-he" className="btn-outline !border-white/50 !text-white hover:!bg-white/10 hover:!text-white">
              {t('homestay.ctaMsg')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
