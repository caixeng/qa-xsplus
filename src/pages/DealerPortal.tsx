import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Building2, LayoutDashboard, Package, History, Settings, ChevronRight, LogIn, Loader2, User } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export const DealerPortal = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'quick' | 'full'>('quick');
  const [credentials, setCredentials] = useState({ phone: '', name: '', company: '' });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!credentials.phone || !credentials.name) {
      toast.error('Vui lòng nhập Tên và Số điện thoại');
      return;
    }

    // Validate phone number format (basic Vietnamese mobile)
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!phoneRegex.test(credentials.phone)) {
      toast.error('Số điện thoại không hợp lệ');
      return;
    }

    setIsLoading(true);

    try {
      // Collect as a lead in Supabase
      const { error: dbError } = await supabase
        .from('leads')
        .insert([{
          name: credentials.name,
          phone: credentials.phone,
          company: credentials.company || 'Đại lý / Thầu tự do',
          source: 'dealer_portal',
          note: 'Đăng nhập cổng đối tác'
        }]);

      if (dbError) throw dbError;

      // Simulate network delay for UX
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.success('Đăng nhập thành công!');
      setIsLoggedIn(true);
    } catch (err) {
      console.error('Error logging in:', err);
      toast.error('Có lỗi xảy ra, vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  const [activeNav, setActiveNav] = useState<'dashboard' | 'catalog' | 'contact' | 'policy'>('dashboard');

  if (isLoggedIn) {
    const navItems = [
      { id: 'dashboard' as const, name: 'Tổng quan', icon: <LayoutDashboard size={18} /> },
      { id: 'catalog' as const, name: 'Danh mục & Giá', icon: <Package size={18} /> },
      { id: 'contact' as const, name: 'Liên hệ kỹ thuật', icon: <History size={18} /> },
      { id: 'policy' as const, name: 'Chính sách đại lý', icon: <Settings size={18} /> },
    ];

    return (
      <div className="min-h-screen bg-surface-bright flex pt-20">
        {/* Sidebar */}
        <aside className="w-64 bg-brand-gray text-white flex flex-col p-6 space-y-8">
          <div className="mb-6 flex items-center">
            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded uppercase font-mono mt-1">Partner Portal</span>
          </div>
          
          <nav className="flex-grow space-y-2">
            {navItems.map((item) => (
              <button 
                key={item.id} 
                onClick={() => setActiveNav(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeNav === item.id ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            ))}
          </nav>

          <button 
            onClick={() => setIsLoggedIn(false)}
            className="mt-auto pt-6 border-t border-white/10 text-white/40 hover:text-white text-xs font-bold uppercase tracking-widest flex items-center space-x-2"
          >
            <LogIn size={14} className="rotate-180" />
            <span>Đăng xuất</span>
          </button>
        </aside>

        {/* Dashboard Content */}
        <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
          <header className="mb-10 flex justify-between items-end">
            <div>
              <p className="text-brand-orange text-xs font-bold uppercase tracking-widest mb-2">Chào mừng đối tác,</p>
              <h1 className="text-3xl font-display uppercase font-bold text-brand-gray">{credentials.company || credentials.name}</h1>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-brand-gray/40 uppercase font-bold tracking-widest block mb-1">Cấp bậc</span>
              <span className="bg-brand-gray text-brand-orange font-bold text-xs px-3 py-1 rounded">THÀNH VIÊN MỚI</span>
            </div>
          </header>

          {/* DASHBOARD TAB */}
          {activeNav === 'dashboard' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bento-card p-6 bg-white border-l-4 border-l-brand-orange">
                  <p className="text-[10px] uppercase font-bold text-brand-gray/40 mb-2">Trạng thái tài khoản</p>
                  <p className="text-xl font-display font-bold text-amber-600">Chờ xác nhận</p>
                  <p className="text-xs mt-2 text-brand-gray/60">Quản lý sẽ liên hệ trong 2 giờ làm việc</p>
                </div>
                <div className="bento-card p-6 bg-white border-l-4 border-l-green-500">
                  <p className="text-[10px] uppercase font-bold text-brand-gray/40 mb-2">Tài liệu kỹ thuật</p>
                  <p className="text-xl font-display font-bold text-green-600">ĐÃ MỞ KHÓA</p>
                  <p className="text-xs mt-2 text-brand-gray/60">Tải CAD, bảng màu và catalogue</p>
                </div>
                <div className="bento-card p-6 bg-white border-l-4 border-l-blue-500">
                  <p className="text-[10px] uppercase font-bold text-brand-gray/40 mb-2">Hotline ưu tiên</p>
                  <p className="text-xl font-display font-bold text-blue-600">0378 226 269</p>
                  <p className="text-xs mt-2 text-brand-gray/60">Kênh riêng cho đối tác</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bento-card bg-white p-8">
                <h2 className="text-lg font-bold font-display mb-6 text-brand-gray uppercase tracking-tight">Thao tác nhanh</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: '📋 Yêu cầu báo giá ngay', desc: 'Gửi thông số — nhận giá trong 30 phút', action: () => setActiveNav('contact') },
                    { label: '📐 Xem danh mục sản phẩm', desc: 'Clip-in, Lay-in, Caro Cell và phụ kiện', action: () => setActiveNav('catalog') },
                    { label: '📄 Tải tài liệu kỹ thuật', desc: 'File CAD, catalogue, bảng màu', action: () => window.open('/technical', '_blank') },
                    { label: '⚖️ Chính sách chiết khấu', desc: 'Xem mức chiết khấu theo sản lượng', action: () => setActiveNav('policy') },
                  ].map((item, i) => (
                    <button key={i} onClick={item.action}
                      className="text-left p-4 border border-surface-dim rounded-xl hover:border-brand-orange hover:bg-brand-orange/5 transition-all group">
                      <p className="font-bold text-brand-gray text-sm group-hover:text-brand-orange transition-colors">{item.label}</p>
                      <p className="text-xs text-brand-gray/50 mt-1">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CATALOG TAB */}
          {activeNav === 'catalog' && (
            <div className="bento-card bg-white p-8">
              <h2 className="text-xl font-bold font-display mb-6 uppercase">Danh Mục Sản Phẩm & Tồn Kho</h2>
              <div className="space-y-4">
                {[
                  { name: 'Trần Clip-in 600×600 Standard (Trắng)', code: 'CI-600-W', stock: '> 2,000 m²', status: 'High', price: 'Liên hệ đại lý' },
                  { name: 'Trần Clip-in 600×600 (Đen mờ)', code: 'CI-600-B', stock: '> 800 m²', status: 'High', price: 'Liên hệ đại lý' },
                  { name: 'Trần Lay-in 600×600 T-Black', code: 'LI-600-TB', stock: '> 1,200 m²', status: 'High', price: 'Liên hệ đại lý' },
                  { name: 'Trần Lay-in 300×1200', code: 'LI-300-W', stock: '> 500 m²', status: 'Medium', price: 'Liên hệ đại lý' },
                  { name: 'Caro Cell 100×100 (Trắng)', code: 'CC-100-W', stock: 'Theo đơn', status: 'Low', price: 'Liên hệ đại lý' },
                  { name: 'Xương chính T-Bar 3.6m', code: 'XT-36', stock: '> 5,000 cái', status: 'High', price: 'Liên hệ đại lý' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-surface-dim/40 last:border-0 gap-2">
                    <div>
                      <p className="font-medium text-brand-gray text-sm">{item.name}</p>
                      <p className="text-[11px] text-brand-gray/40 font-mono mt-0.5">Mã: {item.code}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="font-mono text-sm text-brand-gray/70">{item.stock}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${item.status === 'High' ? 'bg-green-100 text-green-700' : item.status === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-orange-100 text-orange-700'}`}>
                        {item.status === 'Low' ? 'ĐẶT TRƯỚC' : item.status === 'Medium' ? 'CÒN ÍT' : 'SẴN KHO'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-brand-gray/40 mt-6 italic">* Giá đại lý sẽ được thông báo sau khi tài khoản được xác nhận. Hotline: 0378 226 269</p>
            </div>
          )}

          {/* CONTACT TAB */}
          {activeNav === 'contact' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bento-card bg-white p-8">
                <h2 className="text-xl font-bold font-display mb-6 uppercase">Liên Hệ Bộ Phận Kinh Doanh</h2>
                <div className="space-y-5">
                  {[
                    { label: 'Hotline đối tác', value: '0378 226 269', href: 'tel:0378226269', tag: '24/7' },
                    { label: 'Zalo tư vấn', value: 'Chat Zalo ngay', href: 'https://zalo.me/0378226269', tag: 'Ưu tiên' },
                    { label: 'Email', value: 'xsplus@gmail.com', href: 'mailto:xsplus@gmail.com', tag: null },
                    { label: 'Địa chỉ xưởng', value: '319 Trần Phú, Thạch Linh, TP. Hà Tĩnh', href: null, tag: null },
                  ].map((c, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-surface-dim last:border-0">
                      <div>
                        <p className="text-[10px] font-bold text-brand-gray/40 uppercase tracking-widest">{c.label}</p>
                        {c.href ? (
                          <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                            className="font-semibold text-brand-gray hover:text-brand-orange transition-colors text-sm mt-0.5 block">
                            {c.value}
                          </a>
                        ) : (
                          <p className="font-semibold text-brand-gray text-sm mt-0.5">{c.value}</p>
                        )}
                      </div>
                      {c.tag && (
                        <span className="text-[10px] font-bold bg-brand-orange/10 text-brand-orange px-2 py-0.5 rounded">{c.tag}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bento-card bg-brand-gray p-8 text-white">
                <h2 className="text-xl font-bold font-display mb-4 uppercase">Gửi Yêu Cầu Báo Giá</h2>
                <p className="text-white/60 text-sm mb-6">Gửi thông số kỹ thuật qua Zalo để nhận báo giá trong 30 phút làm việc.</p>
                <a href="https://zalo.me/0378226269" target="_blank" rel="noopener noreferrer"
                  className="w-full py-4 bg-brand-orange text-white font-bold rounded-lg flex items-center justify-center space-x-2 hover:bg-brand-orange/90 transition-all uppercase tracking-wider text-sm">
                  <span>💬 Nhắn Zalo ngay</span>
                </a>
                <p className="text-white/30 text-[11px] mt-4 text-center">Thứ 2 – Thứ 7: 07:30 – 17:30</p>
              </div>
            </div>
          )}

          {/* POLICY TAB */}
          {activeNav === 'policy' && (
            <div className="bento-card bg-white p-8">
              <h2 className="text-xl font-bold font-display mb-6 uppercase">Chính Sách Đại Lý XS Plus</h2>
              <div className="space-y-6">
                {[
                  { tier: 'Thành viên', min: '< 500 m²/tháng', discount: 'Giá niêm yết', color: 'bg-gray-100 text-gray-600' },
                  { tier: 'Bạc', min: '500 – 1,500 m²/tháng', discount: 'Chiết khấu 5%', color: 'bg-blue-100 text-blue-700' },
                  { tier: 'Vàng', min: '1,500 – 3,000 m²/tháng', discount: 'Chiết khấu 8%', color: 'bg-yellow-100 text-yellow-700' },
                  { tier: 'Kim cương', min: '> 3,000 m²/tháng', discount: 'Chiết khấu 12% + Ưu tiên giao', color: 'bg-brand-orange/10 text-brand-orange' },
                ].map((t, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-surface-dim">
                    <div className="flex items-center space-x-4">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${t.color}`}>{t.tier}</span>
                      <p className="text-sm text-brand-gray/70">{t.min}</p>
                    </div>
                    <p className="font-bold text-brand-gray text-sm">{t.discount}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-4 bg-surface-bright rounded-xl text-sm text-brand-gray/60">
                <p className="font-bold text-brand-gray mb-2">Quyền lợi thêm cho đại lý:</p>
                <ul className="space-y-1">
                  {['Hỗ trợ kỹ thuật tại công trình (khu vực Miền Trung)', 'Ưu tiên xuất kho trong 24 giờ', 'Tặng kèm bảng màu và catalogue in ấn', 'Đào tạo kỹ thuật thi công miễn phí'].map((b, i) => (
                    <li key={i} className="flex items-start space-x-2"><span className="text-brand-orange">✓</span><span>{b}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-surface-bright flex pt-24 items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden p-10 border border-surface-dim"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold uppercase tracking-tight text-brand-gray">Cổng Đối Tác</h2>
          <p className="text-brand-gray/60 text-sm mt-2">Đăng nhập nhanh không cần mật khẩu. Chỉ dành cho Kiến trúc sư, Đại lý và Nhà thầu.</p>
        </div>

        {/* Tabs */}
        <div className="flex bg-surface-dim/30 p-1 rounded-lg mb-8">
          <button 
            type="button"
            className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-md transition-all ${activeTab === 'quick' ? 'bg-white text-brand-orange shadow-sm' : 'text-brand-gray/50 hover:text-brand-gray'}`}
            onClick={() => setActiveTab('quick')}
          >
            Đăng ký Nhanh
          </button>
          <button 
            type="button"
            className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-md transition-all ${activeTab === 'full' ? 'bg-white text-brand-orange shadow-sm' : 'text-brand-gray/50 hover:text-brand-gray'}`}
            onClick={() => setActiveTab('full')}
          >
            Toàn diện
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-brand-gray/60 uppercase tracking-widest pl-1">Họ và Tên *</label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 text-brand-gray/30" size={18} />
              <input 
                type="text" 
                required
                placeholder="VD: Nguyễn Văn A"
                className="w-full pl-10 pr-4 py-3 bg-surface-bright border border-surface-dim rounded-lg focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all font-medium"
                value={credentials.name}
                onChange={e => setCredentials({...credentials, name: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-brand-gray/60 uppercase tracking-widest pl-1">Số điện thoại / Zalo *</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3.5 text-brand-gray/30" size={18} />
              <input 
                type="tel" 
                required
                placeholder="09xx xxx xxx"
                className="w-full pl-10 pr-4 py-3 bg-surface-bright border border-surface-dim rounded-lg focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all font-medium"
                value={credentials.phone}
                onChange={e => setCredentials({...credentials, phone: e.target.value})}
              />
            </div>
          </div>

          {activeTab === 'full' && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-5"
            >
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-gray/60 uppercase tracking-widest pl-1">Công ty / Đại lý</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3.5 text-brand-gray/30" size={18} />
                  <input 
                    type="text" 
                    placeholder="Nhập tên doanh nghiệp của bạn"
                    className="w-full pl-10 pr-4 py-3 bg-surface-bright border border-surface-dim rounded-lg focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all font-medium"
                    value={credentials.company}
                    onChange={e => setCredentials({...credentials, company: e.target.value})}
                  />
                </div>
              </div>
            </motion.div>
          )}

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 btn-primary"
          >
            {isLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <>
                <span>VÀO CỔNG ĐỐI TÁC</span>
                <ChevronRight size={18} className="ml-2" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-surface-dim/40 text-center">
          <p className="text-[10px] text-brand-gray/40">Bằng việc đăng nhập, bạn đồng ý nhận thông tin chính sách chiết khấu từ bộ phận kinh doanh XS Plus.</p>
        </div>
      </motion.div>
    </div>
  );
};
