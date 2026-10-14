import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Greetings! ✦ Welcome to Myzon Studio Concierge. How may I assist with your orders or drops today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = { id: Date.now(), text: inputValue.trim(), sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Simulate bot response with a slight delay
    setTimeout(() => {
      const lowerInput = userMsg.text.toLowerCase();
      let botResponse = "Thank you for reaching out to Myzon Studio Concierge. A styling specialist will assist you shortly. Is there anything else I can check?";
      
      if (lowerInput.includes('order') || lowerInput.includes('track')) {
        botResponse = "To monitor your express shipment, tap 'Track Shipment' from the top bar and enter your Order ID (e.g. MZ-123456).";
      } else if (lowerInput.includes('return') || lowerInput.includes('exchange')) {
        botResponse = "Myzon offers a complimentary 7-day white-glove doorstep exchange. You can initiate an exchange directly from your account dashboard.";
      } else if (lowerInput.includes('hi') || lowerInput.includes('hello') || lowerInput.includes('hey')) {
        botResponse = "Hello! ✦ Welcome to the Studio. How can I assist with your drops or wishlist?";
      } else if (lowerInput.includes('shipping') || lowerInput.includes('delivery')) {
        botResponse = "All orders above ₹999 receive complimentary express air courier delivery within 24-48 hours!";
      } else if (lowerInput.includes('payment') || lowerInput.includes('pay')) {
        botResponse = "We support all major cards, Instant UPI QR, Net Banking, and Cash on Delivery (COD).";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none">
      {/* Chatbot Window */}
      {isOpen && (
        <div className="bg-[#121316] text-neutral-100 w-80 sm:w-96 rounded-3xl shadow-2xl border border-neutral-800 flex flex-col mb-4 overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-200 h-[460px]">
          {/* Header */}
          <div className="bg-[#0e0f12] text-white p-4 flex items-center justify-between border-b border-neutral-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Bot size={18} />
              </div>
              <div>
                <h3 className="font-bold text-xs flex items-center gap-1.5">
                  <span>Studio Concierge</span>
                  <span className="text-[9px] bg-amber-400/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.2 rounded-full font-bold">24/7</span>
                </h3>
                <p className="text-[10px] text-neutral-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span> VIP Concierge Active
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white hover:bg-neutral-800 p-1.5 rounded-full transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-[#0a0b0e] flex flex-col gap-3">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${msg.sender === 'user' ? 'bg-amber-400 text-neutral-950 font-bold' : 'bg-neutral-800 text-amber-400'}`}>
                  {msg.sender === 'user' ? <User size={12} /> : <Bot size={12} />}
                </div>
                <div 
                  className={`p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 font-bold rounded-tr-none shadow-sm' 
                      : 'bg-[#121316] text-neutral-300 border border-neutral-800 rounded-tl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-3 bg-[#0e0f12] border-t border-neutral-800 flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask concierge..."
              className="flex-1 bg-neutral-900 text-white placeholder-neutral-500 border border-neutral-700 rounded-full px-4 py-2 text-xs focus:outline-none focus:border-amber-400 transition-colors"
            />
            <button 
              type="submit"
              disabled={!inputValue.trim()}
              className="bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 p-2 rounded-full hover:from-amber-500 hover:to-amber-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-xs cursor-pointer"
            >
              <Send size={15} className="ml-0.5" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#121316] hover:bg-neutral-900 text-amber-400 border border-amber-500/40 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 group cursor-pointer"
          aria-label="Open Concierge Chat"
        >
          <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
        </button>
      )}
    </div>
  );
};
