<template>
  <div class="login-form">
    <h1>Login</h1>

    <label for="username">Username</label>
    <input
      v-model="form.username"
      class="login-form__input"
      id="username"
      type="text"
    />

    <label for="password">Password</label>
    <input
      v-model="form.password"
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
import { defineComponent, reactive } from "vue"

import { useStore } from "@/composables/store"

import { dispatchAuthModal } from "@/store/modules/auth"
import { LOGIN } from "@/store/modules/auth/actions"

export default defineComponent({
  name: "Login",
  setup() {
    const store = useStore()

    const login = () => store.dispatch(dispatchAuthModal(LOGIN))

    const form = reactive({
      username: "",
      password: ""
    })

    return {
      form,
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
