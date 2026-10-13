import React, { useState } from 'react';
import { Filter, ChevronDown, Sparkles, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import productsData from '../data/products.json';

const priceRanges = [
  { label: 'Under ₹1,000',      min: 0,     max: 999 },
  { label: '₹1,000 - ₹5,000',  min: 1000,  max: 5000 },
  { label: '₹5,000 - ₹20,000', min: 5000,  max: 20000 },
  { label: 'Over ₹20,000',      min: 20001, max: Infinity },
];

export const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || '';
  const brandParam = searchParams.get('brand') || '';
  const priceParam = searchParams.get('price') || '';
  const sortOption = searchParams.get('sort') || 'Relevance';
  const selectedPrice = priceRanges.find(r => r.label === priceParam) || null;

  const [page, setPage] = useState(1);
  const itemsPerPage = 24;

  const productsMatchingQuery = productsData.filter(product => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      product.title.toLowerCase().includes(q) ||
      product.brand.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q.replace('-', ' '))
    );
  });

  const dynamicCategories = Array.from(new Set(productsData.map(p => p.category)));
  const dynamicBrands = Array.from(new Set(productsMatchingQuery.map(p => p.brand))).slice(0, 15);

  let filteredProducts = productsMatchingQuery.filter(product => {
    const categoryMatch = categoryParam === '' || product.category === categoryParam;
    const brandMatch = brandParam === '' || product.brand.toLowerCase() === brandParam.toLowerCase();
    const priceMatch = selectedPrice === null ||
      (product.price >= selectedPrice.min && product.price <= selectedPrice.max);
    return categoryMatch && brandMatch && priceMatch;
  });

  if (sortOption === 'Price: Low to High') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'Price: High to Low') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === 'Customer Rating') {
    filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  const paginatedProducts = filteredProducts.slice(0, page * itemsPerPage);
  const hasMore = paginatedProducts.length < filteredProducts.length;

  const handleSortChange = (sortName) => {
    const newParams = new URLSearchParams(searchParams);
    if (sortName === 'Relevance') {
      newParams.delete('sort');
    } else {
      newParams.set('sort', sortName);
    }
    setSearchParams(newParams);
  };

  return (
    <div className="bg-[#f1f3f6] min-h-screen py-6">
      <div className="max-w-[1600px] mx-auto px-4">
        
        {/* Breadcrumb / Top Info */}
        <div className="mb-4">
          <h1 className="text-2xl font-black text-gray-900">
            {categoryParam ? (
              <span className="capitalize">{categoryParam.replace('-', ' ')} Store</span>
            ) : query ? (
              <span>Results for "{query}"</span>
            ) : (
              <span>Shop All Products</span>
            )}
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Showing {filteredProducts.length} items with fast delivery & genuine warranty
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left Sidebar Filters (Flipkart & Amazon style) */}
          <div className="w-full lg:w-64 shrink-0">
            <div className="bg-white rounded-xl border border-gray-200/80 p-5 shadow-xs sticky top-20">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4 font-bold text-gray-900 text-sm">
                <div className="flex items-center gap-2">
                  <Filter size={16} className="text-[#2874f0]" />
                  <span>Filters</span>
                </div>
                {(categoryParam || brandParam || priceParam || query) && (
                  <button
                    onClick={() => setSearchParams({})}
                    className="text-[11px] text-[#2874f0] font-bold hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Active Filter Chips */}
              {(categoryParam || brandParam || priceParam) && (
                <div className="flex flex-wrap gap-1.5 mb-4 pb-3 border-b border-gray-100">
                  {categoryParam && (
                    <span className="inline-flex items-center gap-1 bg-blue-50 text-[#2874f0] text-[10px] font-bold px-2 py-0.5 rounded-full capitalize">
                      {categoryParam.replace('-', ' ')}
                      <X size={12} className="cursor-pointer" onClick={() => {
                        const p = new URLSearchParams(searchParams);
                        p.delete('category');
                        setSearchParams(p);
                      }} />
                    </span>
                  )}
                  {brandParam && (
                    <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {brandParam}
                      <X size={12} className="cursor-pointer" onClick={() => {
                        const p = new URLSearchParams(searchParams);
                        p.delete('brand');
                        setSearchParams(p);
                      }} />
                    </span>
                  )}
                  {priceParam && (
                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {priceParam}
                      <X size={12} className="cursor-pointer" onClick={() => {
                        const p = new URLSearchParams(searchParams);
                        p.delete('price');
                        setSearchParams(p);
                      }} />
                    </span>
                  )}
                </div>
              )}

              {/* Category Filter */}
              <div className="mb-5">
                <h4 className="text-xs font-black uppercase text-gray-700 tracking-wider mb-2.5">
                  Categories
                </h4>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="cat"
                      checked={categoryParam === ''}
                      onChange={() => {
                        const p = new URLSearchParams(searchParams);
                        p.delete('category');
                        setSearchParams(p);
                      }}
                      className="text-[#2874f0] focus:ring-[#2874f0]"
                    />
                    <span className={categoryParam === '' ? 'font-bold text-[#2874f0]' : 'text-gray-600'}>
                      All Categories
                    </span>
                  </label>
                  {dynamicCategories.map((c, i) => (
                    <label key={i} className="flex items-center gap-2 cursor-pointer capitalize">
                      <input
                        type="radio"
                        name="cat"
                        checked={categoryParam === c}
                        onChange={() => {
                          const p = new URLSearchParams(searchParams);
                          p.set('category', c);
                          setSearchParams(p);
                        }}
                        className="text-[#2874f0] focus:ring-[#2874f0]"
                      />
                      <span className={categoryParam === c ? 'font-bold text-[#2874f0]' : 'text-gray-600'}>
                        {c.replace('-', ' ')}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-5 border-t border-gray-100 pt-4">
                <h4 className="text-xs font-black uppercase text-gray-700 tracking-wider mb-2.5">
                  Price Range
                </h4>
                <div className="space-y-1.5 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      checked={priceParam === ''}
                      onChange={() => {
                        const p = new URLSearchParams(searchParams);
                        p.delete('price');
                        setSearchParams(p);
                      }}
                      className="text-[#2874f0]"
                    />
                    <span className={priceParam === '' ? 'font-bold text-[#2874f0]' : 'text-gray-600'}>
                      All Prices
                    </span>
                  </label>
                  {priceRanges.map((r, i) => (
                    <label key={i} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="price"
                        checked={priceParam === r.label}
                        onChange={() => {
                          const p = new URLSearchParams(searchParams);
                          p.set('price', r.label);
                          setSearchParams(p);
                        }}
                        className="text-[#2874f0]"
                      />
                      <span className={priceParam === r.label ? 'font-bold text-[#2874f0]' : 'text-gray-600'}>
                        {r.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Customer Rating Filter */}
              <div className="border-t border-gray-100 pt-4 text-xs">
                <h4 className="text-xs font-black uppercase text-gray-700 tracking-wider mb-2.5">
                  Customer Rating
                </h4>
                <div className="space-y-1 text-gray-600">
                  <div className="flex items-center gap-1.5 hover:text-[#2874f0] cursor-pointer" onClick={() => handleSortChange('Customer Rating')}>
                    <span className="font-bold text-amber-500">4★ & above</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Product Grid Column */}
          <div className="flex-1">
            
            {/* Sort Bar (Flipkart Style Tabs) */}
            <div className="bg-white rounded-xl border border-gray-200/80 p-3 mb-4 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-800">Sort By:</span>
                <div className="flex items-center gap-1 overflow-x-auto">
                  {['Relevance', 'Price: Low to High', 'Price: High to Low', 'Customer Rating'].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSortChange(opt)}
                      className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                        sortOption === opt
                          ? 'bg-[#2874f0] text-white shadow-xs'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <span className="text-gray-500 font-medium">
                Showing {Math.min(paginatedProducts.length, filteredProducts.length)} of {filteredProducts.length}
              </span>
            </div>

            {/* Products Grid */}
            {paginatedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="text-center mt-8">
                    <button
                      onClick={() => setPage((p) => p + 1)}
                      className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 font-bold px-8 py-3 rounded-xl shadow-xs transition-colors cursor-pointer text-xs"
                    >
                      Load More Products ({filteredProducts.length - paginatedProducts.length} remaining)
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200/80 p-16 text-center shadow-xs">
                <p className="text-xl font-bold text-gray-800 mb-2">No products matched your criteria</p>
                <p className="text-xs text-gray-500 mb-6">Try clearing some filters or searching for different keywords.</p>
                <button
                  onClick={() => setSearchParams({})}
                  className="bg-[#2874f0] text-white font-bold px-6 py-2.5 rounded-lg text-xs"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
