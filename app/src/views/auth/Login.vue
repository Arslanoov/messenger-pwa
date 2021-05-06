<template>
  <div class="login-form">
    <h1>Login</h1>

    <div class="login-form__error" v-if="form.error">
      {{ form.error }}
    </div>

    <label for="username">Username</label>
    <input
      @change="e => setUsername(e.target.value)"
      :value="form.username"
      class="login-form__input"
      id="username"
      type="text"
    />

    <label for="password">Password</label>
    <input
      @change="e => setPassword(e.target.value)"
      :value="form.password"
      class="login-form__input"
      id="password"
      type="password"
    />

    <button
      @click="login"
      class="login-form__button"
      type="submit"
    >
      Log In
    </button>

    <div class="login-form__tip">
      Not have an account?
      <router-link class="login-form__link" to="/sign-up">Sign Up</router-link>
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

export default defineComponent({
  name: "Login",
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
.login-form
  display flex
  flex-direction column

  width 20rem

  color auth-page-color

  +breakpoint-to(breakpoints.mobile-sm)
    width auto
    max-width 20rem

  &__error
    margin-bottom .8rem

    color auth-page-error-color

  &__input
    margin-bottom 1rem

    padding .4rem

    border-radius .18rem

    background auth-page-input-background

    border none
    outline none

  &__button
    margin-bottom 1rem

    padding .625rem .18rem

    border-radius .3rem

    border none
    outline none

    background-color auth-page-button-background

    pointer-on-hover()

  &__link
    color: auth-page-link-color
    text-decoration underline
</style>
