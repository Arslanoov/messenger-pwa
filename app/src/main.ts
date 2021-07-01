import { createApp } from "vue"
import App from "@/App.vue"

export const app = createApp(App)

import "@/registerServiceWorker"

import router from "@/router"
app.use(router)

import { store, key } from "@/store"
app.use(store, key)

import VueFinalModal from "vue-final-modal"
app.use(VueFinalModal())

/* TODO: Remove? */
import VueDOMPurifyHTML from "vue-dompurify-html"
app.use(VueDOMPurifyHTML)

import Notifications from "@kyvg/vue3-notification"
app.use(Notifications)

import axios from "axios"
import plugins from "@/plugins/axios"
import interceptors from "@/plugins/axios/interceptors"
interceptors(plugins(axios))

require("./websocket")

import "@/assets/styles/main.styl"

app.mount("#app")
