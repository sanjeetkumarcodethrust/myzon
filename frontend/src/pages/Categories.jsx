import React from 'react';
import { Laptop, Shirt, Home as HomeIcon, HeartPulse, Dumbbell, BookOpen, Puzzle, Car, ChevronRight, Flame, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const categoriesData = [
  { 
    name: 'Pooja Samagri',
    slug: 'pooja-samagri',
    icon: <Flame size={20} className="text-amber-400" />,
    image: 'https://images.unsplash.com/photo-1609743522653-52354461eb27?auto=format&fit=crop&q=80&w=400&h=300',
    subcategories: ['Agarbatti & Dhoop', 'Diya & Kapur', 'Brass Pooja Thali', 'Chandan & Roli'],
    itemCount: '5,000+ Items'
  },
  { 
    name: 'Electronics & Audio', 
    slug: 'electronics',
    icon: <Laptop size={20} className="text-amber-400" />,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400&h=300',
    subcategories: ['Lossless Audio', 'Smartwatches', 'Laptops', 'Cameras'],
    itemCount: '12,450+ Items'
  },
  { 
    name: 'Fashion & Footwear', 
    slug: 'fashion',
    icon: <Shirt size={20} className="text-amber-400" />,
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=400&h=300',
    subcategories: ['Streetwear Sneakers', 'Designer Apparel', 'Accessories', 'Watches'],
    itemCount: '45,200+ Items'
  },
  { 
    name: 'Home Sanctuary', 
    slug: 'home-kitchen',
    icon: <HomeIcon size={20} className="text-amber-400" />,
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&q=80&w=400&h=300',
    subcategories: ['Minimalist Decor', 'Kitchenware', 'Linen', 'Lighting'],
    itemCount: '8,900+ Items'
  },
  { 
    name: 'Wellness & Glow', 
    slug: 'beauty-health',
    icon: <HeartPulse size={20} className="text-amber-400" />,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=400&h=300',
    subcategories: ['Organic Care', 'Fragrances', 'Supplements', 'Grooming'],
    itemCount: '6,100+ Items'
  },
  { 
    name: 'Sports & Velocity', 
    slug: 'sports-outdoors',
    icon: <Dumbbell size={20} className="text-amber-400" />,
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=400&h=300',
    subcategories: ['Fitness Equipment', 'Outdoor Gear', 'Athletic Wear', 'Cycling'],
    itemCount: '3,800+ Items'
  },
  { 
    name: 'Books & Stationery', 
    slug: 'books-stationery',
    icon: <BookOpen size={20} className="text-amber-400" />,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400&h=300',
    subcategories: ['Fiction', 'Non-Fiction', 'Art Books', 'Writing Tools'],
    itemCount: '15,000+ Items'
  },
  { 
    name: 'Atelier Living', 
    slug: 'all',
    icon: <Sparkles size={20} className="text-amber-400" />,
    image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&q=80&w=400&h=300',
    subcategories: ['Curated Picks', 'Limited Drops', 'Vault Finds', 'Gift Sets'],
    itemCount: '4,200+ Items'
  }
];

export const Categories = () => {
  return (
    <div className="bg-[#0a0b0e] text-neutral-100 min-h-screen py-10 select-none">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
        
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">
            <Sparkles size={13} />
            <span>Studio Ateliers</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-3">
            Flagship Collections
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400">
            Curated collections spanning high-fidelity acoustics, sacred artisanal crafts, and modern luxury living.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoriesData.map((category, idx) => (
            <div key={idx} className="bg-[#121316] rounded-3xl overflow-hidden border border-neutral-800 shadow-xl hover:border-amber-500/40 hover:shadow-2xl hover:shadow-amber-500/5 transition-all duration-300 group flex flex-col justify-between">
              
              <div className="h-48 relative overflow-hidden bg-neutral-900">
                <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-[#121316]/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-neutral-900/80 border border-neutral-700/60 backdrop-blur-md rounded-xl">
                      {category.icon}
                    </div>
                    <h3 className="text-lg font-black tracking-tight">{category.name}</h3>
                  </div>
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block mb-3">
                    {category.itemCount}
                  </span>
                  <ul className="space-y-2 mb-6">
                    {category.subcategories.map((sub, i) => (
                      <li key={i}>
                        <Link to={`/shop?q=${encodeURIComponent(sub)}`} className="text-neutral-400 hover:text-amber-400 flex items-center gap-1.5 text-xs transition-colors">
                          <ChevronRight size={13} className="text-neutral-600" />
                          <span>{sub}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Link 
                  to={category.slug === 'all' ? '/shop' : `/shop?category=${category.slug}`}
                  className="block w-full text-center bg-neutral-900 text-neutral-200 hover:text-neutral-950 hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 font-bold py-2.5 rounded-xl border border-neutral-800 transition-all text-xs"
                >
                  Explore {category.name}
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
