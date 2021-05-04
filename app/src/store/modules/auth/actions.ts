import { ActionContext } from "vuex"

import { StateInterface as AuthStateInterface } from "./state"
import { StateInterface } from "@/store"

import { SET_AUTH_TOKEN } from "@/store/modules/auth/mutations"

export const LOGIN = "login"

export default {
  [LOGIN]: ({ commit }: ActionContext<AuthStateInterface, StateInterface>): void => {
    commit(SET_AUTH_TOKEN, "token")
  }
}
