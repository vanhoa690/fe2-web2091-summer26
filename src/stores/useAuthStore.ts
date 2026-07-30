import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create<any>()(
  persist(
    (set) => ({
      user: {
        username: "hoadv",
        email: "hoadv@gmail.com",
      },
    }),
    {
      name: "useAuthStore",
    },
  ),
);

export default useAuthStore;
