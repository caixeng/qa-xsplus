import React from 'react';
import { useSEO } from '../hooks/useSEO';
import { motion } from 'motion/react';
import { Factory, Users, Award, MapPin, Phone, MessageCircle, CheckCircle2, TrendingUp, Globe, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HOTLINE_DISPLAY, HOTLINE, ZALO_URL } from '../components/Layout';

const TimelineItem = ({ year, title, desc, isRight }: { year: string; title: string; desc: string; isRight?: boolean }) => (
  <div className={`flex ${isRight ? 'flex-row-reverse' : 'flex-row'} gap-8 items-center`}>
    <div className={`flex-1 ${isRight ? 'text-left' : 'text-right'}`}>
      <span className="text-brand-orange text-xs font-bold uppercase tracking-widest">{year}</span>
      <h3 className="text-lg font-bold text-brand-gray mt-1">{title}</h3>
      <p className="text-brand-gray/60 text-sm mt-1 leading-relaxed">{desc}</p>
    </div>
    <div className="shrink-0 w-4 h-4 bg-brand-orange rounded-full border-4 border-white shadow-md z-10" />
    <div className="flex-1" />
  </div>
);

export const AboutPage = () => {
  useSEO({
    title: 'Về XS Plus | Nhà Máy Trần Nhôm Hà Tĩnh',
    description: 'Câu chuyện thương hiệu XS Plus — nhà máy sản xuất trần nhôm kiến trúc cao cấp tại Hà Tĩnh. Hơn 500 dự án, đối tác của các Tổng thầu hàng đầu Việt Nam.',
    canonical: 'https://xsplus.vn/gioi-thieu',
  });
  const values = [
    {
      icon: <Factory size={24} />,
      title: 'Sản xuất trực tiếp',
      desc: 'Không qua trung gian. Toàn bộ sản phẩm được sản xuất tại nhà máy Hà Tĩnh — kiểm soát chất lượng 100% từ khâu nguyên liệu đến thành phẩm.',
    },
    {
      icon: <Zap size={24} />,
      title: 'Giao hàng thần tốc',
      desc: 'Cam kết giao hàng trong 24 giờ cho khu vực Miền Trung. Hệ thống kho vận chuyên nghiệp phục vụ tiến độ khắt khe nhất.',
    },
    {
      icon: <Users size={24} />,
      title: 'Đồng hành kỹ thuật',
      desc: 'Đội ngũ kỹ sư đồng hành từ bản vẽ CAD, bóc tách khối lượng đến hướng dẫn thi công tại công trình.',
    },
    {
      icon: <Award size={24} />,
      title: 'Chất lượng dự án',
      desc: 'Sơn tĩnh điện cao cấp, bảo hành không rỉ sét 20 năm. Đáp ứng tiêu chuẩn cho các dự án công trình nhà nước và tư nhân quy mô lớn.',
    },
  ];

  const stats = [
    { num: '2015', label: 'Năm thành lập' },
    { num: '500+', label: 'Dự án hoàn thành' },
    { num: '4', label: 'Dây chuyền sản xuất' },
    { num: '10 tỷ', label: 'Đầu tư thiết bị mới nhất' },
  ];

  return (
    <div className="min-h-screen bg-surface-bright">
      {/* Hero */}
      <div className="bg-brand-gray text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] select-none pointer-events-none">
          <p className="text-[200px] font-bold leading-none tracking-tighter absolute -right-8 top-0">XS+</p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="flex items-center space-x-2 text-brand-orange mb-4 text-xs font-bold tracking-widest uppercase">
              <Factory size={14} />
              <span>Nhà máy sản xuất tại Hà Tĩnh</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display uppercase tracking-tighter mb-6">
              Về Chúng Tôi
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
              XS Plus là nhà máy sản xuất trần nhôm kiến trúc cao cấp tại Hà Tĩnh, phân phối toàn quốc cho Đại lý, Nhà thầu và Kiến trúc sư. Được thành lập từ 2015, chúng tôi đã hoàn thành hơn 500 dự án từ Bắc vào Nam với cam kết chất lượng và tốc độ giao hàng hàng đầu Miền Trung.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-brand-orange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-white text-center">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-3xl md:text-4xl font-display font-bold">{s.num}</p>
                <p className="text-white/70 text-sm mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission & Values */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="h-[1px] w-8 bg-brand-orange" />
              <span className="text-brand-orange text-xs font-bold uppercase tracking-widest">Giá trị cốt lõi</span>
              <div className="h-[1px] w-8 bg-brand-orange" />
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-brand-gray tracking-tighter uppercase font-medium">
              Tại Sao Đối Tác Chọn XS Plus
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl p-8 border border-surface-dim flex space-x-5"
              >
                <div className="w-12 h-12 bg-brand-orange/10 rounded-lg flex items-center justify-center text-brand-orange shrink-0">
                  {v.icon}
                </div>
                <div>
                  <h3 className="font-bold text-brand-gray text-lg mb-2">{v.title}</h3>
                  <p className="text-brand-gray/60 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* History Timeline */}
      <div className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="h-[1px] w-8 bg-brand-orange" />
              <span className="text-brand-orange text-xs font-bold uppercase tracking-widest">Hành trình</span>
              <div className="h-[1px] w-8 bg-brand-orange" />
            </div>
            <h2 className="text-2xl md:text-3xl text-brand-gray tracking-tighter uppercase font-medium">
              Các Cột Mốc Phát Triển
            </h2>
          </div>

          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-surface-dim" />
            <div className="space-y-12">
              {[
                { year: '2015', title: 'Thành lập XS Plus', desc: 'Xưởng sản xuất nhỏ tại Hà Tĩnh với dây chuyền đầu tiên. Phục vụ thị trường tỉnh nhà.', isRight: false },
                { year: '2018', title: 'Mở rộng phân phối Miền Trung', desc: 'Phủ sóng 13 tỉnh thành Miền Trung. Ra mắt hệ thống đại lý chính thức.', isRight: true },
                { year: '2021', title: 'Đầu tư nhà máy mới', desc: 'Nâng cấp lên 3 dây chuyền sản xuất hiện đại. Bắt đầu cung ứng dự án quy mô lớn cho nhà thầu toàn quốc.', isRight: false },
                { year: '2024', title: 'Bứt phá 10 tỷ đầu tư', desc: 'Đầu tư thêm máy dập CNC và máy sơn tĩnh điện thế hệ mới trị giá 10 tỷ đồng. Năng suất tăng 3 lần.', isRight: true },
                { year: '2025', title: '500+ dự án hoàn thành', desc: 'Cột mốc 500 dự án từ Bắc vào Nam. Ra mắt hệ thống đại lý online và công cụ bóc tách tự động.', isRight: false },
              ].map(({ year, title, desc, isRight }, i) => (
                <React.Fragment key={i}>
                  <TimelineItem year={year} title={title} desc={desc} isRight={isRight} />
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Location & Map */}
      <div className="py-24 bg-surface-bright">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-[1px] w-8 bg-brand-orange" />
                <span className="text-brand-orange text-xs font-bold uppercase tracking-widest">Địa chỉ</span>
              </div>
              <h2 className="text-2xl md:text-3xl text-brand-gray tracking-tighter uppercase font-medium mb-8">
                Nhà Máy & Văn Phòng
              </h2>

              <div className="space-y-6">
                {[
                  {
                    icon: <MapPin size={20} />,
                    title: 'Địa chỉ',
                    value: '319 Trần Phú, Thạch Linh, TP. Hà Tĩnh, Hà Tĩnh',
                  },
                  {
                    icon: <Phone size={20} />,
                    title: 'Hotline',
                    value: HOTLINE_DISPLAY,
                    href: `tel:${HOTLINE}`,
                  },
                  {
                    icon: <MessageCircle size={20} />,
                    title: 'Zalo tư vấn',
                    value: `Zalo: ${HOTLINE_DISPLAY}`,
                    href: ZALO_URL,
                  },
                  {
                    icon: <Globe size={20} />,
                    title: 'Giờ làm việc',
                    value: 'Thứ 2 – Thứ 7: 07:30 – 17:30',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-brand-orange/10 rounded-lg flex items-center justify-center text-brand-orange shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-brand-gray/40 uppercase tracking-widest mb-0.5">{item.title}</p>
                      {item.href ? (
                        <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                          className="font-semibold text-brand-gray hover:text-brand-orange transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-semibold text-brand-gray">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <a
                  href={`tel:${HOTLINE}`}
                  className="flex items-center justify-center space-x-2 px-6 py-4 bg-brand-orange text-white font-bold rounded-lg hover:bg-brand-gray transition-all uppercase tracking-wider text-sm"
                >
                  <Phone size={18} />
                  <span>Gọi ngay</span>
                </a>
                <a
                  href={ZALO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 px-6 py-4 bg-brand-gray text-white font-bold rounded-lg hover:bg-brand-orange transition-all uppercase tracking-wider text-sm"
                >
                  <MessageCircle size={18} />
                  <span>Chat Zalo</span>
                </a>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="rounded-2xl overflow-hidden shadow-xl border border-surface-dim">
              <div className="relative h-[400px]">
                <iframe
                  src="https://maps.google.com/maps?q=319+Tr%E1%BA%A7n+Ph%C3%BA%2C+Th%E1%BA%A1ch+Linh%2C+th%C3%A0nh+ph%E1%BB%91+H%C3%A0+T%C4%A9nh%2C+H%C3%A0+T%C4%A9nh&t=&z=17&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bản đồ Nhà Máy Trần Nhôm XS Plus - 319 Trần Phú, Thạch Linh, Hà Tĩnh"
                />
              </div>
              {/* Action bar bên dưới map */}
              <div className="bg-white flex items-center justify-between px-5 py-3 border-t border-surface-dim">
                <div>
                  <p className="text-xs font-bold text-brand-gray">Nhà Máy XS Plus</p>
                  <p className="text-[11px] text-brand-gray/50">319 Trần Phú, Thạch Linh, TP. Hà Tĩnh</p>
                </div>
                <div className="flex gap-2">
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=319+Tr%E1%BA%A7n+Ph%C3%BA%2C+Th%E1%BA%A1ch+Linh%2C+H%C3%A0+T%C4%A9nh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-4 py-2 bg-brand-orange text-white text-xs font-bold rounded-lg hover:bg-brand-gray transition-all uppercase tracking-wider"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
                    <span>Chỉ đường</span>
                  </a>
                  <a
                    href="https://www.google.com/maps/search/319+Tr%E1%BA%A7n+Ph%C3%BA%2C+Th%E1%BA%A1ch+Linh%2C+H%C3%A0+T%C4%A9nh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-4 py-2 bg-surface-dim text-brand-gray text-xs font-bold rounded-lg hover:bg-surface-bright border border-surface-dim transition-all uppercase tracking-wider"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    <span>Xem lớn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-brand-gray py-20 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <TrendingUp size={40} className="text-brand-orange mx-auto mb-4" />
          <h2 className="text-3xl font-display font-bold uppercase mb-4">Trở Thành Đối Tác XS Plus</h2>
          <p className="text-white/60 mb-8">
            Hệ thống đại lý và nhà thầu đang phát triển nhanh tại Miền Trung và Miền Bắc. Liên hệ để nhận chính sách chiết khấu ưu đãi.
          </p>
          <Link
            to="/portal"
            className="inline-flex items-center space-x-2 px-10 py-4 bg-brand-orange text-white font-bold rounded-lg hover:bg-white hover:text-brand-orange transition-all uppercase tracking-wider text-sm"
          >
            <span>Đăng ký Đại lý / Nhà thầu</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
