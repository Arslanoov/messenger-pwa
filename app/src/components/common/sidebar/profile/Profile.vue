<template>
  <div
    v-if="user"
    :class="{ 'profile_opened': isStartedOpeningSidebar }"
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
        :class="{ 'profile__action_with-margin': isStartedOpeningSidebar }"
        class="profile__action"
      >
        <div
          :class="{ 'profile__popup_opened': isOpenedPopup }"
          class="profile__popup"
        >
          <div @click="profile" class="profile__popup-item">
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
          src="~@/assets/images/profile/icons/bell.svg"
          class="profile__bell"
          alt="">
      </div>
      <img
        @click="togglePopup"
        :class="{ 'profile__action_with-margin': isStartedOpeningSidebar }"
        src="~@/assets/images/profile/icons/settings.svg"
        class="profile__action profile__settings"
        alt=""
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue"

import { useRouter } from "vue-router"
import { routesNames } from "@/router/names"

import { useStore } from "@/composables/store"
import { dispatchAuthModule, getterAuthModule } from "@/store/modules/auth"
import { commitSidebarModule, getterSidebarModule } from "@/store/modules/sidebar"

import { LOGOUT } from "@/store/modules/auth/actions"
import { GET_CURRENT_USER } from "@/store/modules/auth/getters"

import { START_SIDEBAR_OPENING, TOGGLE_SIDEBAR } from "@/store/modules/sidebar/mutations"
import { GET_IS_SIDEBAR_STARTED_OPENING, GET_IS_SIDEBAR_OPENED } from "@/store/modules/sidebar/getters"

import { UserInterface } from "@/types/user"

import UserCard from "@/components/base/user-card/UserCard.vue"

export default defineComponent({
  name: "Profile",
  components: {
    UserCard
  },
  setup() {
    const router = useRouter()

    const store = useStore()

    /* User */

    const user = computed(() => store.getters[getterAuthModule(GET_CURRENT_USER)] as UserInterface | null)
    const logout = () => {
      store.dispatch(dispatchAuthModule(LOGOUT))
      router.push({
        name: routesNames.Login
      })
    }

    /* Sidebar */

    const isStartedOpeningSidebar = computed(
      () => store.getters[getterSidebarModule(GET_IS_SIDEBAR_STARTED_OPENING)]
    )
    const isOpenedSidebar = computed(() => store.getters[getterSidebarModule(GET_IS_SIDEBAR_OPENED)])

    const startOpeningSidebar = () => store.commit(commitSidebarModule(START_SIDEBAR_OPENING))
    const toggleSidebar = () => {
      if (isOpenedSidebar.value) {
        closePopup()
        store.commit(commitSidebarModule(TOGGLE_SIDEBAR))
      } else {
        startOpeningSidebar()
        window.setTimeout(() => store.commit(commitSidebarModule(TOGGLE_SIDEBAR)), 500)
      }
    }

    /* Popup */

    const isOpenedPopup = ref(false)
    const closePopup = () => isOpenedPopup.value = false
    const togglePopup = () => {
      if (!isStartedOpeningSidebar.value) {
        toggleSidebar()
        return
      }
      isOpenedPopup.value = !isOpenedPopup.value
    }

    /* Profile */

    const profile = () => {
      closePopup()
      router.push({
        name: routesNames.Profile
      }).catch(() => {})
    }

    return {
      user,
      logout,

      isOpenedPopup,
      togglePopup,

      isStartedOpeningSidebar,
      isOpenedSidebar,
      toggleSidebar,

      profile
    }
  }
})
</script>

<style lang="stylus" scoped>
.profile
  display flex
  justify-content center
  align-items center

  padding-top 1.3rem + line-margin

  transition profile-padding-transition

  &_opened
    justify-content space-between

    padding-bottom: 1.3rem
    padding-left 2.4rem
    padding-right 2.4rem

  &__action
    position relative

    margin-left 0

    &_with-margin
      margin-left 1.1rem

  &__popup
    position absolute
    top 6.4rem
    right 0

    display flex
    flex-direction column
    justify-content center
    align-items center

    min-width 12.8
    min-height 1.6rem

    padding 1.6rem 3.2rem

    font-size popup-font-size

    color profile-popup-color
    background-color profile-popup-background-color

    visibility hidden
    opacity 0

    transition profile-popup-transition

    z-index 1

    user-select none

    &_opened
      visibility visible

      opacity 1

    &-item
      padding .8rem 1.6rem

      &:not(:last-of-type)
        margin-bottom .8rem

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
