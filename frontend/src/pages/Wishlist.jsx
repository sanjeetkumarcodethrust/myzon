import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, Star, Sparkles, ArrowRight } from 'lucide-react';
import { useWishlistStore, useCartStore } from '../store/useStore';

export const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();

  return (
    <div className="bg-[#0a0b0e] text-neutral-100 min-h-screen py-10 select-none">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
        
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-2xl bg-amber-400/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Heart size={20} className="fill-amber-400" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Client Wishlist
            </h1>
            <p className="text-xs text-neutral-400">
              {wishlistItems.length} reserved drops saved for future acquisition
            </p>
          </div>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {wishlistItems.map(product => (
              <div key={product.id} className="bg-[#121316] border border-neutral-800/80 rounded-3xl p-4 shadow-lg hover:shadow-2xl hover:border-amber-500/40 transition-all duration-300 group relative flex flex-col">
                <div className="absolute top-3 right-3 z-10">
                  <button 
                    onClick={() => removeFromWishlist(product.id)}
                    className="h-8 w-8 bg-neutral-900 border border-neutral-800 rounded-full flex items-center justify-center text-neutral-500 hover:text-rose-400 transition-colors cursor-pointer"
                    title="Remove from wishlist"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                
                {product.discount && (
                  <div className="absolute top-3 left-3 bg-neutral-900 text-amber-400 border border-amber-500/30 text-[10px] font-black px-2.5 py-0.5 rounded-full z-10 uppercase tracking-widest">
                    {product.discount}
                  </div>
                )}
                
                <Link to={`/product/${product.id}`} className="block h-44 flex items-center justify-center mb-3 overflow-hidden rounded-2xl bg-neutral-900/60 p-3 flex-shrink-0 cursor-pointer">
                  <img src={product.image} alt={product.title} className="max-h-full object-contain group-hover:scale-108 transition-transform duration-500 drop-shadow-md" />
                </Link>
                
                <div className="flex-1 flex flex-col">
                  <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mb-1">{product.brand}</div>
                  <Link to={`/product/${product.id}`}>
                    <h4 className="font-bold text-neutral-200 text-xs sm:text-sm mb-2 line-clamp-2 cursor-pointer group-hover:text-amber-300 transition-colors leading-snug">{product.title}</h4>
                  </Link>
                  
                  <div className="flex items-center gap-1 mb-3 mt-auto">
                    <Star size={11} className="fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-amber-400">{product.rating || '4.8'}</span>
                    <span className="text-[11px] text-neutral-500">({product.reviews || '450'})</span>
                  </div>
                  
                  <div className="flex items-end justify-between mt-1">
                    <div className="flex flex-col">
                      <span className="text-base sm:text-lg font-black text-amber-400">₹{product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-neutral-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => addToCart(product)} 
                  className="mt-4 w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-950 font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all text-xs active:scale-98 cursor-pointer shadow-xs"
                >
                  <ShoppingBag size={14} />
                  <span>Move to Bag</span>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#121316] rounded-3xl border border-neutral-800 p-16 text-center max-w-xl mx-auto shadow-2xl">
            <div className="w-20 h-20 bg-neutral-900 border border-neutral-800 text-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
              <Heart size={36} />
            </div>
            <h2 className="text-2xl font-black text-white mb-2">Your Wishlist is Empty</h2>
            <p className="text-xs text-neutral-400 mb-8 max-w-md mx-auto leading-relaxed">
              Explore catalog drops and save your favored acoustics, designer sneakers, and sacred living artifacts.
            </p>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-950 font-bold py-3.5 px-8 rounded-2xl transition-all shadow-md text-xs cursor-pointer"
            >
              <span>Explore Catalog Drops</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};
