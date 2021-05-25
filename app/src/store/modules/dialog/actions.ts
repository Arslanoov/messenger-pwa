import { ActionContext } from "vuex"

import { DialogInterface } from "@/types/dialog"
import { MessageInterface } from "@/types/message"
import { UserSearchInterface } from "@/types/user"

import { StateInterface as DialogStateInterface } from "./state"
import { StateInterface } from "@/store"

import {
  ADD_CURRENT_DIALOG_MESSAGE,
  CLEAR_SEND_FORM,
  CLEAR_USERS_SEARCH_ERROR,
  CLEAR_USERS_SEARCH_RESULT,
  SET_CURRENT_DIALOG_CURRENT_PAGE,
  SET_CURRENT_DIALOG_MESSAGES,
  SET_DIALOG_LIST,
  SET_DIALOG_LIST_PAGE_SIZE,
  SET_USERS_SEARCH_ERROR,
  SET_USERS_SEARCH_RESULT
} from "@/store/modules/dialog/mutations"
import {
  GET_DIALOGS_LIST_CURRENT_PAGE,
  GET_CURRENT_DIALOG,
  GET_SEND_FORM,
  GET_USERS_SEARCH_QUERY
} from "@/store/modules/dialog/getters"

import DialogService from "@/services/api/v1/DialogService"
const service = new DialogService()

import UserService from "@/services/api/v1/UserService"
const userService = new UserService()

export const SEARCH_USER = "searchUser"
export const FETCH_DIALOGS = "fetchDialogs"
export const FETCH_DIALOG_MESSAGES = "fetchDialogMessages"
export const SEND_MESSAGE = "sendMessage"

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
  },
  [SEND_MESSAGE]: ({
    commit,
    getters
  }: ActionContext<DialogStateInterface, StateInterface>): Promise<MessageInterface[] | string> => {
    return new Promise((resolve, reject) => {
      service
        .sendMessage(
          getters[GET_CURRENT_DIALOG].uuid,
          getters[GET_SEND_FORM].content
        )
        .then(response => {
          commit(ADD_CURRENT_DIALOG_MESSAGE, response.data)
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
}
