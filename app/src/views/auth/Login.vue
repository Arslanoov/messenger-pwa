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
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"

import { useRouter } from "vue-router"
import { routesNames } from "@/router/names"

import { useStore } from "@/composables/store"
import { commitAuthModal, dispatchAuthModal, getterAuthModal } from "@/store/modules/auth"

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

    const form = computed(() => store.getters[getterAuthModal(GET_AUTH_FORM)] as AuthFormStateInterface)

    const setUsername = (value: string) => store.commit(commitAuthModal(SET_AUTH_FORM_USERNAME), value)
    const setPassword = (value: string) => store.commit(commitAuthModal(SET_AUTH_FORM_PASSWORD), value)

    const login = () => store.dispatch(dispatchAuthModal(LOGIN))
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

  color white

  &__error
    margin-bottom .5rem

  &__input
    margin-bottom 1rem

    padding 7px

    border-radius 3px

    background #fff

    border 0
    outline 0

  &__button
    padding 10px 3px

    border-radius 5px

    border 0
    outline 0

    pointer-on-hover()
</style>
