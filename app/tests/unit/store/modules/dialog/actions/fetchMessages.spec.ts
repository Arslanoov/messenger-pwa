import { testAction } from "../../../helpers/testAction"

import state from "@/store/modules/dialog/state"
import getters from "@/store/modules/dialog/getters"

import {
  SET_CURRENT_DIALOG_CURRENT_PAGE,
  SET_CURRENT_DIALOG_MESSAGES
} from "@/store/modules/dialog/mutations"
import { FETCH_DIALOG_MESSAGES } from "@/store/modules/dialog/actions"

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

const message = {
  uuid: "uuid",
  isMine: true,
  wroteAt: "date",
  content: "content"
}

const list = [
  message,
  message,
  message
]

const perPage = 20

const actionsInjector = require("inject-loader!@/store/modules/dialog/actions.ts")

const actions = actionsInjector({
  "@/services/api/v1/DialogService": class {
    getMessages () {
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

describe("dialog fetch messages action", () => {
  it("fetch", done => {
    testAction(
      actions.default[FETCH_DIALOG_MESSAGES],
      null,
      {
        ...state,
        currentDialog: dialog
      },
      getters,
      () => {},
      [
        { type: SET_CURRENT_DIALOG_MESSAGES, payload: list },
        { type: SET_CURRENT_DIALOG_CURRENT_PAGE, payload: 20 }
      ],
      done
    )
  })
})
