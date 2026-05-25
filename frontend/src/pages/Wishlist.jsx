import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, Star } from 'lucide-react';
import { useWishlistStore, useCartStore } from '../store/useStore';

export const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-8">
      <h1 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-3">
        <Heart size={32} className="text-orange-500 fill-orange-500" />
        My Wishlist
      </h1>

      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {wishlistItems.map(product => (
            <div key={product.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow group relative flex flex-col">
              <div className="absolute top-3 right-3 z-10">
                <button 
                  onClick={() => removeFromWishlist(product.id)}
                  className="h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-sm text-red-500 hover:bg-red-50 transition-colors"
                  title="Remove from wishlist"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              
              {product.discount && (
                <div className="absolute top-3 left-3 bg-pink-100 text-pink-600 text-[10px] font-bold px-2 py-0.5 rounded z-10">
                  {product.discount}
                </div>
              )}
              
              <div className="h-48 flex items-center justify-center mb-4 overflow-hidden rounded-lg bg-gray-50 flex-shrink-0 cursor-pointer">
                <img src={product.image} alt={product.title} className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300" />
              </div>
              
              <div className="flex-1 flex flex-col">
                <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
                <h4 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2 cursor-pointer hover:text-orange-500 transition-colors">{product.title}</h4>
                
                <div className="flex items-center gap-1 mb-3 mt-auto">
                  <div className="flex text-orange-400 text-xs">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className={i < Math.floor(product.rating || 4) ? 'fill-current' : 'text-gray-300'} />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">({product.reviews || '0'})</span>
                </div>
                
                <div className="flex items-end justify-between mt-2">
                  <div className="flex flex-col">
                    <span className="text-lg font-black text-gray-900">₹{product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => addToCart(product)} 
                className="mt-4 w-full bg-gray-900 hover:bg-orange-500 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <ShoppingCart size={16} />
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-16 text-center">
          <div className="w-24 h-24 bg-red-50 text-red-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart size={40} className="fill-current" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">Save items you love and come back to them later. Browse our collection to find your new favorites.</p>
          <Link to="/" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors">
            Explore Products
          </Link>
        </div>
      )}
    </div>
  );
};
