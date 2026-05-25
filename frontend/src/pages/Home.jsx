import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Laptop, Shirt, Home as HomeIcon, HeartPulse, Dumbbell, 
  BookOpen, Puzzle, Car, Grid, ChevronRight, Truck, RefreshCcw, ShieldCheck, ShoppingCart, Trash2, Star, Heart
} from 'lucide-react';
import { useCartStore, useWishlistStore } from '../store/useStore';

const categories = [
  { name: 'Electronics', icon: <Laptop size={18} />, slug: 'electronics' },
  { name: 'Fashion', icon: <Shirt size={18} />, slug: 'fashion' },
  { name: 'Home & Kitchen', icon: <HomeIcon size={18} />, slug: 'home-kitchen' },
  { name: 'Beauty & Health', icon: <HeartPulse size={18} />, slug: 'beauty-health' },
  { name: 'Sports & Outdoors', icon: <Dumbbell size={18} />, slug: 'sports-outdoors' },
  { name: 'Books & Stationery', icon: <BookOpen size={18} />, slug: 'books-stationery' },
  { name: 'Toys & Games', icon: <Puzzle size={18} />, slug: 'toys-games' },
  { name: 'Automotive', icon: <Car size={18} />, slug: 'automotive' },
  { name: 'More Categories', icon: <Grid size={18} />, slug: 'all' },
];

const bestSelling = [
  {
    id: 1,
    brand: 'Noise',
    title: 'ColorFit Pulse 3 Smartwatch',
    price: 1999,
    originalPrice: 2699,
    discount: '-25%',
    rating: 4.5,
    reviews: '1.2k',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 2,
    brand: 'boAt',
    title: 'Rockerz 450 Bluetooth Headphones',
    price: 1599,
    originalPrice: 1999,
    discount: '-20%',
    rating: 4.4,
    reviews: '892',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 3,
    brand: 'Nike',
    title: 'Men\'s Air Max Running Shoes',
    price: 3399,
    originalPrice: 3999,
    discount: '-15%',
    rating: 4.7,
    reviews: '1.5k',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 4,
    brand: 'Canon',
    title: 'EOS 200D II DSLR Camera',
    price: 34999,
    originalPrice: 49999,
    discount: '-30%',
    rating: 4.8,
    reviews: '980',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=200&h=200'
  }
];

