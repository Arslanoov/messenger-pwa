import { DialogInterface } from "@/types/dialog"
import { PaginationInterface } from "@/types/pagination"
import { MessageInterface } from "@/types/message"
import { UserSearchInterface } from "@/types/user"

export interface SendMessageFormStateInterface {
  content: string
}

export interface StateInterface {
  dialogs: DialogInterface[],
  pagination: PaginationInterface,
  currentDialog: DialogInterface | null,
  currentDialogMessages: MessageInterface[],
  currentDialogPagination: PaginationInterface,
  sendMessageForm: SendMessageFormStateInterface,
  search: {
    query: string,
    result: UserSearchInterface | null,
    error: string | null
  }
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
  },
  sendMessageForm: {
    content: ""
  },
  search: {
    query: "",
    result: null,
    error: null
  }
}

export default state
