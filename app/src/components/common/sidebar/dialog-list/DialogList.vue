<template>
  <div class="dialog-list">
    <template v-if="dialogs.length">
      <Dialog
        v-for="dialog in dialogs"
        :key="dialog.uuid"
        :dialog="dialog"
        class="dialog-list__item"
      />
    </template>
    <div
      v-else
      class="dialog-list__content"
    >
      No dialogs found.
    </div>
    <infinite-loading @infinite="loadMoreDialogs"></infinite-loading>

    <div class="dialog-list__content">
      <div
        @click="toggleModal"
        class="dialog-list__add"
      >
        Add dialog
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"

import { useStore } from "@/composables/store"
import { commitDialogModule, dispatchDialogModule, getterDialogModule } from "@/store/modules/dialog"
import { commitSidebarModule } from "@/store/modules/sidebar"

import {CLEAR_DIALOGS_LIST_DATA, SET_DIALOG_LIST_CURRENT_PAGE} from "@/store/modules/dialog/mutations"
import { TOGGLE_ADD_DIALOG_MODAL } from "@/store/modules/sidebar/mutations"
import { FETCH_DIALOGS } from "@/store/modules/dialog/actions"
import {
  GET_DIALOGS_LIST,
  GET_DIALOGS_LIST_CURRENT_PAGE, GET_DIALOGS_LIST_LATEST_PAGE_SIZE,
  GET_DIALOGS_LIST_PAGE_SIZE
} from "@/store/modules/dialog/getters"

import { DialogInterface } from "@/types/dialog"
import { LoadStateInterface } from "@/types/loadState"

import InfiniteLoading from "vue-infinite-loading"

import Dialog from "@/components/common/sidebar/dialog-list/Dialog.vue"

/* TODO: Add scroll component */

export default defineComponent({
  name: "DialogList",
  components: {
    InfiniteLoading,
    Dialog
  },
  setup() {
    const store = useStore()

    const clearData = () => store.commit(commitDialogModule(CLEAR_DIALOGS_LIST_DATA))

    window.onbeforeunload = () => clearData()
    window.onunload = () => clearData()

    /* Dialogs */

    const dialogs = computed(() => store.getters[getterDialogModule(GET_DIALOGS_LIST)])
    const fetchDialogs = (page: number) => store.dispatch(dispatchDialogModule(FETCH_DIALOGS), page)

    const prevPage = () => store.commit(commitDialogModule(SET_DIALOG_LIST_CURRENT_PAGE), currentPage.value - 1)
    const nextPage = () => store.commit(commitDialogModule(SET_DIALOG_LIST_CURRENT_PAGE), currentPage.value + 1)
    const currentPage = computed(() => store.getters[getterDialogModule(GET_DIALOGS_LIST_CURRENT_PAGE)])
    const pageSize = computed(() => store.getters[getterDialogModule(GET_DIALOGS_LIST_PAGE_SIZE)])
    const latestPageSize = computed(() => store.getters[getterDialogModule(GET_DIALOGS_LIST_LATEST_PAGE_SIZE)])

    const toggleModal = () => store.commit(commitSidebarModule(TOGGLE_ADD_DIALOG_MODAL))

    const loadMoreDialogs = (state: LoadStateInterface) => {
      if (latestPageSize.value && latestPageSize.value < pageSize.value) {
        state.complete()
        return
      }

      nextPage()
      fetchDialogs(currentPage.value)
        .then((items: DialogInterface[]) => items.length > 0 ? state.loaded() : state.complete())
    }

    return {
      dialogs,
      prevPage,
      nextPage,
      currentPage,
      pageSize,

      toggleModal,
      loadMoreDialogs
    }
  }
})
</script>

<style lang="stylus">
.infinite-status-prompt
  display none
</style>

<style lang="stylus" scoped>
.dialog-list
  user-select none

  &__content
    display flex
    flex-direction column
    align-items center

    font-size dialog-list-font-size

    color dialog-list-color

  &__add
    margin-top 1rem

    pointer-on-hover()
</style>
