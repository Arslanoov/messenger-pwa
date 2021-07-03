<template>
  <div ref="list" class="messages-list">
    <loading
      v-model:active="isLoading"
      :can-cancel="false"
      :is-full-page="false"
    />

    <div
      v-if="latestPageSize === pageSize"
      @click="loadMoreMessages"
      class="messages-list__load-more"
    >
      Load more
    </div>

    <template v-if="messages.length > 0">
      <Message
        v-for="message in messages"
        :message="message"
        :key="message.uuid"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, onUpdated } from "vue"

import { useOnResize, useOnScroll } from "vue-composable"

import { MessageInterface } from "@/types/message"

import { useStore } from "@/composables/store"
import { commitDialogModule, dispatchDialogModule, getterDialogModule } from "@/store/modules/dialog"

import {
  CLEAR_CURRENT_DIALOG,
  SET_CURRENT_DIALOG_CURRENT_PAGE
} from "@/store/modules/dialog/mutations"
import { FETCH_DIALOG_MESSAGES } from "@/store/modules/dialog/actions"
import {
  GET_CURRENT_DIALOG,
  GET_CURRENT_DIALOG_CURRENT_PAGE,
  GET_CURRENT_DIALOG_LATEST_PAGE_SIZE,
  GET_CURRENT_DIALOG_MESSAGES,
  GET_CURRENT_DIALOG_PAGE_SIZE
} from "@/store/modules/dialog/getters"

import { DialogInterface } from "@/types/dialog"

import { useRouter } from "vue-router"
import { routesNames } from "@/router/names"

import Loading from "vue-loading-overlay"
import "vue-loading-overlay/dist/vue-loading.css"

import Message from "@/components/common/messenger/messages-list/Message.vue"

export default defineComponent({
  name: "MessagesList",
  components: {
    Loading,
    Message
  },
  setup() {
    const { width } = useOnResize(document.body)
    const { scrollTo } = useOnScroll()

    const router = useRouter()
    const store = useStore()

    const clearData = () => store.commit(commitDialogModule(CLEAR_CURRENT_DIALOG))

    window.onbeforeunload = () => {
      clearData()
      return null
    }
    window.onunload = () => {
      clearData()
      return null
    }

    /* Messages */

    const isLoading = ref(false)
    const startLoading = () => isLoading.value = true
    const stopLoading = () => isLoading.value = false

    const messages = computed(
        () => store.getters[getterDialogModule(GET_CURRENT_DIALOG_MESSAGES)] as MessageInterface[])
    const currentDialog = computed(() => store.getters[getterDialogModule(GET_CURRENT_DIALOG)] as DialogInterface)
    const list = ref<HTMLDivElement>()

    const currentPage = computed(() => store.getters[getterDialogModule(GET_CURRENT_DIALOG_CURRENT_PAGE)])
    const pageSize = computed(() => store.getters[getterDialogModule(GET_CURRENT_DIALOG_PAGE_SIZE)])
    const latestPageSize = computed(() => store.getters[getterDialogModule(GET_CURRENT_DIALOG_LATEST_PAGE_SIZE)])
    const nextPage = () => store.commit(commitDialogModule(SET_CURRENT_DIALOG_CURRENT_PAGE), currentPage.value + 1)

    const fetchMessages = () => store.dispatch(dispatchDialogModule(FETCH_DIALOG_MESSAGES))

    watch(currentDialog, () => {
      startLoading()
      fetchMessages()
        .catch(error => {
          if (404 === error?.response?.status) {
            router.push({
              name: routesNames.SelectDialog
            })
          }
        })
        .finally(() => stopLoading())
      }
    , {
      immediate: true
    })

    onUpdated(() => {
      if (currentPage.value === 1) {
        (list.value as HTMLDivElement).scrollTop = (list.value as HTMLDivElement).scrollHeight
        if (width.value < 768 + 5) {
          scrollTo(0, document.body.scrollHeight)
        }
      }
    })

    const loadMoreMessages = () => {
      startLoading()
      nextPage()
      fetchMessages()
        .finally(() => stopLoading())
    }

    return {
      isLoading,
      messages,
      list,

      currentDialog,

      loadMoreMessages,
      latestPageSize,
      pageSize
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

  &__load-more
    align-self center

    padding 1rem

    pointer-on-hover()
</style>
