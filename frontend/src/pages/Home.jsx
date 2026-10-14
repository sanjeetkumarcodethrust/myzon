import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Sparkles, ArrowRight, ArrowUpRight, Flame, Headphones, 
  ShieldCheck, Truck, Gem, CheckCircle2 
} from 'lucide-react';
import { FlipkartCategoryStrip } from '../components/FlipkartCategoryStrip';
import { HeroCarousel } from '../components/HeroCarousel';
import { BankOfferRibbon } from '../components/BankOfferRibbon';
import { BentoGrid } from '../components/BentoGrid';
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

  // If user searched for something
  if (query) {
    return (
      <div className="bg-[#0a0b0e] min-h-screen text-neutral-100 py-10 select-none">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
          <div className="bg-[#121316] rounded-2xl border border-neutral-800 p-6 sm:p-8 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
            <div>
              <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Sparkles size={13} />
                <span>Catalog Search</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                Results for <span className="text-amber-400">"{query}"</span>
              </h1>
              <p className="text-xs text-neutral-400 mt-1">
                Showing {searchResults.length} matching drops in Myzon Studio
              </p>
            </div>
            <Link
              to="/"
              className="text-xs font-bold bg-neutral-900 hover:bg-neutral-800 text-neutral-200 px-5 py-2.5 rounded-xl border border-neutral-700 hover:border-amber-500/40 transition-colors"
            >
              Clear Search & Return Home
            </Link>
          </div>

          {searchResults.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
              {searchResults.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-[#121316] rounded-3xl border border-neutral-800 p-16 text-center shadow-xl">
              <p className="text-xl font-bold text-white mb-2">No drops found matching "{query}"</p>
              <p className="text-xs text-neutral-400 mb-6 max-w-md mx-auto">
                Try searching for broader terms like "headphones", "pooja", or "shoes", or discover our curated ateliers.
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-950 text-xs font-bold px-7 py-3 rounded-xl shadow-md transition-all cursor-pointer"
              >
                <span>Browse Full Catalog</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0b0e] text-neutral-100 min-h-screen pb-16 select-none">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
        
        {/* 1. Curated Category Rail */}
        <FlipkartCategoryStrip />

        {/* 2. Ultra-Modern Flagship Hero with Interactive Spotlight */}
        <HeroCarousel />

        {/* 3. VIP Member Benefits & Concierge Strip */}
        <BankOfferRibbon />

        {/* 4. Signature Bento Grid (Curated Discoveries) */}
        <BentoGrid />

        {/* 5. The Flash Vault with Live Countdown */}
        <FlashDealsSection products={flashDeals} />

        {/* 6. Flagship Showcase: Acoustic & Tech Drops */}
        <section className="bg-[#121316] rounded-3xl border border-neutral-800/80 shadow-xl p-6 sm:p-8 mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-neutral-800 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Headphones size={13} />
                <span>Next-Gen Audio</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Acoustics & Intelligent Tech
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">High-fidelity headphones, smartwatches, and lossless wireless audio</p>
            </div>

            <Link
              to="/shop?category=electronics"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-300 hover:text-amber-400 transition-colors"
            >
              <span>Explore Collection</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {electronicsProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* 7. Heritage Showcase: Sacred Vedic Sanctum */}
        <section className="rounded-3xl bg-gradient-to-br from-[#1c140e] via-[#14100c] to-[#0d0a08] border border-amber-500/20 p-6 sm:p-8 mb-12 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-amber-500/20 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Flame size={13} />
                <span>Sacred Living</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Handcrafted Vedic Sanctum & Brass
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">100% Pure Bilona Cow Ghee, hand-hammered brass lamps, and artisanal hawan samagri</p>
            </div>

            <Link
              to="/shop?category=pooja-samagri"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-950 font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md cursor-pointer"
            >
              <span>Explore Spiritual Ateliers</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {poojaProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* 8. Modern Streetwear & Apparel */}
        <section className="bg-[#121316] rounded-3xl border border-neutral-800/80 shadow-xl p-6 sm:p-8 mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-neutral-800 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Sparkles size={13} />
                <span>Designer Wardrobe</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Modern Apparel & Performance Footwear
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">Top-tier streetwear, lightweight trainers, and casual essentials</p>
            </div>

            <Link
              to="/shop?category=fashion"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-300 hover:text-amber-400 transition-colors"
            >
              <span>Explore Fashion Drops</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {fashionProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* 9. VIP Membership Banner */}
        <section className="rounded-3xl bg-gradient-to-r from-[#171821] via-[#121318] to-[#0a0b0d] border border-amber-500/30 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-xl">
            <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm mb-3 inline-block">
              ✦ The Myzon Circle
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
              Unlock Priority Drops & VIP Concierge
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Join 50,000+ members enjoying complimentary express courier, private vault drop invites, and dedicated client styling concierge.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link
              to="/deals"
              className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-950 font-bold px-7 py-3.5 rounded-2xl text-xs sm:text-sm transition-all shadow-md active:scale-98 text-center cursor-pointer"
            >
              Explore VIP Drops
            </Link>
            <Link
              to="/track-order"
              className="w-full sm:w-auto bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white font-semibold px-7 py-3.5 rounded-2xl text-xs sm:text-sm border border-neutral-700 hover:border-amber-500/40 transition-all text-center cursor-pointer"
            >
              Contact Concierge
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
};
