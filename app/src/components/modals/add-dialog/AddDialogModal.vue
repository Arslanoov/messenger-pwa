<template>
  <vue-final-modal
    v-model="isOpened"
    content-class="modal__wrapper"
    class="modal"
    name="add-dialog-modal"
  >
    <div class="modal__content">
      <h3 class="modal__title">Add Dialog</h3>

      <autocomplete-input
        @change="setQuery"
        @select="onDialogSelect"
        @submit="onDialogSelect"
        :items="filteredSearchResults"
        :input="{ defaultValue: query }"
        class="modal__input"
      />
    </div>
</vue-final-modal>
</template>

<script lang="ts">
import { defineComponent, computed, inject } from "vue"

import { UserSearchInterface } from "@/types/user"

import { useStore } from "@/composables/store"
import { commitDialogModule, dispatchDialogModule, getterDialogModule } from "@/store/modules/dialog"
import { commitSidebarModule, getterSidebarModule } from "@/store/modules/sidebar"

import { TOGGLE_ADD_DIALOG_MODAL } from "@/store/modules/sidebar/mutations"
import { GET_IS_ADD_DIALOG_MODAL_OPENED } from "@/store/modules/sidebar/getters"

import { SET_USERS_SEARCH_QUERY } from "@/store/modules/dialog/mutations"
import { SEARCH_USERS } from "@/store/modules/dialog/actions"
import { GET_USERS_SEARCH_QUERY, GET_USERS_SEARCH_RESULTS } from "@/store/modules/dialog/getters"

export default defineComponent({
  name: "AddDialogModal",
  setup() {
    const modal = inject("$vfm")

    const store = useStore()

    const isOpened = computed(() => store.getters[getterSidebarModule(GET_IS_ADD_DIALOG_MODAL_OPENED)])
    const toggle = () => store.commit(commitSidebarModule(TOGGLE_ADD_DIALOG_MODAL))

    const searchResults = computed(() => store.getters[getterDialogModule(GET_USERS_SEARCH_RESULTS)])
    const filteredSearchResults = computed(() => searchResults.value.map((item: UserSearchInterface) => ({
      id: item.uuid,
      value: item.username
    })))
    const query = computed(() => store.getters[getterDialogModule(GET_USERS_SEARCH_QUERY)])
    const search = () => store.dispatch(dispatchDialogModule(SEARCH_USERS))
    const setQuery = (v: string) => {
      store.commit(commitDialogModule(SET_USERS_SEARCH_QUERY), v)
      search()
    }

    const onDialogSelect = () => {}

    return {
      isOpened,
      toggle,
      modal,

      filteredSearchResults,
      query,
      setQuery,
      search,
      onDialogSelect
    }
  }
})
</script>

<style lang="stylus">
.modal
  font-size 1.8rem

  &__wrapper
    display flex
    justify-content center
    align-items center

    width 100%
    height 100%

  &__content
    display flex
    flex-direction column
    align-items center

    min-width 70rem
    min-height 40rem

    padding 2rem

    background white

  &__title
    margin-bottom 1.5rem

    font-size 2rem
    font-weight 700
</style>
