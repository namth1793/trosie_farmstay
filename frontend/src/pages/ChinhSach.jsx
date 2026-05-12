import React from 'react';
import { Link } from 'react-router-dom';

const sections = [
  {
    num: '1',
    title: 'XÁC NHẬN ĐẶT PHÒNG',
    items: [
      'Đặt phòng được xác nhận sau khi khách hoàn tất thanh toán tiền cọc theo hướng dẫn.',
      'Trosie sẽ giữ phòng đúng theo thông tin và thời gian khách đã đặt.',
    ],
  },
  {
    num: '2',
    title: 'CHÍNH SÁCH ĐẶT CỌC',
    items: [
      'Đặt cọc từ 50% tổng giá trị booking tuỳ thời điểm và số phòng.',
      'Các dịp lễ, Tết hoặc nhóm đông có thể yêu cầu cọc cao hơn.',
      'Phần còn lại thanh toán khi check-in hoặc theo thoả thuận.',
    ],
  },
  {
    num: '4',
    title: 'CHÍNH SÁCH ĐỔI NGÀY',
    items: [
      'Hỗ trợ đổi lịch 01 lần miễn phí nếu báo trước ít nhất 05 ngày.',
      'Việc đổi lịch phụ thuộc vào tình trạng phòng còn trống.',
      'Booking lễ/Tết có thể không áp dụng đổi lịch.',
    ],
  },
  {
    num: '6',
    title: 'LƯU Ý',
    items: [
      'Chính sách áp dụng cho tất cả khách đặt phòng trực tiếp qua fanpage, hotline hoặc website của Trosie.',
      'Với các booking qua nền tảng trung gian (Booking, Agoda, Traveloka...), chính sách sẽ theo quy định của nền tảng đó.',
    ],
  },
];

const cancelRows = [
  { emoji: '🔸', when: 'Huỷ trước 07 ngày', policy: 'Hoàn lại 100% tiền cọc hoặc hỗ trợ bảo lưu booking trong vòng 30 ngày.' },
  { emoji: '🔸', when: 'Huỷ trước từ 03 – 06 ngày', policy: 'Hoàn lại 50% tiền cọc.' },
  { emoji: '🔸', when: 'Huỷ trước dưới 03 ngày', policy: 'Không hoàn cọc do Trosie đã chuẩn bị phòng và giữ chỗ.' },
  { emoji: '🔸', when: 'Không đến (No-show)', policy: 'Booking sẽ tự động huỷ và không hoàn cọc.' },
];

const specialCases = [
  'Thiên tai, thời tiết xấu',
  'Sự cố giao thông nghiêm trọng',
  'Các lý do bất khả kháng khác',
];

export default function ChinhSach() {
  return (
    <div className="min-h-screen bg-cream pt-24 pb-20">
      {/* Hero banner */}
      <div className="bg-forest-900 py-14 px-4 text-center mb-12">
        <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-sans">Trosie Garden Khe Sanh</p>
        <h1 className="font-serif text-white text-3xl md:text-4xl font-semibold leading-tight">
          Chính Sách Đặt Phòng<br className="hidden sm:block" /> – Huỷ Phòng – Hoàn Cọc
        </h1>
        <div className="w-16 h-0.5 bg-gold mx-auto mt-5" />
      </div>

      <div className="max-w-3xl mx-auto px-4 lg:px-8">
        {/* Intro */}
        <p className="text-gray-600 leading-relaxed mb-10 text-center text-sm">
          Để đảm bảo trải nghiệm tốt nhất cho tất cả khách hàng và thuận tiện trong việc chuẩn bị dịch vụ,
          Trosie Garden áp dụng chính sách đặt cọc – huỷ phòng như sau:
        </p>

        {/* Section 1 & 2 */}
        {sections.slice(0, 2).map(s => (
          <Section key={s.num} num={s.num} title={s.title} items={s.items} />
        ))}

        {/* Section 3 — Cancel table */}
        <div className="mb-10">
          <SectionHeader num="3" title="CHÍNH SÁCH HUỶ PHÒNG – HOÀN CỌC" />
          <div className="overflow-hidden rounded-lg border border-forest-200">
            {cancelRows.map((row, i) => (
              <div key={i} className={`flex gap-4 px-5 py-4 text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-forest-50'}`}>
                <span className="text-base shrink-0">{row.emoji}</span>
                <div>
                  <p className="font-semibold text-forest-800 mb-0.5">{row.when}</p>
                  <p className="text-gray-600">{row.policy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4 */}
        {sections.slice(2, 3).map(s => (
          <Section key={s.num} num={s.num} title={s.title} items={s.items} />
        ))}

        {/* Section 5 — Special cases */}
        <div className="mb-10">
          <SectionHeader num="5" title="TRƯỜNG HỢP ĐẶC BIỆT" />
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
            <p className="text-sm text-gray-700 mb-3">
              Trosie luôn ưu tiên hỗ trợ linh hoạt trong các trường hợp:
            </p>
            <ul className="space-y-2 mb-3">
              {specialCases.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-gold font-bold mt-0.5">•</span>
                  {c}
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-700 italic">Hai bên sẽ cùng trao đổi để hỗ trợ phù hợp nhất.</p>
          </div>
        </div>

        {/* Section 6 */}
        {sections.slice(3).map(s => (
          <Section key={s.num} num={s.num} title={s.title} items={s.items} />
        ))}

        {/* CTA */}
        <div className="mt-14 text-center bg-forest-900 rounded-xl p-8">
          <p className="text-gray-300 text-sm mb-2">Cần hỗ trợ hoặc có thắc mắc về chính sách?</p>
          <p className="text-white font-serif text-lg mb-5">Liên hệ ngay với Trosie Garden</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="tel:0961393370"
              className="inline-flex items-center gap-2 bg-gold hover:bg-yellow-600 text-forest-900 font-semibold text-sm px-6 py-3 rounded-full transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              0961 393 370
            </a>
            <Link to="/lien-he"
              className="inline-flex items-center gap-2 border border-white/30 hover:border-gold text-white hover:text-gold text-sm px-6 py-3 rounded-full transition-colors">
              Trang liên hệ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ num, title }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-8 rounded-full bg-forest-800 text-white text-xs font-bold flex items-center justify-center shrink-0 font-serif">
        {num}
      </div>
      <h2 className="text-forest-900 font-serif text-lg font-semibold tracking-wide">{title}</h2>
    </div>
  );
}

function Section({ num, title, items }) {
  return (
    <div className="mb-10">
      <SectionHeader num={num} title={title} />
      <ul className="space-y-2.5 pl-11">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed">
            <span className="text-gold font-bold mt-0.5 shrink-0">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
