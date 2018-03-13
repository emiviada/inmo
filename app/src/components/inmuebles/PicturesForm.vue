<template>
  <form class="col-lg-10">
    <div class="form-row">
      <div class="form-group col-12 col-md-6" v-for="picture in pictures">
        <inmueble-photo :inmueble="inmueble" :attr="picture.attr" :title="picture.title" v-bind:id="picture.attr" />
      </div>
    </div>

    <hr/>

    <div class="text-right">
      <router-link to="/inmuebles" class="btn btn-link">Cancelar</router-link> &nbsp;&nbsp;
      <button type="submit" v-on:click.prevent="onSubmit" :disabled="submitting" class="btn btn-success">Guardar</button>
    </div>

  </form>
</template>

<script>
import InmueblePhoto from './InmueblePhoto'

export default {
  name: 'pictures-form',
  props: ['inmueble'],
  components: {
    InmueblePhoto
  },
  data () {
    return {
      submitting: false,
      pictures: [
        {attr: 'front', title: 'Fachada'},
        {attr: 'hall', title: 'Hall Ingreso'},
        {attr: 'bedroom', title: 'Dormitorio'},
        {attr: 'badroom', title: 'Baño'},
        {attr: 'kitchen', title: 'Cocina'},
        {attr: 'kitcken_diningroom', title: 'Cocina Comedor'},
        {attr: 'diningroom', title: 'Comedor'},
        {attr: 'living', title: 'Living'},
        {attr: 'sink', title: 'Lavadero'},
        {attr: 'tender', title: 'Tender'},
        {attr: 'gallery', title: 'Galería'},
        {attr: 'grill', title: 'Asador'},
        {attr: 'gazebo', title: 'Quincho'},
        {attr: 'patio', title: 'Patio'},
        {attr: 'hallway', title: 'Pasillo'},
        {attr: 'garage', title: 'Garage'}
      ]
    }
  },
  methods: {
    onSubmit () {
      this.submitting = true
      this.$emit('submit', this.inmueble)
      var _this = this
      setTimeout(function () { _this.submitting = false }, 2000)
    }
  }
}
</script>
