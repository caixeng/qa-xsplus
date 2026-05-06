import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, Download, Share2, Info, CheckCircle2, ChevronRight } from 'lucide-react';
import { ZALO_URL, HOTLINE_DISPLAY } from '../components/Layout';

interface MaterialResult {
  name: string;
  quantity: number;
  unit: string;
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
  const [area, setArea] = useState<string>('');
  const [selectedType, setSelectedType] = useState(CEILING_TYPES[0].id);
  const [results, setResults] = useState<MaterialResult[] | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const areaNum = parseFloat(area);
    if (isNaN(areaNum) || areaNum <= 0) return;

    const type = CEILING_TYPES.find(t => t.id === selectedType);
    if (!type) return;

    const calculated = type.ratios.map(r => ({
      name: r.name,
      quantity: Math.ceil(areaNum * r.ratio * 100) / 100,
      unit: r.unit
    }));

    setResults(calculated);
  };

  return (
    <div className="min-h-screen bg-surface-bright py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12 text-center">
          <div className="inline-flex p-3 bg-brand-orange/10 rounded-full text-brand-orange mb-4">
            <Calculator size={32} />
          </div>
          <h1 className="text-4xl mb-4">CÔNG CỤ TÍNH TOÁN VẬT TƯ</h1>
          <p className="text-brand-gray/60">Dự toán khối lượng vật tư chính xác theo diện tích công trình của bạn.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bento-card p-8 bg-white shadow-sm border-surface-dim/20">
            <form onSubmit={handleCalculate} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-brand-gray mb-2 uppercase tracking-wider">
                  Diện tích thi công (m²)
                </label>
                <input
                  type="number"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="Ví dụ: 100"
                  className="w-full px-4 py-3 bg-surface-bright border border-surface-dim rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all font-medium text-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-brand-gray mb-2 uppercase tracking-wider">
                  Hệ trần nhôm
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-bright border border-surface-dim rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all font-medium"
                >
                  {CEILING_TYPES.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 bg-brand-gray text-white font-bold rounded-lg hover:bg-brand-gray/90 transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl active:scale-95"
                >
                  <Calculator size={20} />
                  <span>TÍNH TOÁN KHỐI LƯỢNG</span>
                </button>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-surface-bright rounded-lg border border-surface-dim/30">
                <Info size={18} className="text-brand-orange shrink-0 mt-0.5" />
                <p className="text-xs text-brand-gray/60 leading-relaxed">
                  Lưu ý: Kết quả mang tính chất tham khảo cho việc dự toán. Khối lượng thực tế có thể thay đổi tùy theo đặc thù mặt bằng và hao hụt thi công.
                </p>
              </div>
            </form>
          </div>

          {/* Results */}
          <div className="relative">
            {!results ? (
              <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-surface-dim rounded-xl p-12 text-center opacity-70 group hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 bg-surface-dim/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Calculator size={32} className="text-brand-gray/40" />
                </div>
                <h3 className="text-lg font-medium text-brand-gray/60 italic">Điền thông tin diện tích để nhận bảng dự toán chi tiết</h3>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bento-card h-full bg-brand-gray text-white p-8 flex flex-col"
              >
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
                  <h3 className="text-xl font-bold">BẢNG DỰ TOÁN</h3>
                  <div className="flex space-x-2">
                    <button className="p-2 hover:bg-white/10 rounded transition-colors" title="Tải PDF">
                      <Download size={20} />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded transition-colors" title="Chia sẻ">
                      <Share2 size={20} />
                    </button>
                  </div>
                </div>

                <div className="flex-grow space-y-4 mb-8">
                  {results.map((res, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0 hover:bg-white/5 px-2 -mx-2 rounded transition-colors">
                      <div className="flex items-center space-x-3">
                        <CheckCircle2 size={16} className="text-brand-orange" />
                        <span className="text-sm text-white/80">{res.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-brand-orange font-bold text-lg">{res.quantity}</span>
                        <span className="ml-1.5 text-white/40 text-xs italic">{res.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-6 border-t border-white/10">
                  <a
                    href={`${ZALO_URL}?text=${encodeURIComponent(
                      `Xin chào XS Plus! Tôi muốn hỏi báo giá:\n- Hệ trần: ${CEILING_TYPES.find(t => t.id === selectedType)?.name}\n- Diện tích: ${area}m²\n- Khối lượng vật tư cần: ${results.map(r => `${r.name}: ${r.quantity} ${r.unit}`).join(', ')}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-brand-orange text-white font-bold rounded-lg hover:bg-brand-orange/90 transition-all flex items-center justify-center space-x-2 group"
                  >
                    <span>GỬI ĐẾN ZALO NHẬN GIÁ SỈ</span>
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                  <p className="text-white/40 text-[10px] text-center mt-3">
                    Hotline: <a href={`tel:${HOTLINE_DISPLAY.replace(/\s/g, '')}`} className="underline">{HOTLINE_DISPLAY}</a>
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
