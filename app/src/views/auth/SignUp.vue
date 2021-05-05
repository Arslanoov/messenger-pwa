<template>
  <div class="sign-up-form">
    <h1>Sign Up</h1>

    <div class="sign-up-form__error" v-if="form.error">
      {{ form.error }}
    </div>

    <label for="username">Username</label>
    <input
      @change="e => setUsername(e.target.value)"
      :value="form.username"
      class="sign-up-form__input"
      id="username"
      type="text"
    />

    <label for="password">Password</label>
    <input
      @change="e => setPassword(e.target.value)"
      :value="form.password"
      class="sign-up-form__input"
      id="password"
      type="password"
    />

    <label for="password">Repeat Password</label>
    <input
      @change="e => setRepeatPassword(e.target.value)"
      :value="form.repeatPassword"
      class="sign-up-form__input"
      id="repeat-password"
      type="password"
    />

    <button
      @click="signUp"
      class="sign-up-form__button"
      type="submit"
    >
      Join
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue"

import { useRouter } from "vue-router"
import { routesNames } from "@/router/names"

import { useStore } from "@/composables/store"
import { commitAuthModal, dispatchAuthModal, getterAuthModal } from "@/store/modules/auth"

import { SignUpFormStateInterface } from "@/store/modules/auth/state"
import {
  SET_SIGN_UP_FORM_USERNAME,
  SET_SIGN_UP_FORM_PASSWORD,
  SET_SIGN_UP_FORM_REPEAT_PASSWORD
} from "@/store/modules/auth/mutations"
import { SIGN_UP } from "@/store/modules/auth/actions"
import { GET_SIGN_UP_FORM } from "@/store/modules/auth/getters"

export default defineComponent({
  name: "SignUp",
  setup() {
    const store = useStore()
    const router = useRouter()

    const form = computed(() => store.getters[getterAuthModal(GET_SIGN_UP_FORM)] as SignUpFormStateInterface)

    const setUsername = (value: string) => store.commit(commitAuthModal(SET_SIGN_UP_FORM_USERNAME), value)
    const setPassword = (value: string) => store.commit(commitAuthModal(SET_SIGN_UP_FORM_PASSWORD), value)
    const setRepeatPassword = (value: string) => store.commit(commitAuthModal(SET_SIGN_UP_FORM_REPEAT_PASSWORD), value)

    const signUp = () => store.dispatch(dispatchAuthModal(SIGN_UP))
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
.sign-up-form
  display flex
  flex-direction column

  width 20rem

  color auth-page-color

  +breakpoint-to(breakpoints.mobile)
    width auto
    max-width 20rem

  &__error
    margin-bottom .5rem

  &__input
    margin-bottom 1rem

    padding .4rem

    border-radius .18rem

    background auth-page-input-background

    border none
    outline none

  &__button
    padding .625rem .18rem

    border-radius .3rem

    border none
    outline none

    pointer-on-hover()
</style>
