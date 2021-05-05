<template>
  <div class="main-layout">
    <sidebar class="sidebar-wrapper" />
    <router-view class="view-wrapper" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import Sidebar from "@/modules/Sidebar.vue"

import { useStore } from "@/composables/store"
import { dispatchAuthModal } from "@/store/modules/auth"

import { FETCH_USER } from "@/store/modules/auth/actions"

export default defineComponent({
  name: "MainLayout",
  components: {
    Sidebar
  },
  setup() {
    const store = useStore()

    const getUser = () => store.dispatch(dispatchAuthModal(FETCH_USER))
    getUser()

    return {}
  }
})
</script>

<style lang="stylus" scoped>
.main-layout
  display flex
  height: 100%

  +breakpoint-to(breakpoints.tablet)
    flex-wrap wrap

.sidebar-wrapper
  flex-shrink 0

.view-wrapper
  width 100%

  +breakpoint-to(breakpoints.tablet)
    min-height 100vh
</style>
