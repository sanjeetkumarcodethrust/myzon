import React from 'react';
import { Truck, Gem, ShieldCheck, RefreshCcw, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BankOfferRibbon = () => {
  const perks = [
    {
      icon: <Truck size={20} className="text-amber-400" />,
      title: 'Express Dispatch',
      description: 'Under 24hr courier to 15,000+ pincodes across India.'
    },
    {
      icon: <Gem size={20} className="text-amber-400" />,
      title: 'The Vault Rewards',
      description: 'Extra 10% instant savings on HDFC & ICICI cards + VIP credits.'
    },
    {
      icon: <ShieldCheck size={20} className="text-amber-400" />,
      title: 'Atelier Certified',
      description: '100% genuine products directly sourced from authorized makers.'
    },
    {
      icon: <RefreshCcw size={20} className="text-amber-400" />,
      title: 'Concierge Exchange',
      description: '7-day seamless doorstep returns & dedicated client support.'
    }
  ];

  return (
    <div className="mb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {perks.map((perk, idx) => (
          <div
            key={idx}
            className="rounded-2xl bg-[#121316] border border-neutral-800/80 p-5 flex items-start gap-4 hover:border-amber-500/30 transition-all shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
              {perk.icon}
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-0.5">{perk.title}</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">{perk.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
