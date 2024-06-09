<script setup>

import { computed } from 'vue';
import { useRoute } from 'vue-router';


import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

const route = useRoute();

const showHeaderAndFooter = computed(() => ![ 'NotFound', 'dashboard', 'login', 'register', 'loginUser' ].includes(route.name));
</script>

<template>

  <!-- HEADER -->
  <Header v-if="showHeaderAndFooter" />


  <!-- VISTAS DE LA WEB -->
  <main>
    <RouterView />
  </main>


  <!-- FOOTER -->
  <Footer v-if="showHeaderAndFooter" />
</template>
