import { testAction } from "../../../helpers/testAction"

import state from "@/store/modules/auth/state"
import getters from "@/store/modules/auth/getters"

import { CLEAR_SIGN_UP_FORM_VIOLATIONS } from "@/store/modules/auth/mutations"
import { SIGN_UP } from "@/store/modules/auth/actions"

const actionsInjector = require("inject-loader!@/store/modules/auth/actions.ts")

const actions = actionsInjector({
  "@/services/api/v1/AuthService": class {
    signUp () {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({})
        }, 10)
      })
    }
  }
})

describe("auth sign up action", () => {
  it("success sign up", done => {
    testAction(
      actions.default[SIGN_UP],
      null,
      {
        ...state,
        signUpForm: {
          password: "pass",
          repeatPassword: "pass"
        }
      },
      getters,
      () => {},
      [
        { type: CLEAR_SIGN_UP_FORM_VIOLATIONS }
      ],
      done
    )
  })
})
