import axios from "axios"

import plugins from "@/plugins/axios"
export const newAxios = plugins(axios.create())

export default class DialogService {
  public getList() {
    return axios.get("/messenger/dialogs")
  }

  public startDialog(partnerId: string) {
    return newAxios.post("/messenger/dialog/create", {
      with_author: partnerId
    })
  }

  public getMessages(dialogId: string, page = 1) {
    return newAxios.get(`/messenger/dialog/${dialogId}/messages?page=${page}`)
  }

  public sendMessage(dialogId: string, content: string) {
    return axios.post("/messenger/dialog/send-message", {
      dialog_id: dialogId,
      content
    })
  }

  public removeMessage(messageId: string) {
    return axios.delete("/messenger/message/remove", {
      data: {
        message_id: messageId
      }
    })
  }
}
