import { useState } from 'react';
import { useSEO } from '../hooks/useSEO';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Calendar, Ruler, ArrowRight, Building2, Phone, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HOTLINE, HOTLINE_DISPLAY, ZALO_URL } from '../components/Layout';

const PROJECTS = [
  {
    id: 1,
    title: 'Trường THPT Nguyễn Du',
    location: 'Nghệ An',
    type: 'Giáo dục',
    area: '2.800 m²',
    year: '2025',
    product: 'Trần Clip-in 600×600 — Trắng mờ',
    desc: 'Hệ trần nhôm chống ẩm cho 28 phòng học. Hoàn thành trước khai giảng đúng tiến độ.',
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Tòa nhà Văn phòng Vinaconex',
    location: 'Hà Tĩnh',
    type: 'Văn phòng',
    area: '4.200 m²',
    year: '2024',
    product: 'Trần Lay-in T-Black 600×600 + Open Grid',
    desc: 'Phối hợp Lay-in black và Open Grid cho không gian coworking 4 tầng hiện đại.',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Siêu thị GO! Hà Tĩnh',
    location: 'Hà Tĩnh',
    type: 'Thương mại',
    area: '6.500 m²',
    year: '2024',
    product: 'Trần Clip-in 600×1200 — Trắng',
    desc: 'Hệ trần lớn nhất từ trước đến nay. Cung cấp và thi công toàn bộ trong 45 ngày.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'Khách sạn Mường Thanh Grand',
    location: 'Đà Nẵng',
    type: 'Khách sạn',
    area: '1.800 m²',
    year: '2025',
    product: 'Caro Cell 100×100 + Clip-in Vàng đồng',
    desc: 'Sảnh đón và hành lang khách sạn 5 sao. Caro Cell tạo hiệu ứng kiến trúc cao cấp.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    title: 'Bệnh viện Đa khoa Quảng Bình',
    location: 'Quảng Bình',
    type: 'Y tế',
    area: '3.400 m²',
    year: '2023',
    product: 'Trần Clip-in 600×600 kháng khuẩn',
    desc: 'Trần nhôm đặc chủng kháng khuẩn cho khu ICU và hành lang bệnh viện.',
    image: 'https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    title: 'Khu dân cư Vincom Shophouse',
    location: 'Quảng Trị',
    type: 'Dân dụng',
    area: '900 m²',
    year: '2025',
    product: 'Trần Lay-in 300×1200 — Vân gỗ',
    desc: '14 căn shophouse cao cấp với hệ trần vân gỗ ấm áp. Giao hàng và lắp đặt cùng ngày.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 7,
    title: 'Nhà máy Samsung BK Hà Tĩnh',
    location: 'Hà Tĩnh',
    type: 'Công nghiệp',
    area: '8.200 m²',
    year: '2024',
    product: 'Trần Clip-in 600×600 chịu nhiệt',
    desc: 'Dự án quy mô lớn nhất khu công nghiệp Vũng Áng. Hoàn thành 90 ngày, 0 sai sót.',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 8,
    title: 'Trung tâm Hành chính TP. Hà Tĩnh',
    location: 'Hà Tĩnh',
    type: 'Hành chính',
    area: '2.100 m²',
    year: '2023',
    product: 'Trần Clip-in + Phào viền nhôm',
    desc: 'Công trình nhà nước yêu cầu tiêu chuẩn cao. Được nghiệm thu 100% lần đầu.',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 9,
    title: 'Trường Đại học Hà Tĩnh — Khu B',
    location: 'Hà Tĩnh',
    type: 'Giáo dục',
    area: '5.600 m²',
    year: '2025',
    product: 'Trần Clip-in 600×1200 + Lay-in hội trường',
    desc: 'Phủ trần toàn bộ khu giảng đường mới. Hội trường 800 chỗ dùng hệ Lay-in âm thanh.',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80',
  },
];

const TYPES = ['Tất cả', 'Giáo dục', 'Văn phòng', 'Thương mại', 'Khách sạn', 'Y tế', 'Dân dụng', 'Công nghiệp', 'Hành chính'];

