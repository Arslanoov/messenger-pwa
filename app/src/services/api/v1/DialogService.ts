import axios from "axios"

export default class DialogService {
  public getList(page = 1) {
    return axios.get(`/messenger/dialogs?page=${page}`)
  }

  public startDialog(partnerId: string) {
    return axios.post("/messenger/dialog/create", {
      with_author: partnerId
    })
  }

  public getMessages(dialogId: number, page = 1) {
    return axios.get(`/messenger/dialog/${dialogId}/messages?page=${page}`)
  }

  public sendMessage(dialogId: number, content: string) {
    return axios.post("/messenger/dialog/send-message", {
      dialog_id: dialogId,
      content
    })
  }
}
