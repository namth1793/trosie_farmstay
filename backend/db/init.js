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
  `);

  const roomCount = db.prepare('SELECT COUNT(*) as c FROM rooms').get();
  if (roomCount.c === 0) seedRooms(db);

  const blogCount = db.prepare('SELECT COUNT(*) as c FROM blog_posts').get();
  if (blogCount.c === 0) seedBlog(db);

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
