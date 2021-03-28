<template>
  <div class="main-layout">
    <Sidebar />
    <router-view />
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

<style lang="stylus">
.main-layout
  height: 100%
</style>
