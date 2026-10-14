import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Zap, ArrowRight } from 'lucide-react';
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
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-5 md:p-6 mb-8 overflow-hidden">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-100 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#121316] text-amber-400 border border-amber-500/30 flex items-center justify-center shadow-sm">
            <Zap size={22} className="fill-current text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
                Deal of the Day
              </h3>
              <span className="bg-[#121316] text-amber-400 border border-amber-500/30 text-[10px] font-black px-2 py-0.5 rounded uppercase shadow-xs">
                Limited Time
              </span>
            </div>
            <p className="text-xs text-gray-500">Handpicked top discounts refreshed daily</p>
          </div>
        </div>

        {/* Live Timer */}
        <div className="flex items-center gap-2 bg-amber-50/80 border border-amber-200/80 text-amber-900 px-3.5 py-1.5 rounded-xl font-bold text-xs sm:text-sm">
          <Clock size={16} className="text-amber-600 animate-pulse" />
          <span>Ends in:</span>
          <span className="font-mono bg-white px-2 py-0.5 rounded border border-amber-200 text-amber-900 shadow-xs">
            {hours.toString().padStart(2, '0')}h : {minutes.toString().padStart(2, '0')}m : {seconds.toString().padStart(2, '0')}s
          </span>
        </div>

        {/* View All Button */}
        <Link
          to="/deals"
          className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-950 font-bold text-xs px-4 py-2 rounded-lg transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
        >
          <span>View All Deals</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Grid of Deal Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {products.slice(0, 6).map((product) => (
          <div key={product.id} className="flex flex-col">
            <ProductCard product={product} />
            {/* Progress bar */}
            <div className="mt-2 bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full" 
                style={{ width: `${Math.min(95, 45 + (product.id * 7) % 45)}%` }} 
              />
            </div>
            <span className="text-[10px] text-gray-400 mt-1">
              🔥 {Math.min(95, 45 + (product.id * 7) % 45)}% Claimed
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
