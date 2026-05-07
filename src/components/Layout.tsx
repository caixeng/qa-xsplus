import React, { ReactNode, useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, MessageCircle, ChevronDown, FileText, Calculator, Newspaper } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const HOTLINE = '0378226269';
export const HOTLINE_DISPLAY = '0378 226 269';
export const ZALO_URL = `https://zalo.me/${HOTLINE}`;
const EMAIL = 'xsplus@gmail.com';

const TopBar = () => (
  <div className="bg-brand-gray text-white/80 py-2 text-xs hidden md:block border-b border-white/10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
      <div className="flex space-x-6">
        <span className="flex items-center"><MapPin size={14} className="mr-2 text-brand-orange" /> 319 Trần Phú, Thạch Linh, Tp. Hà Tĩnh</span>
        <span className="flex items-center"><Mail size={14} className="mr-2 text-brand-orange" /> {EMAIL}</span>
      </div>
      <div className="flex items-center space-x-4">
        <a href={ZALO_URL} target="_blank" rel="noopener noreferrer"
          className="flex items-center space-x-1 text-white/70 hover:text-brand-orange transition-colors">
          <MessageCircle size={14} />
          <span>Zalo tư vấn</span>
        </a>
        <a href={`tel:${HOTLINE}`} className="flex items-center font-bold text-white hover:text-brand-orange transition-colors">
          <Phone size={14} className="mr-2 text-brand-orange" />
          Hotline: {HOTLINE_DISPLAY}
        </a>
      </div>
    </div>
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  const navLinks = [
    { name: 'Sản phẩm', path: '/catalog' },
    { name: 'Dự án', path: '/du-an' },
    { name: 'Về XS Plus', path: '/gioi-thieu' },
    { name: 'Liên hệ', path: '/contact' },
    { name: 'Đại lý / Thầu', path: '/portal' },
  ];

  const supportLinks = [
    { name: 'Tài liệu Kỹ thuật CAD', path: '/technical', icon: <FileText size={14} /> },
    { name: 'Tính Vật Tư Tự Động', path: '/calculator', icon: <Calculator size={14} /> },
    { name: 'Tin Tức & Blog', path: '/tin-tuc', icon: <Newspaper size={14} /> },
  ];

  const [supportOpen, setSupportOpen] = useState(false);
  const supportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (supportRef.current && !supportRef.current.contains(e.target as Node)) {
        setSupportOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="sticky top-0 z-50 w-full">
      <TopBar />
      <nav className={`transition-all duration-500 ${scrolled ? 'bg-white shadow-xl py-3' : 'bg-white/95 backdrop-blur-md shadow-sm py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-full">
            {/* Logo Group */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <img
                  src="/logo.png"
                  alt="XS PLUS"
                  className={`transition-all duration-500 object-contain ${scrolled ? 'h-14' : 'h-16 sm:h-20'}`}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-display font-black tracking-tighter text-brand-gray group-hover:text-brand-orange transition-colors">
                  XS PLUS<span className="text-brand-orange">.</span>
                </span>
                <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-brand-gray/40 leading-none">
                  Nhà Máy Trần Nhôm Cao Cấp
                </span>
              </div>
            </Link>

            {/* Desktop Nav - Break at LG for tablets */}
            <div className="hidden lg:flex items-center space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[12px] font-bold uppercase tracking-widest transition-all hover:text-brand-orange relative group ${
                    location.pathname === link.path ? 'text-brand-orange' : 'text-brand-gray/70'
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-2 left-0 h-0.5 bg-brand-orange transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              ))}

              {/* Hỗ trợ Dropdown */}
              <div ref={supportRef} className="relative">
                <button
                  onClick={() => setSupportOpen(!supportOpen)}
                  className={`text-[12px] font-bold uppercase tracking-widest transition-all hover:text-brand-orange flex items-center space-x-1 ${
                    supportLinks.some(l => location.pathname === l.path) ? 'text-brand-orange' : 'text-brand-gray/70'
                  }`}
                >
                  <span>Hỗ trợ</span>
                  <ChevronDown size={12} className={`transition-transform duration-200 ${supportOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {supportOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 bg-white rounded-xl shadow-2xl border border-surface-dim overflow-hidden z-50"
                    >
                      {supportLinks.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          onClick={() => setSupportOpen(false)}
                          className={`flex items-center space-x-3 px-4 py-3 text-[12px] font-bold uppercase tracking-wider transition-colors hover:bg-surface-bright hover:text-brand-orange ${
                            location.pathname === link.path ? 'text-brand-orange bg-surface-bright' : 'text-brand-gray/70'
                          }`}
                        >
                          <span className="text-brand-orange">{link.icon}</span>
                          <span>{link.name}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a
                href={`tel:${HOTLINE}`}
                className="px-8 py-3 bg-brand-orange text-white text-[11px] font-bold uppercase tracking-widest rounded-sm hover:bg-brand-gray transition-all shadow-lg shadow-brand-orange/20 flex items-center space-x-2"
              >
                <Phone size={14} />
                <span>Gọi Báo Giá</span>
              </a>
            </div>

            {/* Tablet/Mobile Actions */}
            <div className="lg:hidden flex items-center space-x-4">
              <a href={ZALO_URL} target="_blank" rel="noopener noreferrer" className="hidden sm:flex w-10 h-10 bg-brand-gray text-white rounded-full items-center justify-center hover:bg-brand-orange transition-colors">
                <MessageCircle size={18} />
              </a>
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="p-2 text-brand-gray hover:bg-surface-dim/20 rounded-sm transition-colors border border-brand-gray/10"
              >
                {isOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              className="lg:hidden overflow-hidden bg-white border-t border-surface-dim shadow-2xl"
            >
              <div className="flex flex-col px-6 py-10 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-lg font-bold uppercase tracking-wider py-4 px-6 rounded-xl transition-all ${
                      location.pathname === link.path
                        ? 'text-brand-orange bg-brand-orange/5'
                        : 'text-brand-gray hover:text-brand-orange hover:bg-surface-bright'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="border-t border-surface-dim pt-4">
                  <p className="text-[10px] font-bold text-brand-gray/40 uppercase tracking-widest px-6 mb-2">Hỗ trợ kỹ thuật</p>
                  {supportLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`flex items-center space-x-3 text-base font-bold uppercase tracking-wider py-3 px-6 rounded-xl transition-all ${
                        location.pathname === link.path
                          ? 'text-brand-orange bg-brand-orange/5'
                          : 'text-brand-gray hover:text-brand-orange hover:bg-surface-bright'
                      }`}
                    >
                      <span className="text-brand-orange">{link.icon}</span>
                      <span>{link.name}</span>
                    </Link>
                  ))}
                </div>
                <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a href={`tel:${HOTLINE}`}
                    className="flex items-center justify-center space-x-3 py-5 bg-brand-orange text-white font-bold rounded-xl text-base shadow-xl shadow-brand-orange/20">
                    <Phone size={20} />
                    <span>GỌI BÁO GIÁ NGAY</span>
                  </a>
                  <a href={ZALO_URL} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-3 py-5 bg-brand-gray text-white font-bold rounded-xl text-base">
                    <MessageCircle size={20} />
                    <span>ZALO TƯ VẤN</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-gray text-white pt-24 pb-12 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-orange/5 -skew-x-12 translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16 border-b border-white/10 pb-20">
          <div className="space-y-10">
            <Link to="/" className="flex items-center space-x-3 group">
              <img src="/logo.png" alt="XS Plus" className="h-16 brightness-0 invert" />
              <div className="flex flex-col">
                <span className="text-2xl font-display font-black tracking-tighter">
                  XS PLUS<span className="text-brand-orange">.</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                  Nhà Máy Trần Nhôm Cao Cấp
                </span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Đơn vị tiên phong cung cấp giải pháp Marketing AEC và sản xuất phân phối hệ thống Trần Nhôm cao cấp tại Việt Nam.
            </p>
            <div className="flex flex-col space-y-3">
              <a
                href={ZALO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 px-5 py-3 bg-white/5 border border-white/10 rounded-sm hover:bg-brand-orange hover:border-brand-orange transition-all duration-300 group"
              >
                <MessageCircle size={18} className="text-brand-orange group-hover:text-white transition-colors" />
                <span className="text-white/70 text-sm font-medium group-hover:text-white transition-colors">Zalo tư vấn ngay</span>
              </a>
              <a
                href={`tel:${HOTLINE}`}
                className="flex items-center space-x-3 px-5 py-3 bg-white/5 border border-white/10 rounded-sm hover:bg-brand-orange hover:border-brand-orange transition-all duration-300 group"
              >
                <Phone size={18} className="text-brand-orange group-hover:text-white transition-colors" />
                <span className="text-white/70 text-sm font-medium group-hover:text-white transition-colors">{HOTLINE_DISPLAY}</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-[0.2em] text-[11px] mb-10 border-l-2 border-brand-orange pl-5">
              Hệ thống sản phẩm
            </h4>
            <ul className="space-y-5 text-white/60 text-sm">
              <li><Link to="/catalog" className="hover:text-brand-orange hover:pl-2 transition-all duration-300">Trần Nhôm Clip-in 600x600</Link></li>
              <li><Link to="/catalog" className="hover:text-brand-orange hover:pl-2 transition-all duration-300">Trần Nhôm Lay-in T-Black</Link></li>
              <li><Link to="/catalog" className="hover:text-brand-orange hover:pl-2 transition-all duration-300">Trần Nhôm Caro (Cell)</Link></li>
              <li><Link to="/catalog" className="hover:text-brand-orange hover:pl-2 transition-all duration-300">Lam Chắn Nắng Chữ C / U</Link></li>
              <li><Link to="/catalog" className="hover:text-brand-orange hover:pl-2 transition-all duration-300">Tấm ốp hợp kim Nhôm</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-[0.2em] text-[11px] mb-10 border-l-2 border-brand-orange pl-5">
              Hỗ trợ khách hàng
            </h4>
            <ul className="space-y-5 text-white/60 text-sm">
              <li><Link to="/technical" className="hover:text-brand-orange hover:pl-2 transition-all duration-300">Tài liệu kỹ thuật (CAD/PDF)</Link></li>
              <li><Link to="/calculator" className="hover:text-brand-orange hover:pl-2 transition-all duration-300">Tính toán vật tư tự động</Link></li>
              <li><Link to="/du-an" className="hover:text-brand-orange hover:pl-2 transition-all duration-300">Dự án đã triển khai</Link></li>
              <li><Link to="/portal" className="hover:text-brand-orange hover:pl-2 transition-all duration-300">Cổng thông tin Đại lý</Link></li>
              <li><Link to="/contact" className="hover:text-brand-orange hover:pl-2 transition-all duration-300">Yêu cầu bảo hành</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-[0.2em] text-[11px] mb-10 border-l-2 border-brand-orange pl-5">
              Thông tin liên hệ
            </h4>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <MapPin className="text-brand-orange shrink-0 mt-1" size={20} />
                <p className="text-white/60 text-sm leading-snug">
                  Showroom: 319 Trần Phú, Thạch Linh, Tp. Hà Tĩnh
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="text-brand-orange shrink-0" size={20} />
                <a href={`tel:${HOTLINE}`} className="text-white font-black text-lg tracking-tight hover:text-brand-orange transition-colors">
                  {HOTLINE_DISPLAY}
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="text-brand-orange shrink-0" size={20} />
                <a href={`mailto:${EMAIL}`} className="text-white/60 text-sm hover:text-brand-orange transition-colors">
                  {EMAIL}
                </a>
              </div>
              <div className="pt-4">
                <div className="bg-white/5 p-5 rounded-sm border border-white/10 hover:border-brand-orange/50 transition-colors">
                  <p className="text-[10px] text-white/40 uppercase font-black tracking-[0.2em] mb-2">Hỗ trợ đối tác 24/7</p>
                  <p className="text-brand-orange font-black text-xl italic uppercase">Giao hàng 24H</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Google Maps (Dark Styled) */}
        <div className="mt-12 rounded-2xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-700">
          <iframe
            src="https://maps.google.com/maps?q=319+Tr%E1%BA%A7n+Ph%C3%BA%2C+Th%E1%BA%A1ch+Linh%2C+th%C3%A0nh+ph%E1%BB%91+H%C3%A0+T%C4%A9nh%2C+H%C3%A0+T%C4%A9nh&t=&z=17&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="300"
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.9) contrast(1.1)' }}
            allowFullScreen
            loading="lazy"
            title="XS Plus Location"
          />
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <p className="text-white/30 text-[11px] font-bold uppercase tracking-[0.3em]">
            © 2026 XS Plus — Nhà Máy Trần Nhôm Hà Tĩnh. All Rights Reserved.
          </p>
          <div className="flex space-x-10 text-white/30 text-[11px] font-bold uppercase tracking-widest">
            <Link to="/chinh-sach" className="hover:text-brand-orange transition-colors">Chính sách bảo mật</Link>
            <Link to="/chinh-sach" className="hover:text-brand-orange transition-colors">Điều khoản sử dụng</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen bg-surface-bright">
      <Navbar />
      <main className="flex-grow w-full flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
};
