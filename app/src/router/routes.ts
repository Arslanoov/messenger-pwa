import { RouteRecordRaw } from "vue-router"

import { routesNames } from "@/router/names"
import { loadView } from "@/router/load"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: routesNames.SelectDialog,
    component: loadView("messenger/SelectDialog"),
    meta: {
      layout: "main",
      requiresAuth: true
    }
  },
  {
    path: "/dialog/:id",
    name: routesNames.Dialog,
    component: loadView("messenger/Dialog"),
    meta: {
      layout: "main",
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: routesNames.Login,
    component: loadView("auth/Login"),
    meta: {
      layout: "auth",
      requiresAuth: false,
      requiresNoAuth: true
    }
  },
  {
    path: "/sign-up",
    name: routesNames.SignUp,
    component: loadView("auth/SignUp"),
    meta: {
      layout: "auth",
      requiresAuth: false,
      requiresNoAuth: true
    }
  }
]

export default routes
