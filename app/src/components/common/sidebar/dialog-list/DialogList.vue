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
import { defineComponent, computed, watch } from "vue"

import { useStore } from "@/composables/store"
import { commitDialogModule, dispatchDialogModule, getterDialogModule } from "@/store/modules/dialog"
import { commitSidebarModule } from "@/store/modules/sidebar"

import { SET_DIALOG_LIST_CURRENT_PAGE } from "@/store/modules/dialog/mutations"
import { TOGGLE_ADD_DIALOG_MODAL } from "@/store/modules/sidebar/mutations"
import { FETCH_DIALOGS } from "@/store/modules/dialog/actions"
import {
  GET_DIALOGS_LIST,
  GET_DIALOGS_LIST_CURRENT_PAGE,
  GET_DIALOGS_LIST_PAGE_SIZE
} from "@/store/modules/dialog/getters"

import Dialog from "@/components/common/sidebar/dialog-list/Dialog.vue"

/* TODO: Add scroll component */

export default defineComponent({
  name: "DialogList",
  components: {
    Dialog
  },
  setup() {
    const store = useStore()

    const dialogs = computed(() => store.getters[getterDialogModule(GET_DIALOGS_LIST)])
    const fetchDialogs = (page: number) => store.dispatch(dispatchDialogModule(FETCH_DIALOGS), page)

    const prevPage = () => store.commit(commitDialogModule(SET_DIALOG_LIST_CURRENT_PAGE), currentPage.value - 1)
    const nextPage = () => store.commit(commitDialogModule(SET_DIALOG_LIST_CURRENT_PAGE), currentPage.value + 1)
    const currentPage = computed(() => store.getters[getterDialogModule(GET_DIALOGS_LIST_CURRENT_PAGE)])
    const pageSize = computed(() => store.getters[getterDialogModule(GET_DIALOGS_LIST_PAGE_SIZE)])

    watch(currentPage, (page: number) => fetchDialogs(page))

    const toggleModal = () => store.commit(commitSidebarModule(TOGGLE_ADD_DIALOG_MODAL))

    return {
      dialogs,
      prevPage,
      nextPage,
      currentPage,
      pageSize,

      toggleModal
    }
  }
})
</script>

<style lang="stylus" scoped>
.dialog-list
  user-select none

  &__content
    display flex
    flex-direction column
    align-items center

    color #fff

    font-size 1.8rem

  &__add
    margin-top 1rem

    pointer-on-hover()
</style>
