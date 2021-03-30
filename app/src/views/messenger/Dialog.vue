<template>
  <div class="dialog">
    <DialogHeader />
    <MessagesList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import DialogHeader from "@/components/common/messenger/dialog-header/DialogHeader.vue";
import MessagesList from "@/components/common/messenger/messages-list/MessagesList.vue";

export default defineComponent({
  name: "Dialog",
  components: {
    MessagesList,
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
