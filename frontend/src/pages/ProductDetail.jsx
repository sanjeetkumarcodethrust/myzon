import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, ShoppingBag, Heart, ArrowLeft, CheckCircle, ShieldCheck, 
  Truck, RefreshCcw, MapPin, Tag, ChevronRight, Zap, Share2, 
  ArrowUpRight, ChevronDown, ChevronUp, Gem
} from 'lucide-react';
import { useCartStore, useWishlistStore, useUIStore } from '../store/useStore';
import productsData from '../data/products.json';
import { dealProducts } from './Deals';
import { newArrivals } from './NewArrivals';

const allProducts = [...productsData, ...dealProducts, ...newArrivals];

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = allProducts.find(p => p.id === parseInt(id));

  const { addToCart } = useCartStore();
  const { addToWishlist, wishlistItems } = useWishlistStore();
  const { location, openPincodeModal, showToast } = useUIStore();

  const [quantity, setQuantity] = useState(1);
  const [pincodeCheck, setPincodeCheck] = useState(location.pincode || '110001');
  const [pincodeChecked, setPincodeChecked] = useState(true);
  const [activeAccordion, setActiveAccordion] = useState('specs');

  if (!product) {
    return (
      <div className="bg-[#0a0b0e] min-h-screen text-neutral-100 max-w-[1600px] mx-auto px-4 py-20 text-center select-none">
        <h2 className="text-3xl font-black text-white mb-4">Drop Not Found</h2>
        <p className="text-neutral-400 mb-6">The requested product does not exist in our catalog or has concluded its allocation.</p>
        <button 
          onClick={() => navigate('/')} 
          className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-950 font-bold px-7 py-3 rounded-xl transition-all shadow-md cursor-pointer"
        >
          Return to Studio
        </button>
      </div>
    );
  }

  const inWishlist = wishlistItems.some(i => i.id === product.id);

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    navigate('/cart', { state: { openCheckout: true } });
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard! 📋');
    }
  };

  const originalPrice = product.originalPrice || Math.round(product.price * 1.35);
  const savings = originalPrice - product.price;
  const discountPct = Math.round((savings / originalPrice) * 100);

  return (
    <div className="bg-[#0a0b0e] text-neutral-100 min-h-screen py-8 select-none">
      <div className="max-w-[1500px] mx-auto px-4 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-neutral-400 mb-6 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-amber-400 transition-colors">Discover</Link>
          <ChevronRight size={12} className="text-neutral-600" />
          <Link to={`/shop?category=${product.category}`} className="hover:text-amber-400 transition-colors capitalize">
            {product.category?.replace('-', ' ')}
          </Link>
          <ChevronRight size={12} className="text-neutral-600" />
          <span className="font-semibold text-neutral-300">{product.brand}</span>
          <ChevronRight size={12} className="text-neutral-600" />
          <span className="text-neutral-500 truncate max-w-xs">{product.title}</span>
        </nav>

        {/* 2-Column Flagship Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          
          {/* Left Column (Sticky Showcase & Trust) - 6 cols */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="sticky top-24">
              
              {/* Product Visual Container */}
              <div className="w-full h-80 sm:h-96 md:h-[480px] bg-[#121316] rounded-3xl p-8 flex items-center justify-center relative border border-neutral-800 shadow-2xl group overflow-hidden">
                
                {/* Floating Discount Badge */}
                <div className="absolute top-5 left-5 bg-neutral-900 text-amber-400 border border-amber-500/30 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {discountPct}% OFF
                </div>

                {/* Wishlist & Share */}
                <div className="absolute top-5 right-5 flex flex-col gap-2 z-10">
                  <button
                    onClick={() => addToWishlist(product)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all cursor-pointer border ${
                      inWishlist 
                        ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' 
                        : 'bg-neutral-900/90 text-neutral-400 hover:text-white border-neutral-800'
                    }`}
                    title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                    aria-label="Wishlist toggle"
                  >
                    <Heart size={18} className={inWishlist ? 'fill-current text-rose-500' : ''} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="w-10 h-10 rounded-full bg-neutral-900/90 text-neutral-400 hover:text-amber-400 flex items-center justify-center shadow-lg transition-all cursor-pointer border border-neutral-800"
                    title="Share drop"
                    aria-label="Share drop"
                  >
                    <Share2 size={16} />
                  </button>
                </div>

                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-108 transition-transform duration-500 drop-shadow-2xl"
                />
              </div>

              {/* 3 Pillars of Trust */}
              <div className="grid grid-cols-3 gap-3 w-full mt-4 text-center">
                <div className="bg-[#121316] rounded-2xl p-3.5 border border-neutral-800/80">
                  <ShieldCheck size={20} className="mx-auto text-amber-400 mb-1" />
                  <p className="text-[11px] font-bold text-white">100% Authentic</p>
                  <p className="text-[10px] text-neutral-500">Certified Maker</p>
                </div>
                <div className="bg-[#121316] rounded-2xl p-3.5 border border-neutral-800/80">
                  <Truck size={20} className="mx-auto text-amber-400 mb-1" />
                  <p className="text-[11px] font-bold text-white">Express Courier</p>
                  <p className="text-[10px] text-neutral-500">Under 24h Dispatch</p>
                </div>
                <div className="bg-[#121316] rounded-2xl p-3.5 border border-neutral-800/80">
                  <RefreshCcw size={20} className="mx-auto text-amber-400 mb-1" />
                  <p className="text-[11px] font-bold text-white">7-Day Exchange</p>
                  <p className="text-[10px] text-neutral-500">Doorstep Pickup</p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column (Editorial Product Panel & Buy Actions) - 6 cols */}
          <div className="lg:col-span-6 flex flex-col justify-start">
            
            {/* Atelier / Brand Header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                {product.brand}
              </span>
              <span className="text-neutral-700">•</span>
              <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold">
                Studio Allocation
              </span>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight mb-4 tracking-tight">
              {product.title}
            </h1>

            {/* Rating pill & stock */}
            <div className="flex items-center gap-3 pb-5 border-b border-neutral-800 mb-6">
              <div className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 text-amber-400 text-xs font-black px-3 py-1 rounded-full">
                <Star size={13} className="fill-amber-400 text-amber-400" />
                <span>{product.rating || '4.8'}</span>
              </div>
              <span className="text-xs text-neutral-400">
                {product.reviews || '1.2k'} verified collector reviews
              </span>
              <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                In Stock & Ready to Dispatch
              </span>
            </div>

            {/* Price Box */}
            <div className="bg-[#121316] rounded-2xl p-5 border border-neutral-800 mb-6">
              <div className="flex items-baseline gap-3 mb-1.5">
                <span className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight">
                  ₹{product.price.toLocaleString()}
                </span>
                <span className="text-base text-neutral-500 line-through">
                  ₹{originalPrice.toLocaleString()}
                </span>
                <span className="text-xs font-black text-emerald-400 uppercase">
                  Save ₹{savings.toLocaleString()} ({discountPct}% OFF)
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Inclusive of all taxes • Complimentary express courier available on this drop
              </p>
            </div>

            {/* Delivery Pincode Estimator */}
            <div className="mb-6 bg-neutral-900/60 rounded-2xl p-4 border border-neutral-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-neutral-300 flex items-center gap-1.5">
                  <MapPin size={14} className="text-amber-400" /> Dispatch Destination
                </span>
                <span className="text-[11px] text-amber-400 font-semibold cursor-pointer" onClick={openPincodeModal}>
                  Change City
                </span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincodeCheck}
                  onChange={(e) => setPincodeCheck(e.target.value)}
                  placeholder="Enter 6-digit Pincode"
                  className="bg-[#121316] text-white border border-neutral-700 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-amber-400 w-44"
                />
                <button
                  type="button"
                  onClick={() => setPincodeChecked(true)}
                  className="bg-neutral-800 hover:bg-neutral-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Verify
                </button>
              </div>
              {pincodeChecked && (
                <p className="text-xs text-emerald-400 font-medium mt-2.5 flex items-center gap-1.5">
                  <CheckCircle size={14} />
                  Express Courier available for <strong>{location.city} ({pincodeCheck})</strong>: Arrives within 24-48 Hours.
                </p>
              )}
            </div>

            {/* Quantity Selector + High-Impact Dual CTAs */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-neutral-400">Quantity:</span>
                <div className="flex items-center border border-neutral-800 rounded-xl bg-[#121316] p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-neutral-300 hover:text-white rounded-lg hover:bg-neutral-800 cursor-pointer text-sm font-bold"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-xs font-bold text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-neutral-300 hover:text-white rounded-lg hover:bg-neutral-800 cursor-pointer text-sm font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-950 font-bold py-4 px-6 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20 active:scale-98 cursor-pointer"
                >
                  <ShoppingBag size={17} />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full bg-[#121316] hover:bg-neutral-900 text-amber-400 font-bold py-4 px-6 rounded-2xl text-xs sm:text-sm border border-amber-500/40 hover:border-amber-400 flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer shadow-md"
                >
                  <Zap size={16} />
                  <span>Instant Checkout</span>
                </button>
              </div>
            </div>

            {/* Flagship Expandable Accordions */}
            <div className="border border-neutral-800 rounded-2xl divide-y divide-neutral-800 overflow-hidden bg-[#121316]/60">
              
              {/* Accordion 1: Specs */}
              <div>
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'specs' ? '' : 'specs')}
                  className="w-full p-4 flex items-center justify-between text-xs font-bold text-white hover:text-amber-400 transition-colors text-left"
                >
                  <span className="flex items-center gap-2">
                    <Gem size={14} className="text-amber-400" />
                    <span>Atelier Specifications & Craft</span>
                  </span>
                  {activeAccordion === 'specs' ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </button>
                {activeAccordion === 'specs' && (
                  <div className="p-4 pt-0 text-xs text-neutral-400 leading-relaxed space-y-1.5 border-t border-neutral-800/60">
                    <p>• <strong>Maker:</strong> {product.brand} Authorized Atelier</p>
                    <p>• <strong>Category:</strong> {product.category?.replace('-', ' ')}</p>
                    <p>• <strong>Certification:</strong> 100% Quality Inspected & Serial Verified</p>
                    <p>• <strong>Box Contents:</strong> Product, Authenticity Certificate, User Manual, Studio Warranty Card</p>
                  </div>
                )}
              </div>

              {/* Accordion 2: Shipping */}
              <div>
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'shipping' ? '' : 'shipping')}
                  className="w-full p-4 flex items-center justify-between text-xs font-bold text-white hover:text-amber-400 transition-colors text-left"
                >
                  <span className="flex items-center gap-2">
                    <Truck size={14} className="text-amber-400" />
                    <span>White-Glove Shipping & 7-Day Exchange</span>
                  </span>
                  {activeAccordion === 'shipping' ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </button>
                {activeAccordion === 'shipping' && (
                  <div className="p-4 pt-0 text-xs text-neutral-400 leading-relaxed space-y-1 border-t border-neutral-800/60">
                    <p>• All orders are dispatched via tracked express air couriers.</p>
                    <p>• Enjoy hassle-free 7-day doorstep replacement or store credit if any defect is encountered.</p>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
