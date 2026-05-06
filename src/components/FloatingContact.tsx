import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageCircle, FileText, X, ChevronUp } from 'lucide-react';
import { HOTLINE, HOTLINE_DISPLAY, ZALO_URL } from './Layout';
import { QuoteModal } from './QuoteModal';

export const FloatingContact = () => {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Show after 3 seconds
    const timer = setTimeout(() => setVisible(true), 3000);
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 500);
      // Auto-expand on first appear
      if (window.scrollY > 200 && !expanded) setExpanded(false);
    };
    window.addEventListener('scroll', onScroll);
    return () => { clearTimeout(timer); window.removeEventListener('scroll', onScroll); };
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.1 }}
            className="fixed right-4 bottom-6 z-50 flex flex-col items-end space-y-3"
          >
            {/* Scroll to top */}
            <AnimatePresence>
              {showScrollTop && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={scrollTop}
                  className="w-10 h-10 bg-white border border-surface-dim text-brand-gray rounded-full flex items-center justify-center shadow-md hover:bg-surface-bright transition-colors"
                  title="Lên đầu trang"
                >
                  <ChevronUp size={18} />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Action Buttons — expandable */}
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  className="flex flex-col items-end space-y-2"
                >
                  {/* Zalo */}
                  <a
                    href={ZALO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center space-x-2"
                  >
                    <span className="bg-white text-brand-gray text-xs font-bold px-3 py-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-surface-dim">
                      Chat Zalo ngay
                    </span>
                    <div className="w-12 h-12 bg-[#0068FF] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      <MessageCircle size={22} />
                    </div>
                  </a>

                  {/* Báo giá */}
                  <button
                    onClick={() => { setQuoteOpen(true); setExpanded(false); }}
                    className="group flex items-center space-x-2"
                  >
                    <span className="bg-white text-brand-gray text-xs font-bold px-3 py-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-surface-dim">
                      Nhận báo giá miễn phí
                    </span>
                    <div className="w-12 h-12 bg-brand-gray text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      <FileText size={20} />
                    </div>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main CTA — Hotline button */}
            <motion.div className="flex items-center space-x-2">
              {/* Pulse ring */}
              {!expanded && (
                <motion.span
                  animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute w-14 h-14 rounded-full bg-brand-orange/30"
                />
              )}
              <button
                onClick={() => setExpanded(!expanded)}
                className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ${
                  expanded ? 'bg-brand-gray rotate-45' : 'bg-brand-orange hover:scale-110'
                }`}
                title={expanded ? 'Đóng' : 'Liên hệ ngay'}
              >
                {expanded ? <X size={22} className="text-white" /> : <Phone size={22} className="text-white" />}
              </button>
            </motion.div>

            {/* Call label */}
            {!expanded && (
              <motion.a
                href={`tel:${HOTLINE}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-brand-orange text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md hover:bg-brand-gray transition-colors whitespace-nowrap"
              >
                {HOTLINE_DISPLAY}
              </motion.a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
