import axios from "axios"

export default class UserService {
  public searchByUsername(username: string) {
    return axios.get(`/users/search/${username}`)
  }

  public findByUuid(uuid: string) {
    return axios.get(`/users/find/${uuid}`)
  }
}
