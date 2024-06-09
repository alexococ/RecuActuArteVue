// LoginUserStore.ts
import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";
import { useUserStore } from "./UserStore";

interface Usuario {
  idUsuario: number;
  nombreUsuario: string;
  passwordUsuario: string;
  isAdmin: boolean;
}

export const useLoginUserStore = defineStore("loginUser", {
  state: () => ({
    usuario: null as Usuario | null,
  }),
  actions: {
    async loginUser(nombreUsuario: string, passwordUsuario: string) {
      try {
        const response = await axios.post(
          "http://localhost:8001/Credenciales/login",
          {
            nombreUsuario,
            passwordUsuario,
          }
        );
        this.usuario = response.data;

        const userStore = useUserStore();
        userStore.setUser(this.usuario);

        if (this.usuario.isAdmin) {
          router.push("/dashboard");
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error("Error al iniciar sesión: ", error);
        alert("Credenciales inválidas o error de conexión");
      }
    },

    logoutUser() {
      this.usuario = null;
      const userStore = useUserStore();
      userStore.clearUser();
      router.push("/login");
    },

    checkLoginStatus() {
      const userData = localStorage.getItem("userData");
      if (userData) {
        this.usuario = JSON.parse(userData);
        const userStore = useUserStore();
        userStore.setUser(this.usuario);
      }
    },
  },
});
