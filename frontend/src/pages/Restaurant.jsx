import React from 'react';
import { Link } from 'react-router-dom';

const HERO = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80';
const IMG1 = 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80';
const IMG2 = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80';
const IMG3 = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80';
const BAR = 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=900&q=80';

const MENU = [
  {
    cat: 'Khai Vị', items: [
      { name: 'Gỏi đu đủ tôm khô', desc: 'Đu đủ xanh, tôm khô, lạc rang, rau thơm địa phương', price: '75.000đ' },
      { name: 'Bánh mướt cuốn thịt', desc: 'Bánh mướt truyền thống, thịt ba chỉ, rau sống, nước chấm chua ngọt', price: '65.000đ' },
      { name: 'Súp rau rừng', desc: 'Rau rừng theo mùa, nước hầm xương, gia vị địa phương', price: '55.000đ' },
    ]
  },
  {
    cat: 'Món Chính', items: [
      { name: 'Cá nướng sông Chày', desc: 'Cá tươi từ sông Chày, nướng than hoa, bọc lá chuối, rau thơm', price: '195.000đ' },
      { name: 'Gà ri nướng mật ong', desc: 'Gà ri địa phương, ướp mật ong thảo mộc, nướng kiểu truyền thống', price: '225.000đ' },
      { name: 'Rau rừng xào tỏi', desc: 'Hỗn hợp rau rừng theo mùa, tỏi địa phương, dầu thực vật', price: '85.000đ' },
      { name: 'Cơm lam gà núi', desc: 'Cơm nếp nấu trong ống tre, gà núi thả vườn, muối mè', price: '155.000đ' },
    ]
  },
  {
    cat: 'Tráng Miệng', items: [
      { name: 'Chè đậu xanh lá dứa', desc: 'Đậu xanh hữu cơ, nước cốt dừa, lá dứa tươi', price: '45.000đ' },
      { name: 'Trái cây theo mùa', desc: 'Hoa quả tươi từ vườn nhà và vườn địa phương', price: '65.000đ' },
    ]
  },
];

const BAR_ITEMS = [
  { name: 'Trà thảo mộc Chày Lập', desc: 'Hỗn hợp thảo mộc địa phương, thu hoạch tươi', price: '35.000đ' },
  { name: 'Cà phê phin truyền thống', desc: 'Cà phê Arabica Quảng Trị, pha phin truyền thống', price: '30.000đ' },
  { name: 'Cocktail Sông Chày', desc: 'Rượu cần, chanh leo, gừng, mật ong, soda', price: '95.000đ' },
  { name: 'Nước ép rau củ quả', desc: 'Rau củ quả tươi từ vườn, không thêm đường', price: '55.000đ' },
  { name: 'Rượu cần địa phương', desc: 'Rượu cần truyền thống của người Bru - Vân Kiều', price: '120.000đ/bình' },
];

