<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useObrasStore } from '@/Store/ObrasStore';


const route = useRoute();

const obrasStore = useObrasStore();

onMounted(() => {
  obrasStore.fetchObras(true);
});

</script>

<template>
  <div class="container-products" id="obras-container">
    <div class="card-product" v-for="obra in obrasStore.obrasFiltradas" :key="obra.idObra">
      <div class="container-img">
        <img :src="obra.imagen" :alt="obra.nombreObra" class="img-item" />
      </div>
      <div class="content-card-product">
        <h3 class="titulo-item">{{ obra.nombreObra }}</h3>
        <RouterLink :to="{ name: 'Detalles', params: { id: obra.idObra } }" class="obras-button">
          Detalles
        </RouterLink>
      </div>
    </div>
  </div>
</template>



<!-- ESTILOS PARA LAS TARJETAS -->
<style>
:root {
  --primary-color: #c7a17a;
  --background-color: #f9f5f0;
  --dark-color: #63595c;
  --bg-color: #716A5C;
  --text-color: #F1E9DB;
  --main-color: #f1d791;
  --btn-color: #5e0a0f;
  --box-shadow: 0 2rem 3rem var(--dark-color);
}


/*-----------------------------------*\
   * #OBRAS
\*-----------------------------------*/
.container-products {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 3rem;
  width: 100%;
  margin-bottom: 50px;
}

.card-product {
  background-color: var(--text-color);
  padding: 2rem 3rem;
  border-radius: 0.5rem;
  box-shadow: var(--box-shadow);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

.container-img {
  width: 100%;
  height: 15rem;
  display: flex;
  justify-content: center;
  overflow: hidden;
}

.container-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content-card-product {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content-card-product h3 {
  color: #000;
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  margin-top: 1rem;
}

.obras-button {
  background-color: var(--dark-color);
  border: none;
  border-radius: 30px;
  padding: 14px 35px;
  color: white;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  width: fit-content;
}

.obras-button:hover {
  background-color: var(--btn-color);
  color: #ffffff;
  box-shadow: var(--box-shadow);
}
</style>