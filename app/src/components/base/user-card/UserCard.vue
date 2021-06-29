<template>
  <div class="user-card">
    <Avatar :src="avatar" :is-online="isOnline" :with-margin="withMargin" />
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
      <div class="user-card__subtitle">{{ extractText(subtitle) }}</div>
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
    avatar: {
      type: String,
      required: false,
      default: null
    },
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: false,
      default: null
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
    },
    withMargin: {
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

    const extractText = (value: string) => {
      const div = document.createElement("div")
      div.innerHTML = value
      return div.textContent || div.innerText || ""
    }

    const isSidebarOpened =
      computed(() => !props.collapsible || store.getters[getterSidebarModule(GET_IS_SIDEBAR_OPENED)])

    return {
      isSidebarOpened,

      extractText
    }
  }
})
</script>

<style lang="stylus" scoped>
.user-card
  display flex
  align-items center

  color user-card-color

  &__content
    display flex
    flex-direction column

  &__title
    font-size user-card-title-size

  &__subtitle
    font-size user-card-subtitle-size
    color user-card-subtitle-color

  &__extra
    margin-left .32rem

    font-size user-card-extra-size

    color user-card-subtitle-extra-color
</style>
