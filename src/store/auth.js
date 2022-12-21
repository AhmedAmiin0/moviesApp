import { defineStore } from "pinia";
export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: null,
    token: localStorage.getItem("token"),
  }),

  actions: {
    login(token) {
      this.token = token;
      localStorage.setItem("token", token);
    },
    logout() {
      this.token = null;
      localStorage.removeItem("token");
    },
  },
});
