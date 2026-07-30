import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  setUser: (user: User) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user: User | null) => {
        set({ user });
      },
    }),
    {
      name: "useAuthStore",
    },
  ),
);

export default useAuthStore;
