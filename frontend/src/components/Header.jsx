import React, { useState, useEffect, useRef } from 'react';
import { Heart, ShoppingCart, Search, MapPin, ChevronDown, User, Sparkles, Globe, LogOut, ArrowRight, Package } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useCartStore, useWishlistStore, useAuthStore, useUIStore } from '../store/useStore';

const SEARCH_SUGGESTIONS = [
  'Pooja Hawan Samagri Kit',
  'boAt Rockerz Bluetooth Headphones',
  'Noise Smartwatch Pulse 3',
  'Nike Air Max Running Shoes',
  'Luxury Cotton Bath Towels',
  'Organic Mint Whitening Toothpaste',
  'Canon DSLR Camera',
  'Apple AirPods Pro',
  'Home & Kitchen Appliances',
];

export const Header = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [isSuggestOpen, setIsSuggestOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const suggestRef = useRef(null);
  const accountRef = useRef(null);

  const navigate = useNavigate();
  const { cartItems } = useCartStore();
  const { wishlistItems } = useWishlistStore();
  const { user, logout } = useAuthStore();
  const { location, openPincodeModal, openLoginModal, language, setLanguage } = useUIStore();

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
    setSelectedCategory(searchParams.get('category') || 'all');
  }, [searchParams]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (suggestRef.current && !suggestRef.current.contains(e.target)) {
        setIsSuggestOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setIsAccountOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    setIsSuggestOpen(false);
    let target = '/shop?';
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (selectedCategory && selectedCategory !== 'all') params.set('category', selectedCategory);
    
    navigate(`/shop?${params.toString()}`);
  };

  const handleSelectSuggestion = (s) => {
    setQuery(s);
    setIsSuggestOpen(false);
    navigate(`/shop?q=${encodeURIComponent(s)}`);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + (item.qty || 1), 0);

  return (
    <div className="bg-[#121316] text-white sticky top-0 z-40 shadow-md border-b border-neutral-800">
      <div className="max-w-[1600px] mx-auto px-4 py-2.5 flex items-center justify-between gap-3 md:gap-5">
        
        {/* 1. Logo */}
        <Link to="/" className="flex flex-col items-start shrink-0 group py-1">
          <div className="flex items-center gap-1.5">
            <span className="text-2xl md:text-3xl font-black tracking-tight text-white">
              My<span className="text-amber-400">zon</span>
            </span>
            <span className="text-[10px] bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 font-black px-1.5 py-0.5 rounded shadow-xs">
              .in
            </span>
          </div>
          <div className="flex items-center gap-1 -mt-1 text-[10px] text-gray-300">
            <span>Explore</span>
            <span className="text-amber-400 font-bold italic flex items-center">
              Plus <Sparkles size={9} className="ml-0.5 fill-amber-400" />
            </span>
          </div>
        </Link>

        {/* 2. Deliver To / Pincode Selector */}
        <button
          onClick={openPincodeModal}
          className="hidden sm:flex items-center gap-1.5 p-1.5 rounded-sm hover:ring-1 hover:ring-white transition-all text-left shrink-0 cursor-pointer"
        >
          <MapPin size={18} className="text-amber-400 shrink-0 -mt-2" />
          <div className="flex flex-col text-xs leading-tight">
            <span className="text-gray-300 text-[11px] truncate max-w-[100px]">
              Delivering to {user ? user.name.split(' ')[0] : 'India'}
            </span>
            <span className="font-bold text-white text-xs flex items-center gap-0.5">
              {location.city} {location.pincode}
              <ChevronDown size={11} className="text-gray-400" />
            </span>
          </div>
        </button>

        {/* 3. Amazon Smart Search Bar */}
        <div ref={suggestRef} className="flex-1 max-w-3xl relative">
          <form onSubmit={handleSearch} className="flex items-center rounded-md overflow-hidden bg-white focus-within:ring-2 focus-within:ring-amber-400 transition-all shadow-xs">
            {/* Category Dropdown on Left */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-2.5 py-2.5 border-r border-gray-300 focus:outline-none cursor-pointer hidden md:block max-w-[130px] truncate"
            >
              <option value="all">All</option>
              <option value="pooja-samagri">Pooja Samagri</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home-kitchen">Home & Kitchen</option>
              <option value="beauty-health">Beauty & Health</option>
              <option value="sports-outdoors">Sports</option>
              <option value="books-stationery">Books</option>
              <option value="toys-games">Toys & Games</option>
              <option value="automotive">Automotive</option>
            </select>

            {/* Input */}
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsSuggestOpen(true);
              }}
              onFocus={() => setIsSuggestOpen(true)}
              placeholder="Search products, brands, deals & essentials..."
              className="w-full bg-white text-gray-900 py-2.5 px-3.5 text-sm focus:outline-none"
            />

            {/* Search Button */}
            <button
              type="submit"
              className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-950 p-2.5 px-5.5 transition-colors cursor-pointer shrink-0 flex items-center justify-center font-bold"
            >
              <Search size={20} strokeWidth={2.5} />
            </button>
          </form>

          {/* Autocomplete / Suggestions Dropdown */}
          {isSuggestOpen && (
            <div className="absolute top-full left-0 right-0 bg-white text-gray-800 shadow-2xl rounded-b-lg border border-gray-200 mt-1 z-50 overflow-hidden divide-y divide-gray-100">
              <div className="p-2 bg-gray-50 text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center justify-between">
                <span>Trending Searches</span>
                <span className="text-[10px] text-amber-600 font-bold">Fast Delivery</span>
              </div>
              {SEARCH_SUGGESTIONS.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectSuggestion(s)}
                  className="w-full text-left px-4 py-2.5 text-xs hover:bg-amber-50 hover:text-amber-800 flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Search size={14} className="text-gray-400" />
                    <span>{s}</span>
                  </span>
                  <span className="text-[10px] text-gray-400">in Myzon</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 4. Language Selector */}
        <div className="hidden xl:flex items-center gap-1 p-1.5 rounded-sm hover:ring-1 hover:ring-white transition-all cursor-pointer">
          <span className="text-sm">🇮🇳</span>
          <span className="text-xs font-bold">{language}</span>
          <ChevronDown size={12} className="text-gray-400" />
        </div>

        {/* 5. Account & Lists Dropdown (Iconic Amazon Feature) */}
        <div ref={accountRef} className="relative">
          <button
            onClick={() => setIsAccountOpen(!isAccountOpen)}
            onMouseEnter={() => setIsAccountOpen(true)}
            className="flex flex-col text-left p-1.5 rounded-sm hover:ring-1 hover:ring-white transition-all cursor-pointer"
          >
            <span className="text-[11px] text-gray-300 leading-none truncate max-w-[120px]">
              Hello, {user ? user.name.split(' ')[0] : 'Sign in'}
            </span>
            <span className="font-bold text-xs text-white flex items-center gap-0.5 leading-tight mt-0.5">
              Account & Lists
              <ChevronDown size={11} className="text-gray-400" />
            </span>
          </button>

          {/* Account Dropdown Menu */}
          {isAccountOpen && (
            <div 
              onMouseLeave={() => setIsAccountOpen(false)}
              className="absolute right-0 top-full mt-1 w-64 bg-white text-gray-800 rounded-lg shadow-2xl border border-gray-200 z-50 p-4 animate-fadeIn"
            >
              {!user ? (
                <div className="text-center pb-3 border-b border-gray-100">
                  <button
                    onClick={() => { setIsAccountOpen(false); openLoginModal(); }}
                    className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-950 font-bold py-2 rounded-md text-xs shadow-xs transition-colors cursor-pointer mb-2"
                  >
                    Sign In
                  </button>
                  <p className="text-[11px] text-gray-500">
                    New customer?{' '}
                    <span 
                    onClick={() => { setIsAccountOpen(false); openLoginModal(); }}
                    className="text-amber-600 font-semibold cursor-pointer hover:underline"
                  >
                    Start here.
                  </span>
                </p>
              </div>
            ) : (
              <div className="pb-3 border-b border-gray-100 mb-2">
                <p className="text-xs text-gray-500">Signed in as</p>
                <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                <p className="text-[11px] text-gray-400 truncate">{user.email || user.phone}</p>
              </div>
            )}

            <div className="space-y-1.5 pt-2 text-xs">
              <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Your Account</p>
              <Link to="/track-order" onClick={() => setIsAccountOpen(false)} className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 text-gray-700">
                <Package size={14} className="text-gray-500" />
                <span>Your Orders</span>
              </Link>
              <Link to="/wishlist" onClick={() => setIsAccountOpen(false)} className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 text-gray-700">
                <Heart size={14} className="text-gray-500" />
                <span>Your Wishlist ({wishlistItems.length})</span>
              </Link>
              <Link to="/deals" onClick={() => setIsAccountOpen(false)} className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 text-gray-700">
                <Sparkles size={14} className="text-amber-500" />
                <span>Myzon Prime & Rewards</span>
              </Link>
              {user && (
                <button
                  onClick={() => { logout(); setIsAccountOpen(false); }}
                  className="w-full text-left flex items-center gap-2 px-2 py-1.5 rounded hover:bg-red-50 text-red-600 font-semibold mt-2 pt-2 border-t border-gray-100 cursor-pointer"
                >
                  <LogOut size={14} />
                  <span>Sign Out</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 6. Returns & Orders */}
      <Link
        to="/track-order"
        className="hidden md:flex flex-col text-left p-1.5 rounded-sm hover:ring-1 hover:ring-white transition-all text-white shrink-0"
      >
        <span className="text-[11px] text-gray-300 leading-none">Returns</span>
        <span className="font-bold text-xs text-white leading-tight mt-0.5">& Orders</span>
      </Link>

      {/* 7. Wishlist Heart (Quick Access) */}
      <Link
        to="/wishlist"
        className="relative p-1.5 rounded-sm hover:ring-1 hover:ring-white transition-all flex items-center text-white shrink-0"
        title="Wishlist"
      >
        <Heart size={22} className="text-gray-200 hover:text-rose-400 transition-colors" />
        {wishlistItems.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 text-[10px] font-black h-4 w-4 rounded-full flex items-center justify-center shadow-xs">
            {wishlistItems.length}
          </span>
        )}
      </Link>

      {/* 8. Myzon Cart with Counter */}
      <Link
        to="/cart"
        className="flex items-center gap-1.5 p-1.5 rounded-sm hover:ring-1 hover:ring-white transition-all text-white shrink-0 group"
      >
        <div className="relative">
          <ShoppingCart size={26} className="text-white group-hover:text-amber-400 transition-colors" />
          <span className="absolute -top-1.5 right-1 bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 text-[11px] font-black h-4.5 min-w-[18px] px-1 rounded-full flex items-center justify-center shadow-xs">
            {totalCartCount}
          </span>
        </div>
        <span className="font-bold text-xs text-white hidden sm:block mt-2">
          Cart
        </span>
      </Link>

      </div>
    </div>
  );
};
