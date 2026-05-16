import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    const token = localStorage.getItem('admin_token');
    if (!token) { navigate('/admin/login'); return; }
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

      if (editPost) {
        await axios.put(`/api/admin/blog/${editPost.id}`, fd, {
          headers: { ...authHeaders(), 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await axios.post('/api/admin/blog', fd, {
          headers: { ...authHeaders(), 'Content-Type': 'multipart/form-data' },
        });
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
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-forest-900 text-white px-4 md:px-8 py-3.5 flex items-center justify-between sticky top-0 z-40 shadow-lg">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Trosie" className="h-7 brightness-0 invert" />
          <span className="text-sm font-semibold tracking-wide">Admin · Blog</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="/tin-tuc" target="_blank"
            className="hidden sm:block text-xs text-gray-300 hover:text-gold transition-colors">
            Xem trang blog →
          </a>
          <button onClick={logout}
            className="text-xs bg-forest-700 hover:bg-red-700 px-4 py-1.5 transition-colors">
            Đăng xuất
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {mode === 'list' ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-xl font-bold text-gray-800">Quản lý bài viết</h1>
                <p className="text-sm text-gray-400 mt-0.5">{posts.length} bài viết</p>
              </div>
              <button onClick={openCreate}
                className="bg-forest-800 hover:bg-forest-700 text-white text-sm font-semibold px-5 py-2.5 transition-colors flex items-center gap-2 shadow-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Thêm bài viết
              </button>
            </div>

            {loading ? (
              <div className="text-center text-gray-400 py-20">Đang tải...</div>
            ) : posts.length === 0 ? (
              <div className="text-center py-20 bg-white shadow-sm">
                <p className="text-gray-400 mb-4">Chưa có bài viết nào</p>
                <button onClick={openCreate} className="btn-primary text-sm">Tạo bài viết đầu tiên</button>
              </div>
            ) : (
              <div className="bg-white shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400 w-20">Ảnh</th>
                      <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">Bài viết</th>
                      <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400 hidden md:table-cell w-28">Danh mục</th>
                      <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400 hidden lg:table-cell w-28">Ngày đăng</th>
                      <th className="px-4 py-3 w-28"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {posts.map(post => (
                      <tr key={post.id} className="hover:bg-gray-50/60 transition-colors">
                        <td className="px-4 py-3">
                          {post.image ? (
                            <img src={post.image} alt="" className="w-14 h-11 object-cover rounded" />
                          ) : (
                            <div className="w-14 h-11 bg-gray-100 rounded flex items-center justify-center">
                              <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-800 line-clamp-1">{post.title}</div>
                          <div className="text-xs text-gray-400 mt-0.5 font-mono">/tin-tuc/{post.slug}</div>
                          {post.excerpt && (
                            <div className="text-xs text-gray-400 mt-0.5 line-clamp-1 hidden sm:block">{post.excerpt}</div>
                          )}
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
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
            )}
          </>
        ) : (
          /* Form */
          <div className="bg-white shadow-sm">
            {/* Form header */}
            <div className="border-b border-gray-100 px-6 md:px-8 py-4 flex items-center gap-3">
              <button onClick={() => setMode('list')}
                className="text-gray-400 hover:text-gray-700 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h2 className="text-lg font-bold text-gray-800">
                {editPost ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="px-6 md:px-8 py-8 space-y-6">

              {/* Image upload */}
              <div>
                <label className="block text-[11px] font-bold tracking-widest uppercase text-gray-500 mb-2">
                  Ảnh bìa {!editPost && <span className="text-red-400">*</span>}
                </label>
                {imagePreview && (
                  <div className="mb-3 relative inline-block">
                    <img src={imagePreview} alt="Preview"
                      className="max-h-52 w-full object-cover rounded border border-gray-100" />
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => fileRef.current.click()}
                    className="flex items-center gap-2 text-sm border border-dashed border-gray-300 hover:border-forest-700 hover:text-forest-700 px-5 py-2.5 text-gray-500 transition-colors rounded">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    {imagePreview ? 'Đổi ảnh khác' : 'Chọn ảnh từ máy tính'}
                  </button>
                  {imageFile && (
                    <span className="text-xs text-gray-400 truncate max-w-xs">{imageFile.name}</span>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                <p className="text-xs text-gray-400 mt-1.5">Ảnh sẽ được lưu lên Cloudinary. Tối đa 10MB.</p>
              </div>

              {/* Title */}
              <div>
                <label className="block text-[11px] font-bold tracking-widest uppercase text-gray-500 mb-1.5">
                  Tiêu đề <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={handleTitleChange}
                  className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-forest-700 transition-colors"
                  placeholder="Nhập tiêu đề bài viết..."
                  required
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-[11px] font-bold tracking-widest uppercase text-gray-500 mb-1.5">
                  Đường dẫn URL (slug)
                </label>
                <div className="flex items-center border border-gray-200 focus-within:border-forest-700 transition-colors">
                  <span className="px-3 py-3 text-xs text-gray-400 bg-gray-50 border-r border-gray-200 shrink-0">/tin-tuc/</span>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                    className="flex-1 px-3 py-3 text-sm font-mono focus:outline-none"
                    placeholder="duong-dan-bai-viet"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-[11px] font-bold tracking-widest uppercase text-gray-500 mb-1.5">
                  Mô tả ngắn
                </label>
                <textarea
                  rows={2}
                  value={form.excerpt}
                  onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
                  className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-forest-700 transition-colors resize-none"
                  placeholder="Tóm tắt ngắn gọn về nội dung bài viết (hiển thị ở trang danh sách blog)..."
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-[11px] font-bold tracking-widest uppercase text-gray-500 mb-1.5">
                  Nội dung bài viết
                </label>
                <p className="text-xs text-gray-400 mb-2">
                  Viết văn bản thuần — xuống dòng bình thường để tạo đoạn mới.
                </p>
                <textarea
                  rows={16}
                  value={form.content}
                  onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                  className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-forest-700 transition-colors leading-relaxed"
                  placeholder="Nhập nội dung bài viết tại đây..."
                />
              </div>

              {/* Category + Author */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-bold tracking-widest uppercase text-gray-500 mb-1.5">
                    Danh mục
                  </label>
                  <select
                    value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-forest-700 transition-colors bg-white appearance-none"
                  >
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold tracking-widest uppercase text-gray-500 mb-1.5">
                    Tác giả
                  </label>
                  <input
                    type="text"
                    value={form.author}
                    onChange={e => setForm(f => ({ ...f, author: e.target.value }))}
                    className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-forest-700 transition-colors"
                    placeholder="Tên tác giả"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <div className="flex gap-3 pt-2 border-t border-gray-50">
                <button type="submit" disabled={saving}
                  className="bg-forest-800 hover:bg-forest-700 text-white font-semibold px-8 py-3 text-sm transition-colors disabled:opacity-50 flex items-center gap-2">
                  {saving && (
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                  )}
                  {saving ? 'Đang lưu...' : editPost ? 'Lưu thay đổi' : 'Đăng bài viết'}
                </button>
                <button type="button" onClick={() => setMode('list')}
                  className="border border-gray-200 hover:border-gray-400 text-gray-600 font-semibold px-6 py-3 text-sm transition-colors">
                  Hủy
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* Delete modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800">Xác nhận xóa bài viết</h3>
            </div>
            <p className="text-sm text-gray-500 mb-6 pl-13">
              Bài viết sẽ bị xóa vĩnh viễn và không thể khôi phục. Bạn có chắc chắn?
            </p>
            <div className="flex gap-3">
              <button onClick={handleDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 text-sm transition-colors">
                Xóa
              </button>
              <button onClick={() => setDeleteId(null)}
                className="flex-1 border border-gray-200 hover:border-gray-400 text-gray-600 font-semibold py-2.5 text-sm transition-colors">
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
