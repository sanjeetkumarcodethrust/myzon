import React, { useState } from 'react';
import { X, ShieldCheck, ShoppingBag, Truck, Heart } from 'lucide-react';
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
    showToast(`Welcome back, ${displayName}! 🎉`);
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
    showToast(`Logged in as ${demoName}!`);
    closeLoginModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col md:flex-row relative">
        <button 
          onClick={closeLoginModal}
          className="absolute top-4 right-4 z-20 text-gray-500 hover:text-gray-900 bg-white/80 p-1.5 rounded-full backdrop-blur-xs shadow-xs"
        >
          <X size={20} />
        </button>

        {/* Left Side: Flipkart Signature Blue Banner */}
        <div className="md:w-5/12 bg-gradient-to-br from-[#2874f0] to-[#1c5dc7] text-white p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-black mb-3">Login to Myzon</h2>
            <p className="text-blue-100 text-sm leading-relaxed mb-6">
              Get access to your Orders, Wishlist and Personalized Recommendations.
            </p>
            
            <div className="space-y-4 hidden md:block">
              <div className="flex items-center gap-3 text-xs text-blue-50">
                <Truck size={16} className="text-[#ffe500]" />
                <span>Track orders & easy returns</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-blue-50">
                <Heart size={16} className="text-[#ffe500]" />
                <span>Save favorites in your wishlist</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-blue-50">
                <ShieldCheck size={16} className="text-[#ffe500]" />
                <span>100% Secure & safe payments</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-blue-400/40 text-[11px] text-blue-100 flex items-center gap-1.5">
            <ShoppingBag size={14} className="text-[#ffe500]" />
            <span>Over 10 Million+ Satisfied Customers</span>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-7/12 p-8 flex flex-col justify-between">
          <div>
            {!isOtpSent ? (
              <form onSubmit={handleContinue} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Enter Email / Mobile Number
                  </label>
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Enter Email or 10-digit Mobile Number"
                    className="w-full border-b-2 border-gray-300 py-2.5 text-sm focus:outline-none focus:border-[#2874f0] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Your Full Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sanjeev"
                    className="w-full border-b-2 border-gray-300 py-2.5 text-sm focus:outline-none focus:border-[#2874f0] transition-colors"
                  />
                </div>

                <p className="text-[11px] text-gray-500 leading-normal pt-2">
                  By continuing, you agree to Myzon's{' '}
                  <span className="text-[#2874f0] font-semibold cursor-pointer">Terms of Use</span> and{' '}
                  <span className="text-[#2874f0] font-semibold cursor-pointer">Privacy Policy</span>.
                </p>

                <button
                  type="submit"
                  className="w-full bg-[#fb641b] hover:bg-[#e85814] text-white font-bold py-3 rounded-md shadow-md text-sm transition-all transform active:scale-98 cursor-pointer mt-2"
                >
                  Request OTP / Continue
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerify} className="space-y-4">
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-xs text-[#2874f0]">
                  OTP has been sent to <strong>{identifier}</strong>. (Enter any 6 digits to verify)
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Enter 6-Digit OTP
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="e.g. 123456"
                    className="w-full border-b-2 border-gray-300 py-2.5 text-center text-lg tracking-widest font-bold focus:outline-none focus:border-[#2874f0]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#fb641b] hover:bg-[#e85814] text-white font-bold py-3 rounded-md shadow-md text-sm transition-all cursor-pointer"
                >
                  Verify & Login
                </button>

                <button
                  type="button"
                  onClick={() => setIsOtpSent(false)}
                  className="w-full text-center text-xs text-gray-500 hover:text-gray-800"
                >
                  ← Change number or email
                </button>
              </form>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center mb-2">Want a quick instant test login?</p>
            <button
              type="button"
              onClick={() => handleQuickLogin('Sanjeev')}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 rounded-md text-xs transition-colors"
            >
              1-Click Demo Login as Sanjeev
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
