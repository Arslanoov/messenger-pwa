export const loadView = (path: string) => {
  return () => import(
    /* webpackChunkName: "view-[request]" */
    `@/views/${path}.vue`
  )
}
