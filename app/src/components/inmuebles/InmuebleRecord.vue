<template>
  <div class="row record">
    <div class="col-3 text-center">
      <cloudinary v-if="mainPicture" :public_id="mainPicture" :responsive="true" :crop="'scale'" :htmlClasses="'rounded-circle'" />
      <img v-else src="../../assets/images/inmueble_placeholder.png" class="rounded-circle">
    </div>
    <div class="col-9 pt-1">
      {{ inmueble.street }} <br>
      <span class="form-text text-muted mt-0">{{ location }}</span>
    </div>
  </div>
</template>

<script>
import { provinces } from '../../common'
import Cloudinary from '../common/Cloudinary'

export default {
  name: 'inmueble-record',
  props: ['inmueble'],
  components: { Cloudinary },
  computed: {
    location () {
      let location = ''
      location += this.inmueble.city ? this.inmueble.city : ''
      location += location !== '' && this.inmueble.state ? ', ' : ''
      location += this.inmueble.state ? provinces[this.inmueble.state] : ''
      return location
    },
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
  }
}
</script>

<style>
.record {
  background-color: white;
  padding: 5px 0;
  border-bottom: 1px solid #00796B;
  font-size: 0.8rem;
  line-height: 1rem;
  cursor: pointer;
}
.record img {
  width: 100%;
  max-width: 50px;
  min-height: 50px;
}
@media (min-width: 768px) {
  .record img {
    max-width: 75px;
    min-height: 75px;
  }
}
@media (min-width: 992px) {
  .record {
    border: 1px solid #00796B;
    margin: 5px;
  }
}
</style>
