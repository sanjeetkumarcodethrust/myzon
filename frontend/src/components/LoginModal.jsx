import React, { useState } from 'react';
import { X, ShieldCheck, ShoppingBag, Truck, Heart, Sparkles } from 'lucide-react';
import { useAuthStore, useUIStore } from '../store/useStore';

export const LoginModal = () => {
  const { isLoginModalOpen, closeLoginModal, showToast } = useUIStore();
  const { login } = useAuthStore();
  const [identifier, setIdentifier] = useState('');
  const [name, setName] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  if (!isLoginModalOpen) return null;

  const handleContinue = (e) => {
    e.preventDefault();
    if (!identifier.trim()) return;
    setIsOtpSent(true);
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const displayName = name.trim() || identifier.split('@')[0] || 'Sanjeev';
    login({
      name: displayName,
      email: identifier.includes('@') ? identifier : `${displayName.toLowerCase()}@myzon.in`,
      phone: !identifier.includes('@') ? identifier : '9876543210'
    });
    showToast(`Welcome to Myzon Studio, ${displayName}! ✦`);
    closeLoginModal();
    setIsOtpSent(false);
    setIdentifier('');
    setName('');
  };

  const handleQuickLogin = (demoName = 'Sanjeev Kumar') => {
    login({
      name: demoName,
      email: `${demoName.toLowerCase().replace(' ', '.')}@example.com`,
      phone: '9876543210'
    });
    showToast(`Logged in as ${demoName}! ✦`);
    closeLoginModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in select-none">
      <div className="bg-[#121316] text-neutral-100 rounded-3xl w-full max-w-2xl shadow-2xl border border-neutral-800 overflow-hidden flex flex-col md:flex-row relative">
        <button 
          onClick={closeLoginModal}
          className="absolute top-4 right-4 z-20 text-neutral-400 hover:text-white bg-neutral-900/80 p-1.5 rounded-full backdrop-blur-xs shadow-xs cursor-pointer border border-neutral-800"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Left Side: Obsidian & Champagne Gold Banner */}
        <div className="md:w-5/12 bg-gradient-to-br from-[#171821] via-[#121318] to-[#0a0b0d] border-r border-neutral-800 text-white p-7 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-amber-400 text-[10px] font-bold uppercase tracking-widest mb-3">
              <Sparkles size={12} />
              <span>The Myzon Circle</span>
            </div>
            <h2 className="text-2xl font-black mb-3">Client Access</h2>
            <p className="text-neutral-400 text-xs leading-relaxed mb-6">
              Access your Private Vault drops, order tracking, and complimentary white-glove courier support.
            </p>
            
            <div className="space-y-3.5 hidden md:block">
              <div className="flex items-center gap-2.5 text-xs text-neutral-300">
                <Truck size={15} className="text-amber-400" />
                <span>Priority 24h Express Dispatch</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-neutral-300">
                <Heart size={15} className="text-amber-400" />
                <span>Private Showroom Wishlist</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-neutral-300">
                <ShieldCheck size={15} className="text-amber-400" />
                <span>Certified Provenance Guaranteed</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-neutral-800 text-[11px] text-neutral-500 flex items-center gap-1.5">
            <ShoppingBag size={14} className="text-amber-400" />
            <span>Over 50,000+ Verified Clients</span>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-7/12 p-7 sm:p-8 flex flex-col justify-between bg-[#121316]">
          <div>
            {!isOtpSent ? (
              <form onSubmit={handleContinue} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">
                    Email or Mobile Number
                  </label>
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Enter email or 10-digit mobile"
                    className="w-full bg-neutral-900 text-white rounded-xl border border-neutral-700 px-4 py-2.5 text-xs focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sanjeev"
                    className="w-full bg-neutral-900 text-white rounded-xl border border-neutral-700 px-4 py-2.5 text-xs focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <p className="text-[10px] text-neutral-500 leading-normal pt-1">
                  By joining, you accept Myzon's Privacy Guarantee & Client Terms.
                </p>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-950 font-bold py-3 rounded-xl shadow-md text-xs transition-all active:scale-98 cursor-pointer mt-2"
                >
                  Request Verification Code
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerify} className="space-y-4">
                <div className="bg-amber-400/10 border border-amber-500/30 rounded-xl p-3 text-xs text-amber-300 font-medium">
                  Verification code sent to <strong>{identifier}</strong>. (Enter any 6 digits)
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">
                    Enter 6-Digit Code
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="123456"
                    className="w-full bg-neutral-900 text-white rounded-xl border border-neutral-700 py-2.5 text-center text-lg tracking-widest font-bold focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-950 font-bold py-3 rounded-xl shadow-md text-xs transition-all cursor-pointer"
                >
                  Verify & Enter Studio
                </button>

                <button
                  type="button"
                  onClick={() => setIsOtpSent(false)}
                  className="w-full text-center text-xs text-neutral-500 hover:text-neutral-300"
                >
                  ← Change email or number
                </button>
              </form>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-800">
            <button
              type="button"
              onClick={() => handleQuickLogin('Sanjeev')}
              className="w-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 font-semibold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
            >
              1-Click Demo Login as Sanjeev
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
