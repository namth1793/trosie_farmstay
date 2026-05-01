import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HERO = 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80';
const IMG1 = 'https://images.unsplash.com/photo-1519415510236-718bea34e0c6?w=800&q=80';
const IMG2 = 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80';
const IMG3 = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80';

const TREATMENTS = [
  {
    cat: 'Massage',
    items: [
      { name: 'Massage Toàn Thân Thảo Mộc', duration: '90 phút', price: '650.000đ', desc: 'Kỹ thuật massage truyền thống Việt Nam kết hợp dầu thảo mộc địa phương, giúp thư giãn cơ bắp và tuần hoàn máu.' },
      { name: 'Massage Đá Nóng', duration: '75 phút', price: '750.000đ', desc: 'Sử dụng đá núi lửa được làm nóng, đặt lên các huyệt đạo để giải phóng căng thẳng sâu.' },
      { name: 'Massage Thư Giãn', duration: '60 phút', price: '450.000đ', desc: 'Massage nhẹ nhàng toàn thân với áp lực phù hợp, lý tưởng cho những ai lần đầu trải nghiệm.' },
      { name: 'Massage Chân Và Phản Xạ', duration: '45 phút', price: '300.000đ', desc: 'Kỹ thuật phản xạ học bàn chân, kích thích các điểm năng lượng để phục hồi cơ thể.' },
    ],
  },
  {
    cat: 'Tắm Thảo Mộc',
    items: [
      { name: 'Tắm Thảo Mộc Truyền Thống', duration: '45 phút', price: '350.000đ', desc: 'Ngâm mình trong bồn nước ấm pha thảo mộc địa phương, giúp thanh lọc và dưỡng ẩm da.' },
      { name: 'Tắm Muối Hồng Himalaya', duration: '45 phút', price: '380.000đ', desc: 'Tắm muối khoáng kết hợp tinh dầu thiên nhiên, làm sạch sâu và tái tạo da.' },
    ],
  },
  {
    cat: 'Chăm Sóc Da Mặt',
    items: [
      { name: 'Facial Tự Nhiên', duration: '60 phút', price: '550.000đ', desc: 'Chăm sóc da mặt toàn diện với các sản phẩm từ thiên nhiên: mật ong, nghệ, lô hội...' },
      { name: 'Tẩy Tế Bào Chết Mặt', duration: '30 phút', price: '250.000đ', desc: 'Tẩy da chết nhẹ nhàng, làm sáng và mịn da với hỗn hợp đường mía và tinh dầu.' },
    ],
  },
];

const PACKAGES = [
  { name: 'Gói Cặp Đôi', includes: ['Massage toàn thân 90 phút (x2)','Tắm thảo mộc (x2)','Trà thảo mộc phục vụ'], price: '2.400.000đ', badge: 'Phổ biến' },
  { name: 'Gói Thư Giãn Trọn Ngày', includes: ['Massage đá nóng 75 phút','Facial tự nhiên 60 phút','Tắm muối 45 phút','Bữa trưa nhẹ tại spa'], price: '1.800.000đ', badge: '' },
  { name: 'Gói Khởi Đầu', includes: ['Massage thư giãn 60 phút','Massage chân 45 phút','Trà thảo mộc phục vụ'], price: '850.000đ', badge: 'Tiết kiệm' },
];

