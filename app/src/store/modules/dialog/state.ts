import { DialogInterface } from "@/types/dialog"
import { PaginationInterface } from "@/types/pagination"
import { MessageInterface } from "@/types/message"
import { UserSearchInterface } from "@/types/user"

export interface SendMessageFormStateInterface {
  content: string
}

export interface StateInterface {
  dialogs: DialogInterface[],
  latestPageSize: number | null,
  pagination: PaginationInterface,
  currentDialog: DialogInterface | null,
  currentDialogMessages: MessageInterface[],
  messagesLatestPageSize: number | null,
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
  latestPageSize: null,
  pagination: {
    currentPage: 1,
    pageSize: 4
  },
  currentDialog: null,
  currentDialogMessages: [],
  messagesLatestPageSize: null,
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
