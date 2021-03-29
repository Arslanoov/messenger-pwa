<template>
  <div class="profile">
    <div class="profile-info">
      <div class="profile-info__avatar">
        <img
          class="profile-info__avatar-online"
          src="~@/assets/images/profile/icons/online.svg" alt="">
      </div>
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

export default defineComponent({
  name: "Profile",
  setup() {
    const user = reactive({
      uuid: "123e4567-e89b-12d3-a456-426614174000",
      username: "Rafael Ramaisen",
      aboutMe: "Available for freelance work."
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

  padding: 1.3rem 1.5rem

  &-info
    display flex
    align-items center

    color white

    &__avatar
      position relative

      width sidebar-avatar-size
      height sidebar-avatar-size

      margin-right 1rem

      background url(../../../assets/images/profile/avatar.png) no-repeat
      background-size cover

      border-radius 100px

      &-online
        position absolute
        bottom 0
        right 0

        width 10px
        height 10px

      &:hover
        cursor pointer

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
