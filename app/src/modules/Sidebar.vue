<template>
  <div class="sidebar">
    <ProfileInfo />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import ProfileInfo from "@/components/common/sidebar/ProfileInfo.vue"

export default defineComponent({
  name: "Sidebar",
  components: {
    ProfileInfo
  }
})
</script>

<style lang="stylus">
.sidebar
  width: 30%
  border: 2px solid red
  height: 100%
</style>
