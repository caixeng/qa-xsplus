import React from 'react';
import { useSEO } from '../hooks/useSEO';
import { motion } from 'motion/react';
import { ShieldCheck, Clock, Wrench, AlertTriangle, CheckCircle2, Phone, MessageCircle } from 'lucide-react';
import { HOTLINE_DISPLAY, HOTLINE, ZALO_URL } from '../components/Layout';

const Section = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <div className="mb-12">
    <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-surface-dim">
      <div className="w-10 h-10 bg-brand-orange/10 rounded-lg flex items-center justify-center text-brand-orange">
        {icon}
      </div>
      <h2 className="text-xl md:text-2xl font-bold text-brand-gray uppercase tracking-tight">{title}</h2>
    </div>
    <div className="text-brand-gray/70 leading-relaxed space-y-4">
      {children}
    </div>
  </div>
);

export const PolicyPage = () => {
  useSEO({
    title: 'Chính Sách Bảo Hành & Điều Khoản | XS Plus',
    description: 'Chính sách bảo hành trần nhôm XS Plus: bảo hành 10 năm tấm trần, 5 năm hệ xương, cam kết không phai màu 20 năm. Quy trình xử lý bảo hành chi tiết.',
    canonical: 'https://xsplus.vn/chinh-sach',
  });
  return (
    <div className="min-h-screen bg-surface-bright">
      {/* Header */}
      <div className="bg-brand-gray text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center space-x-2 text-brand-orange mb-4 text-xs font-bold tracking-widest uppercase">
              <ShieldCheck size={14} />
              <span>Cam kết chất lượng</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tight mb-4">
              Chính Sách Bảo Hành
            </h1>
            <p className="text-white/60 text-lg max-w-2xl">
              XS Plus cam kết cung cấp sản phẩm trần nhôm chất lượng cao với chế độ bảo hành rõ ràng, minh bạch. Sự hài lòng của khách hàng là ưu tiên hàng đầu.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Quick Summary */}
      <div className="bg-brand-orange">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-white text-center">
            {[
              { num: '20', unit: 'NĂM', label: 'Bảo hành chống rỉ sét, bong tróc sơn' },
              { num: '24H', unit: '', label: 'Phản hồi yêu cầu bảo hành trong 24 giờ' },
              { num: '100%', unit: '', label: 'Miễn phí vật tư & nhân công trong thời hạn' },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex items-end justify-center space-x-1 mb-1">
                  <span className="text-3xl font-display font-bold">{item.num}</span>
                  {item.unit && <span className="text-base font-bold text-white/70 mb-1">{item.unit}</span>}
                </div>
                <p className="text-white/80 text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >

          <Section icon={<ShieldCheck size={20} />} title="1. Phạm vi bảo hành">
            <p>
              Nhà máy Trần nhôm XS Plus bảo hành toàn bộ sản phẩm nhôm đã qua sơn tĩnh điện và anodize xuất xưởng từ nhà máy đối với các lỗi do <strong>vật liệu và quá trình sản xuất</strong> gây ra, bao gồm:
            </p>
            <ul className="space-y-3 ml-4">
              {[
                'Bong tróc, phai màu lớp sơn tĩnh điện (không do tác động cơ học bên ngoài)',
                'Biến dạng cong vênh do lỗi vật liệu trong điều kiện bình thường',
                'Rỉ sét, oxy hóa bề mặt nhôm do lỗi xử lý bề mặt',
                'Lỗi về kích thước, dung sai vượt quá tiêu chuẩn ISO đã cam kết',
              ].map((item, i) => (
                <li key={i} className="flex items-start space-x-3">
                  <CheckCircle2 size={16} className="text-brand-orange shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section icon={<Clock size={20} />} title="2. Thời hạn bảo hành">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { product: 'Trần nhôm Clip-in (tấm)', duration: '10 năm', note: 'Chống bong tróc sơn, biến dạng' },
                { product: 'Trần nhôm Lay-in (tấm)', duration: '10 năm', note: 'Chống bong tróc sơn, biến dạng' },
                { product: 'Trần nhôm Caro Cell', duration: '10 năm', note: 'Chống biến dạng kết cấu' },
                { product: 'Hệ xương trần (xương chính, phụ)', duration: '5 năm', note: 'Chống cong vênh, gãy do vật liệu' },
                { product: 'Phào chỉ trang trí', duration: '5 năm', note: 'Chống bong tróc sơn' },
                { product: 'Cam kết màu sắc (không phai)', duration: '20 năm', note: 'Trong điều kiện trong nhà bình thường' },
              ].map((row, i) => (
                <div key={i} className="bg-white rounded-lg p-4 border border-surface-dim">
                  <p className="font-bold text-brand-gray text-sm">{row.product}</p>
                  <p className="text-brand-orange text-2xl font-display font-bold">{row.duration}</p>
                  <p className="text-brand-gray/50 text-xs mt-1">{row.note}</p>
                </div>
              ))}
            </div>
            <p className="text-sm mt-4 italic">
              * Thời hạn bảo hành tính từ ngày xuất kho, được ghi rõ trên Phiếu Bảo Hành đính kèm theo đơn hàng.
            </p>
          </Section>

          <Section icon={<Wrench size={20} />} title="3. Quy trình yêu cầu bảo hành">
            <div className="space-y-4">
              {[
                { step: '01', title: 'Liên hệ thông báo', desc: 'Gọi Hotline hoặc nhắn Zalo đến bộ phận Kỹ thuật XS Plus, mô tả tình trạng lỗi và gửi ảnh chụp thực tế.' },
                { step: '02', title: 'Xác nhận trong 24h', desc: 'Nhân viên kỹ thuật XS Plus sẽ phản hồi và xác nhận lỗi có thuộc phạm vi bảo hành trong vòng 24 giờ làm việc.' },
                { step: '03', title: 'Khảo sát thực địa (nếu cần)', desc: 'Đối với các lỗi phức tạp, đội kỹ thuật XS Plus sẽ đến khảo sát trực tiếp (Áp dụng cho Hà Tĩnh và các tỉnh lân cận).' },
                { step: '04', title: 'Thay thế / Sửa chữa', desc: 'XS Plus cung cấp vật tư thay thế miễn phí và hỗ trợ nhân công trong phạm vi bảo hành đã cam kết.' },
              ].map((item, i) => (
                <div key={i} className="flex space-x-4 p-4 bg-white rounded-lg border border-surface-dim">
                  <div className="w-10 h-10 bg-brand-gray text-white rounded-lg flex items-center justify-center font-display font-bold text-sm shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <p className="font-bold text-brand-gray">{item.title}</p>
                    <p className="text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section icon={<AlertTriangle size={20} />} title="4. Các trường hợp KHÔNG thuộc bảo hành">
            <ul className="space-y-3 ml-4">
              {[
                'Hư hỏng do tác động cơ học: va đập, trầy xước, bẻ cong trong quá trình vận chuyển hoặc lắp đặt không đúng kỹ thuật',
                'Hư hỏng do tiếp xúc với hóa chất ăn mòn, môi trường biển mặn (ngoài trời)',
                'Sản phẩm đã qua chỉnh sửa, cắt xén bởi bên thứ ba không có sự đồng ý của XS Plus',
                'Phai màu do tiếp xúc trực tiếp với ánh nắng ngoài trời kéo dài (sản phẩm không được khuyến cáo dùng ngoài trời)',
                'Hết thời hạn bảo hành theo quy định',
              ].map((item, i) => (
                <li key={i} className="flex items-start space-x-3">
                  <AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          {/* CTA */}
          <div className="bg-brand-gray rounded-2xl p-8 text-white text-center mt-12">
            <ShieldCheck size={40} className="text-brand-orange mx-auto mb-4" />
            <h3 className="text-2xl font-display font-bold uppercase mb-3">Cần hỗ trợ bảo hành?</h3>
            <p className="text-white/60 mb-6 max-w-md mx-auto">
              Liên hệ ngay bộ phận Kỹ thuật XS Plus — phản hồi trong 24 giờ làm việc.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${HOTLINE}`}
                className="flex items-center justify-center space-x-2 px-8 py-4 bg-brand-orange text-white font-bold rounded-lg hover:bg-white hover:text-brand-orange transition-all"
              >
                <Phone size={18} />
                <span>Hotline: {HOTLINE_DISPLAY}</span>
              </a>
              <a
                href={ZALO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 px-8 py-4 bg-white/10 border border-white/20 text-white font-bold rounded-lg hover:bg-white/20 transition-all"
              >
                <MessageCircle size={18} />
                <span>Chat Zalo Kỹ Thuật</span>
              </a>
            </div>
          </div>

          <p className="text-center text-brand-gray/40 text-xs mt-8">
            © 2026 Nhà Máy Trần Nhôm XS Plus — Chính sách bảo hành cập nhật ngày 01/01/2026. XS Plus có quyền điều chỉnh chính sách này mà không cần thông báo trước.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
