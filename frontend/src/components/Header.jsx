import React from 'react';
import { Heart, ShoppingCart, Search, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <div className="bg-white py-4 border-b border-gray-100">
      <div className="max-w-[1600px] mx-auto px-4 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1">
          <span className="text-3xl font-black tracking-tight text-gray-900">My<span className="text-orange-500">zon</span></span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-3xl flex items-center bg-gray-50 rounded-md border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-orange-500 transition-shadow">
          <input 
            type="text" 
            placeholder="Search for products, brands and more..." 
            className="w-full bg-transparent py-2.5 px-4 text-sm focus:outline-none text-gray-700"
          />
          <button className="bg-orange-500 hover:bg-orange-600 text-white p-2.5 px-6 transition-colors">
            <Search size={20} />
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <Link to="/wishlist" className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition-colors">
            <div className="relative">
              <Heart size={24} />
              <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">3</span>
            </div>
            <span className="text-sm font-medium hidden lg:block">Wishlist</span>
          </Link>

          <Link to="/cart" className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition-colors">
            <div className="relative">
              <ShoppingCart size={24} />
              <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">2</span>
            </div>
            <span className="text-sm font-medium hidden lg:block">Cart</span>
          </Link>

          <div className="flex items-center gap-3 border-l border-gray-200 pl-6 cursor-pointer group">
            <div className="flex flex-col items-end">
              <span className="text-sm font-bold text-gray-900">Hi, Sanjeet</span>
              <span className="text-xs text-gray-500 group-hover:text-orange-500 transition-colors">My Account</span>
            </div>
            <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden border border-gray-200">
              <img src="https://ui-avatars.com/api/?name=Sanjeet&background=ff9900&color=fff" alt="User Avatar" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
