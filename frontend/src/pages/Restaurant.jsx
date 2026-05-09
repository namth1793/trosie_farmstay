import React from 'react';
import { Link } from 'react-router-dom';

const MENU_HIGHLIGHTS = [
  { label: 'Ẩm Thực Địa Phương', desc: 'Các món ăn đặc trưng vùng Khe Sanh – Quảng Trị, chế biến từ nguyên liệu tươi hàng ngày.', icon: '🌿' },
  { label: 'BBQ Lửa Trại', desc: 'Nướng thịt, hải sản và rau củ ngay bên đống lửa. Trải nghiệm không thể quên.', icon: '🔥' },
  { label: 'Nguyên Liệu Tươi Sạch', desc: 'Rau vườn, thịt địa phương, không hóa chất – đảm bảo an toàn và hương vị thật.', icon: '🥬' },
];

export default function Restaurant() {
  return (
    <div>
      <div className="page-hero" style={{ height: '400px' }}>
        <div className="page-hero-bg"
          style={{ backgroundImage: 'url(/images/restaurant/gallery/DSCF6002.JPG)' }} />
        <div className="page-hero-overlay" />
        <div className="relative z-10 text-center">
          <span className="section-subtitle">Trosie Garden</span>
          <h1 className="font-serif text-3xl md:text-5xl text-white">Nhà Hàng</h1>
        </div>
      </div>

      {/* Intro */}
      <section className="py-16 bg-cream">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="section-subtitle">Ẩm Thực</span>
          <h2 className="section-title mb-4">Không Cầu Kỳ,<br /><em>Nhưng Đậm Chất Địa Phương</em></h2>
          <div className="w-12 h-0.5 bg-gold mx-auto mb-6" />
          <p className="text-gray-600 leading-relaxed">
            Ẩm thực tại Trosie không cầu kỳ, nhưng đậm chất địa phương và rất "thật".
            Mỗi bữa ăn là một hành trình khám phá hương vị vùng đất Khe Sanh – nơi thiên nhiên ban tặng những nguyên liệu tuyệt vời nhất.
          </p>
        </div>
      </section>

      {/* Menu highlights */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {MENU_HIGHLIGHTS.map(m => (
              <div key={m.label} className="bg-cream p-8 text-center">
                <div className="text-4xl mb-4">{m.icon}</div>
                <h3 className="font-serif text-xl text-forest-900 mb-3">{m.label}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="img-zoom">
              <img src="/images/restaurant/gallery/DSCF6050.JPG"
                alt="Nhà hàng Trosie" className="w-full h-[400px] object-cover" />
            </div>
            <div>
              <span className="section-subtitle">Không Gian</span>
              <h2 className="section-title mb-4">Ăn Giữa Thiên Nhiên<br /><em>Thoáng – Chill</em></h2>
              <div className="w-12 h-0.5 bg-gold mb-6" />
              <p className="text-gray-600 leading-relaxed mb-4">
                Nhà hàng Trosie nằm giữa không gian mở, bao quanh bởi cây xanh và thiên nhiên núi rừng Khe Sanh.
                Mỗi bữa ăn không chỉ là trải nghiệm ẩm thực, mà còn là khoảnh khắc thư giãn hoàn toàn.
              </p>
              <div className="space-y-2 mb-8">
                {['Phù hợp gia đình', 'Nhóm bạn', 'Đoàn khách'].map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Restaurant Gallery */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <span className="section-subtitle">Hình Ảnh</span>
            <h2 className="section-title">Không Gian Nhà Hàng</h2>
            <div className="w-12 h-0.5 bg-gold mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              '/images/restaurant/gallery/DSCF6032.JPG',
              '/images/restaurant/gallery/DSCF6071.JPG',
              '/images/restaurant/gallery/DSCF6110.JPG',
              '/images/restaurant/gallery/DSCF6118.JPG',
              '/images/restaurant/gallery/z6673899630984_c763c4ec25e8e58d87862f63c655c227.jpg',
              '/images/restaurant/gallery/z6673900656558_442bc53a2dce0291218a17a015b0da7c.jpg',
              '/images/restaurant/gallery/z6673900664660_316c74963db9f852fa72b535dfc7f026.jpg',
              '/images/restaurant/gallery/z6673900671807_2ce6ba3aa268d0cd480219e518c85c3c.jpg',
              '/images/restaurant/gallery/z6673900678393_00264a90c032916761524285041721a2.jpg',
            ].map((img, i) => (
              <div key={i} className="img-zoom aspect-[4/3] overflow-hidden">
                <img src={img} alt={`Nhà hàng ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Images */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <span className="section-subtitle">Thực Đơn</span>
            <h2 className="section-title">Menu Nhà Hàng & Cà Phê</h2>
            <div className="w-12 h-0.5 bg-gold mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {['1','2','3','4','5','6','7','8','9','10','11','12','13'].map(n => (
              <div key={n} className="img-zoom overflow-hidden border border-gray-100">
                <img src={`/images/restaurant/menu/${n}.jpg`} alt={`Menu trang ${n}`} className="w-full h-auto object-contain" />
              </div>
            ))}
            <div className="img-zoom overflow-hidden border border-gray-100">
              <img src="/images/restaurant/menu/menu-coffee-trosie.jpg" alt="Menu cà phê Trosie" className="w-full h-auto object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-forest-900 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="font-serif text-2xl text-white mb-4">Đặt Bàn Trước</h2>
          <p className="text-gray-400 text-sm mb-8">Liên hệ để đặt bàn và biết thêm về thực đơn hôm nay</p>
          <a href="tel:0961393370" className="btn-gold">Gọi: 0961 393 370</a>
        </div>
      </section>
    </div>
  );
}
