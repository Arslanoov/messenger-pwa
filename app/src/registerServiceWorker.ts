import { register } from "register-service-worker"

import { notify } from "@kyvg/vue3-notification"

if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    updated() {
      notify({
        type: "warn",
        text: "New content is available; please refresh."
      })
    },
    offline() {
      notify({
        type: "warn",
        text: "No internet connection found. App is running in offline mode."
      })
    }
  })
}
