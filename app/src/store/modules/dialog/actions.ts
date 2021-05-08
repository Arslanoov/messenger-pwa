import { ActionContext } from "vuex"

import { DialogInterface } from "@/types/dialog"
import { MessageInterface } from "@/types/message"

import { StateInterface as DialogStateInterface } from "./state"
import { StateInterface } from "@/store"

import {
  SET_CURRENT_DIALOG_CURRENT_PAGE,
  SET_CURRENT_DIALOG_MESSAGES,
  SET_DIALOG_LIST,
  SET_DIALOG_LIST_PAGE_SIZE
} from "@/store/modules/dialog/mutations"
import {
  GET_DIALOGS_LIST_CURRENT_PAGE,
  GET_CURRENT_DIALOG
} from "@/store/modules/dialog/getters"

import DialogService from "@/services/api/v1/DialogService"
const service = new DialogService()

export const FETCH_DIALOGS = "FETCH_DIALOGS"
export const FETCH_DIALOG_MESSAGES = "FETCH_DIALOG_MESSAGES"

export default {
  [FETCH_DIALOGS]: ({
    dispatch,
    commit,
    getters
  }: ActionContext<DialogStateInterface, StateInterface>): Promise<DialogInterface[] | string> => {
    return new Promise((resolve, reject) => {
      service
        .getList(getters[GET_DIALOGS_LIST_CURRENT_PAGE])
        .then(response => {
          commit(SET_DIALOG_LIST, response.data.items)
          commit(SET_DIALOG_LIST_PAGE_SIZE, response.data.perPage)
          dispatch(FETCH_DIALOG_MESSAGES)
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
  },
  [FETCH_DIALOG_MESSAGES]: ({
    commit,
    getters
  }: ActionContext<DialogStateInterface, StateInterface>): Promise<MessageInterface[] | string> => {
    return new Promise((resolve, reject) => {
      const currentDialog = getters[GET_CURRENT_DIALOG]

      service
        .getMessages(currentDialog.uuid, getters[GET_DIALOGS_LIST_CURRENT_PAGE])
        .then(response => {
          commit(SET_CURRENT_DIALOG_MESSAGES, response.data.items)
          commit(SET_CURRENT_DIALOG_CURRENT_PAGE, response.data.perPage)
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
