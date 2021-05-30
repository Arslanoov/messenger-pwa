<template>
  <div class="message-form">
    <div
      id="editor"
      class="message-form__input"
    >Write a message</div>
    <div
      @click="sendMessage"
      class="message-form__send"
    >
      <img
        class="message-form__send-icon"
        src="~@/assets/images/profile/icons/send.svg"
        alt=""
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue"

import { SendMessageFormStateInterface } from "@/store/modules/dialog/state"

import { useStore } from "@/composables/store"
import { commitDialogModule, dispatchDialogModule, getterDialogModule } from "@/store/modules/dialog"

import { SET_SEND_FORM_CONTENT } from "@/store/modules/dialog/mutations"
import { SEND_MESSAGE } from "@/store/modules/dialog/actions"
import { GET_CURRENT_DIALOG, GET_SEND_FORM } from "@/store/modules/dialog/getters"

import { MessageInterface } from "@/types/message"

import { sendMessage as sendWsMessage } from "@/websocket"
import { DialogInterface } from "@/types/dialog"

import EditorJS from "@editorjs/editorjs"
import config from "@/config/editor"

import { jsonToHtml } from "@/helpers/html"

export default defineComponent({
  name: "MessageForm",
  setup() {
    let editor: typeof EditorJS | null = null
    onMounted(() => {
      editor = new EditorJS({
        ...config,
        holder: "editor",
        minHeight: 0,
      })
    })

    const store = useStore()

    const currentDialog = computed(() => store.getters[getterDialogModule(GET_CURRENT_DIALOG)] as DialogInterface)

    const form = computed(() => store.getters[getterDialogModule(GET_SEND_FORM)] as SendMessageFormStateInterface)
    const onContentChange = (v: string) => store.commit(commitDialogModule(SET_SEND_FORM_CONTENT), v)
    const sendMessage = () => {
      editor.save()
        .then((data: never) => {
          onContentChange(jsonToHtml(data))

          store.dispatch(dispatchDialogModule(SEND_MESSAGE))
            .then((message: MessageInterface) => sendWsMessage({
              ...currentDialog.value,
              // TODO: Remove undefined
              sentByMe: undefined,
              sentByPartner: {
                isRead: true
              },
              latestMessage: {
                date: message.wroteAt,
                content: message.content
              }
            }, {
              ...message,
              isMine: false
            }))

          editor.clear()
        })
    }

    return {
      form,
      onContentChange,
      sendMessage
    }
  }
})
</script>

<style lang="stylus">
.ce-block__content,
.ce-toolbar__content
  max-width: unset
</style>

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

    user-select none

    &-icon
      position absolute
      bottom 3.2rem
      right 4.8rem

      width message-send-icon-size
      height message-send-icon-size

      pointer-on-hover()
</style>
