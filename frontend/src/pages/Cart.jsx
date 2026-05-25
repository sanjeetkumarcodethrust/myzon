import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingCart, Heart } from 'lucide-react';
import { useCartStore, useWishlistStore } from '../store/useStore';

export const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCartStore();
  const { addToWishlist, wishlistItems } = useWishlistStore();
  
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.qty), 0);

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-8">
      <h1 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-3">
        <ShoppingCart size={32} className="text-orange-500" />
        Shopping Cart
      </h1>

      {cartItems.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-gray-100 bg-gray-50 text-sm font-bold text-gray-700">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
              
              <div className="divide-y divide-gray-100">
                {cartItems.map(item => (
                  <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center">
                    <div className="col-span-1 md:col-span-6 flex gap-4">
                      <div className="h-24 w-24 bg-gray-50 rounded-lg p-2 border border-gray-100 flex-shrink-0">
                        <img src={item.image} alt={item.title} className="h-full w-full object-contain" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h3 className="font-bold text-gray-900 line-clamp-2">{item.title}</h3>
                        <p className="text-sm text-gray-500 mb-2">{item.brand}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-600 flex items-center gap-1 font-medium"
                          >
                            <Trash2 size={14} /> Remove
                          </button>
                          <button 
                            onClick={() => addToWishlist(item)}
                            className={`${wishlistItems.find(i => i.id === item.id) ? 'text-orange-500' : 'text-gray-500 hover:text-orange-500'} flex items-center gap-1 font-medium`}
                          >
                            <Heart size={14} className={wishlistItems.find(i => i.id === item.id) ? 'fill-current' : ''} />
                            Save for later
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-span-1 md:col-span-2 text-center font-bold text-gray-900 md:block flex justify-between">
                      <span className="md:hidden text-gray-500 font-normal">Price:</span>
                      ₹{item.price.toLocaleString()}
                    </div>
                    
                    <div className="col-span-1 md:col-span-2 flex justify-center">
                      <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-1.5 border border-gray-200">
                        <button onClick={() => updateQuantity(item.id, item.qty - 1)} className="text-gray-500 hover:text-orange-500 font-bold">-</button>
                        <span className="w-6 text-center font-bold">{item.qty}</span>
                        <button onClick={() => updateQuantity(item.id, item.qty + 1)} className="text-gray-500 hover:text-orange-500 font-bold">+</button>
                      </div>
                    </div>
                    
                    <div className="col-span-1 md:col-span-2 text-right font-black text-gray-900 md:block flex justify-between">
                      <span className="md:hidden text-gray-500 font-normal">Total:</span>
                      ₹{(item.price * item.qty).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-96 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Order Summary</h2>
              
              <div className="flex flex-col gap-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="font-bold text-gray-900">₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping Estimate</span>
                  <span className="font-bold text-green-500">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax Estimate</span>
                  <span className="font-bold text-gray-900">₹0</span>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Order Total</span>
                  <span className="text-2xl font-black text-gray-900">₹{cartTotal.toLocaleString()}</span>
                </div>
              </div>
              
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-lg transition-colors text-lg shadow-sm">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-16 text-center">
          <div className="w-24 h-24 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't added anything to your cart yet. Browse our categories and discover our best deals!</p>
          <Link to="/" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors">
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
};
