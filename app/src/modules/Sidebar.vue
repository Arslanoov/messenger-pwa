<template>
  <div class="sidebar">
    <Profile />
    <Line />
    <dialog-list />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import Profile from "@/components/common/sidebar/profile/Profile.vue"
import Line from "@/components/base/line/Line.vue"
import DialogList from "@/components/common/sidebar/dialog-list/DialogList.vue"

export default defineComponent({
  name: "Sidebar",
  components: {
    Profile,
    Line,
    DialogList
  }
})
</script>

<style lang="stylus" scoped>
.sidebar
  width 25%
  height 100vh
  overflow-y scroll

  background-color sidebar-background

  without-scroll()

  +breakpoint-to(breakpoints.desktop-md)
    width 30%

  +breakpoint-to(breakpoints.desktop-sm)
    width 40%

  +breakpoint-to(breakpoints.tablet)
    width 100%
    height auto
    max-height 100vh
</style>
