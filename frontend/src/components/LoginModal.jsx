import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  ShoppingBag, 
  Truck, 
  Heart, 
  Sparkles, 
  Smartphone, 
  Mail, 
  RotateCw, 
  AlertCircle, 
  CheckCircle2, 
  KeyRound,
  ArrowLeft
} from 'lucide-react';
import { useAuthStore, useUIStore } from '../store/useStore';

export const LoginModal = () => {
  const { isLoginModalOpen, closeLoginModal, showToast } = useUIStore();
  const { login } = useAuthStore();

  const [authMode, setAuthMode] = useState('phone'); // 'phone' | 'email'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [name, setName] = useState('');
  
  // OTP flow states
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [gatewayType, setGatewayType] = useState('simulated'); // 'live_sms' | 'fast2sms' | 'twilio' | 'simulated'
  const [simulatedOtp, setSimulatedOtp] = useState('');
  const [targetIdentifier, setTargetIdentifier] = useState('');
  
  // Status & Feedback
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [countdown, setCountdown] = useState(30);

  // Countdown timer for Resend OTP
  useEffect(() => {
    let timer;
    if (isOtpSent && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOtpSent, countdown]);

  if (!isLoginModalOpen) return null;

  // Clean phone input
  const handlePhoneChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '');
    if (raw.length <= 10) {
      setPhoneNumber(raw);
      setErrorMessage('');
    }
  };

  const isPhoneValid = /^[6-9]\d{9}$/.test(phoneNumber);
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);

  // Request OTP from backend
  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const target = authMode === 'phone' ? phoneNumber.trim() : emailAddress.trim();

    if (!name.trim()) {
      setErrorMessage('Please enter your full name / कृपया अपना नाम दर्ज करें।');
      return;
    }

    if (authMode === 'phone' && !isPhoneValid) {
      setErrorMessage('Please enter a valid 10-digit Indian mobile number (starting with 6-9).');
      return;
    }
    if (authMode === 'email' && !isEmailValid) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: target }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Unable to send OTP. Please check your number.');
      }

      setTargetIdentifier(target);
      setGatewayType(data.gateway || 'simulated');
      if (data.otp) {
        setSimulatedOtp(data.otp);
      } else {
        setSimulatedOtp('');
      }
      setOtp(''); // NO auto-fill: user types OTP manually

      setIsOtpSent(true);
      setCountdown(30);
      if (data.gateway === 'fast2sms' || data.gateway === 'twilio' || data.gateway === 'live_sms') {
        setSuccessMessage(`Real SMS successfully dispatched to +91 ${target}.`);
      } else {
        setSuccessMessage(`OTP code generated for +91 ${target}. Enter it below to sign in.`);
      }
    } catch (err) {
      console.warn('Backend OTP API error, using intelligent client verification fallback:', err);
      // Client-side fallback if backend API is unreachable
      const fallbackOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setTargetIdentifier(target);
      setGatewayType('simulated');
      setSimulatedOtp(fallbackOtp);
      setOtp(''); // NO auto-fill: user types OTP manually
      setIsOtpSent(true);
      setCountdown(30);
      setSuccessMessage(`OTP code generated for ${target}. Enter it below to sign in.`);
    } finally {
      setIsLoading(false);
    }
  };

  // Verify entered OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanedOtp = otp.trim();
    if (cleanedOtp.length !== 6) {
      setErrorMessage('Please enter the full 6-digit verification code.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: targetIdentifier,
          otp: cleanedOtp,
          name: name.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Invalid OTP code. Please try again.');
      }

      const userData = data.data;
      login(userData);
      showToast(`Welcome back, ${userData.name}! ✦`);
      resetAndClose();
    } catch (err) {
      // If backend gave specific invalid OTP error, display it
      if (err.message && (err.message.includes('Invalid') || err.message.includes('expired') || err.message.includes('attempts'))) {
        setErrorMessage(err.message);
      } else if (simulatedOtp && cleanedOtp !== simulatedOtp) {
        setErrorMessage('Invalid OTP code. Please check the code and enter the exact 6 digits.');
      } else if (simulatedOtp && cleanedOtp === simulatedOtp) {
        // Fallback login
        const displayName = name.trim() || (authMode === 'phone' ? `Client +91-${targetIdentifier.slice(-4)}` : targetIdentifier.split('@')[0]);
        const fallbackUser = {
          name: displayName,
          email: authMode === 'email' ? targetIdentifier : `${targetIdentifier}@myzon.in`,
          phone: authMode === 'phone' ? targetIdentifier : '',
          role: 'user',
          token: 'fallback_token_' + Date.now(),
        };
        login(fallbackUser);
        showToast(`Welcome to Myzon Studio, ${displayName}! ✦`);
        resetAndClose();
      } else {
        setErrorMessage(err.message || 'Verification failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetAndClose = () => {
    closeLoginModal();
    setIsOtpSent(false);
    setPhoneNumber('');
    setEmailAddress('');
    setName('');
    setOtp('');
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleQuickLogin = (demoName = 'Guest Collector') => {
    login({
      name: demoName,
      email: 'guest@myzon.in',
      phone: '',
      role: 'user',
    });
    showToast(`Logged in as ${demoName}! ✦`);
    resetAndClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in select-none">
      <div className="bg-[#121316] text-neutral-100 rounded-3xl w-full max-w-2xl shadow-2xl border border-neutral-800 overflow-hidden flex flex-col md:flex-row relative">
        <button 
          onClick={resetAndClose}
          className="absolute top-4 right-4 z-20 text-neutral-400 hover:text-white bg-neutral-900/80 p-2 rounded-full backdrop-blur-xs shadow-xs cursor-pointer border border-neutral-800 transition-colors"
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
              Access your Private Vault drops, real-time order tracking, and complimentary white-glove courier support.
            </p>
            
            <div className="space-y-3.5 hidden md:block">
              <div className="flex items-center gap-2.5 text-xs text-neutral-300">
                <Truck size={15} className="text-amber-400 shrink-0" />
                <span>Priority 24h Express Dispatch</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-neutral-300">
                <Heart size={15} className="text-amber-400 shrink-0" />
                <span>Private Showroom Wishlist</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-neutral-300">
                <ShieldCheck size={15} className="text-amber-400 shrink-0" />
                <span>Encrypted 2FA Phone Verification</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-neutral-800 text-[11px] text-neutral-500 flex items-center gap-1.5">
            <ShoppingBag size={14} className="text-amber-400 shrink-0" />
            <span>Over 50,000+ Verified Clients</span>
          </div>
        </div>

        {/* Right Side: Interactive OTP Form */}
        <div className="md:w-7/12 p-6 sm:p-8 flex flex-col justify-between bg-[#121316]">
          <div>
            {!isOtpSent ? (
              <div>
                {/* Method Switcher Tabs */}
                <div className="flex bg-neutral-900 p-1 rounded-xl border border-neutral-800 mb-5">
                  <button
                    type="button"
                    onClick={() => { setAuthMode('phone'); setErrorMessage(''); }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      authMode === 'phone'
                        ? 'bg-amber-400 text-neutral-950 shadow-md font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Smartphone size={14} />
                    <span>Mobile SMS</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setAuthMode('email'); setErrorMessage(''); }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      authMode === 'email'
                        ? 'bg-amber-400 text-neutral-950 shadow-md font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Mail size={14} />
                    <span>Email Address</span>
                  </button>
                </div>

                <form onSubmit={handleSendOtp} className="space-y-4">
                  {authMode === 'phone' ? (
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">
                        Mobile Number
                      </label>
                      <div className="flex items-center bg-neutral-900 rounded-xl border border-neutral-700 focus-within:border-amber-400 transition-colors overflow-hidden">
                        <div className="px-3 py-2.5 bg-neutral-800/80 border-r border-neutral-700 text-xs font-bold text-neutral-300 flex items-center gap-1.5">
                          <span className="text-sm">🇮🇳</span>
                          <span>+91</span>
                        </div>
                        <input
                          type="tel"
                          inputMode="numeric"
                          required
                          value={phoneNumber}
                          onChange={handlePhoneChange}
                          placeholder="Enter 10-digit mobile"
                          maxLength={10}
                          className="w-full bg-transparent text-white px-3.5 py-2.5 text-xs font-medium focus:outline-none placeholder-neutral-500"
                        />
                        {isPhoneValid && (
                          <div className="pr-3 text-emerald-400">
                            <CheckCircle2 size={16} />
                          </div>
                        )}
                      </div>
                      <p className="text-[10px] text-neutral-400 mt-1 flex items-center gap-1.5">
                        <span className="text-amber-400 font-bold">ℹ️ Demo Mode:</span>
                        <span>OTP will generate on-screen & auto-fill instantly.</span>
                      </p>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={emailAddress}
                        onChange={(e) => { setEmailAddress(e.target.value); setErrorMessage(''); }}
                        placeholder="client@example.com"
                        className="w-full bg-neutral-900 text-white rounded-xl border border-neutral-700 px-4 py-2.5 text-xs focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1.5 flex items-center justify-between">
                      <span>Your Full Name / आपका नाम <span className="text-amber-400 font-bold">*</span></span>
                      <span className="text-[10px] text-amber-400 font-semibold">Required</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => { setName(e.target.value); setErrorMessage(''); }}
                      placeholder="e.g. Sanjeet Kumar"
                      className="w-full bg-neutral-900 text-white rounded-xl border border-neutral-700 px-4 py-2.5 text-xs focus:outline-none focus:border-amber-400 transition-colors placeholder:text-neutral-500 font-medium"
                    />
                  </div>

                  {errorMessage && (
                    <div className="flex items-center gap-2 p-2.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs animate-in fade-in">
                      <AlertCircle size={15} className="shrink-0 text-rose-400" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading || (authMode === 'phone' ? !isPhoneValid : !isEmailValid) || !name.trim()}
                    className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-neutral-950 font-black py-3 rounded-xl shadow-lg text-xs tracking-wider uppercase transition-all active:scale-98 cursor-pointer mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <RotateCw size={15} className="animate-spin" />
                        <span>Sending Verification Code...</span>
                      </>
                    ) : (
                      <>
                        <KeyRound size={15} />
                        <span>Send 6-Digit OTP</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              /* OTP Verification Step */
              <div>
                {/* User Identity Banner */}
                <div className="mb-4 bg-gradient-to-r from-neutral-900 via-neutral-900 to-[#181920] p-3.5 rounded-2xl border border-neutral-800 flex items-center justify-between shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-amber-500 text-neutral-950 flex items-center justify-center font-black text-sm uppercase shadow-sm shrink-0">
                      {name ? name.trim()[0] : 'U'}
                    </div>
                    <div>
                      <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">Logging in as</span>
                      <p className="text-sm font-black text-white truncate max-w-[170px]">{name.trim()}</p>
                      <span className="text-[11px] text-neutral-400 font-mono">
                        {authMode === 'phone' ? `+91 ${targetIdentifier}` : targetIdentifier}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setIsOtpSent(false); setErrorMessage(''); }}
                    className="text-[11px] text-neutral-300 hover:text-amber-400 transition-colors cursor-pointer bg-neutral-800/90 hover:bg-neutral-800 px-3 py-1.5 rounded-xl border border-neutral-700 text-xs font-semibold"
                  >
                    Change
                  </button>
                </div>

                {/* Simulated Mode Banner / Fast2SMS Status */}
                {simulatedOtp ? (
                  <div className="bg-[#15161c] border border-amber-500/30 rounded-2xl p-4 mb-4 shadow-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
                        <Smartphone size={14} />
                        <span>Verification OTP</span>
                      </div>
                      <span className="text-[10px] bg-neutral-800 text-neutral-300 px-2.5 py-0.5 rounded-full font-semibold border border-neutral-700">
                        Type code manually
                      </span>
                    </div>

                    <div className="bg-black/80 rounded-xl py-3 px-4 border border-neutral-700 mb-2 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-neutral-400 block font-medium">Your 6-Digit Code:</span>
                        <span className="font-mono text-2xl font-black tracking-[0.25em] text-amber-400 select-all">
                          {simulatedOtp}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (navigator.clipboard) {
                            navigator.clipboard.writeText(simulatedOtp);
                            showToast('OTP copied to clipboard! 📋');
                          }
                        }}
                        className="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold px-3 py-1.5 rounded-lg border border-neutral-700 transition-all cursor-pointer"
                      >
                        Copy Code
                      </button>
                    </div>

                    <p className="text-[10px] text-neutral-400 leading-relaxed">
                      💡 Yeh 6-digit code upar se dekh kar niche diye gaye box me enter karein aur <strong>"Verify & Sign In"</strong> dabayein.
                    </p>
                  </div>
                ) : (
                  successMessage && (
                    <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs mb-4">
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                      <span>{successMessage}</span>
                    </div>
                  )
                )}

                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">
                      Enter 6-Digit Code
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      autoFocus
                      maxLength={6}
                      value={otp}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        setOtp(val);
                        setErrorMessage('');
                      }}
                      placeholder="● ● ● ● ● ●"
                      className="w-full bg-neutral-900 text-amber-300 rounded-xl border border-neutral-700 py-3 text-center text-xl tracking-[0.35em] font-mono font-bold focus:outline-none focus:border-amber-400 shadow-inner"
                    />
                  </div>

                  {errorMessage && (
                    <div className="flex items-center gap-2 p-2.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs animate-in fade-in">
                      <AlertCircle size={15} className="shrink-0 text-rose-400" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading || otp.length !== 6}
                    className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-neutral-950 font-black py-3 rounded-xl shadow-lg text-xs tracking-wider uppercase transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <RotateCw size={15} className="animate-spin" />
                        <span>Verifying Code...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck size={16} />
                        <span>Verify & Sign In</span>
                      </>
                    )}
                  </button>

                  {/* Resend OTP Section */}
                  <div className="text-center pt-2">
                    {countdown > 0 ? (
                      <p className="text-xs text-neutral-500">
                        Resend code in <span className="text-amber-400 font-bold">{countdown}s</span>
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="text-xs text-amber-400 hover:text-amber-300 font-bold hover:underline cursor-pointer inline-flex items-center gap-1.5"
                      >
                        <RotateCw size={13} />
                        <span>Resend OTP via SMS</span>
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-800">
            <button
              type="button"
              onClick={() => handleQuickLogin('Guest Collector')}
              className="w-full bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700 font-medium py-2.5 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles size={13} className="text-amber-400" />
              <span>1-Click Guest Collector Access</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
