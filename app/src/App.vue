<template>
  <div id="app">
    <Slideout menu="#menu" panel="#panel" :toggleSelectors="['.toggle-button']">

      <sidebar-menu/>

      <main id="panel">

        <top-menu/>

        <div class="container main-content">
          <router-view/>
        </div>

        <footer>
          <div class="container">
            &copy; 2018 Inmo App
          </div>
        </footer>

      </main>
    </Slideout>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Slideout from 'vue-slideout'
import SidebarMenu from '@/components/SidebarMenu'
import TopMenu from '@/components/TopMenu'

export default {
  name: 'app',
  components: {
    Slideout,
    SidebarMenu,
    TopMenu
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

h1, .h1 { font-size: 2rem; }
a:active, a:focus, a:visited,
button:active, button:focus, button:visited { outline: none; }

footer {
  width: 100%;
  background-color: #343a40;
  color: white;
  padding: 20px;
}

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
  color: #2c3e50;
}

.main-content { padding: 15px 10px; }

/** Navbar styles **/
#nav_collapse.collapsing, #nav_collapse.show { display: none !important; }
</style>
