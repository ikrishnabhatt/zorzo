// store/cartStore.js
import create from 'zustand';

const useCartStore = create((set) => ({
  cart: [],
  addToCart: (item) =>
    set((state) => ({ cart: [...state.cart, { ...item, quantity: state.cart.find((i) => i.id === item.id) ? state.cart.find((i) => i.id === item.id).quantity + 1 : 1 }] })),
  removeFromCart: (id) =>
    set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),
  clearCart: () =>
    set({ cart: [] }),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    })),
}));

export default useCartStore;