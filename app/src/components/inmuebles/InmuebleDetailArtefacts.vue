<template>
  <div class="w-100">
    <h3>Instal./Artefactos</h3>
    <div class="row">
      <div class="col-6 col-sm-4">
        <span class="item">
          Cocina
          <icon :name="getIcon(inmueble.kitchen)" :class="{'align-middle': true, 'text-success': inmueble.kitchen, 'text-muted': !inmueble.kitchen}"></icon>
        </span>
      </div>
      <div class="col-6 col-sm-4">
        <span class="item">
          Calef&oacute;n
          <icon :name="getIcon(inmueble.water_heater)" :class="{'align-middle': true, 'text-success': inmueble.water_heater, 'text-muted': !inmueble.water_heater}"></icon>
        </span>
      </div>
      <div class="col-6 col-sm-4">
        <span class="item">
          Termotanque
          <icon :name="getIcon(inmueble.inmersion_heater)" :class="{'align-middle': true, 'text-success': inmueble.inmersion_heater, 'text-muted': !inmueble.inmersion_heater}"></icon>
        </span>
      </div>
      <div class="col-6 col-sm-4">
        <span class="item">
          Aire Acond.
          <icon :name="getIcon(inmueble.air_conditioner)" :class="{'align-middle': true, 'text-success': inmueble.air_conditioner, 'text-muted': !inmueble.air_conditioner}"></icon>
        </span>
      </div>
      <div class="col-6 col-sm-4">
        <span class="item">
          Calefactor
          <icon :name="getIcon(inmueble.heater)" :class="{'align-middle': true, 'text-success': inmueble.heater, 'text-muted': !inmueble.heater}"></icon>
        </span>
      </div>
      <div class="col-6 col-sm-4">
        <span class="item">
          Ventilador
          <icon :name="getIcon(inmueble.fan)" :class="{'align-middle': true, 'text-success': inmueble.fan, 'text-muted': !inmueble.fan}"></icon>
        </span>
      </div>
      <div class="col-6 col-sm-4">
        <span class="item">
          Calefac. central
          <icon :name="getIcon(inmueble.central_heater)" :class="{'align-middle': true, 'text-success': inmueble.central_heater, 'text-muted': !inmueble.central_heater}"></icon>
        </span>
      </div>
      <div class="col-6 col-sm-4">
        <span class="item">
          Alarma
          <icon :name="getIcon(inmueble.alarm)" :class="{'align-middle': true, 'text-success': inmueble.alarm, 'text-muted': !inmueble.alarm}"></icon>
        </span>
      </div>
      <div class="col-6 col-sm-4">
        <span class="item">
          Cocina mueble
          <icon :name="getIcon(inmueble.kitchen_furniture)" :class="{'align-middle': true, 'text-success': inmueble.kitchen_furniture, 'text-muted': !inmueble.kitchen_furniture}"></icon>
        </span>
      </div>
      <div class="col-6 col-sm-4">
        <span class="item">
          Placar
          <icon :name="getIcon(inmueble.placard)" :class="{'align-middle': true, 'text-success': inmueble.placard, 'text-muted': !inmueble.placard}"></icon>
        </span>
      </div>
      <div class="col-6 col-sm-4">
        <span class="item">
          Campana
          <icon :name="getIcon(inmueble.campana)" :class="{'align-middle': true, 'text-success': inmueble.campana, 'text-muted': !inmueble.campana}"></icon>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'inmueble-detail-artefacts',
  props: ['inmueble'],
  methods: {
    getIcon (prop) {
      return prop ? 'check' : 'times'
    }
  }
}
</script>
