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
    const exists = state.cartItems.find(i => i.product === item.product);
    if (exists) {
      return { cartItems: state.cartItems.map(i => i.product === item.product ? { ...i, quantity: i.quantity + item.quantity } : i) };
    }
    return { cartItems: [...state.cartItems, item] };
  }),
  removeFromCart: (productId) => set((state) => ({
    cartItems: state.cartItems.filter(i => i.product !== productId)
  })),
  clearCart: () => set({ cartItems: [] }),
}));
