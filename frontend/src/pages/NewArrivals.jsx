import React from 'react';
import { Sparkles, ShoppingCart, Star, Clock } from 'lucide-react';

const newArrivals = [
  {
    id: 101, brand: 'Nothing', title: 'Phone (2a) 5G',
    price: 23999, originalPrice: 25999, label: 'NEW', rating: 4.6, reviews: '120',
    date: 'Added 2 days ago',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=400&h=400'
  },
  {
    id: 102, brand: 'Nike', title: 'Air Force 1 \'07 Pro-Tech',
    price: 13995, originalPrice: 13995, label: 'JUST DROPPED', rating: 5.0, reviews: '12',
    date: 'Added 5 hours ago',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=400&h=400'
  },
  {
    id: 103, brand: 'Sony', title: 'Alpha 7C II Full-Frame Camera',
    price: 189990, originalPrice: 199990, label: 'NEW', rating: 4.9, reviews: '45',
    date: 'Added 1 week ago',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400&h=400'
  },
  {
    id: 104, brand: 'DJI', title: 'Mini 4 Pro Drone',
    price: 84990, originalPrice: 89990, label: 'TRENDING', rating: 4.8, reviews: '89',
    date: 'Added 3 days ago',
    image: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&q=80&w=400&h=400'
  }
];

export const NewArrivals = () => {
  return (
    <div className="max-w-[1600px] mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 md:p-16 text-white mb-10 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-purple-200 font-bold mb-4 bg-white/10 inline-flex px-4 py-1.5 rounded-full backdrop-blur-md border border-white/20">
            <Sparkles size={18} className="text-yellow-300" /> Fresh Out The Box
          </div>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">Discover What's New</h1>
          <p className="text-white/80 text-lg md:text-xl">Be the first to get your hands on the latest tech, fashion, and more. Updated daily with the hottest releases.</p>
        </div>
        
        {/* Abstract shapes */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-pink-500 opacity-20 rounded-full blur-3xl mix-blend-screen"></div>
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-blue-500 opacity-20 rounded-full blur-3xl mix-blend-screen"></div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black text-gray-900">Latest Drops</h2>
        <div className="text-sm font-bold text-gray-500 flex items-center gap-2">
          Sort by: 
          <select className="border-none bg-gray-50 text-gray-900 rounded-md focus:ring-0 py-1 pl-2 pr-6 cursor-pointer">
            <option>Newest First</option>
            <option>Popularity</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {newArrivals.map(product => (
          <div key={product.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all group relative flex flex-col h-full">
            <div className="absolute top-4 left-4 bg-purple-100 text-purple-700 text-[10px] font-black px-2.5 py-1 rounded-full z-10 tracking-widest border border-purple-200 shadow-sm">
              {product.label}
            </div>
            
            <div className="h-56 flex items-center justify-center mb-5 overflow-hidden rounded-xl bg-gray-50 p-4">
              <img src={product.image} alt={product.title} className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-md" />
            </div>
            
            <div className="flex justify-between items-start mb-2">
              <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">{product.brand}</div>
            </div>
            
            <h4 className="font-bold text-gray-900 text-base mb-2 line-clamp-2">{product.title}</h4>
            
            <div className="flex items-center gap-1 mb-4">
              <div className="flex text-orange-400 text-xs">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className={i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'} />
                ))}
              </div>
              <span className="text-xs text-gray-400 font-medium">({product.reviews})</span>
            </div>
            
            <div className="mt-auto">
              <div className="text-[11px] text-gray-400 mb-3 flex items-center gap-1 bg-gray-50 inline-block px-2 py-0.5 rounded">
                <Clock size={10} /> {product.date}
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xl font-black text-gray-900">₹{product.price.toLocaleString()}</div>
                  {product.originalPrice > product.price && (
                    <div className="text-xs text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</div>
                  )}
                </div>
                <button className="bg-purple-600 text-white h-10 w-10 rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors shadow-sm group-hover:shadow-md group-hover:scale-105">
                  <ShoppingCart size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
