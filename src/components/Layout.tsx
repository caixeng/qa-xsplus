import React, { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const HOTLINE = '0378226269';
const HOTLINE_DISPLAY = '0378 226 269';
const ZALO_URL = `https://zalo.me/${HOTLINE}`;
const EMAIL = 'xsplus@gmail.com';

const TopBar = () => (
  <div className="bg-brand-gray text-white/80 py-2 text-xs hidden md:block border-b border-white/10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
      <div className="flex space-x-6">
        <span className="flex items-center"><MapPin size={14} className="mr-2 text-brand-orange" /> KCN Thạch Quý, TP. Hà Tĩnh</span>
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

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  const navLinks = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Sản phẩm', path: '/catalog' },
    { name: 'Tính vật tư', path: '/calculator' },
    { name: 'Tài liệu KT', path: '/technical' },
    { name: 'Đại lý / Thầu', path: '/portal' },
  ];

  return (
    <div className="sticky top-0 z-50 w-full flex flex-col">
      <TopBar />
      <nav className={`transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-md shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="XS PLUS - Trần Nhôm Kiến Trúc"
                className="h-14 md:h-16 w-auto object-contain"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-bold uppercase tracking-wide transition-colors hover:text-brand-orange ${
                    location.pathname === link.path ? 'text-brand-orange' : 'text-brand-gray'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <a
                href={`tel:${HOTLINE}`}
                className="px-6 py-2.5 bg-brand-orange text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-brand-gray transition-all flex items-center space-x-2"
              >
                <Phone size={14} />
                <span>Gọi Báo Giá</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-3">
              <a href={`tel:${HOTLINE}`} className="bg-brand-orange text-white p-2 rounded-sm">
                <Phone size={20} />
              </a>
              <button onClick={() => setIsOpen(!isOpen)} className="text-brand-gray p-2">
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-white border-t border-surface-dim"
            >
              <div className="flex flex-col px-4 py-6 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-base font-bold uppercase tracking-wide py-3 px-4 rounded-lg border-b border-surface-dim/30 transition-colors ${
                      location.pathname === link.path
                        ? 'text-brand-orange bg-brand-orange/5'
                        : 'text-brand-gray hover:text-brand-orange hover:bg-surface-bright'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-4 grid grid-cols-2 gap-3">
                  <a href={`tel:${HOTLINE}`}
                    className="flex items-center justify-center space-x-2 py-3 bg-brand-orange text-white font-bold rounded-lg text-sm">
                    <Phone size={16} />
                    <span>Gọi ngay</span>
                  </a>
                  <a href={ZALO_URL} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 py-3 bg-brand-gray text-white font-bold rounded-lg text-sm">
                    <MessageCircle size={16} />
                    <span>Zalo</span>
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
    <footer className="bg-brand-gray text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-12">
          <div className="space-y-4">
            <img
              src="/logo.png"
              alt="XS PLUS Logo"
              className="h-16 w-auto object-contain brightness-0 invert"
            />
            <p className="text-white/60 text-sm leading-relaxed">
              Dẫn đầu công nghệ trần nhôm kiến trúc tại Việt Nam. Xưởng sản xuất hiện đại, phân phối toàn quốc cho Đại lý, Thợ thi công và Dự án.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href={ZALO_URL} target="_blank" rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-brand-orange transition-colors rounded text-xs font-bold">
                <MessageCircle size={14} />
                <span>Zalo OA</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-medium text-lg mb-6">Liên kết nhanh</h4>
            <ul className="space-y-3 text-white/60 text-sm">
              <li><Link to="/catalog" className="hover:text-brand-orange transition-colors">Danh mục sản phẩm</Link></li>
              <li><Link to="/technical" className="hover:text-brand-orange transition-colors">Tài liệu kỹ thuật & CAD</Link></li>
              <li><Link to="/calculator" className="hover:text-brand-orange transition-colors">Công cụ tính vật tư</Link></li>
              <li><Link to="/portal" className="hover:text-brand-orange transition-colors">Cổng đại lý / Thợ thầu</Link></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Chính sách bảo hành</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-medium text-lg mb-6">Sản phẩm cốt lõi</h4>
            <ul className="space-y-3 text-white/60 text-sm">
              <li><Link to="/catalog" className="hover:text-brand-orange transition-colors">Trần nhôm Clip-in</Link></li>
              <li><Link to="/catalog" className="hover:text-brand-orange transition-colors">Trần nhôm Lay-in</Link></li>
              <li><Link to="/catalog" className="hover:text-brand-orange transition-colors">Trần nhôm Caro (Cell)</Link></li>
              <li><Link to="/catalog" className="hover:text-brand-orange transition-colors">Hệ trần U-Shaped / B-Shaped</Link></li>
              <li><Link to="/catalog" className="hover:text-brand-orange transition-colors">Phào chỉ trang trí</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-medium text-lg mb-6">Văn phòng & Nhà máy</h4>
            <ul className="space-y-4 text-white/60 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="text-brand-orange mt-1 shrink-0" size={18} />
                <span>KCN Thạch Quý, TP. Hà Tĩnh, Tỉnh Hà Tĩnh</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="text-brand-orange shrink-0" size={18} />
                <a href={`tel:${HOTLINE}`} className="hover:text-brand-orange transition-colors font-medium">{HOTLINE_DISPLAY}</a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="text-brand-orange shrink-0" size={18} />
                <a href={`mailto:${EMAIL}`} className="hover:text-brand-orange transition-colors">{EMAIL}</a>
              </li>
              <li className="flex items-center space-x-3">
                <MessageCircle className="text-brand-orange shrink-0" size={18} />
                <a href={ZALO_URL} target="_blank" rel="noopener noreferrer"
                  className="hover:text-brand-orange transition-colors">Zalo: {HOTLINE_DISPLAY}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-white/40 text-[12px]">
          <p>© 2026 TỔNG KHO NHỰA XS PLUS. All rights reserved.</p>
          <p className="mt-2 md:mt-0 font-display italic font-medium">= BỀN VỮNG CÙNG THỜI GIAN =</p>
        </div>
      </div>
    </footer>
  );
};

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

// Export constants for use in other components
export { HOTLINE, HOTLINE_DISPLAY, ZALO_URL, EMAIL };
