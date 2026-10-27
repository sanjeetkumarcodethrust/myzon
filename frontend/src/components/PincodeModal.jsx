import React, { useState, useEffect } from 'react';
import { MapPin, X, Check, Navigation, Loader2, Sparkles } from 'lucide-react';
import { useUIStore } from '../store/useStore';
import { detectRealLocation, lookupPincode, INDIAN_PINCODE_PREFIX_MAP } from '../utils/location';

const POPULAR_CITIES = [
  { city: 'Pune', pincode: '411001' },
  { city: 'Mumbai', pincode: '400001' },
  { city: 'New Delhi', pincode: '110001' },
  { city: 'Bengaluru', pincode: '560001' },
  { city: 'Hyderabad', pincode: '500001' },
  { city: 'Kolkata', pincode: '700001' },
  { city: 'Chennai', pincode: '600001' },
  { city: 'Ahmedabad', pincode: '380001' },
];

export const PincodeModal = () => {
  const { isPincodeModalOpen, closePincodeModal, setLocation, location, showToast } = useUIStore();
  const [inputPincode, setInputPincode] = useState('');
  const [error, setError] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);
  const [isResolving, setIsResolving] = useState(false);
  const [livePreview, setLivePreview] = useState(null);

  useEffect(() => {
    if (!inputPincode || inputPincode.length !== 6) {
      setLivePreview(null);
      return;
    }

    let isMounted = true;
    lookupPincode(inputPincode).then((res) => {
      if (isMounted && res && res.city) {
        setLivePreview(res);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [inputPincode]);

  if (!isPincodeModalOpen) return null;

  const handleDetectLiveLocation = async () => {
    setIsDetecting(true);
    setError('');
    try {
      const res = await detectRealLocation();
      if (res && res.success && res.city) {
        const pin = res.pincode || '';
        setLocation(res.city, pin);
        showToast(`📍 Location detected: ${res.city}${pin ? ` (${pin})` : ''}`, 'cart');
        closePincodeModal();
      } else {
        setError('Could not access GPS. Please check browser permission or enter pincode below.');
      }
    } catch (err) {
      setError(err.message || 'Location detection failed.');
    } finally {
      setIsDetecting(false);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    const cleanPin = inputPincode.trim();
    if (!cleanPin || cleanPin.length !== 6 || !/^\d+$/.test(cleanPin)) {
      setError('Please enter a valid 6-digit Indian Pincode.');
      return;
    }

    setIsResolving(true);
    setError('');

    try {
      const res = await lookupPincode(cleanPin);
      const cityName = res?.city || (INDIAN_PINCODE_PREFIX_MAP[cleanPin.slice(0, 3)]?.city) || 'Pune';
      setLocation(cityName, cleanPin);
      showToast(`📍 Destination set to ${cityName} (${cleanPin})`, 'cart');
      closePincodeModal();
    } catch (err) {
      // Offline fallback
      const fallbackCity = (INDIAN_PINCODE_PREFIX_MAP[cleanPin.slice(0, 3)]?.city) || 'Pune';
      setLocation(fallbackCity, cleanPin);
      showToast(`📍 Destination set to ${fallbackCity} (${cleanPin})`, 'cart');
      closePincodeModal();
    } finally {
      setIsResolving(false);
    }
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
          <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
            Auto-detect your real location or enter your Indian pincode (e.g. Pune 411015, 411057) to verify same-day express courier availability.
          </p>

          {/* Current Active Location Card if set */}
          {location.city && (
            <div className="bg-amber-400/10 border border-amber-500/30 rounded-2xl p-3 mb-4 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-neutral-300">Active Location:</span>
                <strong className="text-amber-400">{location.city}{location.pincode ? ` (${location.pincode})` : ''}</strong>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/20 px-2 py-0.5 rounded-full">
                Saved ✓
              </span>
            </div>
          )}

          {/* Live GPS Detection Button */}
          <button
            type="button"
            onClick={handleDetectLiveLocation}
            disabled={isDetecting}
            className="w-full mb-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 disabled:opacity-60 text-neutral-950 font-black py-3.5 px-4 rounded-2xl text-xs flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-amber-500/20 active:scale-98 cursor-pointer"
          >
            {isDetecting ? (
              <>
                <Loader2 size={16} className="animate-spin text-neutral-950" />
                <span>Detecting Real Location (GPS)...</span>
              </>
            ) : (
              <>
                <Navigation size={16} className="fill-neutral-950" />
                <span>Use My Current Real Location (Auto-Detect)</span>
              </>
            )}
          </button>

          <div className="relative flex items-center justify-center mb-4">
            <div className="border-t border-neutral-800 w-full"></div>
            <span className="bg-[#121316] px-3 text-[10px] font-bold uppercase tracking-wider text-neutral-500 absolute">
              Or Enter Manually
            </span>
          </div>

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
                  setInputPincode(e.target.value.replace(/\D/g, ''));
                  setError('');
                }}
                placeholder="e.g. 411015, 411057, 110001"
                className="w-full bg-neutral-900 text-white rounded-xl border border-neutral-700 px-4 py-2.5 text-xs focus:outline-none focus:border-amber-400 font-semibold"
              />
              <button
                type="submit"
                disabled={isResolving}
                className="bg-amber-400 hover:bg-amber-500 disabled:opacity-60 text-neutral-950 font-bold px-5 py-2.5 rounded-xl text-xs transition-all shadow-md active:scale-98 cursor-pointer shrink-0 flex items-center gap-1.5"
              >
                {isResolving ? (
                  <>
                    <Loader2 size={13} className="animate-spin" />
                    <span>Checking...</span>
                  </>
                ) : (
                  <span>Apply</span>
                )}
              </button>
            </div>

            {/* Real-time Verified Preview */}
            {livePreview && (
              <div className="mt-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-3 py-1.5 text-xs text-emerald-400 flex items-center gap-1.5 animate-in fade-in">
                <Check size={14} className="shrink-0" />
                <span>
                  Detected: <strong>{livePreview.city}</strong>
                  {livePreview.area && livePreview.area !== livePreview.city ? ` (${livePreview.area})` : ''}
                  {livePreview.state ? `, ${livePreview.state}` : ''}
                </span>
              </div>
            )}

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
                    onClick={() => {
                      setLocation(c.city, c.pincode);
                      showToast(`📍 Destination set to ${c.city} (${c.pincode})`, 'cart');
                      closePincodeModal();
                    }}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      isCurrent
                        ? 'border-amber-400 bg-amber-400/10 text-white font-bold'
                        : 'border-neutral-800 bg-neutral-900/60 hover:bg-neutral-800 text-neutral-300'
                    }`}
                  >
                    <div>
                      <span className="font-semibold block">{c.city}</span>
                      <span className="text-[10px] text-neutral-500">{c.pincode}</span>
                    </div>
                    {isCurrent && <Check size={14} className="text-amber-400" />}
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
