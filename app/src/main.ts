import { createApp } from "vue"
import App from "@/App.vue"

import "@/registerServiceWorker"

import router from "@/router"
import { store } from "./store"

import "@/assets/styles/main.styl"

import "@/plugins/axios"

const app = createApp(App)

app.use(store)
app.use(router)

app.mount("#app")
