import { DialogInterface } from "@/types/dialog"
import { PaginationInterface } from "@/types/pagination"
import { MessageInterface } from "@/types/message"

export interface StateInterface {
  dialogs: DialogInterface[],
  pagination: PaginationInterface,
  currentDialog: DialogInterface | null,
  currentDialogMessages: MessageInterface[],
  currentDialogPagination: PaginationInterface
}

const state: StateInterface = {
  dialogs: [],
  pagination: {
    currentPage: 1,
    pageSize: 20
  },
  currentDialog: null,
  currentDialogMessages: [],
  currentDialogPagination: {
    currentPage: 1,
    pageSize: 20
  }
}

export default state
