import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = ['Khám phá', 'Hướng dẫn', 'Ẩm thực', 'Hoạt động', 'Lifestyle', 'Tin tức'];
const EMPTY_FORM = { title: '', slug: '', excerpt: '', content: '', category: 'Tin tức', author: 'Trosie Garden' };
const STATUS = {
  pending:   { label: 'Chờ xác nhận', cls: 'bg-amber-50 text-amber-700 border-amber-200' },
  confirmed: { label: 'Đã xác nhận',  cls: 'bg-green-50 text-green-700 border-green-200' },
  cancelled: { label: 'Đã hủy',       cls: 'bg-gray-100 text-gray-500 border-gray-200' },
};

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

function EmptyState({ text }) {
  return (
    <div className="text-center py-16 bg-white rounded shadow-sm">
      <p className="text-gray-400 text-sm">{text}</p>
    </div>
  );
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

const iCls = 'w-full border border-gray-200 px-4 py-3.5 text-base focus:outline-none focus:border-forest-700 transition-colors rounded-sm';

export default function AdminBlog() {
  const navigate = useNavigate();

  // ── shared ────────────────────────────────────────
  const [activeTab, setActiveTab] = useState('blog');
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null); // { type, id }

  // ── blog ─────────────────────────────────────────
  const [posts, setPosts] = useState([]);
  const [blogMode, setBlogMode] = useState('list');
  const [editPost, setEditPost] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [blogError, setBlogError] = useState('');
  const fileRef = useRef();

  // ── contacts ─────────────────────────────────────
  const [contacts, setContacts] = useState([]);
  const [expandedContactId, setExpandedContactId] = useState(null);

  // ── bookings ─────────────────────────────────────
  const [bookings, setBookings] = useState([]);
  const [bookingFilter, setBookingFilter] = useState('all');

  useEffect(() => {
    if (!localStorage.getItem('admin_token')) { navigate('/admin/login'); return; }
    loadAll();
  }, []);

  const loadAll = async () => {
    setLoading(true);
    try {
      const h = { headers: authHeaders() };
      const [p, c, b] = await Promise.all([
        axios.get('/api/admin/blog', h),
        axios.get('/api/admin/contacts', h),
        axios.get('/api/admin/bookings', h),
      ]);
      setPosts(p.data);
      setContacts(c.data);
      setBookings(b.data);
    } catch (err) {
      if (err.response?.status === 401) navigate('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  // ── blog handlers ─────────────────────────────────
  const openCreate = () => {
    setEditPost(null); setForm(EMPTY_FORM); setImageFile(null);
    setImagePreview(''); setBlogError(''); setBlogMode('form');
    window.scrollTo(0, 0);
  };
  const openEdit = (post) => {
    setEditPost(post);
    setForm({ title: post.title, slug: post.slug, excerpt: post.excerpt||'',
      content: post.content||'', category: post.category||'Tin tức', author: post.author||'Trosie Garden' });
    setImageFile(null); setImagePreview(post.image||'');
    setBlogError(''); setBlogMode('form'); window.scrollTo(0, 0);
  };
  const handleTitleChange = (e) => {
    const title = e.target.value;
    setForm(f => ({ ...f, title, ...(!editPost && { slug: slugify(title) }) }));
  };
  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { setBlogError('Vui lòng nhập tiêu đề'); return; }
    if (!editPost && !imageFile) { setBlogError('Vui lòng chọn ảnh bìa'); return; }
    setSaving(true); setBlogError('');
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (imageFile) fd.append('image', imageFile);
      const h = { headers: { ...authHeaders(), 'Content-Type': 'multipart/form-data' } };
      if (editPost) await axios.put(`/api/admin/blog/${editPost.id}`, fd, h);
      else await axios.post('/api/admin/blog', fd, h);
      const { data } = await axios.get('/api/admin/blog', { headers: authHeaders() });
      setPosts(data); setBlogMode('list');
    } catch (err) {
      setBlogError(err.response?.data?.error || 'Có lỗi xảy ra. Kiểm tra lại cấu hình Cloudinary.');
    } finally { setSaving(false); }
  };

  // ── contact handlers ──────────────────────────────
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

  // ── booking handlers ──────────────────────────────
  const updateBookingStatus = async (id, status) => {
    try {
      await axios.patch(`/api/admin/bookings/${id}/status`, { status }, { headers: authHeaders() });
      setBookings(bs => bs.map(b => b.id === id ? { ...b, status } : b));
    } catch { alert('Không thể cập nhật trạng thái'); }
  };

  // ── shared delete ─────────────────────────────────
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

  const logout = () => { localStorage.removeItem('admin_token'); navigate('/admin/login'); };

  // ── derived counts ────────────────────────────────
  const unreadContacts = contacts.filter(c => !c.is_read).length;
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const filteredBookings = bookingFilter === 'all' ? bookings : bookings.filter(b => b.status === bookingFilter);

  // ── tab config ────────────────────────────────────
  const TABS = [
    { key: 'blog',     label: 'Blog',      count: posts.length,    badge: 0 },
    { key: 'contacts', label: 'Liên hệ',   count: contacts.length, badge: unreadContacts },
    { key: 'bookings', label: 'Đặt phòng', count: bookings.length, badge: pendingBookings },
  ];

  const switchTab = (key) => { setActiveTab(key); setBlogMode('list'); window.scrollTo(0, 0); };

  // ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Header ─────────────────────────────────── */}
      <header className="bg-forest-900 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-lg">
        <div className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Trosie" className="h-7 brightness-0 invert" />
          <span className="text-sm font-semibold">Admin</span>
        </div>
        <div className="flex items-center gap-2">
          <a href="/" target="_blank"
            className="hidden sm:flex items-center gap-1 text-xs text-gray-300 hover:text-gold transition-colors px-3 py-2">
            Xem web
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <button onClick={logout}
            className="flex items-center gap-1.5 text-xs bg-forest-700 hover:bg-red-700 px-3 py-2 transition-colors rounded-sm">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="hidden sm:inline">Đăng xuất</span>
          </button>
        </div>
      </header>

      {/* ── Tab bar ─────────────────────────────────── */}
      {blogMode === 'list' && (
        <div className="flex bg-white border-b border-gray-200 sticky top-[52px] z-30">
          {TABS.map(tab => (
            <button key={tab.key} onClick={() => switchTab(tab.key)}
              className={`flex-1 relative py-3 text-xs sm:text-sm font-semibold transition-colors ${
                activeTab === tab.key
                  ? 'text-forest-800 border-b-2 border-forest-800'
                  : 'text-gray-500 hover:text-gray-700'
              }`}>
              {tab.label}
              {tab.count > 0 && (
                <span className="ml-1 text-[10px] text-gray-400 hidden sm:inline">({tab.count})</span>
              )}
              {tab.badge > 0 && (
                <span className="absolute top-2 right-[8%] min-w-[16px] h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* ── Main ────────────────────────────────────── */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <svg className="w-7 h-7 animate-spin text-gray-300" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            <span className="text-sm text-gray-400">Đang tải...</span>
          </div>
        ) : blogMode === 'form' ? (

          /* ══ BLOG FORM ══════════════════════════════════ */
          <div className="bg-white shadow-sm rounded-sm overflow-hidden">
            <div className="border-b border-gray-100 px-4 py-4 flex items-center gap-3">
              <button onClick={() => setBlogMode('list')}
                className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h2 className="text-base font-bold text-gray-800">
                {editPost ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới'}
              </h2>
            </div>
            <form onSubmit={handleBlogSubmit} className="px-4 py-6 space-y-5">
              <Field label="Ảnh bìa" required={!editPost}>
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" className="w-full h-44 object-cover rounded mb-3 border border-gray-100" />
                )}
                <button type="button" onClick={() => fileRef.current.click()}
                  className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 hover:border-forest-700 py-4 text-sm text-gray-500 hover:text-forest-700 transition-colors rounded-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  {imagePreview ? 'Đổi ảnh khác' : 'Chọn ảnh từ máy / thư viện'}
                </button>
                {imageFile && <p className="text-xs text-gray-400 mt-1.5 truncate">{imageFile.name}</p>}
                <p className="text-xs text-gray-400 mt-1">Tối đa 10MB · Ảnh lưu lên Cloudinary</p>
                <input ref={fileRef} type="file" accept="image/*" className="hidden"
                  onChange={e => { const f = e.target.files[0]; if (f) { setImageFile(f); setImagePreview(URL.createObjectURL(f)); } }} />
              </Field>

              <Field label="Tiêu đề" required>
                <input type="text" value={form.title} onChange={handleTitleChange}
                  className={iCls} placeholder="Nhập tiêu đề bài viết..." required />
              </Field>

              <Field label="Đường dẫn URL">
                <div className="flex items-stretch border border-gray-200 focus-within:border-forest-700 transition-colors rounded-sm overflow-hidden">
                  <span className="flex items-center px-3 text-xs text-gray-400 bg-gray-50 border-r border-gray-200 shrink-0">/tin-tuc/</span>
                  <input type="text" value={form.slug}
                    onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                    className="flex-1 px-3 py-3.5 text-sm font-mono focus:outline-none min-w-0"
                    placeholder="duong-dan-bai-viet" />
                </div>
              </Field>

              <Field label="Mô tả ngắn">
                <textarea rows={3} value={form.excerpt}
                  onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
                  className={iCls + ' resize-none'} placeholder="Tóm tắt hiển thị ở trang danh sách blog..." />
              </Field>

              <Field label="Nội dung" hint="Viết văn bản thuần — xuống dòng để tạo đoạn mới.">
                <textarea rows={12} value={form.content}
                  onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                  className={iCls + ' leading-relaxed'} placeholder="Nhập nội dung bài viết..." />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Danh mục">
                  <div className="relative">
                    <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                      className={iCls + ' appearance-none pr-10 cursor-pointer'}>
                      {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                    <svg className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </Field>
                <Field label="Tác giả">
                  <input type="text" value={form.author}
                    onChange={e => setForm(f => ({ ...f, author: e.target.value }))}
                    className={iCls} placeholder="Tên tác giả" />
                </Field>
              </div>

              {blogError && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600 rounded-sm">
                  <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {blogError}
                </div>
              )}

              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2 border-t border-gray-50">
                <button type="button" onClick={() => setBlogMode('list')}
                  className="w-full sm:w-auto border border-gray-200 hover:border-gray-400 text-gray-600 font-semibold px-6 py-3.5 sm:py-3 text-sm transition-colors rounded-sm">
                  Hủy
                </button>
                <button type="submit" disabled={saving}
                  className="w-full sm:flex-1 bg-forest-800 hover:bg-forest-700 text-white font-semibold px-8 py-3.5 sm:py-3 text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2 rounded-sm">
                  {saving && <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>}
                  {saving ? 'Đang lưu...' : editPost ? 'Lưu thay đổi' : 'Đăng bài viết'}
                </button>
              </div>
            </form>
          </div>

        ) : activeTab === 'blog' ? (

          /* ══ BLOG LIST ══════════════════════════════════ */
          <>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h1 className="text-lg font-bold text-gray-800">Bài viết</h1>
                <p className="text-xs text-gray-400 mt-0.5">{posts.length} bài</p>
              </div>
              <button onClick={openCreate}
                className="hidden sm:flex items-center gap-2 bg-forest-800 hover:bg-forest-700 text-white text-sm font-semibold px-5 py-2.5 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Thêm bài viết
              </button>
            </div>

            {posts.length === 0 ? <EmptyState text="Chưa có bài viết nào" /> : (
              <>
                {/* Mobile cards */}
                <div className="sm:hidden space-y-3">
                  {posts.map(post => (
                    <div key={post.id} className="bg-white rounded shadow-sm overflow-hidden">
                      <div className="flex gap-3 p-3">
                        {post.image
                          ? <img src={post.image} alt="" className="w-20 h-16 object-cover rounded shrink-0" />
                          : <div className="w-20 h-16 bg-gray-100 rounded shrink-0" />}
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-gray-800 text-sm leading-snug line-clamp-2">{post.title}</p>
                          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                            <span className="text-[10px] bg-gold/10 text-gold font-bold px-2 py-0.5 rounded">{post.category}</span>
                            <span className="text-[10px] text-gray-400">{fmtDate(post.published_at)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="border-t border-gray-50 grid grid-cols-2 divide-x divide-gray-50">
                        <button onClick={() => openEdit(post)}
                          className="py-3 text-sm font-semibold text-forest-700 hover:bg-gray-50 flex items-center justify-center gap-1.5 active:bg-gray-100">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Sửa
                        </button>
                        <button onClick={() => setDeleteTarget({ type: 'blog', id: post.id })}
                          className="py-3 text-sm font-semibold text-red-500 hover:bg-red-50 flex items-center justify-center gap-1.5 active:bg-red-100">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Xóa
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop table */}
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
                          <td className="px-4 py-3">
                            {post.image ? <img src={post.image} alt="" className="w-14 h-11 object-cover rounded" /> : <div className="w-14 h-11 bg-gray-100 rounded" />}
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-medium text-gray-800 line-clamp-1">{post.title}</div>
                            <div className="text-xs text-gray-400 mt-0.5 font-mono">/tin-tuc/{post.slug}</div>
                          </td>
                          <td className="px-4 py-3"><span className="text-xs bg-gold/10 text-gold font-semibold px-2 py-0.5 rounded">{post.category}</span></td>
                          <td className="px-4 py-3 text-xs text-gray-400 hidden lg:table-cell">{fmtDate(post.published_at)}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2 justify-end">
                              <button onClick={() => openEdit(post)} className="text-xs border border-gray-200 hover:border-forest-700 hover:text-forest-700 px-3 py-1.5 transition-colors">Sửa</button>
                              <button onClick={() => setDeleteTarget({ type: 'blog', id: post.id })} className="text-xs border border-red-100 hover:bg-red-50 text-red-400 px-3 py-1.5 transition-colors">Xóa</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {/* FAB mobile */}
            <button onClick={openCreate}
              className="sm:hidden fixed bottom-6 right-6 w-14 h-14 bg-forest-800 hover:bg-forest-700 text-white rounded-full shadow-xl flex items-center justify-center z-30 active:scale-95">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </>

        ) : activeTab === 'contacts' ? (

          /* ══ CONTACTS ═══════════════════════════════════ */
          <>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h1 className="text-lg font-bold text-gray-800">Tin nhắn liên hệ</h1>
                <p className="text-xs text-gray-400 mt-0.5">
                  {contacts.length} tin nhắn
                  {unreadContacts > 0 && <span className="ml-2 text-blue-500 font-semibold">· {unreadContacts} chưa đọc</span>}
                </p>
              </div>
            </div>

            {contacts.length === 0 ? <EmptyState text="Chưa có tin nhắn liên hệ nào" /> : (
              <div className="space-y-3">
                {contacts.map(c => (
                  <div key={c.id} className="bg-white rounded shadow-sm overflow-hidden">
                    {/* Card header */}
                    <button onClick={() => toggleContact(c)} className="w-full text-left p-4 active:bg-gray-50">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2.5 min-w-0">
                          {!c.is_read && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full shrink-0 mt-1.5" />
                          )}
                          <div className={!c.is_read ? '' : 'ml-[18px]'}>
                            <p className={`text-sm leading-snug ${!c.is_read ? 'font-bold text-gray-900' : 'font-semibold text-gray-700'}`}>
                              {c.full_name}
                            </p>
                            {c.subject && <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{c.subject}</p>}
                            {!c.subject && <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{c.message}</p>}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[11px] text-gray-400">{fmtDate(c.created_at)}</span>
                          <svg className={`w-4 h-4 text-gray-400 transition-transform ${expandedContactId === c.id ? 'rotate-180' : ''}`}
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </button>

                    {/* Expanded */}
                    {expandedContactId === c.id && (
                      <div className="border-t border-gray-100">
                        {/* Contact info row */}
                        <div className="px-4 py-3 bg-gray-50 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-gray-600">
                          {c.phone && (
                            <a href={`tel:${c.phone}`} className="flex items-center gap-1.5 hover:text-gold transition-colors">
                              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                              {c.phone}
                            </a>
                          )}
                          <a href={`mailto:${c.email}`} className="flex items-center gap-1.5 hover:text-gold transition-colors">
                            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {c.email}
                          </a>
                        </div>
                        {/* Message */}
                        <div className="px-4 py-4">
                          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{c.message}</p>
                        </div>
                        {/* Actions */}
                        <div className={`border-t border-gray-100 grid divide-x divide-gray-100 ${!c.is_read ? 'grid-cols-2' : 'grid-cols-1'}`}>
                          {!c.is_read && (
                            <button
                              onClick={async () => {
                                await axios.patch(`/api/admin/contacts/${c.id}/read`, {}, { headers: authHeaders() });
                                setContacts(cs => cs.map(x => x.id === c.id ? { ...x, is_read: 1 } : x));
                              }}
                              className="py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50 flex items-center justify-center gap-1.5 active:bg-blue-100 transition-colors">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Đánh dấu đã đọc
                            </button>
                          )}
                          <button onClick={() => setDeleteTarget({ type: 'contact', id: c.id })}
                            className="py-3 text-sm font-semibold text-red-500 hover:bg-red-50 flex items-center justify-center gap-1.5 active:bg-red-100 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Xóa
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>

        ) : (

          /* ══ BOOKINGS ═══════════════════════════════════ */
          <>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-lg font-bold text-gray-800">Đơn đặt phòng</h1>
                <p className="text-xs text-gray-400 mt-0.5">
                  {bookings.length} đơn
                  {pendingBookings > 0 && <span className="ml-2 text-amber-600 font-semibold">· {pendingBookings} chờ xác nhận</span>}
                </p>
              </div>
            </div>

            {/* Filter chips */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-4 -mx-1 px-1">
              {[
                ['all', 'Tất cả', bookings.length],
                ['pending', 'Chờ xác nhận', bookings.filter(b => b.status === 'pending').length],
                ['confirmed', 'Đã xác nhận', bookings.filter(b => b.status === 'confirmed').length],
                ['cancelled', 'Đã hủy', bookings.filter(b => b.status === 'cancelled').length],
              ].map(([val, label, cnt]) => (
                <button key={val} onClick={() => setBookingFilter(val)}
                  className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                    bookingFilter === val
                      ? 'bg-forest-800 text-white border-forest-800'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                  }`}>
                  {label}{cnt > 0 && <span className={`ml-1 ${bookingFilter === val ? 'opacity-70' : 'text-gray-400'}`}>({cnt})</span>}
                </button>
              ))}
            </div>

            {filteredBookings.length === 0 ? <EmptyState text="Không có đơn đặt phòng nào" /> : (
              <div className="space-y-3">
                {filteredBookings.map(b => {
                  const st = STATUS[b.status] || STATUS.pending;
                  const nights = calcNights(b.check_in, b.check_out);
                  return (
                    <div key={b.id} className="bg-white rounded shadow-sm overflow-hidden">
                      {/* Header row */}
                      <div className="flex items-start justify-between gap-3 p-4 pb-3">
                        <div>
                          <p className="font-bold text-gray-800 text-sm">{b.full_name}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{fmtDate(b.created_at)}</p>
                        </div>
                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border shrink-0 ${st.cls}`}>
                          {st.label}
                        </span>
                      </div>

                      {/* Details */}
                      <div className="px-4 pb-3 space-y-1.5 text-xs text-gray-600">
                        {b.phone && (
                          <a href={`tel:${b.phone}`} className="flex items-center gap-2 hover:text-gold transition-colors">
                            <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {b.phone}
                          </a>
                        )}
                        {(b.room_name || b.guests) && (
                          <div className="flex items-center gap-2">
                            <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            {b.room_name || 'Chưa chọn phòng'}
                            {b.guests && <span className="text-gray-400">· {b.guests} người</span>}
                          </div>
                        )}
                        {(b.check_in || b.check_out) && (
                          <div className="flex items-center gap-2">
                            <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {fmtDate(b.check_in)} → {fmtDate(b.check_out)}
                            {nights && <span className="text-gray-400 ml-1">({nights})</span>}
                          </div>
                        )}
                        {b.special_requests && (
                          <div className="flex items-start gap-2 mt-1">
                            <svg className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                            <span className="text-gray-500 italic">{b.special_requests}</span>
                          </div>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="border-t border-gray-50 flex divide-x divide-gray-50">
                        {b.status === 'pending' && (
                          <button onClick={() => updateBookingStatus(b.id, 'confirmed')}
                            className="flex-1 py-3 text-xs font-bold text-green-600 hover:bg-green-50 flex items-center justify-center gap-1 active:bg-green-100 transition-colors">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Xác nhận
                          </button>
                        )}
                        {(b.status === 'pending' || b.status === 'confirmed') && (
                          <button onClick={() => updateBookingStatus(b.id, 'cancelled')}
                            className="flex-1 py-3 text-xs font-bold text-red-500 hover:bg-red-50 flex items-center justify-center gap-1 active:bg-red-100 transition-colors">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Hủy đặt
                          </button>
                        )}
                        {b.status === 'cancelled' && (
                          <button onClick={() => updateBookingStatus(b.id, 'pending')}
                            className="flex-1 py-3 text-xs font-bold text-amber-600 hover:bg-amber-50 flex items-center justify-center gap-1 active:bg-amber-100 transition-colors">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Khôi phục
                          </button>
                        )}
                        <button onClick={() => setDeleteTarget({ type: 'booking', id: b.id })}
                          className="px-4 py-3 text-xs font-bold text-gray-400 hover:bg-gray-50 hover:text-red-400 flex items-center justify-center active:bg-gray-100 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </main>

      {/* ── Delete modal ────────────────────────────── */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-50 px-4 pb-4 sm:pb-0">
          <div className="bg-white w-full max-w-sm shadow-2xl rounded-t-2xl sm:rounded-sm overflow-hidden">
            <div className="px-6 pt-6 pb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800">Xác nhận xóa</h3>
              </div>
              <p className="text-sm text-gray-500">
                {{ blog: 'Bài viết', contact: 'Tin nhắn', booking: 'Đơn đặt phòng' }[deleteTarget.type]} sẽ bị xóa vĩnh viễn và không thể khôi phục.
              </p>
            </div>
            <div className="grid grid-cols-2 border-t border-gray-100">
              <button onClick={() => setDeleteTarget(null)}
                className="py-4 text-sm font-semibold text-gray-600 hover:bg-gray-50 border-r border-gray-100 active:bg-gray-100 transition-colors">
                Hủy
              </button>
              <button onClick={handleDelete}
                className="py-4 text-sm font-bold text-red-600 hover:bg-red-50 active:bg-red-100 transition-colors">
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
