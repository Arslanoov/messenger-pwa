import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import SelectDialog from "@/views/messenger/SelectDialog.vue";
import Dialog from "@/views/messenger/Dialog.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "SelectDialog",
    component: SelectDialog,
  },
  {
    path: "/dialog/:id",
    name: "Dialog",
    component: Dialog,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
