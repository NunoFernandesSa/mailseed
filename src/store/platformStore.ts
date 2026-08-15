import type { Platform } from "@/db/schema";
import { create } from "zustand";

interface PlatformState {
  items: Platform[];
  searchQuery: string;
  selectedTag: string | null;
  isLoading: boolean;
  error: string | null;

  setItems: (list: Platform[]) => void;
  setSearch: (q: string) => void;
  setTag: (tag: string | null) => void;
  setLoading: (v: boolean) => void;
  setError: (e: string | null) => void;
  addItem: (p: Platform) => void;
  updateItem: (p: Platform) => void;
  removeItem: (id: number) => void;
  toggleStar: (id: number) => void;
}

export const usePlatformStore = create<PlatformState>((set) => ({
  items: [],
  searchQuery: "",
  selectedTag: null,
  isLoading: true,
  error: null,

  setItems: (items) => set({ items, isLoading: false, error: null }),
  setSearch: (searchQuery) => set({ searchQuery }),
  setTag: (selectedTag) => set({ selectedTag }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  addItem: (p) => set((s) => ({ items: [p, ...s.items] })),
  updateItem: (p) =>
    set((s) => ({
      items: s.items.map((x) => (x.id === p.id ? p : x)),
    })),
  removeItem: (id) =>
    set((s) => ({
      items: s.items.filter((x) => x.id !== id),
    })),
  toggleStar: (id) =>
    set((s) => ({
      items: s.items.map((x) =>
        x.id === id ? { ...x, starred: !x.starred, updatedAt: new Date() } : x,
      ),
    })),
}));
