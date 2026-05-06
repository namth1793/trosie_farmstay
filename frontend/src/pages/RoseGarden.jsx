import React from 'react';
import { Link } from 'react-router-dom';

const GALLERY = [
  'https://images.unsplash.com/photo-1490750967868-88df5691cc8e?w=600&q=80',
  'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&q=80',
  'https://images.unsplash.com/photo-1464195244916-405fa0a82545?w=600&q=80',
  'https://images.unsplash.com/photo-1487530811015-780be94a3c1d?w=600&q=80',
];

export default function RoseGarden() {
  return (
    <div>
      <div className="page-hero" style={{ height: '500px' }}>
        <div className="page-hero-bg"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1490750967868-88df5691cc8e?w=1920&q=80)' }} />
        <div className="page-hero-overlay" style={{ background: 'rgba(27,67,50,0.6)' }} />
        <div className="relative z-10 text-center">
          <span className="section-subtitle">Trosie Garden</span>
          <h1 className="font-serif text-3xl md:text-5xl text-white mb-4">Vườn Hoa Hồng Cổ</h1>
          <p className="text-white/75 text-base max-w-xl mx-auto">
            Một góc rất riêng tại Trosie – nơi hoa hồng cổ nở theo mùa.
          </p>
        </div>
      </div>

      {/* Intro */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-subtitle">Không Gian Đặc Biệt</span>
              <h2 className="section-title mb-4">Vườn Hoa Hồng Cổ<br /><em>Giữa Núi Đồi Khe Sanh</em></h2>
              <div className="w-12 h-0.5 bg-gold mb-6" />
              <p className="text-gray-600 leading-relaxed mb-4">
                Vườn hoa hồng cổ tại Trosie là một trong những điểm đặc biệt nhất của khu vườn – nơi những bông hồng cổ điển nở theo mùa, khoe sắc giữa nền xanh của núi rừng Khe Sanh.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Không gian vừa lãng mạn, vừa yên bình. Đây là nơi lý tưởng để dạo bước, chụp ảnh và cảm nhận vẻ đẹp mộc mạc của những bông hoa nở giữa đất trời.
              </p>
              <div className="space-y-3">
                {[
                  { icon: '📸', label: 'Chụp Ảnh', desc: 'Góc check-in đẹp tự nhiên, không cần bộ lọc' },
                  { icon: '🚶', label: 'Dạo Bước', desc: 'Đường đi trong vườn thư thái, yên tĩnh' },
                  { icon: '☕', label: 'Thư Giãn', desc: 'Kết hợp cà phê Trosie giữa vườn hoa' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <span className="font-semibold text-forest-900 text-sm">{item.label}</span>
                      <span className="text-gray-500 text-sm"> – {item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="img-zoom">
              <img src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=900&q=80"
                alt="Vườn hoa hồng Trosie" className="w-full h-[500px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <span className="section-subtitle">Hình Ảnh</span>
            <h2 className="section-title">Khoảnh Khắc Tại Vườn Hoa</h2>
            <div className="w-12 h-0.5 bg-gold mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GALLERY.map((img, i) => (
              <div key={i} className="img-zoom aspect-square overflow-hidden">
                <img src={img} alt={`Vườn hoa hồng ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Season note */}
      <section className="py-12 bg-cream">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="text-4xl mb-4">🌹</div>
          <h3 className="font-serif text-xl text-forest-900 mb-3">Hoa Hồng Nở Theo Mùa</h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            Vườn hoa hồng cổ đẹp nhất vào mùa xuân và đầu hè khi hoa nở rộ.
            Liên hệ trước để biết thời điểm hoa đang nở để có trải nghiệm đẹp nhất.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:0961393370" className="btn-primary">Hỏi Lịch Tham Quan</a>
            <Link to="/lien-he" className="btn-outline">Gửi Tin Nhắn</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
