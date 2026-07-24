"use client";

import { create } from "zustand";

interface SearchStore {
  open: boolean;
  query: string;
  openPanel: () => void;
  closePanel: () => void;
  setQuery: (q: string) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  open: false,
  query: "",
  openPanel: () => set({ open: true }),
  closePanel: () => set({ open: false, query: "" }),
  setQuery: (q: string) => set({ query: q }),
}));
