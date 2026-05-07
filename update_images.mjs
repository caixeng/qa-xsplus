const data = [
  {
    "id": "a3fe45d8-cce2-4d5a-a775-1bc6f3a8865b",
    "image_url": "https://trannhombasi.com.vn/thumb/420x300/1/upload/product/298362398166/tran-nhom-clipin.jpg"
  },
  {
    "id": "91cb6055-9313-459e-8d23-8c2adc167a10",
    "image_url": "https://trannhombasi.com.vn/thumb/420x300/1/upload/product/110283744940/tran-nhom-layin-tshaped.jpg"
  },
  {
    "id": "ba82ded8-c305-43be-8336-4098f0c379a3",
    "image_url": "https://trannhombasi.com.vn/thumb/420x300/1/upload/product/081203241183/tran-nhom-cell-caro.jpg"
  },
  {
    "id": "535c9095-b433-45d7-a5e1-d24b18c65834",
    "image_url": "https://trannhombasi.com.vn/thumb/420x300/1/upload/product/063493078995/tran-nhom-linear-ushaped.jpg"
  },
  {
    "id": "94ed2925-58a7-4db1-8493-3a2d7c54888d",
    "image_url": "https://trannhombasi.com.vn/thumb/420x300/1/upload/product/298362398166/tran-nhom-clipin.jpg"
  },
  {
    "id": "a6f8c940-a2d6-4f16-851c-d9dad9024f50",
    "image_url": "https://trannhombasi.com.vn/thumb/420x300/1/upload/product/081203241183/tran-nhom-cell-caro.jpg"
  },
  {
    "id": "0a0c102c-196d-4952-b88a-360d8bb30001",
    "image_url": "https://trannhombasi.com.vn/thumb/420x300/1/upload/product/618501857610/tran-nhom-e150shaped.jpg"
  },
  {
    "id": "0a0c102c-196d-4952-b88a-360d8bb30002",
    "image_url": "https://trannhombasi.com.vn/thumb/420x300/1/upload/product/435227514618/tran-nhom-pshaped.jpg"
  },
  {
    "id": "0a0c102c-196d-4952-b88a-360d8bb30005",
    "image_url": "https://trannhombasi.com.vn/thumb/420x300/1/upload/product/862077809828/tran-nhom-basiomega.jpg"
  },
  {
    "id": "0a0c102c-196d-4952-b88a-360d8bb30006",
    "image_url": "https://trannhombasi.com.vn/thumb/420x300/1/upload/product/809474190067/tran-nhom-linear-ubullet.jpg"
  },
  {
    "id": "0a0c102c-196d-4952-b88a-360d8bb30008",
    "image_url": "https://trannhombasi.com.vn/thumb/420x300/1/upload/product/429493673900/tran-nhom-c85shaped.jpg"
  },
  {
    "id": "0a0c102c-196d-4952-b88a-360d8bb30009",
    "image_url": "https://trannhombasi.com.vn/thumb/420x300/1/upload/product/975143109521/tran-nhom-c300shaped.jpg"
  },
  {
    "id": "0a0c102c-196d-4952-b88a-360d8bb30010",
    "image_url": "https://trannhombasi.com.vn/thumb/420x300/1/upload/product/174874478122/tran-nhom-linear-cshaped.jpg"
  },
  {
    "id": "0a0c102c-196d-4952-b88a-360d8bb30012",
    "image_url": "https://trannhombasi.com.vn/thumb/420x300/1/upload/product/123442692973/tran-nhom-linear-bshaped.jpg"
  },
  {
    "id": "0a0c102c-196d-4952-b88a-360d8bb30013",
    "image_url": "https://trannhombasi.com.vn/thumb/420x300/1/upload/product/277627968109/tran-nhom-layin-tblack.jpg"
  },
  {
    "id": "0a0c102c-196d-4952-b88a-360d8bb30014",
    "image_url": "https://trannhombasi.com.vn/thumb/420x300/1/upload/product/124931675011/tran-nhom-polymorphic.jpg"
  },
  {
    "id": "0a0c102c-196d-4952-b88a-360d8bb30015",
    "image_url": "https://trannhombasi.com.vn/thumb/420x300/1/upload/product/918558426286/tran-nhom-triangle-tiles.jpg"
  },
  {
    "id": "0a0c102c-196d-4952-b88a-360d8bb30016",
    "image_url": "https://trannhombasi.com.vn/thumb/420x300/1/upload/product/541158792258/tran-nhom-luc-giac-hexagon.jpg"
  }
];

const supabaseUrl = 'https://tldhpdfdpplljwfoyttk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsZGhwZGZkcHBsbGp3Zm95dHRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNDQwMDcsImV4cCI6MjA5MzYyMDAwN30.EVc62LsXpPMLvQHbzkDPKYdyAZbAzMeCithkcmXYSJI';

async function update() {
  for (const p of data) {
    const res = await fetch(`${supabaseUrl}/rest/v1/products?id=eq.${p.id}`, {
      method: 'PATCH',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ image_url: p.image_url })
    });
    console.log(p.id, res.status);
  }
}

update();
