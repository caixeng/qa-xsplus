import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../utils/productsData';
import { motion } from 'motion/react';
import { ArrowLeft, Ruler, Shield, Palette, Settings, Download, Calculator, CheckCircle2, FileText, PenTool } from 'lucide-react';
import { Skeleton } from '../components/Skeleton';
import toast from 'react-hot-toast';
import { getProductImage } from '../utils/imageFallback';
import { trackViewProduct } from '../components/Tracking';
import { useSEO } from '../hooks/useSEO';

export const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useSEO({
    title: product ? `${product.name} | Trần Nhôm XS Plus` : 'Sản Phẩm Trần Nhôm | XS Plus',
    description: product?.description || 'Thông số kỹ thuật và báo giá trần nhôm XS Plus. Nhà máy sản xuất trực tiếp tại Hà Tĩnh.',
  });

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        if (id) {
          const data = await getProductById(id);
          setProduct(data);
          if (data) trackViewProduct(id, data.name);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleDownload = (type: string) => {
    if (type === 'Spec Sheet PDF') {
      const link = document.createElement('a');
      link.href = '/docs/XS_Plus_Technical_Spec.pdf';
      link.download = 'XS_Plus_Technical_Spec.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Đã tải xuống Spec Sheet (.pdf) thành công!');
      return;
    }

    toast.success(`Đang chuẩn bị file ${type} để tải xuống...`);
    // Mock download behavior
    setTimeout(() => {
      toast.success(`Tải ${type} hoàn tất!`);
    }, 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-bright pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-4 w-32 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Skeleton className="aspect-square rounded-2xl w-full" />
            <div className="space-y-6">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-20 w-full" />
              <div className="grid grid-cols-2 gap-4 py-8">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
              <Skeleton className="h-12 w-full mt-8" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-surface-bright flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-brand-gray mb-4">Không tìm thấy sản phẩm</h2>
        <Link to="/catalog" className="text-brand-orange hover:underline flex items-center">
          <ArrowLeft size={16} className="mr-2" /> Quay lại danh mục
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-bright pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link to="/catalog" className="inline-flex items-center text-sm font-bold text-brand-gray/60 hover:text-brand-orange transition-colors mb-8 uppercase tracking-widest">
          <ArrowLeft size={16} className="mr-2" /> Quay lại danh mục
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="aspect-square rounded-2xl overflow-hidden bg-white border border-surface-dim shadow-sm">
              <img 
                src={getProductImage(product)} 
                alt={product.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = getProductImage(product);
                }}
              />
            </div>
            {/* Thumbnail placehoder for future */}
            <div className="grid grid-cols-4 gap-4">
              <div className="aspect-square rounded-lg border-2 border-brand-orange overflow-hidden cursor-pointer">
                <img 
                  src={getProductImage(product)} 
                  alt="thumb" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = getProductImage(product);
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-6">
              <span className="inline-block bg-brand-orange/10 text-brand-orange text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 border border-brand-orange/20">
                Trần Nhôm {product.category}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display uppercase tracking-tight text-brand-gray mb-4">
                {product.name}
              </h1>
              <p className="text-brand-gray/70 leading-relaxed text-sm sm:text-base">
                Hệ trần nhôm kiến trúc cao cấp, phù hợp cho các không gian đòi hỏi tính thẩm mỹ cao, độ bền vượt trội và khả năng tiêu âm tiêu chuẩn. Sản xuất trực tiếp tại nhà máy XS Plus.
              </p>
            </div>

            {/* Technical Specifications Table */}
            <div className="mb-8 border border-surface-dim rounded-xl overflow-hidden bg-white shadow-sm">
              <div className="bg-brand-gray text-white px-4 py-3 font-bold text-sm uppercase tracking-widest flex items-center">
                <Settings size={16} className="mr-2 text-brand-orange" /> Bảng Thông Số Kỹ Thuật
              </div>
              <div className="divide-y divide-surface-dim/50">
                <div className="flex px-4 py-3 hover:bg-surface-bright transition-colors">
                  <div className="w-1/3 text-xs font-bold text-brand-gray/60 flex items-center uppercase"><Ruler size={14} className="mr-2"/> Độ dày</div>
                  <div className="w-2/3 text-sm font-medium text-brand-gray">{product.thickness}</div>
                </div>
                <div className="flex px-4 py-3 hover:bg-surface-bright transition-colors">
                  <div className="w-1/3 text-xs font-bold text-brand-gray/60 flex items-center uppercase"><Palette size={14} className="mr-2"/> Màu sắc</div>
                  <div className="w-2/3 text-sm font-medium text-brand-gray">{product.color}</div>
                </div>
                <div className="flex px-4 py-3 hover:bg-surface-bright transition-colors">
                  <div className="w-1/3 text-xs font-bold text-brand-gray/60 flex items-center uppercase"><Shield size={14} className="mr-2"/> Bề mặt</div>
                  <div className="w-2/3 text-sm font-medium text-brand-gray">{product.perfor}</div>
                </div>
                <div className="flex px-4 py-3 hover:bg-surface-bright transition-colors">
                  <div className="w-1/3 text-xs font-bold text-brand-gray/60 flex items-center uppercase"><Settings size={14} className="mr-2"/> Hệ khung</div>
                  <div className="w-2/3 text-sm font-medium text-brand-gray">{product.system_type}</div>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <h3 className="font-bold text-brand-gray flex items-center">
                <CheckCircle2 size={18} className="text-brand-orange mr-2" /> Ưu điểm vượt trội
              </h3>
              <ul className="space-y-2 text-sm text-brand-gray/70">
                <li className="flex items-start"><span className="mr-2 text-brand-orange">•</span> Siêu nhẹ, độ bền cao, không cong vênh, không rỉ sét.</li>
                <li className="flex items-start"><span className="mr-2 text-brand-orange">•</span> Lớp sơn tĩnh điện siêu bền màu, chống bám bụi bẩn.</li>
                <li className="flex items-start"><span className="mr-2 text-brand-orange">•</span> Chống cháy, chống ẩm mốc tuyệt đối.</li>
                <li className="flex items-start"><span className="mr-2 text-brand-orange">•</span> Dễ dàng thi công, tháo lắp và bảo trì hệ thống cơ điện phía trên.</li>
              </ul>
            </div>

            <div className="mt-auto flex flex-col sm:flex-row gap-4 mb-8">
              <Link 
                to="/calculator"
                className="flex-1 btn-primary shadow-lg shadow-brand-orange/20"
              >
                <Calculator size={18} className="mr-2" /> Dự Toán Ngay
              </Link>
              <button 
                className="flex-1 bg-brand-gray text-white py-4 px-6 rounded-lg font-bold uppercase tracking-widest hover:bg-brand-gray-light transition-all text-center flex items-center justify-center shadow-lg shadow-brand-gray/20 focus:ring-2 focus:ring-brand-gray focus:outline-none focus:ring-offset-2"
                onClick={() => window.open('https://zalo.me/0378226269', '_blank')}
              >
                Nhận Báo Giá Zalo
              </button>
            </div>

            {/* B2B Documents */}
            <div className="p-6 bg-brand-orange-light/50 rounded-xl border border-brand-orange/20">
              <h4 className="font-bold text-sm uppercase tracking-widest mb-4 flex items-center text-brand-gray">
                <Download size={16} className="mr-2 text-brand-orange" /> Tài Liệu Thiết Kế & Thi Công
              </h4>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => handleDownload('Bản vẽ CAD')}
                  className="flex-1 btn-secondary bg-white text-brand-gray hover:bg-brand-orange hover:text-white border border-surface-dim hover:border-brand-orange transition-colors text-xs"
                >
                  <PenTool size={14} className="mr-2" /> Tải Bản Vẽ CAD (.dwg)
                </button>
                <button 
                  onClick={() => handleDownload('Spec Sheet PDF')}
                  className="flex-1 btn-secondary bg-white text-brand-gray hover:bg-brand-orange hover:text-white border border-surface-dim hover:border-brand-orange transition-colors text-xs"
                >
                  <FileText size={14} className="mr-2" /> Tải Spec Sheet (.pdf)
                </button>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
};
