import { supabase } from '../lib/supabase';

export interface Product {
  id: string;
  name: string;
  category: 'Clip-in' | 'Lay-in' | 'Caro' | 'U-Shaped' | 'Linear';
  thickness: string;
  color: string;
  system_type: string;
  perfor: string;
  image_url: string | null;
  spec_pdf_url: string | null;
  cad_url: string | null;
  is_featured: boolean;
  sort_order: number;
}

export const getProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Failed to fetch from Supabase:', error);
    return [];
  }
  
  if (data && data.length > 0) {
    return data.map(item => ({
      ...item,
      category: (['Clip-in', 'Lay-in', 'Caro', 'U-Shaped', 'Linear'].includes(item.category)
        ? item.category
        : 'Linear') as any
    }));
  }
  return [];
};

export const getProductById = async (id: string): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Failed to fetch product ${id} from Supabase:`, error);
    return null;
  }
  
  if (data) {
    return {
      ...data,
      category: (['Clip-in', 'Lay-in', 'Caro', 'U-Shaped', 'Linear'].includes(data.category)
        ? data.category
        : 'Linear') as any
    };
  }
  return null;
};
