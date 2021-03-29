<template>
  <div class="dialog-header">
    <Avatar :src="dialog.partner.avatar" :is-online="dialog.partner.isOnline" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"

import Avatar from "@/components/base/avatar/Avatar.vue"

export default defineComponent({
  name: "DialogHeader",
  components: {
    Avatar
  },
  setup() {
    const dialog = reactive({
      uuid: "124e4567-e89b-12d3-a456-426614174002",
      partner: {
        uuid: "124e4567-e29b-12d3-a456-426614174002",
        username: "Dmitry Shirshov",
        isOnline: false,
        avatar: require("@/assets/images/profile/avatar4.jpg"),
        latestMessage: {
          short: "Can you invite me to your conversation?",
          date: "21 min"
        }
      },
      sentByPartner: {
        isRead: true
      },
      messages: []
    })

    return {
      dialog
    }
  }
})
</script>

<style lang="stylus" scoped>
.dialog-info
  position fixed

  top 0
  left 0

  width 100%
  height 200px
</style>
