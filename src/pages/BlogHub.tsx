import React, { useState } from 'react';
import { useSEO } from '../hooks/useSEO';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, Calendar, User, ArrowRight, Tag } from 'lucide-react';

// SEO Blog Posts — XS Plus
const BLOG_POSTS = [
  {
    id: 'so-sanh-tran-nhom-clip-in-va-lay-in',
    title: 'So sánh chi tiết Trần Nhôm Clip-in và Lay-in: Ưu nhược điểm và Ứng dụng thực tế',
    excerpt: 'Clip-in hay Lay-in? Hướng dẫn lựa chọn hệ trần nhôm phù hợp cho văn phòng, trung tâm thương mại và công trình dân dụng. Phân tích chi tiết về kết cấu, độ thẩm mỹ, chi phí thi công và khả năng bảo trì.',
    category: 'Kiến thức kỹ thuật',
    author: 'KS. Trần Nhôm XS Plus',
    date: '05/05/2026',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80',
    featured: true,
    readTime: '8 phút'
  },
  {
    id: 'bao-gia-tran-nhom-ha-tinh-2026',
    title: 'Bảng Giá Trần Nhôm Hà Tĩnh 2026: Clip-in, Lay-in, Caro Cell cập nhật mới nhất',
    excerpt: 'Cập nhật bảng giá trần nhôm tại Hà Tĩnh năm 2026. Giá tận xưởng sản xuất, không qua trung gian. So sánh giá các loại: Clip-in từ X đ/m², Lay-in, Caro Cell và hệ xương trần đầy đủ.',
    category: 'Kiến thức kỹ thuật',
    author: 'Bộ phận Kinh doanh XS Plus',
    date: '01/05/2026',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    featured: false,
    readTime: '5 phút'
  },
  {
    id: 'huong-dan-thi-cong-tran-caro',
    title: 'Tiêu chuẩn nghiệm thu và Hướng dẫn thi công Trần nhôm Caro Cell đạt chuẩn',
    excerpt: 'Tài liệu kỹ thuật hướng dẫn thi công trần Caro 100x100 và 150x150 đạt chuẩn nghiệm thu. Lỗi thường gặp và cách khắc phục khi thi công Caro Cell trên công trình thực tế.',
    category: 'Hướng dẫn thi công',
    author: 'KS. Trần Nhôm XS Plus',
    date: '25/04/2026',
    image: 'https://images.unsplash.com/photo-1558441719-ff34b0524a24?auto=format&fit=crop&w=800&q=80',
    featured: false,
    readTime: '10 phút'
  },
  {
    id: 'xu-huong-tran-nhom-2026',
    title: 'Xu hướng thiết kế trần nhôm văn phòng hiện đại 2026: U-Shaped và Open Grid',
    excerpt: 'Cập nhật những xu hướng thiết kế không gian làm việc mở sử dụng hệ trần U-Shaped và B-Shaped. Kiến trúc sư ngày càng ưa chuộng trần nhôm lộ kết cấu (Open Grid) cho vẻ công nghiệp tinh tế.',
    category: 'Xu hướng thiết kế',
    author: 'XS Plus Design Team',
    date: '20/04/2026',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80',
    featured: false,
    readTime: '6 phút'
  },
  {
    id: 'du-an-tran-nhom-truong-hoc-nghe-an',
    title: 'Dự án: Hệ Trần Nhôm Clip-in Trường THPT Nguyễn Du — Nghệ An',
    excerpt: 'Case study hoàn chỉnh dự án lắp đặt 2.800m² trần nhôm Clip-in cho công trình trường học tại Nghệ An. Yêu cầu kỹ thuật đặc biệt, giải pháp chống ẩm và tiến độ hoàn thành trước khai giảng.',
    category: 'Dự án tiêu biểu',
    author: 'Nhóm Dự án XS Plus',
    date: '15/04/2026',
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=800&q=80',
    featured: false,
    readTime: '7 phút'
  },
  {
    id: 'tran-nhom-hay-thach-cao',
    title: 'Trần Nhôm vs Thạch Cao: Cái nào tốt hơn cho công trình của bạn?',
    excerpt: 'Phân tích chi tiết ưu và nhược điểm của trần nhôm và trần thạch cao trong điều kiện khí hậu Việt Nam. Tuổi thọ, chi phí bảo trì, tính thẩm mỹ — tất cả được so sánh khách quan.',
    category: 'Kiến thức kỹ thuật',
    author: 'KS. Trần Nhôm XS Plus',
    date: '10/04/2026',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    featured: false,
    readTime: '9 phút'
  },
  {
    id: 'huong-dan-doc-ban-ve-tran-nhom',
    title: 'Hướng dẫn đọc bản vẽ thi công hệ trần nhôm cho Nhà thầu mới vào nghề',
    excerpt: 'Giải thích các ký hiệu kỹ thuật trong bản vẽ thi công hệ trần nhôm: xương chính T-Bar, xương phụ, tấm trần, phào viền và chi tiết góc. Dành cho thợ mới và nhà thầu nhỏ.',
    category: 'Hướng dẫn thi công',
    author: 'KS. Trần Nhôm XS Plus',
    date: '03/04/2026',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80',
    featured: false,
    readTime: '12 phút'
  },
  {
    id: 'du-an-toan-bo-ha-tinh-2025',
    title: 'Tổng hợp dự án XS Plus hoàn thành 2025: Từ trường học đến văn phòng và khách sạn',
    excerpt: 'Nhìn lại năm 2025 với hơn 150 dự án trần nhôm hoàn thành tại Miền Trung. Từ phòng học chống ồn, văn phòng open-space đến sảnh khách sạn cao cấp — mỗi dự án một câu chuyện.',
    category: 'Dự án tiêu biểu',
    author: 'Nhóm Dự án XS Plus',
    date: '28/03/2026',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    featured: false,
    readTime: '6 phút'
  },
];


