import { Store, useStore as baseUseStore } from "vuex"
import { key, StateInterface } from "@/store"

import mock from "@/store/mock"

export const useStore: () => Store<StateInterface> | typeof mock = () => {
  if (process.env.NODE_ENV === "test") {
    return mock
  }

  return baseUseStore(key)
}
