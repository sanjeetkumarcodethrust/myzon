import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Zap } from 'lucide-react';
import { useCartStore, useWishlistStore } from '../store/useStore';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCartStore();
  const { addToWishlist, wishlistItems } = useWishlistStore();

  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  // Compute discount if not provided
  let discountText = product.discount;
  if (!discountText && product.originalPrice && product.originalPrice > product.price) {
    const pct = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    discountText = `${pct}% off`;
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 hover:border-gray-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group relative overflow-hidden p-3.5">
      {/* Top Tag & Wishlist Button */}
      <div className="flex items-center justify-between z-10 mb-2">
        {discountText ? (
          <span className="bg-[#cc0c39] text-white text-[10px] font-extrabold px-2 py-0.5 rounded tracking-wide uppercase">
            {discountText}
          </span>
        ) : (
          <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded">
            Top Rated
          </span>
        )}

        <button
          onClick={(e) => {
            e.preventDefault();
            addToWishlist(product);
          }}
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
            isWishlisted 
              ? 'bg-rose-50 text-rose-500 shadow-xs' 
              : 'text-gray-400 hover:text-rose-500 hover:bg-gray-50'
          }`}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={16} className={isWishlisted ? 'fill-current text-rose-500' : ''} />
        </button>
      </div>

      {/* Product Image */}
      <Link 
        to={`/product/${product.id}`}
        className="h-44 w-full flex items-center justify-center p-2 rounded-lg bg-gray-50/50 mb-3 overflow-hidden group-hover:bg-amber-50/20 transition-colors"
      >
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-108 transition-transform duration-300"
        />
      </Link>

      {/* Brand & Assured Tag */}
      <div className="flex items-center justify-between gap-1 mb-1">
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider truncate">
          {product.brand}
        </span>
        {/* Flipkart Assured / Prime style badge */}
        <span className="inline-flex items-center gap-0.5 text-[9px] font-black text-[#2874f0] bg-blue-50 px-1.5 py-0.2 rounded border border-blue-100">
          ✦ Assured
        </span>
      </div>

      {/* Product Title */}
      <Link to={`/product/${product.id}`} className="mb-2">
        <h4 className="text-xs font-semibold text-gray-800 line-clamp-2 hover:text-[#2874f0] transition-colors leading-snug h-8">
          {product.title}
        </h4>
      </Link>

      {/* Rating badge (Flipkart-style green pill rating) */}
      <div className="flex items-center gap-1.5 mb-2.5">
        <span className="inline-flex items-center gap-0.5 bg-[#388e3c] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
          {product.rating || '4.2'} <Star size={10} className="fill-current" />
        </span>
        <span className="text-[11px] text-gray-400">
          ({product.reviews || '450'})
        </span>
      </div>

      {/* Price Section (Rupee styling) */}
      <div className="mt-auto pt-2 border-t border-gray-50">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-base font-black text-gray-900">
            ₹{product.price?.toLocaleString()}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-[11px] text-gray-400 line-through">
              ₹{product.originalPrice?.toLocaleString()}
            </span>
          )}
        </div>

        {/* Free Delivery Tag */}
        <p className="text-[10px] text-gray-600 mb-3 flex items-center gap-1">
          <span className="text-[#388e3c] font-bold">FREE Delivery</span> Tomorrow
        </p>

        {/* Add to Cart button */}
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-bold py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-98 cursor-pointer"
        >
          <ShoppingCart size={14} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};
