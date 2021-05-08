<template>
  <div class="sign-up">
    <h1 class="sign-up__title">Sign Up</h1>

    <error-handler
        :violations="form.violations"
        :message="form.error"
    />

    <form
      @submit.prevent="signUp"
      class="sign-up__form"
    >
      <label for="username">Username</label>
      <input
        @change="e => setUsername(e.target.value)"
        :value="form.username"
        id="username"
        type="text"
        class="sign-up__input"
      />

      <label for="password">Password</label>
      <input
        @change="e => setPassword(e.target.value)"
        :value="form.password"
        id="password"
        type="password"
        class="sign-up__input"
      />

      <label for="password">Repeat Password</label>
      <input
        @change="e => setRepeatPassword(e.target.value)"
        :value="form.repeatPassword"
        id="repeat-password"
        type="password"
        class="sign-up__input"
      />

      <button
        class="sign-up__button"
        type="submit"
      >
        Join
      </button>
    </form>

    <div class="sign-up__tip">
      Already have an account?
      <router-link to="/login" class="sign-up__link">Log in</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"

import { useRouter } from "vue-router"
import { routesNames } from "@/router/names"

import { useStore } from "@/composables/store"
import { commitAuthModule, dispatchAuthModule, getterAuthModule } from "@/store/modules/auth"

import { SignUpFormStateInterface } from "@/store/modules/auth/state"
import {
  SET_SIGN_UP_FORM_USERNAME,
  SET_SIGN_UP_FORM_PASSWORD,
  SET_SIGN_UP_FORM_REPEAT_PASSWORD
} from "@/store/modules/auth/mutations"
import { SIGN_UP } from "@/store/modules/auth/actions"
import { GET_SIGN_UP_FORM } from "@/store/modules/auth/getters"

import ErrorHandler from "@/components/base/error-handler/ErrorHandler.vue"

export default defineComponent({
  name: "SignUp",
  components: {
    ErrorHandler
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    const form = computed(() => store.getters[getterAuthModule(GET_SIGN_UP_FORM)] as SignUpFormStateInterface)

    const setUsername = (value: string) => store.commit(commitAuthModule(SET_SIGN_UP_FORM_USERNAME), value)
    const setPassword = (value: string) => store.commit(commitAuthModule(SET_SIGN_UP_FORM_PASSWORD), value)
    const setRepeatPassword = (value: string) => store.commit(commitAuthModule(SET_SIGN_UP_FORM_REPEAT_PASSWORD), value)

    const signUp = () => store.dispatch(dispatchAuthModule(SIGN_UP))
      .then(() => router.push({
        name: routesNames.Login
      }))

    return {
      form,
      setUsername,
      setPassword,
      setRepeatPassword,
      signUp
    }
  }
})
</script>

<style lang="stylus" scoped>
.sign-up
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

    border-radius .48rem

    border none
    outline none

    background-color auth-page-button-background

    pointer-on-hover()

  &__link
    color: auth-page-link-color
    text-decoration underline
</style>
