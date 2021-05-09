import { testAction } from "../../../helpers/testAction"

import state from "@/store/modules/auth/state"
import getters from "@/store/modules/auth/getters"

import { CLEAR_AUTH_FORM_ERROR } from "@/store/modules/auth/mutations"
import { LOGIN } from "@/store/modules/auth/actions"

const actionsInjector = require("inject-loader!@/store/modules/auth/actions.ts")

const actions = actionsInjector({
  "@/services/api/v1/AuthService": class {
    login () {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            data: {
              "token_type": "Bearer",
              "expires_in": 3600,
              "access_token": "access_token",
              "refresh_token": "token"
            }
          })
        }, 10)
      })
    }
  }
})

describe("auth login action", () => {
  it("login", done => {
    testAction(
      actions.default[LOGIN],
      null,
      state,
      getters,
      () => {},
      [
        { type: CLEAR_AUTH_FORM_ERROR }
      ],
      done
    )
  })
})