export default function Restaurant() {
  return (
    <div>
      <div className="page-hero">
        <div className="page-hero-bg" style={{ backgroundImage: `url(${HERO})` }} />
        <div className="page-hero-overlay" />
        <div className="relative z-10 text-center">
          <span className="section-subtitle">Ẩm Thực</span>
          <h1 className="font-serif text-3xl md:text-5xl text-white">Nhà Hàng & Bar</h1>
        </div>
      </div>

      {/* Intro */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-subtitle">Câu Chuyện Ẩm Thực</span>
              <h2 className="section-title mb-4">Từ Vườn Đến Bàn Ăn</h2>
              <div className="w-10 h-0.5 bg-gold mb-6" />
              <p className="text-gray-600 leading-relaxed mb-4">
                Nhà hàng Chày Lập lấy cảm hứng từ triết lý "farm-to-table" — từ vườn đến bàn ăn. Hầu hết nguyên liệu được thu hoạch trực tiếp từ vườn rau hữu cơ của farmstay hoặc từ các trang trại địa phương trong vùng.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Thực đơn kết hợp hài hòa giữa ẩm thực Việt Nam truyền thống và các kỹ thuật nấu nướng châu Á - châu Âu, tạo ra những trải nghiệm vị giác độc đáo và khó quên.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Không gian nhà hàng mở ra cảnh đẹp của thung lũng Chày Lập, mang đến những bữa ăn trong lành và thư thái giữa thiên nhiên.
              </p>
              <div className="flex gap-4 text-sm">
                <div className="bg-cream p-4 flex-1 text-center">
                  <div className="font-serif text-2xl text-forest-900 mb-1">7:00</div>
                  <div className="text-gray-500 text-xs uppercase tracking-wider">Mở cửa</div>
                </div>
                <div className="bg-cream p-4 flex-1 text-center">
                  <div className="font-serif text-2xl text-forest-900 mb-1">22:00</div>
                  <div className="text-gray-500 text-xs uppercase tracking-wider">Đóng cửa</div>
                </div>
                <div className="bg-cream p-4 flex-1 text-center">
                  <div className="font-serif text-2xl text-forest-900 mb-1">7/7</div>
                  <div className="text-gray-500 text-xs uppercase tracking-wider">Ngày/tuần</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="img-zoom"><img src={IMG1} alt="Food" className="w-full h-56 object-cover" /></div>
              <div className="img-zoom mt-6"><img src={IMG2} alt="Restaurant" className="w-full h-56 object-cover" /></div>
              <div className="img-zoom col-span-2"><img src={IMG3} alt="Local food" className="w-full h-48 object-cover" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section className="py-16 bg-cream">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-subtitle">Thực Đơn</span>
            <h2 className="section-title">Đặc Sản Chày Lập</h2>
            <div className="w-10 h-0.5 bg-gold mx-auto mt-4" />
          </div>
          {MENU.map(section => (
            <div key={section.cat} className="mb-10">
              <h3 className="font-serif text-xl text-forest-800 mb-5 pb-3 border-b border-cream-dark">{section.cat}</h3>
              <div className="space-y-4">
                {section.items.map(item => (
                  <div key={item.name} className="flex justify-between items-start gap-4 bg-white p-4">
                    <div>
                      <div className="font-serif text-base text-forest-900 mb-1">{item.name}</div>
                      <div className="text-sm text-gray-500">{item.desc}</div>
                    </div>
                    <div className="text-gold font-semibold text-sm shrink-0">{item.price}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <p className="text-xs text-gray-400 text-center italic mt-4">Thực đơn thay đổi theo mùa. Vui lòng hỏi nhân viên về các món đặc biệt trong ngày.</p>
        </div>
      </section>

      {/* Bar */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="img-zoom">
              <img src={BAR} alt="Bar" className="w-full h-96 object-cover" />
            </div>
            <div>
              <span className="section-subtitle">Đồ Uống</span>
              <h2 className="section-title mb-2">Bar Chày Lập</h2>
              <div className="w-10 h-0.5 bg-gold mb-6" />
              <p className="text-gray-600 leading-relaxed mb-6">
                Bar Chày Lập phục vụ cocktail handcrafted, rượu vang tuyển chọn và đặc biệt là trà thảo mộc địa phương. Không gian mở, ngắm nhìn cảnh đẹp của dòng sông Chày vào buổi chiều tà.
              </p>
              <div className="space-y-3">
                {BAR_ITEMS.map(item => (
                  <div key={item.name} className="flex justify-between items-start gap-4 py-3 border-b border-gray-100 last:border-0">
                    <div>
                      <div className="text-sm font-semibold text-forest-900 mb-0.5">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.desc}</div>
                    </div>
                    <div className="text-gold font-semibold text-sm shrink-0">{item.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reservation CTA */}
      <section className="py-16 bg-forest-900 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="font-serif text-2xl text-white mb-4">Đặt Bàn Trước</h2>
          <p className="text-gray-300 text-sm mb-6">Đặt bàn trước để đảm bảo chỗ ngồi và trải nghiệm tốt nhất tại nhà hàng Chày Lập.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+842899955168" className="btn-gold text-center">Gọi Đặt Bàn</a>
            <Link to="/lien-he" className="btn-outline !border-white !text-white hover:!bg-white hover:!text-forest-900">Liên Hệ</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
