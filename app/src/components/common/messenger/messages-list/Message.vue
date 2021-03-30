<template>
  <div class="message" :class="{
    mine: message.isMine,
    partner: !message.isMine
  }">
    {{ message.content }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "Message",
  props: {
    // TODO: Add interface check
    message: {
      type: Object,
      required: true
    }
  }
})
</script>

<style lang="stylus">
.message
  display flex
  flex-direction column

  max-width 80%

  padding 1rem 1.5rem

  margin-top 1rem

  &:first-of-type {
    margin-top 0
  }

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
