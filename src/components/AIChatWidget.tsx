import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface Message {
  role: 'user' | 'model' | 'system';
  content: string;
}

export const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: 'Chào anh/chị, em là trợ lý ảo của XS Plus. Em có thể tư vấn các hệ trần nhôm, độ dày, màu sắc hoặc nhận yêu cầu báo giá. Anh/chị cần hỗ trợ gì ạ?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [systemContext, setSystemContext] = useState('');
  
  const suggestions = [
    "Báo giá trần nhôm?",
    "Các loại trần nhôm XS Plus?",
    "Chính sách bảo hành?",
    "Tư vấn kỹ thuật?"
  ];
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch technical specs to use as system prompt
    fetch('/XS_Plus_Technical_Specs.md')
      .then(res => res.text())
      .then(text => setSystemContext(text))
      .catch(err => console.error('Failed to load system specs', err));
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    sendMessage(userMsg);
  };

  const sendMessage = async (text: string) => {
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        setMessages(prev => [...prev, { role: 'model', content: 'Hệ thống AI đang được bảo trì (Thiếu API Key). Vui lòng gọi Hotline 0378 226 269 để được hỗ trợ.' }]);
        setIsLoading(false);
        return;
      }

      // We use fetch directly to Gemini API since the official SDK might have browser restrictions or different syntax
      // that requires dangerouslyAllowBrowser. Using REST API is safer for client-side drop-in.
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: `Bạn là nhân viên tư vấn bán hàng của nhà máy trần nhôm XS Plus. Dưới đây là kiến thức sản phẩm của bạn:\n\n${systemContext}\n\nQuy tắc trả lời:\n1. Luôn lịch sự, chuyên nghiệp, xưng em gọi anh/chị.\n2. Trả lời ngắn gọn, đúng trọng tâm câu hỏi.\n3. Nếu khách hỏi giá, báo giá tham khảo và chủ động xin Số Điện Thoại/Zalo để bộ phận kinh doanh liên hệ gửi báo giá chi tiết.\n4. Tuyệt đối không bịa đặt thông tin ngoài tài liệu được cung cấp.\n5. SỬ DỤNG ĐỊNH DẠNG: Dùng Markdown (**đậm**) cho thông số quan trọng, dùng bullet points khi liệt kê, và thêm emoji phù hợp (như 🏗️, ✅, 📞) để câu trả lời sinh động, dễ đọc.` }]
          },
          contents: [
            ...messages.filter(m => m.role !== 'system').map(m => ({
              role: m.role,
              parts: [{ text: m.content }]
            })),
            { role: 'user', parts: [{ text: text }] }
          ]
        })
      });

      const data = await response.json();
      
      if (data.candidates && data.candidates[0].content.parts[0].text) {
        setMessages(prev => [...prev, { role: 'model', content: data.candidates[0].content.parts[0].text }]);
      } else {
        throw new Error('Invalid response from AI');
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', content: 'Xin lỗi, hệ thống đang bận. Anh/chị vui lòng để lại số điện thoại hoặc gọi Hotline nhé!' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 left-6 w-14 h-14 bg-brand-gray text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-brand-orange transition-colors z-50 group border border-white/10"
          >
            <Bot size={24} className="group-hover:scale-110 transition-transform" />
            {/* Notification Badge */}
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-surface-bright animate-pulse"></span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 left-6 w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-surface-dim"
          >
            {/* Header */}
            <div className="bg-brand-gray text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">XS Plus Assistant</h3>
                  <p className="text-[10px] text-white/70 flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                    Trực tuyến 24/7
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface-bright/30">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-brand-orange text-white ml-2' : 'bg-brand-gray text-white mr-2'}`}>
                      {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm whitespace-pre-wrap ${msg.role === 'user' ? 'bg-brand-orange text-white rounded-tr-none' : 'bg-surface-dim text-brand-gray rounded-tl-none border border-surface-dim/50'}`}>
                      {msg.content.split('\n').map((line, i) => (
                        <div key={i}>
                          {line.split(/(\*\*.*?\*\*)/).map((part, j) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                              return <strong key={j}>{part.slice(2, -2)}</strong>;
                            }
                            return part;
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex max-w-[80%] flex-row">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 bg-brand-gray text-white mr-2">
                      <Bot size={12} />
                    </div>
                    <div className="p-3 rounded-2xl bg-surface-dim text-brand-gray rounded-tl-none border border-surface-dim/50 flex items-center space-x-2">
                      <Loader2 size={14} className="animate-spin text-brand-orange" />
                      <span className="text-xs text-brand-gray/50">Đang trả lời...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-surface-dim">
              {/* Quick Suggestions */}
              {messages.length < 3 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(s)}
                      className="text-[11px] bg-surface-bright border border-surface-dim hover:border-brand-orange hover:text-brand-orange px-3 py-1.5 rounded-full transition-all text-brand-gray/70"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-center relative"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Nhập câu hỏi (Ví dụ: Trần clip-in dày bao nhiêu?)"
                  className="flex-1 pl-4 pr-12 py-3 bg-surface-bright border border-surface-dim rounded-full text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-brand-orange text-white rounded-full flex items-center justify-center disabled:opacity-50 hover:bg-brand-orange/90 transition-colors"
                >
                  <Send size={14} className="ml-0.5" />
                </button>
              </form>
              <div className="text-center mt-2">
                <span className="text-[9px] text-brand-gray/40">Powered by Google Gemini 2.5 Flash</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
