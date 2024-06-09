<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDetallesStore } from '@/Store/DetallesStore';
import { useAsientosStore } from '@/Store/AsientosStore';

const detallesStore = useDetallesStore();
const asientosStore = useAsientosStore();
const route = useRoute();
const router = useRouter();
const obraId = ref(route.params.id ? parseInt(route.params.id as string, 10) : null);
const obra = computed(() => detallesStore.obra);



onMounted(() => {
  if (obraId.value) {
    detallesStore.fetchObra(obraId.value.toString());
    [1, 2, 3].forEach(sesionId => {
      asientosStore.cargarAsientos(obraId.value, sesionId);
    });
  }
});

const navegarAReservas = (sesionId: number) => {
  router.push({
    name: 'Reservas',
    params: { obraId: obraId.value.toString() },
    query: { sesionId: sesionId.toString() }
  }).catch(err => {
    console.error('Error al navegar a reservas:', err);
  });
};

const asientosDisponiblesSesion1 = computed(() => asientosStore.getAsientosDisponibles(obraId.value, 1));
const asientosDisponiblesSesion2 = computed(() => asientosStore.getAsientosDisponibles(obraId.value, 2));
const asientosDisponiblesSesion3 = computed(() => asientosStore.getAsientosDisponibles(obraId.value, 3));
</script>

<template>
  <div class="content" v-if="obra">
    <section class="main">
      <div class="main__card-layer">
        <div class="details__card-main">
          <div class="details__card-head">
            <div class="details__title">
              <h1>SESIONES DISPONIBLES</h1>
            </div>
            <div class="details__card-mid">
              <h3>Sesiones disponibles en nuestras salas:</h3>
              <br><br>
              <div class="sesiones">
                <button @click="navegarAReservas(1)">Sesión 1</button>
                <p class="available-seats">Asientos disponibles: <span class="seats-number">{{ asientosDisponiblesSesion1 }}</span></p>
                <button @click="navegarAReservas(2)">Sesión 2</button>
                <p class="available-seats">Asientos disponibles: <span class="seats-number">{{ asientosDisponiblesSesion2 }}</span></p>
                <button @click="navegarAReservas(3)">Sesión 3</button>
                <p class="available-seats">Asientos disponibles: <span class="seats-number">{{ asientosDisponiblesSesion3 }}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
  --details-bg-color: #fff;
  --details-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.1);
  --spacing-unit: 8px;
}

.content {
  height: 700px;
}

.main__card-layer {
  height: 450px;
  background: var(--details-bg-color);
  border-radius: 1rem;
  padding: 2rem;
  margin: 1rem;
  box-shadow: var(--details-shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.main__card-layer:hover {
  transform: translateY(-0.5rem);
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.15);
}

.details__title h1 {
  font-size: 2.5rem;
  color: var(--btn-color);
  margin-bottom: 1rem;
}

.details__desc p {
  font-size: 1rem;
  color: var(--dark-color);
  margin-bottom: 1.5rem;
}

.details__card-mid p {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.sesiones{
  display: flex;
  flex-direction: column;
}

.sesiones button {
  background-color: var(--btn-color);
  color: #ffffff;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.sesiones button:hover {
  background-color: var(--primary-color);
}

.available-seats {
  font-size: 1.2rem; /* Adjust the size as needed */
  margin-bottom: 10px;
}

.seats-number {
  color: red;
  font-weight: bold;
}
</style>
