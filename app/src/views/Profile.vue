<template>
  <div class="profile">
    <h1 class="profile__title">Profile</h1>

    <div class="profile__username">{{ user.username }}</div>
    <div class="profile__avatar">
      <img
        :src="userAvatar"
        class="profile__avatar-img"
        draggable="false"
        alt="Avatar"
      />

      <div
        class="profile__avatar-action"
      >
        <input
          id="upload"
          type="file"
          class="profile__file-upload"
        />
      </div>
    </div>

    <div v-if="user.avatar" class="profile__avatar-action">Remove</div>
    <label class="profile__avatar-action" for="upload">Upload</label>

    <div class="profile__about">
      <div class="profile__about-title">About me</div>
      <textarea
        :value="user.aboutMe"
        class="profile__about-textarea"
      ></textarea>
      <button class="profile__about-button">Save</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"

import { useStore } from "@/composables/store"
import { getterAuthModule } from "@/store/modules/auth"

import { GET_CURRENT_USER } from "@/store/modules/auth/getters"

import { UserInterface } from "@/types/user"

export default defineComponent({
  name: "Profile",
  setup() {
    const store = useStore()

    const user = computed(() => store.getters[getterAuthModule(GET_CURRENT_USER)] as UserInterface)
    const userAvatar = computed(() => user.value.avatar || require("@/assets/images/profile/no-avatar.svg"))

    return {
      user,
      userAvatar
    }
  }
})
</script>

<style lang="stylus" scoped>
.profile
  display flex
  flex-direction column
  align-items center

  padding 2rem

  font-size 1.5rem

  color #180b34
  background-color #ebeafd

  &__title
    margin-bottom 2rem

    font-size 2rem
    font-weight 500

  &__username
    margin-bottom .5rem

  &__avatar
    position relative

    width 10rem
    height 10rem

    margin-bottom 1.5rem

    &-img
      position absolute

      top 0
      right 0

      width 10rem
      height 10rem

      border-radius 10rem

      user-select none

  &__about
    display flex
    flex-direction column
    align-items center

    width 100%

    &-title
      margin-bottom .5rem

    &-textarea
      margin-bottom 1rem

      width 45%
      height 20rem

      padding 1rem

      color inherit
      background-color titan-white

      border 1px solid #541a8b
      outline none

      font-size 1rem

      resize none

      +breakpoint-to(breakpoints.desktop-md)
        width 50%

      +breakpoint-to(breakpoints.desktop-sm)
        width 60%

      +breakpoint-to(breakpoints.tablet)
        width 75%

      +breakpoint-to(breakpoints.mobile)
        width 90%

    &-button
      padding .5rem 1.5rem

      background titan-white

      border 1px solid grey
      outline none

      font-size 1rem

      pointer-on-hover()

  &__avatar
    &-action
      position relative

      margin-bottom .2rem

      z-index 2

      pointer-on-hover()

      &:last-of-type {
        margin-bottom 2rem
      }

  &__file-upload
    visibility hidden
</style>
