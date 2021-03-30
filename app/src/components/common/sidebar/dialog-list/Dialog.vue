<template>
  <div
    @click="onDialogChoose(dialog.uuid)"
    :class="{ selected: dialog.isSelected }"
    class="dialog"
  >
    <user-card
      :avatar="dialog.partner.avatar"
      :title="dialog.partner.username"
      :subtitle="dialog.partner.latestMessage.short"
      :extra="dialog.partner.latestMessage.date"
      :is-online="dialog.partner.isOnline"
    />
    <div class="dialog-status">
      <template v-if="dialog.sentByMe">
        <img
          v-if="dialog.sentByMe.isRead"
          class="dialog-status__icon"
          src="~@/assets/images/profile/icons/2.png"
          alt="">
        <img
          v-else
          class="dialog-status__icon"
          src="~@/assets/images/profile/icons/1.png"
          alt="">
      </template>
      <template v-if="dialog.sentByPartner && !dialog.sentByPartner.isRead">
        <img class="dialog-status__icon" src="~@/assets/images/profile/icons/new.svg" alt="">
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useRouter } from "vue-router"

import { routesNames } from "@/router/names"

import UserCard from "@/components/base/user-card/UserCard.vue"

export default defineComponent({
  name: "Dialog",
  components: {
    UserCard
  },
  props: {
    dialog: {
      // TODO: Add interface type <of>
      type: Object,
      required: true
    }
  },
  setup() {
    const router = useRouter()

    const onDialogChoose = (id: string) => router.push({
      name: routesNames.Dialog,
      params: {
        id
      }
    })

    return {
      onDialogChoose
    }
  }
})
</script>

<style lang="stylus" scoped>
.dialog
  display flex
  align-items center

  width 100%

  padding: 1.2rem 1.5rem

  color white

  transition background-color .2s ease-in-out

  &:hover
  &.selected
    background-color selected-dialog-background
    cursor pointer

  &-status
    margin-left auto
    padding 0 .2rem

    &__icon
      flex-shrink 0

      height sidebar-dialog-icon-size
</style>