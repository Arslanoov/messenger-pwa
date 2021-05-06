<template>
  <component :is="layout">
  </component>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import { useStore } from "@/composables/store"
import { dispatchAuthModule } from "@/store/modules/auth"

import { FETCH_USER } from "@/store/modules/auth/actions"

import MainLayout from "@/layouts/MainLayout.vue"
import AuthLayout from "@/layouts/AuthLayout.vue"
import EmptyLayout from "@/layouts/EmptyLayout.vue"

export default defineComponent({
  name: "App",
  components: {
    MainLayout,
    AuthLayout,
    EmptyLayout
  },
  computed: {
    layout(): string {
      return (this.$route.meta.layout || "empty") + "-layout"
    }
  },
  setup() {
    const store = useStore()

    const getUser = () => store.dispatch(dispatchAuthModule(FETCH_USER))
    getUser()

    return {}
  }
})
</script>

<style lang="stylus" scoped>
</style>
