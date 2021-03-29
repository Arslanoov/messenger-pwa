<template>
  <div class="sidebar">
    <Profile />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import Profile from "@/components/common/sidebar/Profile.vue"

export default defineComponent({
  name: "Sidebar",
  components: {
    Profile
  }
})
</script>

<style lang="stylus" scoped>
.sidebar
  width 25%
  height 100vh

  background-color sidebar-background

  +breakpoint-to(breakpoints.desktop-md)
    width 30%

  +breakpoint-to(breakpoints.desktop-sm)
    width 40%

  +breakpoint-to(breakpoints.tablet)
    width 100%
    height 100px
</style>
