import React, { useState } from 'react';
import { useSEO } from '../hooks/useSEO';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Download, Lock, X, CheckCircle, Phone, User, Building, ExternalLink, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import { saveLead } from '../lib/supabase';
import { HOTLINE, HOTLINE_DISPLAY, ZALO_URL } from '../components/Layout';

const DOCUMENTS = [
  { id: 'cad-clipin', title: 'File AutoCAD Trần Clip-in 600x600', type: 'DWG / DXF', category: 'CAD', url: '/docs/XS_Plus_Technical_Spec.pdf' },
  { id: 'spec-layin', title: 'Thông số kỹ thuật Trần Lay-in', type: 'PDF', category: 'Specs', url: null },
  { id: 'guide-caro', title: 'Hướng dẫn lắp đặt Trần Caro (Cell)', type: 'PDF / Video', category: 'Guide', url: null },
  { id: 'cat-main', title: 'Catalog Tổng Hợp 2025 XS PLUS', type: 'PDF', category: 'Catalog', url: null },
  { id: 'spec-ushape', title: 'Chi tiết cấu tạo Hệ trần U-Shaped', type: 'DWG', category: 'CAD', url: null },
];

export const TechnicalHub = () => {
  useSEO({
    title: 'Tài Liệu Kỹ Thuật CAD/PDF | Dành Cho KTS & Nhà Thầu',
    description: 'Tải miễn phí file CAD DWG/DXF, PDF kỹ thuật trần nhôm XS Plus. Bản vẽ chi tiết Clip-in, Lay-in, Caro Cell cho kiến trúc sư và nhà thầu thi công.',
    canonical: 'https://xsplus.vn/technical',
  });
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', company: '' });

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveLead({
        name: formData.name,
        phone: formData.phone,
        company: formData.company,
        source: 'technical_unlock',
      });
    } catch (err) {
      console.error('Lead save error:', err);
    }
    setIsUnlocked(true);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-surface-bright py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-12 text-center">
          <div className="inline-flex p-3 bg-brand-gray text-white rounded-lg mb-4">
            <FileText size={32} />
          </div>
          <h1 className="text-4xl mb-4 font-display">TÀI LIỆU KỸ THUẬT & CAD</h1>
          <p className="text-brand-gray/60 max-w-xl mx-auto italic">
            Hệ thống thư viện dành cho Kiến trúc sư, Đơn vị thiết kế & Nhà thầu thi công.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl border border-surface-dim/40 overflow-hidden shadow-sm">
              <div className="px-6 py-4 bg-brand-gray text-white font-display text-sm tracking-wider flex justify-between items-center">
                DANH SÁCH TÀI LIỆU
                {isUnlocked && <span className="flex items-center text-brand-orange text-[10px] bg-white/10 px-2 py-0.5 rounded"><CheckCircle size={10} className="mr-1" /> ĐÃ MỞ KHÓA</span>}
              </div>
              
              <div className="divide-y divide-surface-dim/20">
                {DOCUMENTS.map((doc) => (
                  <div key={doc.id} className="p-6 flex items-center justify-between hover:bg-surface-bright transition-colors group">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded bg-surface-dim/20 text-brand-gray group-hover:bg-brand-orange/10 group-hover:text-brand-orange transition-colors`}>
                        <FileText size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium text-brand-gray transition-colors group-hover:text-brand-orange">{doc.title}</h4>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className="text-[10px] font-bold text-brand-gray/40 bg-surface-dim/30 px-1.5 py-0.5 rounded tracking-tighter uppercase">{doc.type}</span>
                          <span className="text-[10px] text-brand-gray/40 italic">{doc.category}</span>
                        </div>
                      </div>
                    </div>

                    {!isUnlocked ? (
                      <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center space-x-2 text-xs font-bold text-brand-gray/40 hover:text-brand-orange transition-colors"
                      >
                        <Lock size={14} />
                        <span>MỞ KHÓA</span>
                      </button>
                    ) : doc.url ? (
                      <a
                        href={doc.url}
                        download
                        className="flex items-center space-x-2 text-xs font-bold text-brand-orange hover:underline"
                      >
                        <Download size={14} />
                        <span>TẢI VỀ</span>
                      </a>
                    ) : (
                      <span className="flex items-center space-x-2 text-xs font-bold text-brand-gray/30 cursor-not-allowed" title="Tài liệu đang cập nhật">
                        <Download size={14} />
                        <span>ĐANG CẬP NHẬT</span>
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar / Stats */}
          <div className="space-y-6">
            <div className="bento-card p-6 bg-brand-orange text-white">
              <h3 className="text-xl mb-4">HỖ TRỢ TRỰC TIẾP</h3>
              <p className="text-white/80 text-sm mb-6 leading-relaxed">
                Bạn cần bản vẽ chi tiết cho giải pháp đặc thù hoặc yêu cầu mẫu vật liệu thực tế?
              </p>
              <a 
                href={`tel:${HOTLINE}`} 
                className="w-full py-3 bg-brand-gray text-white rounded flex items-center justify-center space-x-2 font-bold mb-3 hover:bg-brand-gray/90 transition-all"
              >
                <Phone size={18} />
                <span>{HOTLINE_DISPLAY}</span>
              </a>
              <a 
                href={ZALO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-white text-brand-orange rounded flex items-center justify-center space-x-2 font-bold hover:bg-white/90 transition-all"
              >
                <ExternalLink size={18} />
                <span>ZALO KỸ THUẬT</span>
              </a>
            </div>

            <div className="bento-card p-6 bg-white border border-surface-dim/40 italic text-sm text-brand-gray/50">
              "Bộ tài liệu giúp kiến trúc sư dễ dàng tích hợp trần nhôm XS PLUS vào bản vẽ 3D, tối ưu hóa quá trình bóc tách khối lượng và dự toán dự án."
            </div>

            <Link
              to="/calculator"
              className="bento-card p-6 bg-brand-orange/5 border border-brand-orange/20 flex items-start space-x-4 hover:bg-brand-orange/10 transition-colors group"
            >
              <div className="w-10 h-10 bg-brand-orange/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-brand-orange transition-colors">
                <Calculator size={20} className="text-brand-orange group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="font-bold text-brand-gray text-sm uppercase tracking-wide">Tính Vật Tư Tự Động</p>
                <p className="text-brand-gray/50 text-xs mt-1 leading-relaxed">Nhập diện tích → nhận danh sách vật tư và khối lượng ngay.</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowForm(false)}
              className="absolute inset-0 bg-brand-gray/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="bg-brand-orange p-6 text-white text-center">
                <Lock className="mx-auto mb-4" size={40} />
                <h3 className="text-2xl font-display font-bold">MỞ KHÓA TÀI LIỆU</h3>
                <p className="text-white/70 text-sm mt-2">Vui lòng cung cấp thông tin để nhận link tải tài liệu kỹ thuật.</p>
              </div>

              <form onSubmit={handleUnlock} className="p-8 space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-brand-gray/60 uppercase tracking-widest pl-1">Họ và tên</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-brand-gray/30" size={18} />
                    <input 
                      type="text" 
                      required
                      placeholder="Nguyễn Văn A"
                      className="w-full pl-10 pr-4 py-2.5 bg-surface-bright border border-surface-dim rounded hover:border-brand-orange/50 focus:outline-none focus:border-brand-orange transition-all"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-brand-gray/60 uppercase tracking-widest pl-1">Số điện thoại / Zalo</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 text-brand-gray/30" size={18} />
                    <input 
                      type="tel" 
                      required
                      placeholder="0912 345 678"
                      className="w-full pl-10 pr-4 py-2.5 bg-surface-bright border border-surface-dim rounded hover:border-brand-orange/50 focus:outline-none focus:border-brand-orange transition-all"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-brand-gray/60 uppercase tracking-widest pl-1">Công ty / Đơn vị</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 text-brand-gray/30" size={18} />
                    <input 
                      type="text" 
                      required
                      placeholder="Công ty CP Xây Dựng..."
                      className="w-full pl-10 pr-4 py-2.5 bg-surface-bright border border-surface-dim rounded hover:border-brand-orange/50 focus:outline-none focus:border-brand-orange transition-all"
                      value={formData.company}
                      onChange={e => setFormData({...formData, company: e.target.value})}
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-brand-gray text-white font-bold rounded-xl mt-6 hover:bg-brand-gray/90 transition-all flex items-center justify-center space-x-2"
                >
                  <Lock size={18} />
                  <span>XÁC NHẬN MỞ KHÓA</span>
                </button>

                <p className="text-[10px] text-brand-gray/40 text-center leading-relaxed">
                  Bằng cách nhấn xác nhận, bạn đồng ý nhận các tài liệu cập nhật kỹ thuật từ XS PLUS qua Zalo hoặc Email.
                </p>
              </form>

              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white"
              >
                <X size={20} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
