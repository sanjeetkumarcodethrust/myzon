import React from 'react';
import { Link } from 'react-router-dom';
import { 
  X, User, ChevronRight, Flame, Laptop, Shirt, Home as HomeIcon, 
  Sparkles, Zap, Tag, Gift, HelpCircle, ShoppingBag, ShieldCheck,
  Compass, Headphones, Watch, Gem, MapPin 
} from 'lucide-react';
import { useUIStore, useAuthStore } from '../store/useStore';

export const AmazonDrawer = () => {
  const { isDrawerOpen, closeDrawer, openLoginModal, location, openPincodeModal } = useUIStore();
  const { user, logout } = useAuthStore();

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex select-none">
      {/* Backdrop */}
      <div 
        onClick={closeDrawer}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-[360px] bg-[#0e0f14] text-neutral-200 h-full shadow-2xl flex flex-col z-10 border-r border-neutral-800 overflow-hidden animate-in slide-in-from-left duration-300">
        
        {/* Header */}
        <div className="bg-[#121318] p-5 flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-neutral-900 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold shadow-xs">
              {user ? (
                user.name.charAt(0).toUpperCase()
              ) : (
                <User size={20} className="text-amber-400" />
              )}
            </div>
            <div>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">Myzon Client</span>
              {user ? (
                <p className="text-sm font-bold text-white truncate max-w-[170px]">{user.name}</p>
              ) : (
                <button 
                  onClick={() => { closeDrawer(); openLoginModal(); }}
                  className="text-sm font-bold text-white hover:text-amber-400 cursor-pointer transition-colors"
                >
                  Sign in / Join Club
                </button>
              )}
            </div>
          </div>
          <button 
            onClick={closeDrawer}
            className="text-neutral-400 hover:text-white p-1.5 rounded-full hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close Menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Live Delivery Location Banner */}
        <div 
          onClick={() => { closeDrawer(); openPincodeModal(); }}
          className="bg-[#15161c] px-4 py-2.5 border-b border-neutral-800 flex items-center justify-between cursor-pointer hover:bg-neutral-900 transition-colors"
        >
          <div className="flex items-center gap-2 text-xs">
            <MapPin size={14} className="text-amber-400 shrink-0" />
            <span className="text-neutral-400">Deliver to:</span>
            <strong className="text-white truncate max-w-[170px]">
              {location.city ? `${location.city}${location.pincode ? ` (${location.pincode})` : ''}` : 'Detect Location'}
            </strong>
          </div>
          <span className="text-[10px] text-amber-400 font-bold border border-amber-500/30 px-2 py-0.5 rounded-lg">
            Change
          </span>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto divide-y divide-neutral-800/80 text-xs">
          
          {/* Curated Highlights */}
          <div className="py-3 px-3">
            <h4 className="px-3 pb-2 text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
              Curated Highlights
            </h4>
            <div className="space-y-0.5">
              <Link
                to="/deals"
                onClick={closeDrawer}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-amber-400 font-bold hover:bg-amber-400/10 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Zap size={15} className="text-amber-400 fill-amber-400" />
                  <span>The Flash Vault</span>
                </div>
                <ChevronRight size={14} className="text-neutral-600" />
              </Link>
              <Link
                to="/new-arrivals"
                onClick={closeDrawer}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-neutral-200 hover:text-white hover:bg-neutral-800/60 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles size={15} className="text-amber-400" />
                  <span>New Season Drops</span>
                </div>
                <ChevronRight size={14} className="text-neutral-600" />
              </Link>
              <Link
                to="/brands"
                onClick={closeDrawer}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-neutral-200 hover:text-white hover:bg-neutral-800/60 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Gem size={15} className="text-amber-400" />
                  <span>Curated Ateliers & Brands</span>
                </div>
                <ChevronRight size={14} className="text-neutral-600" />
              </Link>
            </div>
          </div>

          {/* Collections by Department */}
          <div className="py-3 px-3">
            <h4 className="px-3 pb-2 text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
              Flagship Collections
            </h4>
            <div className="space-y-0.5">
              <Link
                to="/shop?category=electronics"
                onClick={closeDrawer}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-neutral-200 hover:text-white hover:bg-neutral-800/60 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Headphones size={15} className="text-neutral-400" />
                  <span>High-Fidelity Audio & Tech</span>
                </div>
                <ChevronRight size={14} className="text-neutral-600" />
              </Link>

              <Link
                to="/shop?category=pooja-samagri"
                onClick={closeDrawer}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-amber-300 hover:bg-neutral-800/60 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Flame size={15} className="text-amber-400" />
                  <span>Sacred Vedic & Artisanal Brass</span>
                </div>
                <ChevronRight size={14} className="text-neutral-600" />
              </Link>

              <Link
                to="/shop?category=fashion"
                onClick={closeDrawer}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-neutral-200 hover:text-white hover:bg-neutral-800/60 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Shirt size={15} className="text-neutral-400" />
                  <span>Designer Apparel & Footwear</span>
                </div>
                <ChevronRight size={14} className="text-neutral-600" />
              </Link>

              <Link
                to="/shop?category=home-kitchen"
                onClick={closeDrawer}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-neutral-200 hover:text-white hover:bg-neutral-800/60 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <HomeIcon size={15} className="text-neutral-400" />
                  <span>Home Sanctuary & Appliances</span>
                </div>
                <ChevronRight size={14} className="text-neutral-600" />
              </Link>

              <Link
                to="/shop?maxPrice=999"
                onClick={closeDrawer}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-neutral-200 hover:text-white hover:bg-neutral-800/60 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Tag size={15} className="text-amber-400" />
                  <span>Curated Under ₹999</span>
                </div>
                <ChevronRight size={14} className="text-neutral-600" />
              </Link>
            </div>
          </div>

          {/* Client Concierge */}
          <div className="py-3 px-3">
            <h4 className="px-3 pb-2 text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
              Client Concierge
            </h4>
            <div className="space-y-0.5">
              <Link
                to="/track-order"
                onClick={closeDrawer}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-neutral-300 hover:text-white hover:bg-neutral-800/60 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <ShoppingBag size={15} className="text-neutral-400" />
                  <span>Track Your Order</span>
                </div>
                <ChevronRight size={14} className="text-neutral-600" />
              </Link>

              <Link
                to="/track-order"
                onClick={closeDrawer}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-neutral-300 hover:text-white hover:bg-neutral-800/60 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck size={15} className="text-amber-400" />
                  <span>Authenticity Guarantee</span>
                </div>
                <ChevronRight size={14} className="text-neutral-600" />
              </Link>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0a0b0e] border-t border-neutral-800/80 text-center text-[11px] text-neutral-500">
          MYZON Studio Edition • Curated 2026
        </div>

      </div>
    </div>
  );
};
