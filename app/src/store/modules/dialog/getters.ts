import { SendMessageFormStateInterface, StateInterface } from "./state"

import { DialogInterface } from "@/types/dialog"
import { MessageInterface } from "@/types/message"
import { UserSearchInterface } from "@/types/user"

export const GET_DIALOGS_LIST = "getDialogsList"

export const GET_CURRENT_DIALOG = "getCurrentDialog"
export const GET_CURRENT_DIALOG_MESSAGES = "getCurrentDialogMessages"
export const GET_CURRENT_DIALOG_CURRENT_PAGE = "getCurrentDialogCurrentPage"
export const GET_CURRENT_DIALOG_PAGE_SIZE = "getCurrentDialogPageSize"
export const GET_CURRENT_DIALOG_LATEST_PAGE_SIZE = "getCurrentDialogLatestPageSize"

export const GET_SEND_FORM = "getSendForm"

export const GET_USERS_SEARCH_QUERY = "getUsersSearchQuery"
export const GET_USERS_SEARCH_RESULT = "getUsersSearchResult"
export const GET_USERS_SEARCH_ERROR = "getUsersSearchError"

export default {
  [GET_DIALOGS_LIST]: (state: StateInterface): DialogInterface[] => state.dialogs,

  [GET_CURRENT_DIALOG]: (state: StateInterface): DialogInterface | null => state.currentDialog,
  [GET_CURRENT_DIALOG_MESSAGES]: (state: StateInterface): MessageInterface[] => state.currentDialogMessages,
  [GET_CURRENT_DIALOG_CURRENT_PAGE]: (state: StateInterface): number => state.currentDialogPagination.currentPage,
  [GET_CURRENT_DIALOG_PAGE_SIZE]: (state: StateInterface): number => state.currentDialogPagination.pageSize,
  [GET_CURRENT_DIALOG_LATEST_PAGE_SIZE]: (state: StateInterface): number | null => state.messagesLatestPageSize,

  [GET_SEND_FORM]: (state: StateInterface): SendMessageFormStateInterface => state.sendMessageForm,

  [GET_USERS_SEARCH_QUERY]: (state: StateInterface): string => state.search.query,
  [GET_USERS_SEARCH_RESULT]: (state: StateInterface): UserSearchInterface | null => state.search.result,
  [GET_USERS_SEARCH_ERROR]: (state: StateInterface): string | null => state.search.error,
}
