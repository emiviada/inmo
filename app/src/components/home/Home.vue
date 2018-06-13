<template>
  <div>
    <div class="row">
      <div class="btn-group filters" role="group" aria-label="Filtros">
        <button type="button" class="btn btn-secondary" @click.prevent="filterBy('')" :class="{'active': filter === '' }">Todos</button>
        <button type="button" class="btn btn-secondary" @click.prevent="filterBy('venta')" :class="{'active': filter === 'venta' }">Venta</button>
        <button type="button" class="btn btn-secondary" @click.prevent="filterBy('alquiler')" :class="{'active': filter === 'alquiler' }">Alquiler</button>
      </div>
    </div>

    <div v-for="(type, index) in types">
      <type-section :type="type" :typeIndex="index" :inmuebles="filteredInmuebles"></type-section>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { inmuebleTypes } from '../../common'
import TypeSection from './TypeSection'
import InmuebleThumb from '../inmuebles/InmuebleThumb'

export default {
  name: 'home',
  components: {
    TypeSection, InmuebleThumb
  },
  data () {
    return {
      types: inmuebleTypes,
      filter: ''
    }
  },
  computed: {
    ...mapGetters({
      inmuebles: 'getInmuebles'
    }),
    filteredInmuebles () {
      if (this.filter === '') {
        return this.inmuebles
      } else {
        return this.inmuebles.filter(inmueble => inmueble.operation.toLowerCase() === this.filter.toLowerCase())
      }
    }
  },
  methods: {
    filterBy (by) {
      this.filter = by
    }
  },
  created () {
    this.$store.dispatch('fetchInmuebles')
  }
}
</script>

<style scoped>
.filters { width: 100%; }
.filters button { width: 33%;cursor: pointer; }
.filters button:first-child { width: 34%; }
.filters button.active {
  background-color: #727b84;
  border-color: #6c757d;
  box-shadow: none;
}
@media (min-width: 992px) {
  .filters { width: 50%; }
}
</style>
