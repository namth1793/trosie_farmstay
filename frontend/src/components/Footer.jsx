import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-forest-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-5 text-white">
              <svg className="w-8 h-8 text-gold" viewBox="0 0 40 40" fill="currentColor">
                <path d="M20 3C11.7 3 5 9.7 5 18c0 5.5 2.8 10.4 7.1 13.3L20 37l7.9-5.7C32.2 28.4 35 23.5 35 18c0-8.3-6.7-15-15-15zm0 5c3.3 0 6.2 1.5 8.2 3.8-1.2-.5-2.6-.8-4.2-.8-4.4 0-8 2.9-8 6.5 0 2.4 1.5 4.5 3.8 5.7L20 25l-.2-1.8C17.5 22 16 19.9 16 17.5c0-3.6-3.6-6.5-8-6.5-.2 0-.4 0-.6.1C9.3 9.2 14.3 8 20 8z"/>
              </svg>
              <div>
                <div className="font-bold tracking-widest uppercase text-sm font-serif">Chày Lập</div>
                <div className="text-[10px] tracking-widest text-gray-400 font-sans">FARMSTAY</div>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Kết nối thiên nhiên, kết nối con người. Farmstay giữa vùng lõi Phong Nha - Kẻ Bàng huyền thoại.
            </p>
            <div className="flex gap-3">
              {['facebook','instagram','tiktok'].map(s => (
                <a key={s} href="#" className="w-9 h-9 bg-forest-700 hover:bg-gold flex items-center justify-center rounded-full transition-colors">
                  <span className="text-white text-xs font-bold">{s[0].toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white text-[11px] font-bold tracking-widest uppercase mb-5">Liên Kết Nhanh</h4>
            <ul className="space-y-2.5">
              {[
                ['Câu Chuyện', '/#ve-chung-toi'],
                ['Phòng Farmstay', '/phong-farmstay'],
                ['Nhà Hàng & Bar', '/nha-hang-bar'],
                ['Herbal Spa', '/herbal-spa'],
                ['Hoạt Động', '/hoat-dong'],
                ['Ưu Đãi', '/uu-dai'],
                ['Tin Tức', '/tin-tuc'],
              ].map(([l, h]) => (
                <li key={h}><Link to={h} className="text-sm text-gray-400 hover:text-gold transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-[11px] font-bold tracking-widest uppercase mb-5">Thông Tin Liên Hệ</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex gap-3">
                <svg className="w-4 h-4 text-gold mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span>Thôn Chày Lập, xã Phong Nha, huyện Bố Trạch, tỉnh Quảng Bình</span>
              </li>
              <li className="flex gap-3">
                <svg className="w-4 h-4 text-gold mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <div>
                  <a href="tel:+842899955168" className="block hover:text-gold">+84 28 999 55168</a>
                  <a href="tel:+84932488839" className="block hover:text-gold">+84 932 488 839</a>
                </div>
              </li>
              <li className="flex gap-3">
                <svg className="w-4 h-4 text-gold mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <a href="mailto:sales@phongnhaholiday.com" className="hover:text-gold break-all">sales@phongnhaholiday.com</a>
              </li>
              <li className="flex gap-3">
                <svg className="w-4 h-4 text-gold mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>Check-in: 14:00 | Check-out: 12:00</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white text-[11px] font-bold tracking-widest uppercase mb-5">Nhận Ưu Đãi</h4>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">Đăng ký để nhận ưu đãi đặc biệt và tin tức mới nhất từ Chày Lập.</p>
            <form onSubmit={e => e.preventDefault()} className="flex flex-col gap-3">
              <input type="email" placeholder="Email của bạn"
                className="bg-forest-800 border border-forest-700 text-white placeholder-gray-500 px-4 py-2.5 text-sm focus:outline-none focus:border-gold" />
              <button type="submit" className="btn-gold text-center">Đăng Ký</button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-forest-800">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© 2024 Chày Lập Farmstay. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-gold">Chính Sách Bảo Mật</a>
            <a href="#" className="hover:text-gold">Điều Khoản Sử Dụng</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
