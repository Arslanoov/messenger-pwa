import { InjectionKey } from "vue"
import { Store, createStore, createLogger } from "vuex"

import VuexPersistence from "vuex-persist"

import { StateInterface as AuthStateInterface } from "@/store/modules/auth/state"
import { StateInterface as SidebarStateInterface } from "@/store/modules/sidebar/state"

import auth from "./modules/auth"
import sidebar from "./modules/sidebar"

export interface StateInterface {
  auth: AuthStateInterface,
  sidebar: SidebarStateInterface
}

const persistencePlugin = new VuexPersistence<StateInterface>({
  storage: window.localStorage
})

export const key: InjectionKey<Store<StateInterface>> = Symbol()

export const store = createStore<StateInterface>({
  modules: {
    auth,
    sidebar
  },
  plugins: [
    createLogger(),
    persistencePlugin.plugin
  ]
})
