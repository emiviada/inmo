<template>
  <div class="w-100">
    <h3>Superficie</h3>
    <div class="row pb-1">
      <div class="col-4 area">
        <span class="d-block super">Frente</span>
        <span class="d-block">{{ inmueble.area_front }}</span>
      </div>
      <div class="col-4 area">
        <span class="d-block super">Fondo</span>
        <span class="d-block">{{ inmueble.area_back }}</span>
      </div>
      <div class="col-4 area">
        <span class="d-block super">Total</span>
        <span class="d-block">{{ areaTotal }}</span>
      </div>
    </div>
    <div class="row">
      <div class="col-12 area">
        <span class="d-block super">Edificada</span>
        <span class="d-block">{{ inmueble.area_built }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'inmueble-detail-area',
  props: ['inmueble'],
  computed: {
    areaTotal () {
      return this.inmueble.area_front + this.inmueble.area_back
    }
  }
}
</script>
