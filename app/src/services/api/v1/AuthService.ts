import qs from "qs"
import axios from "axios"

export default class AuthService {
  public login(username: string, password: string) {
    return axios.post("/token", qs.stringify({
      grant_type: "password",
      client_id: "oauth",
      client_secret: "secret",
      access_type: "offline",
      username,
      password
    }))
  }

  public refreshToken(token: string) {
    return axios.post("/token", qs.stringify({
      grant_type: "refresh_token",
      client_id: "oauth",
      client_secret: "secret",
      access_type: "offline",
      refresh_token: token
    }))
  }

  public signUp(username: string, password: string) {
    return axios.post("/auth/sign-up", {
      username,
      password
    })
  }

  public profile() {
    return axios.get("/profile")
  }
}
