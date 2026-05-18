import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useAuthStore, useCartStore } from './store/useStore';
import { ShoppingCart, User, Menu, Search } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const { cartItems } = useCartStore();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600 tracking-tighter">Myzon</Link>
          </div>
          
          <div className="hidden md:flex flex-1 mx-8">
            <div className="relative w-full max-w-xl mx-auto">
              <input type="text" placeholder="Search products..." className="w-full bg-gray-100 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/cart" className="relative text-gray-700 hover:text-indigo-600 transition">
              <ShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition">
                  <User size={24} />
                  <span className="hidden sm:block font-medium">{user.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                  <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Orders</Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="block px-4 py-2 text-sm text-indigo-600 font-medium hover:bg-gray-100">Admin Dashboard</Link>
                  )}
                  <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Logout</button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="text-gray-700 font-medium hover:text-indigo-600 transition">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 sm:p-16 text-white shadow-xl flex flex-col items-center text-center">
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 tracking-tight">Welcome to Myzon</h1>
        <p className="text-lg sm:text-xl opacity-90 max-w-2xl mb-8">Discover the best products at unbeatable prices. Shop the latest electronics, fashion, and more with fast delivery.</p>
        <button className="bg-white text-indigo-600 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-50 transition transform hover:-translate-y-1">Shop Now</button>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1,2,3,4].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden group border border-gray-100">
              <div className="h-64 bg-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition z-10" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-indigo-600 z-20">Sale</div>
              </div>
              <div className="p-5">
                <p className="text-xs text-gray-500 mb-1 font-medium">Category</p>
                <h3 className="font-bold text-lg text-gray-900 mb-2 truncate">Awesome Product {i}</h3>
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <span className="text-xl font-black text-gray-900">$99.99</span>
                    <span className="text-sm text-gray-400 line-through ml-2">$129.99</span>
                  </div>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full transition transform hover:scale-110 shadow-md">
                    <ShoppingCart size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-gray-900 text-white py-12 mt-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h3 className="text-2xl font-bold text-indigo-400 tracking-tighter mb-4">Myzon</h3>
        <p className="text-gray-400 text-sm">Your premium destination for modern shopping. Quality products, fast delivery.</p>
      </div>
      <div>
        <h4 className="font-bold mb-4">Shop</h4>
        <ul className="space-y-2 text-sm text-gray-400">
          <li><a href="#" className="hover:text-white transition">Electronics</a></li>
          <li><a href="#" className="hover:text-white transition">Fashion</a></li>
          <li><a href="#" className="hover:text-white transition">Home & Kitchen</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-4">Support</h4>
        <ul className="space-y-2 text-sm text-gray-400">
          <li><a href="#" className="hover:text-white transition">Help Center</a></li>
          <li><a href="#" className="hover:text-white transition">Track Order</a></li>
          <li><a href="#" className="hover:text-white transition">Returns</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-4">Stay Connected</h4>
        <p className="text-sm text-gray-400 mb-4">Subscribe to our newsletter for updates.</p>
        <div className="flex">
          <input type="email" placeholder="Email address" className="bg-gray-800 text-white px-4 py-2 rounded-l-md w-full focus:outline-none" />
          <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-r-md transition font-medium">Join</button>
        </div>
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<div className="flex justify-center py-20"><h2 className="text-2xl font-bold">Login Page</h2></div>} />
            <Route path="/cart" element={<div className="flex justify-center py-20"><h2 className="text-2xl font-bold">Cart Page</h2></div>} />
            <Route path="/product/:id" element={<div className="flex justify-center py-20"><h2 className="text-2xl font-bold">Product Details</h2></div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
