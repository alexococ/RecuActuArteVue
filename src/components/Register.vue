<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useRegisterStore } from "@/Store/RegisterStore";
import { ref } from "vue";

const formData = ref({ username: "", password: "" });

const registerStore = useRegisterStore();

const submitForm = async (e: Event) => {
  e.preventDefault();
  await registerStore.registrarUsuario(formData.value.username, formData.value.password);
};
</script>

<template>
  <div class="container-login">
    <div class="card">
      <h2>Cuenta Usuario</h2>
      <form class="form" @submit.prevent="submitForm">
        <input type="text" placeholder="Usuario" v-model="formData.username" />
        <input type="password" placeholder="Contraseña" v-model="formData.password" />
        <button type="submit">
          Registrarse
        </button>

        <p>¿Tienes cuenta?</p>
        <RouterLink to="/loginUser">Logearse</RouterLink>

        <p>¿Eres administrador?</p>
        <RouterLink to="/login">Acceder</RouterLink>


      </form>
    </div>
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

.container-login {
  position: relative;
}

.card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -60%);
  place-items: center;
  z-index: 3;
  width: 30%;
  padding: 160px 30px 38px;
  border-radius: 1.25rem;
  background: var(--background-color);
  text-align: center;
  box-shadow: 0 100px 100px rgb(0 0 0 / 10%);
}

.card::before {
  content: "";
  position: absolute;
  background: var(--dark-color);
  top: -880px;
  left: 50%;
  width: 1000px;
  height: 1000px;
  border-radius: 50%;
  translate: -50% 0;
}

.card .logo {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--dark-color);
  height: 64px;
  width: 64px;
  top: 30px;
  left: 50%;
  translate: -50% 0;
}

.card .logo i {
  font-size: 50px;
  columns: var(--btn-color);
  font-weight: 500;
}

.card>h2 {
  font-size: 22px;
  font-weight: 400;
  margin: 0 0 30px;
  color: #2a3444;
}

.form {
  margin: 0 0 30px;
  display: grid;
  gap: 18px;
}

.form>input,
.form>button {
  width: 100%;
  height: 50px;
  border-radius: 20px;
}

.form>input {
  border: 2px solid #e0e0e0;
  font-family: inherit;
  font-size: 16px;
  padding: 0 24px;
  color: #271d13;
  transition: all 0.375s;
}

.form>input:hover {
  border: 2px solid #000;
}

.form>input::placeholder {
  color: #cac8c8;
}

.form>button {
  cursor: pointer;
  width: 100%;
  height: 50px;
  padding: 0 16px;
  background: var(--primary-color);
  color: #f9f9f9;
  border: 0;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  letter-spacing: 2px;
  transition: all 0.375s;
}

.form>button:hover {
  color: #fff;
  background-color: var(--main-color);
}
</style>
