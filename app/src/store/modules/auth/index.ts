import state from "./state"
import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"

export const AUTH_MODULE_PREFIX = "auth/"

export const commitAuthModal = (mutationName: string): string => AUTH_MODULE_PREFIX + mutationName
export const dispatchAuthModal = (actionName: string): string => AUTH_MODULE_PREFIX + actionName

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
