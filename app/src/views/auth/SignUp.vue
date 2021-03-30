<template>
  <div class="sign-up-form">
    <h1>Sign Up</h1>

    <label for="username">Username</label>
    <input
      v-model="form.username"
      class="sign-up-form__input"
      id="username"
      type="text"
    />

    <label for="password">Password</label>
    <input
      v-model="form.password"
      class="sign-up-form__input"
      id="password"
      type="password"
    />

    <button
      class="sign-up-form__button"
      type="submit"
    >
      Join
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"

export default defineComponent({
  name: "SignUp",
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
.sign-up-form
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
