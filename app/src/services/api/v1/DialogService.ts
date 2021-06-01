import axios from "axios"

const newAxios = axios.create()
import plugins from "@/plugins/axios"
plugins(newAxios)

export default class DialogService {
  public getList(page = 1) {
    return axios.get(`/messenger/dialogs?page=${page}`)
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
}
