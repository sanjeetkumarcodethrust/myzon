import React from 'react';
import { Star } from 'lucide-react';

export const TopBar = () => {
  return (
    <div className="bg-gray-900 text-white text-xs py-2 px-4 flex justify-center items-center gap-2">
      <Star className="text-orange-500 h-4 w-4 fill-current" />
      <span className="font-medium">Big Summer Sale is Live! Get up to 50% OFF on selected items.</span>
      <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-xs font-bold transition-colors">
        Shop Now
      </button>
    </div>
  );
};
