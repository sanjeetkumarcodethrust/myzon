import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! 👋 I'm the Myzon Support Bot. How can I help you today?", sender: 'bot' }
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
      let botResponse = "Thanks for reaching out! Our support team will get back to you soon. Can I help you with anything else?";
      
      if (lowerInput.includes('order') || lowerInput.includes('track')) {
        botResponse = "To track your order, please visit the 'Track Order' page from the top menu and enter your Order ID.";
      } else if (lowerInput.includes('return') || lowerInput.includes('refund')) {
        botResponse = "We offer a hassle-free 7-day return policy. You can initiate a return directly from your account dashboard.";
      } else if (lowerInput.includes('hi') || lowerInput.includes('hello') || lowerInput.includes('hey')) {
        botResponse = "Hello! How can I assist you with your shopping today?";
      } else if (lowerInput.includes('shipping') || lowerInput.includes('delivery')) {
        botResponse = "Standard delivery takes 3-5 business days. Good news: we offer free shipping on orders over ₹499!";
      } else if (lowerInput.includes('contact') || lowerInput.includes('customer care') || lowerInput.includes('support')) {
        botResponse = "You can reach our customer support at support@myzon.com or call us at 1800-123-4567.";
      } else if (lowerInput.includes('payment') || lowerInput.includes('pay')) {
        botResponse = "We accept all major credit/debit cards, UPI, Net Banking, and Cash on Delivery (COD) for eligible items.";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chatbot Window */}
      {isOpen && (
        <div className="bg-white w-80 sm:w-96 rounded-2xl shadow-2xl border border-gray-100 flex flex-col mb-4 overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-200 h-[450px]">
          {/* Header */}
          <div className="bg-orange-500 text-white p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2">
              <Bot size={24} />
              <div>
                <h3 className="font-bold text-sm">Myzon Support</h3>
                <p className="text-[10px] text-orange-100 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span> Online
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-orange-600 p-1.5 rounded-full transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${msg.sender === 'user' ? 'bg-orange-100 text-orange-600' : 'bg-gray-200 text-gray-600'}`}>
                  {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div 
                  className={`p-3 rounded-2xl text-sm shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-orange-500 text-white rounded-tr-none' 
                      : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
            />
            <button 
              type="submit"
              disabled={!inputValue.trim()}
              className="bg-orange-500 text-white p-2.5 rounded-full hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              <Send size={18} className="ml-0.5" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
        >
          <MessageCircle size={28} className="group-hover:scale-110 transition-transform duration-300" />
        </button>
      )}
    </div>
  );
};
