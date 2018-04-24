<template>
  <div>
    <div class="container main-content">
      <router-view/>
    </div>
    <layout-footer/>
  </div>
</template>

<script>
import LayoutFooter from '@/components/layout/LayoutFooter'

export default {
  name: 'auth-layout',
  components: {
    LayoutFooter
  }
}
</script>
