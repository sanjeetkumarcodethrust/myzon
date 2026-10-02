import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Heart, ArrowLeft, CheckCircle } from 'lucide-react';
import { useCartStore, useWishlistStore } from '../store/useStore';
import productsData from '../data/products.json';
import { dealProducts } from './Deals';
import { newArrivals } from './NewArrivals';

const allProducts = [...productsData, ...dealProducts, ...newArrivals];

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = allProducts.find(p => p.id === parseInt(id));

  const { addToCart } = useCartStore();
  const { addToWishlist, wishlistItems } = useWishlistStore();

  if (!product) {
    return (
      <div className="max-w-[1600px] mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
        <button onClick={() => navigate('/')} className="text-orange-500 hover:underline">
          Return to Home
        </button>
      </div>
    );
  }

  const inWishlist = wishlistItems.some(i => i.id === product.id);

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-gray-600 hover:text-orange-500 mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Back</span>
      </button>

      <div className="flex flex-col md:flex-row gap-8 lg:gap-16 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
        {/* Product Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-50 rounded-xl p-8 relative">
          {product.discount && (
            <div className="absolute top-4 left-4 bg-pink-100 text-pink-600 text-xs font-bold px-3 py-1 rounded">
              {product.discount}
            </div>
          )}
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full max-w-[400px] object-contain mix-blend-multiply"
          />
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <div className="mb-2 text-sm font-bold text-orange-500 uppercase tracking-wide">
            {product.brand}
          </div>
          <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4 leading-tight">
            {product.title}
          </h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              <div className="flex text-orange-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className={i < Math.floor(product.rating || 0) ? 'fill-current' : 'text-gray-300'} />
                ))}
              </div>
              <span className="text-gray-600 font-medium ml-2">{product.rating}</span>
            </div>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600">{product.reviews} reviews</span>
          </div>

          <div className="flex items-end gap-4 mb-8">
            <span className="text-4xl font-black text-gray-900">₹{product.price?.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-xl text-gray-400 line-through mb-1">
                ₹{product.originalPrice?.toLocaleString()}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            <button 
              onClick={() => addToCart(product)}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm shadow-orange-200"
            >
              <ShoppingCart size={22} />
              Add to Cart
            </button>
            <button 
              onClick={() => addToWishlist(product)}
              className={`p-4 rounded-xl border-2 flex items-center justify-center transition-colors ${
                inWishlist 
                  ? 'border-red-100 bg-red-50 text-red-500' 
                  : 'border-gray-200 hover:border-gray-300 text-gray-500'
              }`}
            >
              <Heart size={26} className={inWishlist ? 'fill-current' : ''} />
            </button>
          </div>

          {/* Extra Info */}
          <div className="space-y-4 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-3 text-gray-600">
              <CheckCircle size={20} className="text-green-500" />
              <span>In stock and ready to ship</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <CheckCircle size={20} className="text-green-500" />
              <span>Free delivery on orders over ₹499</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <CheckCircle size={20} className="text-green-500" />
              <span>7 days replacement policy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
