<template>
  <div id="app">
    <Slideout menu="#menu" panel="#panel" :toggleSelectors="['.toggle-button']">

      <nav id="menu">
        <div>Menu</div>
        <ul>
          <li v-on:click="closeMenu"><router-link to="/">Home</router-link></li>
          <li v-on:click="closeMenu"><router-link to="/users">Users</router-link></li>
        </ul>
      </nav>

      <main id="panel">

        <b-navbar toggleable="md" type="dark" variant="dark" fixed="top" sticky=True>

          <b-navbar-toggle target="nav_collapse" class="toggle-button"></b-navbar-toggle>

          <b-navbar-brand to="/">Inmo App</b-navbar-brand>

          <b-collapse is-nav id="nav_collapse">

            <b-navbar-nav>
              <b-nav-item to="/users">Users</b-nav-item>
              <b-nav-item href="#" disabled>Disabled</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">

              <b-nav-form>
                <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
                <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
              </b-nav-form>

              <b-nav-item-dropdown right>
                <!-- Using button-content slot -->
                <template slot="button-content">
                  <em>User</em>
                </template>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item href="#">Signout</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>

          </b-collapse>
        </b-navbar>

        <router-view/>

      </main>
    </Slideout>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Slideout from 'vue-slideout'
import bNavbar from 'bootstrap-vue/es/components/navbar/navbar'

export default {
  name: 'app',
  components: {
    Slideout,
    'b-navbar': bNavbar
  },
  methods: {
    closeMenu: function () {
      this.$children[0].slideout.toggle()
    }
  }
}
</script>

<style>
body {
  width: 100%;
  height: 100%;
  margin: 0;
  background-color: #eee;
}

a:active, a:focus, a:visited,
button:active, button:focus, button:visited { outline: none; }

.slideout-menu {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 256px;
  height: 100vh;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  z-index: 0;
  display: none;
  background-color: #343a40;
  color: white;
}

.slideout-menu-left {
  left: 0;
}

.slideout-menu-right {
  right: 0;
}

.slideout-panel {
  background-color: #eee;
  position: relative;
  z-index: 1;
  will-change: transform;
  min-height: 100vh;
}

.slideout-open,
.slideout-open body,
.slideout-open .slideout-panel {
  overflow: hidden;
}

.slideout-open .slideout-menu {
  display: block;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/** Navbar styles **/
#nav_collapse.collapsing, #nav_collapse.show { display: none !important; }
</style>
