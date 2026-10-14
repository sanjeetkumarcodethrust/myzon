import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Smartphone, HelpCircle, Shield, ShoppingBag } from 'lucide-react';

export const TopBar = () => {
  return (
    <div className="bg-[#0a0b0d] text-gray-300 text-[11px] py-1.5 px-4 border-b border-neutral-800">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        {/* Sale Tag */}
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 font-black text-[9px] px-2 py-0.5 rounded tracking-wide uppercase flex items-center gap-1 shrink-0 shadow-xs">
            <Sparkles size={10} /> Live Now
          </span>
          <span className="font-medium text-white truncate">
            <strong>The Great Indian Festival:</strong> Up to 80% Off on Top Brands + Extra 10% Instant Discount on HDFC & SBI Cards!
          </span>
        </div>

        {/* Quick Links */}
        <div className="hidden lg:flex items-center gap-5 text-gray-300 shrink-0">
          <Link to="/track-order" className="hover:text-amber-400 transition-colors flex items-center gap-1">
            <ShoppingBag size={12} /> Track Order
          </Link>
          <span className="text-neutral-700">|</span>
          <Link to="/shop" className="hover:text-amber-400 transition-colors">
            Sell on Myzon
          </Link>
          <span className="text-neutral-700">|</span>
          <Link to="/track-order" className="hover:text-amber-400 transition-colors flex items-center gap-1">
            <HelpCircle size={12} /> 24x7 Customer Service
          </Link>
        </div>
      </div>
    </div>
  );
};
