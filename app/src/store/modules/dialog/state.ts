import { DialogInterface } from "@/types/dialog"
import { PaginationInterface } from "@/types/pagination"

export interface StateInterface {
  dialogs: DialogInterface[],
  currentDialog: DialogInterface | null,
  pagination: PaginationInterface
}

const state: StateInterface = {
  dialogs: [],
  currentDialog: null,
  pagination: {
    currentPage: 1,
    pageSize: 20
  }
}

export default state
