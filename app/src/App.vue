<template>
  <div id="app">
    <Slideout menu="#menu" panel="#panel" :toggleSelectors="['.toggle-button']"
      @on-beforeopen="showOverlay" @on-beforeclose="hideOverlay">

      <sidebar-menu/>

      <main id="panel">

        <top-menu/>

        <div class="container main-content">
          <router-view/>
          <div class="overlay" ref="overlay" style="display: none;"></div>
        </div>

        <footer>
          <div class="container clearfix">
            <span class="float-left">&copy; 2018 Inmo App</span>
            <span class="float-right pt-1">
              <icon name="facebook"></icon>&nbsp;&nbsp;
              <icon name="instagram"></icon>&nbsp;&nbsp;
              <icon name="twitter"></icon>
            </span>
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
import { Validator } from 'vee-validate'
import SidebarMenu from '@/components/SidebarMenu'
import TopMenu from '@/components/TopMenu'

// Configure validator's messages
const dictionary = {
  es: {
    messages: {
      required: () => 'Este campo es requerido.',
      decimal: () => 'El valor no es válido.',
      email: () => 'Debes ingresar una dirección de e-mail válida.',
      confirmed: () => 'La confirmación no es la misma.',
      min: () => 'Ingresa al menos 6 caracteres.'
    }
  }
}
// Override and merge the dictionaries
Validator.localize(dictionary)
Validator.localize('es')

export default {
  name: 'app',
  components: {
    Slideout,
    SidebarMenu,
    TopMenu
  },
  methods: {
    showOverlay: function () {
      this.overlay.style.display = 'block'
    },
    hideOverlay: function () {
      this.overlay.style.display = 'none'
    }
  },
  mounted () {
    this.overlay = this.$refs.overlay
  }
}
</script>

<style>
body {
  width: 100%;
  height: 100%;
  margin: 0;
  background-color: #fff;
}

h1, .h1 { font-size: 2rem; }
a:focus, a:hover, button:hover { text-decoration: none;color: inherit; }
a:active, a:focus, a:visited,
button:active, button:focus, button:visited { outline: none; }
textarea:active, textarea:focus, textarea:visited { outline: none; }
ul { padding-left: 0;list-style-type: none; }

footer {
  width: 100%;
  background-color: #343a40;
  color: white;
  padding: 20px;
}

.subsection {
  border-bottom: 1px solid #ddd;
  padding-bottom: 3px;
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
  background-color: #fff;
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

.main-content { padding: 15px; }

.overlay {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0,.4);
  z-index: 3;
}

footer .container {
  font-size: 0.9rem;
}
footer .fa-icon { opacity: 0.5; }

/*** Form errors ***/
.help.is-danger {
  color: #ff3860;
}
input.is-danger, textarea.is-danger, select.is-danger {
  border-color: #ff3860;
}
/*** END Form errors ***/

/*** Override Sweet Modal styles ***/
.sweet-modal.is-alert .sweet-content { padding-bottom: 20px !important; }
/*** END Override Sweet Modal styles ***/
</style>
