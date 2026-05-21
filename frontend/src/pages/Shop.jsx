import React, { useState } from 'react';
import { Star, ShoppingCart, Filter, ChevronDown } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const products = [
  {
    id: 1, brand: 'Noise', title: 'ColorFit Pulse 3 Smartwatch', category: 'electronics',
    price: 1999, originalPrice: 2699, discount: '-25%', rating: 4.5, reviews: '1.2k',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: 2, brand: 'boAt', title: 'Rockerz 450 Bluetooth Headphones', category: 'electronics',
    price: 1599, originalPrice: 1999, discount: '-20%', rating: 4.4, reviews: '892',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: 3, brand: 'Nike', title: 'Men\'s Air Max Running Shoes', category: 'fashion',
    price: 3399, originalPrice: 3999, discount: '-15%', rating: 4.7, reviews: '1.5k',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: 4, brand: 'Canon', title: 'EOS 200D II DSLR Camera', category: 'electronics',
    price: 34999, originalPrice: 49999, discount: '-30%', rating: 4.8, reviews: '980',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: 5, brand: 'Apple', title: 'AirPods Pro (2nd Generation)', category: 'electronics',
    price: 24900, originalPrice: 26900, discount: '-7%', rating: 4.9, reviews: '5k+',
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: 6, brand: 'Samsung', title: 'Galaxy S23 Ultra 5G', category: 'electronics',
    price: 104999, originalPrice: 124999, discount: '-16%', rating: 4.7, reviews: '2.1k',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: 7, brand: 'Sony', title: 'PlayStation 5 Console', category: 'toys-games',
    price: 49990, originalPrice: 54990, discount: '-9%', rating: 4.9, reviews: '3.4k',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: 8, brand: 'Puma', title: 'Unisex Backpack', category: 'fashion',
    price: 899, originalPrice: 1999, discount: '-55%', rating: 4.2, reviews: '450',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: 9, brand: 'LG', title: '32 inch UltraGear Monitor', category: 'electronics',
    price: 24500, originalPrice: 35000, discount: '-30%', rating: 4.6, reviews: '800',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: 10, brand: 'L\'Oreal', title: 'Revitalift Hyaluronic Acid Serum', category: 'beauty-health',
    price: 899, originalPrice: 999, discount: '-10%', rating: 4.5, reviews: '3.2k',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: 11, brand: 'Philips', title: 'Air Fryer HD9200/90', category: 'home-kitchen',
    price: 6999, originalPrice: 9995, discount: '-30%', rating: 4.6, reviews: '5k+',
    image: 'https://images.unsplash.com/photo-1626200419188-f5619ebc5740?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: 12, brand: 'LEGO', title: 'Star Wars Millennium Falcon', category: 'toys-games',
    price: 14500, originalPrice: 16999, discount: '-14%', rating: 4.9, reviews: '850',
    image: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: 13, brand: 'Nivia', title: 'Storm Football - Size 5', category: 'sports-outdoors',
    price: 450, originalPrice: 850, discount: '-47%', rating: 4.3, reviews: '2.1k',
    image: 'https://images.unsplash.com/photo-1614632537190-23e4146777db?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: 14, brand: 'Penguin', title: 'Atomic Habits by James Clear', category: 'books-stationery',
    price: 499, originalPrice: 799, discount: '-37%', rating: 4.8, reviews: '15k+',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=300&h=300'
  }
];

const categories = ['Electronics', 'Fashion', 'Home & Kitchen', 'Beauty', 'Sports'];
const priceRanges = ['Under ₹1,000', '₹1,000 - ₹5,000', '₹5,000 - ₹20,000', 'Over ₹20,000'];

export const Shop = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || '';
  const [activeCategory, setActiveCategory] = useState(categoryParam);

  const filteredProducts = products.filter(product => {
    const matchesQuery = query === '' || product.title.toLowerCase().includes(query.toLowerCase()) || product.brand.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = categoryParam === '' || product.category === categoryParam;
    return matchesQuery && matchesCategory;
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
                {categories.map((cat, idx) => (
                  <label key={idx} className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                    <span className="text-sm text-gray-600 group-hover:text-orange-500">{cat}</span>
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
                    <input type="radio" name="price" className="w-4 h-4 border-gray-300 text-orange-500 focus:ring-orange-500" />
                    <span className="text-sm text-gray-600 group-hover:text-orange-500">{range}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <button className="w-full mt-6 bg-orange-50 text-orange-500 font-bold py-2 rounded-md hover:bg-orange-100 transition-colors">
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
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow group relative flex flex-col h-full">
                  <div className="absolute top-3 left-3 bg-pink-100 text-pink-600 text-[10px] font-bold px-2 py-0.5 rounded z-10">
                    {product.discount}
                  </div>
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
                    <button className="h-9 w-9 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors flex-shrink-0">
                      <ShoppingCart size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-white border border-gray-100 rounded-xl">
              <p className="text-gray-500 text-xl mb-4">No products found matching your criteria</p>
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
