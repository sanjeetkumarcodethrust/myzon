import React from 'react';
import { CreditCard, Sparkles, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BankOfferRibbon = () => {
  return (
    <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-md mb-8 flex flex-col md:flex-row items-center justify-between gap-4 border border-blue-800">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-amber-400 text-gray-950 flex items-center justify-center shrink-0 shadow-md">
          <CreditCard size={24} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-[#febd69] text-gray-950 text-[10px] font-black px-2 py-0.5 rounded uppercase">
              Festival Offer
            </span>
            <span className="text-sm font-bold text-amber-300">Instant Bank Savings</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-100 font-medium mt-0.5">
            <strong>10% Instant Discount up to ₹1,500</strong> on SBI & HDFC Credit/Debit Cards | Flat ₹150 Cashback on UPI
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="text-right hidden sm:block">
          <span className="text-[10px] text-gray-300 block">Min. Transaction ₹4,999</span>
          <span className="text-xs font-bold text-amber-300">No Cost EMI from ₹499/mo</span>
        </div>
        <Link
          to="/deals"
          className="bg-white hover:bg-gray-100 text-gray-900 text-xs font-bold px-4 py-2.5 rounded-lg transition-colors shadow-xs"
        >
          Check All Offers
        </Link>
      </div>
    </div>
  );
};
