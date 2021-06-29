import { ActionContext } from "vuex"

import { DialogInterface } from "@/types/dialog"
import { MessageInterface } from "@/types/message"
import { UserSearchInterface } from "@/types/user"

import { StateInterface as DialogStateInterface } from "./state"
import { StateInterface } from "@/store"

import {
  ADD_CURRENT_DIALOG_MESSAGE,
  ADD_CURRENT_DIALOG_MESSAGES,
  ADD_DIALOG,
  CLEAR_SEND_FORM,
  CLEAR_USERS_SEARCH_ERROR,
  CLEAR_USERS_SEARCH_RESULT,
  MOVE_DIALOG_TO_THE_TOP,
  SET_CURRENT_DIALOG_LATEST_PAGE_SIZE,
  SET_CURRENT_DIALOG_MESSAGES,
  SET_DIALOG_LIST,
  SET_USERS_SEARCH_ERROR,
  SET_USERS_SEARCH_RESULT
} from "@/store/modules/dialog/mutations"
import {
  GET_CURRENT_DIALOG,
  GET_SEND_FORM,
  GET_USERS_SEARCH_QUERY,
  GET_USERS_SEARCH_RESULT,
  GET_CURRENT_DIALOG_CURRENT_PAGE
} from "@/store/modules/dialog/getters"

import DialogService from "@/services/api/v1/DialogService"
const service = new DialogService()

import UserService from "@/services/api/v1/UserService"
const userService = new UserService()

export const SEARCH_USER = "searchUser"
export const FETCH_DIALOGS = "fetchDialogs"
export const FETCH_DIALOG_MESSAGES = "fetchDialogMessages"
export const SEND_MESSAGE = "sendMessage"
export const START_DIALOG = "startDialog"

export default {
  [SEARCH_USER]: ({
    commit,
    getters
  }: ActionContext<DialogStateInterface, StateInterface>): Promise<UserSearchInterface[]> => {
    commit(CLEAR_USERS_SEARCH_RESULT)
    commit(CLEAR_USERS_SEARCH_ERROR)

    return new Promise((resolve, reject) => {
      userService
        .findByUuid(getters[GET_USERS_SEARCH_QUERY])
        .then(response => {
          commit(SET_USERS_SEARCH_RESULT, response.data)
          resolve(response.data)
        })
        .catch(error => {
          if (error.response) {
            console.error(error)
            commit(SET_USERS_SEARCH_ERROR, error.response.data.message)
            reject(error.response)
          }
          reject(error)
        })
    })
  },
  [FETCH_DIALOGS]: ({ commit }: ActionContext<DialogStateInterface, StateInterface>): Promise<DialogInterface[]> => {
    return new Promise((resolve, reject) => {
      service
        .getList()
        .then(response => {
          commit(SET_DIALOG_LIST, response.data.items)
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
      const page: number = getters[GET_CURRENT_DIALOG_CURRENT_PAGE]
      const currentDialog: DialogInterface = getters[GET_CURRENT_DIALOG]

      service
        .getMessages(currentDialog.uuid, page)
        .then(response => {
          commit(page === 1 ? SET_CURRENT_DIALOG_MESSAGES : ADD_CURRENT_DIALOG_MESSAGES, response.data.items)
          commit(SET_CURRENT_DIALOG_LATEST_PAGE_SIZE, response.data.items.length)
          resolve(response.data.items)
        })
        .catch(error => {
          if (error.response) {
            console.error(error)
            reject(error)
          }
          reject(error)
        })
    })
  },
  [SEND_MESSAGE]: ({
    commit,
    getters
  }: ActionContext<DialogStateInterface, StateInterface>): Promise<MessageInterface> => {
    return new Promise((resolve, reject) => {
      const currentDialog: DialogInterface = getters[GET_CURRENT_DIALOG]
      service
        .sendMessage(
          currentDialog.uuid,
          getters[GET_SEND_FORM].content
        )
        .then(response => {
          commit(ADD_CURRENT_DIALOG_MESSAGE, {
            message: response.data,
            dialog: currentDialog
          })
          commit(MOVE_DIALOG_TO_THE_TOP, currentDialog)
          commit(CLEAR_SEND_FORM)
          resolve(response.data)
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
  [START_DIALOG]: ({
      commit,
      getters
    }: ActionContext<DialogStateInterface, StateInterface>
  ): Promise<MessageInterface[] | string> => {
    return new Promise((resolve, reject) => {
      const searchResult: UserSearchInterface | null = getters[GET_USERS_SEARCH_RESULT]
      if (!searchResult) {
        reject()
      }

      commit(CLEAR_USERS_SEARCH_ERROR)

      service
        .startDialog((searchResult as UserSearchInterface).uuid)
        .then(response => {
          commit(ADD_DIALOG, response.data)
          resolve(response.data.uuid)
        })
        .catch(error => {
          if (error.response) {
            console.error(error)
            commit(SET_USERS_SEARCH_ERROR, error.response.data.message)
            reject(error.response)
          }
          reject(error)
        })
    })
  },
}
