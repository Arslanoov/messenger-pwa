import { testAction } from "../../../helpers/testAction"

import state from "@/store/modules/profile/state"
import getters from "@/store/modules/profile/getters"

import { CHANGE_INFO } from "@/store/modules/profile/actions"

const actionsInjector = require("inject-loader!@/store/modules/profile/actions.ts")

const actions = actionsInjector({
  "@/services/api/v1/ProfileService": class {
    changeAbout () {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({})
        }, 10)
      })
    }
  }
})

describe("profile change info action", () => {
  it("change info", done => {
    testAction(
      actions.default[CHANGE_INFO],
      null,
      state,
      getters,
      () => {},
      [],
      done
    )
  })
})
