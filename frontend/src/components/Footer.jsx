import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Truck, RefreshCcw, Lock, CheckCircle2 } from 'lucide-react';
import { useUIStore } from '../store/useStore';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useUIStore();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      showToast('Welcome to The Myzon Circle! ✦ Check your inbox for LUXE10 code.');
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#090a0d] text-neutral-300 text-xs border-t border-neutral-800/80 pt-16 pb-12 select-none">
      <div className="max-w-[1500px] mx-auto px-4 lg:px-8">
        
        {/* Newsletter / The Myzon Circle Card */}
        <div className="rounded-3xl bg-[#121316] border border-neutral-800 p-8 sm:p-10 mb-16 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">
              <Sparkles size={13} />
              <span>Private Access</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
              Join The Myzon Circle
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400">
              Receive early allocation notifications on limited vault drops, private showroom events, and 10% off your inaugural order.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row gap-2.5 min-w-[320px] sm:min-w-[420px]">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="bg-neutral-900 text-white placeholder-neutral-500 border border-neutral-700 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-amber-400 flex-1"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-950 font-bold px-6 py-3 rounded-xl text-xs transition-all shadow-md active:scale-98 cursor-pointer shrink-0"
            >
              {subscribed ? 'Subscribed ✓' : 'Join Circle'}
            </button>
          </form>
        </div>

        {/* 4 Clean Columns of Curated Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-16">
          
          {/* Col 1 */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">
              The Studio
            </h4>
            <ul className="space-y-2.5 text-neutral-400">
              <li><Link to="/" className="hover:text-amber-400 transition-colors">Discover Studio</Link></li>
              <li><Link to="/new-arrivals" className="hover:text-amber-400 transition-colors">New Season Drops</Link></li>
              <li><Link to="/deals" className="hover:text-amber-400 transition-colors">The Flash Vault</Link></li>
              <li><Link to="/brands" className="hover:text-amber-400 transition-colors">Curated Ateliers</Link></li>
              <li><Link to="/shop" className="hover:text-amber-400 transition-colors">Full Catalog (200+)</Link></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-neutral-400">
              <li><Link to="/shop?category=electronics" className="hover:text-amber-400 transition-colors">High-Fidelity Audio</Link></li>
              <li><Link to="/shop?category=pooja-samagri" className="hover:text-amber-400 transition-colors">Sacred Vedic Sanctum</Link></li>
              <li><Link to="/shop?category=fashion" className="hover:text-amber-400 transition-colors">Designer Streetwear</Link></li>
              <li><Link to="/shop?category=home-kitchen" className="hover:text-amber-400 transition-colors">Minimalist Sanctuary</Link></li>
              <li><Link to="/shop?maxPrice=999" className="hover:text-amber-400 transition-colors">Under ₹999 Essentials</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">
              Client Concierge
            </h4>
            <ul className="space-y-2.5 text-neutral-400">
              <li><Link to="/track-order" className="hover:text-amber-400 transition-colors">Track Express Shipment</Link></li>
              <li><Link to="/track-order" className="hover:text-amber-400 transition-colors">7-Day White-Glove Exchange</Link></li>
              <li><Link to="/cart" className="hover:text-amber-400 transition-colors">Instant Bag & Checkout</Link></li>
              <li><Link to="/track-order" className="hover:text-amber-400 transition-colors">VIP Concierge Helpline</Link></li>
              <li><Link to="/wishlist" className="hover:text-amber-400 transition-colors">Client Wishlist</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">
              Authenticity & Standards
            </h4>
            <p className="text-neutral-400 leading-relaxed mb-4">
              Every drop showcased in Myzon Studio is directly certified, batch-inspected, and serial-verified for authentic provenance.
            </p>
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs">
              <ShieldCheck size={16} />
              <span>100% Genuine Guaranteed</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="font-black text-white tracking-wider text-sm">MYZON</span>
            <span className="text-neutral-700">•</span>
            <span>Studio Edition © 2026. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-neutral-400">
            <span>Encrypted 256-Bit SSL Checkout</span>
            <span className="text-neutral-700">•</span>
            <span>UPI • RuPay • Visa • Mastercard</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
