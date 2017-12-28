<template>
  <b-navbar toggleable="md" type="dark" variant="dark" fixed="top" sticky=True>

    <b-navbar-toggle target="nav_collapse" class="toggle-button"></b-navbar-toggle>

    <b-navbar-brand to="/">Inmo App</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <b-nav-item to="/usuarios">Usuarios</b-nav-item>
        <b-nav-item to="/inmuebles">Inmuebles</b-nav-item>
        <!--<b-nav-item href="#" disabled>Disabled</b-nav-item>-->
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Buscar"/>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Buscar</b-button>
        </b-nav-form>

        <b-nav-item-dropdown right>
          <!-- Using button-content slot -->
          <template slot="button-content">
            <em>Usuario</em>
          </template>
          <b-dropdown-item href="#">Mi Perfil</b-dropdown-item>
          <b-dropdown-item href="#">Cerrar sesi&oacute;n</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
import bNavbar from 'bootstrap-vue/es/components/navbar/navbar'

export default {
  name: 'top-menu',
  components: {
    'b-navbar': bNavbar
  }
}
</script>

<style>

</style>