export const ProjectsPage = () => {
  useSEO({
    title: 'Dự Án Trần Nhôm Tiêu Biểu | Trường học, Bệnh viện, Văn phòng',
    description: 'Danh sách công trình đã triển khai trần nhôm XS Plus trên toàn quốc: trường học, bệnh viện, trung tâm thương mại, cơ quan hành chính. Xem ảnh thực tế.',
    canonical: 'https://xsplus.vn/du-an',
  });
  const [activeType, setActiveType] = useState('Tất cả');
  const [selected, setSelected] = useState<typeof PROJECTS[0] | null>(null);

  const filtered = PROJECTS.filter(p => activeType === 'Tất cả' || p.type === activeType);

  const totalArea = PROJECTS.reduce((acc, p) => acc + parseInt(p.area.replace(/[^0-9]/g, '')), 0);

  return (
    <div className="min-h-screen bg-surface-bright">
      {/* Hero */}
      <div className="bg-brand-gray text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] select-none pointer-events-none">
          <p className="text-[200px] font-bold leading-none tracking-tighter absolute -right-4 top-0">DỰ ÁN</p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="flex items-center space-x-2 text-brand-orange mb-4 text-xs font-bold tracking-widest uppercase">
              <Building2 size={14} />
              <span>Dự án tiêu biểu</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display uppercase tracking-tighter mb-6">
              Công Trình<br /><span className="text-brand-orange">Đã Hoàn Thành</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
              Hơn 500 dự án trần nhôm từ Bắc vào Nam. Từ phòng học, văn phòng, siêu thị đến khách sạn 5 sao — mỗi công trình là minh chứng cho cam kết chất lượng XS Plus.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-brand-orange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-white text-center">
            {[
              { num: '500+', label: 'Dự án hoàn thành' },
              { num: `${(totalArea / 1000).toFixed(0)}K+`, label: 'M² đã thi công' },
              { num: '9', label: 'Loại công trình' },
              { num: '2015', label: 'Năm bắt đầu' },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-3xl font-display font-bold">{s.num}</p>
                <p className="text-white/70 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter + Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {TYPES.map(t => (
            <button
              key={t}
              onClick={() => setActiveType(t)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${activeType === t ? 'bg-brand-orange text-white' : 'bg-white text-brand-gray/60 border border-surface-dim hover:border-brand-orange hover:text-brand-orange'}`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl overflow-hidden border border-surface-dim hover:shadow-lg hover:border-brand-orange/30 transition-all group cursor-pointer"
                onClick={() => setSelected(project)}
              >
                <div className="relative overflow-hidden h-52">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-brand-orange text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">{project.type}</span>
                    <span className="bg-black/40 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded">{project.year}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white font-bold text-sm leading-tight">{project.title}</p>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1 text-brand-gray/50 text-xs">
                      <MapPin size={12} />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-brand-gray/50 text-xs">
                      <Ruler size={12} />
                      <span>{project.area}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-brand-orange font-bold uppercase tracking-wider mb-2">{project.product}</p>
                  <p className="text-brand-gray/60 text-xs leading-relaxed">{project.desc}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative h-56">
                <img src={selected.image} alt={selected.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <button onClick={() => setSelected(null)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all text-lg font-bold">
                  ×
                </button>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-brand-orange text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase mb-2 block w-fit">{selected.type}</span>
                  <h3 className="text-white font-bold text-xl">{selected.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-5">
                  {[
                    { icon: <MapPin size={14} />, label: 'Địa điểm', value: selected.location },
                    { icon: <Ruler size={14} />, label: 'Diện tích', value: selected.area },
                    { icon: <Calendar size={14} />, label: 'Năm', value: selected.year },
                  ].map((d, i) => (
                    <div key={i} className="text-center p-3 bg-surface-bright rounded-lg">
                      <div className="flex justify-center text-brand-orange mb-1">{d.icon}</div>
                      <p className="text-[10px] text-brand-gray/40 uppercase font-bold tracking-widest">{d.label}</p>
                      <p className="font-bold text-brand-gray text-sm mt-0.5">{d.value}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs font-bold text-brand-orange uppercase tracking-wider mb-1">Sản phẩm</p>
                <p className="text-sm font-semibold text-brand-gray mb-3">{selected.product}</p>
                <p className="text-sm text-brand-gray/60 leading-relaxed mb-6">{selected.desc}</p>
                <div className="flex gap-3">
                  <a href={`tel:${HOTLINE}`}
                    className="flex-1 flex items-center justify-center space-x-2 py-3 bg-brand-orange text-white font-bold rounded-lg text-xs uppercase tracking-wider hover:bg-brand-gray transition-all">
                    <Phone size={14} />
                    <span>Gọi tư vấn</span>
                  </a>
                  <a href={ZALO_URL} target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 py-3 bg-brand-gray text-white font-bold rounded-lg text-xs uppercase tracking-wider hover:bg-brand-orange transition-all">
                    <MessageCircle size={14} />
                    <span>Chat Zalo</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <div className="bg-brand-gray py-20 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <Building2 size={40} className="text-brand-orange mx-auto mb-4" />
          <h2 className="text-3xl font-display font-bold uppercase mb-4">Dự Án Của Bạn Tiếp Theo?</h2>
          <p className="text-white/60 mb-8">Gửi bản vẽ hoặc thông số kỹ thuật — nhận báo giá và tư vấn chọn sản phẩm trong 30 phút.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={ZALO_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-brand-orange text-white font-bold rounded-lg hover:bg-white hover:text-brand-orange transition-all uppercase tracking-wider text-sm">
              <MessageCircle size={18} />
              <span>Nhận Báo Giá Zalo</span>
            </a>
            <a href={`tel:${HOTLINE}`}
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white/10 border border-white/20 text-white font-bold rounded-lg hover:bg-white/20 transition-all uppercase tracking-wider text-sm">
              <Phone size={18} />
              <span>{HOTLINE_DISPLAY}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
