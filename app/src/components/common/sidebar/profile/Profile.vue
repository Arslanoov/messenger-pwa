<template>
  <div class="profile">
    <div class="profile-info">
      <Avatar :src="user.avatar" is-online />
      <div class="profile-info__content">
        <div class="profile-info__content-username">{{ user.username }}</div>
        <div class="profile-info__content-about">{{ user.aboutMe }}</div>
      </div>
    </div>
    <div class="profile-actions">
      <img
        class="profile-actions__action profile-actions__bell"
        src="~@/assets/images/profile/icons/bell.svg"
        alt="">
      <img
        class="profile-actions__action profile-actions__settings"
        src="~@/assets/images/profile/icons/settings.svg"
        alt="">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"

import Avatar from "@/components/base/avatar/Avatar.vue"

export default defineComponent({
  name: "Profile",
  components: {
    Avatar
  },
  setup() {
    const user = reactive({
      uuid: "123e4567-e89b-12d3-a456-426614174000",
      username: "Rafael Ramaisen",
      aboutMe: "Available for freelance work.",
      avatar: require("@/assets/images/profile/avatar.png")
    })

    return {
      user
    }
  }
})
</script>

<style lang="stylus" scoped>
.profile
  display flex
  justify-content space-between
  align-items center

  padding-top .8rem + line-margin
  padding-bottom: .8rem
  padding-left 1.5rem
  padding-right 1.5rem

  &-info
    display flex
    align-items center

    color white

    &__content
      display flex
      flex-direction column

      &-username
        font-size sidebar-username-size

      &-about
        font-size sidebar-about-size
        color sidebar-grey

  &-actions
    &__bell
    &__settings
      &:hover
        cursor pointer

    &__action
      margin-left .7rem

    &__bell
      width sidebar-bell-size
      height sidebar-bell-size

    &__settings
      width sidebar-settings-size
      height sidebar-settings-size
</style>
