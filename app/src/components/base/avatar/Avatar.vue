<template>
  <div class="avatar" :style="{ backgroundImage: `url(${src})` }">
    <img
      v-if="isOnline"
      class="avatar-online"
      src="~@/assets/images/profile/icons/online.svg"
      alt="">
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "Avatar",
  props: {
    src: {
      type: String,
      required: true
    },
    isOnline: {
      type: Boolean,
      required: true
    }
  }
})
</script>

<style lang="stylus">
.avatar
  position relative

  flex-shrink: 0;

  width avatar-size
  height avatar-size

  margin-right avatar-margin-right

  background-repeat no-repeat
  background-size cover

  border-radius 100px

  &-online
    position absolute
    bottom 0
    right 0

    width 10px
    height 10px

  &:hover
    cursor pointer
</style>
