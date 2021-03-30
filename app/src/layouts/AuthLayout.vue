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
.auth-layout
  width 100%
  height 100vh

  display flex
  justify-content center
  align-items center

  background-color dialog-background
</style>
