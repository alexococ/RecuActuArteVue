<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <!-- EMAIL: actuartecontacto@gmail.com -->
    <!-- PASS: actuarte12345 -->
    <form action="https://formsubmit.co/actuartecontacto@gmail.com" method="POST">
      <h2 class="h2-contact">Contacto</h2>
  
      <div class="input-group">
        <label for="name">Nombre</label>
        <input type="text" name="name" id="name" placeholder="Nombre" />
  
        <label for="phone">Telefono</label>
        <input type="tel" name="phone" id="phone" placeholder="Telefono" />
  
        <label for="email">Email</label>
        <input type="email" name="email" id="email" placeholder="Email" />
  
        <label for="message">Mensaje</label>
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="5"
          placeholder="Mensaje"
        ></textarea>
  
        <div class="form-txt">
          <a href="#">Políticas de privacidad</a>
          <a href="#">Terminos y condiciones</a>
        </div>
  
        <input class="enviar_contacto" type="submit" value="Enviar" />
      </div>
    </form>
    <br><br>
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
  * {
    box-sizing: border-box;
  }
  
  form {
    max-width: 500px;
    margin: 2rem auto;
    padding: 2rem;
    background: #f9f5f0;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  textarea{
      border-radius: 20px;
  }
  
  
  .h2-contacto {
    text-align: center;
    color: #63595c;
    margin-bottom: 1rem;
  }
  
  .input-group {
    margin-bottom: 1rem;
  }
  
  .input-group label {
    display: block;
    color: #63595c;
    margin-bottom: 0.5rem;
  }
  
  .input-group input,
  .input-group textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 1rem;
  }
  
  .input-group textarea {
    resize: vertical;
  }
  
  .form-txt {
    text-align: center;
    margin-top: 1rem;
  }
  
  .form-txt a {
    color: #5e0a0f;
    text-decoration: none;
    margin: 0 0.5rem;
  }
  
  .form-txt a:hover {
    text-decoration: underline;
  }
  
  .enviar_contacto {
    display: block;
    width: 100%;
    padding: 1rem;
    border: none;
    background: #c7a17a;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    text-transform: uppercase;
  }
  
  .enviar_contacto:hover {
    background: #a85d4b;
  }
  
  @media (max-width: 768px) {
    form {
      padding: 1rem;
    }
  }
  </style>
  