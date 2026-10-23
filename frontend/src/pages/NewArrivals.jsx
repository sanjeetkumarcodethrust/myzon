import React from 'react';
import { Sparkles, ShoppingBag, Star, Clock, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/useStore';

export const newArrivals = [
  {
    id: 90101, brand: 'Samsung', title: 'Galaxy S23 Ultra 5G (Phantom Titanium)',
    price: 23999, originalPrice: 25999, label: 'NEW DROP', rating: 4.6, reviews: '120',
    date: 'Added 2 days ago',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=400&h=400'
  },
  {
    id: 90102, brand: 'Nike', title: 'Air Force 1 \'07 Pro-Tech Luxe',
    price: 13995, originalPrice: 13995, label: 'JUST DROPPED', rating: 5.0, reviews: '12',
    date: 'Added 5 hours ago',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400&h=400'
  },
  {
    id: 90103, brand: 'Canon', title: 'EOS 200D II DSLR Creator Edition',
    price: 36990, originalPrice: 49990, label: 'NEW ARRIVAL', rating: 4.9, reviews: '45',
    date: 'Added 1 week ago',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400&h=400'
  },
  {
    id: 90104, brand: 'DJI', title: 'Mini 4 Pro Cinematic Aerial Drone',
    price: 84990, originalPrice: 89990, label: 'FLAGSHIP', rating: 4.8, reviews: '89',
    date: 'Added 3 days ago',
    image: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&q=80&w=400&h=400'
  }
];

export const NewArrivals = () => {
  const { addToCart } = useCartStore();

  return (
    <div className="bg-[#0a0b0e] text-neutral-100 min-h-screen py-10 select-none">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#171821] via-[#121318] to-[#0a0b0d] border border-amber-500/30 rounded-3xl p-8 sm:p-12 md:p-16 text-white mb-12 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold mb-4 bg-neutral-900 px-3.5 py-1.5 rounded-full border border-amber-500/30 shadow-sm">
              <Sparkles size={14} className="text-amber-400" />
              <span>FRESH FROM THE ATELIER • SEASON '26</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-4">
              New Season Drops
            </h1>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Experience the latest innovations in audio acoustics, high-performance footwear, and creator imaging gear.
            </p>
          </div>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles size={13} />
              <span>Fresh Arrivals</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Recently Added to Studio
            </h2>
          </div>
          <Link to="/shop" className="text-xs font-bold text-neutral-400 hover:text-amber-400 transition-colors inline-flex items-center gap-1">
            <span>Explore All</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Drops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map(product => (
            <div key={product.id} className="bg-[#121316] border border-neutral-800/80 rounded-3xl p-5 shadow-lg hover:shadow-2xl hover:border-amber-500/40 transition-all duration-300 group relative flex flex-col h-full">
              
              <div className="absolute top-4 left-4 bg-neutral-900 text-amber-400 border border-amber-500/30 text-[10px] font-black px-2.5 py-0.5 rounded-full z-10 uppercase tracking-widest shadow-xs">
                {product.label}
              </div>
              
              <Link to={`/product/${product.id}`} className="block h-52 flex items-center justify-center mb-4 overflow-hidden rounded-2xl bg-neutral-900/60 p-4 relative">
                <img src={product.image} alt={product.title} className="max-h-full object-contain group-hover:scale-108 transition-transform duration-500 drop-shadow-md" />
              </Link>
              
              <div className="flex justify-between items-start mb-1">
                <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">{product.brand}</div>
                <div className="flex items-center gap-0.5 text-amber-400 text-xs font-bold">
                  <Star size={11} className="fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                </div>
              </div>
              
              <Link to={`/product/${product.id}`}>
                <h4 className="font-bold text-neutral-200 text-sm mb-3 line-clamp-2 min-h-[40px] group-hover:text-amber-300 transition-colors leading-snug">
                  {product.title}
                </h4>
              </Link>
              
              <div className="mt-auto">
                <div className="text-[10px] text-neutral-500 mb-3 flex items-center gap-1">
                  <Clock size={11} className="text-amber-400" /> {product.date}
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-neutral-800">
                  <div>
                    <div className="text-xl font-black text-amber-400">₹{product.price.toLocaleString()}</div>
                    {product.originalPrice > product.price && (
                      <div className="text-xs text-neutral-500 line-through">₹{product.originalPrice.toLocaleString()}</div>
                    )}
                  </div>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-950 p-3 rounded-xl transition-all shadow-md cursor-pointer font-bold active:scale-95"
                    title="Add to Bag"
                    aria-label="Add to Bag"
                  >
                    <ShoppingBag size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
