import { StateInterface } from "./state"

import { DialogInterface } from "@/types/dialog"
import { MessageInterface } from "@/types/message"
import { UserSearchInterface } from "@/types/user"

export const SET_DIALOG_LIST = "SET_DIALOG_LIST"
export const ADD_DIALOG = "ADD_DIALOG"
export const READ_DIALOG = "READ_DIALOG"
export const MOVE_DIALOG_TO_THE_TOP = "MOVE_DIALOG_TO_THE_TOP"
export const CLEAR_DIALOGS_LIST_DATA = "CLEAR_DIALOGS_LIST_DATA"

export const SET_CURRENT_DIALOG = "SET_CURRENT_DIALOG"
export const SET_CURRENT_DIALOG_MESSAGES = "SET_CURRENT_DIALOG_MESSAGES"
export const REMOVE_CURRENT_DIALOG_MESSAGE = "REMOVE_CURRENT_DIALOG_MESSAGE"
export const ADD_CURRENT_DIALOG_MESSAGES = "ADD_CURRENT_DIALOG_MESSAGES"
export const SET_CURRENT_DIALOG_CURRENT_PAGE = "SET_CURRENT_DIALOG_CURRENT_PAGE"
export const SET_CURRENT_DIALOG_LATEST_PAGE_SIZE = "SET_CURRENT_DIALOG_LATEST_PAGE_SIZE"
export const CLEAR_CURRENT_DIALOG = "CLEAR_CURRENT_DIALOG"
export const CHANGE_DIALOG_LATEST_MESSAGE = "CHANGE_DIALOG_LATEST_MESSAGE"
export const CHANGE_DIALOG = "CHANGE_DIALOG"

export const SET_SEND_FORM_CONTENT = "SET_SEND_FORM_CONTENT"
export const CLEAR_SEND_FORM = "CLEAR_SEND_FORM"
export const ADD_CURRENT_DIALOG_MESSAGE = "ADD_CURRENT_DIALOG_MESSAGE"

export const SET_USERS_SEARCH_QUERY = "SET_USERS_SEARCH_QUERY"
export const SET_USERS_SEARCH_RESULT = "SET_USERS_SEARCH_RESULT"
export const CLEAR_USERS_SEARCH_RESULT = "CLEAR_USERS_SEARCH_RESULT"
export const SET_USERS_SEARCH_ERROR = "SET_USERS_SEARCH_ERROR"
export const CLEAR_USERS_SEARCH_ERROR = "CLEAR_USERS_SEARCH_ERROR"

export default {
  [SET_DIALOG_LIST]: (state: StateInterface, dialogs: DialogInterface[]) => state.dialogs = dialogs,
  [ADD_DIALOG]: (state: StateInterface, dialog: DialogInterface) => state.dialogs.unshift(dialog),
  [READ_DIALOG]: (state: StateInterface, dialogUuid: string) => {
    state.dialogs = state.dialogs.filter(item => item.uuid === dialogUuid ? ({
      ...item,
      sentByPartner: {
        isRead: true
      }
    }) : item)
  },
  [MOVE_DIALOG_TO_THE_TOP]: (state: StateInterface, dialog: DialogInterface) => {
    state.dialogs.sort((a: DialogInterface, y: DialogInterface) => {
      return a.uuid == dialog.uuid ? -1 : y.uuid === dialog.uuid ? 1 : 0
    })
  },
  [CLEAR_DIALOGS_LIST_DATA]: (state: StateInterface) => {
    state.dialogs = []
  },
  [SET_CURRENT_DIALOG]: (state: StateInterface, uuid: string) => {
    const dialog = state.dialogs.find(item => item.uuid === uuid)
    if (dialog) {
      state.currentDialog = dialog
      state.currentDialogMessages = []
      state.currentDialogPagination.currentPage = 1
      state.messagesLatestPageSize = null
    }
  },
  [SET_CURRENT_DIALOG_MESSAGES]:
    (state: StateInterface, messages: MessageInterface[]) => state.currentDialogMessages = messages,
  [REMOVE_CURRENT_DIALOG_MESSAGE]: (state: StateInterface, messageId: string) => {
    const index = state.currentDialogMessages.findIndex(item => item.uuid === messageId)
    state.currentDialogMessages.splice(index, 1)
  },
  [ADD_CURRENT_DIALOG_MESSAGES]:
    (state: StateInterface, messages: MessageInterface[]) => {
      messages.forEach(message => state.currentDialogMessages.unshift(message))
    },
  [SET_CURRENT_DIALOG_LATEST_PAGE_SIZE]:
    (state: StateInterface, size: number) => state.messagesLatestPageSize = size,
  [SET_CURRENT_DIALOG_CURRENT_PAGE]:
    (state: StateInterface, page: number) => state.currentDialogPagination.currentPage = page,
  [CLEAR_CURRENT_DIALOG]: (state: StateInterface) => {
    state.currentDialogMessages = []
    state.currentDialogPagination.currentPage = 1
    state.messagesLatestPageSize = null
  },
  [CHANGE_DIALOG_LATEST_MESSAGE]: (state: StateInterface, payload: {
    dialog: DialogInterface,
    message: MessageInterface
  }) => {
    state.dialogs = state.dialogs.map(item => item.uuid === payload.dialog.uuid ? ({
      ...item,
      latestMessage: {
        content: payload.message.content,
        date: payload.message.wroteAt
      }
    }) : item)
  },
  [CHANGE_DIALOG]: (state: StateInterface, dialog: Partial<DialogInterface>) => {
    state.dialogs = state.dialogs.map(item => item.uuid === dialog.uuid ? ({
      ...item,
      ...dialog
    }) : item)
  },
  [ADD_CURRENT_DIALOG_MESSAGE]:
    (state: StateInterface, payload: { dialog: DialogInterface, message: MessageInterface }) => {
      if (state.currentDialog?.uuid !== payload.dialog?.uuid) return

      if (state.currentDialog) {
        state.currentDialogMessages.push(payload.message)
      }
    },
  [SET_SEND_FORM_CONTENT]:
    (state: StateInterface, content: string) => state.sendMessageForm.content = content,
  [CLEAR_SEND_FORM]:
    (state: StateInterface) => state.sendMessageForm.content = "",

  [SET_USERS_SEARCH_QUERY]:
    (state: StateInterface, query: string) => state.search.query = query,
  [SET_USERS_SEARCH_RESULT]:
    (state: StateInterface, result: UserSearchInterface) => state.search.result = result,
  [CLEAR_USERS_SEARCH_RESULT]:
    (state: StateInterface) => state.search.result = null,
  [SET_USERS_SEARCH_ERROR]:
    (state: StateInterface, error: string) => state.search.error = error,
  [CLEAR_USERS_SEARCH_ERROR]:
    (state: StateInterface) => state.search.error = null,
}
