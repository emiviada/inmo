<template>
  <div class="w-100">
    <h3>Servicios</h3>
    <div class="row">
      <div class="col-6 col-sm-4">
        <span class="item">
          Agua corriente
          <icon :name="getIcon(inmueble.water)" :class="{'align-middle': true, 'text-success': inmueble.water, 'text-muted': !inmueble.water}"></icon>
        </span>
      </div>
      <div class="col-6 col-sm-4">
        <span class="item">
          Energ&iacute;a El&eacute;ctrica
          <icon :name="getIcon(inmueble.electricity)" :class="{'align-middle': true, 'text-success': inmueble.electricity, 'text-muted': !inmueble.electricity}"></icon>
        </span>
      </div>
      <div class="col-6 col-sm-4">
        <span class="item">
          Gas natural
          <icon :name="getIcon(inmueble.gas)" :class="{'align-middle': true, 'text-success': inmueble.gas, 'text-muted': !inmueble.gas}"></icon>
        </span>
      </div>
      <div class="col-6 col-sm-4">
        <span class="item">
          Alumbrado p&uacute;b.
          <icon :name="getIcon(inmueble.streetlight)" :class="{'align-middle': true, 'text-success': inmueble.streetlight, 'text-muted': !inmueble.streetlight}"></icon>
        </span>
      </div>
      <div class="col-6 col-sm-4">
        <span class="item">
          Cordon cuneta
          <icon :name="getIcon(inmueble.cord)" :class="{'align-middle': true, 'text-success': inmueble.cord, 'text-muted': !inmueble.cord}"></icon>
        </span>
      </div>
      <div class="col-6 col-sm-4">
        <span class="item">
          Pavimento
          <icon :name="getIcon(inmueble.pavement)" :class="{'align-middle': true, 'text-success': inmueble.pavement, 'text-muted': !inmueble.pavement}"></icon>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'inmueble-detail-services',
  props: ['inmueble'],
  methods: {
    getIcon (prop) {
      return prop ? 'check' : 'times'
    }
  }
}
</script>
