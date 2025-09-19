import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState, User } from '../types/auth';

interface AuthStore extends AuthState {
  phone: string;
  countryCode: string;
  setUser: (user: User) => void;
  setStep: (step: AuthState['step']) => void;
  setLoading: (loading: boolean) => void;
  setPhone: (phone: string) => void;
  setCountryCode: (code: string) => void;
  logout: () => void;
  sendOTP: () => Promise<void>;
  verifyOTP: (otp: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      step: 'phone',
      phone: '',
      countryCode: '',

      setUser: (user) => set({ user }),
      setStep: (step) => set({ step }),
      setLoading: (isLoading) => set({ isLoading }),
      setPhone: (phone) => set({ phone }),
      setCountryCode: (countryCode) => set({ countryCode }),

      logout: () =>
        set({
          user: null,
          step: 'phone',
          isLoading: false,
          phone: '',
          countryCode: '',
        }),

      sendOTP: async () => {
        const { phone, countryCode } = get();
        if (!phone || !countryCode) return;
        set({ isLoading: true });
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        set({ isLoading: false, step: 'otp' });
      },

      verifyOTP: async (otp) => {
        set({ isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (otp === '123456') {
          const { phone, countryCode } = get();
          const user = {
            id: Math.random().toString(),
            phone,
            countryCode,
            isAuthenticated: true,
          };
          set({ user, step: 'authenticated', isLoading: false });
          return true;
        }

        set({ isLoading: false });
        return false;
      },
    }),
    { name: 'auth-storage' }
  )
);
