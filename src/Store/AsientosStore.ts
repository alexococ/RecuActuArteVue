import { defineStore } from "pinia";
import axios from "axios";

export const useAsientosStore = defineStore("asientos", {
  state: () => ({
    asientosOcupados: {} as Record<string, number[]>,
  }),

  actions: {
    async reservarAsientos(id: number, sesionId: number, asientos: number[]) {
      try {
        const response = await axios.post(
          `http://localhost:8001/Obras/${id}/Sesion/${sesionId}`,
          asientos
        );
        console.log("Reserva exitosa", response.data);
        await this.cargarAsientos(id, sesionId); // Asegúrate de recargar los asientos ocupados después de reservar.
      } catch (error) {
        console.error("Error al reservar asientos:", error);
      }
    },

    async cargarAsientos(id: number, sesionId: number) {
      try {
        const response = await axios.get(
          `http://localhost:8001/Obras/${id}/Session`,
          { params: { sessionId: sesionId } }
        );
        this.asientosOcupados[`${id}_${sesionId}`] = response.data;
      } catch (error) {
        console.error("Error al cargar asientos:", error);
      }
    },
  },

  getters: {
    getAsientosOcupadosCount: (state) => (obraId: number, sesionId: number) => {
      const asientosOcupados =
        state.asientosOcupados[`${obraId}_${sesionId}`] ?? [];
      return asientosOcupados.length;
    },
    // Asegúrate de tener este getter además de los que ya existen
    getAsientosOcupados: (state) => {
      return (obraId: number, sesionId: number) => {
        return state.asientosOcupados[`${obraId}_${sesionId}`] || [];
      };
    },
    getAsientosDisponibles: (state) => {
      return (obraId: number, sesionId: number) => {
        const totalAsientos = 54;
        const asientosOcupados =
          state.asientosOcupados[`${obraId}_${sesionId}`] || [];
        return totalAsientos - asientosOcupados.length;
      };
    },
  },
});
