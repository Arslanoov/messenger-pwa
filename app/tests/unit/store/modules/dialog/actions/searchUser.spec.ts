import { testAction } from "../../../helpers/testAction"

import state from "@/store/modules/dialog/state"
import getters from "@/store/modules/dialog/getters"

import {
  CLEAR_USERS_SEARCH_ERROR,
  CLEAR_USERS_SEARCH_RESULT,
  SET_USERS_SEARCH_RESULT
} from "@/store/modules/dialog/mutations"
import { SEARCH_USER } from "@/store/modules/dialog/actions"

const actionsInjector = require("inject-loader!@/store/modules/dialog/actions.ts")

const searchUser = {
  uuid: "uuid",
  username: "username",
  avatar: "url"
}

const actions = actionsInjector({
  "@/services/api/v1/UserService": class {
    findByUuid () {
      return new Promise(resolve => {
        setTimeout(() => resolve({
          data: searchUser
        }), 10)
      })
    }
  }
})

describe("dialog search user action", () => {
  it("fetch", done => {
    testAction(
      actions.default[SEARCH_USER],
      null,
      state,
      getters,
      () => {},
      [
        { type: CLEAR_USERS_SEARCH_RESULT },
        { type: CLEAR_USERS_SEARCH_ERROR },
        { type: SET_USERS_SEARCH_RESULT, payload: searchUser },
      ],
      done
    )
  })
})
