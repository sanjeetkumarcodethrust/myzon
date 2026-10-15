import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Trash2, ShoppingBag, Heart, ShieldCheck, MapPin, ArrowRight, Zap, 
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
    name: user?.name || '',
    phone: user?.phone || '',
    address: '',
    city: location.city || '',
    pincode: location.pincode || '',
  });

  useEffect(() => {
    if (user?.name || user?.phone || location.city || location.pincode) {
      setAddressForm(prev => ({
        ...prev,
        name: prev.name || user?.name || '',
        phone: prev.phone || user?.phone || '',
        city: prev.city || location.city || '',
        pincode: prev.pincode || location.pincode || '',
      }));
    }
  }, [user, location]);

  // Automatically open checkout if routed from "Instant Checkout"
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
      showToast('Your bag is empty! Add drops first.');
      return;
    }
    setIsCheckoutOpen(true);
  };

  const handleConfirmOrder = (e) => {
    if (e) e.preventDefault();

    if (!addressForm.name.trim() || !addressForm.phone.trim() || !addressForm.address.trim() || !addressForm.city.trim() || !addressForm.pincode.trim()) {
      showToast('Please fill out all address details: Name, Phone, Address, City & Pincode.');
      return;
    }

    if (addressForm.city.trim() && addressForm.pincode.trim()) {
      useUIStore.getState().setLocation(addressForm.city.trim(), addressForm.pincode.trim());
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
    <div className="bg-[#0a0b0e] text-neutral-100 min-h-screen py-8 select-none">
      <div className="max-w-[1500px] mx-auto px-4 lg:px-8">
        
        {/* Deliver to address bar */}
        {cartItems.length > 0 && !orderSuccess && (
          <div className="bg-[#121316] rounded-2xl border border-neutral-800 p-4 mb-6 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2.5">
              <MapPin size={18} className="text-amber-400" />
              <div className="text-xs">
                <span className="text-neutral-400">Dispatch Destination: </span>
                <span className="font-bold text-white">
                  {addressForm.city && addressForm.pincode 
                    ? `${addressForm.city} - ${addressForm.pincode}`
                    : 'Not specified yet (Enter during checkout)'}
                </span>
              </div>
            </div>
            <button
              onClick={openPincodeModal}
              className="text-amber-400 font-bold text-xs border border-amber-500/30 rounded-xl px-4 py-1.5 hover:bg-amber-400/10 transition-colors cursor-pointer"
            >
              Update Pincode
            </button>
          </div>
        )}

        {cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Left Items Column */}
            <div className="flex-1 space-y-3">
              <div className="bg-[#121316] rounded-2xl border border-neutral-800 shadow-xl overflow-hidden">
                <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between">
                  <h1 className="text-lg font-black text-white flex items-center gap-2">
                    <span>Studio Bag</span>
                    <span className="text-xs bg-neutral-900 border border-neutral-800 text-amber-400 font-bold px-2.5 py-0.5 rounded-full">
                      {totalItemsCount} drops
                    </span>
                  </h1>
                </div>

                <div className="divide-y divide-neutral-800/80">
                  {cartItems.map((item) => {
                    const orig = item.originalPrice || Math.round(item.price * 1.35);
                    const isWishlisted = wishlistItems.some(i => i.id === item.id);

                    return (
                      <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                        {/* Image */}
                        <Link 
                          to={`/product/${item.id}`} 
                          className="w-24 h-24 sm:w-28 sm:h-28 bg-neutral-900 rounded-2xl p-2.5 border border-neutral-800 shrink-0 flex items-center justify-center hover:border-amber-500/40 transition-colors"
                        >
                          <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain" />
                        </Link>

                        {/* Title and details */}
                        <div className="flex-1 min-w-0">
                          <Link to={`/product/${item.id}`}>
                            <h3 className="font-bold text-sm text-neutral-200 line-clamp-2 hover:text-amber-300 transition-colors leading-snug mb-1">
                              {item.title}
                            </h3>
                          </Link>
                          
                          <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
                            <span className="capitalize">{item.brand}</span>
                            <span>•</span>
                            <span className="text-amber-400 font-bold text-[10px] bg-amber-400/10 px-2 py-0.2 rounded-full border border-amber-500/20">
                              Verified
                            </span>
                          </div>

                          {/* Price */}
                          <div className="flex items-baseline gap-2 mb-3">
                            <span className="text-lg font-black text-amber-400">
                              ₹{(item.price * item.qty).toLocaleString()}
                            </span>
                            <span className="text-xs text-neutral-500 line-through">
                              ₹{(orig * item.qty).toLocaleString()}
                            </span>
                            <span className="text-xs font-bold text-emerald-400">
                              Save ₹{((orig - item.price) * item.qty).toLocaleString()}
                            </span>
                          </div>

                          {/* Controls */}
                          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
                            {/* Quantity stepper */}
                            <div className="flex items-center border border-neutral-800 rounded-xl overflow-hidden bg-neutral-900">
                              <button 
                                onClick={() => updateQuantity(item.id, item.qty - 1)}
                                className="px-3 py-1 hover:bg-neutral-800 text-neutral-300 transition-colors font-bold cursor-pointer"
                              >
                                -
                              </button>
                              <span className="px-3 py-1 font-bold bg-[#121316] text-white border-x border-neutral-800">
                                {item.qty}
                              </span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.qty + 1)}
                                className="px-3 py-1 hover:bg-neutral-800 text-neutral-300 transition-colors font-bold cursor-pointer"
                              >
                                +
                              </button>
                            </div>

                            <button 
                              onClick={() => addToWishlist(item)}
                              className={`flex items-center gap-1 transition-colors cursor-pointer ${
                                isWishlisted ? 'text-rose-400 font-bold' : 'text-neutral-400 hover:text-rose-400'
                              }`}
                            >
                              <Heart size={14} className={isWishlisted ? 'fill-current' : ''} />
                              <span>{isWishlisted ? 'Saved in Wishlist' : 'Save for later'}</span>
                            </button>

                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-neutral-500 hover:text-red-400 flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <Trash2 size={14} />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>

                        {/* Delivery Promise */}
                        <div className="text-right shrink-0 hidden sm:block text-xs">
                          <p className="text-neutral-300 font-medium">Express Courier: <strong>Under 24h</strong></p>
                          <p className="text-amber-400 font-bold">Complimentary</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-4 bg-neutral-900/40 border-t border-neutral-800 flex justify-end">
                  <button
                    onClick={handleOpenCheckout}
                    className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-950 font-bold px-8 py-3 rounded-xl shadow-md text-sm transition-all flex items-center gap-2 cursor-pointer active:scale-98"
                  >
                    <span>Instant Checkout</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Price Details */}
            <div className="w-full lg:w-96 shrink-0">
              <div className="bg-[#121316] rounded-2xl border border-neutral-800 shadow-xl p-5 sm:p-6 sticky top-24">
                <h3 className="text-xs font-black uppercase text-neutral-400 tracking-wider pb-3 border-b border-neutral-800 mb-4">
                  Bag Summary
                </h3>

                <div className="space-y-3.5 text-sm mb-4">
                  <div className="flex justify-between text-neutral-300">
                    <span>Subtotal ({totalItemsCount} drops)</span>
                    <span>₹{totalMrp.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Studio Privilege Discount</span>
                    <span>- ₹{totalSavings.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-neutral-300">
                    <span>Express Air Courier</span>
                    <span className="text-amber-400 font-bold">COMPLIMENTARY</span>
                  </div>
                </div>

                <div className="border-t border-neutral-800 py-3.5 mb-4">
                  <div className="flex justify-between items-center text-base font-black text-white">
                    <span>Total Amount</span>
                    <span className="text-xl text-amber-400 font-black">₹{cartTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-xs text-emerald-400 font-bold mb-5 flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="shrink-0" />
                  <span>You are saving ₹{totalSavings.toLocaleString()} on this order</span>
                </div>

                <button
                  onClick={handleOpenCheckout}
                  className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-950 font-bold py-3.5 rounded-xl shadow-lg shadow-amber-500/20 text-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <Lock size={15} />
                  <span>Proceed to Checkout</span>
                </button>

                <div className="mt-5 pt-4 border-t border-neutral-800 flex items-center gap-2 text-[11px] text-neutral-400">
                  <ShieldCheck size={18} className="text-amber-400 shrink-0" />
                  <span>Encrypted 256-Bit SSL Checkout • Direct Atelier Fulfillment</span>
                </div>
              </div>
            </div>

          </div>
        ) : !orderSuccess ? (
          <div className="bg-[#121316] rounded-3xl border border-neutral-800 p-16 text-center max-w-xl mx-auto shadow-2xl">
            <div className="w-20 h-20 bg-neutral-900 border border-neutral-800 text-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
              <ShoppingBag size={36} />
            </div>
            <h2 className="text-2xl font-black text-white mb-2">Your Studio Bag is Empty</h2>
            <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
              Explore today's exclusive drops and discover high-fidelity audio, streetwear, and sacred living artifacts.
            </p>
            <Link 
              to="/" 
              className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-950 font-bold py-3 px-8 rounded-xl text-xs transition-all shadow-md inline-block cursor-pointer"
            >
              Discover Catalog Drops
            </Link>
          </div>
        ) : null}

        {/* ===================== CHECKOUT MODAL ===================== */}
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
            <div className="bg-[#121316] text-neutral-100 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-neutral-800">
              
              {/* Header */}
              <div className="bg-[#0e0f12] text-white px-6 py-4.5 flex items-center justify-between border-b border-neutral-800">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 p-1.5 rounded-lg">
                    <Lock size={18} />
                  </div>
                  <div>
                    <h2 className="text-base font-black tracking-wide">Myzon Studio Checkout</h2>
                    <p className="text-[11px] text-neutral-400">Encrypted 256-Bit SSL Payment Protection</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsCheckoutOpen(false)}
                  className="text-neutral-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-neutral-800 cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleConfirmOrder} className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Section 1: Delivery Address */}
                <div className="border border-neutral-800 rounded-2xl p-5 bg-neutral-900/40">
                  <div className="flex items-center gap-2 mb-3.5 text-xs font-bold text-white uppercase tracking-wider border-b border-neutral-800 pb-2">
                    <MapPin size={16} className="text-amber-400" />
                    <span>1. Dispatch Address</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-300 mb-1.5">Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={addressForm.name} 
                        onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                        className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-neutral-700 focus:border-amber-400 outline-none bg-neutral-900 text-white"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-300 mb-1.5">Mobile Number</label>
                      <input 
                        type="tel" 
                        required
                        value={addressForm.phone} 
                        onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                        className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-neutral-700 focus:border-amber-400 outline-none bg-neutral-900 text-white"
                        placeholder="Enter 10-digit mobile number"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-neutral-300 mb-1.5">Street Address, Suite / Apartment</label>
                      <input 
                        type="text" 
                        required
                        value={addressForm.address} 
                        onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })}
                        className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-neutral-700 focus:border-amber-400 outline-none bg-neutral-900 text-white"
                        placeholder="House / Flat no., Building, Street address, Area"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-300 mb-1.5">City</label>
                      <input 
                        type="text" 
                        required
                        value={addressForm.city} 
                        onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                        className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-neutral-700 focus:border-amber-400 outline-none bg-neutral-900 text-white"
                        placeholder="Enter city"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-300 mb-1.5">Pincode</label>
                      <input 
                        type="text" 
                        required
                        value={addressForm.pincode} 
                        onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                        className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-neutral-700 focus:border-amber-400 outline-none bg-neutral-900 text-white"
                        placeholder="Enter 6-digit pincode"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Payment Mode */}
                <div className="border border-neutral-800 rounded-2xl p-5 bg-neutral-900/40">
                  <div className="flex items-center gap-2 mb-3.5 text-xs font-bold text-white uppercase tracking-wider border-b border-neutral-800 pb-2">
                    <CreditCard size={16} className="text-amber-400" />
                    <span>2. Select Payment Mode</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    
                    {/* COD Option */}
                    <label 
                      onClick={() => setPaymentMethod('cod')}
                      className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        paymentMethod === 'cod' 
                          ? 'border-amber-400 bg-amber-400/10' 
                          : 'border-neutral-800 hover:border-neutral-700 bg-neutral-900/60'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="payment" 
                        checked={paymentMethod === 'cod'} 
                        onChange={() => setPaymentMethod('cod')}
                        className="mt-1 accent-amber-400" 
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Banknote size={17} className="text-amber-400" />
                          <span className="text-xs font-bold text-white">Cash on Delivery (COD)</span>
                        </div>
                        <p className="text-[11px] text-neutral-400 mt-0.5">Pay via cash or UPI QR upon doorstep delivery</p>
                      </div>
                    </label>

                    {/* UPI Option */}
                    <label 
                      onClick={() => setPaymentMethod('upi')}
                      className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        paymentMethod === 'upi' 
                          ? 'border-amber-400 bg-amber-400/10' 
                          : 'border-neutral-800 hover:border-neutral-700 bg-neutral-900/60'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="payment" 
                        checked={paymentMethod === 'upi'} 
                        onChange={() => setPaymentMethod('upi')}
                        className="mt-1 accent-amber-400" 
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <QrCode size={17} className="text-amber-400" />
                          <span className="text-xs font-bold text-white">UPI / Instant QR</span>
                        </div>
                        <p className="text-[11px] text-neutral-400 mt-0.5">Google Pay, PhonePe, Paytm, BHIM</p>
                      </div>
                    </label>

                    {/* Card Option */}
                    <label 
                      onClick={() => setPaymentMethod('card')}
                      className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        paymentMethod === 'card' 
                          ? 'border-amber-400 bg-amber-400/10' 
                          : 'border-neutral-800 hover:border-neutral-700 bg-neutral-900/60'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="payment" 
                        checked={paymentMethod === 'card'} 
                        onChange={() => setPaymentMethod('card')}
                        className="mt-1 accent-amber-400" 
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <CreditCard size={17} className="text-amber-400" />
                          <span className="text-xs font-bold text-white">Credit / Debit Card</span>
                        </div>
                        <p className="text-[11px] text-neutral-400 mt-0.5">Visa, Mastercard, RuPay, Amex</p>
                      </div>
                    </label>

                    {/* Net Banking Option */}
                    <label 
                      onClick={() => setPaymentMethod('netbanking')}
                      className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        paymentMethod === 'netbanking' 
                          ? 'border-amber-400 bg-amber-400/10' 
                          : 'border-neutral-800 hover:border-neutral-700 bg-neutral-900/60'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="payment" 
                        checked={paymentMethod === 'netbanking'} 
                        onChange={() => setPaymentMethod('netbanking')}
                        className="mt-1 accent-amber-400" 
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <ShieldCheck size={17} className="text-amber-400" />
                          <span className="text-xs font-bold text-white">Net Banking</span>
                        </div>
                        <p className="text-[11px] text-neutral-400 mt-0.5">HDFC, ICICI, SBI, Axis & all banks</p>
                      </div>
                    </label>

                  </div>
                </div>

                {/* Section 3: Order Items Overview */}
                <div className="border border-neutral-800 rounded-2xl p-4 bg-neutral-900/30">
                  <div className="flex justify-between items-center text-xs font-bold text-neutral-300 mb-3 border-b border-neutral-800 pb-2">
                    <span>Summary ({totalItemsCount} items)</span>
                    <span className="text-emerald-400 font-bold">Saving ₹{totalSavings.toLocaleString()}</span>
                  </div>

                  <div className="max-h-36 overflow-y-auto divide-y divide-neutral-800/80 pr-1">
                    {cartItems.map((item) => (
                      <div key={item.id} className="py-2 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2 min-w-0">
                          <img src={item.image} alt={item.title} className="w-8 h-8 object-contain rounded bg-neutral-900 border border-neutral-800 p-0.5" />
                          <div className="truncate">
                            <p className="font-bold text-neutral-200 truncate">{item.title}</p>
                            <span className="text-[10px] text-neutral-400">Qty: {item.qty}</span>
                          </div>
                        </div>
                        <span className="font-bold text-white shrink-0">₹{(item.price * item.qty).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 pt-3 border-t border-neutral-800 flex justify-between items-center">
                    <span className="text-xs font-bold text-neutral-300">Total Payable:</span>
                    <span className="text-base font-black text-amber-400">₹{cartTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-950 font-black py-4 rounded-2xl shadow-lg shadow-amber-500/20 text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <CheckCircle2 size={18} />
                    <span>Confirm Order • ₹{cartTotal.toLocaleString()}</span>
                  </button>
                  <p className="text-[11px] text-center text-neutral-500 mt-2 flex items-center justify-center gap-1">
                    <ShieldCheck size={14} className="text-amber-400" />
                    <span>Real-time dispatch tracking number will be generated immediately.</span>
                  </p>
                </div>

              </form>
            </div>
          </div>
        )}

        {/* ===================== ORDER SUCCESS SCREEN ===================== */}
        {orderSuccess && (
          <div className="max-w-2xl mx-auto bg-[#121316] rounded-3xl border border-neutral-800 shadow-2xl overflow-hidden p-6 sm:p-10 my-4 text-center">
            
            {/* Green Badge */}
            <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-inner">
              <CheckCircle2 size={40} className="stroke-[2.5]" />
            </div>

            <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-500/20">
              Allocation Confirmed
            </span>

            <h2 className="text-2xl sm:text-3xl font-black text-white mt-3 mb-2">
              🎉 Congratulations! Your Order is Confirmed
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mb-6 max-w-md mx-auto">
              Your drops have been reserved with the atelier and are scheduled for priority express dispatch!
            </p>

            {/* Order Details Card */}
            <div className="bg-neutral-900/60 rounded-2xl border border-neutral-800 p-5 text-left mb-6 space-y-4">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-neutral-800 gap-2">
                <div>
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Tracking / Order ID</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-base font-black text-white">{orderSuccess.id}</span>
                    <button
                      onClick={() => copyOrderId(orderSuccess.id)}
                      className="text-neutral-400 hover:text-amber-400 p-1 transition-colors cursor-pointer"
                      title="Copy Order ID"
                    >
                      {copiedId ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>

                <div className="sm:text-right">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Placed On</span>
                  <p className="text-xs font-bold text-neutral-300 mt-0.5">{orderSuccess.date}</p>
                </div>
              </div>

              {/* Delivery info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Dispatch Address</span>
                  <p className="font-bold text-white mt-0.5">{orderSuccess.shippingAddress.name} ({orderSuccess.shippingAddress.phone})</p>
                  <p className="text-neutral-400 mt-0.5">{orderSuccess.shippingAddress.address}, {orderSuccess.shippingAddress.city} - {orderSuccess.shippingAddress.pincode}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Payment Method</span>
                  <p className="font-bold text-white mt-0.5">{orderSuccess.paymentMethod}</p>
                  <p className="text-amber-400 font-bold mt-1">Total: ₹{orderSuccess.totalAmount.toLocaleString()}</p>
                </div>
              </div>

              {/* Items Purchased Preview */}
              <div className="pt-3 border-t border-neutral-800">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-2">Shipment Contents</span>
                <div className="flex flex-wrap gap-2">
                  {orderSuccess.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-2 bg-[#121316] px-2.5 py-1.5 rounded-xl border border-neutral-800 text-xs">
                      <img src={item.image} alt={item.title} className="w-7 h-7 object-contain" />
                      <span className="font-bold text-neutral-200 max-w-[140px] truncate">{item.title}</span>
                      <span className="text-amber-400 font-semibold">x{item.qty}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate(`/track-order?orderId=${orderSuccess.id}`)}
                className="bg-neutral-900 hover:bg-neutral-800 text-amber-400 border border-amber-500/40 font-bold py-3.5 px-6 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
              >
                <Truck size={16} />
                <span>Track Express Courier</span>
              </button>

              <button
                onClick={() => {
                  setOrderSuccess(null);
                  navigate('/');
                }}
                className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-950 font-bold py-3.5 px-6 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
              >
                <ShoppingBag size={16} />
                <span>Continue Exploring Drops</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
