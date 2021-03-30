<template>
  <component :is="layout">
  </component>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import MainLayout from "@/layouts/MainLayout.vue"
import AuthLayout from "@/layouts/AuthLayout.vue"
import EmptyLayout from "@/layouts/EmptyLayout.vue"

export default defineComponent({
  name: "App",
  components: {
    MainLayout,
    AuthLayout,
    EmptyLayout
  },
  computed: {
    layout(): string {
      return (this.$route.meta.layout || "empty") + "-layout"
    }
  }
})
</script>

<style lang="stylus" scoped>
</style>
