import { StateInterface } from "./state"

export const START_SIDEBAR_OPENING = "START_SIDEBAR_OPENING"
export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR"
export const TOGGLE_ADD_DIALOG_MODAL = "TOGGLE_ADD_DIALOG_MODAL"

export default {
  [START_SIDEBAR_OPENING]: (state: StateInterface) => state.isStartedOpening = true,
  [TOGGLE_SIDEBAR]: (state: StateInterface) => {
    state.isOpened = !state.isOpened
    state.isStartedOpening = state.isOpened
  },
  [TOGGLE_ADD_DIALOG_MODAL]: (state: StateInterface) => state.isOpenedAddDialogModal = !state.isOpenedAddDialogModal,
}
