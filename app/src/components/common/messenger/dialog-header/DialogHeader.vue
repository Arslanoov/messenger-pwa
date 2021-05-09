<template>
  <div class="dialog-header">
    <user-card
      v-if="dialog"
      :avatar="dialog.partner.avatar"
      :title="dialog.partner.username"
      :subtitle="dialog.partner.aboutMe"
      :is-online="dialog.partner.isOnline"
      class="dialog-header__partner"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"

import { DialogInterface } from "@/types/dialog"

import { useStore } from "@/composables/store"
import { getterDialogModule } from "@/store/modules/dialog"

import { GET_CURRENT_DIALOG } from "@/store/modules/dialog/getters"

import UserCard from "@/components/base/user-card/UserCard.vue"

export default defineComponent({
  name: "DialogHeader",
  components: {
    UserCard
  },
  setup() {
    const store = useStore()

    const currentDialog = computed(() => store.getters[getterDialogModule(GET_CURRENT_DIALOG)] as DialogInterface)

    return {
      dialog: currentDialog
    }
  }
})
</script>

<style lang="stylus" scoped>
.dialog-header
  display flex
  justify-content space-between
  align-items center

  padding (1.3rem + line-margin) 2.4rem

  width 100%

  &__partner
    color dialog-header-partner-color
</style>
