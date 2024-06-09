<script setup>
import { onMounted } from "vue";
import { useInicioStore } from "@/Store/InicioStore";

const inicioStore = useInicioStore();

onMounted(() => {
  inicioStore.fetchObras(true);
});
</script>

<template>
  <!-- Obras -->
  <h1 class="obras__title">Nuevas obras</h1>
  <section class="obras-index">
    <div class="obra" v-for="obra in inicioStore.obras" :key="obra.idObra" :image="obra.imagen">
      <div class="container-img">
        <img :src="obra.imagen" class="img-item" />
      </div>

      <div class="content-card-obra">
        <h3 class="content-card-obra__title">{{ obra.nombreObra }}</h3>
        <RouterLink to="/obras" class="obras-button content-card-obra__button">Ver Más</RouterLink>
      </div>
    </div>
  </section>
</template>


<style>
/*-----------------------------------*\
   * #OBRAS
\*-----------------------------------*/
.obras__title {
  font-size: 50px;
  color: #000;
  margin-bottom: 25px;
  display: flex;
  text-align: center;
  justify-content: center;
}


.obras-index {
  display: flex;
  justify-content: space-around;
  margin-bottom: 70px;
}

.obra {
  display: grid;
  text-align: center;
  gap: 3rem;
  width: 33%;
  background-color: var(--text-color);
  padding: 2rem 3rem;
  border-radius: 0.5rem;
  box-shadow: var(--box-shadow);
}

.content-card-obra__title {
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 20px;
  color: #000;
  margin-bottom: 55px;
}

.container-img img {
  width: 70%;
}



.container-products {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 3rem;
  width: 100%;
}

.card-product {
  background-color: var(--text-color);
  padding: 2rem 3rem;
  border-radius: 0.5rem;
  box-shadow: var(--box-shadow);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container-img {
  width: 100%;
  display: flex;
  justify-content: center;
}

.container-img img {
  max-width: 100%;
  height: auto;
  object-fit: cover;
}

.content-card-product {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content-card-product h3 {
  font-weight: 400;
  font-size: 16px;
  text-align: center;
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

.obras-index {
  display: flex;
  flex-wrap: wrap; /* Allow wrapping of items */
  justify-content: space-around;
  margin-bottom: 70px;
}

.obra {
  display: flex; /* Changed from grid to flex for simpler control */
  flex-direction: column; /* Stack items vertically */
  text-align: center;
  gap: 3rem;
  width: 33%; /* Default width */
  background-color: var(--text-color);
  padding: 2rem 3rem;
  border-radius: 0.5rem;
  box-shadow: var(--box-shadow);
}




@media (max-width: 768px) { 
  .obras-index {
    justify-content: center;
  }

  .obra {
    width: 100%;
    margin-bottom: 2rem;
  }

  .container-img img {
    width: 90%;
  }
}
</style>
