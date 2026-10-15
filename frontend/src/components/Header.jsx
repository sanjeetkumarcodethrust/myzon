import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, ShoppingBag, Search, MapPin, ChevronDown, User, Sparkles, 
  Menu, X, ArrowUpRight, LogOut, Package, ShieldCheck
} from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useCartStore, useWishlistStore, useAuthStore, useUIStore } from '../store/useStore';

const SEARCH_SUGGESTIONS = [
  'Pooja Hawan Samagri Kit',
  'boAt Rockerz Bluetooth Headphones',
  'Noise Smartwatch Pulse 3',
  'Nike Air Max Running Shoes',
  'Luxury Cotton Bath Towels',
  'Organic Mint Toothpaste',
  'Canon DSLR Camera',
  'Apple AirPods Pro',
  'Minimalist Living Essentials',
];

export const Header = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [isSuggestOpen, setIsSuggestOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const suggestRef = useRef(null);
  const accountRef = useRef(null);

  const navigate = useNavigate();
  const { cartItems } = useCartStore();
  const { wishlistItems } = useWishlistStore();
  const { user, logout } = useAuthStore();
  const { location, openPincodeModal, openLoginModal, openDrawer } = useUIStore();

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
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
    if (query.trim()) {
      navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/shop');
    }
  };

  const handleSelectSuggestion = (s) => {
    setQuery(s);
    setIsSuggestOpen(false);
    navigate(`/shop?q=${encodeURIComponent(s)}`);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + (item.qty || 1), 0);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#0d0e12]/90 border-b border-neutral-800/80 transition-all select-none">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 h-18 flex items-center justify-between gap-4">
        
        {/* Left: Mobile Menu Trigger + Brand Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={openDrawer}
            className="lg:hidden text-neutral-300 hover:text-white p-2 rounded-xl hover:bg-neutral-800/50 transition-colors cursor-pointer"
            aria-label="Open Navigation Menu"
          >
            <Menu size={22} />
          </button>

          <Link to="/" className="flex items-center gap-2 group py-1">
            <div className="flex items-center tracking-tight">
              <span className="text-2xl lg:text-3xl font-black text-white tracking-tighter">
                MYZON
              </span>
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 ml-1 shadow-sm shadow-amber-400/50" />
            </div>
            <span className="hidden sm:inline-flex text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 group-hover:border-amber-500/40 group-hover:text-amber-400 transition-colors">
              Studio
            </span>
          </Link>
        </div>

        {/* Center: Desktop Curated Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 bg-neutral-900/60 p-1.5 rounded-full border border-neutral-800/60 text-xs font-semibold">
          <Link
            to="/"
            className="px-4 py-1.5 rounded-full text-neutral-300 hover:text-white hover:bg-neutral-800/60 transition-all"
          >
            Discover
          </Link>
          <Link
            to="/new-arrivals"
            className="px-4 py-1.5 rounded-full text-neutral-300 hover:text-white hover:bg-neutral-800/60 transition-all"
          >
            New Drops
          </Link>
          <Link
            to="/deals"
            className="px-4 py-1.5 rounded-full text-amber-400 font-bold hover:bg-amber-400/10 transition-all flex items-center gap-1.5"
          >
            <Sparkles size={13} className="text-amber-400" />
            The Vault
          </Link>
          <Link
            to="/categories"
            className="px-4 py-1.5 rounded-full text-neutral-300 hover:text-white hover:bg-neutral-800/60 transition-all"
          >
            Collections
          </Link>
          <Link
            to="/brands"
            className="px-4 py-1.5 rounded-full text-neutral-300 hover:text-white hover:bg-neutral-800/60 transition-all"
          >
            Ateliers
          </Link>
        </nav>

        {/* Right: Modern Search Bar + Location + Icons */}
        <div className="flex items-center gap-3">
          
          {/* Modern Search Input */}
          <div ref={suggestRef} className="relative hidden md:block w-64 lg:w-80">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIsSuggestOpen(true);
                }}
                onFocus={() => setIsSuggestOpen(true)}
                placeholder="Search catalog, audio, tech..."
                className="w-full bg-neutral-900/80 hover:bg-neutral-900 text-neutral-100 placeholder-neutral-500 py-2 pl-9 pr-12 rounded-full text-xs border border-neutral-800 focus:border-amber-500/70 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
              />
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
              <button 
                type="submit" 
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-amber-400 text-neutral-950 p-1 rounded-full hover:bg-amber-300 transition-colors cursor-pointer"
              >
                <ArrowUpRight size={13} strokeWidth={2.5} />
              </button>
            </form>

            {/* Suggestions Modal */}
            {isSuggestOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#121316] text-neutral-200 shadow-2xl rounded-2xl border border-neutral-800 z-50 overflow-hidden divide-y divide-neutral-800/60 animate-in fade-in slide-in-from-top-2">
                <div className="px-4 py-2 bg-neutral-900/80 text-[10px] font-bold text-neutral-400 uppercase tracking-widest flex items-center justify-between">
                  <span>Trending Searches</span>
                  <span className="text-amber-400 text-[10px]">Instant Dispatch</span>
                </div>
                <div className="p-1">
                  {SEARCH_SUGGESTIONS.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectSuggestion(s)}
                      className="w-full text-left px-3.5 py-2 text-xs text-neutral-300 hover:text-amber-300 hover:bg-neutral-800/50 rounded-lg flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2.5">
                        <Search size={13} className="text-neutral-500" />
                        <span>{s}</span>
                      </span>
                      <ArrowUpRight size={12} className="text-neutral-500" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Location Badge */}
          <button
            onClick={openPincodeModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900/60 border border-neutral-800/80 text-xs text-neutral-300 hover:border-amber-500/40 hover:text-white transition-all cursor-pointer"
            title="Update Delivery Location"
          >
            <MapPin size={13} className="text-amber-400 shrink-0" />
            <span className="truncate max-w-[120px] text-[11px] font-medium">
              {location.city ? `${location.city}${location.pincode ? ` (${location.pincode})` : ''}` : 'Select Location'}
            </span>
          </button>

          {/* Wishlist Link */}
          <Link
            to="/wishlist"
            className="relative p-2 rounded-full text-neutral-300 hover:text-white hover:bg-neutral-800/60 transition-colors"
            title="Wishlist"
          >
            <Heart size={19} />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 font-black text-[9px] rounded-full flex items-center justify-center shadow-xs">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          {/* Cart / Bag Button */}
          <Link
            to="/cart"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-950 font-bold text-xs transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <ShoppingBag size={15} strokeWidth={2.2} />
            <span className="hidden sm:inline">Bag</span>
            <span className="bg-neutral-950 text-amber-400 px-1.5 py-0.2 rounded-full text-[10px] font-black">
              {totalCartCount}
            </span>
          </Link>

          {/* User Account Popover */}
          <div ref={accountRef} className="relative">
            <button
              onClick={() => setIsAccountOpen(!isAccountOpen)}
              className="p-1.5 rounded-full text-neutral-300 hover:text-white hover:bg-neutral-800/60 transition-colors cursor-pointer border border-neutral-800"
              title="Account"
            >
              <User size={18} />
            </button>

            {isAccountOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-[#121316] text-neutral-200 rounded-2xl shadow-2xl border border-neutral-800 z-50 p-4 animate-in fade-in">
                {user ? (
                  <div>
                    <div className="pb-3 border-b border-neutral-800 mb-3">
                      <p className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">VIP Member</p>
                      <p className="text-sm font-bold text-white truncate">{user.name}</p>
                      <p className="text-xs text-neutral-400 truncate">{user.email}</p>
                    </div>
                    <div className="space-y-1 text-xs">
                      <Link
                        to="/track-order"
                        onClick={() => setIsAccountOpen(false)}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800/50 transition-colors"
                      >
                        <Package size={14} className="text-amber-400" /> My Orders & Shipments
                      </Link>
                      <Link
                        to="/wishlist"
                        onClick={() => setIsAccountOpen(false)}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800/50 transition-colors"
                      >
                        <Heart size={14} className="text-amber-400" /> Saved Wishlist
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsAccountOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer text-left"
                      >
                        <LogOut size={14} /> Sign Out
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-center pb-3 border-b border-neutral-800 mb-3">
                      <p className="text-xs text-neutral-400 mb-2">Sign in to access VIP Drops & The Vault</p>
                      <button
                        onClick={() => {
                          setIsAccountOpen(false);
                          openLoginModal();
                        }}
                        className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-950 font-bold py-2 rounded-xl text-xs shadow-xs transition-all cursor-pointer"
                      >
                        Sign In / Register
                      </button>
                    </div>
                    <div className="space-y-1 text-xs text-neutral-400">
                      <Link
                        to="/track-order"
                        onClick={() => setIsAccountOpen(false)}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:text-white hover:bg-neutral-800/50 transition-colors"
                      >
                        <Package size={14} /> Track Existing Order
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
