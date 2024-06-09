import { defineStore } from "pinia";
import axios from "axios";

interface Obra {
  idObra: number;
  nombreObra: string;
  autorObra: string;
  directorObra: string;
  valoracionObra: number;
  duracionObra: number;
}

export const useDetallesStore = defineStore("detalles", {
  state: () => ({
    obra: null as Obra | null,
  }),

  actions: {
    async fetchObra(idObra: string) {
      try {
        const response = await axios.get(
          `http://localhost:8001/Obras/${idObra}`
        );
        this.obra = response.data;
      } catch (error) {
        console.error("Error al obtener los detalles de la obra:", error);
      }
    },
  },
});
