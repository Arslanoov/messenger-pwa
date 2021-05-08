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
  display flex
  justify-content center
  align-items center

  width 100%
  height 100vh

  padding 8rem

  background: auth-page-background
  background: auth-page-gradient
</style>
