<script setup lang="ts">
import { ref, onMounted, toRefs, computed } from "vue";
import { useRoute } from "vue-router";
import { useDetallesStore } from "@/Store/DetallesStore";
import { useAsientosStore } from "@/Store/AsientosStore";
import { useReservasStore } from "@/Store/ReservasStore";

const route = useRoute();
const detallesStore = useDetallesStore();
const { obra } = toRefs(detallesStore);
const obraId = ref(Number(route.params.obraId));
const sesionId = ref(Number(route.query.sesionId));
const asientosTotales = 54; // Total de asientos por sesión
const asientosStore = useAsientosStore();
const asientosSeleccionados = ref<number[]>([]);

const asientosDisponibles = computed(() => {
  const ocupados = asientosStore.getAsientosOcupadosCount(
    obraId.value,
    sesionId.value
  );
  return asientosTotales - ocupados;
});


// Calcular precio total asientos
const precioTotal = computed(() => {
  return asientosSeleccionados.value.length * 10;
});


onMounted(async () => {
  if (obraId.value) {
    await detallesStore.fetchObra(obraId.value.toString());
  }
  if (obraId.value && sesionId.value) {
    await asientosStore.cargarAsientos(obraId.value, sesionId.value);
  }
});


// seleccionar asientos
function seleccionarAsiento(asientoId: number) {
  const index = asientosSeleccionados.value.indexOf(asientoId);
  if (index === -1) {
    asientosSeleccionados.value.push(asientoId);
  } else {
    asientosSeleccionados.value.splice(index, 1);
  }
  console.log(
    `Asientos seleccionados: ${asientosSeleccionados.value.length}, Precio total: ${precioTotal.value}`
  );
}


//reservar los asientos
const reservarAsientosSeleccionados = async () => {
  if (!obraId.value || !sesionId.value || asientosSeleccionados.value.length === 0 || obra.value === null) {
    alert("No se ha podido cargar la información de la obra o no se han seleccionado asientos.");
    return;
  }

  try {
    // Suponiendo que el método reservarAsientos existe y funciona correctamente
    await asientosStore.reservarAsientos(obraId.value, sesionId.value, asientosSeleccionados.value);

    const reserva = {
      obra: obra.value.nombreObra,  // Ahora es seguro acceder a nombreObra porque ya verificamos que obra.value no es null
      sesion: sesionId.value,
      numAsientos: asientosSeleccionados.value.length,
      precio: precioTotal.value,
      fecha: new Date().toISOString()
    };

    const reservasStore = useReservasStore();
    reservasStore.addReserva(reserva);

    alert(`Has reservado ${reserva.numAsientos} asientos para la obra '${reserva.obra}' en la sesión ${reserva.sesion}, por un total de ${reserva.precio} euros.`);
    asientosSeleccionados.value = [];
    await asientosStore.cargarAsientos(obraId.value, sesionId.value);
  } catch (error) {
    console.error("Error al reservar asientos:", error);
  }
};

const esAsientoOcupado = (asientoId: number) => {
  return asientosStore
    .getAsientosOcupados(obraId.value, sesionId.value)
    .includes(asientoId);
};


</script>

<template>
  <div class="reservas-view">
    <div class="navigation">
      <RouterLink to="/" class="toIndex-button">Volver al Inicio</RouterLink>
    </div>

    <div class="showcase">
      <div class="seat selected"></div>
      <small>Seleccionado</small>
      <div class="seat"></div>
      <small>Libre</small>
      <div class="seat occupied"></div>
      <small>Ocupado</small>
    </div>


    <div class="titulo-obra-reserva" v-if="obra">
      <h1>{{ obra.nombreObra }}</h1>
    </div>

    

    <div class="container">
      <svg
        width="100%"
        height="60vh"
        viewBox="0 0 100 110"
        preserveAspectRatio="xMidYMid meet"
      >
        <!-- Escenario -->
        <rect x="10" y="0" width="80" height="10" fill="#8B4513" />
        <text
          x="50"
          y="5"
          fill="white"
          font-size="5"
          text-anchor="middle"
          alignment-baseline="middle"
        >
          Escenario
        </text>

        <!-- Asientos -->
        <g v-for="row in 6" :key="row">
          <g v-for="col in 9" :key="col">
            <rect
              :x="(col - 1) * 11"
              :y="(row - 1) * 16 + 15"
              width="10"
              height="15"
              rx="2"
              ry="2"
              @click="() => seleccionarAsiento(row * 100 + col)"
              :fill="
                esAsientoOcupado(row * 100 + col)
                  ? '#FF6347'
                  : asientosSeleccionados.includes(row * 100 + col)
                  ? '#f1d791'
                  : '#9E9E9E'
              "
            />
            <line
              :x1="(col - 1) * 11 + 2"
              :y1="(row - 1) * 16 + 15"
              :x2="(col - 1) * 11 + 2"
              :y2="(row - 1) * 16 + 30"
              stroke-width="1"
              stroke="var(--dark-color)"
            />
          </g>
        </g>
      </svg>
    </div>

    <h2>
      Has seleccionado <span>{{ asientosSeleccionados.length }}</span> asiento(s) por un total de <span>{{ precioTotal }}</span> euros.
    </h2>

    <button @click="reservarAsientosSeleccionados" class="reserve-button">
      Reservar Asientos
    </button>

  
  </div>
</template>

<style>
:root {
  --primary-color: #c7a17a;
  --background-color: #f9f5f0;
  --dark-color: #63595c;
  --bg-color: #716a5c;
  --text-color: #f1e9db;
  --main-color: #f1d791;
  --btn-color: #5e0a0f;
  --box-shadow: 0 2rem 3rem var(--dark-color);
}

.container {
  display: flex;
  margin-top: 20px;
}

.seat {
  background-color: var(--bg-color);
  height: 12px;
  width: 15px;
  margin: 3px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.seat.selected {
  background-color: var(--main-color);
}

.seat.selected rect {
  fill: var(--main-color);
}

.seat.occupied {
  background-color: var(--btn-color);
}

.seat.occupied rect {
  fill: var(--btn-color);
}

.showcase {
  font-size: 20px;
  width: 50%;
  height: 50px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  list-style-type: none;
  padding: 5px 40px;
  margin: 0 auto 10px;
  box-shadow: var(--box-shadow);
  border-radius: 5px;
  color: var(--dark-color);
  margin-top: 30px;
}

.showcase li {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
}

/* Estilo para los textos pequeños en la guía de colores */
.showcase li small {
  margin-left: 10px;
}

.reservar-obra_button {
  display: flex;
  justify-content: center;
  background-color: var(--primary-color);
  color: #000;
  border: none;
  border-radius: 30px;
  padding: 14px 35px;
  color: white;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  margin: 20px auto;
}

.text {
  text-align: center;
  justify-content: center;
  font-size: x-large;
  font-weight: bold;
  margin-bottom: 20px;
}

#count,
#total {
  color: var(--main-color);
}

.reservar-obra_button:hover {
  background-color: var(--main-color);
  color: #000;
}

.Router__Index {
  color: #fff;
}

.Router__Index:hover {
  color: #000;
}

.reserve-button {
  background-color: var(--primary-color);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 20px;
  position: relative;
  z-index: 10;
  margin-top: 20px;
}

.toIndex-button {
  background-color: var(--primary-color);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 40px;
}
</style>
