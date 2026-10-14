import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronUp, ShieldCheck, RefreshCcw, Truck, Award, Globe, HelpCircle } from 'lucide-react';
import { useUIStore } from '../store/useStore';

export const Footer = () => {
  const { language, setLanguage } = useUIStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#121316] text-white text-xs mt-12 border-t border-neutral-800">
      {/* Back to top bar */}
      <button
        onClick={scrollToTop}
        className="w-full bg-[#1c1d22] hover:bg-[#262830] py-3.5 text-center font-bold text-amber-400 hover:text-amber-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer border-b border-neutral-800"
      >
        <ChevronUp size={16} />
        Back to top
      </button>

      {/* Trust Badges Strip */}
      <div className="bg-[#0e0f12] border-b border-neutral-800 py-6">
        <div className="max-w-[1500px] mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-400/20">
              <Truck size={22} className="text-amber-400" />
            </div>
            <div>
              <p className="font-bold text-sm text-gray-100">Free & Fast Delivery</p>
              <p className="text-[11px] text-gray-400">On all eligible orders above ₹499</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
              <RefreshCcw size={22} className="text-emerald-400" />
            </div>
            <div>
              <p className="font-bold text-sm text-gray-100">7 Days Easy Replacement</p>
              <p className="text-[11px] text-gray-400">Hassle-free return & replacement</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
              <ShieldCheck size={22} className="text-amber-400" />
            </div>
            <div>
              <p className="font-bold text-sm text-gray-100">100% Secure Payments</p>
              <p className="text-[11px] text-gray-400">UPI, Cards, NetBanking & COD</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/20">
              <Award size={22} className="text-purple-400" />
            </div>
            <div>
              <p className="font-bold text-sm text-gray-100">100% Genuine Products</p>
              <p className="text-[11px] text-gray-400">Brand authorized and assured</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main 4 Columns Links */}
      <div className="max-w-[1500px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <h4 className="text-sm font-bold text-white mb-3">Get to Know Us</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/" className="hover:underline">About Myzon</Link></li>
              <li><Link to="/brands" className="hover:underline">Careers at Myzon</Link></li>
              <li><Link to="/deals" className="hover:underline">Press Releases</Link></li>
              <li><Link to="/shop" className="hover:underline">Myzon Science</Link></li>
              <li><Link to="/shop" className="hover:underline">Corporate Information</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-3">Connect with Us</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:underline">Facebook</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:underline">Twitter / X</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:underline">Instagram</a></li>
              <li><a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:underline">YouTube</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-3">Make Money with Us</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/shop" className="hover:underline text-amber-400 font-bold">Sell on Myzon</Link></li>
              <li><Link to="/shop" className="hover:underline">Sell under Myzon Accelerator</Link></li>
              <li><Link to="/shop" className="hover:underline">Protect and Build Your Brand</Link></li>
              <li><Link to="/shop" className="hover:underline">Myzon Global Selling</Link></li>
              <li><Link to="/shop" className="hover:underline">Become an Affiliate Partner</Link></li>
              <li><Link to="/shop" className="hover:underline">Fulfilment by Myzon (FBM)</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-3">Let Us Help You</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/track-order" className="hover:underline">Your Account & Orders</Link></li>
              <li><Link to="/track-order" className="hover:underline">Returns & Replacements</Link></li>
              <li><Link to="/track-order" className="hover:underline">Track Your Packages</Link></li>
              <li><Link to="/cart" className="hover:underline">100% Purchase Protection</Link></li>
              <li><Link to="/track-order" className="hover:underline">Help & Customer Support</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Brand & Language Switcher Bar */}
      <div className="border-t border-neutral-800 py-6 bg-[#16181e]">
        <div className="max-w-[1500px] mx-auto px-4 flex flex-wrap items-center justify-center gap-6">
          <Link to="/" className="flex items-center gap-1.5">
            <span className="text-2xl font-black text-white tracking-tight">
              My<span className="text-amber-400">zon</span>
            </span>
            <span className="text-[10px] bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 font-black px-1.5 py-0.5 rounded ml-1">.in</span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 border border-neutral-700 rounded px-3 py-1 bg-[#0e0f12] text-gray-300">
              <Globe size={14} className="text-gray-400" />
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-xs text-gray-200 focus:outline-none cursor-pointer"
              >
                <option value="EN" className="bg-neutral-900 text-white">English - EN</option>
                <option value="HI" className="bg-neutral-900 text-white">हिन्दी - HI</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 border border-neutral-700 rounded px-3 py-1 bg-[#0e0f12] text-gray-300">
              <span className="text-sm">🇮🇳</span>
              <span className="text-xs">India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Registered Office & Bottom Strip */}
      <div className="bg-[#0a0b0d] py-8 text-gray-400 border-t border-neutral-900 text-[11px]">
        <div className="max-w-[1500px] mx-auto px-4 text-center space-y-3">
          <div className="flex flex-wrap justify-center gap-4 text-gray-400">
            <Link to="/" className="hover:underline">Conditions of Use & Sale</Link>
            <span>•</span>
            <Link to="/" className="hover:underline">Privacy Notice</Link>
            <span>•</span>
            <Link to="/" className="hover:underline">Interest-Based Ads</Link>
            <span>•</span>
            <Link to="/track-order" className="hover:underline">Help & Grievance Officer</Link>
          </div>

          <p className="text-gray-500 max-w-3xl mx-auto leading-relaxed">
            Registered Office: Myzon Retail India Pvt. Ltd., Alyssa Tech Park, Outer Ring Road, Bengaluru, Karnataka - 560103. 
            CIN: U51109KA2012PTC066107 | Telephone: 1800-202-9898 (Toll Free)
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs text-gray-400 font-semibold">
            <span>Payment Methods:</span>
            <span className="bg-neutral-800 px-2 py-0.5 rounded text-white text-[10px]">UPI</span>
            <span className="bg-neutral-800 px-2 py-0.5 rounded text-white text-[10px]">VISA</span>
            <span className="bg-neutral-800 px-2 py-0.5 rounded text-white text-[10px]">MasterCard</span>
            <span className="bg-neutral-800 px-2 py-0.5 rounded text-white text-[10px]">RuPay</span>
            <span className="bg-neutral-800 px-2 py-0.5 rounded text-white text-[10px]">NetBanking</span>
            <span className="bg-neutral-800 px-2 py-0.5 rounded text-white text-[10px]">Cash On Delivery</span>
          </div>

          <p className="text-gray-500 pt-2">
            © 2026, Myzon.com, Inc. or its affiliates. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
