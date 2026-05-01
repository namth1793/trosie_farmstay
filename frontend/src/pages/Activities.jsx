import React from 'react';
import { Link } from 'react-router-dom';

const HERO = 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1920&q=80';

const ACTIVITIES = [
  {
    title: 'Đạp Xe Khám Phá', cat: 'Ngoài trời', duration: 'Cả ngày / Nửa ngày', level: 'Dễ',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    desc: 'Khám phá những con đường làng quê yên bình quanh thôn Chày Lập bằng xe đạp. Cảm nhận nhịp sống bình dị của người dân địa phương, qua những cánh đồng lúa xanh mướt và vườn cây trái sum suê.',
    highlights: ['Xe đạp cung cấp miễn phí', 'Bản đồ tự khám phá', 'Hướng dẫn theo yêu cầu', 'Phù hợp mọi lứa tuổi'],
  },
  {
    title: 'Kayak & Bơi Thuyền', cat: 'Dưới nước', duration: '2-4 giờ', level: 'Trung bình',
    img: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
    desc: 'Chèo thuyền kayak trên dòng sông Chày trong xanh, ngắm nhìn cảnh quan thiên nhiên từ mặt nước. Có thể tắm sông tại các điểm an toàn dọc theo tuyến đường.',
    highlights: ['Kayak đơn và đôi', 'Hướng dẫn an toàn', 'Áo phao cung cấp', 'Điểm tắm sông tuyệt đẹp'],
  },
  {
    title: 'Trải Nghiệm Nông Nghiệp', cat: 'Văn hóa', duration: '2-3 giờ', level: 'Dễ',
    img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80',
    desc: 'Trở thành người nông dân thực thụ với trải nghiệm trồng và thu hoạch rau tại vườn hữu cơ của farmstay. Học cách chăm sóc cây, hiểu về canh tác bền vững và thưởng thức thành quả ngay tại bàn ăn.',
    highlights: ['Vườn rau hữu cơ thực tế', 'Hướng dẫn bởi nông dân địa phương', 'Mang rau về phòng', 'Trải nghiệm cho mọi lứa tuổi'],
  },
  {
    title: 'Trekking Rừng Nguyên Sinh', cat: 'Phiêu lưu', duration: 'Cả ngày', level: 'Khó',
    img: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80',
    desc: 'Chinh phục các cung đường trekking qua rừng nguyên sinh Phong Nha - Kẻ Bàng cùng hướng dẫn viên địa phương có kinh nghiệm. Khám phá hệ thống hang động và sinh thái rừng độc đáo.',
    highlights: ['Hướng dẫn viên người địa phương', 'Trang thiết bị đầy đủ', 'Cung đường đa dạng cấp độ', 'Phù hợp nhóm từ 2+ người'],
  },
  {
    title: 'Tour Hang Động Phong Nha', cat: 'Văn hóa', duration: 'Cả ngày', level: 'Trung bình',
    img: 'https://images.unsplash.com/photo-1592364395653-83e648b20cc2?w=800&q=80',
    desc: 'Tham quan hệ thống hang động nổi tiếng thế giới tại Phong Nha - Kẻ Bàng: Hang Phong Nha, Hang Thiên Đường, Hang Én... Mỗi hang động là một kỳ quan thiên nhiên độc đáo.',
    highlights: ['Phương tiện đưa đón từ farmstay', 'Hướng dẫn viên có chuyên môn', 'Đặt tour linh hoạt', 'Nhiều lựa chọn hang động'],
  },
  {
    title: 'Chạy Bộ Buổi Sáng', cat: 'Sức khỏe', duration: '1-2 giờ', level: 'Trung bình',
    img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    desc: 'Chạy bộ qua những con đường làng yên tĩnh, hít thở không khí trong lành và tận hưởng cảnh bình minh tuyệt đẹp trên thung lũng Chày Lập. Bản đồ cung đường sẵn có tại farmstay.',
    highlights: ['Cung đường 5km / 10km', 'Không khí trong lành buổi sáng', 'Bản đồ cung đường chi tiết', 'Nước uống sau chạy'],
  },
  {
    title: 'Teambuilding & Workshop', cat: 'Nhóm', duration: 'Theo yêu cầu', level: 'Linh hoạt',
    img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
    desc: 'Chương trình teambuilding được thiết kế riêng cho doanh nghiệp và nhóm bạn. Các hoạt động xây dựng tinh thần đoàn kết, kỹ năng giao tiếp và lãnh đạo trong môi trường thiên nhiên.',
    highlights: ['Chương trình tùy chỉnh', 'Không gian ngoài trời rộng rãi', 'Facilitator chuyên nghiệp', 'Kết hợp ăn uống và lưu trú'],
  },
  {
    title: 'Yoga & Thiền Định', cat: 'Sức khỏe', duration: '1 giờ', level: 'Dễ',
    img: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80',
    desc: 'Lớp yoga buổi sáng ngoài trời giữa khung cảnh thiên nhiên trong lành của thung lũng Chày Lập. Phù hợp cho người mới bắt đầu đến người có kinh nghiệm.',
    highlights: ['Lớp học hàng ngày lúc 6:30', 'Thảm và dụng cụ cung cấp', 'Giáo viên có chứng chỉ', 'Thiền định sau yoga'],
  },
];

