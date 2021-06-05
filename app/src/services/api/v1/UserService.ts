import axios from "axios"

import plugins from "@/plugins/axios"
export const newAxios = plugins(axios.create())

export default class UserService {
  public searchByUsername(username: string) {
    return axios.get(`/users/search/${username}`)
  }

  public findByUuid(uuid: string) {
    return newAxios.get(`/users/find${uuid ? "/" + uuid : ""}`)
  }
}
