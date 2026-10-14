import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Trash2, ShoppingCart, Heart, ShieldCheck, MapPin, ArrowRight, Zap, 
  CheckCircle2, CreditCard, Banknote, QrCode, X, CheckCircle, Package, 
  Truck, Phone, User, Copy, Check, Lock, ChevronRight 
} from 'lucide-react';
import { useCartStore, useWishlistStore, useUIStore, useAuthStore, useOrderStore } from '../store/useStore';

export const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCartStore();
  const { addToWishlist, wishlistItems } = useWishlistStore();
  const { location, openPincodeModal, showToast } = useUIStore();
  const { user } = useAuthStore();
  const { addOrder } = useOrderStore();
  const locationHook = useLocation();
  const navigate = useNavigate();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [copiedId, setCopiedId] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const [addressForm, setAddressForm] = useState({
    name: user?.name || 'Sanjeev Kumar',
    phone: user?.phone || '9876543210',
    address: 'Near Main Market, Colony Rd',
    city: location.city || 'New Delhi',
    pincode: location.pincode || '110001',
  });

  // Automatically open checkout if routed from "Buy Now"
  useEffect(() => {
    if (locationHook.state?.openCheckout && cartItems.length > 0) {
      setIsCheckoutOpen(true);
      window.history.replaceState({}, document.title);
    }
  }, [locationHook.state, cartItems.length]);

  const totalItemsCount = cartItems.reduce((acc, item) => acc + (item.qty || 1), 0);
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.qty), 0);
  const totalMrp = cartItems.reduce((total, item) => {
    const orig = item.originalPrice || Math.round(item.price * 1.35);
    return total + (orig * item.qty);
  }, 0);
  const totalSavings = totalMrp - cartTotal;

  const handleOpenCheckout = () => {
    if (cartItems.length === 0) {
      showToast('Your cart is empty! Add products first.');
      return;
    }
    setIsCheckoutOpen(true);
  };

  const handleConfirmOrder = (e) => {
    if (e) e.preventDefault();

    if (!addressForm.name.trim() || !addressForm.phone.trim() || !addressForm.address.trim()) {
      showToast('Please fill out all address details.');
      return;
    }

    const orderId = `MZ-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderDate = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    const newOrder = {
      id: orderId,
      date: orderDate,
      items: [...cartItems],
      totalAmount: cartTotal,
      totalItems: totalItemsCount,
      savings: totalSavings,
      shippingAddress: { ...addressForm },
      paymentMethod: paymentMethod === 'cod' 
        ? 'Cash on Delivery (COD)' 
        : paymentMethod === 'upi' 
        ? 'UPI / QR Payment' 
        : paymentMethod === 'card' 
        ? 'Credit / Debit Card' 
        : 'Net Banking',
      status: 'In Transit'
    };

    // Save order & clear cart
    addOrder(newOrder);
    clearCart();
    setIsCheckoutOpen(false);
    setOrderSuccess(newOrder);
    showToast(`🎉 Order #${orderId} confirmed successfully!`, 'cart');
  };

  const copyOrderId = (id) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(id);
      setCopiedId(true);
      showToast('Order ID copied to clipboard!');
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  return (
    <div className="bg-[#f1f3f6] min-h-screen py-8">
      <div className="max-w-[1500px] mx-auto px-4">
        
        {/* Deliver to address bar */}
        {cartItems.length > 0 && !orderSuccess && (
          <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-4 mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <MapPin size={20} className="text-amber-600" />
              <div className="text-xs">
                <span className="text-gray-500">Deliver to: </span>
                <span className="font-bold text-gray-900">{addressForm.city} - {addressForm.pincode}</span>
              </div>
            </div>
            <button
              onClick={openPincodeModal}
              className="text-amber-600 font-bold text-xs border border-amber-200 rounded-lg px-4 py-1.5 hover:bg-amber-50 transition-colors cursor-pointer"
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
                            <h3 className="font-bold text-sm text-gray-900 line-clamp-2 hover:text-amber-600 transition-colors leading-snug mb-1">
                              {item.title}
                            </h3>
                          </Link>
                          
                          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                            <span className="capitalize">{item.brand}</span>
                            <span>•</span>
                            <span className="text-amber-800 font-black text-[10px] bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200/60">
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
                                className="px-3 py-1 hover:bg-gray-200 text-gray-700 transition-colors font-bold cursor-pointer"
                              >
                                -
                              </button>
                              <span className="px-3 py-1 font-bold bg-white text-gray-900 border-x border-gray-300">
                                {item.qty}
                              </span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.qty + 1)}
                                className="px-3 py-1 hover:bg-gray-200 text-gray-700 transition-colors font-bold cursor-pointer"
                              >
                                +
                              </button>
                            </div>

                            <button 
                              onClick={() => addToWishlist(item)}
                              className={`flex items-center gap-1 transition-colors cursor-pointer ${
                                isWishlisted ? 'text-rose-500 font-bold' : 'text-gray-600 hover:text-rose-500'
                              }`}
                            >
                              <Heart size={14} className={isWishlisted ? 'fill-current' : ''} />
                              <span>{isWishlisted ? 'Saved in Wishlist' : 'Save for later'}</span>
                            </button>

                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-500 hover:text-red-600 flex items-center gap-1 transition-colors cursor-pointer"
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
                    onClick={handleOpenCheckout}
                    className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-950 font-bold px-8 py-3 rounded-lg shadow-md text-sm transition-all flex items-center gap-2 cursor-pointer"
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
                  onClick={handleOpenCheckout}
                  className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-950 font-bold py-3.5 rounded-lg shadow-md text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
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
        ) : !orderSuccess ? (
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
              className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-950 font-bold py-3 px-8 rounded-xl text-sm transition-colors shadow-xs inline-block"
            >
              Shop Today's Deals
            </Link>
          </div>
        ) : null}

        {/* ===================== CHECKOUT MODAL ===================== */}
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-gray-200">
              
              {/* Header */}
              <div className="bg-[#121316] text-white px-6 py-4 flex items-center justify-between border-b border-neutral-800">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 p-1.5 rounded-lg">
                    <Lock size={18} />
                  </div>
                  <div>
                    <h2 className="text-base font-black tracking-wide">Myzon Secure Checkout</h2>
                    <p className="text-[11px] text-gray-400">100% Safe & Encrypted Payment Guarantee</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsCheckoutOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10 cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleConfirmOrder} className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Section 1: Delivery Address */}
                <div className="border border-gray-200 rounded-xl p-5 bg-gray-50/50">
                  <div className="flex items-center gap-2 mb-3 text-sm font-black text-gray-900 border-b border-gray-200 pb-2">
                    <MapPin size={18} className="text-amber-600" />
                    <span>1. Delivery Address</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={addressForm.name} 
                        onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                        className="w-full text-xs font-semibold px-3 py-2.5 rounded-lg border border-gray-300 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none bg-white"
                        placeholder="e.g. Sanjeev Kumar"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Mobile Number</label>
                      <input 
                        type="tel" 
                        required
                        value={addressForm.phone} 
                        onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                        className="w-full text-xs font-semibold px-3 py-2.5 rounded-lg border border-gray-300 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none bg-white"
                        placeholder="10-digit mobile number"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 mb-1">Flat, House no., Building, Street</label>
                      <input 
                        type="text" 
                        required
                        value={addressForm.address} 
                        onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })}
                        className="w-full text-xs font-semibold px-3 py-2.5 rounded-lg border border-gray-300 focus:border-[#2874f0] focus:ring-1 focus:ring-[#2874f0] outline-none bg-white"
                        placeholder="Apartment, Street address, Landmark"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">City / District</label>
                      <input 
                        type="text" 
                        required
                        value={addressForm.city} 
                        onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                        className="w-full text-xs font-semibold px-3 py-2.5 rounded-lg border border-gray-300 focus:border-[#2874f0] focus:ring-1 focus:ring-[#2874f0] outline-none bg-white"
                        placeholder="City"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Pincode</label>
                      <input 
                        type="text" 
                        required
                        value={addressForm.pincode} 
                        onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                        className="w-full text-xs font-semibold px-3 py-2.5 rounded-lg border border-gray-300 focus:border-[#2874f0] focus:ring-1 focus:ring-[#2874f0] outline-none bg-white"
                        placeholder="6-digit pincode"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Payment Mode */}
                <div className="border border-gray-200 rounded-xl p-5 bg-gray-50/50">
                  <div className="flex items-center gap-2 mb-3 text-sm font-black text-gray-900 border-b border-gray-200 pb-2">
                    <CreditCard size={18} className="text-[#2874f0]" />
                    <span>2. Select Payment Mode</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    
                    {/* COD Option */}
                    <label 
                      onClick={() => setPaymentMethod('cod')}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentMethod === 'cod' 
                          ? 'border-amber-500 bg-amber-50/40 shadow-xs' 
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="payment" 
                        checked={paymentMethod === 'cod'} 
                        onChange={() => setPaymentMethod('cod')}
                        className="mt-1 accent-amber-500" 
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Banknote size={18} className="text-emerald-600" />
                          <span className="text-xs font-black text-gray-900">Cash on Delivery (COD)</span>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-0.5">Pay via cash or UPI scanner upon delivery</p>
                      </div>
                    </label>

                    {/* UPI Option */}
                    <label 
                      onClick={() => setPaymentMethod('upi')}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentMethod === 'upi' 
                          ? 'border-amber-500 bg-amber-50/40 shadow-xs' 
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="payment" 
                        checked={paymentMethod === 'upi'} 
                        onChange={() => setPaymentMethod('upi')}
                        className="mt-1 accent-amber-500" 
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <QrCode size={18} className="text-amber-600" />
                          <span className="text-xs font-black text-gray-900">UPI / QR Payment</span>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-0.5">Google Pay, PhonePe, Paytm, BHIM</p>
                      </div>
                    </label>

                    {/* Card Option */}
                    <label 
                      onClick={() => setPaymentMethod('card')}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentMethod === 'card' 
                          ? 'border-amber-500 bg-amber-50/40 shadow-xs' 
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="payment" 
                        checked={paymentMethod === 'card'} 
                        onChange={() => setPaymentMethod('card')}
                        className="mt-1 accent-amber-500" 
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <CreditCard size={18} className="text-purple-600" />
                          <span className="text-xs font-black text-gray-900">Credit / Debit Card</span>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-0.5">Visa, Mastercard, RuPay, Maestro</p>
                      </div>
                    </label>

                    {/* Net Banking Option */}
                    <label 
                      onClick={() => setPaymentMethod('netbanking')}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentMethod === 'netbanking' 
                          ? 'border-amber-500 bg-amber-50/40 shadow-xs' 
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="payment" 
                        checked={paymentMethod === 'netbanking'} 
                        onChange={() => setPaymentMethod('netbanking')}
                        className="mt-1 accent-amber-500" 
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <ShieldCheck size={18} className="text-amber-600" />
                          <span className="text-xs font-black text-gray-900">Net Banking</span>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-0.5">SBI, HDFC, ICICI, Axis and more</p>
                      </div>
                    </label>

                  </div>
                </div>

                {/* Section 3: Order Items Overview */}
                <div className="border border-gray-200 rounded-xl p-4 bg-white">
                  <div className="flex justify-between items-center text-xs font-bold text-gray-700 mb-3 border-b border-gray-100 pb-2">
                    <span>Order Summary ({totalItemsCount} items)</span>
                    <span className="text-emerald-600 font-extrabold">Saving ₹{totalSavings.toLocaleString()}</span>
                  </div>

                  <div className="max-h-36 overflow-y-auto divide-y divide-gray-100 pr-1">
                    {cartItems.map((item) => (
                      <div key={item.id} className="py-2 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2 min-w-0">
                          <img src={item.image} alt={item.title} className="w-9 h-9 object-contain rounded border p-0.5" />
                          <div className="truncate">
                            <p className="font-bold text-gray-900 truncate">{item.title}</p>
                            <span className="text-[10px] text-gray-500">Qty: {item.qty}</span>
                          </div>
                        </div>
                        <span className="font-black text-gray-900 shrink-0">₹{(item.price * item.qty).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 pt-3 border-t border-dashed border-gray-200 flex justify-between items-center">
                    <span className="text-sm font-black text-gray-900">Total Payable:</span>
                    <span className="text-lg font-black text-amber-600">₹{cartTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-950 font-extrabold py-3.5 rounded-xl shadow-lg text-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-99"
                  >
                    <CheckCircle2 size={18} />
                    <span>Confirm & Place Order • ₹{cartTotal.toLocaleString()}</span>
                  </button>
                  <p className="text-[11px] text-center text-gray-400 mt-2 flex items-center justify-center gap-1">
                    <ShieldCheck size={14} />
                    <span>Clicking Confirm will create your order and generate real tracking details.</span>
                  </p>
                </div>

              </form>
            </div>
          </div>
        )}

        {/* ===================== ORDER SUCCESS SCREEN ===================== */}
        {orderSuccess && (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden p-6 sm:p-10 my-4 animate-fade-in text-center">
            
            {/* Green Badge */}
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
              <CheckCircle2 size={44} className="stroke-[2.5]" />
            </div>

            <span className="bg-emerald-50 text-emerald-700 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-200">
              Order Confirmed
            </span>

            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-3 mb-2">
              🎉 Congratulations! Your Order is Placed!
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mb-6 max-w-md mx-auto">
              Thank you for ordering with Myzon. Your order is safely registered and will be delivered by tomorrow!
            </p>

            {/* Order Details Card */}
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 text-left mb-6 space-y-4">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-200 gap-2">
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Order ID</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-base font-black text-gray-900">{orderSuccess.id}</span>
                    <button
                      onClick={() => copyOrderId(orderSuccess.id)}
                      className="text-gray-400 hover:text-amber-600 p-1 transition-colors cursor-pointer"
                      title="Copy Order ID"
                    >
                      {copiedId ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>

                <div className="sm:text-right">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Placed On</span>
                  <p className="text-xs font-bold text-gray-800 mt-0.5">{orderSuccess.date}</p>
                </div>
              </div>

              {/* Delivery info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Delivery To</span>
                  <p className="font-bold text-gray-900 mt-0.5">{orderSuccess.shippingAddress.name} ({orderSuccess.shippingAddress.phone})</p>
                  <p className="text-gray-600 mt-0.5">{orderSuccess.shippingAddress.address}, {orderSuccess.shippingAddress.city} - {orderSuccess.shippingAddress.pincode}</p>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Payment Method</span>
                  <p className="font-bold text-gray-900 mt-0.5">{orderSuccess.paymentMethod}</p>
                  <p className="text-emerald-600 font-bold mt-1">Total Paid: ₹{orderSuccess.totalAmount.toLocaleString()}</p>
                </div>
              </div>

              {/* Items Purchased Preview */}
              <div className="pt-3 border-t border-gray-200">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Items in this shipment</span>
                <div className="flex flex-wrap gap-2">
                  {orderSuccess.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-2 bg-white px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs">
                      <img src={item.image} alt={item.title} className="w-7 h-7 object-contain" />
                      <span className="font-bold text-gray-800 max-w-[140px] truncate">{item.title}</span>
                      <span className="text-gray-500 font-semibold">x{item.qty}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate(`/track-order?orderId=${orderSuccess.id}`)}
                className="bg-[#121316] hover:bg-[#1a1c22] text-amber-400 border border-amber-500/40 font-bold py-3 px-6 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
              >
                <Truck size={16} />
                <span>Track Your Order</span>
              </button>

              <button
                onClick={() => {
                  setOrderSuccess(null);
                  navigate('/');
                }}
                className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-950 font-bold py-3 px-6 rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <ShoppingCart size={16} />
                <span>Continue Shopping</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
