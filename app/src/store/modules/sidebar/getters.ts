import { StateInterface } from "./state"

export const GET_IS_SIDEBAR_STARTED_OPENING = "GET_IS_SIDEBAR_STARTED_OPENING"
export const GET_IS_SIDEBAR_OPENED = "GET_IS_SIDEBAR_OPENED"
export const GET_IS_ADD_DIALOG_MODAL_OPENED = "GET_IS_ADD_DIALOG_MODAL_OPENED"

export default {
  [GET_IS_SIDEBAR_STARTED_OPENING]: (state: StateInterface): boolean => state.isStartedOpening,
  [GET_IS_SIDEBAR_OPENED]: (state: StateInterface): boolean => state.isOpened,
  [GET_IS_ADD_DIALOG_MODAL_OPENED]: (state: StateInterface): boolean => state.isOpenedAddDialogModal,
}
