import { Store, useStore as baseUseStore } from "vuex"
import { key, StateInterface } from "@/store"

import mock from "@/store/mock"

export const useStore: () => Store<StateInterface> | typeof mock = () => {
  /*
  * TODO: Remove, find way to inject store into shallow component vue app instance
  */
  if (process.env.NODE_ENV === "test") {
    return mock
  }

  return baseUseStore(key)
}
