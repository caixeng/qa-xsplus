import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  Truck,
  Factory,
  PenTool,
  Building2,
  MapPin,
  Phone,
  MessageCircle,
  Star,
} from "lucide-react";
import { useRef } from "react";
import { QuoteModal } from "../components/QuoteModal";
import { ZALO_URL, HOTLINE_DISPLAY } from "../components/Layout";

const Hero = ({ setQuoteOpen }: { setQuoteOpen: (v: boolean) => void }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-brand-gray"
    >
      {/* Dynamic Parallax Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-gray via-brand-gray/80 to-brand-gray/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-gray/90 via-transparent to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1920&q=80"
          alt="Dự án thực tế trần nhôm kiến trúc"
          className="w-full h-full object-cover object-center opacity-60 scale-105"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 border border-white/20 rounded-sm mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
            <span className="text-white/80 text-[11px] sm:text-xs font-bold uppercase tracking-widest leading-none">
              NHÀ MÁY SẢN XUẤT TRỰC TIẾP • GIAO HÀNG THẦN TỐC
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl text-white leading-[1.1] md:leading-[1.1] font-display tracking-tighter uppercase mb-6 drop-shadow-lg">
            Giải pháp <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-500 italic drop-shadow-none pr-2">
              Trần Nhôm
            </span>{" "}
            <br />
            Cao cấp
          </h1>

          <p className="text-white/80 text-base md:text-lg font-medium mb-6 max-w-xl leading-relaxed drop-shadow-md">
            Nhà máy sản xuất trực tiếp tại Hà Tĩnh — <strong className="text-white">giá tận xưởng</strong>, giao hàng trong <strong className="text-brand-orange">24 giờ</strong>. Đáp ứng tiêu chuẩn khắt khe nhất của Chủ Đầu Tư, Tổng Thầu và KTS.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => setQuoteOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-brand-orange text-white font-bold rounded-sm flex items-center justify-center hover:bg-white hover:text-brand-orange transition-all duration-300 group uppercase tracking-wider text-xs"
            >
              Nhận Báo Giá Miễn Phí
              <ArrowRight
                size={16}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </button>
            <a
              href={ZALO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/30 text-white font-bold rounded-sm flex items-center justify-center hover:bg-white/10 transition-all duration-300 uppercase tracking-wider text-xs space-x-2"
            >
              <MessageCircle size={16} />
              <span>Tư vấn qua Zalo</span>
            </a>
          </div>
        </motion.div>

        {/* USP Mini Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          {[
            { icon: <Truck size={13} />, text: 'Giao hàng 24H' },
            { icon: <Factory size={13} />, text: 'Giá tận xưởng' },
            { icon: <ShieldCheck size={13} />, text: 'Bảo hành 20 năm' },
            { icon: <MapPin size={13} />, text: 'Nhà máy Hà Tĩnh' },
          ].map((b, i) => (
            <div key={i} className="flex items-center space-x-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/15 rounded-sm text-white/80 text-[11px] font-bold uppercase tracking-wider">
              <span className="text-brand-orange">{b.icon}</span>
              <span>{b.text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-8 sm:left-1/2 sm:-translate-x-1/2 z-20 flex flex-col sm:items-center items-start"
      >
        <span
          className="text-white/30 text-[9px] font-bold tracking-[0.2em] uppercase mb-4"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll
        </span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-brand-orange to-transparent" />
      </motion.div>
    </section>
  );
};

const PartnerMarquee = () => {
  const partners = [
    "VINACONEX", "COTECCONS", "HOA BÌNH", "DELTA", "RICONS", "NEWTECONS", "FDC", "CENTRAL", "CC1", "UDIC"
  ];
  
  // Duplicate array for seamless looping
  const marqueeItems = [...partners, ...partners];

  return (
    <section className="py-12 bg-white border-b border-surface-dim overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <p className="text-xs font-bold text-brand-gray/40 uppercase tracking-widest">
          Đối tác tin cậy của các Tổng thầu hàng đầu
        </p>
      </div>
      <div className="relative flex whitespace-nowrap">
        {/* Left gradient fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
        
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          className="flex space-x-16 sm:space-x-24 items-center px-8"
        >
          {marqueeItems.map((partner, index) => (
            <div 
              key={index} 
              className="text-2xl md:text-3xl font-display font-bold text-brand-gray/20 hover:text-brand-orange/60 transition-colors duration-300 cursor-default select-none"
            >
              {partner}
            </div>
          ))}
        </motion.div>

        {/* Right gradient fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
      </div>
    </section>
  );
};

const ProductBento = () => {
  const products = [
    {
      title: "Hệ Caro (Cell)",
      desc: "Không gian mở, sáng tạo & phong cách.",
      img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
      colSpan: "md:col-span-2",
      rowSpan: "md:row-span-2",
    },
    {
      title: "Trần Lay-in",
      desc: "Tháo lắp linh hoạt, dễ dàng bảo trì.",
      img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Trần Clip-in",
      desc: "Hệ xương chìm, tối giản & đồng nhất.",
      img: "https://images.unsplash.com/photo-1558441719-ff34b0524a24?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Hệ U-Shaped",
      desc: "Hiệu ứng sọc dọc, chiều sâu ấn tượng.",
      img: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80",
      colSpan: "md:col-span-2",
    },
  ];

  return (
    <section className="py-24 bg-surface-bright">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <div className="h-[1px] w-8 bg-brand-orange" />
              <span className="text-brand-orange text-xs font-bold uppercase tracking-widest">
                Sản Phẩm Cốt Lõi
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-brand-gray tracking-tighter uppercase font-medium">
              Sản Phẩm Nổi Bật
            </h2>
          </div>
          <Link
            to="/catalog"
            className="inline-flex items-center text-sm font-bold text-brand-gray hover:text-brand-orange uppercase tracking-wide group transition-colors"
          >
            Xem toàn bộ sản phẩm
            <ArrowUpRight
              size={16}
              className="ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px]">
          {products.map((p, i) => (
            <Link
              to="/catalog"
              key={i}
              className={`relative group overflow-hidden rounded bg-black ${p.colSpan || ""} ${p.rowSpan || ""}`}
            >
              <img
                src={p.img}
                alt={p.title}
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 group-hover:opacity-50 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 uppercase tracking-tight">
                      {p.title}
                    </h3>
                    <p className="text-white/70 text-sm hidden sm:block">
                      {p.desc}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/20">
                    <ArrowUpRight className="text-white" size={18} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedProjects = () => {
  const projects = [
    {
      name: "Trụ sở Công An Tỉnh Quảng Ninh",
      location: "Quảng Ninh",
      product: "Trần Caro Cell & Lam Chắn Nắng",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Cung Thiếu Nhi Hà Nội",
      location: "Hà Nội",
      product: "Trần Nhôm U Vân Gỗ",
      image: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Trụ sở hành chính liên cơ quan",
      location: "Đà Nẵng",
      product: "Trần Nhôm Clip-in 600x600",
      image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <div className="h-[1px] w-8 bg-brand-orange" />
              <span className="text-brand-orange text-xs font-bold uppercase tracking-widest">
                Dự Án Đã Triển Khai
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-brand-gray tracking-tighter uppercase font-medium">
              Dự Án Tiêu Biểu
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div key={idx} className="group relative">
              <div className="relative h-80 w-full overflow-hidden rounded mb-6 bg-surface-dim">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-brand-gray px-3 py-1.5 text-xs font-bold uppercase tracking-wide rounded-sm flex items-center">
                  <Building2 size={14} className="mr-2 text-brand-orange" />
                  {project.product}
                </div>
              </div>
              <h3 className="text-lg font-bold text-brand-gray mb-2 line-clamp-1 group-hover:text-brand-orange transition-colors">
                {project.name}
              </h3>
              <div className="flex items-center text-brand-gray/60 text-sm">
                <MapPin size={16} className="mr-1" />
                {project.location}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Advantages = () => {
  const items = [
    {
      num: "01",
      title: "Nhà máy trực tiếp",
      desc: "Sản xuất trực tiếp tại Hà Tĩnh, không qua trung gian. Cam kết giá xuất xưởng tốt nhất thị trường.",
      icon: <Factory size={24} />,
    },
    {
      num: "02",
      title: "Giao hàng 24h",
      desc: "Hệ thống luân chuyển chuyên nghiệp, đáp ứng thần tốc tiến độ cấp bách của dự án toàn Miền Trung.",
      icon: <Truck size={24} />,
    },
    {
      num: "03",
      title: "Tiêu chuẩn dự án",
      desc: "Vật liệu tĩnh điện cao cấp, độ ổn định cực cao. Tuổi thọ lên đến 50 năm không han gỉ.",
      icon: <ShieldCheck size={24} />,
    },
    {
      num: "04",
      title: "Hỗ trợ kỹ thuật",
      desc: "Đội ngũ kỹ sư đồng hành từ bản vẽ bóc tách, cung cấp file CAD, đến hướng dẫn thi công trực tiếp.",
      icon: <PenTool size={24} />,
    },
  ];

  return (
    <section className="py-24 bg-brand-gray text-white border-t border-surface-dim/40 relative overflow-hidden">
      {/* Decorative large text */}
      <div className="absolute top-0 right-[-5%] p-8 pt-24 select-none pointer-events-none opacity-[0.03]">
        <h2 className="text-[150px] font-bold leading-none tracking-tighter whitespace-nowrap">
          XS PLUS.
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <div className="h-[1px] w-8 bg-brand-orange" />
              <span className="text-brand-orange text-xs font-bold uppercase tracking-widest">
                Giá Trị Cốt Lõi
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-white tracking-tighter uppercase font-medium">
              Vì Sao Chọn XS Plus
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {items.map((item, i) => (
            <div
              key={i}
              className="group cursor-default relative pt-6 border-t border-white/20 hover:border-brand-orange transition-colors duration-500"
            >
              {/* Giant background number */}
              <div className="absolute -top-12 left-0 font-display font-bold text-6xl text-white/5 group-hover:text-brand-orange/20 transition-colors z-0">
                {item.num}
              </div>

              <div className="relative z-10 space-y-5">
                <div className="text-white bg-white/10 backdrop-blur w-12 h-12 flex items-center justify-center rounded-sm group-hover:bg-brand-orange transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold tracking-tight uppercase">
                  {item.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { num: '4', unit: 'Máy', label: 'Dây chuyền sản xuất hiện đại' },
    { num: '10', unit: 'Tỷ', label: 'Đầu tư thiết bị 2024' },
    { num: '500+', unit: 'Dự án', label: 'Đã hoàn thành toàn quốc' },
    { num: '20', unit: 'Năm', label: 'Bảo hành sản phẩm' },
  ];

  return (
    <section className="py-16 bg-brand-orange">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center text-white"
            >
              <div className="flex items-end justify-center space-x-1 mb-2">
                <span className="text-4xl md:text-5xl font-display font-bold">{s.num}</span>
                <span className="text-lg font-bold text-white/70 mb-1">{s.unit}</span>
              </div>
              <p className="text-white/70 text-sm">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    {
      name: 'Anh Minh Tuấn',
      role: 'Nhà thầu thi công',
      company: 'Công ty TNHH Xây Dựng Phước Thịnh',
      location: 'Nghệ An',
      text: 'Giao hàng đúng hẹn, chất lượng nhôm tốt hơn hàng Trung Quốc nhiều. Hợp tác đã 2 năm, chưa có lần nào phải bảo hành. Riêng năm 2025 đã nhập hơn 5,000m² cho các công trình tại Nghệ An.',
      stars: 5,
      projects: 12,
      avatar: 'MT',
    },
    {
      name: 'Chị Lan Anh',
      role: 'Chủ đại lý vật liệu xây dựng',
      company: 'Đại lý Vật liệu Hoàng Gia',
      location: 'Hà Tĩnh',
      text: 'Chiết khấu tốt, có nhân viên kỹ thuật hỗ trợ bóc tách khối lượng. Đặc biệt giao hàng trong tỉnh chỉ 1 ngày là lợi thế cực lớn. Khách hàng của tôi rất hài lòng với sản phẩm.',
      stars: 5,
      projects: 8,
      avatar: 'LA',
    },
    {
      name: 'KTS. Hoàng Phúc',
      role: 'Kiến trúc sư thiết kế nội thất',
      company: 'Studio HP Architecture',
      location: 'Đà Nẵng',
      text: 'Thư viện file CAD đầy đủ, dễ tích hợp vào bản vẽ. Chất lượng lớp sơn tĩnh điện rất ổn định, màu sắc đồng nhất giữa các lô hàng. Đã chỉ định XS Plus cho 6 dự án văn phòng năm 2025.',
      stars: 5,
      projects: 6,
      avatar: 'HP',
    },
  ];

  return (
    <section className="py-24 bg-surface-bright">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="h-[1px] w-8 bg-brand-orange" />
            <span className="text-brand-orange text-xs font-bold uppercase tracking-widest">Đánh Giá Khách Hàng</span>
            <div className="h-[1px] w-8 bg-brand-orange" />
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-brand-gray tracking-tighter uppercase font-medium">
            Đối Tác Nói Gì Về XS Plus
          </h2>
          <p className="text-brand-gray/50 mt-3 text-sm">Phản hồi thực tế từ nhà thầu, đại lý và kiến trúc sư đang hợp tác</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bento-card p-8 bg-white flex flex-col"
            >
              {/* Stars */}
              <div className="flex space-x-1 mb-4">
                {[...Array(r.stars)].map((_, j) => (
                  <Star key={j} size={16} className="text-brand-orange fill-brand-orange" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-brand-gray/70 text-sm leading-relaxed italic mb-6 flex-grow">"{r.text}"</p>

              {/* Projects badge */}
              <div className="flex items-center space-x-2 mb-5">
                <span className="text-[10px] font-bold bg-brand-orange/10 text-brand-orange px-2 py-1 rounded uppercase tracking-wider">
                  ✓ {r.projects} dự án hợp tác
                </span>
              </div>

              {/* Author */}
              <div className="border-t border-surface-dim pt-5 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-brand-gray text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {r.avatar}
                </div>
                <div>
                  <p className="font-bold text-brand-gray text-sm">{r.name}</p>
                  <p className="text-brand-gray/50 text-xs mt-0.5">{r.role}</p>
                  <p className="text-brand-orange text-[10px] font-bold mt-0.5 uppercase tracking-wide">{r.company} · {r.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTABanner = ({ onQuoteClick }: { onQuoteClick: () => void }) => (
  <section className="py-20 bg-brand-gray relative overflow-hidden">
    <div className="absolute inset-0 opacity-5">
      <div className="absolute top-0 right-0 text-[200px] font-bold text-white leading-none select-none">XS+</div>
    </div>
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="inline-block bg-brand-orange/20 text-brand-orange text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          Nhận mẫu vật liệu miễn phí
        </span>
        <h2 className="text-3xl md:text-5xl text-white font-display font-bold uppercase tracking-tight mb-6">
          Sẵn sàng tư vấn<br />
          <span className="text-brand-orange">cho dự án của bạn</span>
        </h2>
        <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
          Đội ngũ kỹ thuật XS Plus đồng hành từ bản vẽ đến lắp đặt. Nhận báo giá và bộ mẫu vật liệu thực tế miễn phí.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onQuoteClick}
            className="px-10 py-5 bg-brand-orange text-white font-bold rounded-lg hover:bg-white hover:text-brand-orange transition-all duration-300 uppercase tracking-wider text-sm flex items-center justify-center space-x-2 shadow-xl shadow-brand-orange/20"
          >
            <span>Nhận Báo Giá & Mẫu Vật Liệu</span>
            <ArrowRight size={18} />
          </button>
          <a
            href={`tel:${HOTLINE_DISPLAY.replace(/\s/g, '')}`}
            className="px-10 py-5 bg-white/10 border border-white/20 text-white font-bold rounded-lg hover:bg-white/20 transition-all duration-300 uppercase tracking-wider text-sm flex items-center justify-center space-x-2"
          >
            <Phone size={18} />
            <span>{HOTLINE_DISPLAY}</span>
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

const FAQSection = () => {
  const faqs = [
    {
      q: 'Môt đơn tối thiểu là bao nhiêu mét vuông?',
      a: 'XS Plus không có mức order tối thiểu cố định. Tuy nhiên, để được hưởng giá chiết khấu tốt nhất, thông thường đơn hàng từ 100m² trở lên. Liên hệ hotline để được tư vấn giá chính xác.',
    },
    {
      q: 'Giao hàng trong 24 giờ áp dụng cho khu vực nào?',
      a: 'Giao hàng 24 giờ áp dụng cho toàn bộ các tỉnh Miền Trung (Nghệ An, Hà Tĩnh, Quảng Bình, Quảng Trị, Thừa Thiên Huế, Đà Nẵng...). Các tỉnh Miền Bắc và Miền Nam giao trong 2–3 ngày qua đơn vị vận chuyển hợp tác.',
    },
    {
      q: 'Trần nhôm XS Plus có những loại nào?',
      a: 'Hai dòng chính: (1) Trần nhôm Clip-in (lắp khớp không tạo gửi, phổ biến cho văn phòng, thương mại) và (2) Trần nhôm Lay-in (lắp nằm trên xương, dễ thay thế). Ngoài ra có dòng Caro Cell đặc biệt cho công trình kiến trúc cao cấp.',
    },
    {
      q: 'Có hỗ trợ lắp đặt không?',
      a: 'XS Plus cung cấp vật tư và hướng dẫn kỹ thuật chi tiết. Đội ngũ kỹ thuật có thể tư vấn qua Zalo hoặc đến thực địa (khu vực Miền Trung). Với các dự án lớn, có thể phiếu cử thể hướng dẫn lắp đặt theo đươn hàng.',
    },
    {
      q: 'Muốn có file CAD để làm bản vẽ thiết kế thì làm thế nào?',
      a: 'Tải miễn phí tại trang Tài liệu Kỹ Thuật. Thư viện bao gồm file DWG/DXF các dòng sản phẩm chính, chi tiết cấu tạo lắp đặt, và bản vẽ mặt bằng mẫu. Đăng ký thông tin để mở khóa toàn bộ thư viện.',
    },
    {
      q: 'Thời gian bảo hành là bao lâu?',
      a: 'Bảo hành 10 năm cho tấm trần và 5 năm cho hệ xương. Đặc biệt cam kết không phai màu lớp sơn tĩnh điện trong 20 năm sử dụng trong nhà. Xem chi tiết tại trang Chính sách Bảo Hành.',
    },
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="h-[1px] w-8 bg-brand-orange" />
            <span className="text-brand-orange text-xs font-bold uppercase tracking-widest">FAQ</span>
            <div className="h-[1px] w-8 bg-brand-orange" />
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-brand-gray tracking-tighter uppercase font-medium">
            Câu Hỏi Thường Gặp
          </h2>
          <p className="text-brand-gray/50 mt-3 text-sm">Giải đáp nhanh — còn thắc mắc, gọi Hotline ngay</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="border border-surface-dim rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-surface-bright transition-colors"
              >
                <span className="font-bold text-brand-gray text-sm pr-4">{faq.q}</span>
                <span className={`text-brand-orange shrink-0 transition-transform duration-300 ${openIdx === i ? 'rotate-45' : ''}`}>
                  <ArrowRight size={16} />
                </span>
              </button>
              {openIdx === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-5 pb-5"
                >
                  <p className="text-brand-gray/70 text-sm leading-relaxed border-t border-surface-dim pt-4">{faq.a}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Home = () => {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <div className="bg-surface-bright">
      <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
      <Hero setQuoteOpen={setQuoteOpen} />
      <Stats />
      <PartnerMarquee />
      <ProductBento />
      <FeaturedProjects />
      <Advantages />
      <Testimonials />
      <FAQSection />
      <CTABanner onQuoteClick={() => setQuoteOpen(true)} />
    </div>
  );
};
