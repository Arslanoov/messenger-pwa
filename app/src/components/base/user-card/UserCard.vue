<template>
  <div class="user-card">
    <Avatar :src="avatar" is-online />
    <div class="user-card__content">
      <div class="user-card__content-title">
        {{ title }}
        <span
          v-if="extra"
          class="user-card__content-extra"
        >
          {{ extra }}
        </span>
      </div>
      <div class="user-card__content-subtitle">{{ subtitle }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import Avatar from "@/components/base/avatar/Avatar.vue";

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
    }
  },
  components: {
    Avatar
  }
})
</script>

<style lang="stylus">
.user-card
  display flex
  align-items center

  color white

  &__content
    display flex
    flex-direction column

    &-title
      font-size user-card-title-size

    &-subtitle
      font-size user-card-subtitle-size
      color grey

    &-extra
      margin-left .2rem

      font-size user-card-extra-size

      color grey
      opacity .7
</style>
