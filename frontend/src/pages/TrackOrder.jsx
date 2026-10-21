import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Package, Truck, CheckCircle2, Search, MapPin, Calendar, Clock, 
  CreditCard, Sparkles, ShieldCheck, KeyRound, Eye, EyeOff, Copy, Check, RotateCcw 
} from 'lucide-react';
import { useOrderStore, useUIStore } from '../store/useStore';
import { requestApi, resendDeliveryOtpApi } from '../utils/api';

export const TrackOrder = () => {
  const [searchParams] = useSearchParams();
  const { orders, updateOrder } = useOrderStore();
  const { showToast } = useUIStore();
  const [orderId, setOrderId] = useState('');
  const [tracking, setTracking] = useState(false);
  const [matchedOrder, setMatchedOrder] = useState(null);
  const [showDeliveryOtp, setShowDeliveryOtp] = useState(false);
  const [copiedOtp, setCopiedOtp] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setInterval(() => setResendCooldown((p) => p - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const performTrack = async (id) => {
    const cleanId = id?.trim();
    if (!cleanId) return;

    // 1. Check local order store first
    const foundLocal = orders.find(
      (o) => o.id?.toLowerCase() === cleanId.toLowerCase() || o._id?.toLowerCase() === cleanId.toLowerCase()
    );
    if (foundLocal) {
      setMatchedOrder(foundLocal);
      setTracking(true);
      return;
    }

    // 2. Fetch from backend if not found locally
    try {
      const res = await requestApi(`/api/orders/${cleanId}`);
      if (res.data) {
        const orderData = {
          id: res.data.customOrderId || res.data._id,
          _id: res.data._id,
          date: new Date(res.data.createdAt).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }),
          totalAmount: res.data.totalPrice,
          totalItems: res.data.orderItems?.reduce((a, b) => a + (b.quantity || 1), 0),
          shippingAddress: res.data.shippingAddress,
          paymentMethod: res.data.paymentMethod,
          status: res.data.status,
          deliveryOtp: res.data.deliveryOtp,
          trackingNumber: res.data.trackingNumber,
        };
        setMatchedOrder(orderData);
      } else {
        setMatchedOrder(null);
      }
    } catch (e) {
      setMatchedOrder(null);
    } finally {
      setTracking(true);
    }
  };

  const copyDeliveryOtp = (otp) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(otp);
      setCopiedOtp(true);
      showToast('Delivery OTP copied to clipboard!');
      setTimeout(() => setCopiedOtp(false), 2000);
    }
  };

  const handleResendDeliveryOtp = async () => {
    if (!matchedOrder || resendCooldown > 0) return;
    setIsResending(true);
    try {
      await resendDeliveryOtpApi({
        orderId: matchedOrder.id,
        phone: matchedOrder.shippingAddress?.phone,
        deliveryOtp: matchedOrder.deliveryOtp,
      });
      setResendCooldown(30);
      showToast(`Delivery OTP resent to +91 ${matchedOrder.shippingAddress?.phone} via SMS!`);
    } catch (err) {
      showToast(err.message || 'Could not resend Delivery OTP SMS.');
    } finally {
      setIsResending(false);
    }
  };

  useEffect(() => {
    const idFromQuery = searchParams.get('orderId');
    if (idFromQuery) {
      setOrderId(idFromQuery);
      performTrack(idFromQuery);
    }
  }, [searchParams, orders]);

  const handleTrack = (e) => {
    e.preventDefault();
    performTrack(orderId);
  };

  return (
    <div className="bg-[#0a0b0e] text-neutral-100 min-h-screen py-12 flex justify-center select-none">
      <div className="w-full max-w-3xl px-4 lg:px-8">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles size={13} />
            <span>Priority Logistics</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-3">
            Track Express Shipment
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400">
            Enter your order or AWB tracking ID for real-time dispatch progress.
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-[#121316] p-6 sm:p-8 rounded-3xl shadow-xl border border-neutral-800 mb-8">
          <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="orderId" className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">
                Order Tracking ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Search size={16} className="text-neutral-500" />
                </div>
                <input
                  type="text"
                  id="orderId"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 border border-neutral-700 rounded-xl focus:border-amber-400 text-white bg-neutral-900 text-xs font-bold outline-none"
                  placeholder="e.g. MZ-123456"
                  required
                />
              </div>
            </div>
            <div className="md:w-48 flex items-end">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-950 font-bold py-3 px-6 rounded-xl transition-all shadow-md active:scale-98 text-xs h-[46px] cursor-pointer"
              >
                Track Shipment
              </button>
            </div>
          </form>
        </div>

        {/* Tracking Details */}
        {tracking && (
          <div className="bg-[#121316] p-6 sm:p-8 rounded-3xl shadow-xl border border-neutral-800 animate-in fade-in space-y-8">
            
            {/* Header Status */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-neutral-800 gap-4">
              <div>
                <h2 className="text-xl font-black text-white">Order #{orderId}</h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Placed on {matchedOrder?.date || 'Today'} • Express Air Freight
                </p>
              </div>
              <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div> 
                {matchedOrder?.status || 'In Transit'}
              </div>
            </div>

            {/* Matched Order Details Summary */}
            {matchedOrder && (
              <>
                <div className="bg-neutral-900/60 rounded-2xl p-4 border border-neutral-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="font-bold text-neutral-500 uppercase tracking-widest block text-[10px]">Client & Destination</span>
                    <p className="font-bold text-white mt-1">{matchedOrder.shippingAddress?.name || 'Customer'}</p>
                    <p className="text-neutral-400 truncate">{matchedOrder.shippingAddress?.address}, {matchedOrder.shippingAddress?.city}</p>
                  </div>
                  <div>
                    <span className="font-bold text-neutral-500 uppercase tracking-widest block text-[10px]">Payment Method</span>
                    <p className="font-bold text-white mt-1">{matchedOrder.paymentMethod}</p>
                    <p className="text-amber-400 font-bold">Total: ₹{matchedOrder.totalAmount?.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="font-bold text-neutral-500 uppercase tracking-widest block text-[10px]">Shipment Allocation</span>
                    <p className="font-bold text-white mt-1">{matchedOrder.totalItems || matchedOrder.items?.length || 1} Item(s)</p>
                    <p className="text-emerald-400 font-semibold">Expected: Within 24 Hours</p>
                  </div>
                </div>

                {/* Secure Doorstep Delivery OTP Banner */}
                {matchedOrder.deliveryOtp && (
                  <div className="bg-gradient-to-r from-amber-500/10 via-neutral-900 to-[#121316] border-2 border-amber-500/40 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-neutral-950 flex items-center justify-center font-bold shadow-md shadow-amber-400/20 shrink-0">
                        <KeyRound size={20} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-black text-white uppercase tracking-wider">
                            Secure Doorstep Delivery OTP
                          </h4>
                          <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-400 mt-0.5">
                          Share this OTP with courier associate only upon physical parcel handover
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
                      <div className="bg-neutral-950 px-4 py-2 rounded-xl border border-neutral-800 font-mono text-lg font-black text-amber-400 tracking-[0.25em] shadow-inner">
                        {showDeliveryOtp ? matchedOrder.deliveryOtp : '••••'}
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowDeliveryOtp(!showDeliveryOtp)}
                        className="text-neutral-400 hover:text-white p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 cursor-pointer transition-colors"
                        title={showDeliveryOtp ? 'Hide PIN' : 'Reveal PIN'}
                      >
                        {showDeliveryOtp ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      <button
                        type="button"
                        onClick={() => copyDeliveryOtp(matchedOrder.deliveryOtp)}
                        className="text-neutral-400 hover:text-amber-400 p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 cursor-pointer transition-colors"
                        title="Copy OTP"
                      >
                        {copiedOtp ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                      </button>
                      <button
                        type="button"
                        onClick={handleResendDeliveryOtp}
                        disabled={resendCooldown > 0 || isResending}
                        className={`text-xs font-bold px-3 py-2 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer ${
                          resendCooldown > 0 || isResending
                            ? 'bg-neutral-800 border-neutral-700 text-neutral-500 cursor-not-allowed'
                            : 'bg-neutral-900 hover:bg-neutral-800 border-amber-500/40 text-amber-400'
                        }`}
                        title="Resend SMS"
                      >
                        <RotateCcw size={14} className={isResending ? 'animate-spin' : ''} />
                        <span className="hidden md:inline">{resendCooldown > 0 ? `${resendCooldown}s` : 'Resend SMS'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Stepper */}
            <div className="relative pt-2">
              <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-0">
                {/* Step 1 */}
                <div className="flex md:flex-col items-center md:text-center gap-4 md:gap-2">
                  <div className="w-12 h-12 rounded-2xl bg-amber-400 text-neutral-950 flex items-center justify-center font-bold shadow-md shadow-amber-400/20 z-10">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">Drop Confirmed</h4>
                    <p className="text-[10px] text-neutral-400">{matchedOrder?.date || 'Today'}</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex md:flex-col items-center md:text-center gap-4 md:gap-2">
                  <div className="w-12 h-12 rounded-2xl bg-amber-400 text-neutral-950 flex items-center justify-center font-bold shadow-md shadow-amber-400/20 z-10">
                    <Package size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">Atelier Verified</h4>
                    <p className="text-[10px] text-neutral-400">Quality Checked</p>
                  </div>
                </div>

                {/* Step 3 (Current) */}
                <div className="flex md:flex-col items-center md:text-center gap-4 md:gap-2">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-900 border-2 border-amber-400 text-amber-400 flex items-center justify-center shadow-lg shadow-amber-400/20 z-10 relative">
                    <Truck size={20} />
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 text-[9px] font-black px-1.5 py-0.2 rounded-full">NOW</div>
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-400 text-xs">Air Courier Transit</h4>
                    <p className="text-[10px] text-neutral-400">Expected Tomorrow</p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex md:flex-col items-center md:text-center gap-4 md:gap-2">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 text-neutral-600 flex items-center justify-center z-10">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-500 text-xs">Doorstep Delivered</h4>
                    <p className="text-[10px] text-neutral-600">Pending Arrival</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Courier Details */}
            <div className="mt-8 bg-neutral-900/40 rounded-2xl p-5 border border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-neutral-900 rounded-xl border border-neutral-800 flex items-center justify-center text-amber-400 font-bold">
                  <Truck size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs">Priority Air Logistics Partner</h4>
                  <p className="text-[11px] text-neutral-400">AWB Tracking: MZ{orderId.replace(/[^0-9]/g, '') || '5029384102'}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold">
                <ShieldCheck size={14} />
                <span>Tamper-Proof Insured Freight</span>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
