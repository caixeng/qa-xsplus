import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Lock, Eye, EyeOff, LayoutDashboard, Package, History, Settings, ChevronRight, LogIn } from 'lucide-react';

export const DealerPortal = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ id: '', password: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.id && credentials.password) {
      setIsLoggedIn(true);
    }
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-surface-bright flex">
        {/* Sidebar */}
        <aside className="w-64 bg-brand-gray text-white flex flex-col p-6 space-y-8">
          <div className="mb-6 pt-10 flex items-center">
            <img 
              src="https://lh3.googleusercontent.com/aida/ADBb0ujKJPqUCNRLMv6JHmcMN7Dujxp5u6avmygp6SB8-AbnqsokCGnHZPF2-AV2AWhfC_TimuToyBoxO98huftznAvrXIn4mqhchdlIZkEIpBvhUyUlsqam5pC9NCfun8gg1jieMmaUd5SLSV4d5CovmGBGNv2eCswFvF-GT7CwTxDBgFkNEsrk53fB1eXV4dFop96lfaDRzD7TzT0H75JP4Jn-u-OaBRRcpzwZWpR01BK_S5vSkVTmISV9_fWZ4-lCUvT-056bK_9KjQ" 
              alt="XS PLUS Logo" 
              className="h-10 w-auto object-contain bg-white px-2 py-1 rounded inline-block" 
            />
            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded ml-2 uppercase font-mono mt-1">Partner Portal</span>
          </div>
          
          <nav className="flex-grow space-y-2">
            {[
              { name: 'Tổng quan', icon: <LayoutDashboard size={18} />, active: true },
              { name: 'Kho hàng & Tồn kho', icon: <Package size={18} />, active: false },
              { name: 'Lịch sử đơn hàng', icon: <History size={18} />, active: false },
              { name: 'Cài đặt tài khoản', icon: <Settings size={18} />, active: false },
            ].map((item, i) => (
              <button 
                key={i} 
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${item.active ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}
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
        <main className="flex-1 p-12">
          <header className="mb-12 flex justify-between items-end">
            <div>
              <p className="text-brand-orange text-xs font-bold uppercase tracking-widest mb-2">Chào mừng trở lại,</p>
              <h1 className="text-4xl font-display uppercase font-bold text-brand-gray">ĐỊA LÝ KHÁNH LÂM - HÀ TĨNH</h1>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-brand-gray/40 uppercase font-bold tracking-widest block mb-1">Cấp bậc đối tác</span>
              <span className="bg-brand-gray text-brand-orange font-bold text-xs px-3 py-1 rounded">VÀNG (GOLD)</span>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bento-card p-6 bg-white border-l-4 border-l-brand-orange">
              <p className="text-[10px] uppercase font-bold text-brand-gray/40 mb-2">Số dư chiết khấu</p>
              <p className="text-3xl font-display font-bold">12.500.000đ</p>
            </div>
            <div className="bento-card p-6 bg-white">
              <p className="text-[10px] uppercase font-bold text-brand-gray/40 mb-2">Đơn hàng chờ xử lý</p>
              <p className="text-3xl font-display font-bold">04</p>
            </div>
            <div className="bento-card p-6 bg-white">
              <p className="text-[10px] uppercase font-bold text-brand-gray/40 mb-2">Tồn kho ưu tiên</p>
              <p className="text-3xl font-display font-bold text-brand-orange">SẴN SÀNG</p>
            </div>
          </div>

          <div className="bento-card bg-white p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold font-display">TÌNH TRẠNG KHO HÀ TĨNH</h2>
              <button className="text-xs font-bold text-brand-orange hover:underline">XEM TẤT CẢ</button>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Clip-in 600x600 Standard', stock: '2,500 m²', status: 'High' },
                { name: 'Lay-in 600x600 T-Black', stock: '850 m²', status: 'Medium' },
                { name: 'Caro Cell 100x100 White', stock: '120 m²', status: 'Low' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-surface-dim/40 last:border-0">
                  <span className="text-sm font-medium">{item.name}</span>
                  <div className="flex items-center space-x-6">
                    <span className="font-mono text-sm">{item.stock}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${item.status === 'High' ? 'bg-green-100 text-green-700' : item.status === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                      {item.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-gray flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden p-10"
      >
        <div className="text-center mb-10">
          <img 
            src="https://lh3.googleusercontent.com/aida/ADBb0ujKJPqUCNRLMv6JHmcMN7Dujxp5u6avmygp6SB8-AbnqsokCGnHZPF2-AV2AWhfC_TimuToyBoxO98huftznAvrXIn4mqhchdlIZkEIpBvhUyUlsqam5pC9NCfun8gg1jieMmaUd5SLSV4d5CovmGBGNv2eCswFvF-GT7CwTxDBgFkNEsrk53fB1eXV4dFop96lfaDRzD7TzT0H75JP4Jn-u-OaBRRcpzwZWpR01BK_S5vSkVTmISV9_fWZ4-lCUvT-056bK_9KjQ" 
            alt="XS PLUS Logo" 
            className="h-16 w-auto object-contain mx-auto mb-6" 
          />
          <h2 className="text-2xl font-bold uppercase tracking-tight text-brand-gray">Cổng thông tin đối tác</h2>
          <p className="text-brand-gray/50 text-sm mt-2">Vui lòng đăng nhập để truy cập chính sách giá bảo lưu và tồn kho.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-brand-gray/60 uppercase tracking-widest pl-1">Mã định danh (Đại lý/Thầu)</label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 text-brand-gray/30" size={18} />
              <input 
                type="text" 
                required
                placeholder="DL-XXXX / TT-XXXX"
                className="w-full pl-10 pr-4 py-3 bg-surface-bright border border-surface-dim rounded-lg hover:border-brand-orange/50 focus:outline-none focus:border-brand-orange transition-all font-medium"
                value={credentials.id}
                onChange={e => setCredentials({...credentials, id: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-brand-gray/60 uppercase tracking-widest pl-1">Mật khẩu</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-brand-gray/30" size={18} />
              <input 
                type={showPassword ? "text" : "password"} 
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 bg-surface-bright border border-surface-dim rounded-lg hover:border-brand-orange/50 focus:outline-none focus:border-brand-orange transition-all font-medium"
                value={credentials.password}
                onChange={e => setCredentials({...credentials, password: e.target.value})}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-brand-gray/30 hover:text-brand-orange"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center space-x-2 text-xs text-brand-gray/60 cursor-pointer">
              <input type="checkbox" className="rounded border-surface-dim" />
              <span>Ghi nhớ đăng nhập</span>
            </label>
            <button type="button" className="text-xs font-bold text-brand-orange hover:underline">Quên mật khẩu?</button>
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-brand-gray text-white font-bold rounded-xl mt-4 hover:bg-brand-gray/90 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-brand-gray/20"
          >
            <span>ĐĂNG NHẬP HỆ THỐNG</span>
            <ChevronRight size={18} />
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-surface-dim/40 text-center">
          <p className="text-xs text-brand-gray/40">Bạn chưa là Đại lý / Thợ thầu chính thức?</p>
          <button className="text-xs font-bold text-brand-orange hover:underline mt-2 uppercase tracking-widest">Liên hệ đăng ký ngay</button>
        </div>
      </motion.div>
    </div>
  );
};
