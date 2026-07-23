import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LocalCartItem, Product, ProductImage } from '../types';

interface CartState {
  items: LocalCartItem[];
  coupon: string;
  discount: number;
  addItem: (product: Product & { product_images?: ProductImage[] }, size: string, color: string) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, qty: number) => void;
  clearCart: () => void;
  setCoupon: (code: string, discount: number) => void;
  clearCoupon: () => void;
  totalItems: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: '',
      discount: 0,
      addItem: (product, size, color) => {
        const items = get().items;
        const existing = items.find(
          (i) => i.product.id === product.id && i.size === size && i.color === color
        );
        if (existing) {
          set({
            items: items.map((i) =>
              i.product.id === product.id && i.size === size && i.color === color
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({ items: [...items, { product, size, color, quantity: 1 }] });
        }
      },
      removeItem: (productId, size, color) => {
        set({
          items: get().items.filter(
            (i) => !(i.product.id === productId && i.size === size && i.color === color)
          ),
        });
      },
      updateQuantity: (productId, size, color, qty) => {
        if (qty <= 0) {
          get().removeItem(productId, size, color);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.product.id === productId && i.size === size && i.color === color
              ? { ...i, quantity: qty }
              : i
          ),
        });
      },
      clearCart: () => set({ items: [], coupon: '', discount: 0 }),
      setCoupon: (code, discount) => set({ coupon: code, discount }),
      clearCoupon: () => set({ coupon: '', discount: 0 }),
      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    }),
    { name: 'lordlook-cart' }
  )
);
