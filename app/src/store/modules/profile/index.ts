// TODO: Add tests

import state from "./state"
import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"

export const PROFILE_MODULE_PREFIX = "profile/"

export const commitProfileModule = (mutationName: string): string => PROFILE_MODULE_PREFIX + mutationName
export const dispatchProfileModule = (actionName: string): string => PROFILE_MODULE_PREFIX + actionName
export const getterProfileModule = (getterName: string): string => PROFILE_MODULE_PREFIX + getterName

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
