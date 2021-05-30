<template>
  <div
    :class="{
      'sidebar_opened': isStartedOpening,
      'sidebar_closed': !isStartedOpening
    }"
    class="sidebar"
  >
    <Profile />
    <Line />
    <dialog-list
      :class="{ 'sidebar__dialog-list_opened': isStartedOpening }"
      class="sidebar__dialog-list"
    />

    <add-dialog-modal />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"

import { useStore } from "@/composables/store"
import { dispatchDialogModule } from "@/store/modules/dialog"
import { getterSidebarModule } from "@/store/modules/sidebar"

import { FETCH_DIALOGS } from "@/store/modules/dialog/actions"
import { GET_IS_SIDEBAR_STARTED_OPENING } from "@/store/modules/sidebar/getters"

import Profile from "@/components/common/sidebar/profile/Profile.vue"
import Line from "@/components/base/line/Line.vue"
import DialogList from "@/components/common/sidebar/dialog-list/DialogList.vue"

import AddDialogModal from "@/components/modals/add-dialog/AddDialogModal.vue"

export default defineComponent({
  name: "Sidebar",
  components: {
    Profile,
    Line,
    DialogList,

    AddDialogModal
  },
  setup() {
    const store = useStore()

    const isStartedOpening = computed(() => store.getters[getterSidebarModule(GET_IS_SIDEBAR_STARTED_OPENING)])

    const fetchDialogs = () => store.dispatch(dispatchDialogModule(FETCH_DIALOGS))
    fetchDialogs()

    return {
      isStartedOpening
    }
  }
})
</script>

<style lang="stylus" scoped>
.sidebar
  height 100vh
  overflow-y scroll

  background-color sidebar-background

  transition sidebar-width-transition

  without-scroll()

  &_opened
    width 25%

    +breakpoint-to(breakpoints.desktop-md)
      width 30%

    +breakpoint-to(breakpoints.desktop-sm)
      width 40%

    +breakpoint-to(breakpoints.tablet)
      width 100%
      height auto
      min-height 100vh

  &_closed
    width 11.3rem

    +breakpoint-to(breakpoints.tablet)
      width 100%
      height 12.7rem
      min-height auto

      overflow-y hidden


  &__dialog-list
    +breakpoint-to(breakpoints.tablet)
      display none

    &_opened
      +breakpoint-to(breakpoints.tablet)
        display block
</style>
