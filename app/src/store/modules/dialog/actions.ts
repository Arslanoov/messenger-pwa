import { ActionContext } from "vuex"

import { DialogInterface } from "@/types/dialog"

import { StateInterface as DialogStateInterface } from "./state"
import { StateInterface } from "@/store"

import { SET_DIALOG_LIST, SET_DIALOG_LIST_PAGE_SIZE } from "@/store/modules/dialog/mutations"
import { GET_DIALOGS_LIST_CURRENT_PAGE } from "@/store/modules/dialog/getters"

import DialogService from "@/services/api/v1/DialogService"
const service = new DialogService()

export const FETCH_DIALOGS = "FETCH_DIALOGS"

export default {
  [FETCH_DIALOGS]: ({
    commit,
    getters
  }: ActionContext<DialogStateInterface, StateInterface>): Promise<DialogInterface[] | string> => {
    return new Promise((resolve, reject) => {
      service
        .getList(getters[GET_DIALOGS_LIST_CURRENT_PAGE])
        .then(response => {
          commit(SET_DIALOG_LIST, response.data.items)
          commit(SET_DIALOG_LIST_PAGE_SIZE, response.data.perPage)
          resolve(response.data.items)
        })
        .catch(error => {
          if (error.response) {
            console.error(error)
            reject(error.response)
          }
          reject(error)
        })
    })
  }
}
