import { StateInterface } from "./state"

export const SET_AUTH_TOKEN = "SET_AUTH_TOKEN"

export const SET_AUTH_FORM_USERNAME = "SET_AUTH_FORM_USERNAME"
export const SET_AUTH_FORM_PASSWORD = "SET_AUTH_FORM_PASSWORD"
export const SET_AUTH_FORM_ERROR = "SET_AUTH_FORM_ERROR"
export const CLEAR_AUTH_FORM_ERROR = "CLEAR_AUTH_FORM_ERROR"

export const SET_SIGN_UP_FORM_USERNAME = "SET_SIGN_UP_FORM_USERNAME"
export const SET_SIGN_UP_FORM_PASSWORD = "SET_SIGN_UP_FORM_PASSWORD"
export const SET_SIGN_UP_FORM_REPEAT_PASSWORD = "SET_SIGN_UP_FORM_REPEAT_PASSWORD"
export const SET_SIGN_UP_FORM_ERROR = "SET_SIGN_UP_FORM_ERROR"
export const CLEAR_SIGN_UP_FORM_ERROR = "CLEAR_SIGN_UP_FORM_ERROR"

export default {
  [SET_AUTH_TOKEN]: (state: StateInterface, token: string) => state.token = token,

  [SET_AUTH_FORM_USERNAME]: (state: StateInterface, username: string) => state.authForm.username = username,
  [SET_AUTH_FORM_PASSWORD]: (state: StateInterface, password: string) => state.authForm.password = password,
  [SET_AUTH_FORM_ERROR]: (state: StateInterface, error: string) => state.authForm.error = error,
  [CLEAR_AUTH_FORM_ERROR]: (state: StateInterface) => state.authForm.error = null,

  [SET_SIGN_UP_FORM_USERNAME]: (state: StateInterface, username: string) => state.signUpForm.username = username,
  [SET_SIGN_UP_FORM_PASSWORD]: (state: StateInterface, password: string) => state.signUpForm.password = password,
  [SET_SIGN_UP_FORM_REPEAT_PASSWORD]: (state: StateInterface, password: string) => state.signUpForm.repeatPassword = password,
  [SET_SIGN_UP_FORM_ERROR]: (state: StateInterface, error: string) => state.signUpForm.error = error,
  [CLEAR_SIGN_UP_FORM_ERROR]: (state: StateInterface) => state.signUpForm.error = null,
}
