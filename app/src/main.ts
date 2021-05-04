import { createApp } from "vue"
import App from "@/App.vue"

const app = createApp(App)

import "@/registerServiceWorker"

import router from "@/router"
app.use(router)

import { store, key } from "@/store"
app.use(store, key)

import "@/plugins/axios"

import "@/assets/styles/main.styl"

app.mount("#app")
