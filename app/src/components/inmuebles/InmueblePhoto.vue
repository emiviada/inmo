<template>
  <div v-if="attrExists">
    <p class="subsection mb-1">{{ title }}</p>

    <cloudinary v-if="inmueble.pics[attr].pic" :public_id="inmueble.pics[attr].pic" :width="100" :crop="'scale'" />

    <file-uploader v-if="!inmueble.pics[attr].pic" :item="attr + 'Pic'" v-on:uploaded="onUploaded" />

    <label for="InmueblePicObs" class="d-block">Observaciones</label>
    <textarea style="width:100%;" class="form-cotrol form-control-sm" id="InmueblePicObs" v-model="inmueble.pics[attr].obs" maxlength="255" @change="inmueble.pics[attr].changed = true">{{inmueble.pics[attr].obs}}</textarea>
  </div>
</template>

<script>
import Cloudinary from '../common/Cloudinary'
import FileUploader from '../common/FileUploader'

export default {
  name: 'inmueble-photo',
  props: ['inmueble', 'title', 'attr'],
  components: {
    Cloudinary, FileUploader
  },
  computed: {
    attrExists () {
      return this.inmueble &&
        this.inmueble.hasOwnProperty('pics') && this.inmueble.pics.hasOwnProperty(this.attr)
    }
  },
  methods: {
    onUploaded (prop, value) {
      var property = prop.replace('Pic', '')
      this.inmueble.pics[property].pic = value
      this.inmueble.pics[property].changed = true
    }
  }
}
</script>

<style scoped>
  label {
    font-size: .9rem;
    margin-bottom: .25rem;
  }
</style>
