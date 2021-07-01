<template>
  <div class="dialog">
    <DialogHeader />
    <MessagesList />
    <MessageForm />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from "vue"

import { useRoute } from "vue-router"

import { useStore } from "@/composables/store"
import { commitDialogModule, dispatchDialogModule, getterDialogModule } from "@/store/modules/dialog"

import { SET_CURRENT_DIALOG } from "@/store/modules/dialog/mutations"
import { FETCH_DIALOG_MESSAGES } from "@/store/modules/dialog/actions"
import { GET_DIALOGS_LIST } from "@/store/modules/dialog/getters"

import DialogHeader from "@/components/common/messenger/dialog-header/DialogHeader.vue"
import MessagesList from "@/components/common/messenger/messages-list/MessagesList.vue"
import MessageForm from "@/components/common/messenger/message-form/MessageForm.vue"

import { DialogInterface } from "@/types/dialog"

export default defineComponent({
  name: "Dialog",
  components: {
    DialogHeader,
    MessagesList,
    MessageForm
  },
  setup() {
    const route = useRoute()
    const store = useStore()

    const fetchCurrentDialog = (id: string) => {
      store.commit(commitDialogModule(SET_CURRENT_DIALOG), id)
      fetchMessages()
    }

    const fetchMessages = () => store.dispatch(dispatchDialogModule(FETCH_DIALOG_MESSAGES))

    const dialogs = computed(() => store.getters[getterDialogModule(GET_DIALOGS_LIST)] as DialogInterface[])

    watch(() => route.params.id, newId => newId ? fetchCurrentDialog(newId as string) : false)
    watch(() => dialogs.value.length, () => fetchCurrentDialog(route.params.id as string), {
      immediate: true
    })
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
