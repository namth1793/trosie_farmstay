import React from 'react';
import { Link } from 'react-router-dom';

const TYPES = [
  {
    icon: '🏕',
    label: 'Lều Cắm Trại',
    desc: 'Ngủ giữa thiên nhiên trong lều được trang bị đầy đủ. Trải nghiệm cắm trại an toàn, thoải mái nhưng vẫn giữ được sự gần gũi với rừng núi.',
    img: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=800&q=80',
    features: ['Lều chống thấm chất lượng cao', 'Túi ngủ & nệm ngoài trời', 'Đèn chiếu sáng', 'Phù hợp 2–4 người'],
  },
  {
    icon: '🌿',
    label: 'Khu Nghỉ Đơn Giản',
    desc: 'Không gian lưu trú mộc mạc nhưng đủ tiện nghi. Thiết kế gần gũi với thiên nhiên, phù hợp cho những ai muốn trải nghiệm thực sự.',
    img: 'https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?w=800&q=80',
    features: ['Giường đôi / đơn', 'Nhà vệ sinh chung sạch sẽ', 'Quạt / thông gió tự nhiên', 'Phù hợp 2 người'],
  },
];

const AMENITIES = [
  { icon: '🍳', label: 'Ăn uống tại chỗ' },
  { icon: '🔇', label: 'Không gian yên tĩnh' },
  { icon: '👨‍👩‍👧', label: 'Phù hợp nhóm bạn / gia đình' },
  { icon: '🌄', label: 'Sáng sương mù' },
  { icon: '🔥', label: 'Tối lửa trại' },
  { icon: '🌳', label: 'Ngủ giữa rừng' },
];

export default function LuuTru() {
  return (
    <div>
      <div className="page-hero" style={{ height: '400px' }}>
        <div className="page-hero-bg"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=1920&q=80)' }} />
        <div className="page-hero-overlay" />
        <div className="relative z-10 text-center">
          <span className="section-subtitle">Trosie Garden</span>
          <h1 className="font-serif text-3xl md:text-5xl text-white">Lưu Trú & Cắm Trại</h1>
        </div>
      </div>

      {/* Intro */}
      <section className="py-16 bg-cream">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="section-subtitle">Trải Nghiệm</span>
          <h2 className="section-title mb-4">Ở Trosie, Bạn Không Chỉ "Ngủ"</h2>
          <div className="w-12 h-0.5 bg-gold mx-auto mb-6" />
          <p className="text-gray-600 leading-relaxed">
            Mà là trải nghiệm một đêm giữa thiên nhiên. Ngủ giữa rừng, sáng thức dậy trong sương, tối đốt lửa trại ngắm sao –
            những điều đơn giản nhưng để lại ký ức không phai.
          </p>
        </div>
      </section>

      {/* Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <span className="section-subtitle">Loại Hình</span>
            <h2 className="section-title">Lựa Chọn Phù Hợp Với Bạn</h2>
            <div className="w-12 h-0.5 bg-gold mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {TYPES.map(t => (
              <div key={t.label} className="group">
                <div className="img-zoom mb-6">
                  <img src={t.img} alt={t.label} className="w-full h-72 object-cover" />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{t.icon}</span>
                  <h3 className="font-serif text-xl text-forest-900">{t.label}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{t.desc}</p>
                <ul className="space-y-1.5">
                  {t.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-gold shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience timeline */}
      <section className="py-20 bg-forest-900">
        <div className="max-w-5xl mx-auto px-4 lg:px-8 text-center">
          <span className="section-subtitle">Trải Nghiệm</span>
          <h2 className="font-serif text-3xl text-white mb-12">Một Đêm Tại Trosie</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { time: 'Buổi Tối', icon: '🔥', desc: 'Ăn BBQ, đốt lửa trại, kể chuyện dưới bầu trời đầy sao' },
              { time: 'Đêm', icon: '⛺', desc: 'Ngủ trong lều giữa thiên nhiên, hít thở không khí trong lành của núi rừng' },
              { time: 'Sáng Sớm', icon: '🌄', desc: 'Thức dậy trong sương, nhâm nhi cà phê, nghe chim rừng ca hát' },
            ].map(item => (
              <div key={item.time} className="bg-forest-800 p-6 text-center">
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="text-gold text-[10px] font-bold tracking-widest uppercase mb-2">{item.time}</div>
                <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-16 bg-cream">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <span className="section-subtitle">Tiện Ích</span>
            <h2 className="section-title">Đầy Đủ Cho Kỳ Nghỉ</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {AMENITIES.map(a => (
              <div key={a.label} className="bg-white p-5 flex items-center gap-3">
                <span className="text-2xl">{a.icon}</span>
                <span className="text-sm font-semibold text-forest-900">{a.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-forest-900 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="font-serif text-2xl text-white mb-4">Đặt Chỗ Lưu Trú</h2>
          <p className="text-gray-400 text-sm mb-8">Liên hệ trực tiếp qua Hotline / Zalo để biết lịch trống và giá</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:0961393370" className="btn-gold">Gọi: 0961 393 370</a>
            <Link to="/lien-he" className="btn-outline !border-white/50 !text-white hover:!bg-white/10 hover:!text-white">
              Gửi Tin Nhắn
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
