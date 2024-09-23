import { create } from "zustand";

interface FilterStore {
  stateFilters: string[];
  modelFilters: string[];
  setStateFilters: (filters: string[]) => void;
  setModelFilters: (filters: string[]) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  stateFilters: [],
  modelFilters: [],
  setStateFilters: (filters) => set({ stateFilters: filters }),
  setModelFilters: (filters) => set({ modelFilters: filters }),
}));
