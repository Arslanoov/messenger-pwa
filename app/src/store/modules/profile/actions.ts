import { ActionContext } from "vuex"

import { ChangeFormStateInterface, StateInterface as ProfileStateInterface } from "./state"
import { StateInterface } from "@/store"

import { GET_CHANGE_FORM } from "@/store/modules/profile/getters"

import ProfileService from "@/services/api/v1/ProfileService"
const service = new ProfileService()

export const CHANGE_INFO = "changeInfo"
export const CHANGE_AVATAR = "changeAvatar"
export const REMOVE_AVATAR = "removeAvatar"

export default {
  [CHANGE_INFO]: ({ getters }: ActionContext<ProfileStateInterface, StateInterface>): Promise<string | void> => {
    return new Promise((resolve, reject) => {
      const form: ChangeFormStateInterface = getters[GET_CHANGE_FORM]
      service
        .changeAbout(form.about)
        .then(() => resolve())
        .catch(error => {
          if (error.response) {
            console.error(error)
            reject(error.response)
          }
          reject(error)
        })
    })
  },
  [CHANGE_AVATAR]: (
    context: ActionContext<ProfileStateInterface, StateInterface>,
    payload: {
      data: FormData,
      // eslint-disable-next-line no-unused-vars
      onProgressChange: (e: ProgressEvent) => void
    }
  ): Promise<string | void> => {
    return new Promise((resolve, reject) => {
      service
        .changeAvatar(payload.data, payload.onProgressChange)
        .then(response => resolve(response.data.url))
        .catch(error => {
          if (error.response) {
            console.error(error)
            reject(error.response)
          }
          reject(error)
        })
    })
  },
  [REMOVE_AVATAR]: (): Promise<string | void> => {
    return new Promise((resolve, reject) => {
      service
        .removeAvatar()
        .then(() => resolve())
        .catch(error => {
          if (error.response) {
            console.error(error)
            reject(error.response)
          }
          reject(error)
        })
    })
  }
}
