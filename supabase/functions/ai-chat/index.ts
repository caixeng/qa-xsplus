import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { messages, systemContext } = await req.json();

    const apiKey = Deno.env.get('GEMINI_API_KEY');
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const systemPrompt = `Bạn là nhân viên tư vấn bán hàng của nhà máy trần nhôm XS Plus. Dưới đây là kiến thức sản phẩm của bạn:\n\n${systemContext || ''}\n\nQuy tắc trả lời:\n1. Luôn lịch sự, chuyên nghiệp, xưng em gọi anh/chị.\n2. Trả lời ngắn gọn, đúng trọng tâm câu hỏi.\n3. Nếu khách hỏi giá, báo giá tham khảo và chủ động xin Số Điện Thoại/Zalo để bộ phận kinh doanh liên hệ gửi báo giá chi tiết.\n4. Tuyệt đối không bịa đặt thông tin ngoài tài liệu được cung cấp.\n5. SỬ DỤNG ĐỊNH DẠNG: Dùng Markdown (**đậm**) cho thông số quan trọng, dùng bullet points khi liệt kê, và thêm emoji phù hợp (như 🏗️, ✅, 📞) để câu trả lời sinh động, dễ đọc.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: systemPrompt }],
          },
          contents: messages.filter((m: { role: string }) => m.role !== 'system').map((m: { role: string; content: string }) => ({
            role: m.role,
            parts: [{ text: m.content }],
          })),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Gemini API error');
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error('Invalid response from Gemini');

    return new Response(JSON.stringify({ text }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
