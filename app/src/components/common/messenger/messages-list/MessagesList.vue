<template>
  <div class="messages-list">
    <Message
      v-for="message in messages"
      :message="message"
      :key="message.uuid"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"

import Message from "@/components/common/messenger/messages-list/Message.vue"

export default defineComponent({
  name: "MessagesList",
  components: {
    Message
  },
  setup() {
    const messages = ref([
      {
        uuid: "123e4567-e89b-12d3-a456-426614174000",
        isMine: false,
        wroteAt: "date",
        content: "We can go to the bar we were last Saturday. I like it."
      },
      {
        uuid: "123e4567-e89b-12d3-a456-426614174100",
        isMine: true,
        wroteAt: "date",
        content: "This is a great idea! We will start from Joe’s then we will go to the Fortune Pub and after we will stay at the Natalie’s home."
      },
      {
        uuid: "123e4567-e89b-12d3-a456-426614174200",
        isMine: false,
        wroteAt: "date",
        content: "I am new here. Nice to meet you guys."
      }
    ])

    return {
      messages
    }
  }
})
</script>

<style lang="stylus">
.messages-list
  display flex
  flex-direction column
  flex-basis content

  width 100%
  height 100%
  max-height 100%

  overflow-y scroll

  padding: .5rem 1rem 1rem 1rem

  background-color messages-layout-background

  without-scroll()
</style>
