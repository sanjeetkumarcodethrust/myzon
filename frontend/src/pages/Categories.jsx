import React from 'react';
import { Laptop, Shirt, Home as HomeIcon, HeartPulse, Dumbbell, BookOpen, Puzzle, Car, Grid, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const categoriesData = [
  { 
    name: 'Electronics', 
    icon: <Laptop size={24} />,
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=400&h=300',
    subcategories: ['Laptops', 'Smartphones', 'Audio', 'Cameras'],
    itemCount: '12,450+'
  },
  { 
    name: 'Fashion', 
    icon: <Shirt size={24} />,
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=400&h=300',
    subcategories: ['Men\'s Clothing', 'Women\'s Clothing', 'Shoes', 'Accessories'],
    itemCount: '45,200+'
  },
  { 
    name: 'Home & Kitchen', 
    icon: <HomeIcon size={24} />,
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&q=80&w=400&h=300',
    subcategories: ['Furniture', 'Decor', 'Appliances', 'Cookware'],
    itemCount: '8,900+'
  },
  { 
    name: 'Beauty & Health', 
    icon: <HeartPulse size={24} />,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=400&h=300',
    subcategories: ['Skincare', 'Makeup', 'Personal Care', 'Supplements'],
    itemCount: '6,100+'
  },
  { 
    name: 'Sports & Outdoors', 
    icon: <Dumbbell size={24} />,
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=400&h=300',
    subcategories: ['Fitness Equipment', 'Outdoor Gear', 'Sportswear', 'Cycling'],
    itemCount: '3,800+'
  },
  { 
    name: 'Books & Stationery', 
    icon: <BookOpen size={24} />,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400&h=300',
    subcategories: ['Fiction', 'Non-Fiction', 'Academic', 'Office Supplies'],
    itemCount: '15,000+'
  },
  { 
    name: 'Toys & Games', 
    icon: <Puzzle size={24} />,
    image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&q=80&w=400&h=300',
    subcategories: ['Action Figures', 'Board Games', 'Educational', 'Puzzles'],
    itemCount: '4,200+'
  },
  { 
    name: 'Automotive', 
    icon: <Car size={24} />,
    image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&q=80&w=400&h=300',
    subcategories: ['Car Accessories', 'Bike Parts', 'Car Care', 'Helmets'],
    itemCount: '2,900+'
  }
];

export const Categories = () => {
  return (
    <div className="max-w-[1600px] mx-auto px-4 py-8">
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Explore All Categories</h1>
        <p className="text-gray-500">Discover millions of products across various categories. From electronics to fashion, we have everything you need.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categoriesData.map((category, idx) => (
          <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="h-48 relative overflow-hidden">
              <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold">{category.name}</h3>
                </div>
              </div>
            </div>
            
            <div className="p-5">
              <p className="text-xs text-orange-500 font-bold mb-3">{category.itemCount} Products</p>
              <ul className="space-y-2 mb-6">
                {category.subcategories.map((sub, i) => (
                  <li key={i}>
                    <Link to={`/shop?category=${sub.toLowerCase()}`} className="text-gray-600 hover:text-orange-500 flex items-center gap-1 text-sm transition-colors">
                      <ChevronRight size={14} className="text-gray-400" />
                      {sub}
                    </Link>
                  </li>
                ))}
              </ul>
              
              <Link to={`/shop?category=${category.name.toLowerCase()}`} className="block w-full text-center bg-gray-50 text-gray-900 hover:bg-orange-500 hover:text-white font-bold py-2.5 rounded-lg transition-colors">
                View All in {category.name}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
