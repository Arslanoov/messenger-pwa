import { StateInterface } from "./state"

import { DialogInterface } from "@/types/dialog"
import { MessageInterface } from "@/types/message"

export const GET_DIALOGS_LIST = "getDialogsList"
export const GET_DIALOGS_LIST_CURRENT_PAGE = "getDialogsListCurrentPage"
export const GET_DIALOGS_LIST_PAGE_SIZE = "getDialogsListPageSize"
export const GET_CURRENT_DIALOG = "getCurrentDialog"
export const GET_CURRENT_DIALOG_MESSAGES = "getCurrentDialogMessages"
export const GET_CURRENT_DIALOG_CURRENT_PAGE = "getCurrentDialogCurrentPage"
export const GET_CURRENT_DIALOG_PAGE_SIZE = "getCurrentDialogPageSize"

export default {
  [GET_DIALOGS_LIST]: (state: StateInterface): DialogInterface[] => state.dialogs,
  [GET_DIALOGS_LIST_CURRENT_PAGE]: (state: StateInterface): number => state.pagination.currentPage,
  [GET_DIALOGS_LIST_PAGE_SIZE]: (state: StateInterface): number => state.pagination.pageSize,
  [GET_CURRENT_DIALOG]: (state: StateInterface): DialogInterface | null => state.currentDialog,
  [GET_CURRENT_DIALOG_MESSAGES]: (state: StateInterface): MessageInterface[] => state.currentDialogMessages,
  [GET_CURRENT_DIALOG_CURRENT_PAGE]: (state: StateInterface): number => state.currentDialogPagination.currentPage,
  [GET_CURRENT_DIALOG_PAGE_SIZE]: (state: StateInterface): number => state.currentDialogPagination.pageSize,
}
