import axios from "axios"

import { ActionContext } from "vuex"

import { AuthFormStateInterface, SignUpFormStateInterface, StateInterface as AuthStateInterface } from "./state"
import { StateInterface } from "@/store"

import {
  CLEAR_AUTH_FORM_ERROR,
  SET_AUTH_FORM_ERROR,
  SET_AUTH_TOKEN,
  SET_SIGN_UP_FORM_ERROR,
  CLEAR_SIGN_UP_FORM_ERROR,
} from "@/store/modules/auth/mutations"
import { GET_AUTH_FORM, GET_SIGN_UP_FORM } from "@/store/modules/auth/getters"

import AuthService from "@/services/api/v1/AuthService"
const service = new AuthService()

export const LOGIN = "login"
export const SIGN_UP = "SIGN_UP"

export default {
  [LOGIN]: ({ commit, getters }: ActionContext<AuthStateInterface, StateInterface>): Promise<string> => {
    return new Promise((resolve, reject) => {
      commit(CLEAR_AUTH_FORM_ERROR)

      const form: AuthFormStateInterface = getters[GET_AUTH_FORM]
      service
        .login(form.username, form.password)
        .then(response => {
          const token = response.data.access_token
          commit(SET_AUTH_TOKEN, token)
          localStorage.setItem("token", token)
          axios.defaults.headers.common.Authorization = token
          resolve(token)
        })
        .catch(error => {
          if (error.response) {
            console.log(error)
            // TODO: Change to violations
            commit(SET_AUTH_FORM_ERROR, error.response.data.message || error.response.data.detail || null)
            reject(error.response)
          }
          reject(error)
        })
    })
  },
  [SIGN_UP]: ({ commit, getters }: ActionContext<AuthStateInterface, StateInterface>): Promise<string | void> => {
    return new Promise((resolve, reject) => {
      commit(CLEAR_SIGN_UP_FORM_ERROR)

      const form: SignUpFormStateInterface = getters[GET_SIGN_UP_FORM]
      if (form.password !== form.repeatPassword) {
        commit(SET_SIGN_UP_FORM_ERROR, "Incorrect repeat password")
        return
      }

      service
        .signUp(form.username, form.password)
        .then(() => resolve())
        .catch(error => {
          if (error.response) {
            console.log(error)
            // TODO: Change to violations
            commit(SET_SIGN_UP_FORM_ERROR, error.response.data.message || error.response.data.detail || null)
            reject(error.response)
          }
          reject(error)
        })
    })
  }
}
