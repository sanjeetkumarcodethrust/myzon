import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, ArrowRight, ShieldCheck, Zap, Star, ShoppingBag, 
  ChevronLeft, ChevronRight, CheckCircle2 
} from 'lucide-react';
import { useCartStore } from '../store/useStore';
import productsData from '../data/products.json';

const FEATURED_DROPS = [
  {
    id: 1,
    tag: 'Drop #01 • Flagship Acoustics',
    title: 'Engineered for Pure Distinction.',
    description: 'Lossless acoustics, active noise cancellation, and aerospace-grade comfort designed for creators.',
    highlight: 'boAt Rockerz 550 Over-Ear',
    price: 1799,
    originalPrice: 4999,
    discount: '64% OFF',
    rating: 4.8,
    reviews: '2.4k',
    link: '/shop?category=electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    productId: 1
  },
  {
    id: 2,
    tag: 'Drop #02 • Heritage Artisans',
    title: 'Sacred Rituals, Handcrafted Grace.',
    description: '100% pure Bilona Cow Ghee, hand-hammered brass diyas, and organic herb hawan samagri.',
    highlight: 'Pure Brass Akhand Diya & Samagri',
    price: 899,
    originalPrice: 1999,
    discount: '55% OFF',
    rating: 4.9,
    reviews: '1.8k',
    link: '/shop?category=pooja-samagri',
    image: 'https://images.unsplash.com/photo-1609743522653-52354461eb27?auto=format&fit=crop&q=80&w=800',
    productId: 3
  },
  {
    id: 3,
    tag: 'Drop #03 • Streetwear Atelier',
    title: 'Modern Velocity & Style.',
    description: 'Next-generation cushioning, breathable mesh, and bold silhouettes from world-class performance labels.',
    highlight: 'Nike Air Max Elite Edition',
    price: 4999,
    originalPrice: 9999,
    discount: '50% OFF',
    rating: 4.7,
    reviews: '950',
    link: '/shop?category=fashion',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
    productId: 4
  }
];

export const HeroCarousel = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { addToCart } = useCartStore();

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % FEATURED_DROPS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const drop = FEATURED_DROPS[activeIdx];

  const handleQuickAdd = () => {
    const product = productsData.find(p => p.id === drop.productId) || {
      id: drop.productId,
      title: drop.highlight,
      price: drop.price,
      originalPrice: drop.originalPrice,
      image: drop.image,
      brand: 'Myzon Atelier',
      category: 'electronics'
    };
    addToCart(product);
  };

  return (
    <section 
      className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#14151b] via-[#0f1014] to-[#0a0b0d] border border-neutral-800 shadow-2xl mb-12 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Ambient Radial Glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-[1500px] mx-auto p-6 sm:p-10 lg:p-14 flex flex-col lg:flex-row items-center justify-between gap-10">
        
        {/* Left Column: Bold Editorial Typography & CTAs */}
        <div className="w-full lg:w-7/12 flex flex-col items-start">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wide mb-6 shadow-sm">
            <Sparkles size={13} className="text-amber-400" />
            <span className="uppercase">{drop.tag}</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-5">
            {drop.title}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-neutral-400 font-normal max-w-xl mb-8 leading-relaxed">
            {drop.description}
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 mb-10 w-full sm:w-auto">
            <Link
              to={drop.link}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-950 font-bold px-7 py-3.5 rounded-2xl text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 active:scale-98 cursor-pointer"
            >
              <span>Explore Collection</span>
              <ArrowRight size={16} />
            </Link>

            <Link
              to="/deals"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 hover:text-white font-semibold px-7 py-3.5 rounded-2xl text-xs sm:text-sm border border-neutral-700 hover:border-amber-500/40 transition-all cursor-pointer"
            >
              <Zap size={15} className="text-amber-400" />
              <span>Enter The Vault</span>
            </Link>
          </div>

          {/* Social Proof / Trust Highlights */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-800/80 w-full max-w-lg text-neutral-400 text-[11px] sm:text-xs">
            <div className="flex items-center gap-2">
              <Star size={14} className="text-amber-400 fill-amber-400 shrink-0" />
              <span><strong>4.9★</strong> Global Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-amber-400 shrink-0" />
              <span><strong>100%</strong> Authentic</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-amber-400 shrink-0" />
              <span><strong>24h</strong> Dispatch</span>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Glassmorphic Product Spotlight Card */}
        <div className="w-full lg:w-5/12 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md rounded-3xl bg-neutral-900/70 backdrop-blur-2xl border border-neutral-800/90 p-6 sm:p-7 shadow-2xl hover:border-amber-500/40 transition-all group">
            
            {/* Top pill inside card */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                Spotlight Item
              </span>
              <span className="text-[11px] font-bold text-neutral-400 flex items-center gap-1">
                <Star size={12} className="text-amber-400 fill-amber-400" />
                {drop.rating} ({drop.reviews})
              </span>
            </div>

            {/* Product Image Stage */}
            <Link 
              to={`/product/${drop.productId}`}
              className="h-56 sm:h-64 rounded-2xl bg-gradient-to-b from-neutral-800/30 to-neutral-900/60 p-4 flex items-center justify-center overflow-hidden mb-5 border border-neutral-800/50 relative block cursor-pointer"
            >
              <img
                src={drop.image}
                alt={drop.highlight}
                className="max-h-full max-w-full object-contain rounded-xl group-hover:scale-108 transition-transform duration-500 drop-shadow-2xl"
              />
              <span className="absolute bottom-3 left-3 bg-[#0a0b0d]/90 text-amber-400 border border-amber-500/30 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                {drop.discount}
              </span>
            </Link>

            {/* Product Meta */}
            <div className="mb-5">
              <Link to={`/product/${drop.productId}`} className="block">
                <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors line-clamp-1 cursor-pointer">
                  {drop.highlight}
                </h3>
              </Link>
              <div className="flex items-baseline gap-2.5 mt-1.5">
                <span className="text-2xl font-black text-amber-400">
                  ₹{drop.price.toLocaleString()}
                </span>
                <span className="text-xs text-neutral-500 line-through">
                  ₹{drop.originalPrice.toLocaleString()}
                </span>
                <span className="text-xs text-emerald-400 font-bold">
                  Save ₹{(drop.originalPrice - drop.price).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Quick 1-Click Action */}
            <button
              onClick={handleQuickAdd}
              className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-950 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
            >
              <ShoppingBag size={15} />
              <span>Quick Add to Bag</span>
            </button>

          </div>
        </div>

      </div>

      {/* Slide Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {FEATURED_DROPS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${
              i === activeIdx 
                ? 'w-8 bg-amber-400' 
                : 'w-2 bg-neutral-700 hover:bg-neutral-500'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
