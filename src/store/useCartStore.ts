import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import type { NytBook } from "@/interfaces/new-york-times/NytBook";
import type { SearchedBook } from "@/interfaces/open-library/OLSearch";

interface CartStore {
  cart: Map<NytBook | SearchedBook, number>;
  increaseQty: (book: NytBook | SearchedBook) => void;
  decreaseQty: (book: NytBook | SearchedBook) => void;
  setQty: (book: NytBook | SearchedBook, qty: number) => void;
  getQty: (book: NytBook | SearchedBook) => number;
  removeItem: (book: NytBook | SearchedBook) => void;
}
const useCartStore = create<CartStore>()((set, get) => ({
  cart: new Map<NytBook | SearchedBook, number>(),
  increaseQty: (book: NytBook | SearchedBook) => {
    set((state) => {
      const newCart = new Map(state.cart);
      const currentQty = newCart.get(book) || 0;
      newCart.set(book, currentQty + 1);

      return { cart: newCart };
    });
  },
  decreaseQty: (book: NytBook | SearchedBook) => {
    set((state) => {
      const newCart = new Map(state.cart);
      const currentQty = newCart.get(book) || 0;
      if (currentQty > 1) {
        newCart.set(book, currentQty - 1);
      } else {
        newCart.delete(book);
      }
      return { cart: newCart };
    });
  },

  removeItem: (book: NytBook | SearchedBook) => {
    set((state) => {
      const newCart = new Map(state.cart);
      newCart.delete(book);
      return { cart: newCart };
    });
  },
  setQty: (book: NytBook | SearchedBook, qty: number) => {
    set((state) => {
      const newCart = new Map(state.cart);
      newCart.set(book, qty);
      return { cart: newCart };
    });
  },
  getQty: (book: NytBook | SearchedBook): number => {
    return get().cart.get(book) || 0;
  }
}));

export default useCartStore;
if (import.meta.env.DEV) {
  mountStoreDevtool("useCartStore", useCartStore);
}
