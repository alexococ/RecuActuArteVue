import { defineStore } from "pinia";
import axios from "axios";

export interface Obra {
  idObra?: number;
  nombreObra: string;
  valoracionObra: number;
  autorObra: string;
  directorObra: string;
  duracionObra: string;
  descObra: string;
  imagen: string;
}

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    obras: [] as Obra[],
    isLoaded: false,
  }),

  actions: {
    async fetchObras(force = false) {
      if (this.isLoaded && !force) return;
      try {
        const response = await axios.get("http://localhost:8001/Obras");
        this.obras = response.data;
        this.isLoaded = true;
      } catch (error) {
        console.error("Hubo un error al obtener las obras: ", error);
      }
    },

    async addObra(nuevaObra: Omit<Obra, "idObra">) {
      try {
        await axios.post("http://localhost:8001/Obras", nuevaObra, {
          headers: { "Content-Type": "application/json" },
        });
        await this.fetchObras(true); // Recargar obras después de añadir
      } catch (error) {
        console.error("Hubo un error al añadir la obra: ", error);
        throw error;
      }
    },

    async updateObra(obraActualizada: Obra) {
      if (!obraActualizada.idObra) return;
      try {
        await axios.put(
          `http://localhost:8001/Obras/${obraActualizada.idObra}`,
          obraActualizada,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        await this.fetchObras(true); // Recargar obras después de actualizar
      } catch (error) {
        console.error("Hubo un error al actualizar la obra: ", error);
        throw error;
      }
    },

    async deleteObra(idObra: number) {
      try {
        await axios.delete(`http://localhost:8001/Obras/${idObra}`);
        await this.fetchObras(true); // Recargar obras después de eliminar
      } catch (error) {
        console.error("Hubo un error al eliminar la obra: ", error);
      }
    },
  },
});
