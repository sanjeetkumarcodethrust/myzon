import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

export const Navigation = () => {
  const links = [
    { name: 'Home', path: '/', active: true },
    { name: 'Shop', path: '/shop' },
    { name: 'Categories', path: '/categories', hasDropdown: true },
    { name: 'Deals', path: '/deals' },
    { name: 'New Arrivals', path: '/new-arrivals' },
    { name: 'Brands', path: '/brands' },
    { name: 'Track Order', path: '/track-order' },
  ];

  return (
    <div className="bg-white border-b border-gray-100 hidden md:block">
      <div className="max-w-[1600px] mx-auto px-4">
        <ul className="flex items-center gap-8 text-sm font-medium text-gray-700">
          {links.map((link, index) => (
            <li key={index}>
              <Link 
                to={link.path} 
                className={`flex items-center gap-1 py-4 border-b-2 transition-colors ${
                  link.active ? 'border-orange-500 text-orange-500' : 'border-transparent hover:text-orange-500'
                }`}
              >
                {link.name}
                {link.hasDropdown && <ChevronDown size={14} />}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
