import { InjectionKey } from "vue"
import { Store, createStore, createLogger } from "vuex"

import VuexPersistence from "vuex-persist"

import { StateInterface as AuthStateInterface } from "@/store/modules/auth/state"
import auth from "./modules/auth"

export interface StateInterface {
  auth: AuthStateInterface
}

const persistencePlugin = new VuexPersistence<StateInterface>({
  storage: window.localStorage
})

export const key: InjectionKey<Store<StateInterface>> = Symbol()

export const store = createStore<StateInterface>({
  modules: {
    auth
  },
  plugins: [
    createLogger(),
    persistencePlugin.plugin
  ]
})