export default function Spa() {
  const [bookForm, setBookForm] = useState({ name: '', phone: '', date: '', time: '', treatment: '', note: '' });
  const [sent, setSent] = useState(false);

  const submit = async e => {
    e.preventDefault();
    try {
      await axios.post('/api/contacts', {
        full_name: bookForm.name,
        email: 'spa@' + Date.now() + '.com',
        phone: bookForm.phone,
        subject: 'Đặt lịch Herbal Spa',
        message: `Trị liệu: ${bookForm.treatment} | Ngày: ${bookForm.date} ${bookForm.time} | Ghi chú: ${bookForm.note}`,
      });
      setSent(true);
    } catch {}
  };

  return (
    <div>
      <div className="page-hero">
        <div className="page-hero-bg" style={{ backgroundImage: `url(${HERO})` }} />
        <div className="page-hero-overlay" />
        <div className="relative z-10 text-center">
          <span className="section-subtitle">Thư Giãn & Phục Hồi</span>
          <h1 className="font-serif text-3xl md:text-5xl text-white">Herbal Spa</h1>
        </div>
      </div>

      {/* Intro */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-subtitle">Chăm Sóc Từ Thiên Nhiên</span>
              <h2 className="section-title mb-4">Không Gian Phục Hồi Tâm Hồn</h2>
              <div className="w-10 h-0.5 bg-gold mb-6" />
              <p className="text-gray-600 leading-relaxed mb-4">
                Herbal Spa của Chày Lập được thiết kế trong không gian nhà sàn truyền thống, mang đến bầu không khí yên tĩnh và gần gũi với thiên nhiên. Tất cả sản phẩm sử dụng đều có nguồn gốc từ thiên nhiên và được thu hoạch tại địa phương.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Đội ngũ chuyên viên được đào tạo bài bản trong các kỹ thuật massage truyền thống Việt Nam kết hợp với liệu pháp thảo mộc hiện đại, mang đến trải nghiệm chăm sóc sức khỏe toàn diện cho cả thể xác lẫn tinh thần.
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                {[['9:00', 'Mở cửa'], ['21:00', 'Đóng cửa'], ['7/7', 'Ngày/tuần']].map(([n, l]) => (
                  <div key={l} className="bg-white p-4">
                    <div className="font-serif text-xl text-forest-900 mb-1">{n}</div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider">{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="img-zoom col-span-2"><img src={IMG1} alt="Spa" className="w-full h-52 object-cover" /></div>
              <div className="img-zoom"><img src={IMG2} alt="Treatment" className="w-full h-40 object-cover" /></div>
              <div className="img-zoom"><img src={IMG3} alt="Relax" className="w-full h-40 object-cover" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatments */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-subtitle">Dịch Vụ</span>
            <h2 className="section-title">Liệu Pháp & Trị Liệu</h2>
            <div className="w-10 h-0.5 bg-gold mx-auto mt-4" />
          </div>
          {TREATMENTS.map(sec => (
            <div key={sec.cat} className="mb-12">
              <h3 className="font-serif text-xl text-forest-800 mb-6 pb-3 border-b border-gray-100">{sec.cat}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {sec.items.map(item => (
                  <div key={item.name} className="bg-cream p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-serif text-base text-forest-900">{item.name}</h4>
                      <span className="text-gold font-bold text-sm shrink-0 ml-3">{item.price}</span>
                    </div>
                    <span className="text-xs text-gray-400 uppercase tracking-wider">{item.duration}</span>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 bg-cream">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-subtitle">Combo Tiết Kiệm</span>
            <h2 className="section-title">Gói Dịch Vụ</h2>
            <div className="w-10 h-0.5 bg-gold mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PACKAGES.map(pkg => (
              <div key={pkg.name} className="bg-white p-6 relative">
                {pkg.badge && (
                  <span className="absolute top-4 right-4 text-[10px] bg-gold text-white px-2 py-0.5 font-bold uppercase tracking-wider">{pkg.badge}</span>
                )}
                <h3 className="font-serif text-lg text-forest-900 mb-4">{pkg.name}</h3>
                <ul className="space-y-2 mb-5">
                  {pkg.includes.map(i => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-gold mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {i}
                    </li>
                  ))}
                </ul>
                <div className="text-gold font-bold text-lg border-t border-gray-100 pt-4">{pkg.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking form */}
      <section className="py-16 bg-forest-900">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="section-subtitle">Đặt Lịch</span>
            <h2 className="font-serif text-2xl text-white">Đặt Lịch Spa</h2>
          </div>
          {sent ? (
            <div className="text-center text-white">
              <div className="w-16 h-16 bg-forest-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-300">Đặt lịch của bạn đã được ghi nhận! Chúng tôi sẽ xác nhận sớm nhất.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[['Họ và tên *', 'name', 'text', 'Nguyễn Văn A'], ['Số điện thoại *', 'phone', 'tel', '0912 345 678']].map(([l, n, t, ph]) => (
                  <div key={n}>
                    <label className="block text-[11px] font-semibold tracking-widest uppercase text-gray-400 mb-1.5">{l}</label>
                    <input type={t} required value={bookForm[n]} onChange={e => setBookForm(p => ({ ...p, [n]: e.target.value }))} placeholder={ph}
                      className="w-full bg-forest-800 border border-forest-700 text-white placeholder-gray-500 px-3 py-2.5 text-sm focus:outline-none focus:border-gold" />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold tracking-widest uppercase text-gray-400 mb-1.5">Ngày đặt *</label>
                  <input type="date" required value={bookForm.date} min={new Date().toISOString().split('T')[0]}
                    onChange={e => setBookForm(p => ({ ...p, date: e.target.value }))}
                    className="w-full bg-forest-800 border border-forest-700 text-white px-3 py-2.5 text-sm focus:outline-none focus:border-gold" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold tracking-widest uppercase text-gray-400 mb-1.5">Giờ đặt</label>
                  <select value={bookForm.time} onChange={e => setBookForm(p => ({ ...p, time: e.target.value }))}
                    className="w-full bg-forest-800 border border-forest-700 text-white px-3 py-2.5 text-sm focus:outline-none focus:border-gold">
                    {['9:00','10:00','11:00','14:00','15:00','16:00','17:00','18:00','19:00'].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold tracking-widest uppercase text-gray-400 mb-1.5">Dịch vụ quan tâm</label>
                <select value={bookForm.treatment} onChange={e => setBookForm(p => ({ ...p, treatment: e.target.value }))}
                  className="w-full bg-forest-800 border border-forest-700 text-white px-3 py-2.5 text-sm focus:outline-none focus:border-gold">
                  <option value="">-- Chọn dịch vụ --</option>
                  <option>Massage Toàn Thân Thảo Mộc</option>
                  <option>Massage Đá Nóng</option>
                  <option>Tắm Thảo Mộc Truyền Thống</option>
                  <option>Facial Tự Nhiên</option>
                  <option>Gói Cặp Đôi</option>
                  <option>Gói Thư Giãn Trọn Ngày</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold tracking-widest uppercase text-gray-400 mb-1.5">Ghi chú thêm</label>
                <textarea value={bookForm.note} onChange={e => setBookForm(p => ({ ...p, note: e.target.value }))} rows={3}
                  placeholder="Tình trạng sức khỏe cần lưu ý, yêu cầu đặc biệt..."
                  className="w-full bg-forest-800 border border-forest-700 text-white placeholder-gray-500 px-3 py-2.5 text-sm focus:outline-none focus:border-gold resize-none" />
              </div>
              <button type="submit" className="btn-gold w-full text-center">Gửi Yêu Cầu Đặt Lịch</button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
