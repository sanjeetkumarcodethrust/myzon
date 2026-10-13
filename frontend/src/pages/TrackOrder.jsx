import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Package, Truck, CheckCircle2, Search, MapPin, Calendar, Clock, CreditCard } from 'lucide-react';
import { useOrderStore } from '../store/useStore';

export const TrackOrder = () => {
  const [searchParams] = useSearchParams();
  const { orders } = useOrderStore();
  const [orderId, setOrderId] = useState('');
  const [tracking, setTracking] = useState(false);
  const [matchedOrder, setMatchedOrder] = useState(null);

  useEffect(() => {
    const idFromQuery = searchParams.get('orderId');
    if (idFromQuery) {
      setOrderId(idFromQuery);
      performTrack(idFromQuery);
    }
  }, [searchParams, orders]);

  const performTrack = (id) => {
    const cleanId = id.trim();
    if (!cleanId) return;
    const found = orders.find(o => o.id.toLowerCase() === cleanId.toLowerCase());
    setMatchedOrder(found || null);
    setTracking(true);
  };

  const handleTrack = (e) => {
    e.preventDefault();
    performTrack(orderId);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-12 flex justify-center">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Track Your Order</h1>
          <p className="text-gray-500">Enter your order ID below to get real-time updates on your shipment.</p>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="orderId" className="block text-sm font-bold text-gray-700 mb-2">Order ID</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="orderId"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-gray-50 font-bold"
                  placeholder="e.g. MZ-123456"
                  required
                />
              </div>
            </div>
            <div className="md:w-48 flex items-end">
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors h-[50px] cursor-pointer"
              >
                Track Now
              </button>
            </div>
          </form>
        </div>

        {tracking && (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 animate-fade-in-up space-y-8">
            
            {/* Header Status */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-gray-100 gap-4">
              <div>
                <h2 className="text-xl font-black text-gray-900">Order #{orderId}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Placed on {matchedOrder?.date || 'Today'}
                </p>
              </div>
              <div className="bg-green-50 text-green-700 border border-green-200 px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> 
                {matchedOrder?.status || 'In Transit'}
              </div>
            </div>

            {/* Matched Order Details Summary */}
            {matchedOrder && (
              <div className="bg-gray-50/70 rounded-xl p-4 border border-gray-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="font-bold text-gray-400 uppercase tracking-wider block text-[10px]">Recipient & Address</span>
                  <p className="font-bold text-gray-800 mt-0.5">{matchedOrder.shippingAddress.name}</p>
                  <p className="text-gray-500 truncate">{matchedOrder.shippingAddress.address}, {matchedOrder.shippingAddress.city}</p>
                </div>
                <div>
                  <span className="font-bold text-gray-400 uppercase tracking-wider block text-[10px]">Payment Method</span>
                  <p className="font-bold text-gray-800 mt-0.5">{matchedOrder.paymentMethod}</p>
                  <p className="text-emerald-600 font-bold">Total: ₹{matchedOrder.totalAmount?.toLocaleString()}</p>
                </div>
                <div>
                  <span className="font-bold text-gray-400 uppercase tracking-wider block text-[10px]">Shipment Items</span>
                  <p className="font-bold text-gray-800 mt-0.5">{matchedOrder.totalItems || matchedOrder.items?.length} Item(s)</p>
                  <p className="text-gray-500">Exp. Delivery: Tomorrow</p>
                </div>
              </div>
            )}

            {/* Progress Stepper */}
            <div className="relative pt-2">
              {/* Progress Line */}
              <div className="absolute left-[27px] md:left-auto md:top-[27px] md:w-full h-full md:h-1 w-1 bg-gray-100 -z-10 rounded-full">
                <div className="bg-orange-500 w-full h-1/2 md:w-1/2 md:h-full rounded-full transition-all duration-1000"></div>
              </div>

              {/* Status Points */}
              <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-0">
                {/* Step 1 */}
                <div className="flex md:flex-col items-center md:text-center gap-4 md:gap-2">
                  <div className="w-14 h-14 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-md shadow-orange-500/30 z-10">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Order Placed</h4>
                    <p className="text-xs text-gray-500">{matchedOrder?.date || 'Today'}, Confirmed</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex md:flex-col items-center md:text-center gap-4 md:gap-2">
                  <div className="w-14 h-14 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-md shadow-orange-500/30 z-10">
                    <Package size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Packed</h4>
                    <p className="text-xs text-gray-500">Warehouse verified</p>
                  </div>
                </div>

                {/* Step 3 (Current) */}
                <div className="flex md:flex-col items-center md:text-center gap-4 md:gap-2">
                  <div className="w-14 h-14 rounded-full bg-white border-4 border-orange-500 text-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20 z-10 relative">
                    <Truck size={24} />
                    <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">NOW</div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Shipped</h4>
                    <p className="text-xs text-orange-500 font-medium">Expected Tomorrow</p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex md:flex-col items-center md:text-center gap-4 md:gap-2">
                  <div className="w-14 h-14 rounded-full bg-white border-4 border-gray-100 text-gray-300 flex items-center justify-center z-10">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-400">Delivered</h4>
                    <p className="text-xs text-gray-400">Out for delivery soon</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Courier Details */}
            <div className="mt-8 bg-gray-50 rounded-xl p-5 border border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center p-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/9/9d/FedEx_Express.svg" alt="FedEx" className="max-w-full" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">FedEx Express Logistics</h4>
                  <p className="text-xs text-gray-500">Tracking AWB: FX{orderId.replace(/[^0-9]/g, '') || '9876543210'}</p>
                </div>
              </div>
              <button className="text-orange-500 text-sm font-bold hover:underline cursor-pointer">
                Live Courier Updates
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
