<template>
  <div class="dialog-list">
    <Dialog
      v-for="dialog in dialogs"
      :key="dialog.uuid"
      :dialog="dialog"
      class="dialog-list__item"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"

import Dialog from "@/components/common/sidebar/dialog-list/Dialog.vue";

export default defineComponent({
  name: "DialogList",
  components: {
    Dialog
  },
  setup() {
    const dialogs = ref([
      {
        uuid: "123e4567-e89b-12d3-a456-426614174000",
        isSelected: false,
        partner: {
          uuid: "123e4567-e29b-12d3-a456-426614174000",
          username: "Manuel Preuß",
          isOnline: true,
          avatar: require("@/assets/images/profile/avatar2.jpg"),
          latestMessage: {
            short: "Hey Rafael! Can we talk about last Lorem ipsum dolor sit amet, consectetur.",
            date: "just now"
          }
        },
        sentByPartner: {
          isRead: false
        }
      },
      {
        uuid: "124e4567-e89b-12d3-a456-426614174001",
        isSelected: false,
        partner: {
          uuid: "124e4567-e29b-12d3-a456-426614174001",
          username: "Beerfest",
          isOnline: true,
          avatar: require("@/assets/images/profile/avatar3.jpg"),
          latestMessage: {
            short: "I am new here. Nice to meet...",
            date: "8 min"
          }
        },
        sentByPartner: {
          isRead: true
        }
      },
      {
        uuid: "124e4567-e89b-12d3-a456-426614174002",
        isSelected: true,
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
        }
      },
      {
        uuid: "124e4567-e89b-12d3-a456-426614174003",
        isSelected: false,
        partner: {
          uuid: "124e4567-e29b-12d3-a456-426614174003",
          username: "Helga Källström",
          isOnline: true,
          avatar: require("@/assets/images/profile/avatar5.jpg"),
          latestMessage: {
            short: "I’m very happy to introduce it!",
            date: "3 hours"
          }
        },
        sentByMe: {
          isSent: true,
          isRead: true
        }
      },
      {
        uuid: "124e4567-e89b-12d3-a456-426614174003",
        isSelected: false,
        partner: {
          uuid: "124e4567-e29b-12d3-a456-426614174003",
          username: "Hugh Reynolds",
          isOnline: false,
          avatar: require("@/assets/images/profile/avatar6.jpg"),
          latestMessage: {
            short: "Sup bro! Can you call me pls?",
            date: "yesterday"
          }
        },
        sentByMe: {
          isSent: true,
          isRead: false
        }
      },
      {
        uuid: "124e4567-e89b-12d3-a456-426614174004",
        isSelected: false,
        partner: {
          uuid: "124e4567-e29b-12d3-a456-426614174004",
          username: "Ethan Coleman",
          isOnline: false,
          avatar: require("@/assets/images/profile/avatar7.jpg"),
          latestMessage: {
            short: "Thanks! Have a nice day!",
            date: "jan 19"
          }
        },
        sentByPartner: {
          isRead: true
        }
      }
    ])

    return {
      dialogs
    }
  }
})
</script>

<style lang="stylus" scoped>

</style>
