<template>
  <div v-html="getImg" />
</template>

<script>
import cloudinary from 'cloudinary-core'

export default {
  name: 'cloudinary',
  props: {
    public_id: {
      type: String
    },
    width: {
      default: 'auto'
    },
    height: {
      default: 'auto'
    },
    crop: {
      type: String
    },
    htmlClasses: {
      type: String
    },
    responsive: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      cl: cloudinary.Cloudinary.new({ cloud_name: 'dq2ghwy1m', secure: true })
    }
  },
  computed: {
    getImg () {
      let attrs = { width: this.width, responsive: this.responsive }
      if (this.crop) {
        attrs.crop = 'scale'
      }
      attrs.class = this.getHtmlClasses()
      var tag = this.cl.imageTag(this.public_id, attrs)
      return tag.toHtml()
    }
  },
  methods: {
    getHtmlClasses () {
      let classes = this.htmlClasses
      if (this.responsive) {
        classes += ' cld-responsive'
      }
      return classes
    }
  },
  mounted () {
    if (this.responsive) {
      this.cl.responsive()
    }
  }
}
</script>

<style>
img.cld-responsive { width: 100%; }
</style>
