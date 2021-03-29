<template>
  <div class="dialog">
    <DialogHeader />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import DialogHeader from "@/components/common/messenger/dialog-header/DialogHeader.vue";

export default defineComponent({
  name: "Dialog",
  components: {
    DialogHeader
  },
  setup() {
    return {}
  }
})
</script>

<style lang="stylus" scoped>
.dialog
  position relative
</style>
