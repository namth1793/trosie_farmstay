import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = ['Khám phá', 'Hướng dẫn', 'Ẩm thực', 'Hoạt động', 'Lifestyle', 'Tin tức'];

const EMPTY_FORM = {
  title: '', slug: '', excerpt: '', content: '', category: 'Tin tức', author: 'Trosie Garden',
};

function authHeaders() {
  return { Authorization: `Bearer ${localStorage.getItem('admin_token')}` };
}

function slugify(text) {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[đĐ]/g, 'd').toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '').trim()
    .replace(/\s+/g, '-').replace(/-+/g, '-');
}

function Field({ label, required, hint, children }) {
  return (
    <div>
      <label className="flex items-center gap-1 text-[11px] font-bold tracking-widest uppercase text-gray-500 mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {hint && <p className="text-xs text-gray-400 mb-2">{hint}</p>}
      {children}
    </div>
  );
}

const inputCls = 'w-full border border-gray-200 px-4 py-3.5 text-base focus:outline-none focus:border-forest-700 transition-colors rounded-sm';

export default function AdminBlog() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState('list');
  const [editPost, setEditPost] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const fileRef = useRef();

  useEffect(() => {
    if (!localStorage.getItem('admin_token')) { navigate('/admin/login'); return; }
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/admin/blog', { headers: authHeaders() });
      setPosts(data);
    } catch (err) {
      if (err.response?.status === 401) navigate('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setEditPost(null);
    setForm(EMPTY_FORM);
    setImageFile(null);
    setImagePreview('');
    setError('');
    setMode('form');
    window.scrollTo(0, 0);
  };

  const openEdit = (post) => {
    setEditPost(post);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content || '',
      category: post.category || 'Tin tức',
      author: post.author || 'Trosie Garden',
    });
    setImageFile(null);
    setImagePreview(post.image || '');
    setError('');
    setMode('form');
    window.scrollTo(0, 0);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setForm(f => ({ ...f, title, ...(!editPost && { slug: slugify(title) }) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { setError('Vui lòng nhập tiêu đề bài viết'); return; }
    if (!editPost && !imageFile) { setError('Vui lòng chọn ảnh bìa cho bài viết'); return; }
    setSaving(true);
    setError('');
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (imageFile) fd.append('image', imageFile);
      const headers = { ...authHeaders(), 'Content-Type': 'multipart/form-data' };
      if (editPost) {
        await axios.put(`/api/admin/blog/${editPost.id}`, fd, { headers });
      } else {
        await axios.post('/api/admin/blog', fd, { headers });
      }
      await fetchPosts();
      setMode('list');
    } catch (err) {
      setError(err.response?.data?.error || 'Có lỗi xảy ra. Kiểm tra lại cấu hình Cloudinary.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/admin/blog/${deleteId}`, { headers: authHeaders() });
      setPosts(p => p.filter(post => post.id !== deleteId));
      setDeleteId(null);
    } catch {
      alert('Không thể xóa bài viết');
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-forest-900 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-lg">
        <div className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Trosie" className="h-7" />
          <span className="text-sm font-semibold">Admin · Blog</span>
        </div>
        <div className="flex items-center gap-2">
          <a href="/tin-tuc" target="_blank"
            className="hidden sm:flex items-center gap-1 text-xs text-gray-300 hover:text-gold transition-colors px-3 py-2">
            Xem blog
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

      <main className="max-w-3xl mx-auto px-4 py-6">

        {/* ── LIST MODE ─────────────────────────────── */}
        {mode === 'list' && (
          <>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h1 className="text-lg font-bold text-gray-800">Bài viết</h1>
                <p className="text-xs text-gray-400 mt-0.5">{posts.length} bài</p>
              </div>
              {/* Desktop add button */}
              <button onClick={openCreate}
                className="hidden sm:flex items-center gap-2 bg-forest-800 hover:bg-forest-700 text-white text-sm font-semibold px-5 py-2.5 transition-colors shadow-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Thêm bài viết
              </button>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <svg className="w-6 h-6 animate-spin text-gray-300" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                <span className="text-sm text-gray-400">Đang tải...</span>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded shadow-sm">
                <svg className="w-12 h-12 text-gray-200 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-400 text-sm mb-4">Chưa có bài viết nào</p>
                <button onClick={openCreate}
                  className="bg-forest-800 text-white text-sm font-semibold px-6 py-3 hover:bg-forest-700 transition-colors">
                  Tạo bài viết đầu tiên
                </button>
              </div>
            ) : (
              <>
                {/* Mobile cards */}
                <div className="sm:hidden space-y-3">
                  {posts.map(post => (
                    <div key={post.id} className="bg-white rounded shadow-sm overflow-hidden">
                      <div className="flex gap-3 p-3">
                        {post.image ? (
                          <img src={post.image} alt="" className="w-20 h-16 object-cover rounded shrink-0" />
                        ) : (
                          <div className="w-20 h-16 bg-gray-100 rounded shrink-0 flex items-center justify-center">
                            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-gray-800 text-sm leading-snug line-clamp-2">{post.title}</p>
                          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                            <span className="text-[10px] bg-gold/10 text-gold font-bold px-2 py-0.5 rounded">
                              {post.category}
                            </span>
                            <span className="text-[10px] text-gray-400">
                              {new Date(post.published_at).toLocaleDateString('vi-VN')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="border-t border-gray-50 grid grid-cols-2 divide-x divide-gray-50">
                        <button onClick={() => openEdit(post)}
                          className="py-3 text-sm font-semibold text-forest-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5 active:bg-gray-100">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Chỉnh sửa
                        </button>
                        <button onClick={() => setDeleteId(post.id)}
                          className="py-3 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors flex items-center justify-center gap-1.5 active:bg-red-100">
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
                        <th className="px-4 py-3 w-32"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {posts.map(post => (
                        <tr key={post.id} className="hover:bg-gray-50/60 transition-colors">
                          <td className="px-4 py-3">
                            {post.image ? (
                              <img src={post.image} alt="" className="w-14 h-11 object-cover rounded" />
                            ) : (
                              <div className="w-14 h-11 bg-gray-100 rounded" />
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-medium text-gray-800 line-clamp-1">{post.title}</div>
                            <div className="text-xs text-gray-400 mt-0.5 font-mono">/tin-tuc/{post.slug}</div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-xs bg-gold/10 text-gold font-semibold px-2 py-0.5 rounded">
                              {post.category}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-xs text-gray-400 hidden lg:table-cell">
                            {new Date(post.published_at).toLocaleDateString('vi-VN')}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2 justify-end">
                              <button onClick={() => openEdit(post)}
                                className="text-xs border border-gray-200 hover:border-forest-700 hover:text-forest-700 px-3 py-1.5 transition-colors">
                                Sửa
                              </button>
                              <button onClick={() => setDeleteId(post.id)}
                                className="text-xs border border-red-100 hover:bg-red-50 text-red-400 hover:text-red-600 px-3 py-1.5 transition-colors">
                                Xóa
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {/* Mobile FAB */}
            <button onClick={openCreate}
              className="sm:hidden fixed bottom-6 right-6 w-14 h-14 bg-forest-800 hover:bg-forest-700 text-white rounded-full shadow-xl flex items-center justify-center transition-colors active:scale-95 z-30">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </>
        )}

        {/* ── FORM MODE ─────────────────────────────── */}
        {mode === 'form' && (
          <div className="bg-white shadow-sm rounded-sm overflow-hidden">
            {/* Form header */}
            <div className="border-b border-gray-100 px-4 py-4 flex items-center gap-3">
              <button onClick={() => setMode('list')}
                className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors active:bg-gray-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h2 className="text-base font-bold text-gray-800">
                {editPost ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="px-4 py-6 space-y-5">

              {/* Image upload */}
              <Field label="Ảnh bìa" required={!editPost}>
                {imagePreview && (
                  <img src={imagePreview} alt="Preview"
                    className="w-full h-44 object-cover rounded mb-3 border border-gray-100" />
                )}
                <button type="button" onClick={() => fileRef.current.click()}
                  className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 hover:border-forest-700 active:border-forest-700 py-4 text-sm text-gray-500 hover:text-forest-700 transition-colors rounded-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  {imagePreview ? 'Đổi ảnh khác' : 'Chọn ảnh từ máy / thư viện'}
                </button>
                {imageFile && (
                  <p className="text-xs text-gray-400 mt-1.5 truncate">{imageFile.name}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">Tối đa 10MB · Ảnh sẽ lưu lên Cloudinary</p>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </Field>

              {/* Title */}
              <Field label="Tiêu đề" required>
                <input
                  type="text"
                  value={form.title}
                  onChange={handleTitleChange}
                  className={inputCls}
                  placeholder="Nhập tiêu đề bài viết..."
                  required
                />
              </Field>

              {/* Slug */}
              <Field label="Đường dẫn URL">
                <div className="flex items-stretch border border-gray-200 focus-within:border-forest-700 transition-colors rounded-sm overflow-hidden">
                  <span className="flex items-center px-3 text-xs text-gray-400 bg-gray-50 border-r border-gray-200 shrink-0 whitespace-nowrap">
                    /tin-tuc/
                  </span>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                    className="flex-1 px-3 py-3.5 text-sm font-mono focus:outline-none min-w-0"
                    placeholder="duong-dan-bai-viet"
                  />
                </div>
              </Field>

              {/* Excerpt */}
              <Field label="Mô tả ngắn">
                <textarea
                  rows={3}
                  value={form.excerpt}
                  onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
                  className={inputCls + ' resize-none'}
                  placeholder="Tóm tắt hiển thị ở trang danh sách blog..."
                />
              </Field>

              {/* Content */}
              <Field label="Nội dung" hint="Viết văn bản thuần — xuống dòng để tạo đoạn mới.">
                <textarea
                  rows={12}
                  value={form.content}
                  onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                  className={inputCls + ' leading-relaxed'}
                  placeholder="Nhập nội dung bài viết tại đây..."
                />
              </Field>

              {/* Category + Author */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Danh mục">
                  <div className="relative">
                    <select
                      value={form.category}
                      onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                      className={inputCls + ' appearance-none pr-10 cursor-pointer'}
                    >
                      {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                    <svg className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </Field>
                <Field label="Tác giả">
                  <input
                    type="text"
                    value={form.author}
                    onChange={e => setForm(f => ({ ...f, author: e.target.value }))}
                    className={inputCls}
                    placeholder="Tên tác giả"
                  />
                </Field>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600 rounded-sm flex items-start gap-2">
                  <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </div>
              )}

              {/* Buttons */}
              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2 border-t border-gray-50">
                <button type="button" onClick={() => setMode('list')}
                  className="w-full sm:w-auto border border-gray-200 hover:border-gray-400 text-gray-600 font-semibold px-6 py-3.5 sm:py-3 text-sm transition-colors rounded-sm active:bg-gray-50">
                  Hủy
                </button>
                <button type="submit" disabled={saving}
                  className="w-full sm:w-auto sm:flex-1 bg-forest-800 hover:bg-forest-700 text-white font-semibold px-8 py-3.5 sm:py-3 text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2 rounded-sm active:bg-forest-900">
                  {saving && (
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                  )}
                  {saving ? 'Đang lưu...' : editPost ? 'Lưu thay đổi' : 'Đăng bài viết'}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* Delete confirm modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-50 px-4 pb-4 sm:pb-0">
          <div className="bg-white w-full max-w-sm shadow-2xl rounded-t-2xl sm:rounded-sm">
            <div className="px-6 pt-6 pb-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800">Xóa bài viết?</h3>
              </div>
              <p className="text-sm text-gray-500 mb-6">
                Bài viết sẽ bị xóa vĩnh viễn và không thể khôi phục. Bạn có chắc chắn?
              </p>
            </div>
            <div className="grid grid-cols-2 gap-0 border-t border-gray-100">
              <button onClick={() => setDeleteId(null)}
                className="py-4 text-sm font-semibold text-gray-600 hover:bg-gray-50 active:bg-gray-100 transition-colors border-r border-gray-100">
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
