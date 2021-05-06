import { StateInterface } from "./state"

export const START_SIDEBAR_OPENING = "START_SIDEBAR_OPENING"
export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR"

export default {
  [START_SIDEBAR_OPENING]: (state: StateInterface) => state.isStartedOpening = true,
  [TOGGLE_SIDEBAR]: (state: StateInterface) => {
    state.isOpened = !state.isOpened
    state.isStartedOpening = state.isOpened
  }
}
