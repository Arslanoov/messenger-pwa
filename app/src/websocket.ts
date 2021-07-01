const ws = new WebSocket(process.env.VUE_APP_WS_URL as string)
import { store } from "@/store"

import {commitDialogModule, dispatchDialogModule, getterDialogModule} from "@/store/modules/dialog"
import {
  ADD_CURRENT_DIALOG_MESSAGE,
  MOVE_DIALOG_TO_THE_TOP,
  CHANGE_DIALOG_LATEST_MESSAGE,
  CHANGE_DIALOG
} from "@/store/modules/dialog/mutations"
import { READ_MESSAGE } from "@/store/modules/dialog/actions"
import { GET_CURRENT_DIALOG } from "@/store/modules/dialog/getters"

import { playMessageSound } from "@/helpers/sound"

import { DialogInterface } from "@/types/dialog"
import { MessageInterface } from "@/types/message"

import { notify } from "@kyvg/vue3-notification"

ws.onopen = () => {
  const token = localStorage.getItem("token") as string
  if (token) {
    ws.send(JSON.stringify({
      type: "auth",
      token: token
    }))
  }
}

ws.onmessage = (e: MessageEvent) => {
  const data = JSON.parse(e.data)

  if (data.type === "new-message") {
    const params = {
      message: data.message,
      dialog: data.dialog
    }
    store.commit(commitDialogModule(ADD_CURRENT_DIALOG_MESSAGE), params)
    store.commit(commitDialogModule(CHANGE_DIALOG_LATEST_MESSAGE), params)
    store.commit(commitDialogModule(MOVE_DIALOG_TO_THE_TOP), data.dialog)

    const currentDialog = store.getters[getterDialogModule(GET_CURRENT_DIALOG)]
    if (currentDialog?.uuid === data.dialog.uuid) {
      store.dispatch(dispatchDialogModule(READ_MESSAGE), {
        dialogId: data.dialog.uuid,
        messageId: data.message.uuid
      })

      ws.send(JSON.stringify({
        type: "read-message",
        dialog: data.dialog,
        message: data.message
      }))
    }

    playMessageSound()

    const messageContent = data.message.content
    notify({
      type: "success",
      title: data.dialog.partner.username,
      text: messageContent.length > 25 ? messageContent.substr(0, 25) + "..." : messageContent
    })
  }

  if (data.type === "read-message" || data.type === "read-messages") {
    store.commit(CHANGE_DIALOG, {
      dialog: {
        uuid: data.dialog.uuid,
        sentByPartner: undefined,
        sentByMe: {
          isSent: true,
          isRead: true
        }
      }
    })
  }
}

export const sendMessage = (dialog: DialogInterface, message: MessageInterface) => {
  ws.send(JSON.stringify({
    type: "new-message",
    dialog,
    message
  }))
}

export const readMessages = (dialog: DialogInterface) => {
  ws.send(JSON.stringify({
    type: "read-messages",
    dialog
  }))
}
