import { StateInterface } from "./state"

import { DialogInterface } from "@/types/dialog"
import { MessageInterface } from "@/types/message"
import { UserSearchInterface } from "@/types/user"

export const SET_DIALOG_LIST = "SET_DIALOG_LIST"
export const ADD_DIALOG_LIST = "ADD_DIALOG_LIST"
export const ADD_DIALOG = "ADD_DIALOG"
export const SET_DIALOG_LIST_CURRENT_PAGE = "SET_DIALOG_LIST_CURRENT_PAGE"
export const SET_DIALOG_LIST_LATEST_PAGE_SIZE = "SET_DIALOG_LIST_LATEST_PAGE_SIZE"
export const SET_DIALOG_LIST_PAGE_SIZE = "SET_DIALOG_LIST_PAGE_SIZE"
export const CLEAR_DIALOGS_LIST_DATA = "CLEAR_DIALOGS_LIST_DATA"

export const SET_CURRENT_DIALOG = "SET_CURRENT_DIALOG"
export const SET_CURRENT_DIALOG_MESSAGES = "SET_CURRENT_DIALOG_MESSAGES"
export const ADD_CURRENT_DIALOG_MESSAGES = "ADD_CURRENT_DIALOG_MESSAGES"
export const SET_CURRENT_DIALOG_CURRENT_PAGE = "SET_CURRENT_DIALOG_CURRENT_PAGE"
export const SET_CURRENT_DIALOG_LATEST_PAGE_SIZE = "SET_CURRENT_DIALOG_LATEST_PAGE_SIZE"
export const CLEAR_CURRENT_DIALOG = "CLEAR_CURRENT_DIALOG"

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
  [ADD_DIALOG_LIST]: (state: StateInterface, dialogs: DialogInterface[]) => state.dialogs = state.dialogs.concat(dialogs),
  [ADD_DIALOG]: (state: StateInterface, dialog: DialogInterface) => state.dialogs.unshift(dialog),
  [SET_DIALOG_LIST_LATEST_PAGE_SIZE]: (state: StateInterface, size: number) => state.latestPageSize = size,
  [SET_DIALOG_LIST_CURRENT_PAGE]: (state: StateInterface, page: number) => {
    if (page >= 1) {
      state.pagination.currentPage = page
    }
  },
  [SET_DIALOG_LIST_PAGE_SIZE]: (state: StateInterface, size: number) => state.pagination.pageSize = size,
  [CLEAR_DIALOGS_LIST_DATA]: (state: StateInterface) => {
    state.dialogs = []
    state.pagination.currentPage = 1
    state.latestPageSize = null
  },
  [SET_CURRENT_DIALOG]: (state: StateInterface, uuid: string) => {
    const dialog = state.dialogs.find(item => item.uuid === uuid)
    if (dialog) {
      state.currentDialog = dialog
      state.currentDialogMessages = []
      state.currentDialogPagination = {
        pageSize: 20,
        currentPage: 1
      }
    }
  },
  [SET_CURRENT_DIALOG_MESSAGES]:
    (state: StateInterface, messages: MessageInterface[]) => state.currentDialogMessages = messages,
  [ADD_CURRENT_DIALOG_MESSAGES]:
    (state: StateInterface, messages: MessageInterface[]) => state.currentDialogMessages = state.currentDialogMessages.concat(messages),
  [SET_CURRENT_DIALOG_LATEST_PAGE_SIZE]:
    (state: StateInterface, size: number) => state.messagesLatestPageSize = size,
  [SET_CURRENT_DIALOG_CURRENT_PAGE]:
    (state: StateInterface, page: number) => state.currentDialogPagination.currentPage = page,
  [CLEAR_CURRENT_DIALOG]: (state: StateInterface) => {
    state.currentDialog = null
    state.currentDialogMessages = []
    state.currentDialogPagination.currentPage = 1
    state.messagesLatestPageSize = null
  },
  [ADD_CURRENT_DIALOG_MESSAGE]:
    (state: StateInterface, payload: { dialog: DialogInterface, message: MessageInterface }) => {
    if (state.currentDialog?.uuid !== payload.dialog?.uuid) return

    const dialogs: DialogInterface[] = []
      if (state.currentDialog) {
        state.currentDialogMessages.push(payload.message)
        dialogs.push(state.currentDialog)
      }

      const dialog: DialogInterface | null = state.dialogs.find(item => item.isSelected) || null
      if (dialog) {
        dialogs.push(dialog)
      }

      dialogs.forEach(dialog => {
        dialog.latestMessage = {
          date: payload.message.wroteAt,
          content: payload.message.content
        }

        if (payload.message.isMine) {
          dialog.sentByMe = {
            isSent: true,
            isRead: false
          }
        } else {
          dialog.sentByPartner = {
            isRead: true
          }
        }
      })
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
