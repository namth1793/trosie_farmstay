import React from 'react';
import { Link } from 'react-router-dom';

const PROGRAMS = [
  {
    icon: '🔬',
    label: 'Trải Nghiệm STEM',
    desc: 'Chương trình giáo dục thực nghiệm gắn với thiên nhiên – khoa học, công nghệ, kỹ thuật và toán học qua hoạt động ngoài trời.',
    target: 'Học sinh, giáo viên',
    img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80',
  },
  {
    icon: '🌳',
    label: 'Hoạt Động Ngoài Trời',
    desc: 'Khám phá thiên nhiên, leo núi nhẹ, cắm trại, trò chơi tập thể giữa rừng núi Khe Sanh.',
    target: 'Mọi lứa tuổi',
    img: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80',
  },
  {
    icon: '🤝',
    label: 'Team Building',
    desc: 'Chương trình gắn kết doanh nghiệp kết hợp thiên nhiên – xây dựng tinh thần đội nhóm qua các thử thách ngoài trời sáng tạo.',
    target: 'Doanh nghiệp, tổ chức',
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
  },
];

const FOR_WHO = [
  { icon: '🎒', label: 'Học Sinh', desc: 'Trải nghiệm học tập thực địa, STEM ngoài trời' },
  { icon: '👨‍👩‍👧', label: 'Gia Đình', desc: 'Kỳ nghỉ ý nghĩa, gắn kết cùng thiên nhiên' },
  { icon: '🏢', label: 'Doanh Nghiệp', desc: 'Team building, retreat, hội thảo ngoài trời' },
];

export default function Activities() {
  return (
    <div>
      <div className="page-hero" style={{ height: '400px' }}>
        <div className="page-hero-bg"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1920&q=80)' }} />
        <div className="page-hero-overlay" />
        <div className="relative z-10 text-center">
          <span className="section-subtitle">Trosie Garden</span>
          <h1 className="font-serif text-3xl md:text-5xl text-white">Hoạt Động Trải Nghiệm</h1>
        </div>
      </div>

      {/* Intro */}
      <section className="py-16 bg-cream">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="section-subtitle">Chương Trình</span>
          <h2 className="section-title mb-4">Trosie Tổ Chức Nhiều Hoạt Động<br /><em>Gắn Với Thiên Nhiên</em></h2>
          <div className="w-12 h-0.5 bg-gold mx-auto mb-6" />
          <p className="text-gray-600 leading-relaxed">
            Mỗi hoạt động tại Trosie đều được thiết kế để kết nối con người với thiên nhiên và với nhau.
            Không phải chỉ giải trí, mà là những trải nghiệm để lại dấu ấn thật sự.
          </p>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <span className="section-subtitle">Các Chương Trình</span>
            <h2 className="section-title">Lựa Chọn Phù Hợp</h2>
            <div className="w-12 h-0.5 bg-gold mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROGRAMS.map(p => (
              <div key={p.label} className="group">
                <div className="img-zoom mb-5">
                  <img src={p.img} alt={p.label} className="w-full h-56 object-cover" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{p.icon}</span>
                  <h3 className="font-serif text-lg text-forest-900">{p.label}</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">{p.desc}</p>
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  <span className="text-xs text-gray-400 uppercase tracking-wide">{p.target}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For who */}
      <section className="py-16 bg-forest-900">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <span className="section-subtitle">Đối Tượng</span>
            <h2 className="font-serif text-3xl text-white">Dành Cho Ai?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FOR_WHO.map(f => (
              <div key={f.label} className="bg-forest-800 p-6 text-center">
                <div className="text-4xl mb-3">{f.icon}</div>
                <h3 className="font-serif text-lg text-white mb-2">{f.label}</h3>
                <p className="text-gray-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-cream text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="section-title mb-4">Đăng Ký Trải Nghiệm</h2>
          <p className="text-gray-600 text-sm mb-8">Liên hệ để được tư vấn chương trình phù hợp với nhóm của bạn</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:0961393370" className="btn-primary">Gọi: 0961 393 370</a>
            <Link to="/lien-he" className="btn-outline">Gửi Tin Nhắn</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
