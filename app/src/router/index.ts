import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

import { routesNames } from "@/router/names"

const loadView = (path: string) => {
  return () => import(
    /* webpackChunkName: "view-[request]" */
    `@/views/${path}.vue`
  )
}

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: routesNames.SelectDialog,
    component: loadView("messenger/SelectDialog"),
  },
  {
    path: "/dialog/:id",
    name: routesNames.Dialog,
    component: loadView("messenger/Dialog"),
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
