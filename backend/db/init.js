import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DB_PATH = join(__dirname, '../data/farmstay.db');

let db;

export function getDB() {
  if (!db) {
    mkdirSync(join(__dirname, '../data'), { recursive: true });
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
  }
  return db;
}

export function initDB() {
  const db = getDB();

  db.exec(`
    CREATE TABLE IF NOT EXISTS rooms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      type TEXT NOT NULL,
      price INTEGER NOT NULL,
      max_guests INTEGER DEFAULT 2,
      size INTEGER,
      short_desc TEXT,
      description TEXT,
      amenities TEXT,
      images TEXT,
      highlight TEXT,
      available INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS blog_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      excerpt TEXT,
      content TEXT,
      image TEXT,
      category TEXT,
      author TEXT DEFAULT 'Chay Lap Team',
      published_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      room_id INTEGER,
      room_name TEXT,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      check_in TEXT NOT NULL,
      check_out TEXT NOT NULL,
      guests INTEGER DEFAULT 2,
      special_requests TEXT,
      status TEXT DEFAULT 'pending',
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      subject TEXT,
      message TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      category TEXT NOT NULL,
      price INTEGER NOT NULL,
      weight TEXT,
      short_desc TEXT,
      description TEXT,
      usage_guide TEXT,
      processing TEXT,
      roast TEXT,
      tags TEXT DEFAULT '[]',
      image TEXT,
      badge TEXT
    );
  `);

  const roomCount = db.prepare('SELECT COUNT(*) as c FROM rooms').get();
  if (roomCount.c === 0) seedRooms(db);

  const blogCount = db.prepare('SELECT COUNT(*) as c FROM blog_posts').get();
  if (blogCount.c === 0) seedBlog(db);

  const prodCount = db.prepare('SELECT COUNT(*) as c FROM products').get();
  if (prodCount.c === 0) seedProducts(db);

  console.log('Database ready');
}

function seedRooms(db) {
  const ins = db.prepare(`
    INSERT INTO rooms (name,slug,type,price,max_guests,size,short_desc,description,amenities,images,highlight)
    VALUES (?,?,?,?,?,?,?,?,?,?,?)
  `);

  ins.run(
    'Phong Farm', 'phong-farm', 'farm', 1700000, 4, 40,
    'Mai vom doc dao tu go pallet tai che va tre nua tu nhien',
    'Phong Farm duoc thiet ke voi mai vom doc dao tu go pallet tai che va tre nua tu nhien. Khong gian mo ket hop voi canh quan vuon rau xanh mat mang den trai nghiem song gan gui voi thien nhien nhat. Phong du rong cho 4 nguoi voi 2 giuong doi, thiet ke tho moc nhung day du tien nghi.',
    JSON.stringify(['Dieu hoa nhiet do','WiFi mien phi','Phong tam rieng','Voi sen ngoai troi','Hien tre','Binh dun nuoc','Ket an toan','Quat tran','Dep di trong phong','Do dung ve sinh cao cap']),
    JSON.stringify([
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80',
      'https://images.unsplash.com/photo-1595521624853-6e52b0b1d6ef?w=800&q=80'
    ]),
    'Mai vom go tai che doc dao, gan gui thien nhien'
  );

  ins.run(
    'Phong Garden', 'phong-garden', 'garden', 1400000, 3, 35,
    'Mai ngoi truyen thong, hien rong nhin ra vuon xanh yen binh',
    'Phong Garden mang dam hoi tho cua kien truc nha vuon Viet Nam truyen thong voi mai ngoi va hien rong nhin ra vuon cay xanh muot. Thiet ke ket hop hai hoa giua kien truc nha vuon Viet Nam va tien nghi hien dai. Phong phu hop cho 2-3 nguoi voi 1 giuong lon va 1 giuong don.',
    JSON.stringify(['Dieu hoa nhiet do','WiFi mien phi','Phong tam rieng','Hien rong co ghe ngoi','Minibar','Binh dun nuoc','Ket an toan','Tra & Ca phe','Dep di trong phong','Do dung ve sinh cao cap']),
    JSON.stringify([
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
      'https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?w=800&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80'
    ]),
    'Hien rong ngam vuon, kien truc nha vuon truyen thong'
  );

  ins.run(
    'Phong Mountain', 'phong-mountain', 'mountain', 1100000, 2, 45,
    'Thiet ke 2 tang hien dai voi tam nhin panorama ra day nui Phong Nha',
    'Phong Mountain 2 tang voi tam nhin panorama ra day nui Phong Nha hung vi. Khong gian hien dai toi gian, toi uu hoa anh sang tu nhien va view canh quan ngoan muc. Tang tren la phong ngu chinh, tang duoi la khu vuc sinh hoat va phong tam. Ly tuong cho cap doi muon tan huong khong gian rieng tu giua thien nhien.',
    JSON.stringify(['Dieu hoa nhiet do','WiFi mien phi','2 Phong tam','Tam nhin nui panorama','Minibar','TV thong minh 32"','Binh dun nuoc','Ket an toan','Ban cong ngam canh','Do dung ve sinh cao cap']),
    JSON.stringify([
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
      'https://images.unsplash.com/photo-1601918774516-bf3fba83bc34?w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80'
    ]),
    'View panorama nui Phong Nha, thiet ke 2 tang hien dai'
  );
}

