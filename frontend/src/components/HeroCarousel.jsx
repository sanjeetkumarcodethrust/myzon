import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, Flame, ShieldCheck, ArrowRight } from 'lucide-react';

const BANNERS = [
  {
    id: 1,
    title: 'The Great Indian Festival',
    subtitle: 'MEGA ELECTRONICS & GADGET SALE',
    discount: 'UP TO 80% OFF',
    tagline: '10% Instant Discount on HDFC & SBI Bank Cards | No Cost EMI',
    link: '/shop?category=electronics',
    buttonText: 'Shop Tech Deals',
    bgGradient: 'from-[#0f172a] via-[#1e293b] to-[#334155]',
    accentColor: '#fbbf24',
    badge: 'Live Mega Sale',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 2,
    title: 'Festive Pooja Samagri Special',
    subtitle: 'PURE DESI GHEE, BRASS DIYAS & HAWAN KITS',
    discount: 'FLAT 50% OFF',
    tagline: 'Authentic Spiritual Essentials | Guaranteed Same-Day Express Delivery',
    link: '/shop?category=pooja-samagri',
    buttonText: 'Explore Pooja Store',
    bgGradient: 'from-[#451a03] via-[#78350f] to-[#b45309]',
    accentColor: '#fde047',
    badge: 'Shubh Shuruwat',
    image: 'https://images.unsplash.com/photo-1609743522653-52354461eb27?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 3,
    title: 'Wardrobe Refresh Super Sale',
    subtitle: 'TOP FASHION BRANDS: NIKE, PUMA, LEVI’S',
    discount: 'MIN 60% OFF',
    tagline: 'Sneakers, Ethnic Wear, Jackets & Premium Watches Starting ₹499',
    link: '/shop?category=fashion',
    buttonText: 'Shop Fashion',
    bgGradient: 'from-[#831843] via-[#9d174d] to-[#be185d]',
    accentColor: '#fbcfe8',
    badge: 'Trending Styles',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 4,
    title: 'Home & Kitchen Makeover',
    subtitle: 'SMART APPLIANCES, COOKWARE & DECOR',
    discount: 'STARTING AT ₹299',
    tagline: 'Upgrade your living space with Philips, Prestige & Premium Linens',
    link: '/shop?category=home-kitchen',
    buttonText: 'Revamp Home',
    bgGradient: 'from-[#064e3b] via-[#047857] to-[#059669]',
    accentColor: '#6ee7b7',
    badge: 'Home Essentials',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1000'
  }
];

export const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % BANNERS.length);
  };

  const banner = BANNERS[current];

  return (
    <div 
      className="relative rounded-2xl overflow-hidden shadow-xl mb-6 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Banner Slide */}
      <div className={`w-full min-h-[340px] md:min-h-[420px] bg-gradient-to-r ${banner.bgGradient} text-white flex items-center relative transition-all duration-700`}>
        {/* Background Image Overlay */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-full md:w-3/5 bg-cover bg-center opacity-35 md:opacity-50 mix-blend-overlay"
          style={{ backgroundImage: `url(${banner.image})` }}
        />
        
        {/* Content Box */}
        <div className="relative z-10 max-w-2xl px-6 sm:px-12 py-10 flex flex-col items-start">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3 border border-white/20">
            <Sparkles size={13} className="text-amber-400" />
            <span>{banner.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none mb-2 text-white">
            {banner.title}
          </h2>

          <p className="text-xs sm:text-sm font-bold tracking-widest uppercase mb-3 opacity-90" style={{ color: banner.accentColor }}>
            {banner.subtitle}
          </p>

          <div className="text-2xl sm:text-4xl font-black mb-3 text-amber-400 drop-shadow-sm">
            {banner.discount}
          </div>

          <p className="text-xs sm:text-sm text-gray-200 mb-6 max-w-lg leading-relaxed">
            {banner.tagline}
          </p>

          <Link
            to={banner.link}
            className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-950 font-black px-7 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-sm transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>{banner.buttonText}</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Right Product Image on Desktop */}
        <div className="hidden lg:block absolute right-12 bottom-6 z-10 max-w-md pointer-events-none animate-fadeIn">
          <div className="w-80 h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 transform rotate-2 hover:rotate-0 transition-transform duration-500 bg-white/10 backdrop-blur-xs">
            <img 
              src={banner.image} 
              alt={banner.title}
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
      </div>

      {/* Prev / Next Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs transition-colors z-20 cursor-pointer"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs transition-colors z-20 cursor-pointer"
        aria-label="Next Slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicator Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {BANNERS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2.5 rounded-full transition-all cursor-pointer ${
              current === idx ? 'w-8 bg-amber-400' : 'w-2.5 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
