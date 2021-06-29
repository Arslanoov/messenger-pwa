const ws = new WebSocket(process.env.VUE_APP_WS_URL as string)
import { store } from "@/store"

import { commitDialogModule } from "@/store/modules/dialog"
import {ADD_CURRENT_DIALOG_MESSAGE, MOVE_DIALOG_TO_THE_TOP} from "@/store/modules/dialog/mutations"

import { DialogInterface } from "@/types/dialog"
import { MessageInterface } from "@/types/message"

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
  }
}

export const sendMessage = (dialog: DialogInterface, message: MessageInterface) => {
  ws.send(JSON.stringify({
    type: "new-message",
    dialog,
    message
  }))
}
