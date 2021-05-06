<template>
  <div class="user-card">
    <Avatar v-if="avatar" :src="avatar" is-online />
    <div v-if="isSidebarOpened" class="user-card__content">
      <div class="user-card__title">
        {{ title }}
        <span
          v-if="extra"
          class="user-card__extra"
        >
          {{ extra }}
        </span>
      </div>
      <div class="user-card__subtitle">{{ subtitle }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"

import { useStore } from "@/composables/store"
import { getterSidebarModule } from "@/store/modules/sidebar"

import { GET_IS_SIDEBAR_OPENED } from "@/store/modules/sidebar/getters"

import Avatar from "@/components/base/avatar/Avatar.vue"

export default defineComponent({
  name: "UserCard",
  props: {
    // TODO: Add interface check
    avatar: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    extra: {
      type: String,
      required: false,
      default: null
    },
    isOnline: {
      type: Boolean,
      required: true
    },
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  components: {
    Avatar
  },
  setup(props) {
    const store = useStore()

    const isSidebarOpened =
      computed(() => !props.collapsible || store.getters[getterSidebarModule(GET_IS_SIDEBAR_OPENED)])

    return {
      isSidebarOpened
    }
  }
})
</script>

<style lang="stylus" scoped>
.user-card
  display flex
  align-items center

  color white

  &__content
    display flex
    flex-direction column

  &__title
    font-size user-card-title-size

  &__subtitle
    font-size user-card-subtitle-size
    color grey

  &__extra
    margin-left .2rem

    font-size user-card-extra-size

    color grey
    opacity .7
</style>
