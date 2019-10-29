<template>
  <div>
    <h4 class="subsection">Superficie</h4>

    <div class="form-row">
      <div class="col-md-12">Del terreno</div>
      <div class="form-group col-md-4">
        <label for="inmuebleAreaFront">Frente</label>
        <input type="text" v-validate="'decimal'" :class="{'form-control': true, 'is-danger': errors.has('inmuebleAreaFront') }" v-model="inmueble.area_front" id="inmuebleAreaFront" name="inmuebleAreaFront" >
        <span v-show="errors.has('inmuebleAreaFront')" class="help is-danger">{{ errors.first('inmuebleAreaFront') }}</span>
      </div>
      <div class="form-group col-md-4">
        <label for="inmuebleAreaBack">Fondo</label>
        <input type="text" v-validate="'decimal'" :class="{'form-control': true, 'is-danger': errors.has('inmuebleAreaBack') }" v-model="inmueble.area_back" id="inmuebleAreaBack" name="inmuebleAreaBack" >
        <span v-show="errors.has('inmuebleAreaBack')" class="help is-danger">{{ errors.first('inmuebleAreaBack') }}</span>
      </div>
      <div class="form-group col-md-4 text-right">
        <label for="inmuebleAreaTotal">Total</label>
        <input type="text" readonly v-bind:value="areaTotal" class="form-control-plaintext text-right" id="inmuebleAreaTotal" placeholder="0" >
      </div>
    </div>

    <div class="form-row">
      <div class="col-md-12">Edificada</div>
      <div class="form-group col-md-4">
        <label for="inmuebleAreaBuilt">Total</label>
        <input type="text" v-validate="'decimal'" :class="{'form-control': true, 'is-danger': errors.has('inmuebleAreaBuilt') }" v-model="inmueble.area_built" id="inmuebleAreaBuilt" name="inmuebleAreaBuilt" >
        <span v-show="errors.has('inmuebleAreaBuilt')" class="help is-danger">{{ errors.first('inmuebleAreaBuilt') }}</span>
      </div>
    </div>

    <h4 class="subsection">Servicios</h4>

    <div class="form-row">
      <div class="form-check col-6 col-md-4">
        <input class="form-check-input" type="checkbox" name="inmuebleWater" id="inmuebleWater" v-model="inmueble.water">
        <label class="form-check-label" for="inmuebleWater">Agua corriente</label>
      </div>
      <div class="form-check col-6 col-md-4">
        <input class="form-check-input" type="checkbox" name="inmuebleElectricity" id="inmuebleElectricity" v-model="inmueble.electricity">
        <label class="form-check-label" for="inmuebleElectricity">Energ&iacute;a El&eacute;ctrica</label>
      </div>
      <div class="form-check col-6 col-md-4">
        <input class="form-check-input" type="checkbox" name="inmuebleGas" id="inmuebleGas" v-model="inmueble.gas">
        <label class="form-check-label" for="inmuebleGas">Gas Natural</label>
      </div>
      <div class="form-check col-6 col-md-4">
        <input class="form-check-input" type="checkbox" name="inmuebleStreetlight" id="inmuebleStreetlight" v-model="inmueble.streetlight">
        <label class="form-check-label" for="inmuebleStreetlight">Alumbrado P&uacute;b.</label>
      </div>
      <div class="form-check col-6 col-md-4">
        <input class="form-check-input" type="checkbox" name="inmuebleCord" id="inmuebleCord" v-model="inmueble.cord">
        <label class="form-check-label" for="inmuebleCord">Cord&oacute;n Cuneta</label>
      </div>
      <div class="form-check col-6 col-md-4">
        <input class="form-check-input" type="checkbox" name="inmueblePavement" id="inmueblePavement" v-model="inmueble.pavement">
        <label class="form-check-label" for="inmueblePavement">Pavimento</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'edit-general-form',
  props: ['inmueble'],
  data () {
    return {}
  },
  computed: {
    areaTotal () {
      return Math.round(parseFloat(this.inmueble.area_front) * parseFloat(this.inmueble.area_back))
    }
  }
}
</script>

<style scoped>
  .form-check-input { margin-left: 0; }
  .form-check-label { font-size: 0.85rem; padding-left: 20px; }
</style>
