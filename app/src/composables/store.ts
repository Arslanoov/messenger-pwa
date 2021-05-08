import { Store, useStore as baseUseStore } from "vuex"
import { key, StateInterface } from "@/store"

import mock from "@/store/mock"

export const useStore: () => Store<StateInterface> = () => {
  /*
  * TODO: Remove, find way to inject store into shallow component vue app instance
  */
  if (process.env.NODE_ENV === "test") {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return mock as Store<StateInterface>
  }

  return baseUseStore(key)
}
