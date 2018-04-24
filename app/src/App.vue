<template>
  <div id="app">
    <Slideout menu="#menu" panel="#panel" :toggleSelectors="['.navbar-toggler']"
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
