import axios from "axios"

axios.defaults.baseURL = process.env.VUE_APP_API_URL

const token: string | null = localStorage.getItem("token")
if (token) {
  axios.defaults.headers.common.Authorization = localStorage.getItem("token")
}
