import { StateInterface } from "./state"

import { DialogInterface } from "@/types/dialog"
import { MessageInterface } from "@/types/message"

export const SET_DIALOG_LIST = "SET_DIALOG_LIST"
export const SET_DIALOG_LIST_CURRENT_PAGE = "SET_DIALOG_LIST_CURRENT_PAGE"
export const SET_DIALOG_LIST_PAGE_SIZE = "SET_DIALOG_LIST_PAGE_SIZE"

export const SET_CURRENT_DIALOG = "SET_CURRENT_DIALOG"
export const SET_CURRENT_DIALOG_MESSAGES = "SET_CURRENT_DIALOG_MESSAGES"
export const SET_CURRENT_DIALOG_CURRENT_PAGE = "SET_CURRENT_DIALOG_CURRENT_PAGE"
export const SET_CURRENT_DIALOG_PAGE_SIZE = "SET_CURRENT_DIALOG_PAGE_SIZE"
export const CLEAR_CURRENT_DIALOG = "CLEAR_CURRENT_DIALOG"

export const SET_SEND_FORM_CONTENT = "SET_SEND_FORM_CONTENT"
export const CLEAR_SEND_FORM = "CLEAR_SEND_FORM"
export const ADD_CURRENT_DIALOG_MESSAGE = "ADD_CURRENT_DIALOG_MESSAGE"

export default {
  [SET_DIALOG_LIST]: (state: StateInterface, dialogs: DialogInterface[]) => state.dialogs = dialogs,
  [SET_DIALOG_LIST_CURRENT_PAGE]: (state: StateInterface, page: number) => {
    if (page >= 1) {
      state.pagination.currentPage = page
    }
  },
  [SET_DIALOG_LIST_PAGE_SIZE]: (state: StateInterface, size: number) => state.pagination.pageSize = size,
  [SET_CURRENT_DIALOG]: (state: StateInterface, uuid: string) => {
    const dialog = state.dialogs.find(item => item.uuid === uuid)
    if (dialog) {
      state.currentDialog = dialog
    }
  },
  [SET_CURRENT_DIALOG_MESSAGES]:
    (state: StateInterface, messages: MessageInterface[]) => state.currentDialogMessages = messages,
  [SET_CURRENT_DIALOG_CURRENT_PAGE]:
    (state: StateInterface, page: number) => state.currentDialogPagination.currentPage = page,
  [SET_CURRENT_DIALOG_PAGE_SIZE]:
    (state: StateInterface, size: number) => state.currentDialogPagination.pageSize = size,
  [CLEAR_CURRENT_DIALOG]: (state: StateInterface) => {
    state.currentDialog = null
    state.currentDialogMessages = []
    state.currentDialogPagination = {
      currentPage: 1,
      pageSize: 20
    }
  },
  [ADD_CURRENT_DIALOG_MESSAGE]:
    (state: StateInterface, message: MessageInterface) => state.currentDialogMessages.push(message),
  [SET_SEND_FORM_CONTENT]:
    (state: StateInterface, content: string) => state.sendMessageForm.content = content,
  [CLEAR_SEND_FORM]:
    (state: StateInterface) => state.sendMessageForm.content = ""
}