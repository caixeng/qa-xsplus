import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Filter, Search, Grid, List as ListIcon, ChevronDown, Check, X, Shield, Settings, Ruler, Palette, PackageX } from 'lucide-react';
import { Skeleton } from '../components/Skeleton';
import { getProducts } from '../utils/productsData';
import { getProductImage } from '../utils/imageFallback';

const FilterSection = ({ title, children, icon }: { title: string, children: React.ReactNode, icon: React.ReactNode }) => (
  <div className="mb-8">
    <div className="flex items-center space-x-2 mb-4 text-brand-gray/80">
      {icon}
      <h4 className="text-xs font-bold uppercase tracking-widest">{title}</h4>
    </div>
    <div className="space-y-2">
      {children}
    </div>
  </div>
);

const CheckboxFilter = ({ label, count, checked, onChange, ...props }: { label: string, count?: number, checked: boolean, onChange: () => void, [key: string]: any }) => (
  <label className="flex items-center justify-between group cursor-pointer" {...props}>
    <div className="flex items-center space-x-3">
      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${checked ? 'bg-brand-orange border-brand-orange' : 'border-surface-dim bg-white shadow-sm'}`}>
        {checked && <Check size={14} className="text-white" />}
      </div>
      <span className={`text-sm transition-colors ${checked ? 'text-brand-gray font-semibold' : 'text-brand-gray/60'}`}>{label}</span>
    </div>
    {count !== undefined && <span className="text-[10px] font-mono text-brand-gray/30">{count}</span>}
    <input type="checkbox" className="hidden" checked={checked} onChange={onChange} />
  </label>
);

export const ProductCatalog = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedThickness, setSelectedThickness] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        // Simulate slightly longer loading for demoing skeletons
        await new Promise(r => setTimeout(r, 600));

        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const toggleFilter = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, val: string) => {
    if (list.includes(val)) {
      setList(list.filter(i => i !== val));
    } else {
      setList([...list, val]);
    }
  };

  const filteredProducts = products.filter(p => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(p.category);
    const thicknessMatch = selectedThickness.length === 0 || selectedThickness.includes(p.thickness);
    const colorMatch = selectedColor.length === 0 || selectedColor.includes(p.color);
    const searchMatch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && thicknessMatch && colorMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-surface-bright">
      {/* Header */}
      <div className="bg-brand-gray text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="flex items-center space-x-2 text-brand-orange mb-4 text-xs font-bold tracking-widest uppercase">
                <Grid size={14} />
                <span>Sản phẩm kiến trúc</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tight">KHO TRẦN NHÔM XS PLUS</h1>
            </div>
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
                <input 
                  type="text" 
                  placeholder="Tìm kiếm mã sản phẩm, loại trần..."
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition-all text-white"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-24">
              <h3 className="text-lg font-bold mb-8 flex items-center">
                <Filter size={18} className="mr-2" /> BỘ LỌC NÂNG CAO
              </h3>

              <FilterSection title="Dòng sản phẩm" icon={<Settings size={14} />}>
                {['Clip-in', 'Lay-in', 'Caro', 'U-Shaped', 'Linear'].map(cat => (
                  <CheckboxFilter 
                    key={cat} 
                    label={cat} 
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleFilter(selectedCategories, setSelectedCategories, cat)}
                  />
                ))}
              </FilterSection>

              <FilterSection title="Độ dày nhôm" icon={<Ruler size={14} />}>
                {['0.5mm', '0.6mm', '0.7mm', '0.8mm'].map(t => (
                  <CheckboxFilter 
                    key={t} 
                    label={t} 
                    checked={selectedThickness.includes(t)}
                    onChange={() => toggleFilter(selectedThickness, setSelectedThickness, t)}
                  />
                ))}
              </FilterSection>

              <FilterSection title="Màu sắc & Hoàn thiện" icon={<Palette size={14} />}>
                {['Trắng sứ', 'Vân gỗ', 'Đen nhám'].map(c => (
                  <CheckboxFilter 
                    key={c} 
                    label={c} 
                    checked={selectedColor.includes(c)}
                    onChange={() => toggleFilter(selectedColor, setSelectedColor, c)}
                  />
                ))}
              </FilterSection>

              <button 
                onClick={() => { setSelectedCategories([]); setSelectedThickness([]); setSelectedColor([]); setSearchQuery('') }}
                className="w-full py-3 text-xs font-bold text-brand-gray/40 hover:text-brand-orange transition-colors flex items-center justify-center border-t border-surface-dim mt-8"
              >
                <X size={14} className="mr-2" /> XÓA TẤT CẢ BỘ LỌC
              </button>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-surface-dim/40">
              <p className="text-xs font-medium text-brand-gray/60 uppercase tracking-widest">Hiển thị {filteredProducts.length} sản phẩm</p>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-all ${viewMode === 'grid' ? 'bg-brand-gray text-white' : 'text-brand-gray/40 hover:bg-surface-dim/20'}`}
                >
                  <Grid size={18} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-all ${viewMode === 'list' ? 'bg-brand-gray text-white' : 'text-brand-gray/40 hover:bg-surface-dim/20'}`}
                >
                  <ListIcon size={18} />
                </button>
              </div>
            </div>

            {loading ? (
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6' : 'grid-cols-1 gap-4'}`}>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className={`bento-card flex ${viewMode === 'list' ? 'flex-row h-40' : 'flex-col h-[400px]'}`}>
                    <Skeleton className={`${viewMode === 'list' ? 'w-48 h-full rounded-none' : 'h-1/2 w-full rounded-none'}`} />
                    <div className="p-6 flex flex-col flex-grow gap-4">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                      <div className="mt-auto flex justify-between">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-8 w-8 rounded-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6' : 'grid-cols-1 gap-4'}`}>
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((p) => (
                    <motion.div
                      key={p.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className={`bento-card group flex ${viewMode === 'list' ? 'flex-row h-40' : 'flex-col'}`}
                    >
                      <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48' : 'aspect-[4/3]'}`}>
                        <Link to={`/san-pham/${p.id}`}>
                          <img 
                            src={getProductImage(p)} 
                            alt={p.name} 
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = getProductImage(p);
                            }}
                          />
                        </Link>
                        <div className="absolute top-3 left-3 flex flex-col space-y-2">
                          <span className="bg-brand-gray/90 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm tracking-widest uppercase">{p.category}</span>
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-grow">
                        <Link to={`/san-pham/${p.id}`}>
                          <h3 className="text-lg font-bold mb-3 group-hover:text-brand-orange transition-colors">{p.name}</h3>
                        </Link>
                        
                        <div className="grid grid-cols-2 gap-y-2 mb-6">
                          <div className="flex items-center space-x-2">
                            <Ruler size={12} className="text-brand-gray/30" />
                            <span className="text-[11px] text-brand-gray/60">{p.thickness}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Shield size={12} className="text-brand-gray/30" />
                            <span className="text-[11px] text-brand-gray/60">{p.perfor}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Palette size={12} className="text-brand-gray/30" />
                            <span className="text-[11px] text-brand-gray/60">{p.color}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Settings size={12} className="text-brand-gray/30" />
                            <span className="text-[11px] text-brand-gray/60">Hệ {p.system_type}</span>
                          </div>
                        </div>

                        <div className="mt-auto flex items-center justify-between">
                          <Link to={`/san-pham/${p.id}`} className="text-xs font-bold text-brand-orange hover:underline uppercase tracking-widest">
                            Chi tiết & Báo giá
                          </Link>
                          <Link to={`/san-pham/${p.id}`} className="bg-surface-bright p-2 rounded-full border border-surface-dim hover:bg-brand-orange hover:text-white transition-all text-brand-gray shadow-sm">
                            <ChevronDown size={16} className="-rotate-90" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
            
            {!loading && filteredProducts.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-24 flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 bg-surface-dim/30 rounded-full flex items-center justify-center mb-6 text-brand-gray/30">
                  <PackageX size={32} />
                </div>
                <h3 className="text-xl font-display font-bold text-brand-gray mb-2">Không có sản phẩm nào</h3>
                <p className="text-brand-gray/50 max-w-sm">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm để xem các sản phẩm trần nhôm khác.</p>
                <button 
                  onClick={() => { setSelectedCategories([]); setSelectedThickness([]); setSelectedColor([]); setSearchQuery('') }}
                  className="mt-6 btn-secondary"
                >
                  Xóa bộ lọc
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
