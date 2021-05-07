import axios from "axios"

export default class ProfileService {
  public changeAbout(about: string) {
    return axios.patch("/profile/change/about", {
      about
    })
  }

  public changeAvatar(data: FormData, onProgressChange: (e: ProgressEvent) => void = () => {}): Promise<void> {
    return new Promise(((resolve, reject) => {
      axios
        .post("/profile/avatar/upload", data, {
          onUploadProgress: onProgressChange
        })
        .then(() => resolve())
        .catch(error => reject(error))
    }))
  }

  public removeAvatar() {
    return axios.delete("/profile/avatar/remove")
  }
}
