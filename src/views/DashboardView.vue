<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useDashboardStore , type Obra } from "@/Store/DashboardStore";

type ObraEditable = Omit<Obra, 'idObra'> & { idObra?: number };

const obrasStore = useDashboardStore ();

onMounted(async () => {
  if (!obrasStore.isLoaded) {
    obrasStore.fetchObras(true);
  }
});

const defaultObra = ref({
  nombreObra: "",
  valoracionObra: 0,
  autorObra: "",
  directorObra: "",
  duracionObra: "",
  descObra: "",
  imagen: "",
});

const obraSeleccionada = ref<ObraEditable>({ ...defaultObra.value });

const modoFormulario = ref("");

const obras = computed(() => obrasStore.obras);

function handleAdd() {
  obraSeleccionada.value = { ...defaultObra.value };
  modoFormulario.value = "añadir";
}

function handleDelete(idObra: number) {
  obrasStore.deleteObra(idObra);
}

function handleEdit(obra: Obra) {
  obraSeleccionada.value = { ...obra };
  modoFormulario.value = "editar";
}

async function handleSubmit() {
  try {
    if (modoFormulario.value === "añadir") {
      await obrasStore.addObra(obraSeleccionada.value);
      console.log("Obra añadida correctamente.");
    } else if (modoFormulario.value === "editar" && obraSeleccionada.value.idObra) {
      await obrasStore.updateObra(obraSeleccionada.value);
      console.log("Obra actualizada correctamente.");
    } else {
      console.error("La obra seleccionada no tiene un ID válido.");
      return; // Salimos de la función si no hay un ID válido
    }
    // Recargamos las obras para reflejar los cambios
    await obrasStore.fetchObras(true);
  } catch (error) {
    console.error("Error al procesar el formulario: ", error);
  } finally {
    obraSeleccionada.value = { ...defaultObra.value };
    modoFormulario.value = "";
  }
}

function handleCancel() {
  obraSeleccionada.value = { ...defaultObra.value };
  modoFormulario.value = "";
}
</script>

<template>
  <div class="container-dashboard">
    <main>
      <div class="recent_order">
        <div class="botones-funciones-dashboard">

          <button @click="handleAdd" class="btn-añadir-obras">
            Añadir Obra
          </button>


          <button class="Btn">
            <div class="sign">
              <svg viewBox="0 0 512 512">
                <path
                  d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                ></path>
              </svg>
            </div>

            <div class="text">Logout<RouterLink to="/">Salir</RouterLink></div>
          </button>
          
        </div>
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>ID de la Obra</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="obra in obras" :key="obra.idObra">
              <td>{{ obra.nombreObra }}</td>
              <td>{{ obra.idObra }}</td>
              <td class="primary" @click="handleEdit(obra)">
                <i class="ri-pencil-fill"></i>
              </td>
              <td
                class="primary"
                @click="obra.idObra && handleDelete(obra.idObra)"
              >
                <i class="ri-delete-bin-line"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        v-if="
          obraSeleccionada &&
          (modoFormulario === 'añadir' || modoFormulario === 'editar')
        "
        class="form-container"
      >
        <form @submit.prevent="handleSubmit">
          <input
            v-model="obraSeleccionada.nombreObra"
            placeholder="Nombre de la obra"
            required
          />
          <input
            v-model="obraSeleccionada.descObra"
            placeholder="Descripción de la obra"
            required
          />
          <input
            v-model="obraSeleccionada.valoracionObra"
            placeholder="Valoración de la obra"
            type="number"
            required
          />
          <input
            v-model="obraSeleccionada.directorObra"
            placeholder="Director de la obra"
            required
          />
          <input
            v-model="obraSeleccionada.autorObra"
            placeholder="Autor de la obra"
            required
          />
          <input
            v-model="obraSeleccionada.imagen"
            placeholder="Imagen de la obra"
            required
          />
          <input
            v-model="obraSeleccionada.duracionObra"
            placeholder="Duración de la obra"
            required
          />
          <button type="submit" class="btn-guardar">Guardar</button>
          <button type="button" @click="handleCancel" class="btn-cancelar">
            Cancelar
          </button>
        </form>
      </div>
    </main>
  </div>
</template>

<style>

