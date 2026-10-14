import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowUpRight, Flame, Headphones, Watch, Shirt, Home as HomeIcon } from 'lucide-react';

export const BentoGrid = () => {
  return (
    <div className="mb-12">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-widest mb-1.5">
            <Sparkles size={13} />
            <span>Curated Collections</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            The Studio Bento
          </h2>
        </div>
        <Link
          to="/categories"
          className="text-xs font-bold text-neutral-400 hover:text-amber-400 transition-colors inline-flex items-center gap-1"
        >
          <span>Explore All 12 Collections</span>
          <ArrowUpRight size={14} />
        </Link>
      </div>

      {/* Modern Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* 1. Large Feature Card (Spans 2 cols, 2 rows on lg) */}
        <Link
          to="/shop?category=electronics"
          className="group relative md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden bg-gradient-to-br from-[#16171d] via-[#111216] to-[#0a0b0d] border border-neutral-800 hover:border-amber-500/40 p-6 sm:p-8 flex flex-col justify-between min-h-[380px] lg:min-h-[460px] transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-amber-500/5 cursor-pointer"
        >
          {/* Top Info */}
          <div className="z-10 flex items-center justify-between">
            <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              Featured Innovation
            </span>
            <div className="w-9 h-9 rounded-full bg-neutral-900/80 border border-neutral-700/60 flex items-center justify-center text-neutral-300 group-hover:text-amber-400 group-hover:border-amber-400/50 transition-colors">
              <ArrowUpRight size={18} />
            </div>
          </div>

          {/* Background Ambient Glow */}
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/15 transition-colors" />

          {/* Large Floating Product Visual */}
          <div className="my-auto py-4 flex items-center justify-center relative z-10">
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=700"
              alt="High-Fidelity Audio"
              loading="lazy"
              className="max-h-56 sm:max-h-64 object-contain rounded-2xl group-hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
            />
          </div>

          {/* Bottom Title & Details */}
          <div className="z-10">
            <div className="flex items-center gap-2 text-neutral-400 text-xs font-semibold mb-1">
              <Headphones size={14} className="text-amber-400" />
              <span>Acoustics & Flagship Tech</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-amber-300 transition-colors">
              Spatial Sound & Next-Gen Audio
            </h3>
            <p className="text-xs text-neutral-400 mt-1 max-w-md">
              Noise-canceling headphones, lossless TWS earbuds, and intelligent smartwatches up to 60% off.
            </p>
          </div>
        </Link>

        {/* 2. Top Right: Sacred Vedic & Artisanal Brass (Spans 2 cols on lg) */}
        <Link
          to="/shop?category=pooja-samagri"
          className="group relative md:col-span-1 lg:col-span-2 rounded-3xl overflow-hidden bg-gradient-to-br from-[#1c140e] via-[#14100c] to-[#0a0b0d] border border-amber-500/20 hover:border-amber-500/50 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-amber-500/5 cursor-pointer min-h-[220px]"
        >
          <div className="z-10 flex-1">
            <div className="flex items-center gap-1.5 text-amber-400 text-[10px] font-bold uppercase tracking-wider mb-2">
              <Flame size={12} />
              <span>Heritage Ateliers</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-amber-300 transition-colors">
              Sacred Vedic Sanctum
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              100% Pure Desi Ghee, handcrafted brass diyas, and authentic hawan samagri sets.
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
              <span>Explore Spiritual Store</span>
              <ArrowUpRight size={14} />
            </div>
          </div>

          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden bg-neutral-900/60 p-2 border border-neutral-800 shrink-0">
            <img
              src="https://images.unsplash.com/photo-1609743522653-52354461eb27?auto=format&fit=crop&q=80&w=300"
              alt="Sacred Vedic"
              className="w-full h-full object-cover rounded-xl group-hover:scale-108 transition-transform duration-500"
            />
          </div>
        </Link>

        {/* 3. Bottom Mid: Modern Streetwear & Luxury Footwear (1 col on lg) */}
        <Link
          to="/shop?category=fashion"
          className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#16171d] via-[#111216] to-[#0a0b0d] border border-neutral-800 hover:border-amber-500/40 p-5 flex flex-col justify-between transition-all duration-300 shadow-xl min-h-[220px] cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1">
              <Shirt size={12} className="text-amber-400" /> Streetwear
            </span>
            <div className="w-7 h-7 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 group-hover:text-amber-400 transition-colors">
              <ArrowUpRight size={14} />
            </div>
          </div>

          <div className="h-28 my-auto flex items-center justify-center overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80&w=300"
              alt="Fashion Drop"
              className="max-h-full object-contain group-hover:scale-108 transition-transform duration-500"
            />
          </div>

          <div>
            <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
              Designer Footwear & Apparel
            </h4>
            <p className="text-[11px] text-amber-400 font-semibold mt-0.5">
              Min. 40% Off Top Brands
            </p>
          </div>
        </Link>

        {/* 4. Bottom Right: Home Sanctuary under 999 (1 col on lg) */}
        <Link
          to="/shop?maxPrice=999"
          className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#16171d] via-[#111216] to-[#0a0b0d] border border-neutral-800 hover:border-amber-500/40 p-5 flex flex-col justify-between transition-all duration-300 shadow-xl min-h-[220px] cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1">
              <HomeIcon size={12} className="text-amber-400" /> Sanctuary
            </span>
            <div className="w-7 h-7 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 group-hover:text-amber-400 transition-colors">
              <ArrowUpRight size={14} />
            </div>
          </div>

          <div className="h-28 my-auto flex items-center justify-center overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=300"
              alt="Home Sanctuary"
              className="max-h-full object-contain group-hover:scale-108 transition-transform duration-500"
            />
          </div>

          <div>
            <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
              Minimalist Home & Kitchen
            </h4>
            <p className="text-[11px] text-amber-400 font-semibold mt-0.5">
              Curated Essentials Under ₹999
            </p>
          </div>
        </Link>

      </div>
    </div>
  );
};
