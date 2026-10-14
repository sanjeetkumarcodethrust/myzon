import React from 'react';
import { Link } from 'react-router-dom';

export const AmazonQuadCard = ({ title, items, seeMoreLink = '/shop', seeMoreText = 'See all offers' }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-xs hover:shadow-md transition-shadow p-4 flex flex-col justify-between">
      <div>
        <h3 className="font-extrabold text-base md:text-lg text-gray-900 mb-3.5 leading-snug">
          {title}
        </h3>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {items.map((item, idx) => (
            <Link
              key={idx}
              to={item.link || `/shop?q=${encodeURIComponent(item.title)}`}
              className="group flex flex-col cursor-pointer"
            >
              <div className="h-28 bg-gray-50 rounded-lg p-2 border border-gray-100 flex items-center justify-center overflow-hidden group-hover:bg-amber-50/30 transition-colors">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <span className="text-[11px] font-semibold text-gray-700 group-hover:text-amber-600 transition-colors mt-1.5 line-clamp-1">
                {item.title}
              </span>
              {item.subtitle && (
                <span className="text-[10px] text-emerald-600 font-bold">
                  {item.subtitle}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>

      <Link
        to={seeMoreLink}
        className="text-xs font-bold text-amber-600 hover:text-amber-700 hover:underline inline-flex items-center gap-1 mt-auto pt-2 border-t border-gray-50"
      >
        {seeMoreText} →
      </Link>
    </div>
  );
};
