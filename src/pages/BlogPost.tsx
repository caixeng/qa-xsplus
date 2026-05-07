import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';

const BLOG_POSTS: Record<string, any> = {
  'so-sanh-tran-nhom-clip-in-va-lay-in': {
    title: 'So sánh chi tiết Trần Nhôm Clip-in và Lay-in: Ưu nhược điểm và Ứng dụng',
    category: 'Kiến thức kỹ thuật',
    author: 'XS Plus Engineering',
    date: '10/05/2026',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
    content: `
      <h2>1. Tổng quan về hệ trần nhôm</h2>
      <p>Trần nhôm đang trở thành xu hướng thiết kế chủ đạo trong các công trình hiện đại nhờ ưu điểm về độ bền, khả năng chống cháy và tính thẩm mỹ cao. Hai hệ trần phổ biến nhất hiện nay là Clip-in (trần chìm) và Lay-in (trần thả).</p>
      
      <h2>2. Trần nhôm Clip-in (Hệ trần chìm)</h2>
      <p>Trần Clip-in sử dụng hệ khung xương chìm, các tấm trần được kẹp vào khung xương. Đặc điểm nổi bật của hệ trần này là tạo ra một mặt phẳng hoàn toàn, không lộ khung xương.</p>
      <ul>
        <li><strong>Ưu điểm:</strong> Tính thẩm mỹ rất cao, tạo không gian liền mạch. Chống bám bụi tốt do không có khe hở. Thích hợp cho môi trường cần độ sạch cao như bệnh viện, phòng thí nghiệm.</li>
        <li><strong>Nhược điểm:</strong> Thi công và tháo lắp bảo trì hệ thống điện/nước phía trên phức tạp hơn so với trần thả.</li>
      </ul>

      <h2>3. Trần nhôm Lay-in (Hệ trần thả)</h2>
      <p>Trần Lay-in sử dụng hệ khung xương nổi (thường là khung T-Black hoặc T-White). Tấm trần được đặt trực tiếp lên hệ khung này.</p>
      <ul>
        <li><strong>Ưu điểm:</strong> Dễ dàng thi công, sửa chữa và thay thế. Việc tiếp cận hệ thống kỹ thuật phía trên trần rất thuận tiện. Giá thành thi công thường rẻ hơn Clip-in.</li>
        <li><strong>Nhược điểm:</strong> Lộ hệ khung xương (tuy nhiên nhiều kiến trúc sư lại thích tận dụng hệ xương đen để làm điểm nhấn).</li>
      </ul>

      <h2>4. Lời khuyên từ chuyên gia XS Plus</h2>
      <p>Việc lựa chọn giữa Clip-in và Lay-in phụ thuộc vào yêu cầu cụ thể của từng khu vực. Đối với sảnh lớn, phòng họp cần sự liền mạch sang trọng, hãy chọn Clip-in. Đối với khu vực văn phòng mở, hành lang cần thường xuyên bảo trì hệ thống MEP, Lay-in là sự lựa chọn hoàn hảo.</p>
    `
  }
};

export const BlogPost = () => {
  const { id } = useParams();
  const post = id ? BLOG_POSTS[id] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen bg-surface-bright pt-32 pb-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-brand-gray mb-4">Bài viết đang được cập nhật</h2>
          <Link to="/tin-tuc" className="text-brand-orange hover:underline">Quay lại trang Tin tức</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-bright pt-24 pb-24">
      {/* Hero Image */}
      <div className="w-full h-[400px] md:h-[500px] relative">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-bright via-surface-bright/50 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 -mt-32 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Post Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-surface-dim mb-12"
          >
            <div className="flex items-center space-x-4 mb-6 text-xs font-bold text-brand-gray/40 uppercase tracking-widest">
              <span className="flex items-center text-brand-orange"><Tag size={14} className="mr-2"/> {post.category}</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-display font-bold text-brand-gray mb-8 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-between pt-6 border-t border-surface-dim gap-4">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-sm font-medium text-brand-gray/60">
                  <User size={16} />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm font-medium text-brand-gray/60">
                  <Calendar size={16} />
                  <span>{post.date}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="text-xs font-bold text-brand-gray/40 uppercase tracking-widest">Chia sẻ:</span>
                <button className="w-8 h-8 rounded-full bg-surface-dim flex items-center justify-center text-brand-gray hover:bg-brand-orange hover:text-white transition-colors">
                  <Facebook size={14} />
                </button>
                <button className="w-8 h-8 rounded-full bg-surface-dim flex items-center justify-center text-brand-gray hover:bg-brand-orange hover:text-white transition-colors">
                  <Twitter size={14} />
                </button>
                <button className="w-8 h-8 rounded-full bg-surface-dim flex items-center justify-center text-brand-gray hover:bg-brand-orange hover:text-white transition-colors">
                  <Linkedin size={14} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Post Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="prose prose-lg prose-headings:font-display prose-headings:text-brand-gray prose-a:text-brand-orange hover:prose-a:text-brand-orange/80 prose-img:rounded-xl max-w-none mb-16"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Navigation */}
          <div className="flex justify-center border-t border-surface-dim pt-12">
            <Link 
              to="/tin-tuc"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-white border border-surface-dim rounded-full text-brand-gray font-bold hover:border-brand-orange hover:text-brand-orange transition-all"
            >
              <ArrowLeft size={18} />
              <span>Quay lại Trang Tin tức</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
