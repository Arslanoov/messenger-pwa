<template>
  <div class="message" :class="{
    mine: message.isMine,
    partner: !message.isMine
  }">
    <div v-html="message.content" class="message__content"></div>
    <div class="message__manage">
      <div class="message__date">
        {{ formatDate(new Date(message.wroteAt)) }}
      </div>
      <div @click="remove" class="message__remove">
        <img class="message__remove-icon" src="~@/assets/images/icons/close.svg" alt="">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"

import { useStore } from "@/composables/store"
import { dispatchDialogModule } from "@/store/modules/dialog"

import { REMOVE_MESSAGE } from "@/store/modules/dialog/actions"

import { MessageInterface } from "@/types/message"

import { formatDate } from "@/utils/dateFormatter"

export default defineComponent({
  name: "Message",
  props: {
    message: {
      type: Object as PropType<MessageInterface>,
      required: true
    }
  },
  setup(props) {
    const store = useStore()

    const remove = () => store.dispatch(dispatchDialogModule(REMOVE_MESSAGE), props.message.uuid)

    return {
      remove,

      formatDate
    }
  }
})
</script>

<style lang="stylus">
.message
  &__content
    max-width 50vw

    +breakpoint-to(breakpoints.tablet)
      max-width 100vw

    p
      margin .5rem 0

      word-wrap break-word
      line-height 1.3
</style>

<style lang="stylus" scoped>
.message
  display flex
  flex-direction column

  max-width 80%

  margin-top message-margin
  padding 1.6rem 2.4rem

  +breakpoint-to(breakpoints.tablet)
    max-width 95%

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

  &__manage
    display flex
    justify-content space-between
    align-items center

  &__date
    font-size message-date-font-size

  &__remove
    align-self: flex-end

    margin-left 1rem

    pointer-on-hover()

    &-icon
      width 1rem
</style>
