<template>
  <form class="col-lg-8">

    <div class="form-group">
      <label for="inmuebleType">Tipo de propiedad</label>
      <select v-model="inmueble.type" v-validate="'required'" :class="{'form-control': true, 'is-danger': errors.has('inmuebleType') }" id="inmuebleType" name="inmuebleType" v-bind:disabled="isEditMode">
        <option value="">---</option>
        <option v-for="(type, index) in types" v-bind:value="index">{{ type }}</option>
      </select>
      <span v-show="errors.has('inmuebleType')" class="help is-danger">{{ errors.first('inmuebleType') }}</span>
    </div>

    <div class="form-group">
      <label for="inmuebleOperation">Operaci&oacute;n</label>
      <select v-model="inmueble.operation" v-validate="'required'" :class="{'form-control': true, 'is-danger': errors.has('inmuebleOperation') }" id="inmuebleOperation" name="inmuebleOperation">
        <option value="">---</option>
        <option v-for="(operation, index) in operations" v-bind:value="index">{{ operation }}</option>
      </select>
      <span v-show="errors.has('inmuebleOperation')" class="help is-danger">{{ errors.first('inmuebleOperation') }}</span>
    </div>

    <h4 class="subsection">Ubicaci&oacute;n</h4>

    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="inmuebleStreet">Calle</label>
        <input type="text" class="form-control" v-model="inmueble.street" id="inmuebleStreet" >
      </div>
      <div class="form-group col-md-6">
        <label for="inmuebleNeighborhood">Barrio</label>
        <input type="text" class="form-control" v-model="inmueble.neighborhood" id="inmuebleNeighborhood" ></textarea>
      </div>
    </div>

    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="inmuebleCity">Ciudad</label>
        <input type="text" class="form-control" v-model="inmueble.city" id="inmuebleCity" >
      </div>
      <div class="form-group col-md-6">
        <label for="inmuebleState">Provincia</label>
        <select v-model="inmueble.state" class="form-control" id="InmuebleState">
          <option value="">---</option>
          <option v-for="(province, index) in provinces" v-bind:value="index">{{ province }}</option>
        </select>
      </div>
    </div>

    <div v-if="isEditMode">
      <edit-general-form :inmueble="inmueble" />
    </div>

    <hr/>

    <div class="text-right">
      <router-link to="/inmuebles" class="btn btn-link">Cancelar</router-link> &nbsp;&nbsp;
      <button type="submit" v-on:click.prevent="onSubmit" :disabled="submitting" class="btn btn-success">Guardar</button>
    </div>
  </form>
</template>

<script>
import { inmuebleTypes, operations, provinces } from '../../common'
import EditGeneralForm from './EditGeneralForm'

export default {
  name: 'save-inmueble-form',
  props: ['inmueble', 'mode'],
  components: {
    EditGeneralForm
  },
  data () {
    return {
      types: inmuebleTypes,
      operations: operations,
      provinces: provinces,
      submitting: false
    }
  },
  computed: {
    isEditMode () {
      return this.mode === 'edit'
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
