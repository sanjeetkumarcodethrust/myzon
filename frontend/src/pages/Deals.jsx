import React, { useState, useEffect } from 'react';
import { Clock, Star, ShoppingBag, Zap, Sparkles, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/useStore';

export const dealProducts = [
  {
    id: 90001, brand: 'boAt', title: 'Rockerz 450 Lossless Wireless Headphones',
    price: 24990, originalPrice: 34990, discount: '29% OFF', rating: 4.8, reviews: '4.2k',
    endsIn: 12400,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=400&h=400'
  },
  {
    id: 90002, brand: 'Apple', title: 'MacBook Air M2 (256GB - Midnight Edition)',
    price: 99900, originalPrice: 114900, discount: '13% OFF', rating: 4.9, reviews: '8.1k',
    endsIn: 86400,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=400&h=400'
  },
  {
    id: 90003, brand: 'Dyson', title: 'V15 Detect Absolute Intelligent Vacuum',
    price: 54900, originalPrice: 65900, discount: '17% OFF', rating: 4.7, reviews: '950',
    endsIn: 4500,
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&q=80&w=400&h=400'
  },
  {
    id: 90004, brand: 'Samsung', title: '55" The Frame 4K QLED Art TV',
    price: 84990, originalPrice: 144900, discount: '41% OFF', rating: 4.6, reviews: '2.3k',
    endsIn: 36000,
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
    <div className="flex items-center gap-1.5 text-amber-400 font-mono text-xs font-bold bg-neutral-900 px-3 py-1.5 rounded-xl border border-neutral-800">
      <Clock size={14} className="text-amber-400 animate-pulse" />
      <span>{h.toString().padStart(2, '0')}h</span>:
      <span>{m.toString().padStart(2, '0')}m</span>:
      <span>{s.toString().padStart(2, '0')}s</span>
    </div>
  );
};

export const Deals = () => {
  const { addToCart } = useCartStore();

  return (
    <div className="bg-[#0a0b0e] text-neutral-100 min-h-screen py-8 select-none">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
        
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-[#171821] via-[#121318] to-[#0a0b0d] border border-amber-500/30 rounded-3xl p-8 sm:p-12 text-white mb-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between shadow-2xl">
          <div className="relative z-10 max-w-lg mb-8 md:mb-0">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold mb-4 bg-neutral-900 px-3.5 py-1.5 rounded-full border border-amber-500/30 shadow-sm">
              <Zap size={14} className="fill-current text-amber-400" />
              <span>THE FLASH VAULT • PRIVATE ALLOCATION</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight mb-4">
              Curated Vault Drops
            </h1>
            <p className="text-neutral-400 text-sm sm:text-base mb-8 leading-relaxed">
              Save up to 70% on flagship electronics, artisanal sacred crafts, and modern designer fashion. Limited allocation refreshed daily.
            </p>
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-950 font-bold px-7 py-3.5 rounded-2xl text-xs sm:text-sm transition-all shadow-md active:scale-98 cursor-pointer"
            >
              <span>Explore All Vault Drops</span>
              <ArrowRight size={15} />
            </Link>
          </div>
          
          {/* Graphic Timer */}
          <div className="relative z-10 bg-neutral-900/80 backdrop-blur-md p-6 rounded-3xl border border-neutral-800 shadow-xl">
            <div className="text-center">
              <div className="text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-3">Vault Allocation Closes in</div>
              <div className="flex gap-3">
                <div className="bg-[#121316] text-amber-400 border border-neutral-800 w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-black shadow-lg">
                  <span className="text-2xl">02</span>
                  <span className="text-[9px] uppercase text-neutral-500">Days</span>
                </div>
                <div className="bg-[#121316] text-amber-400 border border-neutral-800 w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-black shadow-lg">
                  <span className="text-2xl">14</span>
                  <span className="text-[9px] uppercase text-neutral-500">Hours</span>
                </div>
                <div className="bg-[#121316] text-amber-400 border border-neutral-800 w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-black shadow-lg">
                  <span className="text-2xl">35</span>
                  <span className="text-[9px] uppercase text-neutral-500">Mins</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles size={13} />
              <span>Limited Quantities</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Spotlight Vault Drops
            </h2>
          </div>
          <Link to="/shop" className="text-xs font-bold text-neutral-400 hover:text-amber-400 transition-colors inline-flex items-center gap-1">
            <span>Explore Catalog</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {dealProducts.map(product => (
            <div key={product.id} className="bg-[#121316] border border-neutral-800/80 rounded-2xl p-5 shadow-lg hover:shadow-2xl hover:border-amber-500/40 transition-all duration-300 group relative flex flex-col h-full">
              <div className="absolute top-4 left-4 bg-neutral-900 text-amber-400 border border-amber-500/30 text-[10px] font-black px-2.5 py-0.5 rounded-full z-10 shadow-xs uppercase tracking-wider">
                {product.discount}
              </div>
              
              <Link to={`/product/${product.id}`} className="block h-52 flex items-center justify-center mb-4 overflow-hidden rounded-xl bg-neutral-900/60 relative p-3">
                <img src={product.image} alt={product.title} className="max-h-full object-contain group-hover:scale-108 transition-transform duration-500 drop-shadow-md" />
              </Link>
              
              <div className="flex justify-between items-start mb-1.5">
                <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">{product.brand}</div>
                <div className="flex items-center gap-0.5 text-amber-400 text-xs font-bold">
                  <Star size={11} className="fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                </div>
              </div>
              
              <Link to={`/product/${product.id}`}>
                <h4 className="font-bold text-neutral-200 text-sm mb-4 line-clamp-2 min-h-[40px] group-hover:text-amber-300 transition-colors leading-snug">
                  {product.title}
                </h4>
              </Link>
              
              <div className="mt-auto">
                <div className="mb-3">
                  <CountdownTimer initialSeconds={product.endsIn} />
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-neutral-800">
                  <div>
                    <div className="text-xs text-neutral-500 line-through">₹{product.originalPrice.toLocaleString()}</div>
                    <div className="text-xl font-black text-amber-400">₹{product.price.toLocaleString()}</div>
                  </div>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-950 p-3 rounded-xl transition-all shadow-md cursor-pointer font-bold active:scale-95"
                    title="Add to Bag"
                    aria-label="Add to Bag"
                  >
                    <ShoppingBag size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
