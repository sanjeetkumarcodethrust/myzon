import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Zap, ArrowRight, Sparkles } from 'lucide-react';
import { ProductCard } from './ProductCard';

export const FlashDealsSection = ({ products }) => {
  const [timeLeft, setTimeLeft] = useState(14400 + 1820); // ~4 hours 30 mins

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 18000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="bg-[#121316] rounded-3xl border border-neutral-800 shadow-2xl p-6 sm:p-8 mb-12 relative overflow-hidden select-none">
      
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-800/80 mb-6">
        
        {/* Title */}
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-neutral-950 flex items-center justify-center shadow-lg shadow-amber-500/20 shrink-0">
            <Zap size={24} className="fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                The Flash Vault
              </h3>
              <span className="bg-neutral-900 text-amber-400 border border-amber-500/30 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Limited Drops
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">High-demand catalog items at special studio prices</p>
          </div>
        </div>

        {/* Live Timer + Action */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 text-neutral-300 px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold">
            <Clock size={16} className="text-amber-400 animate-pulse" />
            <span className="text-neutral-400 text-xs">Closes In:</span>
            <span className="font-mono text-amber-400 font-bold tracking-wider">
              {hours.toString().padStart(2, '0')}h : {minutes.toString().padStart(2, '0')}m : {seconds.toString().padStart(2, '0')}s
            </span>
          </div>

          <Link
            to="/deals"
            className="inline-flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white font-semibold text-xs px-4 py-2.5 rounded-2xl border border-neutral-700 hover:border-amber-500/40 transition-all cursor-pointer"
          >
            <span>Explore All Drops</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>

      {/* Grid of Deal Products */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {products.slice(0, 4).map((product) => (
          <div key={product.id} className="flex flex-col">
            <ProductCard product={product} />
            {/* Urgency Progress Bar */}
            <div className="mt-2 px-1">
              <div className="flex items-center justify-between text-[10px] text-neutral-400 mb-1">
                <span>⚡ 82% Claimed</span>
                <span className="text-amber-400 font-semibold">Fast Selling</span>
              </div>
              <div className="w-full bg-neutral-900 rounded-full h-1.5 overflow-hidden border border-neutral-800">
                <div className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full w-[82%]" />
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
