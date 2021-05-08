<template>
  <div class="message" :class="{
    mine: message.isMine,
    partner: !message.isMine
  }">
    {{ message.content }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"

import { MessageInterface } from "@/types/message"

export default defineComponent({
  name: "Message",
  props: {
    message: {
      type: Object as PropType<MessageInterface>,
      required: true
    }
  }
})
</script>

<style lang="stylus" scoped>
.message
  display flex
  flex-direction column

  max-width 80%

  margin-top message-margin
  padding 1.6rem 2.4rem

  &:first-of-type
    margin-top 0

  &.mine
    margin-left auto

    border-radius message-border-radius 0 message-border-radius message-border-radius

    background-color message-mine-background
    color message-mine-color

  &.partner
    margin-right auto

    border-radius 0 message-border-radius message-border-radius

    background-color message-partner-background
    color message-partner-color
</style>
