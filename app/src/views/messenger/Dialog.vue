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

import { useRouter } from "vue-router"
import { useRoute } from "vue-router"
import { routesNames } from "@/router/names"

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
    const route = useRoute()
    const router = useRouter()

    const store = useStore()

    const fetchCurrentDialog = (id: string) => {
      store.commit(commitDialogModule(SET_CURRENT_DIALOG), id)
      store.dispatch(dispatchDialogModule(FETCH_DIALOG_MESSAGES))
        .catch(error => {
          if (404 === error.response?.status) {
            router.push({
              name: routesNames.SelectDialog
            })
          }
        })
    }

    // TODO: Smooth scroll to page bottom

    watch(() => route.params.id, newId => newId ? fetchCurrentDialog(newId as string) : false)
    fetchCurrentDialog(route.params.id as string)
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