export const Home = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { cartItems, addToCart, removeFromCart, updateQuantity } = useCartStore();
  const { wishlistItems, addToWishlist } = useWishlistStore();

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.qty), 0);

  const filteredProducts = bestSelling.filter(product => 
    product.title.toLowerCase().includes(query.toLowerCase()) || 
    product.brand.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* LEFT SIDEBAR: Categories */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-orange-500 text-white font-bold py-3 px-4 flex items-center gap-2">
              <Grid size={20} />
              All Categories
            </div>
            <ul className="py-2">
              {categories.map((cat, idx) => (
                <li key={idx}>
                  <Link to={cat.slug === 'all' ? '/categories' : `/shop?category=${cat.slug}`} className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400">{cat.icon}</span>
                      <span className="font-medium">{cat.name}</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* MAIN CONTENT CENTER */}
        <div className="flex-1 flex flex-col gap-8 overflow-hidden">
          
          {/* Hero Banner */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 relative overflow-hidden min-h-[360px] flex flex-col justify-center">
            <div className="relative z-10 max-w-md">
              <span className="text-red-500 font-bold tracking-wider text-sm uppercase mb-2 block">Summer Sale</span>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-2">Trendy Collection</h1>
              <h2 className="text-4xl md:text-5xl font-black text-red-500 mb-4">For Everyone</h2>
              <p className="text-gray-600 mb-8 max-w-sm">Explore top deals on electronics, fashion, home appliances and more.</p>
              <button className="bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-md font-bold transition-colors shadow-lg">
                Shop Now
              </button>
            </div>
            {/* Banner Images */}
            <div className="absolute right-[25%] md:right-[35%] lg:right-[40%] bottom-0 h-full w-1/3 md:w-1/4 bg-[url('/man_pic.png')] bg-cover bg-top z-0 rounded-tl-2xl mask-image-gradient" style={{ WebkitMaskImage: 'linear-gradient(to top, transparent, black 20%)', maskImage: 'linear-gradient(to top, transparent, black 20%)' }}></div>
            <div className="absolute right-0 bottom-0 h-[110%] w-1/2 md:w-[40%] bg-[url('https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800')] bg-cover bg-left z-0 mask-image-gradient"></div>


            {/* Features overlay inside banner */}
            <div className="absolute bottom-6 left-8 bg-white/90 backdrop-blur-sm rounded-lg p-3 flex items-center gap-6 shadow-sm border border-gray-100 z-20">
              <div className="flex items-center gap-2">
                <Truck className="text-orange-500" size={20} />
                <div className="text-xs">
                  <p className="font-bold text-gray-900">Free Shipping</p>
                  <p className="text-gray-500">On orders over ₹499</p>
                </div>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <div className="flex items-center gap-2">
                <RefreshCcw className="text-orange-500" size={20} />
                <div className="text-xs">
                  <p className="font-bold text-gray-900">Easy Returns</p>
                  <p className="text-gray-500">30-day returns</p>
                </div>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-orange-500" size={20} />
                <div className="text-xs">
                  <p className="font-bold text-gray-900">Secure Payment</p>
                  <p className="text-gray-500">100% protected</p>
                </div>
              </div>
            </div>
          </div>

          {/* Shop by Categories Horizontal */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Shop by Categories</h3>
              <button className="text-orange-500 text-sm font-bold border border-orange-200 bg-orange-50 px-4 py-1.5 rounded hover:bg-orange-100 transition-colors">View All</button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
              {categories.slice(0, 8).map((cat, i) => (
                <div key={i} className="flex flex-col items-center gap-3 min-w-[100px] cursor-pointer group">
                  <div className="w-20 h-20 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center text-gray-500 group-hover:border-orange-500 group-hover:bg-orange-50 transition-colors shadow-sm">
                    {React.cloneElement(cat.icon, { size: 32, className: "group-hover:text-orange-500" })}
                  </div>
                  <span className="text-xs font-medium text-gray-700 text-center">{cat.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Best Selling Products */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                {query ? `Search Results for "${query}"` : 'Best Selling Products'} 
                {!query && <span className="text-orange-500">🔥</span>}
              </h3>
              {!query && <button className="text-orange-500 text-sm font-bold border border-orange-200 bg-orange-50 px-4 py-1.5 rounded hover:bg-orange-100 transition-colors">View All</button>}
            </div>
            
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <div key={product.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow group relative">
                    <div className="absolute top-3 left-3 bg-pink-100 text-pink-600 text-[10px] font-bold px-2 py-0.5 rounded z-10">
                      {product.discount}
                    </div>
                    <div className="absolute top-3 right-3 z-10">
                      <button 
                        onClick={() => addToWishlist(product)}
                        className={`h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:text-red-500 transition-colors ${wishlistItems.find(i => i.id === product.id) ? 'text-red-500' : 'text-gray-400'}`}
                      >
                        <Heart size={16} className={wishlistItems.find(i => i.id === product.id) ? 'fill-current text-red-500' : ''} />
                      </button>
                    </div>
                    <div className="h-48 flex items-center justify-center mb-4 overflow-hidden rounded-lg bg-gray-50">
                      <img src={product.image} alt={product.title} className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
                    <h4 className="font-bold text-gray-900 text-sm mb-2 h-10 line-clamp-2">{product.title}</h4>
                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex text-orange-400 text-xs">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} className={i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">({product.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-black text-gray-900">₹{product.price.toLocaleString()}</span>
                        <span className="text-xs text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                      </div>
                      <button onClick={() => addToCart(product)} className="h-8 w-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-colors">
                        <ShoppingCart size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center bg-white border border-gray-100 rounded-xl">
                <p className="text-gray-500 text-lg mb-2">No products found matching "{query}"</p>
                <button onClick={() => window.location.href = '/'} className="text-orange-500 font-bold hover:underline">Clear Search</button>
              </div>
            )}
          </div>
          
          {/* Bottom Features */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 mt-4 flex flex-wrap gap-6 justify-between items-center">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-gray-700" size={24} />
              <div>
                <p className="font-bold text-sm text-gray-900">100% Secure Payment</p>
                <p className="text-xs text-gray-500">We ensure secure transactions</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RefreshCcw className="text-gray-700" size={24} />
              <div>
                <p className="font-bold text-sm text-gray-900">7 Days Replacement</p>
                <p className="text-xs text-gray-500">Easy replacement policy</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <HeartPulse className="text-gray-700" size={24} />
              <div>
                <p className="font-bold text-sm text-gray-900">24/7 Support</p>
                <p className="text-xs text-gray-500">We support online 24/7</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Star className="text-gray-700" size={24} />
              <div>
                <p className="font-bold text-sm text-gray-900">Best Quality</p>
                <p className="text-xs text-gray-500">Best quality products</p>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT SIDEBAR: Cart & Offers */}
        <div className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-6">
          
          {/* My Cart Widget */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 text-lg mb-4">My Cart <span className="text-gray-500 font-normal">({cartItems.length})</span></h3>
            
            <div className="flex flex-col gap-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
              {cartItems.map(item => (
                <div key={item.id} className="flex gap-3">
                  <div className="h-16 w-16 bg-gray-50 rounded-md border border-gray-100 flex-shrink-0 p-1">
                    <img src={item.image} alt={item.title} className="h-full w-full object-contain" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 line-clamp-1">{item.title}</h4>
                      <p className="text-[10px] text-gray-500">{item.brand}</p>
                    </div>
                    <div className="font-black text-sm text-gray-900">₹{item.price.toLocaleString()}</div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
                    <div className="flex items-center gap-2 bg-gray-50 rounded px-1.5 py-0.5 border border-gray-200">
                      <button onClick={() => updateQuantity(item.id, item.qty - 1)} className="text-gray-500 hover:text-orange-500 text-xs">-</button>
                      <span className="text-xs font-medium">{item.qty}</span>
                      <button onClick={() => updateQuantity(item.id, item.qty + 1)} className="text-gray-500 hover:text-orange-500 text-xs">+</button>
                    </div>
                  </div>
                </div>
              ))}
              {cartItems.length === 0 && (
                <div className="text-center text-sm text-gray-500 py-4">Your cart is empty</div>
              )}
            </div>

            <div className="border-t border-gray-100 pt-4 mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-bold text-gray-900">₹{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm mb-4">
                <span className="text-gray-500">Shipping</span>
                <span className="font-bold text-green-500">Free</span>
              </div>
              <div className="flex justify-between text-base font-black">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">₹{cartTotal.toLocaleString()}</span>
              </div>
            </div>

            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded-md transition-colors mb-2">
              Checkout
            </button>
            <button className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold py-2.5 rounded-md transition-colors">
              View Cart
            </button>
          </div>

          {/* Exclusive Offers Widget */}
          <div className="bg-gray-900 rounded-xl shadow-sm p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-orange-400 mb-2">
                <Star size={16} className="fill-current" />
                <h3 className="font-bold text-sm">Exclusive Offers</h3>
              </div>
              <p className="text-xs text-gray-400 mb-6 max-w-[160px]">Join Myzon Prime and get exclusive rewards & offers.</p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-5 py-2 rounded transition-colors">
                Join Now
              </button>
            </div>
            {/* Gift Icon Placeholder */}
            <div className="absolute -right-4 -bottom-4 opacity-80 text-orange-500">
               <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
