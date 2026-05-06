import React from 'react';
import { Link } from 'react-router-dom';

const VALUES = [
  { icon: '🌿', label: 'Tự Nhiên', desc: 'Mọi trải nghiệm tại Trosie đều xuất phát từ thiên nhiên và trở về với thiên nhiên.' },
  { icon: '🤲', label: 'Chân Thật', desc: 'Không phô trương, không cầu kỳ. Chỉ là những điều thật sự có giá trị.' },
  { icon: '♻️', label: 'Bền Vững', desc: 'Xây dựng theo hướng bảo tồn môi trường và hỗ trợ cộng đồng địa phương.' },
];

export default function About() {
  return (
    <div>
      <div className="page-hero" style={{ height: '400px' }}>
        <div className="page-hero-bg" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=1920&q=80)' }} />
        <div className="page-hero-overlay" />
        <div className="relative z-10 text-center">
          <span className="section-subtitle">Câu Chuyện</span>
          <h1 className="font-serif text-3xl md:text-5xl text-white">Giới Thiệu</h1>
        </div>
      </div>

      {/* Story */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="img-zoom">
              <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=80"
                alt="Trosie Garden" className="w-full h-[500px] object-cover" />
            </div>
            <div>
              <span className="section-subtitle">Câu Chuyện Trosie</span>
              <h2 className="section-title mb-2">Bắt Đầu Từ Một<br /><em>Mong Muốn Rất Đơn Giản</em></h2>
              <div className="w-12 h-0.5 bg-gold mb-6" />
              <p className="text-gray-600 leading-relaxed mb-4 text-base">
                Trosie bắt đầu từ một mong muốn rất đơn giản: <strong>tạo ra một nơi mà con người có thể quay về với thiên nhiên.</strong>
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Không quá thương mại. Không quá ồn ào. Chỉ là những trải nghiệm thật.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Từ một khu đất nhỏ tại Khe Sanh – mảnh đất được mệnh danh là "vùng đất lửa" với lịch sử hào hùng và thiên nhiên hùng vĩ – Trosie dần được xây dựng bằng vườn hoa hồng cổ, cây xanh, cà phê đặc sản và những con người yêu thiên nhiên.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Khe Sanh có khí hậu mát mẻ quanh năm, đất đỏ bazan màu mỡ, lý tưởng cho cà phê Arabica phát triển. Đó chính là nền tảng để Trosie Coffee ra đời và được vinh danh nhiều lần tại các cuộc thi cà phê đặc sản toàn quốc.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-forest-900 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="section-subtitle">Sứ Mệnh</span>
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
            Mang Lại Những Trải Nghiệm<br /><em>Chân Thật & Gần Gũi Với Thiên Nhiên</em>
          </h2>
          <div className="w-12 h-0.5 bg-gold mx-auto" />
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-subtitle">Giá Trị Cốt Lõi</span>
            <h2 className="section-title">Trosie Tin Vào</h2>
            <div className="w-12 h-0.5 bg-gold mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map(v => (
              <div key={v.label} className="bg-cream p-8 text-center">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-serif text-xl text-forest-900 mb-3">{v.label}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-subtitle">Hành Trình</span>
              <h2 className="section-title mb-4">Từ Mảnh Đất Nhỏ<br /><em>Đến Trosie Ngày Hôm Nay</em></h2>
              <div className="w-12 h-0.5 bg-gold mb-8" />
              <div className="space-y-6">
                {[
                  { label: 'Vườn Hoa Hồng Cổ', desc: 'Không gian check-in đầy cảm xúc, hoa nở theo mùa giữa núi đồi Khe Sanh.' },
                  { label: 'Cà Phê Trosie', desc: 'Arabica đặc sản Quảng Trị – Top 1 Việt Nam nhiều năm liên tiếp.' },
                  { label: 'Chèo SUP & Cắm Trại', desc: 'Trải nghiệm nước và thiên nhiên cho mọi lứa tuổi.' },
                  { label: 'Cộng Đồng Yêu Thiên Nhiên', desc: 'Những con người cùng chung giá trị: sống chậm, sống thật.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 bg-gold text-white flex items-center justify-center font-serif text-lg shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-forest-900 mb-1">{item.label}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="img-zoom">
              <img src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=900&q=80"
                alt="Trosie Coffee Farm" className="w-full h-[500px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-forest-900 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-serif text-2xl md:text-3xl text-white mb-4">Đến Trosie, Trải Nghiệm Điều Thật</h2>
          <p className="text-gray-400 text-sm mb-8">Hotline / Zalo: 0961 393 370</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:0961393370" className="btn-gold">Gọi Ngay</a>
            <Link to="/lien-he" className="btn-outline !border-white/50 !text-white hover:!bg-white/10 hover:!text-white">
              Gửi Tin Nhắn
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
