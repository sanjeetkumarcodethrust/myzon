import React from 'react';
import { Link } from 'react-router-dom';
import { 
  X, User, ChevronRight, Flame, Laptop, Shirt, Home as HomeIcon, 
  HeartPulse, Dumbbell, BookOpen, Puzzle, Car, Zap, Tag, Gift, HelpCircle, 
  ShoppingBag, Shield
} from 'lucide-react';
import { useUIStore, useAuthStore } from '../store/useStore';

export const AmazonDrawer = () => {
  const { isDrawerOpen, closeDrawer, openLoginModal } = useUIStore();
  const { user, logout } = useAuthStore();

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        onClick={closeDrawer}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity duration-300 animate-fadeIn"
      />

      {/* Drawer Box */}
      <div className="relative w-full max-w-[365px] bg-white h-full shadow-2xl flex flex-col z-10 animate-slideRight overflow-hidden">
        {/* Drawer Header (Amazon dark navy) */}
        <div className="bg-[#232f3e] text-white p-4.5 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/30 text-white font-bold">
              {user ? (
                user.name.charAt(0).toUpperCase()
              ) : (
                <User size={22} className="text-[#febd69]" />
              )}
            </div>
            <div>
              <p className="text-xs text-gray-300">Hello,</p>
              {user ? (
                <p className="text-base font-bold text-white">{user.name}</p>
              ) : (
                <button 
                  onClick={() => { closeDrawer(); openLoginModal(); }}
                  className="text-base font-bold text-[#febd69] hover:underline"
                >
                  Sign in
                </button>
              )}
            </div>
          </div>
          <button 
            onClick={closeDrawer}
            className="text-gray-300 hover:text-white p-1 rounded-md"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-100 text-sm text-gray-800">
          {/* Trending */}
          <div className="py-3">
            <h4 className="px-5 py-2 text-xs font-black uppercase text-gray-900 tracking-wider">
              Trending
            </h4>
            <Link 
              to="/deals" 
              onClick={closeDrawer}
              className="flex items-center justify-between px-5 py-2.5 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Flame size={16} className="text-orange-500" />
                <span>Best Sellers</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </Link>
            <Link 
              to="/new-arrivals" 
              onClick={closeDrawer}
              className="flex items-center justify-between px-5 py-2.5 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Zap size={16} className="text-yellow-500" />
                <span>New Arrivals</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </Link>
            <Link 
              to="/deals" 
              onClick={closeDrawer}
              className="flex items-center justify-between px-5 py-2.5 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Tag size={16} className="text-red-500" />
                <span>Today's Lightning Deals</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </Link>
          </div>

          {/* Shop by Department */}
          <div className="py-3">
            <h4 className="px-5 py-2 text-xs font-black uppercase text-gray-900 tracking-wider">
              Shop by Department
            </h4>
            <Link 
              to="/shop?category=pooja-samagri" 
              onClick={closeDrawer}
              className="flex items-center justify-between px-5 py-2.5 hover:bg-orange-50 hover:text-orange-600 transition-colors"
            >
              <div className="flex items-center gap-3 font-semibold text-orange-600">
                <Flame size={16} className="text-orange-500" />
                <span>Pooja & Spiritual Samagri</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </Link>
            <Link 
              to="/shop?category=electronics" 
              onClick={closeDrawer}
              className="flex items-center justify-between px-5 py-2.5 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Laptop size={16} className="text-blue-500" />
                <span>Mobiles & Electronics</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </Link>
            <Link 
              to="/shop?category=fashion" 
              onClick={closeDrawer}
              className="flex items-center justify-between px-5 py-2.5 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Shirt size={16} className="text-pink-500" />
                <span>Men & Women Fashion</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </Link>
            <Link 
              to="/shop?category=home-kitchen" 
              onClick={closeDrawer}
              className="flex items-center justify-between px-5 py-2.5 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <HomeIcon size={16} className="text-emerald-500" />
                <span>Home & Kitchen Appliances</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </Link>
            <Link 
              to="/shop?category=beauty-health" 
              onClick={closeDrawer}
              className="flex items-center justify-between px-5 py-2.5 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <HeartPulse size={16} className="text-purple-500" />
                <span>Beauty & Personal Care</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </Link>
            <Link 
              to="/shop?category=sports-outdoors" 
              onClick={closeDrawer}
              className="flex items-center justify-between px-5 py-2.5 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Dumbbell size={16} className="text-indigo-500" />
                <span>Sports & Fitness</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </Link>
            <Link 
              to="/shop?category=automotive" 
              onClick={closeDrawer}
              className="flex items-center justify-between px-5 py-2.5 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Car size={16} className="text-slate-600" />
                <span>Car & Motorbike Accessories</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </Link>
            <Link 
              to="/categories" 
              onClick={closeDrawer}
              className="flex items-center justify-between px-5 py-2.5 text-[#2874f0] font-bold hover:bg-blue-50 transition-colors"
            >
              <span>See All Categories</span>
              <ChevronRight size={16} />
            </Link>
          </div>

          {/* Programs & Features */}
          <div className="py-3">
            <h4 className="px-5 py-2 text-xs font-black uppercase text-gray-900 tracking-wider">
              Programs & Features
            </h4>
            <div className="px-5 py-2 text-xs text-amber-700 bg-amber-50 font-semibold mx-4 rounded-md mb-2 flex items-center gap-2">
              <Gift size={14} className="text-amber-600" />
              <span>Myzon Prime: Free One-Day Delivery</span>
            </div>
            <Link 
              to="/track-order" 
              onClick={closeDrawer}
              className="flex items-center justify-between px-5 py-2.5 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag size={16} className="text-gray-600" />
                <span>Your Orders & Shipments</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </Link>
            <Link 
              to="/wishlist" 
              onClick={closeDrawer}
              className="flex items-center justify-between px-5 py-2.5 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Tag size={16} className="text-gray-600" />
                <span>Your Wishlist</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </Link>
          </div>

          {/* Help & Settings */}
          <div className="py-3">
            <h4 className="px-5 py-2 text-xs font-black uppercase text-gray-900 tracking-wider">
              Help & Settings
            </h4>
            <Link 
              to="/track-order" 
              onClick={closeDrawer}
              className="flex items-center gap-3 px-5 py-2.5 hover:bg-gray-100 transition-colors"
            >
              <HelpCircle size={16} className="text-gray-500" />
              <span>Customer Service & Help</span>
            </Link>
            {user ? (
              <button 
                onClick={() => { logout(); closeDrawer(); }}
                className="w-full text-left px-5 py-2.5 text-red-600 hover:bg-red-50 font-bold transition-colors"
              >
                Sign Out ({user.name})
              </button>
            ) : (
              <button 
                onClick={() => { closeDrawer(); openLoginModal(); }}
                className="w-full text-left px-5 py-2.5 text-[#2874f0] hover:bg-blue-50 font-bold transition-colors"
              >
                Sign In / Register
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
