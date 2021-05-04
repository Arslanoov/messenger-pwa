import { StateInterface } from "./state"

export const GET_AUTH_TOKEN = "getAuthToken"

export default {
  [GET_AUTH_TOKEN]: (state: StateInterface): string | null => state.token
}
