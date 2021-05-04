import { InjectionKey } from "vue"
import { Store, createStore, createLogger } from "vuex"

import { StateInterface as AuthStateInterface } from "@/store/modules/auth/state"
import auth from "./modules/auth"

export interface StateInterface {
  auth: AuthStateInterface
}

export const key: InjectionKey<Store<StateInterface>> = Symbol()

export const store = createStore<StateInterface>({
  modules: {
    auth
  },
  plugins: [
    createLogger()
  ]
})
