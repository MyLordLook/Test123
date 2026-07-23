import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, ProductImage } from '../types';

interface WishlistState {
  items: (Product & { product_images?: ProductImage[] })[];
  addItem: (product: Product & { product_images?: ProductImage[] }) => void;
  removeItem: (productId: string) => void;
  hasItem: (productId: string) => boolean;
  toggle: (product: Product & { product_images?: ProductImage[] }) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        if (!get().hasItem(product.id)) {
          set({ items: [...get().items, product] });
        }
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.id !== productId) });
      },
      hasItem: (productId) => get().items.some((i) => i.id === productId),
      toggle: (product) => {
        if (get().hasItem(product.id)) {
          get().removeItem(product.id);
        } else {
          get().addItem(product);
        }
      },
    }),
    { name: 'lordlook-wishlist' }
  )
);
