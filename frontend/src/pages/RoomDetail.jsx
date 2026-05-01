import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import BookingModal from '../components/BookingModal';

export default function RoomDetail() {
  const { slug } = useParams();
  const [room, setRoom] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [showBooking, setShowBooking] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/rooms/${slug}`)
      .then(r => { setRoom(r.data); setLoading(false); setActiveImg(0); })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-400 pt-20">Đang tải...</div>;
  if (!room) return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-20 gap-4">
      <p className="text-gray-500">Không tìm thấy phòng.</p>
      <Link to="/phong-farmstay" className="btn-outline">Quay lại</Link>
    </div>
  );

  return (
    <div className="pt-20">
      {/* Gallery */}
      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <div className="lg:col-span-2">
              <img src={room.images?.[activeImg]} alt={room.name} className="w-full h-96 lg:h-[520px] object-cover" />
            </div>
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-2">
              {room.images?.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={`overflow-hidden ${i === activeImg ? 'ring-2 ring-gold' : ''}`}>
                  <img src={img} alt={`View ${i + 1}`} className="w-full h-24 lg:h-32 object-cover hover:opacity-80 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Main info */}
            <div className="lg:col-span-2">
              <nav className="text-xs text-gray-400 mb-6 flex items-center gap-2">
                <Link to="/" className="hover:text-gold">Trang chủ</Link>
                <span>/</span>
                <Link to="/phong-farmstay" className="hover:text-gold">Phòng Farmstay</Link>
                <span>/</span>
                <span className="text-forest-700">{room.name}</span>
              </nav>

              <h1 className="font-serif text-3xl md:text-4xl text-forest-900 mb-2">{room.name}</h1>
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-500">
                <span>👥 Tối đa {room.max_guests} khách</span>
                <span>·</span>
                <span>📐 {room.size}m²</span>
                <span>·</span>
                <span className="text-forest-600 font-medium">{room.highlight}</span>
              </div>
              <div className="w-12 h-0.5 bg-gold mb-6" />
              <p className="text-gray-600 leading-relaxed mb-8">{room.description}</p>

              <h3 className="font-serif text-xl text-forest-900 mb-4">Tiện Nghi Phòng</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
                {room.amenities?.map(a => (
                  <div key={a} className="flex items-center gap-2 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-gold shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {a}
                  </div>
                ))}
              </div>

              <h3 className="font-serif text-xl text-forest-900 mb-4">Chính Sách Lưu Trú</h3>
              <div className="grid grid-cols-2 gap-4">
                {[['Check-in','14:00'],['Check-out','12:00'],['Hủy miễn phí','Trước 7 ngày'],['Trẻ em','Chào đón mọi lứa tuổi']].map(([k,v]) => (
                  <div key={k} className="bg-cream p-4">
                    <div className="text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-1">{k}</div>
                    <div className="text-sm text-forest-800 font-medium">{v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-forest-900 text-white p-8">
                <div className="text-center mb-6">
                  <div className="text-gold font-bold text-3xl">{room.price?.toLocaleString('vi-VN')}đ</div>
                  <div className="text-gray-400 text-sm">/đêm</div>
                </div>
                <div className="space-y-3 mb-6 text-sm text-gray-300">
                  {[['Loại phòng', room.name],['Sức chứa', `${room.max_guests} khách`],['Diện tích', `${room.size}m²`]].map(([k,v]) => (
                    <div key={k} className="flex justify-between border-b border-forest-700 pb-3">
                      <span className="text-gray-400">{k}</span>
                      <span>{v}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setShowBooking(true)} className="btn-gold w-full text-center mb-3">
                  Đặt Phòng Ngay
                </button>
                <a href="tel:+842899955168"
                  className="block text-center border border-white/30 text-white text-[11px] tracking-widest uppercase py-3 hover:bg-white/10 transition-colors">
                  Gọi: +84 28 999 55168
                </a>
                <p className="text-center text-xs text-gray-500 mt-4">Xác nhận trong vòng 2 giờ</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other rooms */}
      <section className="py-14 bg-cream">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h2 className="font-serif text-2xl text-forest-900 text-center mb-10">Các Phòng Khác</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {[{slug:'phong-farm',name:'Phòng Farm'},{slug:'phong-garden',name:'Phòng Garden'},{slug:'phong-mountain',name:'Phòng Mountain'}]
              .filter(r => r.slug !== slug)
              .map(r => (
                <Link key={r.slug} to={`/phong-farmstay/${r.slug}`} className="btn-outline">{r.name}</Link>
              ))}
          </div>
        </div>
      </section>

      {showBooking && <BookingModal room={room} onClose={() => setShowBooking(false)} />}
    </div>
  );
}
