<template>
  <div class="thumb border rounded">
    <cloudinary v-if="mainPicture" :public_id="mainPicture" :responsive="true" :crop="'scale'" :htmlClasses="'mb-1 rounded-top'" />
    <img v-else src="../../assets/images/inmueble_placeholder.png" class="mb-1 rounded-top">
    {{ getInmuebleType(inmueble.type) }}
    <br>
    {{ inmueble.street }}
  </div>
</template>

<script>
import Cloudinary from '../common/Cloudinary'
import { inmuebleTypes } from '../../common'

export default {
  name: 'inmueble-thumb',
  props: ['inmueble'],
  components: {
    Cloudinary
  },
  computed: {
    mainPicture () {
      var pic = null
      var picsToCheck = ['patio', 'bedroom', 'dinningroom', 'front']
      picsToCheck.forEach(val => {
        if (this.inmueble.pics[val] && this.inmueble.pics[val].pic) {
          pic = this.inmueble.pics[val].pic
        }
      })

      return pic
    }
  },
  methods: {
    getInmuebleType (inmuebleType) {
      return inmuebleTypes[inmuebleType]
    }
  }
}
</script>

<style scoped>
.thumb {
  background-color: #eee;
  padding: 10px;
  font-size: .9rem;
  line-height: 1.3;
  cursor: pointer;
}
.thumb img, .thumb div img { width: 100%; }
</style>
