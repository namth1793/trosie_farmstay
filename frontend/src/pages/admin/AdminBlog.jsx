import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import vi from '../../i18n/vi';

// ── Constants ──────────────────────────────────────────────
const CATEGORIES = ['Khám phá', 'Hướng dẫn', 'Ẩm thực', 'Hoạt động', 'Lifestyle', 'Tin tức'];
const EMPTY_BLOG = { title: '', slug: '', excerpt: '', content: '', category: 'Tin tức', author: 'Trosie Garden' };
const STATUS = {
  pending:   { label: 'Chờ xác nhận', cls: 'bg-amber-50 text-amber-700 border-amber-200' },
  confirmed: { label: 'Đã xác nhận',  cls: 'bg-green-50 text-green-700 border-green-200' },
  cancelled: { label: 'Đã hủy',       cls: 'bg-gray-100 text-gray-500 border-gray-200' },
};
const NAV_ITEMS = [
  { key: 'blog',        label: 'Blog',           group: 'manage', icon: '✏️' },
  { key: 'contacts',    label: 'Liên hệ',        group: 'manage', icon: '💬' },
  { key: 'bookings',    label: 'Đặt phòng',      group: 'manage', icon: '🛏️' },
  { key: 'general',     label: 'Thông tin chung', group: 'content', icon: '📋' },
  { key: 'home',        label: 'Trang Chủ',      group: 'content', icon: '🏠' },
  { key: 'about',       label: 'Giới Thiệu',     group: 'content', icon: '📖' },
  { key: 'luutru',      label: 'Lưu Trú',        group: 'content', icon: '🏕️' },
  { key: 'restaurant',  label: 'Nhà Hàng',       group: 'content', icon: '🍽️' },
  { key: 'sup',         label: 'Chèo SUP',        group: 'content', icon: '🏄' },
  { key: 'rosegarden',  label: 'Vườn Hoa Hồng',  group: 'content', icon: '🌹' },
  { key: 'activities',  label: 'Hoạt Động',      group: 'content', icon: '🎨' },
  { key: 'coffee',      label: 'Cà Phê',         group: 'content', icon: '☕' },
];

// ── Helpers ────────────────────────────────────────────────
function authHeaders() { return { Authorization: `Bearer ${localStorage.getItem('admin_token')}` }; }
function slugify(t) {
  return t.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[đĐ]/g, 'd')
    .toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-');
}
function fmtDate(dt) {
  if (!dt) return '';
  const d = new Date(dt);
  return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
}
function calcNights(ci, co) {
  const n = Math.round((new Date(co) - new Date(ci)) / 86400000);
  return n > 0 ? `${n} đêm` : '';
}
function get(db, s, k, fallback) { return db[s]?.[k] ?? fallback; }
function getArr(db, s, k, fallback) {
  const v = db[s]?.[k];
  if (v) try { return JSON.parse(v); } catch {}
  return fallback;
}
function initFormData(db) {
  return {
    general: {
      phone1: get(db,'general','phone1', vi.general.phone1),
      phone2: get(db,'general','phone2', vi.general.phone2),
      email:  get(db,'general','email',  vi.general.email),
      address:get(db,'general','address',vi.general.address),
      hours:  get(db,'general','hours',  vi.general.hours),
    },
    home: {
      introDesc: get(db,'home','introDesc', vi.home.introDesc),
      reviews:   getArr(db,'home','reviews', vi.home.reviews),
    },
    about: {
      storyP1:   get(db,'about','storyP1',   vi.about.storyP1),
      storyBold: get(db,'about','storyBold', vi.about.storyBold),
      storyP2:   get(db,'about','storyP2',   vi.about.storyP2),
      storyP3:   get(db,'about','storyP3',   vi.about.storyP3),
      storyP4:   get(db,'about','storyP4',   vi.about.storyP4),
      values:    getArr(db,'about','values',  vi.about.values),
    },
    luutru: {
      rooms:           getArr(db,'homestay','rooms',         vi.homestay.rooms),
      campingPrice:    get(db,'camping','price',             vi.camping.price),
      campingPriceUnit:get(db,'camping','priceUnit',         vi.camping.priceUnit),
      campingCapacity: get(db,'camping','priceCapacity',     vi.camping.priceCapacity),
    },
    restaurant: {
      introDesc:  get(db,'restaurant','introDesc',  vi.restaurant.introDesc),
      highlights: getArr(db,'restaurant','highlights', vi.restaurant.highlights),
      spaceDesc:  get(db,'restaurant','spaceDesc',  vi.restaurant.spaceDesc),
    },
    sup: {
      price:     get(db,'sup','price',     vi.sup.price),
      priceUnit: get(db,'sup','priceUnit', vi.sup.priceUnit),
      priceNote: get(db,'sup','priceNote', vi.sup.priceNote),
    },
    rosegarden: {
      introDesc1: get(db,'roseGarden','introDesc1', vi.roseGarden.introDesc1),
      introDesc2: get(db,'roseGarden','introDesc2', vi.roseGarden.introDesc2),
      seasonDesc: get(db,'roseGarden','seasonDesc', vi.roseGarden.seasonDesc),
    },
    activities: {
      bottlePrice:    get(db,'activities','bottlePrice',    vi.activities.bottlePrice),
      bottlePriceNote:get(db,'activities','bottlePriceNote',vi.activities.bottlePriceNote),
      flowerPrice:    get(db,'activities','flowerPrice',    vi.activities.flowerPrice),
      programs:       getArr(db,'activities','programs',    vi.activities.programs),
    },
    coffee: {
      aboutDesc1: get(db,'coffee','aboutDesc1', vi.coffee.aboutDesc1),
      aboutDesc2: get(db,'coffee','aboutDesc2', vi.coffee.aboutDesc2),
    },
  };
}
function buildSaves(section, data) {
  const h = { headers: authHeaders() };
  const put = (s, u) => axios.put(`/api/admin/content/${s}`, { lang: 'vi', updates: u }, h);
  switch (section) {
    case 'general':    return [put('general', data)];
    case 'home':       return [put('home', { introDesc: data.introDesc, reviews: JSON.stringify(data.reviews) })];
    case 'about':      return [put('about', { storyP1: data.storyP1, storyBold: data.storyBold, storyP2: data.storyP2, storyP3: data.storyP3, storyP4: data.storyP4, values: JSON.stringify(data.values) })];
    case 'luutru':     return [put('homestay', { rooms: JSON.stringify(data.rooms) }), put('camping', { price: data.campingPrice, priceUnit: data.campingPriceUnit, priceCapacity: data.campingCapacity })];
    case 'restaurant': return [put('restaurant', { introDesc: data.introDesc, highlights: JSON.stringify(data.highlights), spaceDesc: data.spaceDesc })];
    case 'sup':        return [put('sup', data)];
    case 'rosegarden': return [put('roseGarden', data)];
    case 'activities': return [put('activities', { bottlePrice: data.bottlePrice, bottlePriceNote: data.bottlePriceNote, flowerPrice: data.flowerPrice, programs: JSON.stringify(data.programs) })];
    case 'coffee':     return [put('coffee', data)];
    default: return [];
  }
}

