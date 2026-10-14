import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, Heart, ArrowUpRight } from 'lucide-react';
import { useCartStore, useWishlistStore } from '../store/useStore';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCartStore();
  const { addToWishlist, wishlistItems } = useWishlistStore();

  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  // Compute discount if not provided
  let discountText = product.discount;
  if (!discountText && product.originalPrice && product.originalPrice > product.price) {
    const pct = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    discountText = `${pct}% OFF`;
  }

  return (
    <div className="bg-[#121316] rounded-2xl border border-neutral-800/80 hover:border-amber-500/40 shadow-lg hover:shadow-2xl hover:shadow-amber-500/5 transition-all duration-300 flex flex-col group relative overflow-hidden p-3.5 sm:p-4 select-none">
      
      {/* Top Floating Badge & Wishlist Heart */}
      <div className="flex items-center justify-between z-10 mb-2.5">
        {discountText ? (
          <span className="bg-neutral-900 text-amber-400 border border-amber-500/30 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
            {discountText}
          </span>
        ) : (
          <span className="bg-neutral-900 text-neutral-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-neutral-800 uppercase tracking-wider">
            Curated
          </span>
        )}

        <button
          onClick={(e) => {
            e.preventDefault();
            addToWishlist(product);
          }}
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer ${
            isWishlisted 
              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' 
              : 'text-neutral-500 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800'
          }`}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-label="Wishlist toggle"
        >
          <Heart size={14} className={isWishlisted ? 'fill-current text-rose-500' : ''} />
        </button>
      </div>

      {/* Product Image Stage */}
      <Link 
        to={`/product/${product.id}`}
        className="h-44 sm:h-48 w-full flex items-center justify-center p-3 rounded-xl bg-neutral-900/60 mb-3 overflow-hidden group-hover:bg-neutral-900 transition-colors relative"
      >
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="max-h-full max-w-full object-contain group-hover:scale-108 transition-transform duration-500 drop-shadow-md"
        />
      </Link>

      {/* Brand & Category */}
      <div className="flex items-center justify-between gap-1 mb-1">
        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest truncate">
          {product.brand}
        </span>
        <span className="text-[10px] font-bold text-amber-400 flex items-center gap-0.5">
          <Star size={10} className="fill-amber-400 text-amber-400" />
          {product.rating || '4.8'}
        </span>
      </div>

      {/* Product Title */}
      <Link to={`/product/${product.id}`} className="mb-2">
        <h4 className="text-xs sm:text-sm font-semibold text-neutral-200 line-clamp-2 group-hover:text-amber-300 transition-colors leading-snug h-9">
          {product.title}
        </h4>
      </Link>

      {/* Price Section & Action Button */}
      <div className="mt-auto pt-3 border-t border-neutral-800/80">
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-base sm:text-lg font-black text-amber-400">
            ₹{product.price?.toLocaleString()}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs text-neutral-500 line-through">
              ₹{product.originalPrice?.toLocaleString()}
            </span>
          )}
        </div>

        {/* Add to Bag Button */}
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-950 font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-98 cursor-pointer"
        >
          <ShoppingBag size={14} />
          <span>Add to Bag</span>
        </button>
      </div>

    </div>
  );
};
