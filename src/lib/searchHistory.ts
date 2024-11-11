import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SearchHistoryState {
  searches: string[];
  addSearch: (search: string) => void;
  removeSearch: (search: string) => void;
  clearSearches: () => void;
}

export const useSearchHistory = create<SearchHistoryState>()(
  persist(
    (set) => ({
      searches: [],
      addSearch: (search) =>
        set((state) => ({
          searches: [
            search,
            ...state.searches.filter((s) => s !== search).slice(0, 9),
          ],
        })),
      removeSearch: (search) =>
        set((state) => ({
          searches: state.searches.filter((s) => s !== search),
        })),
      clearSearches: () => set({ searches: [] }),
    }),
    {
      name: 'search-history',
    }
  )
);