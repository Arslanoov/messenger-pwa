<template>
  <MainLayout />
</template>

<script lang="ts">
import { defineComponent } from "vue"

import MainLayout from "@/layouts/MainLayout.vue"

export default defineComponent({
  name: "App",
  components: {
    MainLayout
  }
})
</script>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #2c3e50
</style>
