import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('admin_token')) navigate('/admin/blog');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await axios.post('/api/admin/login', { password });
      localStorage.setItem('admin_token', data.token);
      navigate('/admin/blog');
    } catch {
      setError('Sai mật khẩu. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-forest-900 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-sm shadow-2xl">
        <div className="bg-forest-800 px-8 py-6 text-center">
          <img src="/logo.png" alt="Trosie" className="h-14 mx-auto mb-3 brightness-0 invert" />
          <p className="text-white/70 text-xs tracking-widest uppercase">Trosie Garden · Admin</p>
        </div>
        <div className="px-8 py-8">
          <h1 className="font-serif text-xl text-forest-900 mb-6">Đăng nhập quản trị</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold tracking-widest uppercase text-gray-500 mb-1.5">
                Mật khẩu
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-forest-700 transition-colors"
                placeholder="Nhập mật khẩu admin"
                autoFocus
                required
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm bg-red-50 px-3 py-2">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-forest-800 hover:bg-forest-700 text-white font-semibold py-3 text-sm tracking-wide transition-colors disabled:opacity-50"
            >
              {loading ? 'Đang xác thực...' : 'Đăng nhập'}
            </button>
          </form>
          <p className="text-center mt-6">
            <a href="/" className="text-xs text-gray-400 hover:text-gold transition-colors">
              ← Quay về trang chủ
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
