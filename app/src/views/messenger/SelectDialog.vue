<template>
  <div class="select-dialog">
    <div class="select-dialog__message">
      Select a dialog to start messaging
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "SelectDialog"
})
</script>

<style lang="stylus" scoped>
.select-dialog
  display flex
  justify-content center
  align-items center
</style>
