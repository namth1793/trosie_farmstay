import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BookingModal from '../components/BookingModal';

const HERO_IMG = 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920&q=80';

const ICONS = {
  'Dieu hoa nhiet do': '❄️', 'WiFi mien phi': '📶', 'Phong tam rieng': '🚿',
  'Voi sen ngoai troi': '🌿', 'Hien tre': '🏡', 'Binh dun nuoc': '☕',
  'Ket an toan': '🔒', 'Quat tran': '💨', 'Dep di trong phong': '👡',
  'Do dung ve sinh cao cap': '🧴', 'Minibar': '🍷', 'Tra & Ca phe': '🍵',
  'Hien rong co ghe ngoi': '🪑', '2 Phong tam': '🚿', 'Tam nhin nui panorama': '🏔️',
  'TV thong minh 32"': '📺', 'Ban cong ngam canh': '🌄',
};

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    axios.get('/api/rooms').then(r => { setRooms(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero */}
      <div className="page-hero">
        <div className="page-hero-bg" style={{ backgroundImage: `url(${HERO_IMG})` }} />
        <div className="page-hero-overlay" />
        <div className="relative z-10 text-center">
          <span className="section-subtitle">Chỗ Nghỉ</span>
          <h1 className="font-serif text-3xl md:text-5xl text-white">Phòng Farmstay</h1>
        </div>
      </div>

      {/* Intro */}
      <section className="py-16 bg-cream">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-gray-600 leading-relaxed">
            Chày Lập Farmstay cung cấp 3 loại phòng nghỉ độc đáo, mỗi loại mang một phong cách thiết kế riêng biệt nhưng đều hướng đến sự gần gũi với thiên nhiên. Tất cả phòng đều sử dụng vật liệu tự nhiên địa phương và đầy đủ tiện nghi hiện đại.
          </p>
        </div>
      </section>

      {/* Room List */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {loading ? (
            <div className="text-center py-20 text-gray-400">Đang tải...</div>
          ) : (
            <div className="space-y-20">
              {rooms.map((room, i) => (
                <div key={room.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${i % 2 === 1 ? '' : ''}`}>
                  {/* Images */}
                  <div className={`${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="img-zoom mb-3">
                      <img src={room.images?.[0]} alt={room.name} className="w-full h-80 object-cover" />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {room.images?.slice(1, 4).map((img, idx) => (
                        <div key={idx} className="img-zoom">
                          <img src={img} alt={`${room.name} ${idx + 2}`} className="w-full h-24 object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Info */}
                  <div className={`${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <span className="section-subtitle">Loại phòng</span>
                    <h2 className="font-serif text-3xl text-forest-900 mb-2">{room.name}</h2>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-gold font-bold text-xl">{room.price?.toLocaleString('vi-VN')}đ</span>
                      <span className="text-gray-400 text-sm">/đêm</span>
                      <span className="text-gray-300">|</span>
                      <span className="text-gray-500 text-sm">Tối đa {room.max_guests} khách</span>
                      <span className="text-gray-300">|</span>
                      <span className="text-gray-500 text-sm">{room.size}m²</span>
                    </div>
                    <div className="w-10 h-0.5 bg-gold mb-5" />
                    <p className="text-gray-600 leading-relaxed mb-6">{room.description}</p>

                    {/* Amenities */}
                    <div className="mb-6">
                      <h4 className="text-[11px] font-bold tracking-widest uppercase text-gray-500 mb-3">Tiện nghi</h4>
                      <div className="flex flex-wrap gap-2">
                        {room.amenities?.map(a => (
                          <span key={a} className="text-xs bg-cream px-3 py-1.5 text-forest-800 border border-cream-dark">
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button onClick={() => setSelectedRoom(room)} className="btn-gold">Đặt Phòng Này</button>
                      <Link to={`/phong-farmstay/${room.slug}`} className="btn-outline">Xem Chi Tiết</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Policies */}
      <section className="py-16 bg-cream">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-serif text-2xl text-forest-900 text-center mb-10">Chính Sách Lưu Trú</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Nhận & Trả Phòng', items: ['Check-in: 14:00', 'Check-out: 12:00', 'Trả phòng muộn theo yêu cầu'] },
              { title: 'Chính Sách Hủy', items: ['Hủy miễn phí trước 7 ngày', 'Hủy trong 7 ngày: 50% phí', 'Không hoàn tiền nếu hủy trong 24h'] },
              { title: 'Lưu Ý Chung', items: ['Không hút thuốc trong phòng', 'Thú cưng theo yêu cầu', 'Bữa sáng có thu phí riêng'] },
            ].map(p => (
              <div key={p.title} className="bg-white p-6">
                <h3 className="font-serif text-lg text-forest-900 mb-4">{p.title}</h3>
                <ul className="space-y-2">
                  {p.items.map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-gold mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedRoom && <BookingModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />}
    </div>
  );
}
