import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Flame, Smartphone, Shirt, Laptop, Home as HomeIcon, 
  Tv, Sparkles, Dumbbell, Gem, ArrowRight
} from 'lucide-react';

const CATEGORIES = [
  {
    name: 'Sacred Vedic',
    subtitle: 'Brass & Ghee',
    slug: 'pooja-samagri',
    icon: <Flame size={20} className="text-amber-400" />,
    badge: 'Artisanal'
  },
  {
    name: 'Acoustics & Audio',
    subtitle: 'Lossless Sound',
    slug: 'electronics',
    icon: <Laptop size={20} className="text-amber-400" />,
    badge: 'Flagship'
  },
  {
    name: 'Smart Tech',
    subtitle: 'Next-Gen Wear',
    slug: 'electronics',
    icon: <Smartphone size={20} className="text-amber-400" />
  },
  {
    name: 'Streetwear',
    subtitle: 'Apparel & Shoes',
    slug: 'fashion',
    icon: <Shirt size={20} className="text-amber-400" />,
    badge: 'Trending'
  },
  {
    name: 'Home Sanctuary',
    subtitle: 'Decor & Living',
    slug: 'home-kitchen',
    icon: <HomeIcon size={20} className="text-amber-400" />
  },
  {
    name: 'Wellness & Glow',
    subtitle: 'Organic Care',
    slug: 'beauty-health',
    icon: <Sparkles size={20} className="text-amber-400" />
  },
  {
    name: 'Sport & Velocity',
    subtitle: 'Gear & Fitness',
    slug: 'sports-outdoors',
    icon: <Dumbbell size={20} className="text-amber-400" />
  },
  {
    name: 'Curated Ateliers',
    subtitle: 'Verified Brands',
    slug: 'all',
    icon: <Gem size={20} className="text-amber-400" />
  }
];

export const FlipkartCategoryStrip = () => {
  return (
    <div className="py-6 mb-4 select-none">
      <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar pb-2">
        {CATEGORIES.map((cat, idx) => (
          <Link
            key={idx}
            to={cat.slug === 'all' ? '/brands' : `/shop?category=${cat.slug}`}
            className="group flex items-center gap-3 bg-[#121316] hover:bg-neutral-900 border border-neutral-800/80 hover:border-amber-500/40 p-3 px-4 rounded-2xl transition-all duration-300 min-w-max shadow-sm hover:shadow-lg hover:shadow-amber-500/5 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-neutral-900 group-hover:bg-amber-400/10 border border-neutral-800 group-hover:border-amber-500/30 flex items-center justify-center transition-colors shrink-0">
              {cat.icon}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                  {cat.name}
                </span>
                {cat.badge && (
                  <span className="text-[9px] font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.2 rounded-full border border-amber-500/20">
                    {cat.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-neutral-400 block mt-0.5">
                {cat.subtitle}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
