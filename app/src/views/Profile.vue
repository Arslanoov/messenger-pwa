<template>
  <div class="profile" v-if="user">
    <h1 class="profile__title">Profile</h1>

    <div class="profile__username">{{ user.username }}</div>
    <div class="profile__avatar">
      <img
        :src="avatarUrl(user.avatar)"
        class="profile__avatar-img"
        draggable="false"
        alt="Avatar"
      />

      <input
        @change="e => changeAvatar(e.target.files[0])"
        id="upload"
        type="file"
        class="profile__file-upload"
      />
    </div>

    <div
      v-if="user.avatar"
      @click="removeAvatar"
      class="profile__avatar-action"
    >Remove</div>
    <label class="profile__avatar-action" for="upload">Upload</label>

    <div class="profile__about">
      <div class="profile__about-title">About me</div>
      <textarea
        @change="e => changeAbout(e.target.value)"
        :value="user.aboutMe"
        class="profile__about-textarea"
      ></textarea>
      <button @click="changeInfo" class="profile__about-button">Save</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"

import { useStore } from "@/composables/store"
import { commitAuthModule, getterAuthModule } from "@/store/modules/auth"
import { commitProfileModule, dispatchProfileModule } from "@/store/modules/profile"

import { SET_AVATAR, REMOVE_AVATAR } from "@/store/modules/auth/mutations"
import { GET_CURRENT_USER } from "@/store/modules/auth/getters"

import { SET_CHANGE_FORM_ABOUT } from "@/store/modules/profile/mutations"
import { CHANGE_AVATAR, CHANGE_INFO, REMOVE_AVATAR as REMOVE_AVATAR_ACTION } from "@/store/modules/profile/actions"

import { UserInterface } from "@/types/user"

import { avatarUrl } from "@/helpers/avatar"

import { notify } from "@kyvg/vue3-notification"

export default defineComponent({
  name: "Profile",
  setup() {
    const store = useStore()

    const user = computed(() => store.getters[getterAuthModule(GET_CURRENT_USER)] as UserInterface)

    const changeAbout = (value: string) => store.commit(commitProfileModule(SET_CHANGE_FORM_ABOUT), value)
    const changeInfo = () => {
      store.dispatch(dispatchProfileModule(CHANGE_INFO))
        .then(() => notify({
          type: "success",
          text: "Profile data successfully changed"
        }))
        .catch(error => notify({
          type: "warn",
          text: error.data.message
        }))
    }

    const changeAvatar = (file: File) => {
      const form = new FormData()
      form.append("avatar", file)

      store
        .dispatch(dispatchProfileModule(CHANGE_AVATAR), {
          data: form
        })
        .then((url: string) => {
          const params = new URLSearchParams({
            hash: String(Math.random())
          })
          store.commit(commitAuthModule(SET_AVATAR), `${url}?${params.toString()}`)

          notify({
            type: "success",
            text: "Avatar successfully updated"
          })
        })
    }
    const removeAvatar = () => {
      store
        .dispatch(dispatchProfileModule(REMOVE_AVATAR_ACTION))
        .then(() => {
          store.commit(commitAuthModule(REMOVE_AVATAR))

          notify({
            type: "success",
            text: "Avatar successfully removed"
          })
        })
    }

    return {
      user,
      avatarUrl,

      changeAbout,
      changeInfo,

      changeAvatar,
      removeAvatar
    }
  }
})
</script>

<style lang="stylus" scoped>
.profile
  display flex
  flex-direction column
  align-items center

  padding 3.2rem

  font-size profile-font-size

  color profile-color
  background-color profile-background-color

  &__title
    margin-bottom 3.2rem

    font-size profile-title-font-size
    font-weight profile-title-font-weight

  &__username
    margin-bottom .8rem

  &__avatar
    position relative

    width 16rem
    height 16rem

    margin-bottom 2.4rem

    &-img
      position absolute

      top 0
      right 0

      width 16rem
      height 16rem

      border-radius 16rem

      user-select none

  &__about
    display flex
    flex-direction column
    align-items center

    width 100%

    &-title
      margin-bottom .8rem

    &-textarea
      margin-bottom 1.6rem

      width 45%
      height 32rem

      padding 1.6rem

      color inherit
      background-color profile-textarea-button-background

      border profile-textarea-border
      outline none

      font-size profile-textarea-font-size

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
      padding .8rem 2.4rem

      background profile-textarea-button-background

      border profile-button-border
      outline none

      font-size profile-button-font-size

      pointer-on-hover()

  &__avatar
    &-action
      position relative

      margin-bottom .32rem

      z-index 2

      pointer-on-hover()

      &:last-of-type
        margin-bottom 3.2rem

  &__file-upload
    visibility hidden
</style>
