<template>
  <nav id="menu">
    <div class="title">Inmo App</div>
    <ul>
      <li v-on:click="closeMenu"><router-link to="/">Home</router-link></li>
      <li v-on:click="closeMenu"><router-link to="/usuarios">Usuarios</router-link></li>
      <li v-on:click="closeMenu"><router-link to="/inmuebles">Inmuebles</router-link></li>
    </ul>

    <ul class="logout">
      <li v-on:click="closeMenu"><router-link to="/">Cerrar Sesi&oacute;n</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'sidebar-menu',
  methods: {
    closeMenu: function () {
      this.$parent.slideout.toggle()
    }
  }
}
</script>

<style>
#menu { padding-top: 20px }
#menu .title {
  text-align: center;
  font-weight: bold;
  margin-bottom: 16px;
}
#menu ul {
  list-style-type: none;
  padding-left: 0;
}
#menu ul li {
  border-bottom: 1px solid #eee;
  padding: 10px;
}
#menu ul li:first-child {
  border-top: 1px solid #eee;
}
#menu ul li a {
  color: white;
  text-decoration: none;
  display: block;
}
#menu .logout { margin-top: 100px; }
</style>
