import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingCart, Heart, ShieldCheck, MapPin, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { useCartStore, useWishlistStore, useUIStore } from '../store/useStore';

export const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCartStore();
  const { addToWishlist, wishlistItems } = useWishlistStore();
  const { location, openPincodeModal, showToast } = useUIStore();
  
  const totalItemsCount = cartItems.reduce((acc, item) => acc + (item.qty || 1), 0);
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.qty), 0);
  const totalMrp = cartItems.reduce((total, item) => {
    const orig = item.originalPrice || Math.round(item.price * 1.35);
    return total + (orig * item.qty);
  }, 0);
  const totalSavings = totalMrp - cartTotal;

  const handlePlaceOrder = () => {
    showToast('🎉 Order placed successfully! Tracking details sent.');
    clearCart();
  };

  return (
    <div className="bg-[#f1f3f6] min-h-screen py-8">
      <div className="max-w-[1500px] mx-auto px-4">
        
        {/* Deliver to address bar (Flipkart style) */}
        {cartItems.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-4 mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <MapPin size={20} className="text-[#2874f0]" />
              <div className="text-xs">
                <span className="text-gray-500">Deliver to: </span>
                <span className="font-bold text-gray-900">{location.city} - {location.pincode}</span>
              </div>
            </div>
            <button
              onClick={openPincodeModal}
              className="text-[#2874f0] font-bold text-xs border border-blue-200 rounded-lg px-4 py-1.5 hover:bg-blue-50 transition-colors"
            >
              Change Pincode
            </button>
          </div>
        )}

        {cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Left Items Column */}
            <div className="flex-1 space-y-3">
              <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <h1 className="text-lg font-black text-gray-900 flex items-center gap-2">
                    <span>My Cart</span>
                    <span className="text-xs bg-gray-100 text-gray-600 font-bold px-2 py-0.5 rounded-full">
                      {totalItemsCount} items
                    </span>
                  </h1>
                </div>

                <div className="divide-y divide-gray-100">
                  {cartItems.map((item) => {
                    const orig = item.originalPrice || Math.round(item.price * 1.35);
                    const isWishlisted = wishlistItems.some(i => i.id === item.id);

                    return (
                      <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                        {/* Image */}
                        <Link 
                          to={`/product/${item.id}`} 
                          className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-50 rounded-xl p-2 border border-gray-100 shrink-0 flex items-center justify-center hover:bg-amber-50/20 transition-colors"
                        >
                          <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                        </Link>

                        {/* Title and details */}
                        <div className="flex-1 min-w-0">
                          <Link to={`/product/${item.id}`}>
                            <h3 className="font-bold text-sm text-gray-900 line-clamp-2 hover:text-[#2874f0] transition-colors leading-snug mb-1">
                              {item.title}
                            </h3>
                          </Link>
                          
                          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                            <span className="capitalize">{item.brand}</span>
                            <span>•</span>
                            <span className="text-[#2874f0] font-black text-[10px] bg-blue-50 px-1.5 py-0.2 rounded border border-blue-100">
                              ✦ Assured
                            </span>
                          </div>

                          {/* Price */}
                          <div className="flex items-baseline gap-2 mb-3">
                            <span className="text-lg font-black text-gray-900">
                              ₹{(item.price * item.qty).toLocaleString()}
                            </span>
                            <span className="text-xs text-gray-400 line-through">
                              ₹{(orig * item.qty).toLocaleString()}
                            </span>
                            <span className="text-xs font-bold text-emerald-600">
                              Save ₹{((orig - item.price) * item.qty).toLocaleString()}
                            </span>
                          </div>

                          {/* Controls */}
                          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
                            {/* Quantity stepper */}
                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                              <button 
                                onClick={() => updateQuantity(item.id, item.qty - 1)}
                                className="px-3 py-1 hover:bg-gray-200 text-gray-700 transition-colors font-bold"
                              >
                                -
                              </button>
                              <span className="px-3 py-1 font-bold bg-white text-gray-900 border-x border-gray-300">
                                {item.qty}
                              </span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.qty + 1)}
                                className="px-3 py-1 hover:bg-gray-200 text-gray-700 transition-colors font-bold"
                              >
                                +
                              </button>
                            </div>

                            <button 
                              onClick={() => addToWishlist(item)}
                              className={`flex items-center gap-1 transition-colors ${
                                isWishlisted ? 'text-rose-500 font-bold' : 'text-gray-600 hover:text-rose-500'
                              }`}
                            >
                              <Heart size={14} className={isWishlisted ? 'fill-current' : ''} />
                              <span>{isWishlisted ? 'Saved in Wishlist' : 'Save for later'}</span>
                            </button>

                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-500 hover:text-red-600 flex items-center gap-1 transition-colors"
                            >
                              <Trash2 size={14} />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>

                        {/* Delivery Promise */}
                        <div className="text-right shrink-0 hidden sm:block text-xs">
                          <p className="text-gray-700 font-medium">Delivery by <strong>Tomorrow</strong></p>
                          <p className="text-emerald-600 font-bold">FREE Delivery</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                  <button
                    onClick={handlePlaceOrder}
                    className="bg-[#fb641b] hover:bg-[#e85814] text-white font-bold px-8 py-3 rounded-lg shadow-md text-sm transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>PLACE ORDER</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Price Details (Flipkart Signature Style) */}
            <div className="w-full lg:w-96 shrink-0">
              <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-5 sticky top-20">
                <h3 className="text-xs font-black uppercase text-gray-500 tracking-wider pb-3 border-b border-gray-100 mb-4">
                  Price Details
                </h3>

                <div className="space-y-3.5 text-sm mb-4">
                  <div className="flex justify-between text-gray-700">
                    <span>Price ({totalItemsCount} items)</span>
                    <span>₹{totalMrp.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount</span>
                    <span>- ₹{totalSavings.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-gray-700">
                    <span>Delivery Charges</span>
                    <span className="text-emerald-600 font-bold">FREE</span>
                  </div>

                  <div className="flex justify-between text-gray-700">
                    <span>Packaging & Secured Fee</span>
                    <span className="line-through text-gray-400">₹49</span>
                  </div>
                </div>

                <div className="border-t border-dashed border-gray-200 py-3.5 mb-4">
                  <div className="flex justify-between items-center text-base font-black text-gray-900">
                    <span>Total Amount</span>
                    <span className="text-lg">₹{cartTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3 text-xs text-emerald-700 font-bold mb-5 flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="shrink-0" />
                  <span>You will save ₹{totalSavings.toLocaleString()} on this order</span>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-[#fb641b] hover:bg-[#e85814] text-white font-bold py-3.5 rounded-lg shadow-md text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>PROCEED TO BUY</span>
                  <ArrowRight size={16} />
                </button>

                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-2 text-[11px] text-gray-400">
                  <ShieldCheck size={20} className="text-gray-400 shrink-0" />
                  <span>Safe and Secure Payments. Easy returns. 100% Authentic products.</span>
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200/80 p-16 text-center max-w-xl mx-auto shadow-xs">
            <div className="w-24 h-24 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart size={40} />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">Your Myzon Cart is empty</h2>
            <p className="text-xs text-gray-500 mb-6 leading-relaxed">
              Explore today's top deals and discover savings across Electronics, Fashion, Pooja Samagri and more!
            </p>
            <Link 
              to="/" 
              className="bg-[#ffd814] hover:bg-[#f7ca00] text-gray-950 font-bold py-3 px-8 rounded-xl text-sm transition-colors shadow-xs inline-block"
            >
              Shop Today's Deals
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};
