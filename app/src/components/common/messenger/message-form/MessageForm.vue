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

<style lang="stylus" scoped>
.message-form
  display flex
  align-items center

  padding .8rem 4.8rem

  width 100%
  height auto

  font-size message-form-font-size

  color message-send-form-color
  background-color message-send-form-background

  &__input
    max-height 30vh

    width 80%

    padding 3.2rem 0

    border none
    outline none

    overflow-y scroll

    &:empty
      &:not(:focus):before
        content attr(data-ph)
        color message-send-form-color

      &:focus:before
        content "\feff"

    without-scroll()

  &__send
    width 20%

    &-icon
      position absolute
      bottom 3.2rem
      right 4.8rem

      width message-send-icon-size
      height message-send-icon-size

      pointer-on-hover()
</style>
