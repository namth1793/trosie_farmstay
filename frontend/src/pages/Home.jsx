import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HERO = '/images/home/overview/z6673900773383_7faf7162fc65ba99a780e7c23365085e.jpg';
const CTA_BG = '/images/activities/camping/DSCF8235.JPG';

const SERVICES = [
  { icon: '☕', label: 'Cà Phê Đặc Sản', desc: 'Cà phê organic trồng tại Khe Sanh, rang xay tại chỗ, những thức uống mát lành giữa rừng.', href: '/ca-phe', img: '/images/coffee/cafe-area/DSCF0163.JPG' },
  { icon: '🏕', label: 'Lưu Trú & Cắm Trại', desc: 'Ngủ giữa thiên nhiên, sáng thức dậy trong sương và tiếng chim rừng.', href: '/luu-tru', img: '/images/activities/camping/DSCF0852.JPG' },
  { icon: '🍽', label: 'Nhà Hàng', desc: 'Ẩm thực địa phương – đậm vị – mộc mạc. Nguyên liệu tươi từ vườn và núi rừng Khe Sanh.', href: '/nha-hang', img: '/images/restaurant/gallery/DSCF6002.JPG' },
  { icon: '🛶', label: 'Chèo SUP', desc: 'Trải nghiệm nhẹ nhàng trên mặt nước yên bình, ngắm thiên nhiên xung quanh.', href: '/cheo-sup', img: '/images/activities/sup/z6675583185740_e3d20bed681974dca792a6368981c4f7.jpg' },
  { icon: '🌹', label: 'Vườn Hoa Hồng Cổ', desc: 'Không gian check-in đầy cảm xúc – nơi hoa hồng cổ nở theo mùa giữa núi đồi Khe Sanh.', href: '/vuon-hoa-hong', img: '/images/activities/rose-garden/z6673899322687_4f7481839fba719ad73a5a1e9db0b56d.jpg' },
  { icon: '🌿', label: 'Hoạt Động Trải Nghiệm', desc: 'Vẽ chai lọ, ép hoa khô, cắm trại, team building – dành cho gia đình, học sinh, doanh nghiệp.', href: '/hoat-dong', img: '/images/activities/ep-hoa-kho/DSCF0062.JPG' },
];

const TIMELINE = [
  { time: 'Sáng', icon: '☕', text: 'Uống cà phê dưới rừng thông, view hồ rộng lớn' },
  { time: 'Trưa', icon: '🍽', text: 'Thưởng thức món địa phương đậm đà bản sắc' },
  { time: 'Chiều', icon: '🛶', text: 'Chèo SUP trên mặt nước yên bình' },
  { time: 'Tối', icon: '🔥', text: 'Ăn BBQ, đốt lửa trại, ngắm sao' },
];

