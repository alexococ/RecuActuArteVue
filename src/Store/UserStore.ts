import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    usuario: null,
  }),
  getters: {
    nombreUsuario: (state) =>
      state.usuario ? state.usuario.nombreUsuario : "",
    isLoggedIn: (state) => !!state.usuario,
  },
  actions: {
    setUser(usuario: any) {
      this.usuario = usuario;
    },
    clearUser() {
      this.usuario = null;
    },
  },
});
