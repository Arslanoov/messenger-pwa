import { AxiosInstance } from "axios"

import router from "@/router"
import { routesNames } from "@/router/names"

import { store } from "@/store"
import { dispatchAuthModule } from "@/store/modules/auth"

import { REFRESH_TOKEN, LOGOUT } from "@/store/modules/auth/actions"

export default (axios: AxiosInstance): AxiosInstance => {
  axios.interceptors.response.use(response => response, error => {
    if (error.response?.config?.url === "/token") return

    if (401 === error.response?.status) {
      store.dispatch(dispatchAuthModule(REFRESH_TOKEN))
        .catch(() => {
          store.dispatch(dispatchAuthModule(LOGOUT))
            .then(() => router.push({
              name: routesNames.Login
            }))
        })
    }

    if (404 === error.response?.status) {
      router.push({
        name: routesNames.NotFound
      })
    }

    return Promise.reject(error)
  })

  return axios
}