const SERVICES = [
  { title: 'Đón/Tiễn Sân Bay', desc: 'Đưa đón sân bay Đồng Hới (HUI) với xe riêng có máy lạnh. Đặt trước qua email hoặc điện thoại.', price: 'Từ 350.000đ' },
  { title: 'Thuê Xe Máy', desc: 'Cho thuê xe máy theo ngày để tự khám phá khu vực Phong Nha - Kẻ Bàng.', price: '150.000đ/ngày' },
  { title: 'Đặt Tour Hang Động', desc: 'Hỗ trợ đặt và tổ chức các tour hang động nổi tiếng: Phong Nha, Thiên Đường, Sơn Đoòng...', price: 'Theo tour' },
  { title: 'Tổ Chức Sự Kiện', desc: 'Tổ chức tiệc sinh nhật, kỷ niệm, đám cưới nhỏ và các sự kiện đặc biệt tại farmstay.', price: 'Liên hệ' },
];

export default function Activities() {
  return (
    <div>
      <div className="page-hero">
        <div className="page-hero-bg" style={{ backgroundImage: `url(${HERO})` }} />
        <div className="page-hero-overlay" />
        <div className="relative z-10 text-center">
          <span className="section-subtitle">Trải Nghiệm</span>
          <h1 className="font-serif text-3xl md:text-5xl text-white">Hoạt Động & Dịch Vụ</h1>
        </div>
      </div>

      {/* Intro */}
      <section className="py-14 bg-cream">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-gray-600 leading-relaxed">
            Chày Lập Farmstay không chỉ là nơi nghỉ ngơi mà còn là điểm khởi đầu cho những cuộc phiêu lưu thú vị. Từ hoạt động ngoài trời đến trải nghiệm văn hóa địa phương, chúng tôi luôn có điều gì đó mới để khám phá.
          </p>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-subtitle">Hoạt Động</span>
            <h2 className="section-title">Khám Phá & Trải Nghiệm</h2>
            <div className="w-10 h-0.5 bg-gold mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ACTIVITIES.map(act => (
              <div key={act.title} className="group flex flex-col sm:flex-row gap-5 bg-cream p-5 hover:shadow-lg transition-shadow">
                <div className="img-zoom shrink-0">
                  <img src={act.img} alt={act.title} className="w-full sm:w-44 h-44 object-cover" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] bg-forest-100 text-forest-700 px-2 py-0.5 font-bold uppercase tracking-wider">{act.cat}</span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">{act.level}</span>
                  </div>
                  <h3 className="font-serif text-lg text-forest-900 group-hover:text-gold transition-colors mb-2">{act.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-3 line-clamp-3">{act.desc}</p>
                  <div className="text-xs text-gray-400 mb-3">⏱ {act.duration}</div>
                  <ul className="space-y-1">
                    {act.highlights.slice(0, 2).map(h => (
                      <li key={h} className="flex items-center gap-1.5 text-xs text-gray-600">
                        <svg className="w-3 h-3 text-gold shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional services */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-subtitle">Hỗ Trợ</span>
            <h2 className="section-title">Dịch Vụ Bổ Sung</h2>
            <div className="w-10 h-0.5 bg-gold mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map(s => (
              <div key={s.title} className="bg-white p-6">
                <h3 className="font-serif text-base text-forest-900 mb-3">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{s.desc}</p>
                <div className="text-gold font-semibold text-sm">{s.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-forest-900 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="font-serif text-2xl text-white mb-4">Hỏi Về Hoạt Động</h2>
          <p className="text-gray-300 text-sm mb-6">Liên hệ để được tư vấn và lên kế hoạch cho kỳ nghỉ hoàn hảo của bạn.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+842899955168" className="btn-gold text-center">Gọi Ngay</a>
            <Link to="/lien-he" className="btn-outline !border-white !text-white hover:!bg-white hover:!text-forest-900">Gửi Yêu Cầu</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
