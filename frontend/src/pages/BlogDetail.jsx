import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/blog/${slug}`)
      .then(r => { setPost(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center pt-20 text-gray-400">Đang tải...</div>;
  if (!post) return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-20 gap-4">
      <p className="text-gray-500">Không tìm thấy bài viết.</p>
      <Link to="/tin-tuc" className="btn-outline">Quay lại Blog</Link>
    </div>
  );

  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[11px] bg-gold text-white px-2 py-0.5 font-bold uppercase tracking-wider">{post.category}</span>
              <span className="text-xs text-white/70">{new Date(post.published_at).toLocaleDateString('vi-VN', { day:'2-digit', month:'long', year:'numeric' })}</span>
              <span className="text-xs text-white/70">· {post.author}</span>
            </div>
            <h1 className="font-serif text-2xl md:text-4xl text-white leading-snug">{post.title}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-400 mb-8 flex items-center gap-2">
          <Link to="/" className="hover:text-gold">Trang chủ</Link>
          <span>/</span>
          <Link to="/tin-tuc" className="hover:text-gold">Tin tức</Link>
          <span>/</span>
          <span className="text-forest-700 line-clamp-1">{post.title}</span>
        </nav>

        {/* Excerpt */}
        <p className="text-gray-600 text-lg leading-relaxed border-l-4 border-gold pl-5 mb-8 italic">{post.excerpt}</p>

        {/* Content */}
        {post.content?.trimStart().startsWith('<') ? (
          <div
            className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-forest-900 prose-a:text-gold prose-li:text-gray-600 prose-p:text-gray-600 prose-p:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{ lineHeight: '1.85' }}
          />
        ) : (
          <div className="text-gray-600 text-base leading-[1.85]" style={{ whiteSpace: 'pre-wrap' }}>
            {post.content}
          </div>
        )}

        {/* Share */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-500">Chia sẻ bài viết này:</div>
          <div className="flex gap-3">
            {['Facebook', 'Twitter', 'Copy link'].map(s => (
              <button key={s} className="text-[11px] font-semibold tracking-widest uppercase border border-gray-200 px-4 py-2 text-gray-600 hover:border-forest-700 hover:text-forest-700 transition-colors">
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Related */}
      {post.related?.length > 0 && (
        <section className="py-14 bg-cream">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <h2 className="font-serif text-2xl text-forest-900 mb-10 text-center">Bài Viết Liên Quan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {post.related.map(p => (
                <Link key={p.id} to={`/tin-tuc/${p.slug}`} className="group block">
                  <div className="img-zoom mb-4">
                    <img src={p.image} alt={p.title} className="w-full aspect-[4/3] object-cover" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gold block mb-1">{p.category}</span>
                  <h3 className="font-serif text-base text-forest-900 group-hover:text-gold transition-colors line-clamp-2">{p.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
