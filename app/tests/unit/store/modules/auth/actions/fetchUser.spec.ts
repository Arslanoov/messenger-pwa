import { testAction } from "../../../helpers/testAction"

import state from "@/store/modules/auth/state"
import getters from "@/store/modules/auth/getters"

import { SET_CURRENT_USER } from "@/store/modules/auth/mutations"
import { FETCH_USER } from "@/store/modules/auth/actions"

const user = {
  uuid: "uuid",
  username: "username",
  aboutMe: "about",
  avatar: "url",
  isOnline: true,
  messagesCount: 0
}

const actionsInjector = require("inject-loader!@/store/modules/auth/actions.ts")

const actions = actionsInjector({
  "@/services/api/v1/AuthService": class {
    profile () {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(user)
        }, 10)
      })
    }
  },
  "@/helpers/auth/isAuth": {
    isAuth: () => true
  }
})

describe("auth fetch user action", () => {
  it("success fetch user", done => {
    testAction(
      actions.default[FETCH_USER],
      null,
      state,
      getters,
      () => {},
      [
        { type: SET_CURRENT_USER }
      ],
      done
    )
  })
})
