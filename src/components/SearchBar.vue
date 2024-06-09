<script setup>
import { ref, watch } from "vue";
import { useObrasStore } from "@/Store/ObrasStore";

const obrasStore = useObrasStore();
const searchQuery = ref("");

const onSearch = () => {
  obrasStore.setSearchQuery(searchQuery.value);
};

watch(searchQuery, onSearch);
</script>

<template>
  <div class="search-bar-container">
    <input
      v-model="searchQuery"
      class="search-bar"
      placeholder="Buscar obras..."
      @input="onSearch"
    />
  </div>
</template>

<style scoped>
.search-bar-container {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}

.search-bar {
  width: 100%;
  max-width: 600px;
  padding: 0.75rem 1rem;
  border-radius: 25px;
  border: 1px solid #ccc;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
  transition: all 0.3s ease-in-out;
  padding-left: 2rem;
  padding-right: 2rem;
  background: #fff url('search-icon.svg') no-repeat right 1rem center;
}

.search-bar::placeholder {
  color: #888;
}

.search-bar:focus {
  outline: none;
  border-color: #5d1049;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}


.search-button {
  background-color: #5d1049;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 25px;
  margin-left: -3.5rem;
  cursor: pointer;
}

.search-button:hover {
  background-color: #422038;
}

/* Responsividad */
@media (max-width: 768px) {
  .search-bar {
    width: 90%;
    margin: 0 auto;
  }
}
</style>
