import router from "@/router/router"

import { routesNames } from "@/router/names"

import { isNotAuth } from "@/helpers/auth/isAuth"

router.beforeEach((to, from, next): void => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  requiresAuth && isNotAuth() ? next({
    name: routesNames.Login
  }) : next()
})