const REVIEWS = [
  { text: 'Không ồn ào, không xô bồ, đúng kiểu mình cần. Cảm giác như được reset lại hoàn toàn.', name: 'Minh Anh', from: 'Hà Nội' },
  { text: 'Cà phê ngon thật, không giống chỗ khác. Uống một lần là nhớ mãi hương vị vùng đất Quảng Trị.', name: 'Thanh Hương', from: 'Đà Nẵng' },
  { text: 'Đi một lần là muốn quay lại. Nhân viên thân thiện, không gian yên tĩnh, thiên nhiên tuyệt đẹp.', name: 'Văn Khoa', from: 'TP.HCM' },
];

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('/api/blog?limit=3').then(r => setPosts(r.data)).catch(() => {});
  }, []);

  return (
    <div>

      {/* ── Hero ── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${HERO})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
        <div className="relative z-10 text-center text-white px-4 w-full max-w-4xl mx-auto">
          <p className="text-[11px] tracking-widest uppercase text-gold font-semibold mb-4">
            Khe Sanh — Hướng Hoá — Quảng Trị
          </p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight mb-6">
            Trosie Garden<br /><em>Khe Sanh</em>
          </h1>
          <p className="text-white/80 text-lg md:text-xl mb-4 font-light italic">
            Chạm vào thiên nhiên – Sống chậm lại một chút
          </p>
          <div className="text-white/70 text-sm mb-10 space-y-1.5">
            <p>Ngồi giữa rừng, uống cà phê sạch</p>
            <p>Thức dậy trong sương</p>
            <p>Và trải nghiệm những điều rất thật</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/lien-he" className="btn-gold text-center">Đặt Lịch Trải Nghiệm</Link>
            <Link to="/gioi-thieu" className="btn-outline !border-white/60 !text-white hover:!bg-white/10 hover:!text-white text-center">
              Khám Phá Trosie
            </Link>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
          <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="py-16 bg-cream">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="section-subtitle">Về Chúng Tôi</span>
          <h2 className="section-title mb-4">Không Phải Một Khu Du Lịch<br /><em>Ồn Ào</em></h2>
          <div className="w-12 h-0.5 bg-gold mx-auto mb-6" />
          <p className="text-gray-600 leading-relaxed text-base">
            Trosie Garden nằm tại Khe Sanh – Quảng Trị, nơi khí hậu mát mẻ quanh năm và thiên nhiên vẫn còn nguyên bản.
            Là điểm đến trải nghiệm độc đáo kết hợp giữa homestay, cà phê đặc sản, nhà hàng BBQ và các hoạt động ngoài trời.
            Chúng tôi mong muốn mang đến cho bạn không chỉ dịch vụ lưu trú và ẩm thực, mà còn cả những kỷ niệm gắn liền với thiên nhiên và con người vùng đất lửa.
          </p>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <span className="section-subtitle">Dịch Vụ</span>
            <h2 className="section-title">Trải Nghiệm Tại Trosie</h2>
            <div className="w-12 h-0.5 bg-gold mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map(s => (
              <Link key={s.label} to={s.href} className="group block">
                <div className="img-zoom mb-4 aspect-[4/3] overflow-hidden">
                  <img src={s.img} alt={s.label} className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{s.icon}</span>
                  <h3 className="font-serif text-lg text-forest-900 group-hover:text-gold transition-colors">{s.label}</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed mb-3">{s.desc}</p>
                <span className="text-[11px] font-semibold tracking-widest uppercase text-gold border-b border-gold pb-0.5">
                  Xem Thêm →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Một ngày ở Trosie ── */}
      <section className="py-20 bg-forest-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="section-subtitle">Trải Nghiệm Nổi Bật</span>
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-3">Một Ngày Ở Trosie</h2>
          <p className="text-gray-400 mb-2 italic">Có thể rất đơn giản...</p>
          <div className="w-12 h-0.5 bg-gold mx-auto mb-12" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TIMELINE.map((t, i) => (
              <div key={i} className="relative">
                {i < TIMELINE.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-forest-700" />
                )}
                <div className="relative bg-forest-800 p-5 text-center">
                  <div className="text-3xl mb-2">{t.icon}</div>
                  <div className="text-gold text-[10px] font-bold tracking-widest uppercase mb-1">{t.time}</div>
                  <p className="text-gray-300 text-sm leading-relaxed">{t.text}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-gray-400 mt-10 text-sm italic max-w-xl mx-auto">
            Nhưng chính những điều đơn giản đó lại khiến người ta nhớ rất lâu.
          </p>
        </div>
      </section>

      {/* ── Coffee highlight ── */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="img-zoom">
              <img src="/images/coffee/cafe-area/DSCF0211.JPG"
                alt="Trosie Coffee" className="w-full h-[450px] object-cover" />
            </div>
            <div>
              <span className="section-subtitle">Cà Phê Đặc Sản</span>
              <h2 className="section-title mb-2">From the Land of Fire<br /><em>Quảng Trị Specialty Coffee</em></h2>
              <div className="w-12 h-0.5 bg-gold mb-6" />
              <p className="text-gray-600 leading-relaxed mb-4">
                Trosie Coffee – Cà phê organic từ Khe Sanh, Quảng Trị. Mang hương vị thuần khiết từ đất trời và con người vùng đất lửa.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Mỗi hạt cà phê được chăm sóc kỹ lưỡng, rang mộc và mang đến hương vị nguyên bản – để bạn không chỉ thưởng thức cà phê, mà còn thưởng thức cả một vùng đất.
              </p>
              <div className="flex gap-3 flex-wrap">
                <Link to="/ca-phe" className="btn-outline">Tìm Hiểu Thêm</Link>
                <Link to="/ca-phe/shop" className="btn-gold">Mua Cà Phê</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Guest Gallery ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <span className="section-subtitle">Check-in Tại Trosie</span>
            <h2 className="section-title">Khoảnh Khắc Của Khách</h2>
            <div className="w-12 h-0.5 bg-gold mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              '/images/gallery/checkin/z6673902322313_77a98fc5b609a9836b6c55e2388bba83.jpg',
              '/images/gallery/checkin/z6673902331887_fb0223028c3f18db46a01ffba48bf64f.jpg',
              '/images/gallery/checkin/z6673902364455_3ccb72a9d70161457a7432a173249cee.jpg',
              '/images/gallery/checkin/z6673902371745_97bf5508c093ef65676aab117a85f901.jpg',
              '/images/gallery/checkin/z6673902394002_47d0f7d9f33bdae2d4f893941301fcff.jpg',
              '/images/gallery/checkin/z6673902404703_2e3f2f4e64754144218af1aedba8b928.jpg',
              '/images/gallery/checkin/z6673902442783_d2adafc060da8806c098ce40cf32e315.jpg',
              '/images/gallery/checkin/z6673902451299_f7b69b5c7c30a0cccb131f6e390dabb5.jpg',
            ].map((img, i) => (
              <div key={i} className="img-zoom aspect-square overflow-hidden">
                <img src={img} alt={`Khách check-in ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-subtitle">Khách Hàng Nói Gì</span>
            <h2 className="section-title">Cảm Nhận Thật</h2>
            <div className="w-12 h-0.5 bg-gold mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((r, i) => (
              <div key={i} className="bg-cream p-8 relative">
                <svg className="w-8 h-8 text-gold/30 absolute top-6 right-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
                <p className="text-gray-600 leading-relaxed mb-6 italic">"{r.text}"</p>
                <div>
                  <div className="font-semibold text-forest-900 text-sm">{r.name}</div>
                  <div className="text-xs text-gray-400">{r.from}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Blog ── */}
      {posts.length > 0 && (
        <section className="py-20 bg-cream">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <span className="section-subtitle">Blog</span>
              <h2 className="section-title">Chia Sẻ Từ Trosie</h2>
              <div className="w-12 h-0.5 bg-gold mx-auto mt-4" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posts.map(p => (
                <Link key={p.id} to={`/tin-tuc/${p.slug}`} className="group block">
                  <div className="img-zoom mb-4">
                    <img src={p.image} alt={p.title} className="w-full h-52 object-cover" />
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[11px] bg-forest-100 text-forest-700 px-2 py-0.5 font-semibold uppercase tracking-wider">{p.category}</span>
                    <span className="text-xs text-gray-400">{new Date(p.published_at).toLocaleDateString('vi-VN')}</span>
                  </div>
                  <h3 className="font-serif text-lg text-forest-900 group-hover:text-gold transition-colors mb-2 line-clamp-2">{p.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{p.excerpt}</p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link to="/tin-tuc" className="btn-outline">Xem Tất Cả Bài Viết</Link>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="relative py-28 text-center overflow-hidden"
        style={{ backgroundImage: `url(${CTA_BG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-forest-900/80" />
        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <span className="section-subtitle">Đặt Lịch Ngay</span>
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
            Hãy Để Trosie<br /><em>Chào Đón Bạn</em>
          </h2>
          <p className="text-gray-300 text-sm mb-8 leading-relaxed">
            Liên hệ qua Hotline / Zalo để được tư vấn và đặt lịch trải nghiệm.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:0961393370" className="btn-gold">Gọi: 0961 393 370</a>
            <Link to="/lien-he" className="btn-outline !border-white/60 !text-white hover:!bg-white/10 hover:!text-white">
              Liên Hệ Tư Vấn
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
