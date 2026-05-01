import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BookingModal from '../components/BookingModal';

const HERO = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80';

const OFFERS = [
  {
    badge: 'Đặt Sớm',
    title: 'Ưu Đãi Đặt Phòng Sớm 20%',
    desc: 'Đặt phòng trước ít nhất 30 ngày để nhận ngay ưu đãi giảm 20% cho tất cả loại phòng. Không giới hạn số đêm lưu trú.',
    validUntil: '31/12/2026',
    includes: ['Giảm 20% giá phòng', 'Bữa sáng miễn phí', 'Check-in sớm nếu còn phòng', 'Late check-out đến 14:00'],
    code: 'EARLY20',
    color: 'bg-forest-900',
  },
  {
    badge: 'Kỳ Nghỉ Dài',
    title: 'Ở 3 Đêm Tặng 1 Đêm',
    desc: 'Đặt phòng từ 3 đêm trở lên và nhận tặng thêm 1 đêm hoàn toàn miễn phí. Áp dụng cho tất cả phòng từ thứ 2 đến thứ 5.',
    validUntil: '30/06/2026',
    includes: ['3 đêm trả tiền, 1 đêm miễn phí', 'Bữa sáng tất cả các ngày', 'Tour nông nghiệp miễn phí', '1 lần massage 45 phút'],
    code: 'STAY3GET1',
    color: 'bg-gold-dark',
  },
  {
    badge: 'Cặp Đôi',
    title: 'Gói Lãng Mạn Cho Đôi',
    desc: 'Gói đặc biệt dành cho các cặp đôi: phòng Garden hoặc Mountain, bữa tối lãng mạn bên ngoài trời, và liệu trình spa đôi.',
    validUntil: '31/12/2026',
    includes: ['Phòng Garden/Mountain 2 đêm', 'Bữa tối ngoài trời (2 người)', 'Spa đôi 90 phút', 'Hoa & rượu chào mừng', 'Bữa sáng mỗi ngày'],
    code: 'COUPLE2024',
    color: 'bg-forest-700',
  },
  {
    badge: 'Nhóm & Team',
    title: 'Ưu Đãi Đặt Nhóm',
    desc: 'Đặt phòng cho nhóm từ 6 người trở lên nhận ưu đãi đặc biệt và chương trình teambuilding tùy chỉnh.',
    validUntil: 'Liên hệ',
    includes: ['Giảm 15-25% giá phòng', 'Phòng họp miễn phí', 'Chương trình teambuilding', 'BBQ buổi tối', 'Hướng dẫn viên riêng'],
    code: 'GROUP2024',
    color: 'bg-forest-800',
  },
];

const FAQ = [
  { q: 'Làm thế nào để áp dụng mã ưu đãi?', a: 'Nhập mã ưu đãi vào ô "Yêu cầu đặc biệt" khi đặt phòng hoặc thông báo qua điện thoại/email khi liên hệ.' },
  { q: 'Ưu đãi có thể kết hợp với nhau không?', a: 'Các ưu đãi không được kết hợp với nhau. Mỗi lần đặt chỉ áp dụng một ưu đãi.' },
  { q: 'Chính sách hủy phòng khi có ưu đãi?', a: 'Hủy miễn phí trước 7 ngày. Hủy trong 7 ngày mất 50%. Đặt sớm không hoàn tiền nếu hủy trong 72h.' },
  { q: 'Ưu đãi có áp dụng cho ngày lễ không?', a: 'Một số ưu đãi có thể không áp dụng trong các ngày lễ và cao điểm. Vui lòng kiểm tra khi đặt phòng.' },
];

export default function Offers() {
  const [showBooking, setShowBooking] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div>
      <div className="page-hero">
        <div className="page-hero-bg" style={{ backgroundImage: `url(${HERO})` }} />
        <div className="page-hero-overlay" />
        <div className="relative z-10 text-center">
          <span className="section-subtitle">Ưu Đãi</span>
          <h1 className="font-serif text-3xl md:text-5xl text-white">Ưu Đãi & Khuyến Mãi</h1>
        </div>
      </div>

      {/* Offers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-subtitle">Đặc Biệt</span>
            <h2 className="section-title">Ưu Đãi Hiện Tại</h2>
            <div className="w-10 h-0.5 bg-gold mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {OFFERS.map(offer => (
              <div key={offer.title} className="border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                <div className={`${offer.color} text-white p-6`}>
                  <span className="text-[11px] font-bold tracking-widest uppercase bg-white/20 px-3 py-1 mb-3 inline-block">{offer.badge}</span>
                  <h3 className="font-serif text-xl mb-2">{offer.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{offer.desc}</p>
                </div>
                <div className="p-6">
                  <h4 className="text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-3">Bao gồm</h4>
                  <ul className="space-y-2 mb-5">
                    {offer.includes.map(i => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-gold mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {i}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <div className="text-[11px] text-gray-400 uppercase tracking-wider">Mã ưu đãi</div>
                      <div className="font-mono font-bold text-forest-700 text-sm mt-0.5 bg-forest-50 px-3 py-1 inline-block">{offer.code}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] text-gray-400 uppercase tracking-wider">Hiệu lực đến</div>
                      <div className="text-sm font-medium text-gray-600">{offer.validUntil}</div>
                    </div>
                  </div>
                  <button onClick={() => setShowBooking(true)} className="btn-primary w-full text-center mt-4">
                    Đặt Ngay
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-cream">
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <span className="section-subtitle">Câu Hỏi Thường Gặp</span>
            <h2 className="section-title">FAQ Về Ưu Đãi</h2>
          </div>
          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <div key={i} className="bg-white">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left">
                  <span className="font-serif text-base text-forest-900">{item.q}</span>
                  <svg className={`w-5 h-5 text-gold shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-forest-900 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="font-serif text-2xl text-white mb-4">Hỏi Về Ưu Đãi Doanh Nghiệp</h2>
          <p className="text-gray-300 text-sm mb-6">Liên hệ để nhận báo giá ưu đãi riêng cho đoàn lớn, hội nghị hoặc teambuilding.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="mailto:sales@phongnhaholiday.com" className="btn-gold text-center">Gửi Email</a>
            <Link to="/lien-he" className="btn-outline !border-white !text-white hover:!bg-white hover:!text-forest-900">Liên Hệ</Link>
          </div>
        </div>
      </section>

      {showBooking && <BookingModal onClose={() => setShowBooking(false)} />}
    </div>
  );
}
