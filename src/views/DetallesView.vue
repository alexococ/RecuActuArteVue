<script setup>
import DetallesObra from "@/components/DetallesObra.vue";
import InfoObra from "@/components/InfoObra.vue";
</script>


<template>

  <div class="content-obradetails">

    <!-- DETALLES DE LA OBRA -->
    <DetallesObra />

    <!-- INFORMACION DE LA OBRA -->
    <InfoObra />

  </div>

</template>



<style>

.content-obradetails {
  display: flex;
}

</style>
