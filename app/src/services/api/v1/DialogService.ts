import axios from "axios"

export default class DialogService {
  public getList(page = 1) {
    return axios.get(`/messenger/dialogs?page=${page}`)
  }

  public getMessages(dialogId: number, page = 1) {
    return axios.get(`/messenger/dialog/${dialogId}/messages?page=${page}`)
  }
}
