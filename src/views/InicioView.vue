<script setup>
import CardIndex from '@/components/CardIndex.vue'
import InfoReserva from '@/components/InfoReserva.vue'
import Slider from '@/components/Slider.vue'
</script>



<template>

  <!-- CARRUSEL DE IMAGENES -->
  <Slider/>

  <!-- TARJETAS DE OBRA-->
  <CardIndex/>

  <!-- INFO DE RESERVAS -->
  <InfoReserva/>

</template>

<style>

body {
    background-color: #C2BAAA;
    font-family: "Poppins", sans-serif;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
