import { AxiosInstance } from "axios"

export default (axios: AxiosInstance): AxiosInstance => {
  axios.defaults.baseURL = process.env.VUE_APP_API_URL

  const token: string | null = localStorage.getItem("token")
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("token")}`
  }

  return axios
}
