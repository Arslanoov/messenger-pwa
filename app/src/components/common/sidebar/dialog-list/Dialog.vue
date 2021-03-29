<template>
  <div :class="{ selected: dialog.isSelected }" class="dialog">
    <div
      :style="{ backgroundImage: `url(${dialog.partner.avatar})` }"
      class="dialog-avatar"
    >
      <img
        v-if="dialog.partner.isOnline"
        class="dialog-avatar__online"
        src="~@/assets/images/profile/icons/online.svg"
        alt="">
    </div>
    <div class="dialog-partner">
      <div class="dialog-partner__username">
        {{ dialog.partner.username }}
        <span class="dialog-partner__last-online">
          {{ dialog.partner.latestMessage.date }}
        </span>
      </div>
      <div class="dialog-partner__message">
        {{ dialog.partner.latestMessage.short }}
      </div>
    </div>
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

export default defineComponent({
  name: "DialogList",
  props: {
    dialog: {
      // TODO: Add interface type <of>
      type: Object,
      required: true
    }
  }
})
</script>

<style lang="stylus">
/* TODO: Reduce duplicated code size */
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

  &-avatar
    position relative

    flex-shrink 0

    width sidebar-avatar-size
    height sidebar-avatar-size

    margin-right sidebar-dialog-avatar-margin-right

    background-repeat no-repeat
    background-size cover

    border-radius 100px

    &__online
      position absolute
      bottom 0
      right 0

      width sidebar-dialog-online-icon-size
      height sidebar-dialog-online-icon-size

    &:hover
      cursor pointer

  &-partner
    &__username
      font-size sidebar-partner-username-size

    &__last-online
      margin-left .2rem

      font-size sidebar-partner-last-online-size

      color sidebar-grey
      opacity .7

    &__message
      margin-top .2rem

      font-size sidebar-partner-message-size
      color sidebar-grey

  &-status
    margin-left auto
    padding 0 .2rem

    &__icon
      flex-shrink 0

      height sidebar-dialog-icon-size
</style>
