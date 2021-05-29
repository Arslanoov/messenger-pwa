import { testAction } from "../../../helpers/testAction"

import state from "@/store/modules/dialog/state"
import getters from "@/store/modules/dialog/getters"

import {
  ADD_DIALOG,
  CLEAR_USERS_SEARCH_ERROR
} from "@/store/modules/dialog/mutations"
import { START_DIALOG } from "@/store/modules/dialog/actions"

const actionsInjector = require("inject-loader!@/store/modules/dialog/actions.ts")

const dialog = {
  uuid: "uuid",
  isSelected: true,
  partner: {
    uuid: "uuid",
    username: "username",
    aboutMe: "aboutMe",
    isOnline: true,
    avatar: "url"
  },
  sentByPartner: {
    isRead: true
  },
  latestMessage: {
    content: "content",
    date: "date"
  }
}

const actions = actionsInjector({
  "@/services/api/v1/DialogService": class {
    startDialog () {
      return new Promise(resolve => {
        setTimeout(() => resolve({
          data: dialog
        }), 10)
      })
    }
  }
})

describe("dialog start dialog action", () => {
  it("fetch", done => {
    testAction(
      actions.default[START_DIALOG],
      null,
      state,
      getters,
      () => {},
      [
        { type: CLEAR_USERS_SEARCH_ERROR },
        { type: ADD_DIALOG, payload: dialog },
      ],
      done
    )
  })
})
