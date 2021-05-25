<template>
  <vue-final-modal
    v-model="isOpened"
    content-class="modal__wrapper"
    class="modal"
    name="add-dialog-modal"
  >
    <div class="modal__content">
      <h3 class="modal__title">Add Dialog</h3>

      <input
        @change="e => setQuery(e.target.value)"
        :value="query"
        class="modal__input"
      />

      <button
        @click="search"
        type="submit"
      >
        Search
      </button>

      <div v-if="searchError" class="modal__error">
        {{ searchError }}
      </div>
      <template v-if="searchResult">
        <div class="modal__user user">
          <img
            v-if="searchResult.avatar"
            :src="searchResult.avatar"
            class="user__avatar"
            alt=""
          />
          <div class="user__uuid">{{ searchResult.uuid }}</div>
          <div class="user__username">{{ searchResult.username }}</div>
        </div>
      </template>
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
import { SEARCH_USER } from "@/store/modules/dialog/actions"
import {
  GET_USERS_SEARCH_ERROR,
  GET_USERS_SEARCH_QUERY,
  GET_USERS_SEARCH_RESULT
} from "@/store/modules/dialog/getters"

export default defineComponent({
  name: "AddDialogModal",
  setup() {
    const modal = inject("$vfm")

    const store = useStore()

    const isOpened = computed(() => store.getters[getterSidebarModule(GET_IS_ADD_DIALOG_MODAL_OPENED)])
    const toggle = () => store.commit(commitSidebarModule(TOGGLE_ADD_DIALOG_MODAL))

    const searchResult = computed(
      () => store.getters[getterDialogModule(GET_USERS_SEARCH_RESULT)] as UserSearchInterface
    )
    const query = computed(() => store.getters[getterDialogModule(GET_USERS_SEARCH_QUERY)])
    const searchError = computed(() => store.getters[getterDialogModule(GET_USERS_SEARCH_ERROR)])
    const search = () => store.dispatch(dispatchDialogModule(SEARCH_USER))
    const setQuery = (v: string) => store.commit(commitDialogModule(SET_USERS_SEARCH_QUERY), v)

    const onDialogSelect = () => {}

    return {
      isOpened,
      toggle,
      modal,

      query,
      setQuery,
      search,
      searchError,
      searchResult,
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
