import React, { useState } from 'react';
import { Star, ShoppingCart, Filter, ChevronDown, Heart } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useCartStore, useWishlistStore } from '../store/useStore';

import productsData from '../data/products.json';
const products = productsData;

const priceRanges = [
  { label: 'Under ₹1,000',       min: 0,     max: 999 },
  { label: '₹1,000 - ₹5,000',   min: 1000,  max: 5000 },
  { label: '₹5,000 - ₹20,000',  min: 5000,  max: 20000 },
  { label: 'Over ₹20,000',       min: 20001, max: Infinity },
];

export const Shop = () => {
  const [selectedPrice, setSelectedPrice] = useState(null);
  const { addToCart, cartItems } = useCartStore();
  const { addToWishlist, wishlistItems } = useWishlistStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || '';

  const productsMatchingQuery = products.filter(product => {
    if (!query) return true;
    const q = query.toLowerCase();
    
    if (product.title.toLowerCase().includes(q)) return true;
    if (product.brand.toLowerCase().includes(q)) return true;
    if (product.category.toLowerCase().includes(q.replace('-', ' '))) return true;
    
    const isFashionQuery = ['cloth', 'wear', 'apparel', 'shirt', 'dress', 'shoe', 'fashion'].some(syn => q.includes(syn));
    if (isFashionQuery && product.category === 'fashion') return true;
    
    const isTechQuery = ['tech', 'phone', 'computer', 'gadget', 'device', 'laptop', 'electronic'].some(syn => q.includes(syn));
    if (isTechQuery && product.category === 'electronics') return true;
    
    const isToyQuery = ['toy', 'game', 'play', 'kid'].some(syn => q.includes(syn));
    if (isToyQuery && product.category === 'toys-games') return true;
    
    const isBeautyQuery = ['beauty', 'health', 'makeup', 'skin', 'face', 'cosmetic'].some(syn => q.includes(syn));
    if (isBeautyQuery && product.category === 'beauty-health') return true;

    const isHomeQuery = ['home', 'kitchen', 'appliance', 'furniture', 'cook'].some(syn => q.includes(syn));
    if (isHomeQuery && product.category === 'home-kitchen') return true;

    const isSportsQuery = ['sport', 'outdoor', 'gym', 'fitness', 'exercise'].some(syn => q.includes(syn));
    if (isSportsQuery && product.category === 'sports-outdoors') return true;

    const isBookQuery = ['book', 'stationery', 'read', 'write', 'pen', 'paper'].some(syn => q.includes(syn));
    if (isBookQuery && product.category === 'books-stationery') return true;

    return false;
  });

  const dynamicCategories = Array.from(new Set(productsMatchingQuery.map(p => p.category)));

  const filteredProducts = productsMatchingQuery.filter(product => {
    const categoryMatch = categoryParam === '' || product.category === categoryParam;
    const priceMatch = selectedPrice === null ||
      (product.price >= selectedPrice.min && product.price <= selectedPrice.max);
    return categoryMatch && priceMatch;
  });

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-8">
      {/* Breadcrumb & Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-black text-gray-900">Shop All Products</h1>
        <p className="text-gray-500 mt-2">Find the best deals across all categories.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-4">
            <div className="flex items-center gap-2 font-bold text-gray-900 mb-4 pb-4 border-b border-gray-100">
              <Filter size={20} className="text-orange-500" />
              Filters
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-3 flex justify-between items-center">
                Categories <ChevronDown size={16} className="text-gray-400" />
              </h3>
              <div className="flex flex-col gap-2">
                {dynamicCategories.map((catSlug, idx) => (
                  <label key={idx} className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={categoryParam === catSlug}
                      onChange={() => {
                        const newParams = new URLSearchParams(searchParams);
                        if (categoryParam === catSlug) {
                          newParams.delete('category');
                        } else {
                          newParams.set('category', catSlug);
                        }
                        setSearchParams(newParams);
                      }}
                      className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500" 
                    />
                    <span className="text-sm text-gray-600 group-hover:text-orange-500">
                      {catSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' & ')}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="font-bold text-gray-900 mb-3 flex justify-between items-center">
                Price <ChevronDown size={16} className="text-gray-400" />
              </h3>
              <div className="flex flex-col gap-2">
                {priceRanges.map((range, idx) => (
                  <label key={idx} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="price"
                      checked={selectedPrice?.label === range.label}
                      onChange={() => setSelectedPrice(range)}
                      className="w-4 h-4 border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                    <span className={`text-sm transition-colors ${
                      selectedPrice?.label === range.label
                        ? 'text-orange-500 font-bold'
                        : 'text-gray-600 group-hover:text-orange-500'
                    }`}>{range.label}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <button 
              onClick={() => { setSearchParams({}); setSelectedPrice(null); }}
              className="w-full mt-6 bg-orange-50 text-orange-500 font-bold py-2 rounded-md hover:bg-orange-100 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {query && (
            <div className="mb-4 bg-orange-50 text-orange-800 p-3 rounded-lg border border-orange-100 flex items-center justify-between">
              <span>Showing results for search: <strong>"{query}"</strong></span>
              <button onClick={() => window.location.href = '/shop'} className="text-orange-500 hover:underline text-sm font-bold">Clear</button>
            </div>
          )}
          {categoryParam && (
            <div className="mb-4 bg-purple-50 text-purple-800 p-3 rounded-lg border border-purple-100 flex items-center justify-between">
              <span>Showing category: <strong className="capitalize">{categoryParam.replace('-', ' ')}</strong></span>
              <button onClick={() => window.location.href = '/shop'} className="text-purple-600 hover:underline text-sm font-bold">Clear</button>
            </div>
          )}

          <div className="flex justify-between items-center mb-6 bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
            <span className="text-sm text-gray-500">Showing {filteredProducts.length} results</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select className="text-sm border-gray-200 rounded-md focus:border-orange-500 focus:ring-orange-500">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Avg. Customer Review</option>
              </select>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => {
                const inCart = cartItems.find(i => i.id === product.id);
                const inWishlist = wishlistItems.find(i => i.id === product.id);
                return (
                  <div key={product.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow group relative flex flex-col h-full">
                    {/* Discount badge */}
                    <div className="absolute top-3 left-3 bg-pink-100 text-pink-600 text-[10px] font-bold px-2 py-0.5 rounded z-10">
                      {product.discount}
                    </div>
                    {/* Wishlist button */}
                    <button
                      onClick={() => addToWishlist(product)}
                      className={`absolute top-3 right-3 z-10 h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-sm transition-colors ${
                        inWishlist ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                      }`}
                    >
                      <Heart size={15} className={inWishlist ? 'fill-current' : ''} />
                    </button>
                    {/* Product image */}
                    <div className="h-48 flex items-center justify-center mb-4 overflow-hidden rounded-lg bg-gray-50">
                      <img src={product.image} alt={product.title} className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
                    <h4 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2 min-h-[40px]">{product.title}</h4>
                    <div className="flex items-center gap-1 mb-3 mt-auto">
                      <div className="flex text-orange-400 text-xs">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} className={i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">({product.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-lg font-black text-gray-900">₹{product.price.toLocaleString()}</span>
                        <span className="text-xs text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                      </div>
                      <button
                        onClick={() => addToCart(product)}
                        className={`relative h-9 w-9 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${
                          inCart
                            ? 'bg-orange-500 text-white'
                            : 'bg-orange-50 text-orange-500 hover:bg-orange-500 hover:text-white'
                        }`}
                      >
                        <ShoppingCart size={16} />
                        {inCart && (
                          <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                            {inCart.qty}
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-20 text-center bg-white border border-gray-100 rounded-xl">
              <p className="text-gray-500 text-xl mb-4">No match product on your criteria. Please add the item in it.</p>
              <button onClick={() => window.location.href = '/shop'} className="bg-orange-500 text-white font-bold px-6 py-2 rounded-md hover:bg-orange-600">
                View All Products
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
