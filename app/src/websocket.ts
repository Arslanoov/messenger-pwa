const ws = new WebSocket(process.env.VUE_APP_WS_URL as string)
import { store } from "@/store"

import { commitDialogModule } from "@/store/modules/dialog"
import {
  ADD_CURRENT_DIALOG_MESSAGE,
  MOVE_DIALOG_TO_THE_TOP,
  CHANGE_DIALOG_LATEST_MESSAGE
} from "@/store/modules/dialog/mutations"

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
    store.commit(commitDialogModule(ADD_CURRENT_DIALOG_MESSAGE), {
      message: data.message,
      dialog: data.dialog
    })
    store.commit(commitDialogModule(MOVE_DIALOG_TO_THE_TOP), data.dialog)
    store.commit(commitDialogModule(CHANGE_DIALOG_LATEST_MESSAGE), {
      message: data.message,
      dialog: data.dialog
    })
    playMessageSound()

    const messageContent = data.message.content
    notify({
      type: "success",
      title: data.dialog.partner.username,
      text: messageContent.length > 25 ? messageContent.substr(0, 25) + "..." : messageContent
    })
  }

  /*if (data.type === "new-message") {
    store.commit(commitDialogModule(READ_DIALOG), data.dialog)
  }*/
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
