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

import AutocompleteInput from "@arslanoov/vue-autocomplete-input"
import "@arslanoov/vue-autocomplete-input/dist/vue-autocomplete-input.esm.css"
app.use(AutocompleteInput)

import "@/plugins/axios"

import "@/assets/styles/main.styl"

app.mount("#app")