// ── Shared UI ──────────────────────────────────────────────
function EmptyState({ text }) {
  return <div className="text-center py-16 bg-white rounded shadow-sm"><p className="text-gray-400 text-sm">{text}</p></div>;
}
function Field({ label, required, hint, children }) {
  return (
    <div>
      <label className="flex items-center gap-1 text-[11px] font-bold tracking-widest uppercase text-gray-500 mb-1.5">
        {label}{required && <span className="text-red-400">*</span>}
      </label>
      {hint && <p className="text-xs text-gray-400 mb-2">{hint}</p>}
      {children}
    </div>
  );
}
const iCls = 'w-full border border-gray-200 px-4 py-3 text-base focus:outline-none focus:border-forest-700 transition-colors rounded-sm';
const taCls = iCls + ' resize-none leading-relaxed';

function SaveBar({ section, saving, saved, onSave }) {
  return (
    <div className="mt-6 pt-5 border-t border-gray-100 flex items-center gap-3">
      <button onClick={() => onSave(section)} disabled={saving === section}
        className="bg-forest-800 hover:bg-forest-700 text-white text-sm font-semibold px-6 py-3 transition-colors disabled:opacity-50 flex items-center gap-2 rounded-sm">
        {saving === section && <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>}
        {saving === section ? 'Đang lưu...' : 'Lưu thay đổi'}
      </button>
      {saved === section && (
        <span className="text-sm text-green-600 flex items-center gap-1 font-semibold">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
          Đã lưu thành công
        </span>
      )}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────
export default function AdminBlog() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('blog');
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Blog state
  const [posts, setPosts] = useState([]);
  const [blogMode, setBlogMode] = useState('list');
  const [editPost, setEditPost] = useState(null);
  const [blogForm, setBlogForm] = useState(EMPTY_BLOG);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [blogError, setBlogError] = useState('');
  const fileRef = useRef();

  // Contacts state
  const [contacts, setContacts] = useState([]);
  const [expandedContactId, setExpandedContactId] = useState(null);

  // Bookings state
  const [bookings, setBookings] = useState([]);
  const [bookingFilter, setBookingFilter] = useState('all');

  // Content state
  const [formData, setFormData] = useState({});
  const [contentSaving, setContentSaving] = useState(null);
  const [contentSaved, setContentSaved] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem('admin_token')) { navigate('/admin/login'); return; }
    loadAll();
  }, []);

  const loadAll = async () => {
    setLoading(true);
    try {
      const h = { headers: authHeaders() };
      const [p, c, b, cnt] = await Promise.all([
        axios.get('/api/admin/blog', h),
        axios.get('/api/admin/contacts', h),
        axios.get('/api/admin/bookings', h),
        axios.get('/api/admin/content', h),
      ]);
      setPosts(p.data);
      setContacts(c.data);
      setBookings(b.data);
      setFormData(initFormData(cnt.data));
    } catch (err) {
      if (err.response?.status === 401) navigate('/admin/login');
    } finally { setLoading(false); }
  };

  // ── Blog handlers ──────────────────────────────────────
  const openCreate = () => { setEditPost(null); setBlogForm(EMPTY_BLOG); setImageFile(null); setImagePreview(''); setBlogError(''); setBlogMode('form'); window.scrollTo(0,0); };
  const openEdit = (post) => { setEditPost(post); setBlogForm({ title: post.title, slug: post.slug, excerpt: post.excerpt||'', content: post.content||'', category: post.category||'Tin tức', author: post.author||'Trosie Garden' }); setImageFile(null); setImagePreview(post.image||''); setBlogError(''); setBlogMode('form'); window.scrollTo(0,0); };
  const handleTitleChange = (e) => { const title = e.target.value; setBlogForm(f => ({ ...f, title, ...(!editPost && { slug: slugify(title) }) })); };
  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    if (!blogForm.title.trim()) { setBlogError('Vui lòng nhập tiêu đề'); return; }
    if (!editPost && !imageFile) { setBlogError('Vui lòng chọn ảnh bìa'); return; }
    setSaving(true); setBlogError('');
    try {
      const fd = new FormData();
      Object.entries(blogForm).forEach(([k,v]) => fd.append(k,v));
      if (imageFile) fd.append('image', imageFile);
      const h = { headers: { ...authHeaders(), 'Content-Type': 'multipart/form-data' } };
      if (editPost) await axios.put(`/api/admin/blog/${editPost.id}`, fd, h);
      else await axios.post('/api/admin/blog', fd, h);
      const { data } = await axios.get('/api/admin/blog', { headers: authHeaders() });
      setPosts(data); setBlogMode('list');
    } catch (err) { setBlogError(err.response?.data?.error || 'Có lỗi xảy ra. Kiểm tra lại cấu hình Cloudinary.'); }
    finally { setSaving(false); }
  };

  // ── Contact handlers ───────────────────────────────────
  const toggleContact = async (c) => {
    if (expandedContactId === c.id) { setExpandedContactId(null); return; }
    setExpandedContactId(c.id);
    if (!c.is_read) {
      try {
        await axios.patch(`/api/admin/contacts/${c.id}/read`, {}, { headers: authHeaders() });
        setContacts(cs => cs.map(x => x.id === c.id ? { ...x, is_read: 1 } : x));
      } catch {}
    }
  };

  // ── Booking handlers ───────────────────────────────────
  const updateBookingStatus = async (id, status) => {
    try {
      await axios.patch(`/api/admin/bookings/${id}/status`, { status }, { headers: authHeaders() });
      setBookings(bs => bs.map(b => b.id === id ? { ...b, status } : b));
    } catch { alert('Không thể cập nhật trạng thái'); }
  };

  // ── Delete handler ─────────────────────────────────────
  const handleDelete = async () => {
    const { type, id } = deleteTarget;
    const url = { blog: 'blog', contact: 'contacts', booking: 'bookings' }[type];
    try {
      await axios.delete(`/api/admin/${url}/${id}`, { headers: authHeaders() });
      if (type === 'blog') setPosts(p => p.filter(x => x.id !== id));
      if (type === 'contact') setContacts(c => c.filter(x => x.id !== id));
      if (type === 'booking') setBookings(b => b.filter(x => x.id !== id));
      setDeleteTarget(null);
    } catch { alert('Không thể xóa'); }
  };

  // ── Content save ───────────────────────────────────────
  const saveContent = async (section) => {
    setContentSaving(section);
    try {
      await Promise.all(buildSaves(section, formData[section]));
      setContentSaved(section);
      setTimeout(() => setContentSaved(null), 2500);
    } catch { alert('Không thể lưu nội dung'); }
    finally { setContentSaving(null); }
  };

  const setField = (section, key, val) => setFormData(fd => ({ ...fd, [section]: { ...fd[section], [key]: val } }));
  const setArrItem = (section, arrKey, idx, field, val) => {
    const arr = [...(formData[section]?.[arrKey] || [])];
    arr[idx] = { ...arr[idx], [field]: val };
    setField(section, arrKey, arr);
  };
  const addArrItem = (section, arrKey, template) => setField(section, arrKey, [...(formData[section]?.[arrKey] || []), { ...template }]);
  const removeArrItem = (section, arrKey, idx) => {
    const arr = (formData[section]?.[arrKey] || []).filter((_,i) => i !== idx);
    setField(section, arrKey, arr);
  };

  const logout = () => { localStorage.removeItem('admin_token'); navigate('/admin/login'); };

  // ── Derived ────────────────────────────────────────────
  const unreadContacts = contacts.filter(c => !c.is_read).length;
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const filteredBookings = bookingFilter === 'all' ? bookings : bookings.filter(b => b.status === bookingFilter);

  const switchSection = (key) => { setActiveSection(key); setBlogMode('list'); setMobileMenuOpen(false); window.scrollTo(0,0); };
  const currentItem = NAV_ITEMS.find(n => n.key === activeSection);

  // ── Sidebar ────────────────────────────────────────────
  const Sidebar = () => (
    <nav className="flex flex-col py-4 px-3 gap-1">
      <p className="text-[9px] font-bold tracking-widest uppercase text-gray-400 px-3 pt-1 pb-2">Quản Lý</p>
      {NAV_ITEMS.filter(n => n.group === 'manage').map(n => {
        const badge = n.key === 'contacts' ? unreadContacts : n.key === 'bookings' ? pendingBookings : 0;
        return (
          <button key={n.key} onClick={() => switchSection(n.key)}
            className={`w-full text-left flex items-center gap-2.5 px-3 py-2.5 text-sm font-semibold rounded-md transition-colors relative ${activeSection === n.key ? 'bg-forest-800 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
            <span className="text-base leading-none">{n.icon}</span>
            {n.label}
            {badge > 0 && <span className="ml-auto min-w-[18px] h-[18px] bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-1">{badge}</span>}
          </button>
        );
      })}
      <p className="text-[9px] font-bold tracking-widest uppercase text-gray-400 px-3 pt-4 pb-2">Nội Dung Trang</p>
      {NAV_ITEMS.filter(n => n.group === 'content').map(n => (
        <button key={n.key} onClick={() => switchSection(n.key)}
          className={`w-full text-left flex items-center gap-2.5 px-3 py-2.5 text-sm font-semibold rounded-md transition-colors ${activeSection === n.key ? 'bg-forest-800 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
          <span className="text-base leading-none">{n.icon}</span>
          {n.label}
        </button>
      ))}
    </nav>
  );

  // ── Content section renders ────────────────────────────
  const fd = formData;

  const renderGeneral = () => (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Hotline 1"><input className={iCls} value={fd.general?.phone1||''} onChange={e => setField('general','phone1',e.target.value)} /></Field>
        <Field label="Hotline 2"><input className={iCls} value={fd.general?.phone2||''} onChange={e => setField('general','phone2',e.target.value)} /></Field>
      </div>
      <Field label="Email"><input className={iCls} type="email" value={fd.general?.email||''} onChange={e => setField('general','email',e.target.value)} /></Field>
      <Field label="Địa chỉ" hint="Hiển thị ở Footer và trang Liên Hệ">
        <textarea rows={3} className={taCls} value={fd.general?.address||''} onChange={e => setField('general','address',e.target.value)} />
      </Field>
      <Field label="Giờ mở cửa" hint="Hiển thị ở Footer">
        <input className={iCls} value={fd.general?.hours||''} onChange={e => setField('general','hours',e.target.value)} />
      </Field>
      <SaveBar section="general" saving={contentSaving} saved={contentSaved} onSave={saveContent} />
    </div>
  );

  const renderHome = () => (
    <div className="space-y-6">
      <Field label="Mô tả giới thiệu" hint="Đoạn văn phần 'Về Chúng Tôi' ở trang chủ">
        <textarea rows={4} className={taCls} value={fd.home?.introDesc||''} onChange={e => setField('home','introDesc',e.target.value)} />
      </Field>
      <div>
        <label className="text-[11px] font-bold tracking-widest uppercase text-gray-500 mb-3 block">Đánh giá khách hàng</label>
        <div className="space-y-4">
          {(fd.home?.reviews||[]).map((r,i) => (
            <div key={i} className="bg-gray-50 rounded-md p-4 space-y-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-gray-500">Đánh giá {i+1}</span>
                {(fd.home?.reviews||[]).length > 1 && (
                  <button onClick={() => removeArrItem('home','reviews',i)} className="text-xs text-red-400 hover:text-red-600">Xóa</button>
                )}
              </div>
              <textarea rows={3} className={taCls} placeholder="Nội dung đánh giá..." value={r.text||''} onChange={e => setArrItem('home','reviews',i,'text',e.target.value)} />
              <div className="grid grid-cols-2 gap-3">
                <input className={iCls} placeholder="Tên khách" value={r.name||''} onChange={e => setArrItem('home','reviews',i,'name',e.target.value)} />
                <input className={iCls} placeholder="Từ (Hà Nội...)" value={r.from||''} onChange={e => setArrItem('home','reviews',i,'from',e.target.value)} />
              </div>
            </div>
          ))}
          <button onClick={() => addArrItem('home','reviews',{text:'',name:'',from:''})}
            className="w-full border-2 border-dashed border-gray-200 hover:border-forest-700 py-3 text-sm text-gray-500 hover:text-forest-700 transition-colors rounded-sm">
            + Thêm đánh giá
          </button>
        </div>
      </div>
      <SaveBar section="home" saving={contentSaving} saved={contentSaved} onSave={saveContent} />
    </div>
  );

  const renderAbout = () => (
    <div className="space-y-5">
      <Field label="Đoạn mở đầu (Trosie bắt đầu từ...)">
        <textarea rows={2} className={taCls} value={fd.about?.storyP1||''} onChange={e => setField('about','storyP1',e.target.value)} />
      </Field>
      <Field label="Câu nổi bật (in đậm)">
        <input className={iCls} value={fd.about?.storyBold||''} onChange={e => setField('about','storyBold',e.target.value)} />
      </Field>
      <Field label="Đoạn 2 (Không quá thương mại...)">
        <textarea rows={2} className={taCls} value={fd.about?.storyP2||''} onChange={e => setField('about','storyP2',e.target.value)} />
      </Field>
      <Field label="Đoạn 3 (Từ một khu đất nhỏ...)">
        <textarea rows={3} className={taCls} value={fd.about?.storyP3||''} onChange={e => setField('about','storyP3',e.target.value)} />
      </Field>
      <Field label="Đoạn 4 (Khe Sanh có khí hậu...)">
        <textarea rows={3} className={taCls} value={fd.about?.storyP4||''} onChange={e => setField('about','storyP4',e.target.value)} />
      </Field>
      <div>
        <label className="text-[11px] font-bold tracking-widest uppercase text-gray-500 mb-3 block">Giá trị cốt lõi</label>
        <div className="space-y-3">
          {(fd.about?.values||[]).map((v,i) => (
            <div key={i} className="bg-gray-50 rounded-md p-4 space-y-3">
              <span className="text-xs font-bold text-gray-500">Giá trị {i+1}</span>
              <input className={iCls} placeholder="Tên giá trị" value={v.label||''} onChange={e => setArrItem('about','values',i,'label',e.target.value)} />
              <textarea rows={2} className={taCls} placeholder="Mô tả" value={v.desc||''} onChange={e => setArrItem('about','values',i,'desc',e.target.value)} />
            </div>
          ))}
        </div>
      </div>
      <SaveBar section="about" saving={contentSaving} saved={contentSaved} onSave={saveContent} />
    </div>
  );

  const renderLuutru = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-4 pb-2 border-b border-gray-100">🏠 Homestay — 5 phòng</h3>
        <div className="space-y-4">
          {(fd.luutru?.rooms||[]).map((r,i) => (
            <div key={i} className="bg-gray-50 rounded-md p-4 space-y-3">
              <span className="text-xs font-bold text-gray-500">Phòng {i+1}</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Tên phòng"><input className={iCls} value={r.name||''} onChange={e => setArrItem('luutru','rooms',i,'name',e.target.value)} /></Field>
                <Field label="Sức chứa"><input className={iCls} placeholder="2 người lớn · 2 trẻ em" value={r.capacity||''} onChange={e => setArrItem('luutru','rooms',i,'capacity',e.target.value)} /></Field>
              </div>
              <Field label="Mô tả"><textarea rows={2} className={taCls} value={r.desc||''} onChange={e => setArrItem('luutru','rooms',i,'desc',e.target.value)} /></Field>
              <Field label="Giá"><input className={iCls} placeholder="800.000đ / đêm" value={r.price||''} onChange={e => setArrItem('luutru','rooms',i,'price',e.target.value)} /></Field>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-4 pb-2 border-b border-gray-100">⛺ Cắm Trại</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Giá"><input className={iCls} placeholder="600.000đ" value={fd.luutru?.campingPrice||''} onChange={e => setField('luutru','campingPrice',e.target.value)} /></Field>
          <Field label="Đơn vị"><input className={iCls} placeholder="/ lều / đêm" value={fd.luutru?.campingPriceUnit||''} onChange={e => setField('luutru','campingPriceUnit',e.target.value)} /></Field>
          <Field label="Sức chứa"><input className={iCls} placeholder="Phù hợp 2–4 người" value={fd.luutru?.campingCapacity||''} onChange={e => setField('luutru','campingCapacity',e.target.value)} /></Field>
        </div>
      </div>
      <SaveBar section="luutru" saving={contentSaving} saved={contentSaved} onSave={saveContent} />
    </div>
  );

  const renderRestaurant = () => (
    <div className="space-y-6">
      <Field label="Mô tả giới thiệu">
        <textarea rows={4} className={taCls} value={fd.restaurant?.introDesc||''} onChange={e => setField('restaurant','introDesc',e.target.value)} />
      </Field>
      <Field label="Mô tả không gian">
        <textarea rows={3} className={taCls} value={fd.restaurant?.spaceDesc||''} onChange={e => setField('restaurant','spaceDesc',e.target.value)} />
      </Field>
      <div>
        <label className="text-[11px] font-bold tracking-widest uppercase text-gray-500 mb-3 block">Điểm nổi bật (3 mục)</label>
        <div className="space-y-3">
          {(fd.restaurant?.highlights||[]).map((h,i) => (
            <div key={i} className="bg-gray-50 rounded-md p-4 space-y-3">
              <span className="text-xs font-bold text-gray-500">Mục {i+1}</span>
              <input className={iCls} placeholder="Tiêu đề" value={h.label||''} onChange={e => setArrItem('restaurant','highlights',i,'label',e.target.value)} />
              <textarea rows={2} className={taCls} placeholder="Mô tả" value={h.desc||''} onChange={e => setArrItem('restaurant','highlights',i,'desc',e.target.value)} />
            </div>
          ))}
        </div>
      </div>
      <SaveBar section="restaurant" saving={contentSaving} saved={contentSaved} onSave={saveContent} />
    </div>
  );

  const renderSUP = () => (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Field label="Giá"><input className={iCls} placeholder="200.000đ" value={fd.sup?.price||''} onChange={e => setField('sup','price',e.target.value)} /></Field>
        <Field label="Đơn vị"><input className={iCls} placeholder="/ ván / 2 người" value={fd.sup?.priceUnit||''} onChange={e => setField('sup','priceUnit',e.target.value)} /></Field>
        <Field label="Ghi chú giá"><input className={iCls} placeholder="Thời gian không giới hạn" value={fd.sup?.priceNote||''} onChange={e => setField('sup','priceNote',e.target.value)} /></Field>
      </div>
      <SaveBar section="sup" saving={contentSaving} saved={contentSaved} onSave={saveContent} />
    </div>
  );

  const renderRoseGarden = () => (
    <div className="space-y-5">
      <Field label="Mô tả đoạn 1">
        <textarea rows={3} className={taCls} value={fd.rosegarden?.introDesc1||''} onChange={e => setField('rosegarden','introDesc1',e.target.value)} />
      </Field>
      <Field label="Mô tả đoạn 2">
        <textarea rows={3} className={taCls} value={fd.rosegarden?.introDesc2||''} onChange={e => setField('rosegarden','introDesc2',e.target.value)} />
      </Field>
      <Field label="Thông tin mùa hoa nở">
        <textarea rows={2} className={taCls} value={fd.rosegarden?.seasonDesc||''} onChange={e => setField('rosegarden','seasonDesc',e.target.value)} />
      </Field>
      <SaveBar section="rosegarden" saving={contentSaving} saved={contentSaved} onSave={saveContent} />
    </div>
  );

  const renderActivities = () => (
    <div className="space-y-7">
      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-4 pb-2 border-b border-gray-100">🎨 Vẽ Chai Lọ</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Giá"><input className={iCls} placeholder="20.000đ / chai" value={fd.activities?.bottlePrice||''} onChange={e => setField('activities','bottlePrice',e.target.value)} /></Field>
          <Field label="Ghi chú giá"><input className={iCls} placeholder="Miễn phí cho khách lưu trú..." value={fd.activities?.bottlePriceNote||''} onChange={e => setField('activities','bottlePriceNote',e.target.value)} /></Field>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-4 pb-2 border-b border-gray-100">🌸 Ép Hoa Khô</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Giá"><input className={iCls} placeholder="300.000đ / người" value={fd.activities?.flowerPrice||''} onChange={e => setField('activities','flowerPrice',e.target.value)} /></Field>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-4 pb-2 border-b border-gray-100">📋 Các Chương Trình</h3>
        <div className="space-y-4">
          {(fd.activities?.programs||[]).map((p,i) => (
            <div key={i} className="bg-gray-50 rounded-md p-4 space-y-3">
              <span className="text-xs font-bold text-gray-500">Chương trình {i+1}</span>
              <input className={iCls} placeholder="Tên chương trình" value={p.label||''} onChange={e => setArrItem('activities','programs',i,'label',e.target.value)} />
              <textarea rows={2} className={taCls} placeholder="Mô tả" value={p.desc||''} onChange={e => setArrItem('activities','programs',i,'desc',e.target.value)} />
              <input className={iCls} placeholder="Đối tượng" value={p.target||''} onChange={e => setArrItem('activities','programs',i,'target',e.target.value)} />
            </div>
          ))}
          <button onClick={() => addArrItem('activities','programs',{label:'',desc:'',target:''})}
            className="w-full border-2 border-dashed border-gray-200 hover:border-forest-700 py-3 text-sm text-gray-500 hover:text-forest-700 transition-colors rounded-sm">
            + Thêm chương trình
          </button>
        </div>
      </div>
      <SaveBar section="activities" saving={contentSaving} saved={contentSaved} onSave={saveContent} />
    </div>
  );

  const renderCoffee = () => (
    <div className="space-y-5">
      <Field label="Mô tả giới thiệu cà phê (đoạn 1)">
        <textarea rows={3} className={taCls} value={fd.coffee?.aboutDesc1||''} onChange={e => setField('coffee','aboutDesc1',e.target.value)} />
      </Field>
      <Field label="Mô tả giới thiệu cà phê (đoạn 2)">
        <textarea rows={3} className={taCls} value={fd.coffee?.aboutDesc2||''} onChange={e => setField('coffee','aboutDesc2',e.target.value)} />
      </Field>
      <div className="bg-gold/5 border border-gold/20 rounded-md p-4 text-sm text-gray-600">
        💡 Sản phẩm cà phê (tên, giá, mô tả, ảnh) được quản lý trong database sản phẩm. Liên hệ developer để chỉnh sửa.
      </div>
      <SaveBar section="coffee" saving={contentSaving} saved={contentSaved} onSave={saveContent} />
    </div>
  );

  const renderContentSection = () => {
    const sectionMap = { general: renderGeneral, home: renderHome, about: renderAbout, luutru: renderLuutru, restaurant: renderRestaurant, sup: renderSUP, rosegarden: renderRoseGarden, activities: renderActivities, coffee: renderCoffee };
    const fn = sectionMap[activeSection];
    if (!fn) return null;
    return (
      <div className="bg-white shadow-sm rounded-sm overflow-hidden">
        <div className="border-b border-gray-100 px-5 py-4">
          <h2 className="text-base font-bold text-gray-800">{currentItem?.icon} {currentItem?.label}</h2>
          <p className="text-xs text-gray-400 mt-0.5">Thay đổi sẽ hiển thị ngay trên website sau khi lưu.</p>
        </div>
        <div className="px-5 py-6">{fn()}</div>
      </div>
    );
  };

  // ── Blog list & form renders ───────────────────────────
  const renderBlogForm = () => (
    <div className="bg-white shadow-sm rounded-sm overflow-hidden">
      <div className="border-b border-gray-100 px-4 py-4 flex items-center gap-3">
        <button onClick={() => setBlogMode('list')} className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h2 className="text-base font-bold text-gray-800">{editPost ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới'}</h2>
      </div>
      <form onSubmit={handleBlogSubmit} className="px-4 py-6 space-y-5">
        <Field label="Ảnh bìa" required={!editPost}>
          {imagePreview && <img src={imagePreview} alt="Preview" className="w-full h-44 object-cover rounded mb-3 border border-gray-100" />}
          <button type="button" onClick={() => fileRef.current.click()}
            className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 hover:border-forest-700 py-4 text-sm text-gray-500 hover:text-forest-700 transition-colors rounded-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
            {imagePreview ? 'Đổi ảnh khác' : 'Chọn ảnh từ máy'}
          </button>
          {imageFile && <p className="text-xs text-gray-400 mt-1.5 truncate">{imageFile.name}</p>}
          <p className="text-xs text-gray-400 mt-1">Tối đa 10MB · Lưu lên Cloudinary</p>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files[0]; if (f) { setImageFile(f); setImagePreview(URL.createObjectURL(f)); }}} />
        </Field>
        <Field label="Tiêu đề" required>
          <input type="text" value={blogForm.title} onChange={handleTitleChange} className={iCls} placeholder="Nhập tiêu đề bài viết..." required />
        </Field>
        <Field label="Đường dẫn URL">
          <div className="flex items-stretch border border-gray-200 focus-within:border-forest-700 transition-colors rounded-sm overflow-hidden">
            <span className="flex items-center px-3 text-xs text-gray-400 bg-gray-50 border-r border-gray-200 shrink-0">/tin-tuc/</span>
            <input type="text" value={blogForm.slug} onChange={e => setBlogForm(f => ({...f, slug: e.target.value}))} className="flex-1 px-3 py-3.5 text-sm font-mono focus:outline-none min-w-0" placeholder="duong-dan-bai-viet" />
          </div>
        </Field>
        <Field label="Mô tả ngắn">
          <textarea rows={3} value={blogForm.excerpt} onChange={e => setBlogForm(f => ({...f, excerpt: e.target.value}))} className={taCls} placeholder="Tóm tắt hiển thị ở trang danh sách blog..." />
        </Field>
        <Field label="Nội dung" hint="Viết văn bản thuần — xuống dòng để tạo đoạn mới.">
          <textarea rows={12} value={blogForm.content} onChange={e => setBlogForm(f => ({...f, content: e.target.value}))} className={taCls} placeholder="Nhập nội dung bài viết..." />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Danh mục">
            <div className="relative">
              <select value={blogForm.category} onChange={e => setBlogForm(f => ({...f, category: e.target.value}))} className={iCls + ' appearance-none pr-10 cursor-pointer'}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
              <svg className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </Field>
          <Field label="Tác giả">
            <input type="text" value={blogForm.author} onChange={e => setBlogForm(f => ({...f, author: e.target.value}))} className={iCls} placeholder="Tên tác giả" />
          </Field>
        </div>
        {blogError && (
          <div className="flex items-start gap-2 bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600 rounded-sm">
            <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {blogError}
          </div>
        )}
        <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2 border-t border-gray-50">
          <button type="button" onClick={() => setBlogMode('list')} className="w-full sm:w-auto border border-gray-200 hover:border-gray-400 text-gray-600 font-semibold px-6 py-3.5 sm:py-3 text-sm transition-colors rounded-sm">Hủy</button>
          <button type="submit" disabled={saving} className="w-full sm:flex-1 bg-forest-800 hover:bg-forest-700 text-white font-semibold px-8 py-3.5 sm:py-3 text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2 rounded-sm">
            {saving && <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>}
            {saving ? 'Đang lưu...' : editPost ? 'Lưu thay đổi' : 'Đăng bài viết'}
          </button>
        </div>
      </form>
    </div>
  );

  const renderBlogList = () => (
    <>
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-lg font-bold text-gray-800">Bài viết</h1><p className="text-xs text-gray-400 mt-0.5">{posts.length} bài</p></div>
        <button onClick={openCreate} className="hidden sm:flex items-center gap-2 bg-forest-800 hover:bg-forest-700 text-white text-sm font-semibold px-5 py-2.5 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Thêm bài viết
        </button>
      </div>
      {posts.length === 0 ? <EmptyState text="Chưa có bài viết nào" /> : (
        <>
          <div className="sm:hidden space-y-3">
            {posts.map(post => (
              <div key={post.id} className="bg-white rounded shadow-sm overflow-hidden">
                <div className="flex gap-3 p-3">
                  {post.image ? <img src={post.image} alt="" className="w-20 h-16 object-cover rounded shrink-0" /> : <div className="w-20 h-16 bg-gray-100 rounded shrink-0" />}
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-800 text-sm leading-snug line-clamp-2">{post.title}</p>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className="text-[10px] bg-gold/10 text-gold font-bold px-2 py-0.5 rounded">{post.category}</span>
                      <span className="text-[10px] text-gray-400">{fmtDate(post.published_at)}</span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-50 grid grid-cols-2 divide-x divide-gray-50">
                  <button onClick={() => openEdit(post)} className="py-3 text-sm font-semibold text-forest-700 hover:bg-gray-50 flex items-center justify-center gap-1.5">Sửa</button>
                  <button onClick={() => setDeleteTarget({type:'blog',id:post.id})} className="py-3 text-sm font-semibold text-red-500 hover:bg-red-50 flex items-center justify-center gap-1.5">Xóa</button>
                </div>
              </div>
            ))}
          </div>
          <div className="hidden sm:block bg-white shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400 w-20">Ảnh</th>
                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">Bài viết</th>
                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400 w-28">Danh mục</th>
                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400 hidden lg:table-cell w-28">Ngày đăng</th>
                  <th className="px-4 py-3 w-28"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {posts.map(post => (
                  <tr key={post.id} className="hover:bg-gray-50/60">
                    <td className="px-4 py-3">{post.image ? <img src={post.image} alt="" className="w-14 h-11 object-cover rounded" /> : <div className="w-14 h-11 bg-gray-100 rounded" />}</td>
                    <td className="px-4 py-3"><div className="font-medium text-gray-800 line-clamp-1">{post.title}</div><div className="text-xs text-gray-400 mt-0.5 font-mono">/tin-tuc/{post.slug}</div></td>
                    <td className="px-4 py-3"><span className="text-xs bg-gold/10 text-gold font-semibold px-2 py-0.5 rounded">{post.category}</span></td>
                    <td className="px-4 py-3 text-xs text-gray-400 hidden lg:table-cell">{fmtDate(post.published_at)}</td>
                    <td className="px-4 py-3"><div className="flex gap-2 justify-end">
                      <button onClick={() => openEdit(post)} className="text-xs border border-gray-200 hover:border-forest-700 hover:text-forest-700 px-3 py-1.5 transition-colors">Sửa</button>
                      <button onClick={() => setDeleteTarget({type:'blog',id:post.id})} className="text-xs border border-red-100 hover:bg-red-50 text-red-400 px-3 py-1.5 transition-colors">Xóa</button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      <button onClick={openCreate} className="sm:hidden fixed bottom-6 right-6 w-14 h-14 bg-forest-800 hover:bg-forest-700 text-white rounded-full shadow-xl flex items-center justify-center z-30 active:scale-95">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
      </button>
    </>
  );

  const renderContacts = () => (
    <>
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-lg font-bold text-gray-800">Tin nhắn liên hệ</h1>
          <p className="text-xs text-gray-400 mt-0.5">{contacts.length} tin nhắn{unreadContacts > 0 && <span className="ml-2 text-blue-500 font-semibold">· {unreadContacts} chưa đọc</span>}</p>
        </div>
      </div>
      {contacts.length === 0 ? <EmptyState text="Chưa có tin nhắn liên hệ nào" /> : (
        <div className="space-y-3">
          {contacts.map(c => (
            <div key={c.id} className="bg-white rounded shadow-sm overflow-hidden">
              <button onClick={() => toggleContact(c)} className="w-full text-left p-4 active:bg-gray-50">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5 min-w-0">
                    {!c.is_read && <span className="w-2 h-2 bg-blue-500 rounded-full shrink-0 mt-1.5" />}
                    <div className={!c.is_read ? '' : 'ml-[18px]'}>
                      <p className={`text-sm leading-snug ${!c.is_read ? 'font-bold text-gray-900' : 'font-semibold text-gray-700'}`}>{c.full_name}</p>
                      {c.subject ? <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{c.subject}</p> : <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{c.message}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] text-gray-400">{fmtDate(c.created_at)}</span>
                    <svg className={`w-4 h-4 text-gray-400 transition-transform ${expandedContactId === c.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </button>
              {expandedContactId === c.id && (
                <div className="border-t border-gray-100">
                  <div className="px-4 py-3 bg-gray-50 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-gray-600">
                    {c.phone && <a href={`tel:${c.phone}`} className="flex items-center gap-1.5 hover:text-gold transition-colors"><svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>{c.phone}</a>}
                    <a href={`mailto:${c.email}`} className="flex items-center gap-1.5 hover:text-gold transition-colors"><svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>{c.email}</a>
                  </div>
                  <div className="px-4 py-4"><p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{c.message}</p></div>
                  <div className={`border-t border-gray-100 grid divide-x divide-gray-100 ${!c.is_read ? 'grid-cols-2' : 'grid-cols-1'}`}>
                    {!c.is_read && (
                      <button onClick={async () => { await axios.patch(`/api/admin/contacts/${c.id}/read`,{},{headers:authHeaders()}); setContacts(cs=>cs.map(x=>x.id===c.id?{...x,is_read:1}:x)); }}
                        className="py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50 flex items-center justify-center gap-1.5 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Đánh dấu đã đọc
                      </button>
                    )}
                    <button onClick={() => setDeleteTarget({type:'contact',id:c.id})} className="py-3 text-sm font-semibold text-red-500 hover:bg-red-50 flex items-center justify-center gap-1.5 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>Xóa
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );

  const renderBookings = () => (
    <>
      <div className="flex items-center justify-between mb-4">
        <div><h1 className="text-lg font-bold text-gray-800">Đơn đặt phòng</h1>
          <p className="text-xs text-gray-400 mt-0.5">{bookings.length} đơn{pendingBookings>0&&<span className="ml-2 text-amber-600 font-semibold">· {pendingBookings} chờ xác nhận</span>}</p>
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 -mx-1 px-1">
        {[['all','Tất cả',bookings.length],['pending','Chờ xác nhận',bookings.filter(b=>b.status==='pending').length],['confirmed','Đã xác nhận',bookings.filter(b=>b.status==='confirmed').length],['cancelled','Đã hủy',bookings.filter(b=>b.status==='cancelled').length]].map(([val,label,cnt])=>(
          <button key={val} onClick={()=>setBookingFilter(val)} className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${bookingFilter===val?'bg-forest-800 text-white border-forest-800':'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}>
            {label}{cnt>0&&<span className={`ml-1 ${bookingFilter===val?'opacity-70':'text-gray-400'}`}>({cnt})</span>}
          </button>
        ))}
      </div>
      {filteredBookings.length===0?<EmptyState text="Không có đơn đặt phòng nào"/>:(
        <div className="space-y-3">
          {filteredBookings.map(b=>{
            const st=STATUS[b.status]||STATUS.pending;
            return (
              <div key={b.id} className="bg-white rounded shadow-sm overflow-hidden">
                <div className="flex items-start justify-between gap-3 p-4 pb-3">
                  <div><p className="font-bold text-gray-800 text-sm">{b.full_name}</p><p className="text-xs text-gray-500 mt-0.5">{fmtDate(b.created_at)}</p></div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border shrink-0 ${st.cls}`}>{st.label}</span>
                </div>
                <div className="px-4 pb-3 space-y-1.5 text-xs text-gray-600">
                  {b.phone&&<a href={`tel:${b.phone}`} className="flex items-center gap-2 hover:text-gold transition-colors"><svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>{b.phone}</a>}
                  {(b.room_name||b.guests)&&<div className="flex items-center gap-2"><svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>{b.room_name||'Chưa chọn phòng'}{b.guests&&<span className="text-gray-400">· {b.guests} người</span>}</div>}
                  {(b.check_in||b.check_out)&&<div className="flex items-center gap-2"><svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>{fmtDate(b.check_in)} → {fmtDate(b.check_out)}{calcNights(b.check_in,b.check_out)&&<span className="text-gray-400 ml-1">({calcNights(b.check_in,b.check_out)})</span>}</div>}
                  {b.special_requests&&<div className="flex items-start gap-2 mt-1"><svg className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/></svg><span className="text-gray-500 italic">{b.special_requests}</span></div>}
                </div>
                <div className="border-t border-gray-50 flex divide-x divide-gray-50">
                  {b.status==='pending'&&<button onClick={()=>updateBookingStatus(b.id,'confirmed')} className="flex-1 py-3 text-xs font-bold text-green-600 hover:bg-green-50 flex items-center justify-center gap-1 transition-colors"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>Xác nhận</button>}
                  {(b.status==='pending'||b.status==='confirmed')&&<button onClick={()=>updateBookingStatus(b.id,'cancelled')} className="flex-1 py-3 text-xs font-bold text-red-500 hover:bg-red-50 flex items-center justify-center gap-1 transition-colors"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>Hủy đặt</button>}
                  {b.status==='cancelled'&&<button onClick={()=>updateBookingStatus(b.id,'pending')} className="flex-1 py-3 text-xs font-bold text-amber-600 hover:bg-amber-50 flex items-center justify-center gap-1 transition-colors"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>Khôi phục</button>}
                  <button onClick={()=>setDeleteTarget({type:'booking',id:b.id})} className="px-4 py-3 text-xs font-bold text-gray-400 hover:bg-gray-50 hover:text-red-400 flex items-center justify-center transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );

  // ── Main render ────────────────────────────────────────
  const isContentSection = !['blog','contacts','bookings'].includes(activeSection);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Header */}
      <header className="bg-forest-900 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-lg">
        <div className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Trosie" className="h-7" />
          <span className="text-sm font-semibold">Admin</span>
        </div>
        <div className="flex items-center gap-2">
          <a href="/" target="_blank" className="hidden sm:flex items-center gap-1 text-xs text-gray-300 hover:text-gold transition-colors px-3 py-2">
            Xem web <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
          </a>
          <button onClick={logout} className="flex items-center gap-1.5 text-xs bg-forest-700 hover:bg-red-700 px-3 py-2 transition-colors rounded-sm">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            <span className="hidden sm:inline">Đăng xuất</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">

        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-56 bg-white border-r border-gray-200 shrink-0 sticky top-[52px] h-[calc(100vh-52px)] overflow-y-auto">
          <Sidebar />
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0 px-4 py-6 max-w-3xl lg:max-w-none xl:max-w-3xl mx-auto lg:mx-0 lg:px-6">

          {/* Mobile section selector */}
          <div className="lg:hidden mb-5">
            <div className="relative">
              <button onClick={() => setMobileMenuOpen(o => !o)}
                className="w-full flex items-center justify-between bg-white border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 rounded-sm shadow-sm">
                <span className="flex items-center gap-2"><span>{currentItem?.icon}</span>{currentItem?.label}</span>
                <svg className={`w-4 h-4 text-gray-400 transition-transform ${mobileMenuOpen?'rotate-180':''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
              </button>
              {mobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-sm shadow-xl z-30 max-h-80 overflow-y-auto">
                  <Sidebar />
                </div>
              )}
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <svg className="w-7 h-7 animate-spin text-gray-300" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
              <span className="text-sm text-gray-400">Đang tải...</span>
            </div>
          ) : activeSection === 'blog' && blogMode === 'form' ? renderBlogForm()
            : activeSection === 'blog' ? renderBlogList()
            : activeSection === 'contacts' ? renderContacts()
            : activeSection === 'bookings' ? renderBookings()
            : isContentSection ? renderContentSection()
            : null}
        </main>
      </div>

      {/* Delete modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-50 px-4 pb-4 sm:pb-0">
          <div className="bg-white w-full max-w-sm shadow-2xl rounded-t-2xl sm:rounded-sm overflow-hidden">
            <div className="px-6 pt-6 pb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </div>
                <h3 className="font-bold text-gray-800">Xác nhận xóa</h3>
              </div>
              <p className="text-sm text-gray-500">Hành động này không thể hoàn tác.</p>
            </div>
            <div className="flex flex-col-reverse sm:flex-row gap-3 px-6 pb-6">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 border border-gray-200 hover:border-gray-400 text-gray-600 font-semibold py-3 text-sm transition-colors rounded-sm">Hủy</button>
              <button onClick={handleDelete} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 text-sm transition-colors rounded-sm">Xóa</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
