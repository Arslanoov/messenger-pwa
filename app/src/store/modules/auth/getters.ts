import { StateInterface, AuthFormStateInterface } from "./state"

export const GET_AUTH_TOKEN = "getAuthToken"
export const GET_AUTH_FORM = "getAuthForm"

export default {
  [GET_AUTH_TOKEN]: (state: StateInterface): string | null => `Bearer ${state.token}`,
  [GET_AUTH_FORM]: (state: StateInterface): AuthFormStateInterface | null => state.authForm
}
