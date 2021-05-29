import axios from "axios"

export default class ProfileService {
  public changeAbout(about: string) {
    return axios.patch("/profile/change/about", {
      about
    })
  }

  public changeAvatar(data: FormData, onUploadProgress: (e: ProgressEvent) => void = () => {}) {
    return axios.post("/profile/avatar/upload", data, {
      onUploadProgress
    })
  }

  public removeAvatar() {
    return axios.delete("/profile/avatar/remove")
  }
}
