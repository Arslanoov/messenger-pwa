import { StateInterface } from "./state"

export const SET_CHANGE_FORM_ABOUT = "SET_CHANGE_FORM_ABOUT"

export default {
  [SET_CHANGE_FORM_ABOUT]: (state: StateInterface, about: string) => state.changeForm.about = about,
}
