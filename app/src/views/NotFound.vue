<template>
  <div class="not-found">
    <h1 class="not-found__title">Page Not Found</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "NotFound"
})
</script>

<style lang="stylus" scoped>
.not-found
  display flex
  flex-direction column

  color white

  &__title
    font-size 3rem
</style>
