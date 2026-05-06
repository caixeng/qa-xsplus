-- ============================================
-- XS Plus - Supabase Database Schema
-- Run this in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/tldhpdfdpplljwfoyttk/sql
-- ============================================

-- 1. LEADS TABLE - Thu thập thông tin khách hàng tiềm năng
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  company text,
  product text,           -- Sản phẩm quan tâm
  area_m2 numeric,        -- Diện tích thi công
  note text,
  source text DEFAULT 'quote_modal',  -- 'quote_modal' | 'technical_unlock' | 'calculator' | 'chatbot'
  status text DEFAULT 'new',          -- 'new' | 'contacted' | 'quoted' | 'closed'
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. PRODUCTS TABLE - Danh mục sản phẩm động
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,   -- 'Clip-in' | 'Lay-in' | 'Caro' | 'U-Shaped'
  thickness text,           -- '0.6mm' | '0.7mm' etc
  color text,
  system_type text,         -- 'Hidden' | 'Exposed'
  perfor text,              -- Đục lỗ hay không
  image_url text,
  spec_pdf_url text,
  cad_url text,
  is_featured boolean DEFAULT false,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- 3. Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies
-- Leads: anyone can INSERT (form submissions), only service_role can SELECT
CREATE POLICY "Anyone can submit leads"
  ON leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can view leads"
  ON leads FOR SELECT
  TO authenticated
  USING (true);

-- Products: anyone can read
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated can manage products"
  ON products FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 5. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 6. Sample products data
INSERT INTO products (name, category, thickness, color, system_type, perfor, image_url, is_featured, sort_order) VALUES
  ('Clip-in 600x600 Standard', 'Clip-in', '0.6mm', 'Trắng sứ', 'Hidden', 'Không đục lỗ', 'https://caa.com.vn/wp-content/uploads/2023/12/Khu-lam-viec-VP-ket-hop-boi-duong-nghiep-vu-HK.jpg', true, 1),
  ('Lay-in 600x600 Acoustic', 'Lay-in', '0.7mm', 'Trắng sứ', 'Exposed', 'Đục lỗ Ø1.8', 'https://caa.com.vn/wp-content/uploads/2023/07/IMG_4236.jpg', true, 2),
  ('Caro Cell 100x100 Wood', 'Caro', '0.5mm', 'Vân gỗ', 'Hidden', 'Không đục lỗ', 'https://caa.com.vn/wp-content/uploads/2022/08/tran-nhom-caro-100x100-1.jpg', true, 3),
  ('U-Shaped 30x100 Premium', 'U-Shaped', '0.8mm', 'Đen nhám', 'Hidden', 'Không đục lỗ', 'https://caa.com.vn/wp-content/uploads/2023/04/TC-U-VG-6.jpg', true, 4),
  ('Clip-in 600x600 Vân gỗ', 'Clip-in', '0.6mm', 'Vân gỗ', 'Hidden', 'Không đục lỗ', 'https://caa.com.vn/wp-content/uploads/2023/06/TC-BG-5.jpg', false, 5),
  ('Caro Cell 150x150 Đen', 'Caro', '0.6mm', 'Đen nhám', 'Hidden', 'Không đục lỗ', 'https://caa.com.vn/wp-content/uploads/2022/08/z3578474025264_432ebb75d2bacba7864924efb51812fd.jpg', false, 6)
ON CONFLICT DO NOTHING;
