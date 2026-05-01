import React, { useState } from 'react';
import axios from 'axios';

const HERO = 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80';

export default function Contact() {
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const set = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await axios.post('/api/contacts', form);
      setSuccess(true);
      setForm({ full_name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      setError('Có lỗi xảy ra. Vui lòng thử lại hoặc gọi trực tiếp.');
    } finally { setLoading(false); }
  };

  return (
    <div>
      <div className="page-hero">
        <div className="page-hero-bg" style={{ backgroundImage: `url(${HERO})` }} />
        <div className="page-hero-overlay" />
        <div className="relative z-10 text-center">
          <span className="section-subtitle">Kết Nối</span>
          <h1 className="font-serif text-3xl md:text-5xl text-white">Liên Hệ</h1>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Info */}
            <div className="lg:col-span-2">
              <span className="section-subtitle">Thông Tin</span>
              <h2 className="font-serif text-2xl text-forest-900 mb-6">Chúng Tôi Luôn<br />Sẵn Sàng Hỗ Trợ</h2>
              <div className="w-10 h-0.5 bg-gold mb-8" />

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-forest-100 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-forest-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-1">Địa Chỉ</div>
                    <p className="text-sm text-gray-700 leading-relaxed">Thôn Chày Lập, xã Phong Nha,<br />huyện Bố Trạch, tỉnh Quảng Bình</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-forest-100 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-forest-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-1">Điện Thoại</div>
                    <a href="tel:+842899955168" className="block text-sm text-gray-700 hover:text-gold">+84 28 999 55168</a>
                    <a href="tel:+84932488839" className="block text-sm text-gray-700 hover:text-gold">+84 932 488 839</a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-forest-100 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-forest-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-1">Email</div>
                    <a href="mailto:sales@phongnhaholiday.com" className="text-sm text-gray-700 hover:text-gold">sales@phongnhaholiday.com</a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-forest-100 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-forest-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-1">Giờ Làm Việc</div>
                    <p className="text-sm text-gray-700">Hàng ngày: 7:00 – 22:00<br />Lễ tân 24/7</p>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="mt-8 bg-gray-100 h-52 flex items-center justify-center text-gray-400 text-sm">
                <div className="text-center">
                  <svg className="w-8 h-8 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                  </svg>
                  <p>Thôn Chày Lập, Phong Nha</p>
                  <p className="text-xs text-gray-300">Quảng Bình, Việt Nam</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <span className="section-subtitle">Gửi Tin Nhắn</span>
              <h2 className="font-serif text-2xl text-forest-900 mb-6">Hỏi Chúng Tôi Bất Cứ Điều Gì</h2>
              <div className="w-10 h-0.5 bg-gold mb-8" />

              {success ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-forest-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-xl text-forest-900 mb-2">Tin Nhắn Đã Được Gửi!</h3>
                  <p className="text-gray-500 text-sm">Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong vòng 24 giờ.</p>
                  <button onClick={() => setSuccess(false)} className="btn-outline mt-6">Gửi Thêm</button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[['Họ và tên *','full_name','text','Nguyễn Văn A'],['Email *','email','email','email@example.com'],['Số điện thoại','phone','tel','0912 345 678']].map(([l,n,t,ph]) => (
                      <div key={n} className={n === 'full_name' ? 'md:col-span-2' : ''}>
                        <label className="block text-[11px] font-semibold tracking-widest uppercase text-gray-500 mb-1.5">{l}</label>
                        <input type={t} name={n} value={form[n]} onChange={set}
                          required={n !== 'phone'} placeholder={ph}
                          className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-forest-600" />
                      </div>
                    ))}
                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-semibold tracking-widest uppercase text-gray-500 mb-1.5">Chủ đề</label>
                      <select name="subject" value={form.subject} onChange={set}
                        className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-forest-600">
                        <option value="">-- Chọn chủ đề --</option>
                        <option>Đặt phòng / Hỏi về phòng</option>
                        <option>Herbal Spa</option>
                        <option>Nhà hàng & Bar</option>
                        <option>Hoạt động & Tour</option>
                        <option>Teambuilding</option>
                        <option>Ưu đãi đặc biệt</option>
                        <option>Khác</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-semibold tracking-widest uppercase text-gray-500 mb-1.5">Nội dung *</label>
                      <textarea name="message" value={form.message} onChange={set} required rows={6}
                        placeholder="Nhập nội dung tin nhắn của bạn..."
                        className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-forest-600 resize-none" />
                    </div>
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <button type="submit" disabled={loading}
                    className="btn-primary disabled:opacity-50">
                    {loading ? 'Đang gửi...' : 'Gửi Tin Nhắn'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How to get there */}
      <section className="py-14 bg-cream">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h2 className="font-serif text-2xl text-forest-900 text-center mb-10">Cách Di Chuyển Đến Chày Lập</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '✈️', title: 'Từ Sân Bay', desc: 'Sân bay Đồng Hới (HUI) cách farmstay 45km. Có dịch vụ đón sân bay (đặt trước). Thời gian khoảng 45-60 phút.' },
              { icon: '🚂', title: 'Từ Ga Tàu', desc: 'Ga Đồng Hới cách farmstay 42km. Taxi hoặc xe ôm công nghệ có thể đặt từ ga về farmstay.' },
              { icon: '🚗', title: 'Từ Đường Bộ', desc: 'Từ TP. Đồng Hới đi theo QL12 về hướng Phong Nha. Farmstay nằm tại thôn Chày Lập, xã Phong Nha.' },
            ].map(item => (
              <div key={item.title} className="bg-white p-6 text-center">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-serif text-lg text-forest-900 mb-3">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
