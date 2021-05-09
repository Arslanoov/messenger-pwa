import { testAction } from "../../../helpers/testAction"

import state from "@/store/modules/auth/state"
import getters from "@/store/modules/auth/getters"

import { CLEAR_CURRENT_USER_INFO } from "@/store/modules/auth/mutations"
import { LOGOUT } from "@/store/modules/auth/actions"

const actionsInjector = require("inject-loader!@/store/modules/auth/actions.ts")

const actions = actionsInjector({})

describe("auth logout action", () => {
  it("login", done => {
    testAction(
      actions.default[LOGOUT],
      null,
      state,
      getters,
      () => {},
      [
        { type: CLEAR_CURRENT_USER_INFO }
      ],
      done
    )
  })
})
