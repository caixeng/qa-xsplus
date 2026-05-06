import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Phone, MessageCircle, Send, ChevronDown, CheckCircle2 } from 'lucide-react';
import { HOTLINE, HOTLINE_DISPLAY, ZALO_URL } from './Layout';
import { saveLead } from '../lib/supabase';

interface QuoteFormData {
  name: string;
  phone: string;
  product: string;
  area: string;
  note: string;
}

const PRODUCTS = [
  'Trần nhôm Clip-in 600x600',
  'Trần nhôm Lay-in T-Bar',
  'Trần nhôm Caro Cell',
  'Hệ trần U-Shaped / B-Shaped',
  'Chưa xác định, cần tư vấn',
];

export const QuoteModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [form, setForm] = useState<QuoteFormData>({ name: '', phone: '', product: '', area: '', note: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save lead to Supabase
      await saveLead({
        name: form.name,
        phone: form.phone,
        product: form.product,
        area_m2: form.area ? parseFloat(form.area) : undefined,
        note: form.note,
        source: 'quote_modal',
      });

      setSubmitted(true);

      // Pre-filled Zalo message
      const msg = encodeURIComponent(
        `Xin chào XS Plus! Tôi muốn báo giá:\n- Tên: ${form.name}\n- SĐT: ${form.phone}\n- Sản phẩm: ${form.product || 'Chưa xác định'}\n- Diện tích: ${form.area || 'Chưa có'}m²\n- Ghi chú: ${form.note || 'Không'}`
      );

      // Auto-open Zalo after 1.5s
      setTimeout(() => {
        window.open(`${ZALO_URL}?text=${msg}`, '_blank');
      }, 1500);
    } catch (err) {
      console.error('Lead save error:', err);
      // Still show success and open Zalo even if Supabase fails
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setSubmitted(false); setForm({ name: '', phone: '', product: '', area: '', note: '' }); }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="bg-brand-orange p-6 text-white sticky top-0 z-10">
              <button onClick={handleClose} className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors">
                <X size={24} />
              </button>
              <p className="text-orange-100 text-xs font-bold uppercase tracking-widest mb-1">XS PLUS</p>
              <h2 className="text-2xl font-display font-bold">Nhận Báo Giá Miễn Phí</h2>
              <p className="text-orange-100 text-sm mt-1">Phản hồi trong 15 phút qua Zalo</p>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold text-brand-gray/60 uppercase tracking-widest block mb-1.5">
                        Họ và tên *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Nguyễn Văn A"
                        className="w-full px-4 py-3 bg-surface-bright border border-surface-dim rounded-lg focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 transition-all text-sm"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-brand-gray/60 uppercase tracking-widest block mb-1.5">
                        Số điện thoại / Zalo *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0912 345 678"
                        className="w-full px-4 py-3 bg-surface-bright border border-surface-dim rounded-lg focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 transition-all text-sm"
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-brand-gray/60 uppercase tracking-widest block mb-1.5">
                      Sản phẩm quan tâm
                    </label>
                    <div className="relative">
                      <select
                        className="w-full px-4 py-3 bg-surface-bright border border-surface-dim rounded-lg focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 transition-all text-sm appearance-none"
                        value={form.product}
                        onChange={e => setForm({ ...form, product: e.target.value })}
                      >
                        <option value="">-- Chọn dòng sản phẩm --</option>
                        {PRODUCTS.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                      <ChevronDown size={16} className="absolute right-3 top-3.5 text-brand-gray/40 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-brand-gray/60 uppercase tracking-widest block mb-1.5">
                      Diện tích thi công (m²)
                    </label>
                    <input
                      type="number"
                      placeholder="Ví dụ: 150"
                      min="1"
                      className="w-full px-4 py-3 bg-surface-bright border border-surface-dim rounded-lg focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 transition-all text-sm"
                      value={form.area}
                      onChange={e => setForm({ ...form, area: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-brand-gray/60 uppercase tracking-widest block mb-1.5">
                      Ghi chú thêm
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Mô tả dự án, yêu cầu đặc biệt..."
                      className="w-full px-4 py-3 bg-surface-bright border border-surface-dim rounded-lg focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 transition-all text-sm resize-none"
                      value={form.note}
                      onChange={e => setForm({ ...form, note: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-brand-orange text-white font-bold rounded-xl hover:bg-brand-gray transition-all flex items-center justify-center space-x-2 shadow-lg shadow-brand-orange/20 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={18} />
                        <span>GỬI YÊU CẦU BÁO GIÁ</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-brand-gray/40 text-center">
                    Thông tin của bạn được bảo mật tuyệt đối. Chúng tôi chỉ liên hệ để tư vấn báo giá.
                  </p>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="text-green-500" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-gray mb-2">Đã nhận yêu cầu!</h3>
                  <p className="text-brand-gray/60 text-sm mb-8">
                    Đang chuyển sang Zalo để xác nhận thông tin. Chúng tôi sẽ phản hồi trong <strong>15 phút</strong>.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={ZALO_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center space-x-2 py-3 bg-brand-orange text-white font-bold rounded-xl hover:bg-brand-gray transition-all"
                    >
                      <MessageCircle size={18} />
                      <span>Mở Zalo ngay</span>
                    </a>
                    <a
                      href={`tel:${HOTLINE}`}
                      className="flex-1 flex items-center justify-center space-x-2 py-3 bg-brand-gray text-white font-bold rounded-xl hover:bg-brand-gray/90 transition-all"
                    >
                      <Phone size={18} />
                      <span>Gọi {HOTLINE_DISPLAY}</span>
                    </a>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
