import { StateInterface } from "./state"

import { UserInterface } from "@/types/user"
import { ViolationInterface } from "@/types/violation"

export const SET_AUTH_TOKEN = "SET_AUTH_TOKEN"
export const SET_CURRENT_USER = "SET_CURRENT_USER"
export const SET_AVATAR = "SET_AVATAR"
export const REMOVE_AVATAR = "REMOVE_AVATAR"
export const CLEAR_CURRENT_USER_INFO = "CLEAR_CURRENT_USER_INFO"

export const SET_AUTH_FORM_USERNAME = "SET_AUTH_FORM_USERNAME"
export const SET_AUTH_FORM_PASSWORD = "SET_AUTH_FORM_PASSWORD"
export const SET_AUTH_FORM_ERROR = "SET_AUTH_FORM_ERROR"
export const CLEAR_AUTH_FORM_ERROR = "CLEAR_AUTH_FORM_ERROR"

export const SET_SIGN_UP_FORM_USERNAME = "SET_SIGN_UP_FORM_USERNAME"
export const SET_SIGN_UP_FORM_PASSWORD = "SET_SIGN_UP_FORM_PASSWORD"
export const SET_SIGN_UP_FORM_REPEAT_PASSWORD = "SET_SIGN_UP_FORM_REPEAT_PASSWORD"
export const SET_SIGN_UP_FORM_VIOLATIONS = "SET_SIGN_UP_FORM_ERROR"
export const CLEAR_SIGN_UP_FORM_VIOLATIONS = "CLEAR_SIGN_UP_FORM_VIOLATIONS"

export default {
  [SET_AUTH_TOKEN]: (state: StateInterface, token: string) => state.token = token,
  [SET_CURRENT_USER]: (state: StateInterface, user: UserInterface) => state.user = user,
  [SET_AVATAR]: (state: StateInterface, avatar: string) => {
    const user = state.user as UserInterface
    if (user) {
      user.avatar = avatar
    }
  },
  [REMOVE_AVATAR]: (state: StateInterface) => {
    const user = state.user as UserInterface
    if (user?.avatar) {
      let avatar: string | null = user.avatar
      avatar = null
    }
  },
  [CLEAR_CURRENT_USER_INFO]: (state: StateInterface) => {
    state.token = null
    state.user = null
  },

  [SET_AUTH_FORM_USERNAME]: (state: StateInterface, username: string) => state.authForm.username = username,
  [SET_AUTH_FORM_PASSWORD]: (state: StateInterface, password: string) => state.authForm.password = password,
  [SET_AUTH_FORM_ERROR]: (state: StateInterface, error: string) => state.authForm.error = error,
  [CLEAR_AUTH_FORM_ERROR]: (state: StateInterface) => state.authForm.error = null,

  [SET_SIGN_UP_FORM_USERNAME]: (state: StateInterface, username: string) => state.signUpForm.username = username,
  [SET_SIGN_UP_FORM_PASSWORD]: (state: StateInterface, password: string) => state.signUpForm.password = password,
  [SET_SIGN_UP_FORM_REPEAT_PASSWORD]:
    (state: StateInterface, password: string) =>state.signUpForm.repeatPassword = password,
  [SET_SIGN_UP_FORM_VIOLATIONS]:
    (state: StateInterface, list: ViolationInterface[]) => state.signUpForm.violations = list,
  [CLEAR_SIGN_UP_FORM_VIOLATIONS]: (state: StateInterface) => state.signUpForm.violations = [],
}
