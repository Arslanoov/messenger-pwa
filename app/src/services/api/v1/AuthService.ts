import qs from "qs"
import axios from "axios"

export default class AuthService {
  login(username: string, password: string) {
    return axios.post("/token", qs.stringify({
      grant_type: "password",
      client_id: "oauth",
      client_secret: "secret",
      access_type: "offline",
      username,
      password
    }))
  }
}
