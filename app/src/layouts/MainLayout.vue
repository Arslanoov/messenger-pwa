<template>
  <div class="main-layout">
    <sidebar class="sidebar-wrapper" />
    <router-view class="view-wrapper" />

    <notifications :duration="10000" position="top left" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import Sidebar from "@/modules/Sidebar.vue"

export default defineComponent({
  name: "MainLayout",
  components: {
    Sidebar
  }
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
