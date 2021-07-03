import { assert, expect } from "chai"

import { store } from "@/store"

import { DIALOG_MODULE_PREFIX } from "@/store/modules/dialog"
import {
  CLEAR_CURRENT_DIALOG,
  CLEAR_SEND_FORM,
  CLEAR_USERS_SEARCH_ERROR,
  CLEAR_USERS_SEARCH_RESULT,
  SET_CURRENT_DIALOG,
  SET_CURRENT_DIALOG_CURRENT_PAGE,
  SET_CURRENT_DIALOG_MESSAGES,
  SET_DIALOG_LIST,
  SET_SEND_FORM_CONTENT,
  SET_USERS_SEARCH_ERROR,
  SET_USERS_SEARCH_QUERY,
  SET_USERS_SEARCH_RESULT
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

    assert.deepEqual(store.state.dialog.currentDialogMessages, [])
    assert.deepEqual(store.state.dialog.currentDialogPagination, {
      currentPage: 1,
      pageSize: 20
    })
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

describe("dialog form search", () => {
  it("sets search query", () => {
    expect(store.state.dialog.search.query).to.equal("")

    const query = "query"

    store.commit(DIALOG_MODULE_PREFIX + SET_USERS_SEARCH_QUERY, query)
    expect(store.state.dialog.search.query).to.equal(query)
  })

  it("sets search result", () => {
    expect(store.state.dialog.search.result).to.equal(null)

    const result = "result"

    store.commit(DIALOG_MODULE_PREFIX + SET_USERS_SEARCH_RESULT, result)
    expect(store.state.dialog.search.result).to.equal(result)
  })

  it("clears search result", () => {
    expect(store.state.dialog.search.result).to.not.equal(null)

    store.commit(DIALOG_MODULE_PREFIX + CLEAR_USERS_SEARCH_RESULT)

    expect(store.state.dialog.search.result).to.equal(null)
  })

  it("sets search error", () => {
    expect(store.state.dialog.search.error).to.equal(null)

    const error = "error"

    store.commit(DIALOG_MODULE_PREFIX + SET_USERS_SEARCH_ERROR, error)
    expect(store.state.dialog.search.error).to.equal(error)
  })

  it("clears search error", () => {
    expect(store.state.dialog.search.error).to.not.equal(null)

    store.commit(DIALOG_MODULE_PREFIX + CLEAR_USERS_SEARCH_ERROR)

    expect(store.state.dialog.search.error).to.equal(null)
  })
})
