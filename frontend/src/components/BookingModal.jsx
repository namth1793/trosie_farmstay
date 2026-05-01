import React, { useState } from 'react';
import axios from 'axios';

export default function BookingModal({ room, initialForm = {}, onClose }) {
  const today = new Date().toISOString().split('T')[0];
  const [form, setForm] = useState({
    full_name: '', email: '', phone: '',
    check_in: initialForm.check_in || '',
    check_out: initialForm.check_out || '',
    guests: initialForm.guests || 2,
    room_id: room?.id || '',
    room_name: room?.name || '',
    special_requests: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const set = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await axios.post('/api/bookings', form);
      setSuccess(true);
    } catch {
      setError('Có lỗi xảy ra. Vui lòng thử lại hoặc gọi trực tiếp.');
    } finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="font-serif text-xl text-forest-900">Đặt Phòng</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {success ? (
          <div className="p-10 text-center">
            <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-forest-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-serif text-xl text-forest-900 mb-2">Đặt Phòng Thành Công!</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">Yêu cầu của bạn đã được ghi nhận.<br />Chúng tôi sẽ liên hệ xác nhận sớm nhất.</p>
            <button onClick={onClose} className="btn-primary">Đóng</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {room ? (
              <div className="bg-cream p-3 text-sm text-forest-800 rounded">
                <span className="font-semibold">Phòng đã chọn:</span> {room.name} —{' '}
                <span className="text-gold font-semibold">{room.price?.toLocaleString('vi-VN')}đ/đêm</span>
              </div>
            ) : (
              <div>
                <label className="block text-[11px] font-semibold tracking-widest uppercase text-gray-500 mb-1.5">Loại phòng</label>
                <select name="room_name" value={form.room_name} onChange={set}
                  className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-forest-600">
                  <option value="">-- Chọn loại phòng --</option>
                  <option value="Phòng Farm">Phòng Farm — 1.700.000đ/đêm</option>
                  <option value="Phòng Garden">Phòng Garden — 1.400.000đ/đêm</option>
                  <option value="Phòng Mountain">Phòng Mountain — 1.100.000đ/đêm</option>
                </select>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              {[['Ngày nhận phòng *','check_in','date'], ['Ngày trả phòng *','check_out','date']].map(([lbl,name,type]) => (
                <div key={name}>
                  <label className="block text-[11px] font-semibold tracking-widest uppercase text-gray-500 mb-1.5">{lbl}</label>
                  <input type={type} name={name} value={form[name]} onChange={set} required
                    min={name === 'check_in' ? today : (form.check_in || today)}
                    className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-forest-600" />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-[11px] font-semibold tracking-widest uppercase text-gray-500 mb-1.5">Số khách</label>
              <select name="guests" value={form.guests} onChange={set}
                className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-forest-600">
                {[1,2,3,4].map(n => <option key={n} value={n}>{n} khách</option>)}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold tracking-widest uppercase text-gray-500 mb-1.5">Họ và tên *</label>
              <input type="text" name="full_name" value={form.full_name} onChange={set} required
                placeholder="Nguyễn Văn A"
                className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-forest-600" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold tracking-widest uppercase text-gray-500 mb-1.5">Email *</label>
                <input type="email" name="email" value={form.email} onChange={set} required
                  placeholder="email@example.com"
                  className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-forest-600" />
              </div>
              <div>
                <label className="block text-[11px] font-semibold tracking-widest uppercase text-gray-500 mb-1.5">Điện thoại</label>
                <input type="tel" name="phone" value={form.phone} onChange={set}
                  placeholder="0912 345 678"
                  className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-forest-600" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold tracking-widest uppercase text-gray-500 mb-1.5">Yêu cầu đặc biệt</label>
              <textarea name="special_requests" value={form.special_requests} onChange={set} rows={3}
                placeholder="Giờ nhận phòng, dị ứng thực phẩm, yêu cầu khác..."
                className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-forest-600 resize-none" />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" disabled={loading}
              className="btn-primary w-full text-center disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Đang gửi...' : 'Xác Nhận Đặt Phòng'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
