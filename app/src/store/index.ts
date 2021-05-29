import { InjectionKey } from "vue"
import { Store, createStore, createLogger } from "vuex"

import VuexPersistence from "vuex-persist"

import { StateInterface as AuthStateInterface } from "@/store/modules/auth/state"
import { StateInterface as SidebarStateInterface } from "@/store/modules/sidebar/state"
import { StateInterface as ProfileStateInterface } from "@/store/modules/profile/state"
import { StateInterface as DialogStateInterface } from "@/store/modules/dialog/state"

import auth from "./modules/auth"
import sidebar from "./modules/sidebar"
import profile from "./modules/profile"
import dialog from "./modules/dialog"

export interface StateInterface {
  auth: AuthStateInterface,
  sidebar: SidebarStateInterface,
  profile: ProfileStateInterface,
  dialog: DialogStateInterface
}

const persistencePlugin = new VuexPersistence<StateInterface>({
  storage: window.localStorage
})

export const key: InjectionKey<Store<StateInterface>> = Symbol()

export const store = createStore<StateInterface>({
  modules: {
    auth,
    sidebar,
    profile,
    dialog
  },
  plugins: process.env.NODE_ENV === "development" ? [
    createLogger(),
    persistencePlugin.plugin
  ] : [],
  strict: process.env.NODE_ENV !== "production"
})
