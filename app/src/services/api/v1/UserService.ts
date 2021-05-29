import axios from "axios"

const newAxios = axios.create()
import plugins from "@/plugins/axios"
plugins(newAxios)

export default class UserService {
  public searchByUsername(username: string) {
    return axios.get(`/users/search/${username}`)
  }

  public findByUuid(uuid: string) {
    return newAxios.get(`/users/find${uuid ? "/" + uuid : ""}`)
  }
}
