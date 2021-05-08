<template>
  <div class="line"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "Line"
})
</script>

<style lang="stylus" scoped>
.line
  width 100%
  height .1rem

  margin line-margin 0

  background line
</style>
