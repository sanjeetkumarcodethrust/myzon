import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, ShoppingCart, Heart, ArrowLeft, CheckCircle, ShieldCheck, 
  Truck, RefreshCcw, MapPin, Tag, ChevronRight, Zap, Share2
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

  if (!product) {
    return (
      <div className="max-w-[1600px] mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-black text-gray-900 mb-4">Product Not Found</h2>
        <p className="text-gray-500 mb-6">The product you are looking for does not exist or has been removed.</p>
        <button 
          onClick={() => navigate('/')} 
          className="bg-[#2874f0] text-white font-bold px-6 py-2.5 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Return to Home
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
    <div className="bg-[#f1f3f6] min-h-screen py-6">
      <div className="max-w-[1600px] mx-auto px-4">
        
        {/* Amazon-style Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-4 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-[#2874f0]">Home</Link>
          <ChevronRight size={12} />
          <Link to={`/shop?category=${product.category}`} className="hover:text-[#2874f0] capitalize">
            {product.category?.replace('-', ' ')}
          </Link>
          <ChevronRight size={12} />
          <span className="font-semibold text-gray-700">{product.brand}</span>
          <ChevronRight size={12} />
          <span className="text-gray-400 truncate max-w-xs">{product.title}</span>
        </nav>

        {/* Main Product Container */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 lg:p-8 flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Left Column: Image Gallery */}
          <div className="w-full lg:w-5/12 flex flex-col items-center">
            <div className="w-full h-80 sm:h-96 md:h-[420px] bg-gray-50 rounded-2xl p-6 flex items-center justify-center relative border border-gray-100 group overflow-hidden">
              {/* Discount Tag */}
              <div className="absolute top-4 left-4 bg-[#cc0c39] text-white text-xs font-black px-2.5 py-1 rounded shadow-xs">
                {discountPct}% OFF
              </div>

              {/* Wishlist & Share buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                <button
                  onClick={() => addToWishlist(product)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all ${
                    inWishlist ? 'bg-rose-50 text-rose-500' : 'bg-white text-gray-500 hover:text-rose-500'
                  }`}
                  title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart size={18} className={inWishlist ? 'fill-current text-rose-500' : ''} />
                </button>
                <button
                  onClick={handleShare}
                  className="w-9 h-9 rounded-full bg-white text-gray-500 hover:text-[#2874f0] flex items-center justify-center shadow-md transition-all"
                  title="Share product"
                >
                  <Share2 size={16} />
                </button>
              </div>

              <img
                src={product.image}
                alt={product.title}
                className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-108 transition-transform duration-300"
              />
            </div>

            {/* Quick trust badges under image */}
            <div className="grid grid-cols-3 gap-2 w-full mt-4 text-center">
              <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-100">
                <RefreshCcw size={18} className="mx-auto text-emerald-600 mb-1" />
                <p className="text-[10px] font-bold text-gray-700">7 Days Return</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-100">
                <Truck size={18} className="mx-auto text-[#2874f0] mb-1" />
                <p className="text-[10px] font-bold text-gray-700">Free Delivery</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-100">
                <ShieldCheck size={18} className="mx-auto text-amber-500 mb-1" />
                <p className="text-[10px] font-bold text-gray-700">100% Genuine</p>
              </div>
            </div>
          </div>

          {/* Middle Column: Product Details & Offers */}
          <div className="w-full lg:w-4/12 flex flex-col">
            <Link 
              to={`/shop?q=${encodeURIComponent(product.brand)}`}
              className="text-xs font-bold text-[#2874f0] hover:underline uppercase tracking-wider mb-1"
            >
              Visit the {product.brand} Store
            </Link>

            <h1 className="text-xl sm:text-2xl font-black text-gray-900 leading-snug mb-3">
              {product.title}
            </h1>

            {/* Ratings & Reviews */}
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100 mb-4">
              <div className="flex items-center gap-1 bg-[#388e3c] text-white text-xs font-black px-2 py-0.5 rounded">
                <span>{product.rating || '4.3'}</span>
                <Star size={12} className="fill-current" />
              </div>
              <span className="text-xs text-gray-500 font-medium">
                {product.reviews || '1.2k'} ratings & customer reviews
              </span>
              <span className="text-xs text-[#2874f0] font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                ✦ Assured
              </span>
            </div>

            {/* Price section */}
            <div className="bg-gray-50/70 rounded-xl p-4 border border-gray-100 mb-5">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-3xl font-black text-gray-900">
                  ₹{product.price.toLocaleString()}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  ₹{originalPrice.toLocaleString()}
                </span>
                <span className="text-sm font-black text-emerald-600">
                  {discountPct}% off
                </span>
              </div>
              <p className="text-[11px] text-gray-500">
                Inclusive of all taxes | No Cost EMI available starting ₹{Math.round(product.price / 6)}/month
              </p>
            </div>

            {/* Bank Offers Accordion */}
            <div className="mb-6 space-y-2">
              <h4 className="text-xs font-black uppercase text-gray-800 tracking-wider flex items-center gap-1.5">
                <Tag size={14} className="text-[#2874f0]" /> Available Bank & Partner Offers
              </h4>
              <div className="border border-gray-200 rounded-lg p-3 text-xs space-y-2">
                <p className="text-gray-700">
                  💳 <strong>Bank Offer:</strong> 10% Instant Discount up to ₹1,500 on SBI & HDFC Credit Cards.
                </p>
                <p className="text-gray-700">
                  ⚡ <strong>UPI Offer:</strong> Flat ₹100 Cashback on UPI payments through Myzon Pay.
                </p>
                <p className="text-gray-700">
                  🎁 <strong>Special Offer:</strong> Get extra 5% combo discount when purchased with essentials.
                </p>
              </div>
            </div>

            {/* Pincode Delivery Checker */}
            <div className="mb-6">
              <h4 className="text-xs font-black uppercase text-gray-800 tracking-wider mb-2 flex items-center gap-1">
                <MapPin size={14} className="text-[#febd69]" /> Delivery to Pincode
              </h4>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincodeCheck}
                  onChange={(e) => setPincodeCheck(e.target.value)}
                  placeholder="Enter Pincode"
                  className="border border-gray-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#2874f0] w-36"
                />
                <button
                  type="button"
                  onClick={() => setPincodeChecked(true)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold px-4 py-1.5 rounded-lg text-xs"
                >
                  Check
                </button>
              </div>
              {pincodeChecked && (
                <p className="text-xs text-emerald-700 font-medium mt-2 flex items-center gap-1">
                  <CheckCircle size={14} className="text-emerald-600" />
                  FREE Delivery by <strong>Tomorrow, 2 PM</strong> to {location.city} {pincodeCheck}
                </p>
              )}
            </div>
          </div>

          {/* Right Column: Amazon Buy Box */}
          <div className="w-full lg:w-3/12 flex flex-col">
            <div className="border border-gray-300 rounded-2xl p-5 bg-white shadow-sm sticky top-20">
              <div className="text-2xl font-black text-gray-900 mb-2">
                ₹{product.price.toLocaleString()}
              </div>

              <p className="text-xs text-gray-600 mb-4">
                <span className="text-emerald-700 font-bold">FREE delivery</span> Tomorrow. Order within 4 hrs.
              </p>

              <div className="text-xs text-gray-600 mb-4 flex items-center gap-1">
                <MapPin size={14} className="text-gray-500 shrink-0" />
                <span className="truncate">
                  Deliver to {location.city} - {location.pincode}
                </span>
              </div>

              <div className="mb-4">
                <span className="text-sm font-bold text-emerald-600 block mb-1">
                  In Stock.
                </span>
                <span className="text-[11px] text-gray-500">
                  Sold by <strong>Appario Retail India</strong> and Fulfilled by <strong>Myzon Assured</strong>.
                </span>
              </div>

              {/* Quantity selector */}
              <div className="flex items-center gap-3 mb-5">
                <label className="text-xs font-bold text-gray-700">Quantity:</label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border border-gray-300 rounded-lg px-3 py-1.5 text-xs bg-gray-50 focus:outline-none"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              {/* Add to Cart button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-gray-950 font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 mb-2.5 shadow-xs transition-colors cursor-pointer"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>

              {/* Buy Now button */}
              <button
                onClick={handleBuyNow}
                className="w-full bg-[#ffa41c] hover:bg-[#fa8900] text-gray-950 font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 mb-4 shadow-xs transition-colors cursor-pointer"
              >
                <Zap size={18} />
                Buy Now
              </button>

              <div className="border-t border-gray-100 pt-3 text-[11px] text-gray-500 space-y-1">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-gray-400" />
                  <span>Secure transaction</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RefreshCcw size={14} className="text-gray-400" />
                  <span>7 Days Replacement Policy</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Similar / Recommended Products */}
        <div className="mt-10 bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs">
          <h3 className="text-xl font-black text-gray-900 mb-5">
            Customers who viewed this item also viewed
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {allProducts
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 6)
              .map(p => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className="group flex flex-col p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all"
                >
                  <div className="h-36 bg-gray-50 rounded-lg p-2 mb-2 flex items-center justify-center overflow-hidden">
                    <img src={p.image} alt={p.title} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
                  </div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase truncate">{p.brand}</p>
                  <h4 className="text-xs font-semibold text-gray-800 line-clamp-2 h-8 leading-snug group-hover:text-[#2874f0]">
                    {p.title}
                  </h4>
                  <div className="mt-auto pt-2 flex items-baseline gap-1.5">
                    <span className="text-sm font-black text-gray-900">₹{p.price?.toLocaleString()}</span>
                  </div>
                </Link>
              ))}
          </div>
        </div>

      </div>
    </div>
  );
};
