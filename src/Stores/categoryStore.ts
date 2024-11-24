import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface category {
  id: number;
  label: string;
  count: number;
}

export interface categoryStoreType {
  categories: category[] | null;
  setCategories: (val: category[]) => void;
  selectedCategory: string;
  setSelectedCategory: (s: string) => void;
}

export const useCategoryStore = create<categoryStoreType>()(
  persist(
    (set) => ({
      categories: null,
      setCategories(val) {
        set({ categories: val });
      },
      selectedCategory: "Inbox",
      setSelectedCategory(s) {
        set({ selectedCategory: s });
      },
    }),
    {
      name: "CategoryStorage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
