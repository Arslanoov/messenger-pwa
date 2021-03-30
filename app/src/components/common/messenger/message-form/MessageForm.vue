<template>
  <div class="message-form">
    <span
      @input="e => onContentChange(e.target.value)"
      data-ph="Write a message"
      class="message-form__input"
      role="textbox"
      contenteditable
    ></span>
    <div class="message-form__send">
      <img
        class="message-form__send-icon"
        src="~@/assets/images/profile/icons/send.svg"
        alt=""
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"

export default defineComponent({
  name: "MessageForm",
  setup() {
    const form = reactive({
      content: ""
    })

    const onContentChange = (v: string) => form.content = v

    return {
      form,
      onContentChange
    }
  }
})
</script>

<style lang="stylus">
.message-form
  display flex
  align-items center

  padding .5rem 3rem

  position absolute
  bottom 0
  left 0

  width 100%
  height auto

  background-color message-send-form-background
  color grey-color

  &__input
    max-height 30vh

    width 80%

    padding 2rem 0

    border 0
    outline 0

    overflow-y scroll

    &:empty
      &:not(:focus):before
        content attr(data-ph)
        color grey

      &:focus:before
        content "\feff"

    without-scroll()

  &__send
    width 20%

    &-icon
      position absolute
      bottom 2rem
      right 2rem

      width message-send-icon-size
      height message-send-icon-size

      &:hover
        cursor pointer
</style>
