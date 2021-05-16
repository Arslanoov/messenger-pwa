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
        class="modal__input"
        :items="[
          {
            value: 'Username 1'
          },
          {
            value: 'Username 2'
          }
        ]"
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
