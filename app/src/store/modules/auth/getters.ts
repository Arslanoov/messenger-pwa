import { StateInterface, AuthFormStateInterface, SignUpFormStateInterface } from "./state"

import { UserInterface } from "@/types/user"

export const GET_AUTH_TOKEN = "getAuthToken"
export const GET_AUTH_FORM = "getAuthForm"
export const GET_SIGN_UP_FORM = "getSignUpForm"
export const GET_CURRENT_USER = "getCurrentUser"

export default {
  [GET_AUTH_TOKEN]: (state: StateInterface): string | null => `Bearer ${state.token}`,
  [GET_AUTH_FORM]: (state: StateInterface): AuthFormStateInterface | null => state.authForm,
  [GET_SIGN_UP_FORM]: (state: StateInterface): SignUpFormStateInterface | null => state.signUpForm,
  [GET_CURRENT_USER]: (state: StateInterface): UserInterface | null => state.user,
}
