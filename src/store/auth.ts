import { create } from 'zustand';

interface AuthState {
  user: null | {
    id: string;
    email: string;
    name: string;
    avatar?: string;
  };
  setUser: (user: AuthState['user']) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));