function seedBlog(db) {
  const ins = db.prepare(`
    INSERT INTO blog_posts (title,slug,excerpt,content,image,category,published_at)
    VALUES (?,?,?,?,?,?,?)
  `);

  ins.run(
    'Ban Doong - Cong dong ben bi giua vung loi Phong Nha',
    'ban-doong-cong-dong-ben-bi',
    'Ban Doong nam trong vung loi Phong Nha - Ke Bang, la diem dung chan dac biet tren hanh trinh kham pha hang Son Doong va hang En huyen thoai.',
    '<p>Ban Doong la mot ban lang nam sau trong vung loi Vuon Quoc gia Phong Nha - Ke Bang, tinh Quang Binh. Day la diem dung chan dac biet danh cho nhung ai muon kham pha hanh trinh chinh phuc hang Son Doong - hang dong lon nhat the gioi.</p><p>Cong dong nguoi dan toc Bru - Van Kieu sinh song tai ban Doong da duy tri loi song hoa hop voi thien nhien qua nhieu the he. Ho la nhung nguoi bao ve va dan duong cho du khach muon kham pha ve dep hoang so cua vung loi rung nguyen sinh.</p><p>Hanh trinh den ban Doong khong chi la mot chuyen trekking thu vi ma con la co hoi de trai nghiem cuoc song gan gui voi thien nhien va tim hieu ve van hoa cua nguoi dan toc dia phuong.</p>',
    'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80',
    'Kham pha', '2026-04-15 08:00:00'
  );

  ins.run(
    'Du lich Phong Nha Ke Bang: Di dau, an choi gi 2026',
    'du-lich-phong-nha-2026',
    'Huong dan toan dien cho chuyen du lich Phong Nha - Ke Bang nam 2026: nhung diem den khong the bo qua, am thuc dac sac va hoat dong hap dan.',
    '<p>Phong Nha - Ke Bang la diem den dau tien phai ke den khi nhac den du lich Quang Binh. Voi he thong hang dong phong phu va da dang, khu vuc nay da duoc UNESCO cong nhan la Di san Thien nhien The gioi.</p><p>Nhung diem den khong the bo qua: Hang Phong Nha, Hang Thien Duong, Hang Son Doong, Hang En, Ozo Park va nhieu dia diem hap dan khac.</p><p>Am thuc dac sac Quang Binh: Banh canh ca loc, chao canh, muc kho nuong, khoai deo va nhieu mon ngon khac.</p>',
    'https://images.unsplash.com/photo-1559827291-72ebdf9e4783?w=800&q=80',
    'Huong dan', '2026-04-01 08:00:00'
  );

  ins.run(
    '11 dia diem du lich Phong Nha Ke Bang hap dan nen trai nghiem',
    '11-dia-diem-du-lich-phong-nha',
    'Kham pha 11 diem den tuyet voi tai Phong Nha - Ke Bang voi he sinh thai rung nguyen sinh, song ngam va hang dong ky bi.',
    '<p>Phong Nha - Ke Bang so huu vo so diem den hap dan tu hang dong, rung nguyen sinh den lang ban van hoa. Duoi day la 11 dia diem ban nhat dinh phai trai nghiem.</p><ol><li>Hang Phong Nha - Di san Thien nhien The gioi</li><li>Hang Thien Duong - Hang kho dai nhat Viet Nam</li><li>Hang Son Doong - Hang lon nhat the gioi</li><li>Hang En - Noi tru ngu cua hang nghin con en</li><li>Hang Va - He thong nhu da an tuong</li><li>Vung Chua - Dao Yen - Diem lich su thieng lieng</li><li>Ho Bau Tro - Ho nuoc ngot tu nhien</li><li>Duong 20 Quyet Thang - Lich su hao hung</li><li>Ban Doong - Lang ban doc dao</li><li>Suoi Mooc - Tam nuoc tu nhien</li><li>Ozo Park - Cong vien phieu luu</li></ol>',
    'https://images.unsplash.com/photo-1592364395653-83e648b20cc2?w=800&q=80',
    'Kham pha', '2026-03-15 08:00:00'
  );

  ins.run(
    'Top 11 loai rau rung an duoc va ngon mieu tai Phong Nha',
    'top-rau-rung-phong-nha',
    'Kham pha nhung loai rau rung tuoi ngon, bo duong va dac sac cua vung Phong Nha ma ban co the thuong thuc trong cac bua an tai dia phuong.',
    '<p>Mot trong nhung trai nghiem am thuc doc dao nhat tai Phong Nha chinh la thuong thuc cac mon an tu rau rung tuoi ngon. Nhung loai rau nay duoc nguoi dan dia phuong hai tu rung moi ngay, dam bao tuoi ngon va giau dinh duong.</p><p>Top loai rau rung noi bat: Dot may, hoa chuoi rung, rau don, la bep, nam rung cac loai va nhieu loai khac.</p><p>Tai Chay Lap Farmstay, nha hang chung toi luon su dung nguon rau rung va rau vuon sach tuoi ngon de che bien cac mon an dac sac cho thuc khach.</p>',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
    'Am thuc', '2026-03-01 08:00:00'
  );

  ins.run(
    '6 tour trekking Phong Nha Ke Bang an tuong nhat',
    '6-tour-trekking-phong-nha',
    'Tong hop 6 tour trekking hap dan nhat tai Phong Nha - Ke Bang, tu nhung tuyen duong nhe nhang den thu thach chinh phuc hang dong hoanh trang.',
    '<p>Phong Nha - Ke Bang khong chi noi tieng voi hang dong ma con la thien duong cho nhung nguoi yeu thich trekking va kham pha thien nhien.</p><p>6 tour trekking an tuong: Tour Hang En 2 ngay, Tour Ban Doong - Hang Son Doong 4-5 ngay, Tour Hang Va - Hang Nuoc Nut 2 ngay, Trekking rung nguyen sinh 1 ngay, Tour Phong Nha Combo va Trekking lang ban dia.</p>',
    'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
    'Hoat dong', '2026-02-15 08:00:00'
  );

  ins.run(
    'Trai nghiem Farmstay - Loi song cham giua thien nhien Quang Binh',
    'trai-nghiem-farmstay-cuoc-song-cham',
    'Farmstay khong chi la noi nghi ngoi ma con la hanh trinh kham pha lai ban than, ket noi voi thien nhien va cong dong dia phuong tai vung dat Quang Binh.',
    '<p>Trong nhip song hoi ha cua thoi dai so, xu huong slow travel - du lich cham dang ngay cang duoc nhieu nguoi tim den. Va Farmstay chinh la mot trong nhung hinh thuc nghi duong phu hop nhat.</p><p>Tai Chay Lap Farmstay, chung toi mang den cho du khach khong gian de: Thu gian that su, Trai nghiem nong nghiep, Am thuc tuoi ngon tu vuon nha, va Ket noi cong dong.</p><p>Day chinh la ly do tai sao ngay cang nhieu du khach trong va ngoai nuoc chon Chay Lap la diem den cho nhung ky nghi y nghia.</p>',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    'Lifestyle', '2026-02-01 08:00:00'
  );
}

