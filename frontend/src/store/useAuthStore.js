import { create } from "zustand";
import { fetchCurrentUser } from "../utils/fetchCurrentUser";

export const useAuthStore = create((set) => {
  const store = {
    user: null,
    token: localStorage.getItem("token") || null,

    login: (user, token) => {
      localStorage.setItem("token", token);
      set({ user, token });
    },

    logout: () => {
      localStorage.removeItem("token");
      set({ user: null, token: null });
    },

    setUser: (user) => set({ user }),

    fetchUser: async () => {
      const token = useAuthStore.getState().token;
      if (!token) return;
      const user = await fetchCurrentUser(token);
      if (user) {
        set({ user });
      } else {
        localStorage.removeItem("token");
        set({ user: null, token: null });
      }
    },
  };

  const initToken = store.token;
  if (initToken) {
    fetchCurrentUser(initToken).then((user) => {
      if (user) {
        set({ user });
      } else {
        localStorage.removeItem("token");
        set({ user: null, token: null });
      }
    });
  }

  return store;
});
