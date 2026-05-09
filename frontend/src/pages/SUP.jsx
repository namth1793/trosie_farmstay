import React from 'react';
import { Link } from 'react-router-dom';

const FEATURES = [
  { icon: '🌊', label: 'Mặt Nước Yên Bình', desc: 'Hồ nước trong xanh, êm ả, lý tưởng cho cả người mới bắt đầu.' },
  { icon: '🌿', label: 'View Thiên Nhiên', desc: 'Chèo SUP giữa khung cảnh núi rừng Khe Sanh – trải nghiệm khó quên.' },
  { icon: '📸', label: 'Check-in Sống Ảo', desc: 'Góc chụp ảnh đẹp trên mặt nước, hoàn hảo cho những khoảnh khắc đáng nhớ.' },
  { icon: '👍', label: 'Ai Cũng Có Thể Thử', desc: 'Không cần kinh nghiệm, có hướng dẫn viên hỗ trợ tận tình.' },
];

export default function SUP() {
  return (
    <div>
      <div className="page-hero" style={{ height: '500px' }}>
        <div className="page-hero-bg"
          style={{ backgroundImage: 'url(/images/activities/sup/z6675583185740_e3d20bed681974dca792a6368981c4f7.jpg)' }} />
        <div className="page-hero-overlay" />
        <div className="relative z-10 text-center">
          <span className="section-subtitle">Trosie Garden</span>
          <h1 className="font-serif text-3xl md:text-5xl text-white mb-4">Chèo SUP</h1>
          <p className="text-white/75 text-base max-w-xl mx-auto">
            Một trải nghiệm nhẹ nhàng, ai cũng có thể thử.
          </p>
        </div>
      </div>

      {/* Intro */}
      <section className="py-16 bg-cream">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="section-subtitle">Trải Nghiệm</span>
          <h2 className="section-title mb-4">Lướt Nhẹ Trên Mặt Nước<br /><em>Giữa Núi Rừng Khe Sanh</em></h2>
          <div className="w-12 h-0.5 bg-gold mx-auto mb-6" />
          <p className="text-gray-600 leading-relaxed">
            Stand Up Paddleboarding (SUP) là hoạt động giải trí ngoài trời tuyệt vời – vừa nhẹ nhàng, vừa thú vị.
            Tại Trosie, bạn sẽ được chèo SUP trên hồ nước yên bình, ngắm nhìn thiên nhiên núi rừng Khe Sanh từ góc nhìn hoàn toàn mới.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="img-zoom">
              <img src="/images/activities/sup/z6675583237362_8754e49f33c4e2b005725e213d23f920.jpg"
                alt="Chèo SUP Trosie" className="w-full h-[450px] object-cover" />
            </div>
            <div>
              <span className="section-subtitle">Điểm Nổi Bật</span>
              <h2 className="section-title mb-8">Tại Sao Nên Thử<br /><em>Chèo SUP Tại Trosie?</em></h2>
              <div className="space-y-6">
                {FEATURES.map(f => (
                  <div key={f.label} className="flex gap-4">
                    <div className="w-12 h-12 bg-forest-100 flex items-center justify-center text-2xl shrink-0">
                      {f.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-forest-900 mb-1">{f.label}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SUP Gallery */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <span className="section-subtitle">Hình Ảnh</span>
            <h2 className="section-title">Khoảnh Khắc Chèo SUP</h2>
            <div className="w-12 h-0.5 bg-gold mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              '/images/activities/sup/z6675583272946_be4e0cfe0ebcacaa80e37de6e51da87b.jpg',
              '/images/activities/sup/z6675583273246_7da2f8582a549811a35bd148f87b8880.jpg',
              '/images/activities/sup/z6675583293269_4bcfe18b8fa8d2876ec26f44d26a4b6c.jpg',
              '/images/activities/sup/z6675583306642_fade33bfc1609207f474864e272b44ca.jpg',
              '/images/activities/sup/z6675583316783_9cb43a3c25bf88742771cbf155f63abe.jpg',
              '/images/activities/sup/z6675583431533_983fc08b1c5221b43be556341a299651.jpg',
              '/images/activities/sup/z6675583442103_6fef89e2c29fed23ee12e7de4c6e27de.jpg',
              '/images/activities/sup/z6675583496788_f8deabb3973825e914f24916adeffa0a.jpg',
              '/images/activities/sup/z6675583507756_8375ad5886b8e9ab07cc981278424953.jpg',
            ].map((img, i) => (
              <div key={i} className="img-zoom aspect-[4/3] overflow-hidden">
                <img src={img} alt={`Chèo SUP ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For who */}
      <section className="py-16 bg-forest-900">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <span className="section-subtitle">Phù Hợp Với</span>
            <h2 className="font-serif text-3xl text-white">Dành Cho Tất Cả Mọi Người</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              { icon: '🆕', label: 'Người Mới', desc: 'Không cần kỹ năng, được hướng dẫn từ đầu' },
              { icon: '👫', label: 'Nhóm Bạn', desc: 'Vui vẻ, năng động, tạo kỷ niệm khó quên' },
              { icon: '📱', label: 'Check-in Sống Ảo', desc: 'Góc ảnh đẹp tuyệt vời trên mặt nước' },
            ].map(item => (
              <div key={item.label} className="bg-forest-800 p-6">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-serif text-lg text-white mb-2">{item.label}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-cream text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="section-title mb-4">Đặt Lịch Chèo SUP</h2>
          <p className="text-gray-600 text-sm mb-8">Liên hệ để biết lịch và giá trải nghiệm SUP tại Trosie</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:0961393370" className="btn-primary">Gọi: 0961 393 370</a>
            <Link to="/lien-he" className="btn-outline">Gửi Tin Nhắn</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
