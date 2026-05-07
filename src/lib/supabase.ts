import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Lead types
export interface Lead {
  name: string;
  phone: string;
  product?: string;
  area_m2?: number;
  note?: string;
  company?: string;
  source: 'quote_modal' | 'technical_unlock' | 'calculator' | 'chatbot' | 'contact_page' | 'dealer_portal';
}

// Save lead to Supabase
export const saveLead = async (data: Lead) => {
  if (!supabaseUrl) {
    console.warn('Supabase not configured, skipping lead save');
    return { error: null };
  }
  return await supabase.from('leads').insert(data);
};
