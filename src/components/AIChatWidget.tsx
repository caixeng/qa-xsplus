import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { trackAIChatOpened } from './Tracking';

interface Message {
  role: 'user' | 'model' | 'system';
  content: string;
}

const MAX_MESSAGES = 20;

export const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: 'Chào anh/chị, em là trợ lý ảo của XS Plus. Em có thể tư vấn các hệ trần nhôm, độ dày, màu sắc hoặc nhận yêu cầu báo giá. Anh/chị cần hỗ trợ gì ạ?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [systemContext, setSystemContext] = useState('');
  const [lastSentAt, setLastSentAt] = useState(0);

  const suggestions = [
    "Báo giá trần nhôm?",
    "Các loại trần nhôm XS Plus?",
    "Chính sách bảo hành?",
    "Tư vấn kỹ thuật?"
  ];
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/XS_Plus_Technical_Specs.md')
      .then(res => res.text())
      .then(text => setSystemContext(text))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input.trim());
  };

  const sendMessage = async (text: string) => {
    // Rate limit: 1 giây giữa các tin
    const now = Date.now();
    if (now - lastSentAt < 1000) return;
    setLastSentAt(now);

    // Max messages guard
    const userMsgCount = messages.filter(m => m.role === 'user').length;
    if (userMsgCount >= MAX_MESSAGES) {
      setMessages(prev => [...prev, {
        role: 'model',
        content: 'Phiên chat đã đạt giới hạn. Vui lòng gọi Hotline **0378 226 269** hoặc nhắn Zalo để được hỗ trợ tiếp nhé! 📞'
      }]);
      return;
    }

    setInput('');
    const updatedMessages: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { messages: updatedMessages, systemContext },
      });

      if (error) throw error;

      setMessages(prev => [...prev, { role: 'model', content: data.text }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'model',
        content: 'Xin lỗi, hệ thống đang bận. Anh/chị vui lòng để lại số điện thoại hoặc gọi Hotline nhé!'
      }]);
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
            onClick={() => { setIsOpen(true); trackAIChatOpened(); }}
            className="fixed bottom-6 left-6 w-14 h-14 bg-brand-gray text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-brand-orange transition-colors z-50 group border border-white/10"
          >
            <Bot size={24} className="group-hover:scale-110 transition-transform" />
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
