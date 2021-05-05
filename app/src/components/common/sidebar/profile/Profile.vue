<template>
  <div class="profile" v-if="user">
    <user-card
      :avatar="user.avatar"
      :title="user.username"
      :subtitle="user.aboutMe"
      is-online
    />
    <div class="profile__actions">
      <div class="profile__action">
        <div class="profile__popup" :class="{
          'profile__popup_opened': isOpenedPopup
        }">
          <div class="profile__popup-item">
            Profile
          </div>
          <div @click="logout" class="profile__popup-item">
            Logout
          </div>
        </div>
        <img
          class="profile__bell"
          src="~@/assets/images/profile/icons/bell.svg"
          alt="">
      </div>
      <img
        @click="togglePopup"
        class="profile__action profile__settings"
        src="~@/assets/images/profile/icons/settings.svg"
        alt="">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue"

import { useRouter } from "vue-router"
import { routesNames } from "@/router/names"

import { useStore } from "@/composables/store"
import { getterAuthModal } from "@/store/modules/auth"

import {
  UserInterface
} from "@/types/user"

import {
  GET_CURRENT_USER
} from "@/store/modules/auth/getters"

import UserCard from "@/components/base/user-card/UserCard.vue"

import { dispatchAuthModal } from "@/store/modules/auth"
import { LOGOUT } from "@/store/modules/auth/actions"

export default defineComponent({
  name: "Profile",
  components: {
    UserCard
  },
  setup() {
    const router = useRouter()

    const store = useStore()

    const user = computed(() => store.getters[getterAuthModal(GET_CURRENT_USER)] as UserInterface | null)
    const logout = () => {
      store.dispatch(dispatchAuthModal(LOGOUT))
      router.push({
        name: routesNames.Login
      })
    }

    const isOpenedPopup = ref(false)
    const togglePopup = () => isOpenedPopup.value = !isOpenedPopup.value

    return {
      user,
      logout,
      isOpenedPopup,
      togglePopup
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
    position relative

    margin-left .7rem

  &__popup
    position absolute
    top 4rem
    right 0

    display flex
    flex-direction column
    justify-content center
    align-items center

    min-width 10rem
    min-height 1rem

    padding 1rem 2rem

    background #fff

    opacity 0

    transition opacity .5s

    z-index 1

    &_opened
      opacity 1

    &-item
      padding .5rem 1rem

      &:not(:last-of-type)
        margin-bottom .5rem

      pointer-on-hover()

  &__bell,
  &__settings
    pointer-on-hover()

  &__bell
    width sidebar-bell-size
    height sidebar-bell-size

  &__settings
    width sidebar-settings-size
    height sidebar-settings-size
</style>
