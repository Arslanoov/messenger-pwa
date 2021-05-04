import { StateInterface } from "./state"

export const SET_AUTH_TOKEN = "SET_AUTH_TOKEN"

export default {
  [SET_AUTH_TOKEN]: (state: StateInterface, token: string) => state.token = token
}
