<template>
  <div class="profile">
    <div class="profile-info">
      <img class="profile-info__avatar" src="~@/assets/images/icons/profile/profile.png" alt="">
      <div class="profile-info__content">
        <div class="profile-info__content-username">{{ user.username }}</div>
        <div class="profile-info__content-about">{{ user.aboutMe }}</div>
      </div>
    </div>
    <img class="profile-bell" src="~@/assets/images/icons/profile/bell/on.svg" alt="">
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
      width 50px
      height 50px

      margin-right 1rem

      border-radius 100px

      &:hover
        cursor pointer

    &__content
      display flex
      flex-direction column

      &-username
        font-size 1.3rem

      &-about
        font-size .9rem
        color sidebar-grey

  &-bell
    width 25px
    height 25px
    
    &:hover
      cursor pointer
</style>
