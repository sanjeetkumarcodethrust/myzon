import React, { useState } from 'react';
import { MapPin, X, Check, Sparkles } from 'lucide-react';
import { useUIStore } from '../store/useStore';

const POPULAR_CITIES = [
  { city: 'New Delhi', pincode: '110001' },
  { city: 'Mumbai', pincode: '400001' },
  { city: 'Bengaluru', pincode: '560001' },
  { city: 'Hyderabad', pincode: '500001' },
  { city: 'Kolkata', pincode: '700001' },
  { city: 'Chennai', pincode: '600001' },
  { city: 'Pune', pincode: '411001' },
  { city: 'Ahmedabad', pincode: '380001' },
];

export const PincodeModal = () => {
  const { isPincodeModalOpen, closePincodeModal, setLocation, location } = useUIStore();
  const [inputPincode, setInputPincode] = useState('');
  const [inputCity, setInputCity] = useState('');
  const [error, setError] = useState('');

  if (!isPincodeModalOpen) return null;

  const handleApply = (e) => {
    e.preventDefault();
    if (!inputPincode || inputPincode.trim().length !== 6 || !/^\d+$/.test(inputPincode.trim())) {
      setError('Please enter a valid 6-digit Indian Pincode.');
      return;
    }
    const matched = POPULAR_CITIES.find(c => c.pincode === inputPincode.trim());
    const cityName = inputCity.trim() || (matched ? matched.city : 'India Delivery');
    setLocation(cityName, inputPincode.trim());
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in select-none">
      <div className="bg-[#121316] text-neutral-100 rounded-3xl w-full max-w-md shadow-2xl border border-neutral-800 overflow-hidden transform transition-all">
        
        {/* Header */}
        <div className="bg-[#0e0f12] text-white p-5 flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <MapPin size={18} className="text-amber-400" />
            <h3 className="font-bold text-sm">Select Dispatch Destination</h3>
          </div>
          <button 
            onClick={closePincodeModal}
            className="text-neutral-400 hover:text-white p-1 rounded-full transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-xs text-neutral-400 mb-5 leading-relaxed">
            Enter your destination pincode to verify same-day express air courier availability for your area.
          </p>

          <form onSubmit={handleApply} className="mb-6">
            <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2">
              Enter Indian Pincode
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={inputPincode}
                onChange={(e) => {
                  setInputPincode(e.target.value);
                  setError('');
                }}
                placeholder="e.g. 110001"
                className="w-full bg-neutral-900 text-white rounded-xl border border-neutral-700 px-4 py-2.5 text-xs focus:outline-none focus:border-amber-400 font-semibold"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-950 font-bold px-5 py-2.5 rounded-xl text-xs transition-all shadow-md active:scale-98 cursor-pointer shrink-0"
              >
                Apply
              </button>
            </div>
            {error && <p className="text-rose-400 text-xs mt-1.5 font-medium">{error}</p>}
          </form>

          {/* Popular Cities */}
          <div>
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-2.5">
              Major Metro Hubs
            </span>
            <div className="grid grid-cols-2 gap-2">
              {POPULAR_CITIES.map((c) => {
                const isCurrent = location.pincode === c.pincode;
                return (
                  <button
                    key={c.pincode}
                    type="button"
                    onClick={() => setLocation(c.city, c.pincode)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      isCurrent
                        ? 'border-amber-400 bg-amber-400/10 text-white font-bold'
                        : 'border-neutral-800 bg-neutral-900/60 hover:bg-neutral-800 text-neutral-300'
                    }`}
                  >
                    <span>{c.city}</span>
                    <span className="text-[10px] text-neutral-500 font-mono">
                      {isCurrent ? <Check size={13} className="text-amber-400" /> : c.pincode}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
