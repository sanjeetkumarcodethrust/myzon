import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Zap, Sparkles, Flame, Shield, Gift } from 'lucide-react';
import { useUIStore } from '../store/useStore';

export const Navigation = () => {
  const { openDrawer } = useUIStore();

  const navItems = [
    { name: "⚡ Today's Deals", path: '/deals', highlight: true },
    { name: '🪔 Pooja Samagri', path: '/shop?category=pooja-samagri', festive: true },
    { name: '📱 Mobiles', path: '/shop?category=electronics' },
    { name: '💻 Electronics', path: '/shop?category=electronics' },
    { name: '👗 Fashion', path: '/shop?category=fashion' },
    { name: '🏠 Home & Kitchen', path: '/shop?category=home-kitchen' },
    { name: '⭐ Best Sellers', path: '/shop?sort=Avg.+Customer+Review' },
    { name: 'New Arrivals', path: '/new-arrivals' },
    { name: 'Customer Service', path: '/track-order' },
    { name: 'Myzon Pay', path: '/cart' },
  ];

  return (
    <div className="bg-[#18191f] text-white text-xs border-b border-neutral-800 overflow-x-auto hide-scrollbar">
      <div className="max-w-[1600px] mx-auto px-4 flex items-center justify-between min-w-max gap-4">
        
        {/* Left Side Links */}
        <div className="flex items-center gap-1 py-1.5">
          {/* All Hamburger Button */}
          <button
            onClick={openDrawer}
            className="flex items-center gap-1.5 py-1 px-2.5 rounded-sm font-bold hover:ring-1 hover:ring-white transition-all text-white cursor-pointer mr-1"
          >
            <Menu size={16} />
            <span>All</span>
          </button>

          {/* Nav Links */}
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`py-1 px-2.5 rounded-sm transition-all hover:ring-1 hover:ring-white whitespace-nowrap font-medium ${
                item.festive
                  ? 'text-amber-300 font-bold bg-amber-500/10 border border-amber-500/20'
                  : item.highlight
                  ? 'text-amber-400 font-bold'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right Side: Prime / Plus Banner */}
        <Link
          to="/deals"
          className="hidden xl:flex items-center gap-2 py-1 px-3 text-amber-400 hover:text-amber-300 font-bold transition-colors shrink-0"
        >
          <Sparkles size={14} className="text-amber-400" />
          <span>Join Myzon Prime | Free Delivery & Watch</span>
        </Link>

      </div>
    </div>
  );
};
