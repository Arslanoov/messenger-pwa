import { Store, useStore as baseUseStore } from "vuex"
import { key, StateInterface } from "@/store"

export const useStore: () => Store<StateInterface> = () => baseUseStore(key)
