<template>
  <div class="profile-info">
    <p>{{ user.uuid }}</p>
    <p>{{ user.username }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"

export default defineComponent({
  name: "ProfileInfo",
  setup() {
    const user = reactive({
      uuid: "123e4567-e89b-12d3-a456-426614174000",
      username: "Petya"
    })

    return {
      user
    }
  }
})
</script>

<style lang="stylus">
.profile-info
  height: 100%
</style>
