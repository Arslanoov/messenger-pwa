<template>
  <div class="dialog">
    <DialogHeader />
    <MessagesList />
    <MessageForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import DialogHeader from "@/components/common/messenger/dialog-header/DialogHeader.vue";
import MessagesList from "@/components/common/messenger/messages-list/MessagesList.vue";
import MessageForm from "@/components/common/messenger/message-form/MessageForm.vue";

export default defineComponent({
  name: "Dialog",
  components: {
    MessageForm,
    MessagesList,
    DialogHeader
  }
})
</script>

<style lang="stylus" scoped>
.dialog
  position relative

  display flex
  flex-direction column

  height 100vh
</style>
