import { defineStore } from "pinia";

export const useReservasStore = defineStore("reservas", {
  state: () => ({
    reservas: JSON.parse(localStorage.getItem("reservas") || "[]"),
  }),
  actions: {
    addReserva(reserva: any) {
      this.reservas.push(reserva);
      localStorage.setItem("reservas", JSON.stringify(this.reservas));
    },
    loadReservas() {
      this.reservas = JSON.parse(localStorage.getItem("reservas") || "[]");
    },
    clearReservas() {
      this.reservas = [];
      localStorage.removeItem("reservas");
    },
  },
});
