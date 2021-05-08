import { testAction } from "../../../helpers/testAction"

import state from "@/store/modules/profile/state"
import getters from "@/store/modules/profile/getters"

import { REMOVE_AVATAR } from "@/store/modules/profile/actions"

const actionsInjector = require("inject-loader!@/store/modules/profile/actions.ts")

const actions = actionsInjector({
  "@/services/api/v1/ProfileService": class {
    removeAvatar () {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            data: {}
          })
        }, 10)
      })
    }
  }
})

describe("profile remove avatar action", () => {
  it("remove avatar", done => {
    testAction(
      actions.default[REMOVE_AVATAR],
      null,
      state,
      getters,
      () => {},
      [],
      done
    )
  })
})
