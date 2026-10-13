import React, { useState } from 'react';
import { MapPin, X, Check } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-gray-100 overflow-hidden transform transition-all">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#232f3e] to-[#131921] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin size={20} className="text-[#febd69]" />
            <h3 className="font-bold text-base">Choose your delivery location</h3>
          </div>
          <button 
            onClick={closePincodeModal}
            className="text-gray-400 hover:text-white p-1 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-xs text-gray-500 mb-4">
            Select a delivery location to see product availability and delivery options tailored to your area.
          </p>

          <form onSubmit={handleApply} className="mb-6">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
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
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f3a847] focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-[#febd69] hover:bg-[#f3a847] text-gray-900 font-bold px-5 py-2 rounded-lg text-sm shadow-sm transition-colors cursor-pointer"
              >
                Apply
              </button>
            </div>
            {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
          </form>

          <div className="relative flex py-2 items-center mb-4">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-xs font-semibold text-gray-400 uppercase">Or Select Major City</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="grid grid-cols-2 gap-2 max-h-52 overflow-y-auto pr-1">
            {POPULAR_CITIES.map((c) => {
              const isSelected = location.pincode === c.pincode;
              return (
                <button
                  key={c.pincode}
                  type="button"
                  onClick={() => setLocation(c.city, c.pincode)}
                  className={`flex items-center justify-between p-2.5 rounded-lg border text-left text-xs font-medium transition-all ${
                    isSelected 
                      ? 'border-[#2874f0] bg-blue-50/60 text-[#2874f0] font-bold ring-1 ring-[#2874f0]' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div>
                    <p className="truncate">{c.city}</p>
                    <p className="text-[10px] text-gray-400 font-normal">{c.pincode}</p>
                  </div>
                  {isSelected && <Check size={14} className="text-[#2874f0]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-end">
          <button
            onClick={closePincodeModal}
            className="text-xs font-bold text-gray-600 hover:text-gray-900 px-4 py-1.5"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