const CATEGORIES = ['Tất cả', 'Kiến thức kỹ thuật', 'Hướng dẫn thi công', 'Xu hướng thiết kế', 'Dự án tiêu biểu'];

export const BlogHub = () => {
  useSEO({
    title: 'Tin Tức & Kiến Thức Trần Nhôm | Blog XS Plus',
    description: 'Blog kỹ thuật trần nhôm: so sánh Clip-in vs Lay-in, hướng dẫn thi công, tiêu chuẩn thiết kế, xu hướng kiến trúc. Cập nhật từ chuyên gia XS Plus.',
    canonical: 'https://xsplus.vn/tin-tuc',
  });
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCat = activeCategory === 'Tất cả' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featuredPost = BLOG_POSTS.find(p => p.featured);
  const regularPosts = filteredPosts.filter(p => !p.featured || activeCategory !== 'Tất cả' || searchQuery);

  return (
    <div className="min-h-screen bg-surface-bright pt-32 pb-24">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-display uppercase font-bold text-brand-gray mb-4 leading-tight">
              Tâm Điểm Kiến Thức <br/>
              <span className="text-brand-orange">Trần Nhôm & Kiến Trúc</span>
            </h1>
            <p className="text-brand-gray/60 text-lg">
              Cập nhật các giải pháp kỹ thuật, tiêu chuẩn thi công và xu hướng kiến trúc mới nhất từ đội ngũ chuyên gia XS Plus.
            </p>
          </motion.div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="flex space-x-2 overflow-x-auto pb-2 w-full md:w-auto scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-brand-gray text-white shadow-lg'
                    : 'bg-white text-brand-gray/60 hover:bg-surface-dim border border-surface-dim'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray/40" size={18} />
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-surface-dim rounded-full text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
            />
          </div>
        </div>

        {/* Featured Post (Only show if no filters applied) */}
        {featuredPost && activeCategory === 'Tất cả' && !searchQuery && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <Link to={`/tin-tuc/${featuredPost.id}`} className="group block">
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-surface-dim flex flex-col md:flex-row">
                <div className="md:w-2/3 h-64 md:h-[400px] overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div>
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-6 left-6 z-20">
                    <span className="bg-brand-orange text-white text-xs font-bold px-3 py-1.5 rounded uppercase tracking-widest shadow-lg">
                      BÀI NỔI BẬT
                    </span>
                  </div>
                </div>
                <div className="md:w-1/3 p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center space-x-4 mb-4 text-xs font-bold text-brand-gray/40 uppercase tracking-widest">
                    <span className="flex items-center"><Tag size={12} className="mr-1"/> {featuredPost.category}</span>
                  </div>
                  <h2 className="text-3xl font-display font-bold text-brand-gray mb-4 group-hover:text-brand-orange transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-brand-gray/60 mb-8 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-surface-dim">
                    <div className="flex items-center space-x-2 text-xs font-medium text-brand-gray/50">
                      <Calendar size={14} />
                      <span>{featuredPost.date}</span>
                    </div>
                    <span className="flex items-center text-sm font-bold text-brand-orange group-hover:translate-x-2 transition-transform">
                      Đọc tiếp <ArrowRight size={16} className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Regular Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link to={`/tin-tuc/${post.id}`} className="group h-full flex flex-col bg-white rounded-2xl overflow-hidden border border-surface-dim hover:shadow-xl transition-shadow">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-brand-gray text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-widest">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-display font-bold text-brand-gray mb-3 group-hover:text-brand-orange transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-brand-gray/60 mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-surface-dim">
                    <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-widest text-brand-gray/40">
                      <User size={12} />
                      <span>{post.author}</span>
                    </div>
                    <div className="text-[11px] font-medium text-brand-gray/40">
                      {post.date}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {regularPosts.length === 0 && (
          <div className="text-center py-24 text-brand-gray/40">
            <Search size={48} className="mx-auto mb-4 opacity-20" />
            <p className="text-lg">Không tìm thấy bài viết nào phù hợp.</p>
          </div>
        )}
      </div>
    </div>
  );
};
