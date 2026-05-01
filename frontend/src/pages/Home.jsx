import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BookingModal from '../components/BookingModal';

const HERO = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80';
const ABOUT = 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=80';
const REST = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80';
const SPA = 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&q=80';
const CTA = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80';

const ACTIVITIES = [
  { title: 'Đạp Xe Khám Phá', desc: 'Len lỏi qua những con đường làng quê yên bình, khám phá cuộc sống địa phương trên xe đạp.', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { title: 'Kayak & Bơi Thuyền', desc: 'Chèo thuyền kayak trên dòng sông Chày trong xanh, ngắm nhìn cảnh đẹp từ mặt nước.', img: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80' },
  { title: 'Trải Nghiệm Nông Nghiệp', desc: 'Trở thành nông dân thực thụ, thu hoạch rau vườn và tìm hiểu canh tác hữu cơ bền vững.', img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80' },
  { title: 'Trekking Phong Nha', desc: 'Khám phá hang động và rừng nguyên sinh Phong Nha - Kẻ Bàng cùng hướng dẫn viên địa phương.', img: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80' },
];

export default function Home() {
  const [rooms, setRooms] = useState([]);
  const [posts, setPosts] = useState([]);
  const [showBooking, setShowBooking] = useState(false);
  const [bform, setBform] = useState({ check_in: '', check_out: '', guests: 2 });

  useEffect(() => {
    axios.get('/api/rooms').then(r => setRooms(r.data)).catch(() => {});
    axios.get('/api/blog?limit=3').then(r => setPosts(r.data)).catch(() => {});
  }, []);

  const today = new Date().toISOString().split('T')[0];

  return (
    <div>

      {/* ── Hero ── */}
      <section className="relative h-screen flex items-end justify-center pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/20 to-black/65" />
        <div className="relative z-10 text-center text-white px-4 w-full max-w-4xl mx-auto">
          <p className="text-[11px] tracking-widest uppercase text-gold font-semibold mb-4">Phong Nha — Quảng Bình, Việt Nam</p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight mb-5">
            Kết nối thiên nhiên,<br /><em>kết nối con người</em>
          </h1>
          <p className="text-white/75 text-base md:text-lg mb-10 font-light max-w-xl mx-auto">
            Farmstay giữa vùng lõi Phong Nha - Kẻ Bàng — nơi bạn thực sự được nghỉ ngơi
          </p>
          {/* Booking bar */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 md:p-5 flex flex-col sm:flex-row gap-3 items-end">
            <div className="flex-1 flex flex-col text-left">
              <label className="text-[10px] text-white/70 uppercase tracking-widest mb-1.5">Ngày đến</label>
              <input type="date" value={bform.check_in} min={today}
                onChange={e => setBform(p => ({ ...p, check_in: e.target.value }))}
                className="bg-white/10 border-b border-white/40 text-white px-2 py-1.5 text-sm focus:outline-none focus:border-gold w-full" />
            </div>
            <div className="flex-1 flex flex-col text-left">
              <label className="text-[10px] text-white/70 uppercase tracking-widest mb-1.5">Ngày đi</label>
              <input type="date" value={bform.check_out} min={bform.check_in || today}
                onChange={e => setBform(p => ({ ...p, check_out: e.target.value }))}
                className="bg-white/10 border-b border-white/40 text-white px-2 py-1.5 text-sm focus:outline-none focus:border-gold w-full" />
            </div>
            <div className="flex flex-col text-left">
              <label className="text-[10px] text-white/70 uppercase tracking-widest mb-1.5">Số khách</label>
              <select value={bform.guests} onChange={e => setBform(p => ({ ...p, guests: +e.target.value }))}
                className="bg-white/10 border-b border-white/40 text-white px-2 py-1.5 text-sm focus:outline-none min-w-28">
                {[1,2,3,4,5,6].map(n => <option key={n} value={n} className="text-gray-800">{n} khách</option>)}
              </select>
            </div>
            <button onClick={() => setShowBooking(true)}
              className="bg-gold hover:bg-gold-dark text-white text-[11px] font-bold tracking-widest uppercase px-8 py-3.5 transition-colors whitespace-nowrap shrink-0">
              Kiểm Tra Chỗ Trống
            </button>
          </div>
        </div>
        {/* scroll hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
          <span className="text-white/50 text-[10px] tracking-widest uppercase">Cuộn xuống</span>
          <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-forest-900 py-10">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[['2018','Năm thành lập'],['3','Loại phòng độc đáo'],['100%','Nguyên liệu hữu cơ'],['5★','Đánh giá TripAdvisor']].map(([n,l]) => (
            <div key={l}>
              <div className="font-serif text-3xl text-gold mb-1">{n}</div>
              <div className="text-[10px] uppercase tracking-widest text-gray-400">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── About ── */}
      <section id="ve-chung-toi" className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="img-zoom">
              <img src={ABOUT} alt="Chay Lap Farmstay" className="w-full h-[500px] object-cover" />
            </div>
            <div>
              <span className="section-subtitle">Câu Chuyện Của Chúng Tôi</span>
              <h2 className="section-title mb-2">Thư Giãn Giữa<br /><em>Không Gian Làng Quê</em></h2>
              <div className="w-12 h-0.5 bg-gold mb-6" />
              <p className="text-gray-600 leading-relaxed mb-4">
                Chày Lập Farmstay nằm ẩn mình trong một thung lũng xanh mát tại thôn Chày Lập, xã Phong Nha, huyện Bố Trạch, tỉnh Quảng Bình — cách Vườn Quốc gia Phong Nha - Kẻ Bàng chỉ vài phút đi xe.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Được xây dựng từ năm 2018 với tầm nhìn tạo ra không gian giao thoa giữa thiên nhiên và con người, Chày Lập là nơi để bạn rũ bỏ mọi lo toan, hòa mình vào nhịp sống chậm của miền quê yên bình.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Mỗi phòng nghỉ được thiết kế riêng biệt, sử dụng vật liệu tự nhiên địa phương, tôn trọng môi trường và mang đến trải nghiệm sống gần gũi với thiên nhiên nhất có thể.
              </p>
              <Link to="/phong-farmstay" className="btn-outline">Khám Phá Các Phòng</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Rooms ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-subtitle">Chỗ Nghỉ</span>
            <h2 className="section-title">Phòng & Không Gian Nghỉ</h2>
            <div className="w-12 h-0.5 bg-gold mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rooms.map(room => (
              <Link key={room.id} to={`/phong-farmstay/${room.slug}`} className="group block">
                <div className="img-zoom mb-4">
                  <img src={room.images?.[0]} alt={room.name} className="w-full h-64 object-cover" />
                </div>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-serif text-xl text-forest-900 group-hover:text-gold transition-colors">{room.name}</h3>
                  <div className="text-right">
                    <span className="text-gold font-semibold text-sm">{room.price?.toLocaleString('vi-VN')}đ</span>
                    <span className="text-gray-400 text-xs block">/đêm</span>
                  </div>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2">{room.short_desc}</p>
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                  <span>Tối đa {room.max_guests} khách</span>
                  <span>·</span>
                  <span>{room.size}m²</span>
                </div>
                <span className="text-[11px] font-semibold tracking-widest uppercase text-forest-700 group-hover:text-gold border-b border-current pb-0.5 transition-colors">
                  Xem Chi Tiết →
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/phong-farmstay" className="btn-outline">Xem Tất Cả Phòng</Link>
          </div>
        </div>
      </section>

      {/* ── Restaurant ── */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${REST})` }} />
        <div className="absolute inset-0 bg-forest-900/78" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
          <div className="max-w-lg">
            <span className="section-subtitle">Ẩm Thực</span>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">Nhà Hàng & Bar</h2>
            <div className="w-12 h-0.5 bg-gold mb-6" />
            <p className="text-gray-300 leading-relaxed mb-4">
              Nhà hàng Chày Lập phục vụ ẩm thực Việt Nam - châu Á - châu Âu với nguyên liệu tươi sạch từ vườn rau hữu cơ và các trang trại địa phương. Thực đơn thay đổi theo mùa.
            </p>
            <p className="text-gray-300 leading-relaxed mb-8">
              Bar Chày Lập phục vụ cocktail handcrafted, rượu vang tuyển chọn và đặc biệt là trà thảo mộc địa phương — hoàn hảo để thưởng thức khi ngắm hoàng hôn trên sông Chày.
            </p>
            <Link to="/nha-hang-bar" className="btn-gold">Xem Thực Đơn</Link>
          </div>
        </div>
      </section>

      {/* ── Herbal Spa ── */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <span className="section-subtitle">Thư Giãn & Phục Hồi</span>
              <h2 className="section-title mb-2">Herbal Spa</h2>
              <div className="w-12 h-0.5 bg-gold mb-6" />
              <p className="text-gray-600 leading-relaxed mb-4">
                Herbal Spa mang đến trải nghiệm chăm sóc sức khỏe toàn diện từ thiên nhiên, kết hợp kỹ thuật massage cổ truyền Việt Nam và liệu pháp thảo mộc từ vùng núi Phong Nha.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Không gian spa được thiết kế trong kiến trúc nhà sàn truyền thống, tạo bầu không khí yên tĩnh — nơi lý tưởng để tâm và thân hòa làm một.
              </p>
              <ul className="space-y-2 mb-8">
                {['Massage thư giãn toàn thân','Tắm thảo mộc địa phương','Chăm sóc da mặt tự nhiên','Liệu pháp đá nóng','Yoga & thiền định buổi sáng'].map(s => (
                  <li key={s} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-gold shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {s}
                  </li>
                ))}
              </ul>
              <Link to="/herbal-spa" className="btn-outline">Đặt Lịch Spa</Link>
            </div>
            <div className="order-1 lg:order-2 img-zoom">
              <img src={SPA} alt="Herbal Spa" className="w-full h-[500px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Activities ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-subtitle">Trải Nghiệm</span>
            <h2 className="section-title">Hoạt Động & Khám Phá</h2>
            <div className="w-12 h-0.5 bg-gold mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ACTIVITIES.map(a => (
              <div key={a.title} className="group">
                <div className="img-zoom mb-4">
                  <img src={a.img} alt={a.title} className="w-full h-52 object-cover" />
                </div>
                <h3 className="font-serif text-lg text-forest-900 group-hover:text-gold transition-colors mb-2">{a.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/hoat-dong" className="btn-outline">Tất Cả Hoạt Động</Link>
          </div>
        </div>
      </section>

      {/* ── Blog ── */}
      {posts.length > 0 && (
        <section className="py-20 bg-cream">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <span className="section-subtitle">Cảm Hứng Du Lịch</span>
              <h2 className="section-title">Tin Tức & Bài Viết</h2>
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
      <section className="relative py-28 text-center"
        style={{ backgroundImage: `url(${CTA})`, backgroundAttachment: 'fixed', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-forest-900/72" />
        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <span className="section-subtitle">Đặt Phòng Ngay</span>
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
            Bắt Đầu Hành Trình<br /><em>Kết Nối Thiên Nhiên</em>
          </h2>
          <p className="text-gray-300 text-sm mb-8 leading-relaxed">
            Liên hệ trực tiếp để được tư vấn và nhận ưu đãi tốt nhất cho kỳ nghỉ của bạn.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setShowBooking(true)} className="btn-gold">Đặt Phòng Ngay</button>
            <Link to="/lien-he" className="btn-outline !border-white !text-white hover:!bg-white hover:!text-forest-900">Liên Hệ Tư Vấn</Link>
          </div>
        </div>
      </section>

      {showBooking && <BookingModal initialForm={bform} onClose={() => setShowBooking(false)} />}
    </div>
  );
}
