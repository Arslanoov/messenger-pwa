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
    <dialog-list />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"

import { useStore } from "@/composables/store"
import { getterSidebarModal } from "@/store/modules/sidebar"

import { GET_IS_SIDEBAR_STARTED_OPENING } from "@/store/modules/sidebar/getters"

import Profile from "@/components/common/sidebar/profile/Profile.vue"
import Line from "@/components/base/line/Line.vue"
import DialogList from "@/components/common/sidebar/dialog-list/DialogList.vue"

export default defineComponent({
  name: "Sidebar",
  components: {
    Profile,
    Line,
    DialogList
  },
  setup() {
    const store = useStore()

    const isStartedOpening = computed(() => store.getters[getterSidebarModal(GET_IS_SIDEBAR_STARTED_OPENING)])

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

  transition width 1s

  &_opened
    width 25%

    +breakpoint-to(breakpoints.desktop-md)
      width 30%

    +breakpoint-to(breakpoints.desktop-sm)
      width 40%

    +breakpoint-to(breakpoints.tablet)
      width 100%
      height auto
      max-height 100vh

  &_closed
    width 6rem

  without-scroll()
</style>
