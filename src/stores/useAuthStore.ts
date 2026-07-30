import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create<any>()(
  persist(
    (set) => ({
      user: null,
    }),
    {
      name: "useAuthStore",
    },
  ),
);

export default useAuthStore;
