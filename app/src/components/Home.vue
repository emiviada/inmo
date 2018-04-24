<template>
  <div>
    <h1>Bienvenidos a Inmo App</h1>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
    <div class="container">
      <div class="row">
        <div v-for="inmueble in inmuebles" track-by="id" class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3 pl-2 pr-2" @click="goToDetail(inmueble.id)">
          <inmueble-thumb :inmueble="inmueble" />
        </div>
        <div v-if="inmuebles.length == 0" class="col-12">
          <p>No existen Inmuebles.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import InmuebleThumb from './inmuebles/InmuebleThumb'

export default {
  name: 'home',
  components: {
    InmuebleThumb
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      inmuebles: 'getInmuebles'
    })
  },
  methods: {
    goToDetail (inmuebleId) {
      this.$router.push({ name: 'InmuebleDetail', params: { id: inmuebleId } })
    }
  },
  created () {
    this.$store.dispatch('fetchInmuebles')
  }
}
</script>
