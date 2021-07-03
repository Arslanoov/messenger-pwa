import { testAction } from "../../../helpers/testAction"

import state from "@/store/modules/dialog/state"
import getters from "@/store/modules/dialog/getters"

import {
  ADD_CURRENT_DIALOG_MESSAGE, CHANGE_DIALOG_LATEST_MESSAGE,
  CLEAR_SEND_FORM, MOVE_DIALOG_TO_THE_TOP
} from "@/store/modules/dialog/mutations"
import { SEND_MESSAGE } from "@/store/modules/dialog/actions"

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

const actionsInjector = require("inject-loader!@/store/modules/dialog/actions.ts")

const actions = actionsInjector({
  "@/services/api/v1/DialogService": class {
    sendMessage () {
      return new Promise(resolve => {
        setTimeout(() => resolve({
          data: message
        }), 10)
      })
    }
  }
})

describe("dialog send message action", () => {
  it("fetch", done => {
    testAction(
      actions.default[SEND_MESSAGE],
      null,
      {
        ...state,
        currentDialog: dialog,
        sendForm: {
          content: "some content"
        }
      },
      getters,
      () => {},
      [
        { type: ADD_CURRENT_DIALOG_MESSAGE },
        { type: CHANGE_DIALOG_LATEST_MESSAGE },
        { type: MOVE_DIALOG_TO_THE_TOP },
        { type: CLEAR_SEND_FORM }
      ],
      done
    )
  })
})
