<template>
  <div v-html="getImg" />
</template>

<script>
import cloudinary from 'cloudinary-core'

export default {
  name: 'cloudinary',
  props: ['public_id', 'width', 'height'],
  data () {
    return {
      cl: new cloudinary.Cloudinary({ cloud_name: 'dq2ghwy1m', secure: true })
    }
  },
  computed: {
    getImg () {
      var tag = this.cl.imageTag(this.public_id, { width: this.width, crop: 'scale' })
      return tag.toHtml()
    }
  }
}
</script>
