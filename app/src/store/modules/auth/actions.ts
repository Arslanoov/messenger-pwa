import axios from "axios"

import { ActionContext } from "vuex"

import { AuthFormStateInterface, SignUpFormStateInterface, StateInterface as AuthStateInterface } from "./state"
import { StateInterface } from "@/store"

import { isAuth } from "@/helpers/auth/isAuth"

import { UserInterface } from "@/types/user"

import {
  CLEAR_AUTH_FORM_ERROR,
  SET_AUTH_FORM_ERROR,
  SET_AUTH_TOKEN,
  CLEAR_SIGN_UP_FORM_VIOLATIONS,
  SET_SIGN_UP_FORM_VIOLATIONS,
  SET_CURRENT_USER,
  CLEAR_CURRENT_USER_INFO,
} from "@/store/modules/auth/mutations"
import {
  GET_AUTH_FORM,
  GET_SIGN_UP_FORM
} from "@/store/modules/auth/getters"

import AuthService from "@/services/api/v1/AuthService"
const service = new AuthService()

export const LOGIN = "login"
export const SIGN_UP = "signUp"
export const FETCH_USER = "fetchUser"
export const LOGOUT = "logout"

// TODO: Add token refresh

export default {
  [LOGIN]: ({ dispatch, commit, getters }: ActionContext<AuthStateInterface, StateInterface>): Promise<string> => {
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
          dispatch(FETCH_USER)
          resolve(token)
        })
        .catch(error => {
          if (error.response) {
            console.error(error)
            commit(SET_AUTH_FORM_ERROR, error.response.data.message || null)
            reject(error.response)
          }
          reject(error)
        })
    })
  },
  [SIGN_UP]: ({ commit, getters }: ActionContext<AuthStateInterface, StateInterface>): Promise<string | void> => {
    return new Promise((resolve, reject) => {
      commit(CLEAR_SIGN_UP_FORM_VIOLATIONS)

      const form: SignUpFormStateInterface = getters[GET_SIGN_UP_FORM]
      if (form.password !== form.repeatPassword) {
        commit(SET_SIGN_UP_FORM_VIOLATIONS, [
          {
            propertyPath: "Repeat Password",
            title: "Incorrect"
          }
        ])
        return
      }

      service
        .signUp(form.username, form.password)
        .then(() => resolve())
        .catch(error => {
          if (error.response) {
            console.error(error)
            commit(SET_SIGN_UP_FORM_VIOLATIONS, error.response.data.violations || [])
            reject(error.response)
          }
          reject(error)
        })
    })
  },
  [FETCH_USER]: ({
     commit
  }: ActionContext<AuthStateInterface, StateInterface>): Promise<UserInterface | string> | void => {
    if (!isAuth()) return

    return new Promise((resolve, reject) => {
      service
        .profile()
        .then(response => {
          const user: UserInterface = response.data
          commit(SET_CURRENT_USER, user)
          resolve(user)
        })
        .catch(error => {
          console.error(error)
          if (error.response) {
            reject(error.response.data.message)
          }
          reject(error)
        })
    })
  },
  [LOGOUT]: ({ commit }: ActionContext<AuthStateInterface, StateInterface>): void => {
      commit(CLEAR_CURRENT_USER_INFO)
      localStorage.removeItem("token")
      delete axios.defaults.headers.common.Authorization
  }
}
