<template>
  <vue-final-modal
    v-model="isOpened"
    :esc-to-close="true"
    content-class="modal__wrapper"
    class="modal"
    name="add-dialog-modal"
  >
    <div class="modal__content">
      <div @click="toggle" class="modal__close">
        <img
          class="modal__close-icon"
          src="~@/assets/images/icons/close.svg"
          alt=""
        />
      </div>
      
      <h3 class="modal__title">Add Dialog</h3>

      <label for="uuid" class="modal__label">User uuid</label>
      <input
        @change="e => setQuery(e.target.value)"
        :value="query"
        id="uuid"
        class="modal__input"
      />
      <button
        @click="search"
        :disabled="isLoading"
        type="submit"
        class="modal__button"
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
            :src="avatarUrl(searchResult.avatar)"
            :is-online="false"
            class="user__avatar"
            draggable="false"
            alt=""
          />
          <div class="user__username">{{ searchResult.username }}</div>

          <button
            @click="startDialog"
            type="submit"
            class="modal__button"
          >
            Start Dialog
          </button>
        </div>
      </template>
    </div>
</vue-final-modal>
</template>

<script lang="ts">
import { defineComponent, computed, inject, ref } from "vue"

import { UserSearchInterface } from "@/types/user"

import { useRouter } from "vue-router"
import { routesNames } from "@/router/names"

import { useStore } from "@/composables/store"
import { commitDialogModule, dispatchDialogModule, getterDialogModule } from "@/store/modules/dialog"
import { commitSidebarModule, getterSidebarModule } from "@/store/modules/sidebar"

import { TOGGLE_ADD_DIALOG_MODAL } from "@/store/modules/sidebar/mutations"
import { GET_IS_ADD_DIALOG_MODAL_OPENED } from "@/store/modules/sidebar/getters"

import { SET_USERS_SEARCH_QUERY } from "@/store/modules/dialog/mutations"
import { SEARCH_USER, START_DIALOG } from "@/store/modules/dialog/actions"
import {
  GET_USERS_SEARCH_ERROR,
  GET_USERS_SEARCH_QUERY,
  GET_USERS_SEARCH_RESULT
} from "@/store/modules/dialog/getters"

import { avatarUrl } from "@/helpers/avatar"

export default defineComponent({
  name: "AddDialogModal",
  setup() {
    const modal = inject("$vfm")

    const router = useRouter()
    const store = useStore()

    const isLoading = ref(false)
    const startLoading = () => isLoading.value = true
    const stopLoading = () => isLoading.value = false

    const isOpened = computed({
      get: (): boolean => store.getters[getterSidebarModule(GET_IS_ADD_DIALOG_MODAL_OPENED)],
      set: () => toggle()
    })
    const toggle = () => store.commit(commitSidebarModule(TOGGLE_ADD_DIALOG_MODAL))

    const searchResult = computed(
      () => store.getters[getterDialogModule(GET_USERS_SEARCH_RESULT)] as UserSearchInterface
    )
    const query = computed(() => store.getters[getterDialogModule(GET_USERS_SEARCH_QUERY)])
    const searchError = computed(() => store.getters[getterDialogModule(GET_USERS_SEARCH_ERROR)])
    const search = () => {
      startLoading()
      store.dispatch(dispatchDialogModule(SEARCH_USER))
        .finally(() => stopLoading())
    }
    const setQuery = (v: string) => store.commit(commitDialogModule(SET_USERS_SEARCH_QUERY), v)

    const startDialog = () => store.dispatch(dispatchDialogModule(START_DIALOG))
      .then(uuid => {
        toggle()
        router.push({
          name: routesNames.Dialog,
          params: {
            id: uuid
          }
        })
      })

    return {
      isOpened,
      toggle,
      modal,

      isLoading,
      startLoading,
      stopLoading,
      query,
      setQuery,
      search,
      searchError,
      searchResult,

      startDialog,

      avatarUrl
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

    +breakpoint-to(breakpoints.tablet)
      min-width 35rem

    +breakpoint-to(breakpoints.mobile)
      min-width 30rem
      width 30rem

  &__close
    margin-bottom 1rem

    pointer-on-hover()

    &-icon
      width 1.5rem
      height 1.5rem

  &__title
    margin-bottom 1.5rem

    font-size 2rem
    font-weight 700

  &__error
    margin-top 1rem

    color red

  &__input
    // TODO: Fix
    overflow-y hidden

    min-width 32rem
    height auto

    padding 0 1rem

    +breakpoint-to(breakpoints.tablet)
      min-width 28rem

  &__button
    margin-top: .5rem
    padding .5rem 3rem

    border .1rem solid #bbb
    outline 0

    background transparent

    pointer-on-hover()

.user
  display flex
  flex-direction column
  align-items center

  margin-top 2rem

  &,
  &__avatar
    user-select none

  &__avatar
    width 10rem
    height 10rem
    border-radius 5rem

  &__username
    margin-top .5rem

    font-size 1.6rem
</style>
