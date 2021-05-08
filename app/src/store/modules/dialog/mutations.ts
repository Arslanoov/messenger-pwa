import { StateInterface } from "./state"

import { DialogInterface } from "@/types/dialog"

export const SET_DIALOG_LIST = "SET_DIALOG_LIST"
export const SET_DIALOG_LIST_CURRENT_PAGE = "SET_DIALOG_LIST_CURRENT_PAGE"
export const SET_DIALOG_LIST_PAGE_SIZE = "SET_DIALOG_LIST_PAGE_SIZE"
export const SET_CURRENT_DIALOG = "SET_CURRENT_DIALOG"
export const CLEAR_CURRENT_DIALOG = "CLEAR_CURRENT_DIALOG"

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
  [CLEAR_CURRENT_DIALOG]: (state: StateInterface) => state.currentDialog = null,
}
