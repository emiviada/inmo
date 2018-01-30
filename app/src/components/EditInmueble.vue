<template>
  <div>
    <h1>Editar Inmueble</h1>
    <div class="row">
      <save-inmueble-form :inmueble="inmueble" v-on:submit="onFormSave"/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VueNotifications from 'vue-notifications'
import SaveInmuebleForm from './SaveInmuebleForm'

export default {
  name: 'edit-inmueble',
  components: {
    SaveInmuebleForm
  },
  data () {
    return {
      inmueble: {}
    }
  },
  computed: mapGetters(['getInmueble']),
  methods: {
    ...mapActions([
      'saveInmueble'
    ]),
    onFormSave (inmuebleData) {
      // console.log('inmueble Editado con exito', JSON.stringify(inmuebleData))
      var _this = this
      this.saveInmueble(inmuebleData)
        .then((response) => _this.notifySuccessEdition())
        .catch((err) => {
          console.log(err)
          _this.notifyErrorEdition()
        })
    }
  },
  notifications: {
    notifySuccessEdition: {
      type: VueNotifications.types.success,
      title: 'Felicitaciones',
      message: 'Inmueble Editado con éxito'
    },
    notifyErrorEdition: {
      type: VueNotifications.types.error,
      title: 'Error',
      message: 'Intentalo más tarde.'
    }
  },
  mounted () {
    var _this = this
    this.getInmueble(this.$route.params.id)
      .then((inmueble) => {
        _this.inmueble = inmueble
      })
  }
}
</script>
