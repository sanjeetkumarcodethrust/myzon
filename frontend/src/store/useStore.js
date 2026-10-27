import { create } from 'zustand';

const getInitialUser = () => {
  try {
    const raw = localStorage.getItem('myzon_user');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && (parsed.email === 'sanjeev@example.com' || parsed.name === 'Sanjeev')) {
      localStorage.removeItem('myzon_user');
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
};

export const useAuthStore = create((set) => ({
  user: getInitialUser(),
  login: (userData) => {
    localStorage.setItem('myzon_user', JSON.stringify(userData));
    set({ user: userData });
  },
  logout: () => {
    localStorage.removeItem('myzon_user');
    set({ user: null });
  },
}));

const getInitialLocation = () => {
  try {
    const raw = localStorage.getItem('myzon_location');
    if (!raw) return { city: '', pincode: '' };
    const parsed = JSON.parse(raw);
    if (!parsed) return { city: '', pincode: '' };

    // Reset old dummy or invalid data
    if (parsed.city === 'New Delhi' && parsed.pincode === '110001') {
      localStorage.removeItem('myzon_location');
      return { city: '', pincode: '' };
    }

    // Auto-fix previously corrupted "India", "India Delivery", or raw "District" values
    if (
      parsed.city === 'India Delivery' ||
      parsed.city === 'India' ||
      !parsed.city ||
      /district/i.test(parsed.city) ||
      /distric/i.test(parsed.city)
    ) {
      const cleanCity = (parsed.city || '')
        .replace(/\s+(District|Subdistrict|Distric|Dist\.?)$/i, '')
        .trim();
      if (cleanCity && cleanCity.toLowerCase() !== 'india') {
        const fixed = { city: cleanCity, pincode: parsed.pincode || '' };
        localStorage.setItem('myzon_location', JSON.stringify(fixed));
        return fixed;
      }
      localStorage.removeItem('myzon_location');
      return { city: '', pincode: '' };
    }

    return parsed;
  } catch {
    return { city: '', pincode: '' };
  }
};

export const useUIStore = create((set) => {
  const savedLocation = getInitialLocation();
  return {
    location: savedLocation,
    isPincodeModalOpen: false,
    isLoginModalOpen: false,
    isDrawerOpen: false,
    language: 'EN',
    toast: { show: false, message: '', type: 'cart' },
    isDetectingLocation: false,
    
    setIsDetectingLocation: (bool) => set({ isDetectingLocation: bool }),
    setLocation: (city, pincode) => {
      let resolvedCity = (city || '')
        .replace(/\s+(District|Subdistrict|Distric|Dist\.?)$/i, '')
        .trim();

      if (!resolvedCity || resolvedCity === 'India Delivery' || resolvedCity === 'India') {
        if (pincode && (pincode.startsWith('411') || pincode.startsWith('412') || pincode.startsWith('410'))) {
          resolvedCity = 'Pune';
        } else if (pincode) {
          resolvedCity = `Pincode ${pincode}`;
        } else {
          resolvedCity = 'Pune';
        }
      }
      const loc = { city: resolvedCity, pincode: pincode || '' };
      localStorage.setItem('myzon_location', JSON.stringify(loc));
      set({ location: loc, isPincodeModalOpen: false });
    },
    openPincodeModal: () => set({ isPincodeModalOpen: true }),
    closePincodeModal: () => set({ isPincodeModalOpen: false }),
    openLoginModal: () => set({ isLoginModalOpen: true }),
    closeLoginModal: () => set({ isLoginModalOpen: false }),
    openDrawer: () => set({ isDrawerOpen: true }),
    closeDrawer: () => set({ isDrawerOpen: false }),
    toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
    setLanguage: (lang) => set({ language: lang }),
    showToast: (message, type = 'cart') => {
      set({ toast: { show: true, message, type } });
      setTimeout(() => {
        set((s) => ({ toast: { ...s.toast, show: false } }));
      }, 3000);
    },
    hideToast: () => set((s) => ({ toast: { ...s.toast, show: false } })),
  };
});

export const useCartStore = create((set, get) => ({
  cartItems: JSON.parse(localStorage.getItem('myzon_cart')) || [],
  setCartItems: (items) => {
    localStorage.setItem('myzon_cart', JSON.stringify(items));
    set({ cartItems: items });
  },
  addToCart: (item) => set((state) => {
    const exists = state.cartItems.find(i => i.id === item.id);
    let updated;
    if (exists) {
      updated = state.cartItems.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
    } else {
      updated = [...state.cartItems, { ...item, qty: 1 }];
    }
    localStorage.setItem('myzon_cart', JSON.stringify(updated));
    useUIStore.getState().showToast(`Added "${item.title.slice(0, 24)}..." to Cart!`, 'cart');
    return { cartItems: updated };
  }),
  removeFromCart: (productId) => set((state) => {
    const updated = state.cartItems.filter(i => i.id !== productId);
    localStorage.setItem('myzon_cart', JSON.stringify(updated));
    return { cartItems: updated };
  }),
  clearCart: () => {
    localStorage.removeItem('myzon_cart');
    set({ cartItems: [] });
  },
  updateQuantity: (productId, qty) => set((state) => {
    const updated = state.cartItems.map(i => i.id === productId ? { ...i, qty } : i).filter(i => i.qty > 0);
    localStorage.setItem('myzon_cart', JSON.stringify(updated));
    return { cartItems: updated };
  })
}));

export const useWishlistStore = create((set) => ({
  wishlistItems: JSON.parse(localStorage.getItem('myzon_wishlist')) || [],
  addToWishlist: (item) => set((state) => {
    const exists = state.wishlistItems.find(i => i.id === item.id);
    let updated;
    if (exists) {
      updated = state.wishlistItems.filter(i => i.id !== item.id);
      useUIStore.getState().showToast(`Removed from Wishlist`, 'wishlist');
    } else {
      updated = [...state.wishlistItems, item];
      useUIStore.getState().showToast(`Added to Wishlist! ❤️`, 'wishlist');
    }
    localStorage.setItem('myzon_wishlist', JSON.stringify(updated));
    return { wishlistItems: updated };
  }),
  removeFromWishlist: (productId) => set((state) => {
    const updated = state.wishlistItems.filter(i => i.id !== productId);
    localStorage.setItem('myzon_wishlist', JSON.stringify(updated));
    return { wishlistItems: updated };
  }),
  clearWishlist: () => {
    localStorage.removeItem('myzon_wishlist');
    set({ wishlistItems: [] });
  },
}));

export const useOrderStore = create((set, get) => ({
  orders: JSON.parse(localStorage.getItem('myzon_orders')) || [],
  addOrder: (order) => set((state) => {
    const updated = [order, ...state.orders];
    localStorage.setItem('myzon_orders', JSON.stringify(updated));
    return { orders: updated };
  }),
  updateOrder: (orderId, updates) => set((state) => {
    const updated = state.orders.map((o) => (o.id === orderId ? { ...o, ...updates } : o));
    localStorage.setItem('myzon_orders', JSON.stringify(updated));
    return { orders: updated };
  }),
  getOrder: (orderId) => {
    return get().orders.find((o) => o.id === orderId);
  },
}));

