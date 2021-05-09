import { testAction } from "../../../helpers/testAction"

import state from "@/store/modules/dialog/state"
import getters from "@/store/modules/dialog/getters"

import { SET_DIALOG_LIST, SET_DIALOG_LIST_PAGE_SIZE } from "@/store/modules/dialog/mutations"
import { FETCH_DIALOGS } from "@/store/modules/dialog/actions"

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

const list = [
  dialog,
  dialog
]

const perPage = 20

const actionsInjector = require("inject-loader!@/store/modules/dialog/actions.ts")

const actions = actionsInjector({
  "@/services/api/v1/DialogService": class {
    getList () {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            data: {
              items: list,
              perPage
            }
          })
        }, 10)
      })
    }
  }
})

describe("dialog fetch action", () => {
  it("fetch", done => {
    testAction(
      actions.default[FETCH_DIALOGS],
      null,
      state,
      getters,
      () => {},
      [
        { type: SET_DIALOG_LIST, payload: list },
        { type: SET_DIALOG_LIST_PAGE_SIZE, payload: 20 }
      ],
      done
    )
  })
})
