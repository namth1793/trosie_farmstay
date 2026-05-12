import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/products/${slug}`)
      .then(r => { setProduct(r.data); setLoading(false); })
      .catch(() => { setNotFound(true); setLoading(false); });
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center text-gray-400 pt-20">
      Đang tải...
    </div>
  );

  if (notFound || !product) return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-4 text-center">
      <h2 className="font-serif text-2xl text-forest-900 mb-4">Không tìm thấy sản phẩm</h2>
      <Link to="/ca-phe/shop" className="btn-outline">Quay Lại Shop</Link>
    </div>
  );

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <div className="bg-cream border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 flex items-center gap-2 text-xs text-gray-500">
          <Link to="/" className="hover:text-gold">Trang Chủ</Link>
          <span>/</span>
          <Link to="/ca-phe" className="hover:text-gold">Cà Phê</Link>
          <span>/</span>
          <Link to="/ca-phe/shop" className="hover:text-gold">Shop</Link>
          <span>/</span>
          <span className="text-forest-900 font-medium truncate">{product.name}</span>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Image */}
            <div>
              <div className="img-zoom">
                <img src={product.image} alt={product.name} className="w-full h-auto sm:h-[500px] sm:object-cover" />
              </div>
              {product.badge && (
                <div className="mt-4">
                  <span className="bg-gold text-white text-xs font-bold tracking-widest uppercase px-3 py-1.5">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <div className="text-[11px] text-gold uppercase tracking-widest font-semibold mb-2">{product.weight}</div>
              <h1 className="font-serif text-3xl text-forest-900 mb-4 leading-snug">{product.name}</h1>
              <div className="text-3xl font-bold text-gold mb-6">{product.price?.toLocaleString('vi-VN')}đ</div>

              {/* Short desc */}
              <p className="text-gray-600 leading-relaxed mb-6 border-l-2 border-gold pl-4 italic text-sm">
                {product.short_desc}
              </p>

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.tags.map(tag => (
                    <span key={tag} className="text-[11px] bg-forest-50 text-forest-700 border border-forest-200 px-3 py-1 tracking-wide">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Processing & Roast */}
              {(product.processing || product.roast) && (
                <div className="flex gap-4 mb-6">
                  {product.processing && (
                    <div className="bg-cream px-4 py-3 text-center flex-1">
                      <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Chế Biến</div>
                      <div className="text-sm font-semibold text-forest-900">{product.processing}</div>
                    </div>
                  )}
                  {product.roast && (
                    <div className="bg-cream px-4 py-3 text-center flex-1">
                      <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Rang</div>
                      <div className="text-sm font-semibold text-forest-900">{product.roast} Roast</div>
                    </div>
                  )}
                </div>
              )}

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <a href="tel:0961393370"
                  className="btn-gold flex-1 text-center">
                  Đặt Mua Ngay – 0961 393 370
                </a>
                <a href="mailto:trosiegardenks@gmail.com"
                  className="btn-outline flex-1 text-center">
                  Email Đặt Hàng
                </a>
              </div>

              <p className="text-xs text-gray-400 text-center">Giao hàng toàn quốc · COD · Chuyển khoản</p>
            </div>
          </div>

          {/* Description */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-serif text-xl text-forest-900 mb-4 pb-2 border-b border-gray-100">Mô Tả Sản Phẩm</h2>
              <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                {product.description}
              </div>
            </div>
            {product.usage_guide && (
              <div>
                <h2 className="font-serif text-xl text-forest-900 mb-4 pb-2 border-b border-gray-100">Hướng Dẫn Sử Dụng</h2>
                <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                  {product.usage_guide}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Back to shop */}
      <section className="py-8 bg-cream text-center">
        <Link to="/ca-phe/shop" className="btn-outline">← Quay Lại Shop</Link>
      </section>
    </div>
  );
}