function seedProducts(db) {
  const ins = db.prepare(`
    INSERT INTO products (name,slug,category,price,weight,short_desc,description,usage_guide,processing,roast,tags,image,badge)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)
  `);

  ins.run(
    'Cà Phê Bột Blend Trosie', 'ca-phe-bot-blend', 'bot', 275000, 'Túi 500g',
    'Phối trộn 30% Arabica và 70% Robusta, 100% quả chín đỏ từ Hướng Phùng, Quảng Trị. Hương vị đậm đà, hậu ngọt tự nhiên.',
    'Cà phê bột Blend Trosie được phối trộn hài hòa giữa 30% Arabica đặc sản Quảng Trị và 70% Robusta, sử dụng 100% quả chín đỏ từ vùng trồng xã Hướng Phùng, tỉnh Quảng Trị. Chế biến Natural phơi nắng – nơi có khí hậu và thổ nhưỡng đặc trưng, tạo nên hương vị đậm đà và cân bằng.\n\n• Khối lượng tịnh: 500g\n• Thành phần: 30% Arabica – 70% Robusta\n• Hạn sử dụng: 6 tháng sau khi mở bao bì\n• Đơn vị sản xuất: Công ty TNHH Pun Coffee',
    'Phù hợp để pha phin truyền thống hoặc pour-over (V60), thích hợp uống đen hoặc kèm sữa đá.',
    'Natural', 'Medium',
    JSON.stringify(['Phin', 'Pour-over', 'Arabica 30%', 'Robusta 70%']),
    '/images/coffee/products/bot-blend/DSCF8774.jpg', null
  );

  ins.run(
    'Cà Phê Hạt Blend Trosie', 'ca-phe-hat-blend', 'hat', 270000, 'Túi 500g',
    'Phối trộn 30% Arabica và 70% Robusta, 100% quả chín đỏ từ Hướng Phùng, Quảng Trị. Hương thơm thanh thoát, vị đậm đà.',
    'Cà phê hạt Blend Trosie là sự hòa quyện tinh tế giữa 30% Arabica và 70% Robusta, được thu hái từ 100% quả chín đỏ tại vùng trồng xã Hướng Phùng, tỉnh Quảng Trị – vùng đất có khí hậu mát mẻ quanh năm, độ cao lý tưởng và thổ nhưỡng đặc trưng.\n\n• Khối lượng tịnh: 500g\n• Thành phần: 30% Arabica – 70% Robusta\n• Hạn sử dụng: 12 tháng kể từ ngày sản xuất\n• Đơn vị sản xuất: Công ty TNHH Pun Coffee',
    'Xay mịn để pha phin truyền thống. Xay vừa để pha máy Espresso hoặc pour-over (V60). Phù hợp uống đen nguyên chất hoặc kèm sữa đá.',
    'Natural', 'Medium',
    JSON.stringify(['Phin', 'Espresso', 'Pour-over', 'Arabica 30%', 'Robusta 70%']),
    '/images/coffee/products/hat-blend/DSCF8724.jpg', null
  );

  ins.run(
    'Arabica Natural Trosie', 'arabica-natural', 'dac-san', 234000, 'Túi 180g',
    'Hạt Arabica rang light, chế biến natural. Hương mứt gừng, trái cây chín (dứa mật, chanh leo vàng, xoài). Vị chua phức tạp, êm dịu.',
    'Cà phê hạt Arabica Trosie được tuyển chọn từ vùng nguyên liệu Hướng Phùng, Quảng Trị – nơi có độ cao, khí hậu mát mẻ và đất đỏ bazan đặc trưng. Đây là dòng cà phê từng nhiều lần được vinh danh Top 1 Arabica Việt Nam các năm 2025, 2024, 2023, 2021.\n\nHương vị:\n• Mứt gừng, trái cây chín (dứa mật, chanh leo vàng, xoài)\n• Hương spice: Bạc hà tươi mát, gừng se nhẹ\n• Vị: Chua phức tạp, êm dịu, hậu ngọt thanh\n\n• Khối lượng tịnh: 180g\n• Phương pháp chế biến: Natural\n• Mức rang: Light roast\n• Hạn sử dụng: 12 tháng\n• Đơn vị sản xuất: Công ty TNHH Pun Coffee',
    'Pour-over (V60, Kalita), Cold brew, Drip coffee, Aeropress.',
    'Natural', 'Light',
    JSON.stringify(['Pour-over', 'Cold brew', 'Top 1 VN 2025', '100% Arabica']),
    '/images/coffee/products/arabica/hat-arabica-natural.jpg', 'Top 1 VN 2025'
  );

  ins.run(
    'Arabica Honey Trosie', 'arabica-honey', 'dac-san', 220000, 'Túi 180g',
    'Hạt Arabica rang medium, chế biến honey. Hương mật ong, caramel, trái cây nhiệt đới. Vị chua dịu, hậu ngọt dài.',
    'Cà phê hạt Arabica Honey Trosie được lựa chọn từ vườn cà phê Hướng Phùng, Quảng Trị. Đạt Top 3 Arabica Việt Nam các năm 2022, 2023, 2024.\n\nHương vị:\n• Mật ong, caramel, trái cây nhiệt đới (cam, dứa, chuối chín)\n• Điểm xuyến hạnh nhân rang\n• Vị: Chua nhẹ nhàng, cân bằng, hậu ngọt dài và êm dịu\n\n• Khối lượng tịnh: 180g\n• Phương pháp chế biến: Honey process\n• Mức rang: Medium roast\n• Hạn sử dụng: 12 tháng\n• Đơn vị sản xuất: Công ty TNHH Pun Coffee',
    'Phin truyền thống, Pour-over (V60, Kalita), Drip coffee, Espresso máy.',
    'Honey', 'Medium',
    JSON.stringify(['Phin', 'Pour-over', 'Espresso', 'Top 3 VN 2022-2024']),
    '/images/coffee/products/arabica/hat-arabica-honey.jpg', 'Top 3 VN 2022-2024'
  );

  ins.run(
    'Liberica Natural Trosie', 'liberica-natural', 'dac-san', 215000, 'Túi 180g',
    'Specialty coffee, hạt rang vừa, chế biến natural. Hương trái cây vàng (tầm bóp, cam ngọt, mít vàng). Vị ngọt thanh, hậu vị tươi sáng.',
    'Cà phê hạt Liberica Natural Trosie được thu hoạch thủ công từ vườn cà phê đặc sản Hướng Phùng – Quảng Trị. Sử dụng phương pháp chế biến Natural truyền thống, giữ trọn vẹn sự phong phú của hạt Liberica – giống cà phê quý hiếm và độc đáo.\n\nHương vị:\n• Trái cây vàng bản địa (tầm bóp, cam ngọt, mít vàng)\n• Mùi thơm dày dặn và khác biệt\n• Vị: Ngọt thanh, chua nhẹ tự nhiên, hậu vị tươi mát và kéo dài\n\n• Khối lượng tịnh: 180g\n• Phương pháp chế biến: Natural\n• Mức rang: Medium roast\n• Hạn sử dụng: 12 tháng\n• Đơn vị sản xuất: Công ty TNHH Pun Coffee',
    'Phin truyền thống, Pour-over (V60), Cold brew, Drip coffee.',
    'Natural', 'Medium',
    JSON.stringify(['Phin', 'Pour-over', 'Cold brew', 'Specialty', '100% Liberica']),
    '/images/coffee/products/arabica/hat-liberica-top1.jpg', 'Specialty'
  );

  ins.run(
    'Túi Nhúng Arabica Origin Trosie', 'tui-nhung-arabica', 'tui-nhung', 170000, 'Hộp 10 túi x 12g',
    'Specialty drip bag coffee. Hương cam quýt, quả mọng, vị chua thanh nhẹ nhàng. Rang vừa, tiện lợi mọi lúc mọi nơi.',
    'Cà phê túi nhúng Arabica Origin Trosie được tuyển chọn từ 100% hạt Arabica chín đỏ tại Hướng Phùng, Quảng Trị. Rang medium để cân bằng giữa vị chua thanh và hậu ngọt tự nhiên.\n\nHương vị:\n• Cam quýt, quả mọng, thoang thoảng vị ngọt dịu sau cùng\n• Vị: Chua thanh nhẹ nhàng, cân bằng và dễ uống\n\n• Khối lượng: 10 túi x 12g\n• Rang: Medium roast\n• Chế biến: Natural\n• Hạn sử dụng: 12 tháng\n• Đơn vị sản xuất: Công ty TNHH Pun Coffee',
    '1. Cho 1 túi lọc vào cốc.\n2. Rót khoảng 150ml nước nóng dưới 92°C.\n3. Nhúng túi 3–4 lần để chiết xuất hương vị.\n4. Thưởng thức nóng hoặc thêm đá tùy khẩu vị.',
    'Natural', 'Medium',
    JSON.stringify(['Drip bag', 'Tiện lợi', '100% Arabica', 'Văn phòng']),
    '/images/coffee/products/tui-nhung/DSCF0485.JPG', null
  );

  ins.run(
    'Túi Nhúng Blend Arabica + Robusta Trosie', 'tui-nhung-blend', 'tui-nhung', 170000, 'Hộp 10 túi x 12g',
    'Drip bag coffee Blend. Hương trái cây nhiệt đới (chanh leo, xoài), vị chua dịu hòa quyện cùng hậu vị chocolate ngọt.',
    'Dòng Blend Arabica + Robusta được phối trộn hài hòa, vừa giữ được sự thanh thoát trái cây của Arabica, vừa có độ đậm đà và hậu vị chocolate ngọt của Robusta. Dễ uống, phù hợp cho cả người mới thưởng thức cà phê đặc sản.\n\nHương vị:\n• Trái cây nhiệt đới (chanh leo, xoài)\n• Vị chocolate ngọt hậu\n• Vị: Chua nhẹ nhàng, cân bằng, ngọt dịu sau cùng\n\n• Khối lượng: 10 túi x 12g\n• Rang: Medium roast\n• Hạn sử dụng: 12 tháng\n• Đơn vị sản xuất: Công ty TNHH Pun Coffee',
    '1. Cho túi lọc vào cốc.\n2. Rót 150ml nước nóng dưới 92°C.\n3. Nhúng túi 3–4 lần.\n4. Thưởng thức nóng hoặc thêm đá.',
    'Natural', 'Medium',
    JSON.stringify(['Drip bag', 'Tiện lợi', 'Arabica + Robusta']),
    '/images/coffee/products/tui-nhung/DSCF0489.JPG', null
  );

  ins.run(
    'Trà Vỏ Cà Phê Thảo Dược Trosie', 'tra-vo-ca-phe', 'tra', 185000, 'Hộp',
    'Vỏ cà phê hái chọn từ vùng canh tác hữu cơ Hướng Phùng – Quảng Trị. Hương vị thanh ngọt nhẹ nhàng, giúp thư giãn và cải thiện tâm trạng.',
    'Trà Vỏ Cà Phê Thảo Dược Trosie được làm từ vỏ cà phê hái chọn từ vùng nguyên liệu an toàn, canh tác hữu cơ tại Hướng Phùng – Hướng Hóa – Quảng Trị.\n\n• Hương vị: Thanh ngọt nhẹ nhàng, tự nhiên\n• Công dụng: Giúp thư giãn, cải thiện tâm trạng, hỗ trợ sức khỏe\n• Canh tác: Hữu cơ, an toàn\n• Đơn vị sản xuất: Công ty TNHH Pun Coffee',
    'Trà nóng: Cho 1 túi lọc vào cốc, rót 200–250ml nước nóng, ngâm 5 phút.\nTrà lạnh: Cho túi vào bình thủy tinh, châm 100ml nước nóng, thêm 300ml nước nguội, ngăn mát 24h.',
    'Hữu cơ', null,
    JSON.stringify(['Herbal', 'Hữu cơ', 'Thư giãn', 'Không caffeine']),
    '/images/coffee/products/tra-vo-ca-phe/DSCF0918.JPG', null
  );
}
