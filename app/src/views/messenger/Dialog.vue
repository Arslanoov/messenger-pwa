<template>
  <div class="dialog">
    <DialogHeader />
    <MessagesList />
    <MessageForm />
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue"

import { useStore } from "@/composables/store"
import { commitDialogModule, dispatchDialogModule } from "@/store/modules/dialog"

import { SET_CURRENT_DIALOG } from "@/store/modules/dialog/mutations"
import { FETCH_DIALOG_MESSAGES } from "@/store/modules/dialog/actions"

import { useRoute } from "vue-router"

import DialogHeader from "@/components/common/messenger/dialog-header/DialogHeader.vue"
import MessagesList from "@/components/common/messenger/messages-list/MessagesList.vue"
import MessageForm from "@/components/common/messenger/message-form/MessageForm.vue"

export default defineComponent({
  name: "Dialog",
  components: {
    DialogHeader,
    MessagesList,
    MessageForm
  },
  setup() {
    const store = useStore()
    const route = useRoute()

    const fetchCurrentDialog = (id: string) => {
      store.commit(commitDialogModule(SET_CURRENT_DIALOG), id)
      store.dispatch(dispatchDialogModule(FETCH_DIALOG_MESSAGES))
    }

    // TODO: Smooth scroll to page bottom

    watch(() => route.params.id, newId => fetchCurrentDialog(newId as string))
  }
})
</script>

<style lang="stylus" scoped>
.dialog
  position relative

  display flex
  flex-direction column

  height 100vh
</style>
