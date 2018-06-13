<template>
  <div class="row">
    <h2 class="bg-subsection" v-if="inmueblesByType.length > 0">{{ type }}</h2>
    <div v-for="inmueble in inmueblesByType" track-by="id" class="col-12 col-sm-12 col-md-12 col-lg-6" @click="goToDetail(inmueble.id)">
      <inmueble-record :inmueble="inmueble" />
    </div>
  </div>
</template>

<script>
import InmuebleRecord from '../inmuebles/InmuebleRecord'

export default {
  name: 'type-section',
  props: ['type', 'typeIndex', 'inmuebles'],
  components: {
    InmuebleRecord
  },
  computed: {
    inmueblesByType () {
      return this.inmuebles.filter(inmueble => inmueble.type.toLowerCase() === this.typeIndex.toLowerCase())
    }
  },
  methods: {
    goToDetail (inmuebleId) {
      this.$router.push({ name: 'InmuebleDetail', params: { id: inmuebleId } })
    }
  }
}
</script>

<style scoped>
h2 {
  display: block;
  font-size: 1rem;
  padding: 5px 10px;
  width: 100%;
  color: white;
  margin-top: 0.5rem;
  margin-bottom: 0;
}
</style>
