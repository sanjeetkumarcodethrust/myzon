import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('myzon_user')) || null,
  login: (userData) => {
    localStorage.setItem('myzon_user', JSON.stringify(userData));
    set({ user: userData });
  },
  logout: () => {
    localStorage.removeItem('myzon_user');
    set({ user: null });
  },
}));

export const useCartStore = create((set) => ({
  cartItems: [],
  setCartItems: (items) => set({ cartItems: items }),
  addToCart: (item) => set((state) => {
    const exists = state.cartItems.find(i => i.id === item.id);
    if (exists) {
      return { cartItems: state.cartItems.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i) };
    }
    return { cartItems: [...state.cartItems, { ...item, qty: 1 }] };
  }),
  removeFromCart: (productId) => set((state) => ({
    cartItems: state.cartItems.filter(i => i.id !== productId)
  })),
  clearCart: () => set({ cartItems: [] }),
  updateQuantity: (productId, qty) => set((state) => ({
    cartItems: state.cartItems.map(i => i.id === productId ? { ...i, qty } : i).filter(i => i.qty > 0)
  }))
}));

export const useWishlistStore = create((set) => ({
  wishlistItems: [],
  addToWishlist: (item) => set((state) => {
    const exists = state.wishlistItems.find(i => i.id === item.id);
    if (exists) {
      return { wishlistItems: state.wishlistItems.filter(i => i.id !== item.id) };
    }
    return { wishlistItems: [...state.wishlistItems, item] };
  }),
  removeFromWishlist: (productId) => set((state) => ({
    wishlistItems: state.wishlistItems.filter(i => i.id !== productId)
  })),
  clearWishlist: () => set({ wishlistItems: [] }),
}));
