<template>
  <div class="profile">
    <user-card
      :avatar="user.avatar"
      :title="user.username"
      :subtitle="user.aboutMe"
      is-online
    />
    <div class="profile__actions">
      <img
        class="profile__action profile__bell"
        src="~@/assets/images/profile/icons/bell.svg"
        alt="">
      <img
        class="profile__action profile__settings"
        src="~@/assets/images/profile/icons/settings.svg"
        alt="">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"

import UserCard from "@/components/base/user-card/UserCard.vue";

export default defineComponent({
  name: "Profile",
  components: {
    UserCard
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

  &__action
    margin-left .7rem

  &__bell
  &__settings
    pointer-on-hover()

  &__bell
    width sidebar-bell-size
    height sidebar-bell-size

  &__settings
    width sidebar-settings-size
    height sidebar-settings-size
</style>
