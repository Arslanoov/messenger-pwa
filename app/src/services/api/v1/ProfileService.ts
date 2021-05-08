import axios from "axios"

export default class ProfileService {
  public changeAbout(about: string) {
    return axios.patch("/profile/change/about", {
      about
    })
  }

  // eslint-disable-next-line no-unused-vars
  public changeAvatar(data: FormData, onUploadProgress: (e: ProgressEvent) => void = () => {}) {
    return axios.post("/profile/avatar/upload", data, {
      onUploadProgress
    })
  }

  public removeAvatar() {
    return axios.delete("/profile/avatar/remove")
  }
}
