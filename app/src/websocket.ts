const isTest = process.env.NODE_ENV === "test"

const ws = isTest ? {} as WebSocket : new WebSocket(process.env.VUE_APP_WS_URL as string)
import { store } from "@/store"

import { commitDialogModule, dispatchDialogModule, getterDialogModule } from "@/store/modules/dialog"
import {
  ADD_CURRENT_DIALOG_MESSAGE,
  MOVE_DIALOG_TO_THE_TOP,
  CHANGE_DIALOG_LATEST_MESSAGE,
  CHANGE_DIALOG, REMOVE_CURRENT_DIALOG_MESSAGE
} from "@/store/modules/dialog/mutations"
import { READ_MESSAGE } from "@/store/modules/dialog/actions"
import { GET_CURRENT_DIALOG } from "@/store/modules/dialog/getters"

import { playMessageSound } from "@/helpers/sound"

import { DialogInterface } from "@/types/dialog"
import { MessageInterface } from "@/types/message"

import { notify } from "@kyvg/vue3-notification"

ws.onopen = () => {
  if (isTest) return

  const token = localStorage.getItem("token") as string
  if (token) {
    ws.send(JSON.stringify({
      type: "auth",
      token: token
    }))
  }
}

ws.onmessage = (e: MessageEvent) => {
  if (isTest) return

  const data = JSON.parse(e.data)

  if (data.type === "new-message") {
    const params = {
      message: data.message,
      dialog: data.dialog
    }
    store.commit(commitDialogModule(ADD_CURRENT_DIALOG_MESSAGE), params)
    store.commit(commitDialogModule(CHANGE_DIALOG_LATEST_MESSAGE), params)
    store.commit(commitDialogModule(MOVE_DIALOG_TO_THE_TOP), data.dialog)

    store.commit(commitDialogModule(CHANGE_DIALOG), {
      uuid: data.dialog.uuid,
      sentByMe: undefined,
      sentByPartner: {
        isRead: false
      }
    })

    const currentDialog = store.getters[getterDialogModule(GET_CURRENT_DIALOG)]
    if (currentDialog && currentDialog.uuid === data.dialog.uuid) {
      store.dispatch(dispatchDialogModule(READ_MESSAGE), {
        dialogId: data.dialog.uuid,
        messageId: data.message.uuid
      })

      store.commit(commitDialogModule(CHANGE_DIALOG), {
        uuid: data.dialog.uuid,
        sentByMe: undefined,
        sentByPartner: {
          isSent: true,
          isRead: true
        }
      })

      ws.send(JSON.stringify({
        type: "read-message",
        dialog: {
          ...data.dialog,
          partner: currentDialog.partner
        },
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
    store.commit(commitDialogModule(CHANGE_DIALOG),{
      uuid: data.dialog.uuid,
      sentByPartner: undefined,
      sentByMe: {
        isSent: true,
        isRead: true
      }
    })
  }

  if (data.type === "remove-message") {
    const currentDialog = store.getters[getterDialogModule(GET_CURRENT_DIALOG)]
    if (currentDialog && currentDialog.uuid === data.dialog.uuid) {
      store.commit(commitDialogModule(REMOVE_CURRENT_DIALOG_MESSAGE), data.message.uuid)
    }
  }
}

export const sendMessage = (dialog: DialogInterface, message: MessageInterface) => {
  if (isTest) return

  ws.send(JSON.stringify({
    type: "new-message",
    dialog,
    message
  }))

  store.commit(commitDialogModule(CHANGE_DIALOG), {
    uuid: dialog.uuid,
    sentByPartner: undefined,
    sentByMe: {
      isSent: true,
      isRead: false
    }
  })
}

export const readMessages = (dialog: DialogInterface) => {
  if (isTest) return

  const currentDialog = store.getters[getterDialogModule(GET_CURRENT_DIALOG)]

  ws.send(JSON.stringify({
    type: "read-messages",
    dialog: {
      ...dialog,
      partner: currentDialog.partner
    }
  }))

  store.commit(commitDialogModule(CHANGE_DIALOG), {
    uuid: dialog.uuid,
    sentByMe: undefined,
    sentByPartner: {
      isSent: true,
      isRead: true
    }
  })
}

export const removeMessage = (dialog: DialogInterface, message: MessageInterface) => {
  if (isTest) return

  ws.send(JSON.stringify({
    type: "remove-message",
    dialog,
    message
  }))
}
