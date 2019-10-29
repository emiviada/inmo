<template>
  <form class="col-lg-8">

    <div class="form-row">
      <div class="form-check col-12 col-md-6">
        <input class="form-check-input" type="checkbox" name="inmuebleKitchen" id="inmuebleKitchen" v-model="inmueble.kitchen">
        <label class="form-check-label" for="inmuebleKitchen">Cocina</label>
      </div>
      <div class="form-check col-12 col-md-6">
        <input class="form-check-input" type="checkbox" name="inmuebleWaterHeater" id="inmuebleWaterHeater" v-model="inmueble.water_heater">
        <label class="form-check-label" for="inmuebleWaterHeater">Calef&oacute;n</label>
      </div>
    </div>

    <div class="form-row">
      <div class="form-check col-12 col-md-6">
        <input class="form-check-input" type="checkbox" name="inmuebleInmersionHeater" id="inmuebleInmersionHeater" v-model="inmueble.inmersion_heater">
        <label class="form-check-label" for="inmuebleInmersionHeater">Termotanque</label>
      </div>
      <div class="form-check col-12 col-md-6">
        <input class="form-check-input" type="checkbox" name="inmuebleAirConditioner" id="inmuebleAirConditioner" v-model="inmueble.air_conditioner">
        <label class="form-check-label" for="inmuebleAirConditioner">Aire Acond.</label>
      </div>
    </div>

    <div class="form-row">
      <div class="form-check col-12 col-md-6">
        <input class="form-check-input" type="checkbox" name="inmuebleHeater" id="inmuebleHeater" v-model="inmueble.heater">
        <label class="form-check-label" for="inmuebleHeater">Calefactor</label>
      </div>
      <div class="form-check col-12 col-md-6">
        <input class="form-check-input" type="checkbox" name="inmuebleFan" id="inmuebleFan" v-model="inmueble.fan">
        <label class="form-check-label" for="inmuebleFan">Ventilador</label>
      </div>
    </div>

    <div class="form-row">
      <div class="form-check col-12 col-md-6">
        <input class="form-check-input" type="checkbox" name="inmuebleCentralHeater" id="inmuebleCentralHeater" v-model="inmueble.central_heater">
        <label class="form-check-label" for="inmuebleCentralHeater">Calefacci&oacute;n central</label>
      </div>
      <div class="form-check col-12 col-md-6">
        <input class="form-check-input" type="checkbox" name="inmuebleAlarm" id="inmuebleAlarm" v-model="inmueble.alarm">
        <label class="form-check-label" for="inmuebleAlarm">Alarma</label>
      </div>
    </div>

    <div class="form-row">
      <div class="form-check col-12 col-md-6">
        <input class="form-check-input" type="checkbox" name="inmuebleKitchenFurniture" id="inmuebleKitchenFurniture" v-model="inmueble.kitchen_furniture">
        <label class="form-check-label" for="inmuebleKitchenFurniture">Cocina mueble</label>
      </div>
      <div class="form-check col-12 col-md-6">
        <input class="form-check-input" type="checkbox" name="inmueblePlacard" id="inmueblePlacard" v-model="inmueble.placard">
        <label class="form-check-label" for="inmueblePlacard">Placar</label>
      </div>
    </div>

    <div class="form-row">
      <div class="form-check col-12 col-md-6">
        <input class="form-check-input" type="checkbox" name="inmuebleCampana" id="inmuebleCampana" v-model="inmueble.campana">
        <label class="form-check-label" for="inmuebleCampana">Campana</label>
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
  export default {
    name: 'artefacts-form',
    props: ['inmueble'],
    data () {
      return {
        submitting: false
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

<style scoped>
  .form-check-input { margin-left: 0; }
  .form-check-label { font-size: 0.85rem; padding-left: 20px; }
</style>
