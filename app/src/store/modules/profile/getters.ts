import { StateInterface, ChangeFormStateInterface } from "./state"

export const GET_CHANGE_FORM = "getChangeForm"

export default {
  [GET_CHANGE_FORM]: (state: StateInterface): ChangeFormStateInterface => state.changeForm
}
