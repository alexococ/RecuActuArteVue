<script setup lang="ts">
import { onMounted, toRefs } from "vue";
import { useDetallesStore } from "@/Store/DetallesStore";
import { useRoute } from "vue-router";

const route = useRoute();
const detallesStore = useDetallesStore();
const { obra } = toRefs(detallesStore);

onMounted(() => {
  const id = Array.isArray(route.params.id)
    ? route.params.id[0]
    : route.params.id;
  detallesStore.fetchObra(id as string);
});
</script>

<template>
  <div class="content" v-if="obra">
    <section class="main">
      <div class="main__card-layer">
        <div class="details__card-main">
          <div class="details__card-head">
            <div class="details__title">
              <h1>{{ obra.nombreObra }}</h1>
            </div>
            <div class="details__desc">
              <p>
                {{ obra.descObra }}
              </p>
            </div>
            <div class="details__card-mid">
              <p>{{ obra.autorObra }}</p>
              <p>{{ obra.valoracionObra }} de valoracion</p>
              <p>{{ obra.directorObra }}</p>
              <p>{{ obra.duracionObra }} minutos</p>
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
}

.content {
  width: 50%;
}

.main__card-layer {
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
</style>
