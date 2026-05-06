import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Home, Phone, Search } from 'lucide-react';
import { HOTLINE_DISPLAY } from '../components/Layout';

export const NotFound = () => {
  return (
    <div className="min-h-[80vh] bg-surface-bright flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-lg"
      >
        {/* Giant 404 */}
        <div className="relative mb-8">
          <h1 className="text-[10rem] font-display font-bold text-surface-dim leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search size={48} className="text-brand-orange" />
          </div>
        </div>

        <h2 className="text-2xl font-display font-bold text-brand-gray mb-4 uppercase tracking-tight">
          Trang không tồn tại
        </h2>
        <p className="text-brand-gray/60 mb-10 leading-relaxed">
          Trang bạn tìm kiếm không tồn tại hoặc đã được di chuyển. Hãy quay lại trang chủ hoặc liên hệ với chúng tôi.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center space-x-2 px-8 py-4 bg-brand-orange text-white font-bold rounded-lg hover:bg-brand-gray transition-all"
          >
            <Home size={18} />
            <span>Về Trang Chủ</span>
          </Link>
          <a
            href={`tel:${HOTLINE_DISPLAY.replace(/\s/g, '')}`}
            className="flex items-center justify-center space-x-2 px-8 py-4 bg-white border border-surface-dim text-brand-gray font-bold rounded-lg hover:bg-surface-bright transition-all"
          >
            <Phone size={18} />
            <span>{HOTLINE_DISPLAY}</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
};
