import React, { useState } from 'react';
import { Filter, ChevronDown, Sparkles, X, ArrowUpRight } from 'lucide-react';
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
    <div className="bg-[#0a0b0e] text-neutral-100 min-h-screen py-8 select-none">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
        
        {/* Breadcrumb / Top Info */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles size={13} />
            <span>Studio Catalog</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            {categoryParam ? (
              <span className="capitalize">{categoryParam.replace('-', ' ')} Collection</span>
            ) : query ? (
              <span>Results for "{query}"</span>
            ) : (
              <span>All Studio Drops</span>
            )}
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Displaying {filteredProducts.length} certified items with complimentary express courier & authenticity assurance.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left Sidebar Filters */}
          <div className="w-full lg:w-64 shrink-0">
            <div className="bg-[#121316] rounded-2xl border border-neutral-800 p-5 shadow-xl sticky top-24">
              <div className="flex items-center justify-between pb-3.5 border-b border-neutral-800 mb-4 font-bold text-white text-xs uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <Filter size={15} className="text-amber-400" />
                  <span>Curated Filters</span>
                </div>
                {(categoryParam || brandParam || priceParam || query) && (
                  <button
                    onClick={() => setSearchParams({})}
                    className="text-[10px] text-amber-400 font-bold hover:underline cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Active Filter Chips */}
              {(categoryParam || brandParam || priceParam) && (
                <div className="flex flex-wrap gap-1.5 mb-4 pb-3.5 border-b border-neutral-800">
                  {categoryParam && (
                    <span className="inline-flex items-center gap-1 bg-neutral-900 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full capitalize">
                      {categoryParam.replace('-', ' ')}
                      <X size={12} className="cursor-pointer" onClick={() => {
                        const p = new URLSearchParams(searchParams);
                        p.delete('category');
                        setSearchParams(p);
                      }} />
                    </span>
                  )}
                  {brandParam && (
                    <span className="inline-flex items-center gap-1 bg-neutral-900 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      {brandParam}
                      <X size={12} className="cursor-pointer" onClick={() => {
                        const p = new URLSearchParams(searchParams);
                        p.delete('brand');
                        setSearchParams(p);
                      }} />
                    </span>
                  )}
                  {priceParam && (
                    <span className="inline-flex items-center gap-1 bg-neutral-900 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
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
                <h4 className="text-[10px] font-bold uppercase text-neutral-400 tracking-widest mb-3">
                  Collections
                </h4>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 text-xs text-neutral-300">
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
                      className="accent-amber-400"
                    />
                    <span className={categoryParam === '' ? 'font-bold text-amber-400' : 'text-neutral-400 hover:text-white'}>
                      All Collections
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
                        className="accent-amber-400"
                      />
                      <span className={categoryParam === c ? 'font-bold text-amber-400' : 'text-neutral-400 hover:text-white'}>
                        {c.replace('-', ' ')}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-5 border-t border-neutral-800 pt-4">
                <h4 className="text-[10px] font-bold uppercase text-neutral-400 tracking-widest mb-3">
                  Price Tier
                </h4>
                <div className="space-y-1.5 text-xs text-neutral-300">
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
                      className="accent-amber-400"
                    />
                    <span className={priceParam === '' ? 'font-bold text-amber-400' : 'text-neutral-400 hover:text-white'}>
                      All Price Tiers
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
                        className="accent-amber-400"
                      />
                      <span className={priceParam === r.label ? 'font-bold text-amber-400' : 'text-neutral-400 hover:text-white'}>
                        {r.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right Product Grid Column */}
          <div className="flex-1">
            
            {/* Sort Bar */}
            <div className="bg-[#121316] rounded-2xl border border-neutral-800 p-3.5 mb-6 shadow-md flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-neutral-400">Sort By:</span>
                <div className="flex items-center gap-1.5 overflow-x-auto">
                  {['Relevance', 'Price: Low to High', 'Price: High to Low', 'Customer Rating'].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSortChange(opt)}
                      className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                        sortOption === opt
                          ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 shadow-xs'
                          : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <span className="text-neutral-500 font-medium">
                Showing {Math.min(paginatedProducts.length, filteredProducts.length)} of {filteredProducts.length} drops
              </span>
            </div>

            {/* Products Grid */}
            {paginatedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="text-center mt-10">
                    <button
                      onClick={() => setPage((p) => p + 1)}
                      className="bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 hover:border-amber-500/40 font-bold px-8 py-3.5 rounded-2xl shadow-md transition-all cursor-pointer text-xs"
                    >
                      Load More Drops ({filteredProducts.length - paginatedProducts.length} remaining)
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-[#121316] rounded-3xl border border-neutral-800 p-16 text-center shadow-xl">
                <p className="text-xl font-bold text-white mb-2">No drops matched your criteria</p>
                <p className="text-xs text-neutral-400 mb-6">Try clearing active filters or searching for different keywords.</p>
                <button
                  onClick={() => setSearchParams({})}
                  className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-950 font-bold px-7 py-3 rounded-xl text-xs cursor-pointer shadow-md"
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
