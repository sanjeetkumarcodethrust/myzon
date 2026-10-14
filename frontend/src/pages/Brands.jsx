import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star, Sparkles, ArrowRight, ArrowUpRight, Gem } from 'lucide-react';

const brands = [
  {
    name: 'Apple',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    cover: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=800&h=400',
    description: 'Innovative technology, sleek design & industry-defining acoustics.',
    productsCount: '124 Certified Drops'
  },
  {
    name: 'Nike',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg',
    cover: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800&h=400',
    description: 'World-class athletic performance footwear and contemporary streetwear.',
    productsCount: '840 Certified Drops'
  },
  {
    name: 'Samsung',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
    cover: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=800&h=400',
    description: 'Next-generation OLED displays and flagship personal electronics.',
    productsCount: '412 Certified Drops'
  },
  {
    name: 'Sony',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Sony_logo.svg',
    cover: 'https://images.unsplash.com/photo-1572537165377-627a3a04c737?auto=format&fit=crop&q=80&w=800&h=400',
    description: 'Lossless audio fidelity, cinematic imaging, and gaming consoles.',
    productsCount: '210 Certified Drops'
  },
  {
    name: 'Adidas',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg',
    cover: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&q=80&w=800&h=400',
    description: 'Iconic sport heritage and collaborative modern streetwear drops.',
    productsCount: '650 Certified Drops'
  },
  {
    name: 'Canon',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Canon_logo.svg',
    cover: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800&h=400',
    description: 'Precision optics and professional imaging systems for creators.',
    productsCount: '85 Certified Drops'
  }
];

const featuredBrand = {
  name: 'boAt',
  logo: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Boat_Logo.svg',
  tagline: 'Plug Into Nirvana',
  image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800&h=600'
};

export const Brands = () => {
  return (
    <div className="bg-[#0a0b0e] text-neutral-100 min-h-screen py-10 select-none">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
        
        {/* Featured Brand Hero */}
        <div className="bg-gradient-to-r from-[#171821] via-[#121318] to-[#0a0b0d] border border-amber-500/30 rounded-3xl overflow-hidden mb-16 relative flex flex-col md:flex-row items-center shadow-2xl">
          <div className="p-8 sm:p-12 md:p-16 relative z-10 w-full md:w-1/2 flex flex-col justify-center">
            <div className="inline-flex items-center gap-1.5 text-amber-400 text-[10px] font-bold uppercase tracking-widest mb-4">
              <Gem size={13} />
              <span>Spotlight Atelier</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
              boAt • Acoustic Precision
            </h1>
            <p className="text-neutral-400 text-xs sm:text-sm mb-8 max-w-md leading-relaxed">
              Experience lossless spatial sound with the latest noise-canceling headphones, TWS earbuds, and creator tech gear.
            </p>
            <Link 
              to="/shop?brand=boat" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-950 font-bold py-3.5 px-8 rounded-2xl transition-all shadow-md active:scale-98 w-max text-xs"
            >
              <span>Explore boAt Collection</span>
              <ArrowRight size={15} />
            </Link>
          </div>
          <div className="w-full md:w-1/2 h-64 md:h-[450px] relative">
            <img src={featuredBrand.image} alt={featuredBrand.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#171821] via-transparent to-transparent hidden md:block"></div>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex justify-between items-end mb-8 border-b border-neutral-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles size={13} />
              <span>Verified Makers</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Curated Brand Ateliers
            </h2>
          </div>
        </div>

        {/* Grid of Brand Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand, idx) => (
            <div key={idx} className="bg-[#121316] rounded-3xl border border-neutral-800 overflow-hidden hover:border-amber-500/40 hover:shadow-2xl hover:shadow-amber-500/5 transition-all duration-300 group flex flex-col h-full shadow-lg">
              
              <div className="h-44 overflow-hidden relative">
                <img src={brand.cover} alt={`${brand.name} Cover`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-[#121316]/50 to-transparent"></div>
              </div>
              
              <div className="p-6 relative flex-grow flex flex-col">
                <div className="h-14 w-28 bg-white rounded-xl shadow-lg border border-neutral-800 absolute -top-7 left-6 flex items-center justify-center p-2.5">
                  <img src={brand.logo} alt={brand.name} className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all" />
                </div>
                
                <div className="mt-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{brand.name}</h3>
                    <p className="text-xs text-neutral-400 mb-6 leading-relaxed">{brand.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-neutral-800 pt-4 mt-auto">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">{brand.productsCount}</span>
                    <Link 
                      to={`/shop?brand=${brand.name.toLowerCase()}`} 
                      className="text-amber-400 hover:text-amber-300 font-bold text-xs flex items-center gap-1 group-hover:gap-1.5 transition-all"
                    >
                      <span>Explore Drops</span>
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
