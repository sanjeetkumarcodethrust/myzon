import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Flame, Laptop, Shirt, Home as HomeIcon, HeartPulse, Dumbbell, 
  ChevronRight, Truck, RefreshCcw, ShieldCheck, Zap, Sparkles, ArrowRight, Star
} from 'lucide-react';
import { FlipkartCategoryStrip } from '../components/FlipkartCategoryStrip';
import { HeroCarousel } from '../components/HeroCarousel';
import { BankOfferRibbon } from '../components/BankOfferRibbon';
import { AmazonQuadCard } from '../components/AmazonQuadCard';
import { FlashDealsSection } from '../components/FlashDealsSection';
import { ProductCard } from '../components/ProductCard';

import productsData from '../data/products.json';

export const Home = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  // Filter products if search is active
  const searchResults = query
    ? productsData.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.brand.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  // Curated datasets for sections
  const electronicsProducts = productsData.filter(p => p.category === 'electronics').slice(0, 6);
  const poojaProducts = productsData.filter(p => p.category === 'pooja-samagri').slice(0, 6);
  const fashionProducts = productsData.filter(p => p.category === 'fashion').slice(0, 6);
  const under999Products = productsData.filter(p => p.price <= 999).slice(0, 6);
  const flashDeals = productsData.filter(p => p.discount && p.originalPrice).slice(0, 8);

  // Amazon Quad Cards datasets
  const quadTech = [
    { title: 'Smartwatches', subtitle: 'Up to 60% off', image: electronicsProducts[0]?.image || '', link: '/shop?category=electronics' },
    { title: 'TWS Earbuds', subtitle: 'Starting ₹899', image: electronicsProducts[1]?.image || '', link: '/shop?category=electronics' },
    { title: 'Cameras & Lenses', subtitle: 'Up to 35% off', image: electronicsProducts[3]?.image || '', link: '/shop?category=electronics' },
    { title: 'Headphones', subtitle: 'Min 50% off', image: electronicsProducts[4]?.image || '', link: '/shop?category=electronics' },
  ];

  const quadPooja = [
    { title: 'Brass Diyas & Lamps', subtitle: 'Festive Special', image: poojaProducts[0]?.image || '', link: '/shop?category=pooja-samagri' },
    { title: 'Pure Desi Ghee & Batti', subtitle: '100% Organic', image: poojaProducts[1]?.image || '', link: '/shop?category=pooja-samagri' },
    { title: 'Hawan Kits & Samagri', subtitle: 'Flat 40% off', image: poojaProducts[2]?.image || '', link: '/shop?category=pooja-samagri' },
    { title: 'Natural Dhoop & Incense', subtitle: 'Long Lasting', image: poojaProducts[3]?.image || '', link: '/shop?category=pooja-samagri' },
  ];

  const quadFashion = [
    { title: 'Running Shoes', subtitle: 'Min 40% off', image: fashionProducts[0]?.image || '', link: '/shop?category=fashion' },
    { title: 'Casual & Formal Wear', subtitle: 'Top Brands', image: fashionProducts[1]?.image || '', link: '/shop?category=fashion' },
    { title: 'Sports Sneakers', subtitle: 'Starting ₹999', image: fashionProducts[2]?.image || '', link: '/shop?category=fashion' },
    { title: 'Apparel & Outfits', subtitle: 'Up to 70% off', image: fashionProducts[3]?.image || '', link: '/shop?category=fashion' },
  ];

  const quadHome = [
    { title: 'Bath Towels & Linens', subtitle: 'Under ₹499', image: under999Products[0]?.image || '', link: '/shop?category=home-kitchen' },
    { title: 'Kitchen Appliances', subtitle: 'Up to 50% off', image: under999Products[1]?.image || '', link: '/shop?category=home-kitchen' },
    { title: 'Home Storage', subtitle: 'Starting ₹199', image: under999Products[2]?.image || '', link: '/shop?category=home-kitchen' },
    { title: 'Daily Essentials', subtitle: 'Special Deals', image: under999Products[3]?.image || '', link: '/shop?category=home-kitchen' },
  ];

  // If user searched for something
  if (query) {
    return (
      <div className="max-w-[1600px] mx-auto px-4 py-8">
        <div className="bg-white rounded-xl border border-gray-100 shadow-xs p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-gray-900">
              Results for <span className="text-amber-600">"{query}"</span>
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Showing {searchResults.length} products matching your query
            </p>
          </div>
          <Link
            to="/"
            className="text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition-colors"
          >
            Clear Search & Return Home
          </Link>
        </div>

        {searchResults.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {searchResults.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center shadow-xs">
            <p className="text-lg font-bold text-gray-700 mb-2">No matching products found for "{query}"</p>
            <p className="text-xs text-gray-400 mb-6">Try checking your spelling or searching for broad terms like "headphones", "pooja", or "shoes".</p>
            <Link
              to="/shop"
              className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-950 text-xs font-bold px-6 py-3 rounded-lg shadow-xs"
            >
              Browse All Products
            </Link>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-[#f1f3f6] min-h-screen pb-12">
      {/* 1. Flipkart-style Top Categories Strip */}
      <FlipkartCategoryStrip />

      <div className="max-w-[1600px] mx-auto px-4">
        {/* 2. Auto-sliding Full Width Hero Carousel */}
        <HeroCarousel />

        {/* 3. Bank Instant Discount Ribbon */}
        <BankOfferRibbon />

        {/* 4. Amazon Signature 4-Quadrant Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <AmazonQuadCard 
            title="Up to 70% off | Top tech & audio" 
            items={quadTech} 
            seeMoreLink="/shop?category=electronics"
            seeMoreText="Explore all tech"
          />
          <AmazonQuadCard 
            title="🪔 Pooja & Sacred Essentials" 
            items={quadPooja} 
            seeMoreLink="/shop?category=pooja-samagri"
            seeMoreText="Explore spiritual store"
          />
          <AmazonQuadCard 
            title="Trending Fashion & Footwear" 
            items={quadFashion} 
            seeMoreLink="/shop?category=fashion"
            seeMoreText="Explore clothing deals"
          />
          <AmazonQuadCard 
            title="Revamp Home & Kitchen" 
            items={quadHome} 
            seeMoreLink="/shop?category=home-kitchen"
            seeMoreText="Explore home essentials"
          />
        </div>

        {/* 5. Deal of the Day with Live Countdown Timer */}
        <FlashDealsSection products={flashDeals} />

        {/* 6. Flipkart Style "Best of Electronics & Gadgets" Section */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-5 md:p-6 mb-8">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
                  Best of Electronics & Gadgets
                </h3>
                <span className="hidden sm:inline-block bg-amber-50 text-amber-800 border border-amber-200/60 text-[10px] font-black px-2 py-0.5 rounded">
                  ✦ Assured
                </span>
              </div>
              <p className="text-xs text-gray-500">Earphones, smartwatches, cameras & daily tech gear</p>
            </div>
            <Link
              to="/shop?category=electronics"
              className="bg-[#121316] hover:bg-[#1a1c22] text-amber-400 border border-amber-500/40 font-bold text-xs px-4 py-2 rounded-lg transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
            >
              <span>View All</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {electronicsProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* 7. Divine Pooja Samagri & Festive Special Showcase */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-2xl p-5 md:p-6 mb-8 text-white shadow-md relative overflow-hidden">
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-5 pb-4 border-b border-white/20">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-200 mb-1">
                <Sparkles size={14} className="text-yellow-300" />
                <span>Special Festive Store</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                🪔 Shubh Pooja Samagri & Hawan Essentials
              </h3>
              <p className="text-xs text-amber-100">Pure Ghee, Brass Diyas, Hawan Samagri & Natural Dhoop delivered to your doorstep</p>
            </div>
            <Link
              to="/shop?category=pooja-samagri"
              className="bg-white text-gray-950 hover:bg-amber-100 font-black text-xs px-5 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5"
            >
              <span>Explore Pooja Store</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {poojaProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* 8. Budget Store: Under ₹999 Store */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-5 md:p-6 mb-8">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
                  Budget Store | Daily Essentials Under ₹999
                </h3>
                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded">
                  Super Saver
                </span>
              </div>
              <p className="text-xs text-gray-500">Top-rated pocket friendly picks with free delivery</p>
            </div>
            <Link
              to="/shop?price=Under+₹1,000"
              className="bg-[#121316] hover:bg-[#1a1c22] text-amber-400 border border-amber-500/40 font-bold text-xs px-4 py-2 rounded-lg transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
            >
              <span>View Under ₹999</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {under999Products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* 9. Fashion & Lifestyle Trends */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-5 md:p-6 mb-8">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
                  Wardrobe Refresh | Top Fashion Brands
                </h3>
                <span className="bg-pink-50 text-pink-700 text-[10px] font-bold px-2 py-0.5 rounded">
                  Min 50% Off
                </span>
              </div>
              <p className="text-xs text-gray-500">Nike, Puma, Adidas, Levi's & top ethnic labels</p>
            </div>
            <Link
              to="/shop?category=fashion"
              className="bg-[#121316] hover:bg-[#1a1c22] text-amber-400 border border-amber-500/40 font-bold text-xs px-4 py-2 rounded-lg transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
            >
              <span>View Fashion</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {fashionProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
