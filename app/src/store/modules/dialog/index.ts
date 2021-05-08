import state from "./state"
import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"

export const DIALOG_MODULE_PREFIX = "dialog/"

export const commitDialogModule = (mutationName: string): string => DIALOG_MODULE_PREFIX + mutationName
export const dispatchDialogModule = (actionName: string): string => DIALOG_MODULE_PREFIX + actionName
export const getterDialogModule = (getterName: string): string => DIALOG_MODULE_PREFIX + getterName

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
