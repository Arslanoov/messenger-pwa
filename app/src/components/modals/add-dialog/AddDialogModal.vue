<template>
  <vue-final-modal
    name="add-dialog-modal"
    class="modal"
    content-class="modal__wrapper"
    v-model="isOpened"
  >
    <div class="modal__content">
      <h3 class="modal__title">Add Dialog</h3>

      <autocomplete-input />

      <input
        type="text"
        class="modal__input"
        placeholder="Username"
      />
    </div>
</vue-final-modal>
</template>

<script lang="ts">
import { defineComponent, computed, inject } from "vue"

import { useStore } from "@/composables/store"
import { commitSidebarModule, getterSidebarModule } from "@/store/modules/sidebar"

import { TOGGLE_ADD_DIALOG_MODAL } from "@/store/modules/sidebar/mutations"
import { GET_IS_ADD_DIALOG_MODAL_OPENED } from "@/store/modules/sidebar/getters"

export default defineComponent({
  name: "AddDialogModal",
  setup() {
    const modal = inject("$vfm")

    const store = useStore()

    const isOpened = computed(() => store.getters[getterSidebarModule(GET_IS_ADD_DIALOG_MODAL_OPENED)])
    const toggle = () => store.commit(commitSidebarModule(TOGGLE_ADD_DIALOG_MODAL))

    return {
      isOpened,
      toggle,
      modal
    }
  }
})
</script>

<style lang="stylus">
.modal
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

  &__input
    width 100%

    padding 1rem 1.5rem

    border .1rem solid grey
    border-radius .2rem
    outline none

    &::placeholder
      font-family inherit
</style>