:root {
  --clr-primary: #896a4c;
  --clr-success: #41f15b;
  --clr-white: #fff;
  --clr-info-dark: #7d8da1;
  --clr-info-light: #dce1eb;
  --clr-dark: #363949;
  --clr-warnig: #e02626;
  --clr-light: rgba(132, 139, 200, 0.18);
  --clr-dark-variant: #677483;
  --clr-color-background: #f6f6f9;

  --card-border-radius: 2rem;
  --border-radius-1: 0.4rem;
  --border-radius-2: 0.8rem;
  --border-radius-3: 1.2rem;

  --card-padding: 1.8rem;
  --padding-1: 1.2rem;
  --box-shadow: 0 2rem 3rem var(--clr-light);
}

body {
  width: 100%;
  height: 100vh;
  font-size: 0.88rem;
}

a {
  color: var(--clr-dark);
}

h1 {
  font-weight: 800;
  font-size: 1.8rem;
}

h2 {
  font-size: 1.4rem;
}

h3 {
  font-size: 0.87rem;
}

h4 {
  font-size: 0.8;
}

h5 {
  font-size: 0.77rem;
}

small {
  font-size: 0.75rem;
}

p {
  color: var(--clr-dark-variant);
}

b {
  color: var(--clr-dark);
}

/*-------------MAIN SECTION--------------*/

.botones-funciones-dashboard {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.container-dashboard {
  margin: 40px;
  display: flex;
  text-align: center;
  justify-content: center;
  position: relative;
  width: 60%;
  transform: translate(30%, 20%);
}

main {
  width: 100%;
  text-align: center;
  justify-content: center;
}

main input {
  background-color: transparent;
  border: 0;
  outline: 0;
  color: var(--clr-dark);
}

main h1 {
  color: var(--clr-dark);
}

main .recent_order {
  margin-top: 2rem;
}

main .recent_order h2 {
  color: var(--clr-dark);
}

main .recent_order table {
  background-color: var(--clr-white);
  width: 100%;
  border-radius: var(--card-border-radius);
  padding: var(--card-padding);
  text-align: center;
  box-shadow: var(--box-shadow);
  transition: all 0.3s ease;
  color: var(--clr-dark);
}

main .recent_order table:hover {
  box-shadow: none;
}

main table tbody tr {
  height: 3.8rem;
  border-bottom: 1px solid var(--clr-white);
  color: var(--clr-dark-variant);
}

main table tbody td {
  height: 3.8rem;
  border-bottom: 1px solid var(--clr-dark);
}

main table tbody tr:last-child td {
  border: none;
}

main .recent_order a {
  text-align: center;
  display: block;
  margin: 1rem;
}

.form-container {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group input[type="url"] {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-actions {
  text-align: right;
  padding-top: 1rem;
}

.btn-añadir-obras {
  padding: 0.1rem 0.5rem;
  margin-left: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: var(--clr-primary);
  color: white;
}

.btn-añadir-obras:hover {
  opacity: 0.9;
}

.btn-añadir-obras:disabled {
  background-color: #ccc;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-guardar {
  cursor: pointer;
  height: 30px;
  border-radius: 10%;
  width: 70px;
  background-color: #896a4c;
  color: var(--clr-color-background);
  margin-left: 10px;
}

.btn-guardar:hover {
  background-color: var(--clr-success);
  color: var(--clr-dark);
}

.btn-cancelar {
  cursor: pointer;
  height: 30px;
  border-radius: 10%;
  width: 70px;
  background-color: #896a4c;
  color: var(--clr-color-background);
  margin-left: 10px;
}

.btn-cancelar:hover {
  background-color: var(--clr-warnig);
}

.Btn {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 45px;
  height: 45px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition-duration: .3s;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
  background-color: rgb(255, 65, 65);
}

.sign {
  width: 100%;
  transition-duration: .3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sign svg {
  width: 17px;
}

.sign svg path {
  fill: white;
}

.text {
  position: absolute;
  right: 0%;
  width: 0%;
  opacity: 0;
  color: white;
  font-size: 1.2em;
  font-weight: 600;
  transition-duration: .3s;
}

.Btn:hover {
  width: 125px;
  border-radius: 40px;
  transition-duration: .3s;
}

.Btn:hover .sign {
  width: 30%;
  transition-duration: .3s;
  padding-left: 20px;
}

.Btn:hover .text {
  opacity: 1;
  width: 70%;
  transition-duration: .3s;
  padding-right: 10px;
}

.Btn:active {
  transform: translate(2px ,2px);
}
</style>
