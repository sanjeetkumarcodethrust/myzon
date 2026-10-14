import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Flame, Headphones, Watch, Shirt, Home as HomeIcon, Zap, Gem, Compass } from 'lucide-react';

export const Navigation = () => {
  const location = useLocation();

  const curatedRails = [
    { name: 'The Vault', path: '/deals', icon: <Zap size={13} className="text-amber-400 fill-amber-400" />, highlight: true },
    { name: 'High-Fidelity Audio', path: '/shop?category=electronics', icon: <Headphones size={13} /> },
    { name: 'Smart Wearables', path: '/shop?category=electronics', icon: <Watch size={13} /> },
    { name: 'Sacred Vedic Crafts', path: '/shop?category=pooja-samagri', icon: <Flame size={13} className="text-amber-400" />, festive: true },
    { name: 'Modern Apparel', path: '/shop?category=fashion', icon: <Shirt size={13} /> },
    { name: 'Home Sanctuary', path: '/shop?category=home-kitchen', icon: <HomeIcon size={13} /> },
    { name: 'New Drops', path: '/new-arrivals', icon: <Sparkles size={13} /> },
    { name: 'Curated Ateliers', path: '/brands', icon: <Gem size={13} /> },
    { name: 'Under ₹999', path: '/shop?maxPrice=999', icon: <Flame size={13} /> },
  ];

  return (
    <div className="bg-[#0b0c0f] border-b border-neutral-800/60 select-none overflow-x-auto hide-scrollbar py-2.5">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 flex items-center justify-between min-w-max gap-3">
        <div className="flex items-center gap-2">
          {curatedRails.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  item.highlight
                    ? 'bg-amber-400/10 text-amber-400 border border-amber-500/30 hover:bg-amber-400/20 shadow-xs shadow-amber-500/5 font-semibold'
                    : item.festive
                    ? 'bg-neutral-900 text-amber-300 border border-amber-500/20 hover:border-amber-500/40'
                    : isActive
                    ? 'bg-neutral-800 text-white border border-neutral-700'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900 border border-transparent'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        <Link
          to="/shop"
          className="hidden md:flex items-center gap-1.5 text-xs text-neutral-400 hover:text-amber-400 transition-colors font-medium pl-3 border-l border-neutral-800"
        >
          <Compass size={13} />
          <span>Explore All (200+)</span>
        </Link>
      </div>
    </div>
  );
};
