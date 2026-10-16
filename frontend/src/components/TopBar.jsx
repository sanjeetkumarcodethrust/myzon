import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Truck, Headphones, UserCheck } from 'lucide-react';
import { useAuthStore } from '../store/useStore';

export const TopBar = () => {
  const { user } = useAuthStore();

  return (
    <div className="bg-[#08090b] text-neutral-300 text-[11px] py-2 px-4 border-b border-neutral-800/80 select-none">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        {/* Flagship Announcement */}
        <div className="flex items-center gap-2.5 overflow-hidden">
          <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 font-black text-[9px] px-2.5 py-0.5 rounded-full tracking-wider uppercase flex items-center gap-1 shrink-0 shadow-xs">
            <Sparkles size={10} /> Flagship Edition
          </span>
          {user ? (
            <span className="font-medium text-neutral-200 truncate text-xs flex items-center gap-1.5">
              <span>Welcome back, <strong className="text-amber-400 font-bold">{user.name}</strong>!</span>
              <span className="text-neutral-500">•</span>
              <span className="text-neutral-400">Complimentary Express Courier Active</span>
            </span>
          ) : (
            <span className="font-medium text-neutral-200 truncate text-xs">
              Complimentary Express Courier on orders over ₹999 • Use code <strong className="text-amber-400 tracking-wide font-bold">LUXE10</strong> for 10% off
            </span>
          )}
        </div>

        {/* Studio Quick Links */}
        <div className="hidden lg:flex items-center gap-6 text-neutral-400 text-xs shrink-0">
          {user && (
            <span className="text-amber-400 font-bold flex items-center gap-1">
              <UserCheck size={13} className="text-amber-400" />
              <span>{user.name}</span>
            </span>
          )}
          <Link to="/track-order" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
            <Truck size={13} className="text-amber-400" /> Track Shipment
          </Link>
          <span className="text-neutral-800">•</span>
          <Link to="/deals" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
            <Sparkles size={13} className="text-amber-400" /> The Vault
          </Link>
          <span className="text-neutral-800">•</span>
          <Link to="/track-order" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
            <Headphones size={13} className="text-amber-400" /> VIP Concierge
          </Link>
        </div>
      </div>
    </div>
  );
};
