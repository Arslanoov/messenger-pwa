import { createApp } from "vue"
import App from "@/App.vue"

import "@/registerServiceWorker"

import router from "@/router"
import { store } from "./store"

const app = createApp(App)

app.use(store)
app.use(router)

import "@/assets/styles/main.styl"

app.mount("#app")
