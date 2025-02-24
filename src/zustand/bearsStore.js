import { create } from "zustand";
import { getUserProfile } from "../api/auth";

const useAuthStore = create((set, get) => ({
  accessToken: localStorage.getItem("accessToken") || "",
  isAuthenticated: !!localStorage.getItem("accessToken"),
  user: null,

  authenticateUser: (token) => {
    localStorage.setItem("accessToken", token);
    set({ accessToken: token, isAuthenticated: true });
    get().fetchUserProfile();
  },

  logoutUser: () => {
    localStorage.removeItem("accessToken");
    set({ accessToken: "", isAuthenticated: false, user: null });
  },

  fetchUserProfile: async () => {
    const { accessToken } = get();
    if (!accessToken) return;
    try {
      const res = await getUserProfile(accessToken);
      set({ user: res });
    } catch (error) {
      console.log(error.message);
    }
  },
}));

export default useAuthStore;
