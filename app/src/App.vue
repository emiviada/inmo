<template>
  <div id="app">
    <layout v-if="isAuthenticated"></layout>
    <auth-layout v-else></auth-layout>
  </div>
</template>

<script>
import Vue from 'vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { Validator } from 'vee-validate'
import Layout from '@/components/layout/Layout'
import AuthLayout from '@/components/layout/AuthLayout'

// Configure validator's messages
const dictionary = {
  es: {
    messages: {
      required: () => 'Este campo es requerido.',
      decimal: () => 'El valor no es válido.',
      email: () => 'Debes ingresar una dirección de e-mail válida.',
      confirmed: () => 'La confirmación no es la misma.',
      min: () => 'Ingresa al menos 6 caracteres.',
      url: () => 'Debes ingresar una URL válida.'
    }
  }
}
// Override and merge the dictionaries
Validator.localize(dictionary)
Validator.localize('es')

export default {
  name: 'app',
  components: {
    Layout,
    AuthLayout
  },
  computed: {
    isAuthenticated () {
      let is = !(this.$route.path.match('login') || false)
      let body = document.getElementsByTagName('body')
      const className = 'bg-theme'
      if (is) {
        body[0].classList.remove(className)
      } else {
        body[0].classList.add(className)
      }

      return is
    }
  },
  created () {
    // Interceptor to sign the user out when we receive a 401 from API
    Vue.http.interceptors.push((req, next) => {
      next(res => {
        if (res.status === 401) {
          this.$store.dispatch('signOut')
            .then(response => this.$router.push({name: 'Login'}))
        }
      })
    })
  }
}
</script>
