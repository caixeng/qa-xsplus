import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, MessageCircle, MapPin, Mail, Clock, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { HOTLINE, HOTLINE_DISPLAY, ZALO_URL } from '../components/Layout';
import { saveLead } from '../lib/supabase';
import { trackLead } from '../components/Tracking';
import { useSEO } from '../hooks/useSEO';

interface ContactForm {
  name: string;
  phone: string;
  subject: string;
  message: string;
}

const SUBJECTS = [
  'Báo giá sản phẩm',
  'Tư vấn kỹ thuật',
  'Yêu cầu bảo hành',
  'Hợp tác đại lý',
  'Khác',
];

export const ContactPage = () => {
  useSEO({
    title: 'Liên Hệ XS Plus | Báo Giá & Hỗ Trợ Kỹ Thuật',
    description: 'Liên hệ nhà máy trần nhôm XS Plus: hotline 0378 226 269, Zalo tư vấn, showroom 319 Trần Phú Hà Tĩnh. Phản hồi trong 15 phút giờ làm việc.',
    canonical: 'https://xsplus.vn/contact',
  });
  const [form, setForm] = useState<ContactForm>({ name: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await saveLead({
        name: form.name,
        phone: form.phone,
        note: `[${form.subject}] ${form.message}`,
        source: 'contact_page',
      });
      trackLead('contact_page');
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const contacts = [
    {
      icon: <Phone size={20} />,
      label: 'Hotline tư vấn',
      value: HOTLINE_DISPLAY,
      href: `tel:${HOTLINE}`,
      tag: 'Thứ 2 – Thứ 7: 07:30–17:30',
    },
    {
      icon: <MessageCircle size={20} />,
      label: 'Zalo hỗ trợ',
      value: HOTLINE_DISPLAY,
      href: ZALO_URL,
      tag: 'Phản hồi trong 15 phút',
      external: true,
    },
    {
      icon: <Mail size={20} />,
      label: 'Email',
      value: 'xsplus@gmail.com',
      href: 'mailto:xsplus@gmail.com',
    },
    {
      icon: <MapPin size={20} />,
      label: 'Showroom',
      value: '319 Trần Phú, Thạch Linh, TP. Hà Tĩnh',
      href: 'https://maps.google.com/?q=319+Trần+Phú,+Thạch+Linh,+Hà+Tĩnh',
      external: true,
    },
  ];

  return (
    <div className="min-h-screen bg-surface-bright">
      {/* Hero */}
      <section className="bg-brand-gray text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="h-[1px] w-8 bg-brand-orange" />
              <span className="text-brand-orange text-xs font-bold uppercase tracking-widest">Liên hệ</span>
              <div className="h-[1px] w-8 bg-brand-orange" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight mb-4">
              Liên hệ với XS Plus
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Đội ngũ tư vấn kỹ thuật sẵn sàng hỗ trợ — từ báo giá, bản vẽ CAD đến hướng dẫn thi công.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left: Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-bold text-brand-gray uppercase tracking-tight mb-6">
                Thông tin liên hệ
              </h2>
              <div className="space-y-4">
                {contacts.map((c, i) => (
                  <a
                    key={i}
                    href={c.href}
                    target={c.external ? '_blank' : undefined}
                    rel={c.external ? 'noopener noreferrer' : undefined}
                    className="flex items-start space-x-4 p-4 bg-white rounded-xl border border-surface-dim hover:border-brand-orange hover:shadow-sm transition-all group"
                  >
                    <div className="w-10 h-10 bg-brand-orange/10 text-brand-orange rounded-lg flex items-center justify-center shrink-0 group-hover:bg-brand-orange group-hover:text-white transition-colors">
                      {c.icon}
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-brand-gray/40 uppercase tracking-widest">{c.label}</p>
                      <p className="font-bold text-brand-gray group-hover:text-brand-orange transition-colors mt-0.5">{c.value}</p>
                      {c.tag && <p className="text-[11px] text-brand-gray/40 mt-0.5">{c.tag}</p>}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Working hours */}
            <div className="bg-white rounded-xl border border-surface-dim p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Clock size={18} className="text-brand-orange" />
                <h3 className="font-bold text-brand-gray uppercase text-sm tracking-wider">Giờ làm việc</h3>
              </div>
              <div className="space-y-2 text-sm">
                {[
                  { day: 'Thứ 2 – Thứ 6', time: '07:30 – 17:30' },
                  { day: 'Thứ 7', time: '07:30 – 12:00' },
                  { day: 'Chủ Nhật', time: 'Nghỉ (Zalo vẫn hỗ trợ)' },
                ].map((h, i) => (
                  <div key={i} className="flex justify-between">
                    <span className="text-brand-gray/60">{h.day}</span>
                    <span className="font-medium text-brand-gray">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Warranty note */}
            <div className="bg-brand-orange/5 border border-brand-orange/20 rounded-xl p-5 flex items-start space-x-3">
              <ShieldCheck size={20} className="text-brand-orange shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-brand-gray text-sm">Yêu cầu bảo hành</p>
                <p className="text-brand-gray/60 text-xs mt-1 leading-relaxed">
                  Gửi ảnh và mô tả sự cố qua Zalo cùng hóa đơn mua hàng. Đội kỹ thuật sẽ xử lý trong 24h làm việc.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-surface-dim p-8 shadow-sm">
              {!submitted ? (
                <>
                  <h2 className="text-xl font-bold text-brand-gray uppercase tracking-tight mb-2">Gửi yêu cầu</h2>
                  <p className="text-brand-gray/50 text-sm mb-8">Phản hồi trong vòng 15 phút trong giờ làm việc.</p>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-bold text-brand-gray/60 uppercase tracking-widest block mb-1.5">Họ và tên *</label>
                        <input
                          type="text"
                          required
                          placeholder="Nguyễn Văn A"
                          className="w-full px-4 py-3 bg-surface-bright border border-surface-dim rounded-lg text-sm focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 transition-all"
                          value={form.name}
                          onChange={e => setForm({ ...form, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-brand-gray/60 uppercase tracking-widest block mb-1.5">Số điện thoại / Zalo *</label>
                        <input
                          type="tel"
                          required
                          placeholder="0912 345 678"
                          className="w-full px-4 py-3 bg-surface-bright border border-surface-dim rounded-lg text-sm focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 transition-all"
                          value={form.phone}
                          onChange={e => setForm({ ...form, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-brand-gray/60 uppercase tracking-widest block mb-1.5">Chủ đề</label>
                      <select
                        className="w-full px-4 py-3 bg-surface-bright border border-surface-dim rounded-lg text-sm focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 transition-all appearance-none"
                        value={form.subject}
                        onChange={e => setForm({ ...form, subject: e.target.value })}
                      >
                        <option value="">-- Chọn chủ đề --</option>
                        {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-brand-gray/60 uppercase tracking-widest block mb-1.5">Nội dung</label>
                      <textarea
                        rows={5}
                        placeholder="Mô tả yêu cầu của anh/chị — loại sản phẩm, diện tích, địa điểm dự án..."
                        className="w-full px-4 py-3 bg-surface-bright border border-surface-dim rounded-lg text-sm focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 transition-all resize-none"
                        value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-brand-orange text-white font-bold rounded-xl hover:bg-brand-gray transition-all flex items-center justify-center space-x-2 shadow-lg shadow-brand-orange/20 disabled:opacity-70"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send size={18} />
                          <span>GỬI YÊU CẦU</span>
                        </>
                      )}
                    </button>
                    <p className="text-[10px] text-brand-gray/40 text-center">
                      Thông tin được bảo mật. Chúng tôi chỉ liên hệ để hỗ trợ.
                    </p>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="text-green-500" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-gray mb-2">Đã nhận yêu cầu!</h3>
                  <p className="text-brand-gray/60 text-sm mb-8 max-w-sm mx-auto">
                    Cảm ơn anh/chị đã liên hệ. Đội ngũ XS Plus sẽ phản hồi trong vòng <strong>15 phút</strong> qua Zalo hoặc điện thoại.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={ZALO_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 px-8 py-3 bg-brand-orange text-white font-bold rounded-xl hover:bg-brand-gray transition-all"
                    >
                      <MessageCircle size={18} />
                      <span>Mở Zalo ngay</span>
                    </a>
                    <a
                      href={`tel:${HOTLINE}`}
                      className="flex items-center justify-center space-x-2 px-8 py-3 bg-brand-gray text-white font-bold rounded-xl hover:bg-brand-gray/90 transition-all"
                    >
                      <Phone size={18} />
                      <span>Gọi {HOTLINE_DISPLAY}</span>
                    </a>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Google Map */}
        <div className="mt-12 rounded-2xl overflow-hidden border border-surface-dim shadow-sm">
          <iframe
            src="https://maps.google.com/maps?q=319+Tr%E1%BA%A7n+Ph%C3%BA%2C+Th%E1%BA%A1ch+Linh%2C+th%C3%A0nh+ph%E1%BB%91+H%C3%A0+T%C4%A9nh%2C+H%C3%A0+T%C4%A9nh&t=&z=17&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="XS Plus Location"
          />
        </div>
      </div>
    </div>
  );
};
