export interface Country {
  name: { common: string };
  cca2: string;
  idd: { root: string; suffixes: string[] };
  flag: string;
}

export interface User {
  id: string;
  phone: string;
  countryCode: string;
  isAuthenticated: boolean;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  step: 'phone' | 'otp' | 'authenticated';
}