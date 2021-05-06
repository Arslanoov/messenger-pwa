<template>
  <div
    :class="{
      'avatar_with-margin': isOpenedSidebar
    }"
    :style="{ backgroundImage: `url(${src})` }"
    class="avatar"
  >
    <img
      v-if="isOnline"
      class="avatar__online"
      src="~@/assets/images/profile/icons/online.svg"
      alt="">
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"

import { useStore } from "@/composables/store"
import { getterSidebarModal } from "@/store/modules/sidebar"

import { GET_IS_SIDEBAR_OPENED } from "@/store/modules/sidebar/getters"

export default defineComponent({
  name: "Avatar",
  props: {
    src: {
      type: String,
      required: true
    },
    isOnline: {
      type: Boolean,
      required: true
    }
  },
  setup() {
    const store = useStore()

    const isOpenedSidebar = computed(() => store.getters[getterSidebarModal(GET_IS_SIDEBAR_OPENED)])

    return {
      isOpenedSidebar
    }
  }
})
</script>

<style lang="stylus" scoped>
.avatar
  position relative

  flex-shrink: 0

  width avatar-size
  height avatar-size

  background-repeat no-repeat
  background-size cover

  border-radius 10rem

  transition margin .5s

  pointer-on-hover()

  +breakpoint-to(breakpoints.tablet)
    margin-right avatar-margin-right

  &_with-margin
    margin-right avatar-margin-right

  &__online
    position absolute
    bottom 0
    right 0

    width 10px
    height 10px
</style>
