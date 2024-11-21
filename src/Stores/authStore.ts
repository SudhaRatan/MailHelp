import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface tokenInfo {
  azp: string;
  aud: string;
  sub: string;
  scope: string;
  exp: string;
  expires_in: string;
  email: string;
  email_verified: string;
  access_type: string;
}

export interface authType {
  token: string;
  setToken: (t: string) => void;
  tokenInfo: tokenInfo | null;
  setTokenInfo: (ti: tokenInfo | null) => void;
}

export const useAuthStore = create<authType>()(
  persist(
    (set) => ({
      token: "",
      setToken: (val) => set({ token: val }),
      tokenInfo: null,
      setTokenInfo: (ti: tokenInfo | null) => set({ tokenInfo: ti }),
    }),
    {
      name: "AuthStorage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
