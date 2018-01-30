<template>
  <form class="col-lg-8">

    <div class="form-group">
      <label for="inmuebleType">Tipo de propiedad</label>
      <select v-model="inmueble.type" v-validate="'required'" :class="{'form-control': true, 'is-danger': errors.has('inmuebleType') }" id="inmuebleType" name="inmuebleType">
        <option value="">---</option>
        <option v-for="(type, index) in types" v-bind:value="index">{{ type }}</option>
      </select>
      <span v-show="errors.has('inmuebleType')" class="help is-danger">{{ errors.first('inmuebleType') }}</span>
    </div>

    <h4>Ubicaci&oacute;n</h4>

    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="inmuebleStreet">Calle</label>
        <input type="text" class="form-control" v-model="inmueble.street" id="inmuebleStreet" ></textarea>
      </div>
      <div class="form-group col-md-6">
        <label for="inmuebleNeighborhood">Barrio</label>
        <input type="text" class="form-control" v-model="inmueble.neighborhood" id="inmuebleNeighborhood" ></textarea>
      </div>
    </div>

    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="inmuebleCity">Ciudad</label>
        <input type="text" class="form-control" v-model="inmueble.city" id="inmuebleCity" ></textarea>
      </div>
      <div class="form-group col-md-6">
        <label for="inmuebleState">Provincia</label>
        <select v-model="inmueble.state" class="form-control" id="InmuebleState">
          <option value="">---</option>
          <option v-for="(province, index) in provinces" v-bind:value="index">{{ province }}</option>
        </select>
      </div>
    </div>

    <div class="text-right">
      <router-link to="/inmuebles" class="btn btn-link">Cancelar</router-link> &nbsp;&nbsp;
      <button type="submit" v-on:click.prevent="onSubmit" :disabled="submitting" class="btn btn-success">Guardar</button>
    </div>
  </form>
</template>

<script>
import { inmuebleTypes, provinces } from '../common'

export default {
  name: 'save-inmueble-form',
  props: ['inmueble'],
  data () {
    return {
      types: inmuebleTypes,
      provinces: provinces,
      submitting: false
    }
  },
  methods: {
    validateBeforeSubmit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$emit('submit', this.inmueble)
        }
      })
    },
    onSubmit () {
      this.submitting = true
      this.validateBeforeSubmit()
      var _this = this
      setTimeout(function () { _this.submitting = false }, 2000)
    }
  }
}
</script>
