import { assert, expect } from "chai"

import { store } from "@/store"

import { DIALOG_MODULE_PREFIX } from "@/store/modules/dialog"
import {
  ADD_CURRENT_DIALOG_MESSAGE,
  CLEAR_CURRENT_DIALOG,
  CLEAR_SEND_FORM,
  SET_CURRENT_DIALOG,
  SET_CURRENT_DIALOG_CURRENT_PAGE,
  SET_CURRENT_DIALOG_MESSAGES,
  SET_CURRENT_DIALOG_PAGE_SIZE,
  SET_DIALOG_LIST,
  SET_DIALOG_LIST_CURRENT_PAGE,
  SET_DIALOG_LIST_PAGE_SIZE, SET_SEND_FORM_CONTENT
} from "@/store/modules/dialog/mutations"

const dialog = {
  uuid: "uuid",
  isSelected: true,
  partner: {
    uuid: "uuid",
    username: "username",
    aboutMe: "about me",
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

describe("dialog main mutations", () => {
  it("sets dialog list", () => {
    const list = [
      dialog,
      dialog
    ]

    assert.deepEqual(store.state.dialog.dialogs, [])

    store.commit(DIALOG_MODULE_PREFIX + SET_DIALOG_LIST, list)

    assert.deepEqual(store.state.dialog.dialogs, list)
  })

  it("sets dialog list current page", () => {
    expect(store.state.dialog.pagination.currentPage).to.equal(1)

    store.commit(DIALOG_MODULE_PREFIX + SET_DIALOG_LIST_CURRENT_PAGE, 3)

    expect(store.state.dialog.pagination.currentPage).to.equal(3)

    store.commit(DIALOG_MODULE_PREFIX + SET_DIALOG_LIST_CURRENT_PAGE, -2)

    expect(store.state.dialog.pagination.currentPage).to.equal(3)
  })

  it("sets dialog list page size", () => {
    expect(store.state.dialog.pagination.pageSize).to.equal(20)

    store.commit(DIALOG_MODULE_PREFIX + SET_DIALOG_LIST_PAGE_SIZE, 30)

    expect(store.state.dialog.pagination.pageSize).to.equal(30)

    store.commit(DIALOG_MODULE_PREFIX + SET_DIALOG_LIST_PAGE_SIZE, 40)

    expect(store.state.dialog.pagination.pageSize).to.equal(40)
  })

  it("sets current dialog", () => {
    expect(store.state.dialog.currentDialog).to.equal(null)

    store.commit(DIALOG_MODULE_PREFIX + SET_CURRENT_DIALOG, dialog.uuid)

    assert.deepEqual(store.state.dialog.currentDialog, dialog)
  })

  it("sets current dialog messages", () => {
    const list = [
      message,
      message,
      message
    ]

    assert.deepEqual(store.state.dialog.currentDialogMessages, [])

    store.commit(DIALOG_MODULE_PREFIX + SET_CURRENT_DIALOG_MESSAGES, list)

    assert.deepEqual(store.state.dialog.currentDialogMessages, list)
  })

  it("sets current dialog page", () => {
    expect(store.state.dialog.currentDialogPagination.currentPage).to.equal(1)

    store.commit(DIALOG_MODULE_PREFIX + SET_CURRENT_DIALOG_CURRENT_PAGE, 2)

    expect(store.state.dialog.currentDialogPagination.currentPage).to.equal(2)

    store.commit(DIALOG_MODULE_PREFIX + SET_CURRENT_DIALOG_CURRENT_PAGE, 10)

    expect(store.state.dialog.currentDialogPagination.currentPage).to.equal(10)
  })

  it("sets current dialog page size", () => {
    expect(store.state.dialog.currentDialogPagination.pageSize).to.equal(20)

    store.commit(DIALOG_MODULE_PREFIX + SET_CURRENT_DIALOG_CURRENT_PAGE, 25)

    expect(store.state.dialog.currentDialogPagination.currentPage).to.equal(25)

    store.commit(DIALOG_MODULE_PREFIX + SET_CURRENT_DIALOG_CURRENT_PAGE, 15)

    expect(store.state.dialog.currentDialogPagination.currentPage).to.equal(15)
  })

  it("clears current dialog", () => {
    store.commit(DIALOG_MODULE_PREFIX + CLEAR_CURRENT_DIALOG)

    expect(store.state.dialog.currentDialog).to.equal(null)
    assert.deepEqual(store.state.dialog.currentDialogMessages, [])
    assert.deepEqual(store.state.dialog.currentDialogPagination, {
      currentPage: 1,
      pageSize: 20
    })
  })

  it("adds current dialog message", () => {
    assert.deepEqual(store.state.dialog.currentDialogMessages, [])

    store.commit(DIALOG_MODULE_PREFIX + ADD_CURRENT_DIALOG_MESSAGE, message)

    assert.deepEqual(store.state.dialog.currentDialogMessages, [ message ])

    store.commit(DIALOG_MODULE_PREFIX + ADD_CURRENT_DIALOG_MESSAGE, message)

    assert.deepEqual(store.state.dialog.currentDialogMessages, [ message, message ])
  })
})

describe("dialog form mutations", () => {
  it("send message form", () => {
    assert.deepEqual(store.state.dialog.sendMessageForm, {
      content: ""
    })

    const newContent = "Some new content"

    store.commit(DIALOG_MODULE_PREFIX + SET_SEND_FORM_CONTENT, newContent)

    assert.deepEqual(store.state.dialog.sendMessageForm, {
      content: newContent
    })

    store.commit(DIALOG_MODULE_PREFIX + CLEAR_SEND_FORM)

    assert.deepEqual(store.state.dialog.sendMessageForm, {
      content: ""
    })
  })
})
