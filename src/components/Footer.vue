<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
    import { RouterLink } from 'vue-router'
</script>

<template>
    <footer class="footer">
        <div class="footer__col-1">
            <h3 class="footer__title">Redes sociales</h3>
            <a href="https://github.com/Dvniiel/ActuArteBack"><i class="ri-github-fill"></i></a>
            <a href="https://github.com/Dvniiel/ActuArteVue"><i class="ri-github-fill"></i></a>
            <a href="#"><i class="ri-instagram-fill"></i></a>
        </div>



        <div class="footer__col-3">
            <h3 class="footer__title">Contacto</h3>
            <p class="footer__info">
                +34 123456789
            </p>
            <p class="footer__info">
                teatroDigital@gmail.com
            </p>
            <br>
            <RouterLink  to="/contacto" class="Router_Contact"> Contacto </RouterLink>
        </div>
    </footer>
</template>




<style>

.footer {
    margin-top: 0px;
    width: 100%;
    padding: 50px;
    background: var(--dark-color);
    color: #fff;
    display: flex;
    justify-content: space-around;
}

.footer div {
    text-align: center;
}

.footer div h3 {
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 30px;
    letter-spacing: 1px;
    color: var(--text-color);
}

.footer__col-1 a i {
    color: var(--text-color);
    font-size: 30px;
    letter-spacing: 10px;
}


.info-footer {
    margin-bottom: 20px;
    text-decoration: none;
    list-style: none;
}

.info-footer a {
    color: var(--main-color);
}

.Router_Contact{
    display: flex;
    justify-content: center;
    background-color: var(--primary-color);
    color: #000;
    border: none;
    border-radius: 30px;
    padding: 14px 35px;
    color: white;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
}

</style>