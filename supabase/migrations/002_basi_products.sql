-- Migration: 002_basi_products.sql
-- Goal: Bulk insert/update 18 premium architectural aluminum products with their high-resolution architectural images.

INSERT INTO products (id, name, category, thickness, color, system_type, perfor, image_url, is_featured, sort_order) VALUES
  ('a3fe45d8-cce2-4d5a-a775-1bc6f3a8865b', 'Trần nhôm Clip-in 600x600 Standard', 'Clip-in', '0.6mm', 'Trắng sứ', 'Ẩn xương tam giác', 'Đục lỗ tiêu âm Ø1.8', 'https://trannhombasi.com.vn/thumb/420x300/1/upload/product/298362398166/tran-nhom-clipin.jpg', true, 1),
  ('91cb6055-9313-459e-8d23-8c2adc167a10', 'Trần nhôm Lay-in T-Shaped 600x600', 'Lay-in', '0.7mm', 'Trắng sứ', 'Nổi xương T-Shaped', 'Đục lỗ tiêu âm Ø1.8', 'https://trannhombasi.com.vn/thumb/420x300/1/upload/product/110283744940/tran-nhom-layin-tshaped.jpg', true, 2),
  ('ba82ded8-c305-43be-8336-4098f0c379a3', 'Trần nhôm Cell (Caro) 100x100 Wood', 'Caro', '0.5mm', 'Vân gỗ', 'Hệ xương Caro đan chéo', 'Không đục lỗ', 'https://trannhombasi.com.vn/thumb/420x300/1/upload/product/081203241183/tran-nhom-cell-caro.jpg', true, 3),
  ('535c9095-b433-45d7-a5e1-d24b18c65834', 'Trần nhôm U-Shaped 30x100 Premium', 'U-Shaped', '0.8mm', 'Đen nhám', 'Hệ xương cá U-Shaped', 'Không đục lỗ', 'https://trannhombasi.com.vn/thumb/420x300/1/upload/product/063493078995/tran-nhom-linear-ushaped.jpg', true, 4),
  ('94ed2925-58a7-4db1-8493-3a2d7c54888d', 'Trần nhôm Clip-in 600x600 Vân gỗ', 'Clip-in', '0.6mm', 'Vân gỗ', 'Ẩn xương tam giác', 'Không đục lỗ', 'https://trannhombasi.com.vn/thumb/420x300/1/upload/product/298362398166/tran-nhom-clipin.jpg', false, 5),
  ('a6f8c940-a2d6-4f16-851c-d9dad9024f50', 'Trần nhôm Cell (Caro) 150x150 Đen', 'Caro', '0.6mm', 'Đen nhám', 'Hệ xương Caro đan chéo', 'Không đục lỗ', 'https://trannhombasi.com.vn/thumb/420x300/1/upload/product/081203241183/tran-nhom-cell-caro.jpg', false, 6),
  ('0a0c102c-196d-4952-b88a-360d8bb30001', 'Trần nhôm E150-Shaped', 'Linear', '0.6mm', 'Trắng sứ', 'Hệ khung xương cá E150', 'Không đục lỗ', 'https://trannhombasi.com.vn/thumb/420x300/1/upload/product/618501857610/tran-nhom-e150shaped.jpg', false, 7),
  ('0a0c102c-196d-4952-b88a-360d8bb30002', 'Trần nhôm P-Shaped', 'Linear', '0.6mm', 'Vân gỗ', 'Hệ khung cá P-Shaped ghép khít', 'Không đục lỗ', 'https://trannhombasi.com.vn/thumb/420x300/1/upload/product/435227514618/tran-nhom-pshaped.jpg', false, 8),
  ('0a0c102c-196d-4952-b88a-360d8bb30005', 'Trần nhôm Basi-Omega', 'Linear', '0.7mm', 'Đen nhám', 'Hệ khung xương Omega đồng bộ', 'Không đục lỗ', 'https://trannhombasi.com.vn/thumb/420x300/1/upload/product/862077809828/tran-nhom-basiomega.jpg', false, 9),
  ('0a0c102c-196d-4952-b88a-360d8bb30006', 'Trần nhôm Linear U-Bullet', 'U-Shaped', '0.6mm', 'Trắng sứ', 'Hệ khung treo U-Bullet sập', 'Không đục lỗ', 'https://trannhombasi.com.vn/thumb/420x300/1/upload/product/809474190067/tran-nhom-linear-ubullet.jpg', false, 10),
  ('0a0c102c-196d-4952-b88a-360d8bb30008', 'Trần nhôm C85-Shaped', 'Linear', '0.6mm', 'Trắng sứ', 'Hệ xương cá C85', 'Không đục lỗ', 'https://trannhombasi.com.vn/thumb/420x300/1/upload/product/429493673900/tran-nhom-c85shaped.jpg', false, 11),
  ('0a0c102c-196d-4952-b88a-360d8bb30009', 'Trần nhôm C300-Shaped', 'Linear', '0.8mm', 'Trắng sứ', 'Hệ xương cá C300 chịu lực', 'Không đục lỗ', 'https://trannhombasi.com.vn/thumb/420x300/1/upload/product/975143109521/tran-nhom-c300shaped.jpg', false, 12),
  ('0a0c102c-196d-4952-b88a-360d8bb30010', 'Trần nhôm Linear C-Shaped', 'Linear', '0.6mm', 'Vân gỗ', 'Hệ xương cá C-Shaped đồng bộ', 'Không đục lỗ', 'https://trannhombasi.com.vn/thumb/420x300/1/upload/product/174874478122/tran-nhom-linear-cshaped.jpg', false, 13),
  ('0a0c102c-196d-4952-b88a-360d8bb30012', 'Trần nhôm Linear B-Shaped', 'Linear', '0.6mm', 'Vân gỗ', 'Hệ xương cá B-Shaped đa rộng', 'Không đục lỗ', 'https://trannhombasi.com.vn/thumb/420x300/1/upload/product/123442692973/tran-nhom-linear-bshaped.jpg', false, 14),
  ('0a0c102c-196d-4952-b88a-360d8bb30013', 'Trần nhôm Lay-in T-Black', 'Lay-in', '0.7mm', 'Trắng sứ', 'Hệ khung xương T-Black rãnh đen', 'Đục lỗ tiêu âm Ø1.8', 'https://trannhombasi.com.vn/thumb/420x300/1/upload/product/277627968109/tran-nhom-layin-tblack.jpg', false, 15),
  ('0a0c102c-196d-4952-b88a-360d8bb30014', 'Trần nhôm Polymorphic (Tạo hình)', 'Linear', '0.8mm', 'Trắng sứ', 'Khung xương chịu lực đa hướng', 'Không đục lỗ', 'https://trannhombasi.com.vn/thumb/420x300/1/upload/product/124931675011/tran-nhom-polymorphic.jpg', false, 16),
  ('0a0c102c-196d-4952-b88a-360d8bb30015', 'Trần nhôm Triangle - Tiles (Tam giác)', 'Clip-in', '0.7mm', 'Trắng sứ', 'Khung xương tam giác kép', 'Không đục lỗ', 'https://trannhombasi.com.vn/thumb/420x300/1/upload/product/918558426286/tran-nhom-triangle-tiles.jpg', false, 17),
  ('0a0c102c-196d-4952-b88a-360d8bb30016', 'Trần nhôm Lục giác Hexagon', 'Clip-in', '0.7mm', 'Trắng sứ', 'Hệ khung Clip-in tổ ong', 'Đục lỗ tiêu âm Ø1.8', 'https://trannhombasi.com.vn/thumb/420x300/1/upload/product/541158792258/tran-nhom-luc-giac-hexagon.jpg', false, 18)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  thickness = EXCLUDED.thickness,
  color = EXCLUDED.color,
  system_type = EXCLUDED.system_type,
  perfor = EXCLUDED.perfor,
  image_url = EXCLUDED.image_url,
  is_featured = EXCLUDED.is_featured,
  sort_order = EXCLUDED.sort_order;
