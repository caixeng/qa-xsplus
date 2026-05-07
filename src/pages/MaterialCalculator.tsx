import React, { useState } from 'react';
import { useSEO } from '../hooks/useSEO';
import { motion } from 'motion/react';
import { Calculator, Download, Share2, Info, CheckCircle2, ChevronRight, PackageOpen } from 'lucide-react';
import { ZALO_URL, HOTLINE_DISPLAY } from '../components/Layout';
import { trackCalculatorUsed } from '../components/Tracking';
import toast from 'react-hot-toast';

interface MaterialResult {
  name: string;
  quantity: number;
  unit: string;
  percentage: number;
}

const CEILING_TYPES = [
  { 
    id: 'clip-in-600', 
    name: 'Trần Clip-in 600x600', 
    ratios: [
      { name: 'Tấm trần nhôm 600x600', ratio: 2.78, unit: 'Tấm' },
      { name: 'Xương tam giác (Triangle)', ratio: 1.8, unit: 'Mét' },
      { name: 'Xương treo C38', ratio: 1.0, unit: 'Mét' },
      { name: 'Móc treo tam giác', ratio: 2.0, unit: 'Cái' },
      { name: 'Móc treo C38', ratio: 1.0, unit: 'Cái' },
      { name: 'V-Wall (Phào viền tường)', ratio: 0.6, unit: 'Mét' },
    ]
  },
  { 
    id: 'lay-in-600', 
    name: 'Trần Lay-in 600x600 T-Black', 
    ratios: [
      { name: 'Tấm trần nhôm 600x600', ratio: 2.78, unit: 'Tấm' },
      { name: 'Thanh chính T-Black 3600', ratio: 0.23, unit: 'Thanh' },
      { name: 'Thanh phụ T-Black 1200', ratio: 1.4, unit: 'Thanh' },
      { name: 'Thanh phụ T-Black 600', ratio: 1.4, unit: 'Thanh' },
      { name: 'Tăng đơ + Ty treo', ratio: 1.2, unit: 'Bộ' },
    ]
  },
  {
    id: 'caro-cell-100',
    name: 'Trần Caro (Cell) 100x100',
    ratios: [
      { name: 'Thanh chính 0.6m', ratio: 2.78, unit: 'Thanh' },
      { name: 'Thanh phụ 0.6m', ratio: 2.78, unit: 'Thanh' },
      { name: 'Ty treo + Móc', ratio: 1.5, unit: 'Bộ' },
    ]
  }
];

