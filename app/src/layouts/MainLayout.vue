<template>
  <div class="main-layout">
    <sidebar class="sidebar-wrapper" />
    <router-view class="view-wrapper" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import Sidebar from "@/modules/Sidebar.vue"

// TODO: Layout from meta

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

.sidebar-wrapper
  flex-shrink 0

.view-wrapper
  width 100%
</style>
