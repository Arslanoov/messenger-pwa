import { testAction } from "../../../helpers/testAction"

import state from "@/store/modules/auth/state"
import getters from "@/store/modules/auth/getters"

import { SET_AUTH_TOKEN, SET_REFRESH_TOKEN } from "@/store/modules/auth/mutations"
import { AUTHORIZE } from "@/store/modules/auth/actions"

const actionsInjector = require("inject-loader!@/store/modules/auth/actions.ts")

const actions = actionsInjector({})

describe("authorize action", () => {
  it("success fetch user", done => {
    testAction(
      actions.default[AUTHORIZE],
      {
        accessToken: "accessToken",
        refreshToken: "refreshToken"
      },
      state,
      getters,
      () => {},
      [
        { type: SET_AUTH_TOKEN, payload: "accessToken" },
        { type: SET_REFRESH_TOKEN, payload: "refreshToken" },
      ],
      done
    )
  })
})
