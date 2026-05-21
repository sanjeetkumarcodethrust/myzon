import React, { useState, useEffect } from 'react';
import { Clock, Star, ShoppingCart, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const dealProducts = [
  {
    id: 1, brand: 'Sony', title: 'WH-1000XM5 Wireless Headphones',
    price: 24990, originalPrice: 34990, discount: '29% OFF', rating: 4.8, reviews: '4.2k',
    endsIn: 12400, // seconds
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=400&h=400'
  },
  {
    id: 2, brand: 'Apple', title: 'MacBook Air M2 (256GB)',
    price: 99900, originalPrice: 114900, discount: '13% OFF', rating: 4.9, reviews: '8.1k',
    endsIn: 86400, // seconds
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=400&h=400'
  },
  {
    id: 3, brand: 'Dyson', title: 'V15 Detect Absolute Vacuum',
    price: 54900, originalPrice: 65900, discount: '17% OFF', rating: 4.7, reviews: '950',
    endsIn: 4500, // seconds
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&q=80&w=400&h=400'
  },
  {
    id: 4, brand: 'Samsung', title: '55" The Frame 4K QLED TV',
    price: 84990, originalPrice: 144900, discount: '41% OFF', rating: 4.6, reviews: '2.3k',
    endsIn: 36000, // seconds
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=400&h=400'
  }
];

const CountdownTimer = ({ initialSeconds }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return (
    <div className="flex items-center gap-1.5 text-red-500 font-bold bg-red-50 px-3 py-1.5 rounded-md border border-red-100">
      <Clock size={16} />
      <span>{h.toString().padStart(2, '0')}</span>:
      <span>{m.toString().padStart(2, '0')}</span>:
      <span>{s.toString().padStart(2, '0')}</span>
    </div>
  );
};

export const Deals = () => {
  return (
    <div className="max-w-[1600px] mx-auto px-4 py-8">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl p-8 md:p-12 text-white mb-10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between">
        <div className="relative z-10 max-w-lg mb-8 md:mb-0">
          <div className="flex items-center gap-2 text-yellow-300 font-bold mb-4 bg-white/20 inline-flex px-3 py-1 rounded-full backdrop-blur-sm">
            <Zap size={18} className="fill-current" /> Lightning Deals
          </div>
          <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">Biggest Sale of the Season</h1>
          <p className="text-white/80 text-lg mb-8">Save up to 70% on top electronics, fashion, and home appliances. Hurry, offers end soon!</p>
          <button className="bg-white text-red-600 hover:bg-gray-50 font-bold px-8 py-3 rounded-lg transition-colors shadow-lg">
            Shop All Deals
          </button>
        </div>
        
        {/* Graphic */}
        <div className="relative z-10 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
          <div className="text-center">
            <div className="text-sm font-bold uppercase tracking-widest text-white/80 mb-2">Sale ends in</div>
            <div className="flex gap-4">
              <div className="bg-white text-red-600 w-16 h-16 rounded-xl flex flex-col items-center justify-center font-black shadow-lg">
                <span className="text-2xl">02</span>
                <span className="text-[10px] uppercase">Days</span>
              </div>
              <div className="bg-white text-red-600 w-16 h-16 rounded-xl flex flex-col items-center justify-center font-black shadow-lg">
                <span className="text-2xl">14</span>
                <span className="text-[10px] uppercase">Hours</span>
              </div>
              <div className="bg-white text-red-600 w-16 h-16 rounded-xl flex flex-col items-center justify-center font-black shadow-lg">
                <span className="text-2xl">35</span>
                <span className="text-[10px] uppercase">Mins</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400 opacity-20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
          Deals of the Day <span className="text-red-500">🔥</span>
        </h2>
        <Link to="/shop" className="text-orange-500 font-bold hover:underline">View All</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dealProducts.map(product => (
          <div key={product.id} className="bg-white border-2 border-red-100 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:border-red-500 transition-all group relative flex flex-col h-full">
            <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-black px-3 py-1 rounded-full z-10 shadow-sm">
              {product.discount}
            </div>
            
            <div className="h-56 flex items-center justify-center mb-5 overflow-hidden rounded-xl bg-gray-50 relative">
              <img src={product.image} alt={product.title} className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300 mix-blend-multiply" />
            </div>
            
            <div className="flex justify-between items-start mb-2">
              <div className="text-xs text-gray-500 font-medium">{product.brand}</div>
              <div className="flex text-orange-400 text-xs">
                <Star size={12} className="fill-current" />
                <span className="text-gray-600 ml-1 font-medium">{product.rating}</span>
              </div>
            </div>
            
            <h4 className="font-bold text-gray-900 text-base mb-4 line-clamp-2 min-h-[48px]">{product.title}</h4>
            
            <div className="mt-auto">
              <div className="mb-4">
                <CountdownTimer initialSeconds={product.endsIn} />
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <div className="text-sm text-gray-400 line-through mb-0.5">₹{product.originalPrice.toLocaleString()}</div>
                  <div className="text-2xl font-black text-gray-900">₹{product.price.toLocaleString()}</div>
                </div>
                <button className="bg-gray-900 text-white p-3 rounded-xl hover:bg-orange-500 transition-colors shadow-sm group-hover:shadow-md">
                  <ShoppingCart size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
