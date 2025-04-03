import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      authDetails: {},
      userIn: "Login",
      setUserIn: (details) => {
        set(() => ({
          userIn: details,
        }));
      },
      setAuthDetails: (details) => {
        set(() => ({
          authDetails: details
        }))
      }
    }),
    {
      name: "auth-storage",
      getStorage: () => sessionStorage,
    }
  )
);

export default useAuthStore;