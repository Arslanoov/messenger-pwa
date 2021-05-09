<template>
  <div ref="list" class="messages-list">
    <Message
      v-for="message in messages"
      :message="message"
      :key="message.uuid"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onUpdated } from "vue"

import { useOnResize, useOnScroll } from "vue-composable"

import { MessageInterface } from "@/types/message"

import { useStore } from "@/composables/store"
import { getterDialogModule } from "@/store/modules/dialog"

import { GET_CURRENT_DIALOG_MESSAGES } from "@/store/modules/dialog/getters"

import Message from "@/components/common/messenger/messages-list/Message.vue"

export default defineComponent({
  name: "MessagesList",
  components: {
    Message
  },
  setup() {
    const { width } = useOnResize(document.body)
    const { scrollTo } = useOnScroll()

    const store = useStore()
    const messages = computed(
        () => store.getters[getterDialogModule(GET_CURRENT_DIALOG_MESSAGES)] as MessageInterface[])
    const list = ref<HTMLDivElement>()

    onUpdated(() => {
      (list.value as HTMLDivElement).scrollTop = (list.value as HTMLDivElement).scrollHeight
      if (width.value < 768 + 5) {
        scrollTo(0, document.body.scrollHeight)
      }
    })

    return {
      messages,
      list
    }
  }
})
</script>

<style lang="stylus" scoped>
.messages-list
  display flex
  flex-direction column
  flex-basis content

  width 100%
  height 100%
  max-height 100%

  overflow-y scroll

  padding: .8rem 1.6rem 1.6rem 1.6rem

  font-size message-list-font-size

  background-color messages-layout-background

  without-scroll()
</style>
