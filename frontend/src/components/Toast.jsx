import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ShoppingCart, Heart, X } from 'lucide-react';
import { useUIStore, useCartStore } from '../store/useStore';

export const Toast = () => {
  const { toast, hideToast } = useUIStore();
  const { cartItems } = useCartStore();

  if (!toast.show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-gray-900 text-white rounded-xl shadow-2xl p-4 flex items-center justify-between border border-gray-700 animate-slideUp">
      <div className="flex items-center gap-3">
        {toast.type === 'cart' ? (
          <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 size={20} />
          </div>
        ) : (
          <div className="w-9 h-9 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
            <Heart size={20} className="fill-current" />
          </div>
        )}
        <div>
          <p className="text-xs font-semibold text-gray-200">{toast.message}</p>
          {toast.type === 'cart' && (
            <Link 
              to="/cart" 
              onClick={hideToast}
              className="text-xs text-amber-400 font-bold hover:underline inline-flex items-center gap-1 mt-0.5"
            >
              <ShoppingCart size={12} /> View Cart ({cartItems.length} items) →
            </Link>
          )}
        </div>
      </div>
      <button 
        onClick={hideToast}
        className="text-gray-400 hover:text-white p-1 rounded-md shrink-0 ml-2"
      >
        <X size={16} />
      </button>
    </div>
  );
};
