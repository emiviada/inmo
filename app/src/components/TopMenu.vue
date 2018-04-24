<template>
  <nav class="navbar navbar-dark bg-theme">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <router-link :to="'/'" class="navbar-brand">Inmo App</router-link>
  </nav>
</template>

<script>
export default {
  name: 'top-menu'
}
</script>

<style>
.navbar { color: #fff; }
.navbar-toggler{
  border: 0;
  border-color: transparent;
  cursor: pointer;
}
.navbar-toggler:focus{
  outline: none;
}
.navbar-toggler-icon,
.navbar-light .navbar-brand {
  color: #fff;
}
.navbar-light .navbar-brand:hover { color: #ccc; }
</style>