import { ActionContext } from "vuex"

import { AuthFormStateInterface, StateInterface as AuthStateInterface } from "./state"
import { StateInterface } from "@/store"

import { CLEAR_AUTH_FORM_ERROR, SET_AUTH_FORM_ERROR, SET_AUTH_TOKEN } from "@/store/modules/auth/mutations"
import { GET_AUTH_FORM } from "@/store/modules/auth/getters"

import AuthService from "@/services/api/v1/AuthService"
const service = new AuthService()

export const LOGIN = "login"

export default {
  [LOGIN]: ({ commit, getters }: ActionContext<AuthStateInterface, StateInterface>): Promise<string> => {
    return new Promise((resolve, reject) => {
      commit(CLEAR_AUTH_FORM_ERROR)

      const form: AuthFormStateInterface = getters[GET_AUTH_FORM]
      service
        .login(form.username, form.password)
        .then(response => {
          commit(SET_AUTH_TOKEN, response.data.token)
          resolve(response.data.token)
        })
        .catch(error => {
          if (error.response) {
            console.log(error)
            commit(SET_AUTH_FORM_ERROR, error.response.data.message || null)
            reject(error.response)
          }
          reject(error)
        })
    })
  }
}
