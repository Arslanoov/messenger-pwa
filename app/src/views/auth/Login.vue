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
      class="login-form__button"
      type="submit"
    >
      Log In
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"

export default defineComponent({
  name: "Login",
  setup() {
    const form = reactive({
      username: "",
      password: ""
    })

    return {
      form
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

    &:hover
      cursor pointer
</style>
