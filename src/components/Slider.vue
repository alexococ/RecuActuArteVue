<!-- eslint-disable vue/multi-word-component-names -->
<script>

</script>



<!-- CARRUSEL DE IMAGENES -->
<template>
  <!-- Slider -->
  <section class="container-slider">
    <div class="slider-wrapper">
      <div class="slider">
        <img id="slide-1" src="../assets/img/slider1.jpg" />
        <img id="slide-2" src="../assets/img/slider2.jpg" />
        <img id="slide-3" src="../assets/img/slider3.jpg" />
      </div>
      <div class="slider-nav">
        <a href="#slide-1"></a>
        <a href="#slide-2"></a>
        <a href="#slide-3"></a>
      </div>
    </div>
  </section>
</template>

<!-- ESTILOS PARA EL CARRUSEL DE IMAGENES -->
<style>
/*-----------------------------------*\
   * #CARRUSEL
\*-----------------------------------*/
.container-slider {
  margin-top: 1300px;
  width: 100%;
  padding: 2rem;
}

.slider-wrapper {
  width: 100%;
  position: relative;
  max-width: 80rem;
  margin: 0 auto;
}

.slider {
  display: flex;
  aspect-ratio: 16/9;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  box-shadow: 0 1.5rem 3rem -0.75rem hsla(0, 0%, 0%, 0.25);
  border-radius: 0.5rem;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.slider::-webkit-scrollbar {
  display: none;
}

.slider img {
  flex: 1 0 100%;
  scroll-snap-align: start;
  -o-object-fit: cover;
  object-fit: cover;
}

.slider-nav {
  display: flex;
  -moz-column-gap: 1rem;
  column-gap: 1rem;
  position: absolute;
  bottom: 1.25rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}

.slider-nav a {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: #fff;
  opacity: 0.75;
  transition: opacity ease 250ms;
}

.slider-nav a:hover {
  opacity: 1;
}
</style>
