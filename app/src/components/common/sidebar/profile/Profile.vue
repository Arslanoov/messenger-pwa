<template>
  <div
    v-if="user"
    :class="{
      'profile_opened': isStartedOpeningSidebar
    }"
    class="profile"
  >
    <user-card
      :avatar="user.avatar"
      :title="user.username"
      :subtitle="user.aboutMe"
      collapsible
      is-online
      with-margin
    />
    <div class="profile__actions">
      <div
        :class="{
          'profile__action_with-margin': isStartedOpeningSidebar
        }"
        class="profile__action"
      >
        <div
          :class="{
            'profile__popup_opened': isOpenedPopup
          }"
          class="profile__popup"
        >
          <div class="profile__popup-item">
            Profile
          </div>
          <div @click="toggleSidebar" class="profile__popup-item">
            Hide
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
        :class="{
          'profile__action_with-margin': isStartedOpeningSidebar
        }"
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
import { getterAuthModule } from "@/store/modules/auth"

import {
  UserInterface
} from "@/types/user"

import {
  GET_CURRENT_USER
} from "@/store/modules/auth/getters"

import UserCard from "@/components/base/user-card/UserCard.vue"

import { dispatchAuthModule } from "@/store/modules/auth"
import { LOGOUT } from "@/store/modules/auth/actions"

import { commitSidebarModule, getterSidebarModule } from "@/store/modules/sidebar"
import { START_SIDEBAR_OPENING, TOGGLE_SIDEBAR } from "@/store/modules/sidebar/mutations"
import { GET_IS_SIDEBAR_STARTED_OPENING, GET_IS_SIDEBAR_OPENED } from "@/store/modules/sidebar/getters"

export default defineComponent({
  name: "Profile",
  components: {
    UserCard
  },
  setup() {
    const router = useRouter()

    const store = useStore()

    const user = computed(() => store.getters[getterAuthModule(GET_CURRENT_USER)] as UserInterface | null)
    const logout = () => {
      store.dispatch(dispatchAuthModule(LOGOUT))
      router.push({
        name: routesNames.Login
      })
    }

    const isStartedOpeningSidebar = computed(() => store.getters[getterSidebarModule(GET_IS_SIDEBAR_STARTED_OPENING)])
    const isOpenedSidebar = computed(() => store.getters[getterSidebarModule(GET_IS_SIDEBAR_OPENED)])

    const startOpeningSidebar = () => store.commit(commitSidebarModule(START_SIDEBAR_OPENING))
    const toggleSidebar = () => {
      if (!isOpenedSidebar.value) {
        startOpeningSidebar()
        window.setTimeout(() => store.commit(commitSidebarModule(TOGGLE_SIDEBAR)), 500)
      } else {
        closePopup()
        store.commit(commitSidebarModule(TOGGLE_SIDEBAR))
      }
    }

    const isOpenedPopup = ref(false)
    const closePopup = () => isOpenedPopup.value = false
    const togglePopup = () => {
      if (!isStartedOpeningSidebar.value) {
        toggleSidebar()
        return
      }
      isOpenedPopup.value = !isOpenedPopup.value
    }

    return {
      user,
      logout,

      isOpenedPopup,
      togglePopup,

      isStartedOpeningSidebar,
      isOpenedSidebar,
      toggleSidebar
    }
  }
})
</script>

<style lang="stylus" scoped>
.profile
  display flex
  justify-content center
  align-items center

  padding-top .8rem + line-margin

  transition padding .5s

  &_opened
    justify-content space-between

    padding-bottom: .8rem
    padding-left 1.5rem
    padding-right 1.5rem

  &__action
    position relative

    margin-left 0

    &_with-margin
      margin-left .7rem

  &__popup
    position absolute
    top 4rem
    right 0

    display flex
    flex-direction column
    justify-content center
    align-items center

    min-width 8rem
    min-height 1rem

    padding 1rem 2rem

    color #541a8b
    background-color #fff

    visibility hidden
    opacity 0

    transition opacity .6s

    z-index 1

    user-select none

    &_opened
      visibility visible

      opacity 1

    &-item
      padding .5rem 1rem

      &:not(:last-of-type)
        margin-bottom .5rem

      pointer-on-hover()

  &__bell,
  &__settings
    user-select none

    pointer-on-hover()

  &__bell
    width sidebar-bell-size
    height sidebar-bell-size

  &__settings
    width sidebar-settings-size
    height sidebar-settings-size
</style>
