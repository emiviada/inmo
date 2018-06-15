<template>
  <div>
    <h1>{{ getInmuebleType(inmueble.type) }}</h1>
    <p>{{ inmueble.street }}, {{ inmueble.neighboor }}, {{ inmueble.city }}, {{ inmueble.state }}.</p>

    <div class="row" v-if="pictures.length">
      <slider :items="pictures" class="col-12 pr-0 pl-0" />
    </div>

    <div class="row bg-white details">
      <div class="w-100 pb-3">
        <h3>Precio</h3>
        <div class="row">
          <div class="col-12">$x,xxx,xxx</div>
        </div>
      </div>

      <inmueble-detail-area :inmueble="inmueble" class="pb-3" />

      <inmueble-detail-services :inmueble="inmueble" class="pb-3" />

      <inmueble-detail-artefacts :inmueble="inmueble" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Utils } from '@/mixins/Utils'
import Slider from '@/components/common/Slider'
import InmuebleDetailArea from './InmuebleDetailArea'
import InmuebleDetailServices from './InmuebleDetailServices'
import InmuebleDetailArtefacts from './InmuebleDetailArtefacts'

export default {
  name: 'inmueble-detail',
  components: {
    Slider,
    InmuebleDetailArea,
    InmuebleDetailServices,
    InmuebleDetailArtefacts
  },
  mixins: [Utils],
  data () {
    return {
      inmueble: {},
      pictures: []
    }
  },
  computed: mapGetters(['getInmueble']),
  methods: {
    ...mapActions([
      'showGoBack'
    ])
  },
  mounted () {
    this.showGoBack()
    this.getInmueble(this.$route.params.id)
      .then((inmueble) => {
        this.inmueble = inmueble
        Object.keys(this.inmueble.pics).forEach((key, index) => {
          if (this.inmueble.pics[key] && this.inmueble.pics[key].pic) {
            this.pictures.push(this.inmueble.pics[key])
          }
        })
      })
  }
}
</script>

<style>
.details { padding: 15px; }
h3 {
  font-size: 1.1rem;
  padding-bottom: 5px;
  border-bottom: 1px solid #dadada;
}
.area { line-height: 1.2; }
span {
  font-size: .9rem;
}
.super {
  font-size: .7rem;
  color: #ababab;
}
.item {
  font-size: .75rem;
}
</style>
