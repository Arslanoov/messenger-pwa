import { testAction } from "../../../helpers/testAction"

import state from "@/store/modules/profile/state"
import getters from "@/store/modules/profile/getters"

import { CHANGE_AVATAR } from "@/store/modules/profile/actions"

const actionsInjector = require("inject-loader!@/store/modules/profile/actions.ts")

const actions = actionsInjector({
  "@/services/api/v1/ProfileService": class {
    changeAvatar () {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            data: {
              url: "someUrl"
            }
          })
        }, 10)
      })
    }
  }
})

describe("profile change avatar action", () => {
  it("change avatar", done => {
    testAction(
      actions.default[CHANGE_AVATAR],
      {
        data: new FormData(),
        onProgressChange: () => {}
      },
      state,
      getters,
      () => {},
      [],
      done
    )
  })
})
