import axios from "axios"

export default class UserService {
  public searchByUsername(username: string) {
    return axios.get(`/users/search/${username}`)
  }
}
