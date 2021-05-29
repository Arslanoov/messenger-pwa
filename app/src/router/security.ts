import router from "@/router/router"
import { routesNames } from "@/router/names"

import { isAuth, isNotAuth } from "@/helpers/auth/isAuth"

router.beforeEach((to, from, next): void => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && isNotAuth()) {
    next({
      name: routesNames.Login
    })
  }

  const requiresNoAuth = to.matched.some(record => record.meta.requiresNoAuth)
  if (requiresNoAuth && isAuth()) {
    next({
      name: routesNames.SelectDialog
    })
  }

  next()
})
