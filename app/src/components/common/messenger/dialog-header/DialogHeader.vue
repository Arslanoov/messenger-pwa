<template>
  <div class="dialog-header">
    <user-card
      :avatar="dialog.partner.avatar"
      :title="dialog.partner.username"
      :subtitle="dialog.partner.latestMessage.short"
      :is-online="dialog.partner.isOnline"
      class="dialog-header__partner"
    />
  </div>
</template>

<script lang="ts">
/* TODO: Add settings icon */

import { defineComponent, reactive } from "vue"

import UserCard from "@/components/base/user-card/UserCard.vue";

export default defineComponent({
  name: "DialogHeader",
  components: {
    UserCard
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
.dialog-header
  display flex
  justify-content space-between
  align-items center

  padding .8rem + line-margin 1.5rem

  position absolute

  top 0
  left 0

  width 100%

  &__partner
    color black
</style>
