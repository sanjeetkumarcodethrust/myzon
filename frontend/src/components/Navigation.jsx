import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Laptop, Shirt, Home as HomeIcon, HeartPulse, Dumbbell, BookOpen, Puzzle } from 'lucide-react';

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

  const categories = [
    { name: 'Electronics', path: '/shop?category=electronics', icon: <Laptop size={16} /> },
    { name: 'Fashion', path: '/shop?category=fashion', icon: <Shirt size={16} /> },
    { name: 'Home & Kitchen', path: '/shop?category=home-kitchen', icon: <HomeIcon size={16} /> },
    { name: 'Beauty & Health', path: '/shop?category=beauty-health', icon: <HeartPulse size={16} /> },
    { name: 'Sports & Outdoors', path: '/shop?category=sports-outdoors', icon: <Dumbbell size={16} /> },
    { name: 'Books & Stationery', path: '/shop?category=books-stationery', icon: <BookOpen size={16} /> },
    { name: 'Toys & Games', path: '/shop?category=toys-games', icon: <Puzzle size={16} /> },
  ];

  return (
    <div className="bg-white border-b border-gray-100 hidden md:block">
      <div className="max-w-[1600px] mx-auto px-4">
        <ul className="flex items-center gap-8 text-sm font-medium text-gray-700">
          {links.map((link, index) => (
            <li key={index} className="relative group">
              <Link 
                to={link.path} 
                className={`flex items-center gap-1 py-4 border-b-2 transition-colors ${
                  link.active ? 'border-orange-500 text-orange-500' : 'border-transparent hover:text-orange-500'
                }`}
              >
                {link.name}
                {link.hasDropdown && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />}
              </Link>

              {link.hasDropdown && (
                <div className="absolute top-full left-0 w-64 bg-white border border-gray-100 shadow-xl shadow-gray-200/50 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden transform translate-y-2 group-hover:translate-y-0">
                  <ul className="py-2">
                    {categories.map((cat, idx) => (
                      <li key={idx}>
                        <Link to={cat.path} className="flex items-center gap-3 px-4 py-2.5 hover:bg-orange-50 hover:text-orange-500 text-gray-600 transition-colors">
                          <span className="text-gray-400">{cat.icon}</span>
                          <span className="text-sm font-medium">{cat.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-gray-100 bg-gray-50 p-3">
                    <Link to="/categories" className="text-xs font-bold text-orange-500 hover:underline block text-center">
                      View All Categories
                    </Link>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
