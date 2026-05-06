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
              <h2 className="font-serif text-2xl text-forest-900 mb-6">Trosie Garden<br />Luôn Sẵn Sàng Chào Đón</h2>
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
                    <p className="text-sm text-gray-700 leading-relaxed">Trosie Garden, Km Số 2, đường HCM,<br />Khe Sanh, Hướng Hoá, Quảng Trị</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-forest-100 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-forest-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-1">Hotline / Zalo</div>
                    <a href="tel:0345424342" className="block text-sm text-gray-700 hover:text-gold">0345 424 342</a>
                    <a href="tel:0961393370" className="block text-sm text-gray-700 hover:text-gold">0961 393 370</a>
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
                    <a href="mailto:trosiegardenks@gmail.com" className="text-sm text-gray-700 hover:text-gold">trosiegardenks@gmail.com</a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-forest-100 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-forest-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-1">Mạng Xã Hội</div>
                    <a href="https://www.facebook.com/trosiegardenks" target="_blank" rel="noreferrer" className="block text-sm text-gray-700 hover:text-gold">Facebook: Trosie Garden KS</a>
                    <a href="https://www.instagram.com/trosiegarden.khesanh/" target="_blank" rel="noreferrer" className="block text-sm text-gray-700 hover:text-gold">Instagram: @trosiegarden.khesanh</a>
                    <a href="https://www.tiktok.com/@trosiegardenkhesanh" target="_blank" rel="noreferrer" className="block text-sm text-gray-700 hover:text-gold">TikTok: @trosiegardenkhesanh</a>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="mt-8">
                <a href="https://maps.app.goo.gl/ZUgWJvEWemr2TMnh7" target="_blank" rel="noreferrer"
                  className="block bg-forest-50 border border-forest-200 hover:border-gold transition-colors p-4 text-center">
                  <div className="text-2xl mb-2">📍</div>
                  <p className="text-sm font-semibold text-forest-900 mb-1">Xem bản đồ Google Maps</p>
                  <p className="text-xs text-gray-500">Trosie Garden, Khe Sanh, Quảng Trị</p>
                </a>
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
                  <h3 className="font-serif text-xl text-forest-900 mb-2">Đã Gửi Thành Công!</h3>
                  <p className="text-gray-500 text-sm">Cảm ơn bạn đã liên hệ. Trosie sẽ phản hồi sớm qua điện thoại hoặc email.</p>
                  <button onClick={() => setSuccess(false)} className="btn-outline mt-6">Gửi Thêm</button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-semibold tracking-widest uppercase text-gray-500 mb-1.5">Họ và tên *</label>
                      <input type="text" name="full_name" value={form.full_name} onChange={set} required placeholder="Nguyễn Văn A"
                        className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-forest-600" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold tracking-widest uppercase text-gray-500 mb-1.5">Số điện thoại *</label>
                      <input type="tel" name="phone" value={form.phone} onChange={set} required placeholder="0912 345 678"
                        className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-forest-600" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold tracking-widest uppercase text-gray-500 mb-1.5">Email</label>
                      <input type="email" name="email" value={form.email} onChange={set} placeholder="email@example.com"
                        className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-forest-600" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-semibold tracking-widest uppercase text-gray-500 mb-1.5">Chủ đề</label>
                      <select name="subject" value={form.subject} onChange={set}
                        className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-forest-600">
                        <option value="">-- Chọn chủ đề --</option>
                        <option>Đặt lịch tham quan / lưu trú</option>
                        <option>Mua cà phê Trosie</option>
                        <option>Chèo SUP</option>
                        <option>Vườn hoa hồng</option>
                        <option>Nhà hàng & ẩm thực</option>
                        <option>Hoạt động & Team building</option>
                        <option>Khác</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-semibold tracking-widest uppercase text-gray-500 mb-1.5">Nội dung *</label>
                      <textarea name="message" value={form.message} onChange={set} required rows={5}
                        placeholder="Nhập nội dung tin nhắn..."
                        className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-forest-600 resize-none" />
                    </div>
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <button type="submit" disabled={loading} className="btn-primary disabled:opacity-50">
                    {loading ? 'Đang gửi...' : 'Gửi Yêu Cầu'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Hotline CTA */}
      <section className="py-12 bg-forest-900 text-center">
        <p className="text-gray-300 mb-3 text-sm">Hoặc liên hệ trực tiếp qua Hotline / Zalo</p>
        <a href="tel:0961393370" className="font-serif text-3xl text-gold hover:text-white transition-colors">
          0961 393 370
        </a>
      </section>
    </div>
  );
}
