import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PROCESS = [
  { step: '01', label: 'Trồng Tự Nhiên', desc: 'Cà phê Arabica & Liberica trồng trên đất đỏ bazan Hướng Phùng, không hóa chất, canh tác hữu cơ.' },
  { step: '02', label: 'Thu Hoạch Thủ Công', desc: 'Chỉ hái quả chín đỏ, tuyển chọn kỹ lưỡng từng mùa vụ, đảm bảo chất lượng tối ưu.' },
  { step: '03', label: 'Rang Xay Tại Chỗ', desc: 'Rang mộc, không pha tạp, không đánh bóng. Chỉ giữ lại hương vị thật của cà phê Quảng Trị.' },
];

export default function Coffee() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products').then(r => setProducts(r.data.slice(0, 4))).catch(() => {});
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920&q=80)' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
        <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto">
          <p className="text-[11px] tracking-widest uppercase text-gold font-semibold mb-4">
            From the Land of Fire – Quảng Trị Specialty Coffee
          </p>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-6">
            Trosie Coffee
          </h1>
          <p className="text-white/80 text-lg mb-4 italic">
            Cà phê organic từ Khe Sanh, Quảng Trị
          </p>
          <p className="text-white/65 text-sm mb-10 max-w-xl mx-auto leading-relaxed">
            Mang hương vị thuần khiết từ đất trời và con người vùng đất lửa đến gần hơn với bạn.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/ca-phe/shop" className="btn-gold">Khám Phá Cà Phê</Link>
            <a href="#gioi-thieu" className="btn-outline !border-white/50 !text-white hover:!bg-white/10 hover:!text-white">
              Tìm Hiểu Thêm
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="gioi-thieu" className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-subtitle">Giới Thiệu</span>
              <h2 className="section-title mb-4">Hương Vị Nguyên Bản<br /><em>Từ Đất Trời Quảng Trị</em></h2>
              <div className="w-12 h-0.5 bg-gold mb-6" />
              <p className="text-gray-600 leading-relaxed mb-4">
                Trosie Coffee là thương hiệu cà phê được tạo nên từ tình yêu thiên nhiên và con người Quảng Trị.
                Mỗi hạt cà phê được chăm sóc kỹ lưỡng, rang mộc, và mang đến hương vị nguyên bản – để bạn không chỉ thưởng thức cà phê, mà còn thưởng thức cả một vùng đất.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Vùng trồng Hướng Phùng, Hướng Hoá, Quảng Trị – nơi đất đỏ bazan, độ cao lý tưởng và khí hậu mát mẻ quanh năm tạo nên chất lượng hạt vượt trội, được nhiều lần vinh danh tại các cuộc thi cà phê đặc sản toàn quốc.
              </p>
              <Link to="/ca-phe/shop" className="btn-primary">Xem Sản Phẩm</Link>
            </div>
            <div className="img-zoom">
              <img src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=900&q=80"
                alt="Trosie Coffee" className="w-full h-[450px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-forest-900">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <span className="section-subtitle">Quy Trình</span>
            <h2 className="font-serif text-3xl text-white">Không Pha Tạp. Không Đánh Bóng.<br /><em className="text-gold">Chỉ Giữ Lại Hương Vị Thật.</em></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROCESS.map(p => (
              <div key={p.step} className="text-center">
                <div className="font-serif text-5xl text-gold/30 mb-2">{p.step}</div>
                <h3 className="font-serif text-lg text-white mb-3">{p.label}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products preview */}
      {products.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <span className="section-subtitle">Sản Phẩm</span>
              <h2 className="section-title">Tuyển Chọn Từ Trosie</h2>
              <div className="w-12 h-0.5 bg-gold mx-auto mt-4" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map(p => (
                <Link key={p.id} to={`/ca-phe/shop/${p.slug}`} className="group block">
                  <div className="img-zoom mb-4 relative">
                    <img src={p.image} alt={p.name} className="w-full h-52 object-cover" />
                    {p.badge && (
                      <span className="absolute top-2 left-2 bg-gold text-white text-[10px] font-bold tracking-wide px-2 py-1 uppercase">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-base text-forest-900 group-hover:text-gold transition-colors mb-1 line-clamp-2">{p.name}</h3>
                  <div className="text-gold font-semibold text-sm mb-1">{p.price?.toLocaleString('vi-VN')}đ</div>
                  <div className="text-xs text-gray-400">{p.weight}</div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link to="/ca-phe/shop" className="btn-outline">Xem Tất Cả Sản Phẩm</Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-cream text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="section-title mb-4">Đặt Mua Cà Phê Trosie</h2>
          <p className="text-gray-600 text-sm mb-8">Liên hệ để đặt sỉ hoặc mua lẻ – giao toàn quốc</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/ca-phe/shop" className="btn-primary">Vào Shop</Link>
            <a href="tel:0961393370" className="btn-outline">Liên Hệ Đặt Sỉ</a>
          </div>
        </div>
      </section>
    </div>
  );
}
