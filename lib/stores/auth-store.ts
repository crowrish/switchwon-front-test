import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { logoutAction } from '@/lib/actions/auth.actions';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    email: string;
    memberId: number;
  } | null;
  login: (email: string, memberId: number) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (email: string, memberId: number) => {
        set({
          isAuthenticated: true,
          user: { email, memberId },
        });
      },
      logout: async () => {
        await logoutAction();
        set({
          isAuthenticated: false,
          user: null,
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
);
