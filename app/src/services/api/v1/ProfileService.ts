import axios from "axios"

export default class ProfileService {
  public changeAbout(about: string) {
    return axios.patch("/profile/change/about", {
      about
    })
  }
}
