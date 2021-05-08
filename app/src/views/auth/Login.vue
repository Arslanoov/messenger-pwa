<template>
  <div class="login">
    <h1 class="login__title">Login</h1>

    <error-handler :message="form.error" />

    <form
      @submit.prevent="login"
      class="login__form"
    >
      <label for="username">Username</label>
      <input
        @change="e => setUsername(e.target.value)"
        :value="form.username"
        id="username"
        class="login__input"
        type="text"
      />

      <label for="password">Password</label>
      <input
        @change="e => setPassword(e.target.value)"
        :value="form.password"
        id="password"
        type="password"
        class="login__input"
        autocomplete="password"
      />

      <button
        type="submit"
        class="login__button"
      >
        Log In
      </button>
    </form>

    <div class="login__tip">
      Not have an account?
      <router-link class="login__link" to="/sign-up">Sign Up</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"

import { useRouter } from "vue-router"
import { routesNames } from "@/router/names"

import { useStore } from "@/composables/store"
import { commitAuthModule, dispatchAuthModule, getterAuthModule } from "@/store/modules/auth"

import { AuthFormStateInterface } from "@/store/modules/auth/state"
import {
  SET_AUTH_FORM_USERNAME,
  SET_AUTH_FORM_PASSWORD
} from "@/store/modules/auth/mutations"
import { LOGIN } from "@/store/modules/auth/actions"
import { GET_AUTH_FORM } from "@/store/modules/auth/getters"

import ErrorHandler from "@/components/base/error-handler/ErrorHandler.vue"

export default defineComponent({
  name: "Login",
  components: {
    ErrorHandler
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    const form = computed(() => store.getters[getterAuthModule(GET_AUTH_FORM)] as AuthFormStateInterface)

    const setUsername = (value: string) => store.commit(commitAuthModule(SET_AUTH_FORM_USERNAME), value)
    const setPassword = (value: string) => store.commit(commitAuthModule(SET_AUTH_FORM_PASSWORD), value)

    const login = () => store.dispatch(dispatchAuthModule(LOGIN))
      .then(() => router.push({
        name: routesNames.SelectDialog
      }))

    return {
      form,
      setUsername,
      setPassword,
      login
    }
  }
})
</script>

<style lang="stylus" scoped>
.login
  width 32rem

  font-size auth-page-font-size

  color auth-page-color

  &
  &__form
    display flex
    flex-direction column

  &__title
    margin-bottom 1.6rem

  +breakpoint-to(breakpoints.mobile-sm)
    width auto
    max-width 32rem

  &__error
    margin-bottom 1.3rem

    color auth-page-error-color

  &__input
    margin-bottom 1.6rem

    padding .64rem

    border-radius .28rem

    background auth-page-input-background

    border none
    outline none

  &__button
    margin-bottom 1.6rem

    padding 1rem .28rem

    border-radius .5rem

    border none
    outline none

    background-color auth-page-button-background

    pointer-on-hover()

  &__link
    color: auth-page-link-color
    text-decoration underline
</style>
