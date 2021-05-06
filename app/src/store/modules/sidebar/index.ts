import state from "./state"
import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"

export const SIDEBAR_MODULE_PREFIX = "sidebar/"

export const commitSidebarModule = (mutationName: string): string => SIDEBAR_MODULE_PREFIX + mutationName
export const getterSidebarModule = (getterName: string): string => SIDEBAR_MODULE_PREFIX + getterName

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
