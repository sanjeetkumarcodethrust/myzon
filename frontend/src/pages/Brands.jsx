import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star } from 'lucide-react';

const brands = [
  {
    name: 'Apple',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    cover: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=800&h=400',
    description: 'Innovative technology, sleek design.',
    productsCount: '124 Products'
  },
  {
    name: 'Nike',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg',
    cover: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800&h=400',
    description: 'Just Do It. Premium athletic footwear & apparel.',
    productsCount: '840 Products'
  },
  {
    name: 'Samsung',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
    cover: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=800&h=400',
    description: 'Leading global electronics manufacturer.',
    productsCount: '412 Products'
  },
  {
    name: 'Sony',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Sony_logo.svg',
    cover: 'https://images.unsplash.com/photo-1572537165377-627a3a04c737?auto=format&fit=crop&q=80&w=800&h=400',
    description: 'Entertainment and electronics.',
    productsCount: '210 Products'
  },
  {
    name: 'Adidas',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg',
    cover: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&q=80&w=800&h=400',
    description: 'Impossible is Nothing.',
    productsCount: '650 Products'
  },
  {
    name: 'Canon',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Canon_logo.svg',
    cover: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800&h=400',
    description: 'Capture your moments perfectly.',
    productsCount: '85 Products'
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
    <div className="max-w-[1600px] mx-auto px-4 py-8">
      {/* Featured Brand Hero */}
      <div className="bg-black rounded-3xl overflow-hidden mb-12 relative flex flex-col md:flex-row items-center">
        <div className="p-10 md:p-16 relative z-10 w-full md:w-1/2 flex flex-col justify-center">
          <div className="bg-white p-4 rounded-xl inline-block mb-6 w-32 shadow-lg">
            <h2 className="text-black font-black text-2xl text-center">boAt</h2>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">Plug Into<br/><span className="text-red-500">Nirvana</span></h1>
          <p className="text-gray-400 text-lg mb-8 max-w-md">Experience immersive audio with the latest true wireless earbuds and headphones from India's #1 Audio Brand.</p>
          <Link to={`/shop?brand=boat`} className="bg-red-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-600 transition-colors w-max text-lg">
            Shop boAt Collection
          </Link>
        </div>
        <div className="w-full md:w-1/2 h-64 md:h-[500px]">
          <img src={featuredBrand.image} alt={featuredBrand.name} className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent hidden md:block w-1/2"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent md:hidden"></div>
        </div>
      </div>

      <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 mb-2">Top Brands</h2>
          <p className="text-gray-500">Discover quality products from the world's most trusted brands.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((brand, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
            <div className="h-40 overflow-hidden relative">
              <img src={brand.cover} alt={`${brand.name} Cover`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
            </div>
            
            <div className="p-6 relative flex-grow flex flex-col">
              <div className="h-16 w-32 bg-white rounded-xl shadow-lg border border-gray-100 absolute -top-8 left-6 flex items-center justify-center p-3">
                <img src={brand.logo} alt={brand.name} className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all" />
              </div>
              
              <div className="mt-10">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{brand.name}</h3>
                <p className="text-sm text-gray-500 mb-4 flex-grow">{brand.description}</p>
                
                <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-auto">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{brand.productsCount}</span>
                  <Link to={`/shop?brand=${brand.name.toLowerCase()}`} className="text-orange-500 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    Visit Store <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
