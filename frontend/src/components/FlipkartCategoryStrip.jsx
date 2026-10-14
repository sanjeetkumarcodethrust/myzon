import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Flame, Smartphone, Shirt, Laptop, Home as HomeIcon, 
  Tv, Sparkles, Dumbbell, Car, Zap, Tag
} from 'lucide-react';

const CATEGORIES = [
  {
    name: 'Pooja Samagri',
    slug: 'pooja-samagri',
    image: 'https://images.unsplash.com/photo-1609743522653-52354461eb27?auto=format&fit=crop&q=80&w=150',
    icon: <Flame size={20} className="text-orange-500" />,
    badge: 'Festive'
  },
  {
    name: 'Mobiles',
    slug: 'electronics',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02560?auto=format&fit=crop&q=80&w=150',
    icon: <Smartphone size={20} className="text-blue-500" />,
    badge: 'Min 40% Off'
  },
  {
    name: 'Fashion',
    slug: 'fashion',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80&w=150',
    icon: <Shirt size={20} className="text-pink-500" />,
    badge: 'Trending'
  },
  {
    name: 'Electronics',
    slug: 'electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=150',
    icon: <Laptop size={20} className="text-indigo-500" />,
    badge: 'Best Deals'
  },
  {
    name: 'Home & Kitchen',
    slug: 'home-kitchen',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=150',
    icon: <HomeIcon size={20} className="text-emerald-500" />,
  },
  {
    name: 'Appliances',
    slug: 'home-kitchen',
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=150',
    icon: <Tv size={20} className="text-cyan-500" />,
  },
  {
    name: 'Beauty & Health',
    slug: 'beauty-health',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=150',
    icon: <Sparkles size={20} className="text-purple-500" />,
  },
  {
    name: 'Sports & Fitness',
    slug: 'sports-outdoors',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=150',
    icon: <Dumbbell size={20} className="text-rose-500" />,
  },
  {
    name: 'Automotive',
    slug: 'automotive',
    image: 'https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&q=80&w=150',
    icon: <Car size={20} className="text-slate-600" />,
  },
  {
    name: 'Top Deals',
    slug: 'all',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=150',
    icon: <Zap size={20} className="text-amber-500" />,
    badge: 'Hot'
  },
];

export const FlipkartCategoryStrip = () => {
  return (
    <div className="bg-white border-b border-gray-200/80 shadow-xs mb-4">
      <div className="max-w-[1600px] mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-3 overflow-x-auto hide-scrollbar">
          {CATEGORIES.map((cat, idx) => (
            <Link
              key={idx}
              to={cat.slug === 'all' ? '/deals' : `/shop?category=${cat.slug}`}
              className="flex flex-col items-center gap-1.5 min-w-[76px] sm:min-w-[92px] group text-center cursor-pointer p-1"
            >
              <div className="relative w-15 h-15 sm:w-16 sm:h-16 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center p-1 group-hover:scale-108 group-hover:border-amber-400 group-hover:shadow-md transition-all duration-200 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-full"
                />
                {cat.badge && (
                  <span className="absolute -top-0.5 right-0 bg-[#121316] text-amber-400 border border-amber-500/30 text-[8px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-tighter shadow-xs">
                    {cat.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-gray-700 group-hover:text-amber-600 transition-colors line-clamp-1">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
