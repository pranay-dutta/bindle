import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mountStoreDevtool } from "simple-zustand-devtools";
import type { NytBook } from "@/interfaces/new-york-times/NytBook";

type NytBookStore = {
  nytBook: NytBook;
  setNytBook: (book: NytBook) => void;
};

const useNytBookStore = create<NytBookStore>()(
  persist(
    (set) => ({
      nytBook: {} as NytBook,
      setNytBook: (book: NytBook) => set({ nytBook: book })
    }),
    { name: "nyt-book-storage" }
  )
);

export default useNytBookStore;

if (import.meta.env.DEV) {
  mountStoreDevtool("useNytBookStore", useNytBookStore);
}
