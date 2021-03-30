<template>
  <div class="auth-layout">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "AuthLayout"
})
</script>

<style lang="stylus" scoped>
.main-layout
  display flex
  height: 100%

  +breakpoint-to(breakpoints.tablet)
    flex-wrap wrap

.sidebar-wrapper
  flex-shrink 0

.view-wrapper
  width 100%

  +breakpoint-to(breakpoints.tablet)
    min-height 100vh
</style>