export const MaterialCalculator = () => {
  useSEO({
    title: 'Tính Vật Tư Trần Nhôm Tự Động | Calculator XS Plus',
    description: 'Công cụ tính toán vật tư trần nhôm miễn phí: nhập diện tích, chọn loại trần, nhận ngay danh sách vật liệu và khối lượng chính xác cho dự án.',
    canonical: 'https://xsplus.vn/calculator',
  });
  const [area, setArea] = useState<string>('');
  const [selectedType, setSelectedType] = useState(CEILING_TYPES[0].id);
  const [results, setResults] = useState<MaterialResult[] | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const areaNum = parseFloat(area);
    if (isNaN(areaNum) || areaNum <= 0) {
      toast.error('Vui lòng nhập diện tích hợp lệ');
      return;
    }

    const type = CEILING_TYPES.find(t => t.id === selectedType);
    if (!type) return;

    const calculatedData = type.ratios.map(r => ({
      name: r.name,
      quantity: Math.ceil(areaNum * r.ratio * 100) / 100,
      unit: r.unit
    }));

    // Find max quantity to calculate relative percentage for visual bars
    const maxQuantity = Math.max(...calculatedData.map(d => d.quantity));

    const finalResults = calculatedData.map(d => ({
      ...d,
      percentage: (d.quantity / maxQuantity) * 100
    }));

    setResults(finalResults);
    toast.success('Dự toán đã được cập nhật!');
    trackCalculatorUsed(areaNum, selectedType);
  };

  const handleAction = (action: string) => {
    toast.success(`Đang xử lý ${action}...`);
  };

  return (
    <div className="min-h-screen bg-surface-bright py-12 pt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="inline-flex p-3 bg-brand-orange/10 rounded-full text-brand-orange mb-4 shadow-inner">
            <Calculator size={32} />
          </div>
          <h1 className="text-4xl lg:text-5xl font-display uppercase tracking-tighter text-brand-gray mb-4">CÔNG CỤ DỰ TOÁN</h1>
          <p className="text-brand-gray/60 max-w-2xl mx-auto">Tự động tính toán khối lượng vật tư chính xác theo diện tích công trình. Hỗ trợ bóc tách chi tiết các loại phụ kiện đồng bộ.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form */}
          <div className="lg:col-span-5 bento-card p-8 bg-white shadow-sm border border-surface-dim/50 flex flex-col">
            <form onSubmit={handleCalculate} className="space-y-6 flex-grow">
              <div>
                <label className="block text-xs font-bold text-brand-gray/60 mb-2 uppercase tracking-widest">
                  Diện tích thi công (m²)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="Ví dụ: 100"
                    className="w-full pl-4 pr-12 py-3 bg-surface-bright border border-surface-dim rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all font-bold text-xl text-brand-gray"
                    required
                    min="1"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-gray/40 font-bold">m²</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-gray/60 mb-2 uppercase tracking-widest">
                  Hệ trần nhôm
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-bright border border-surface-dim rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all font-bold text-brand-gray cursor-pointer appearance-none"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239CA3AF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path শাস্ত্র%3E%3C/svg%3E")`, backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
                >
                  {CEILING_TYPES.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full btn-primary"
                >
                  <Calculator size={18} className="mr-2" />
                  <span>TÍNH TOÁN KHỐI LƯỢNG</span>
                </button>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-brand-orange-light/30 rounded-lg border border-brand-orange/10 mt-6">
                <Info size={16} className="text-brand-orange shrink-0 mt-0.5" />
                <p className="text-xs text-brand-gray/70 leading-relaxed">
                  <strong>Lưu ý:</strong> Kết quả trên mang tính chất tham khảo. Định mức thực tế có thể hao hụt thêm 5-10% tùy theo hình dáng và kích thước mặt bằng thi công.
                </p>
              </div>
            </form>
          </div>

          {/* Results */}
          <div className="lg:col-span-7 relative">
            {!results ? (
              <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-brand-orange/20 rounded-xl p-12 text-center bg-white/50">
                <div className="w-20 h-20 bg-brand-orange-light/50 rounded-full flex items-center justify-center mb-6">
                  <PackageOpen size={32} className="text-brand-orange" />
                </div>
                <h3 className="text-lg font-bold text-brand-gray mb-2">Chưa có dữ liệu</h3>
                <p className="text-sm text-brand-gray/50">Nhập diện tích và chọn loại trần để hệ thống tự động bóc tách vật tư</p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bento-card h-full bg-brand-gray text-white p-8 flex flex-col shadow-2xl shadow-brand-gray/10"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-4 border-b border-white/10 gap-4">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-white tracking-tight">BẢNG BÓC TÁCH</h3>
                    <p className="text-brand-orange text-sm font-bold mt-1">
                      {CEILING_TYPES.find(t => t.id === selectedType)?.name} • {area} m²
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => handleAction('tải PDF')} className="p-2.5 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10 text-white" title="Tải PDF">
                      <Download size={18} />
                    </button>
                    <button onClick={() => handleAction('chia sẻ')} className="p-2.5 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10 text-white" title="Chia sẻ">
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="flex-grow space-y-5 mb-8">
                  {results.map((res, i) => (
                    <div key={i} className="relative group">
                      <div className="flex justify-between items-end mb-1.5 relative z-10">
                        <div className="flex items-center space-x-2">
                          <CheckCircle2 size={14} className="text-brand-orange" />
                          <span className="text-sm font-medium text-white/90">{res.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-display text-white font-bold text-xl">{res.quantity}</span>
                          <span className="ml-1.5 text-white/50 text-xs uppercase tracking-widest">{res.unit}</span>
                        </div>
                      </div>
                      {/* Visual Bar */}
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${res.percentage}%` }}
                          transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                          className={`h-full rounded-full ${i === 0 ? 'bg-brand-orange' : 'bg-white/30'}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-8 border-t border-white/10">
                  <a
                    href={`${ZALO_URL}?text=${encodeURIComponent(
                      `Xin chào XS Plus! Tôi muốn hỏi báo giá:\n- Hệ trần: ${CEILING_TYPES.find(t => t.id === selectedType)?.name}\n- Diện tích: ${area}m²\n- Yêu cầu báo giá đầy đủ vật tư.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-brand-orange text-white font-bold rounded-lg hover:bg-white hover:text-brand-orange transition-all flex items-center justify-center space-x-2 group uppercase tracking-widest text-sm shadow-xl shadow-brand-orange/20"
                  >
                    <span>NHẬN BÁO GIÁ ZALO NGAY</span>
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                  <p className="text-white/40 text-[11px] text-center mt-4 tracking-widest uppercase">
                    Hotline Kỹ Thuật: <a href={`tel:${HOTLINE_DISPLAY.replace(/\s/g, '')}`} className="text-white/60 hover:text-white transition-colors">{HOTLINE_DISPLAY}</a>
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
