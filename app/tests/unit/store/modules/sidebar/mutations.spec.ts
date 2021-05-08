import { expect } from "chai"

import { store } from "@/store"

import { SIDEBAR_MODULE_PREFIX } from "@/store/modules/sidebar"

import { START_SIDEBAR_OPENING, TOGGLE_SIDEBAR } from "@/store/modules/sidebar/mutations"

describe("sidebar main mutations", () => {
  it("starts sidebar opening", () => {
    expect(store.state.sidebar.isOpened).to.equal(true)
    expect(store.state.sidebar.isStartedOpening).to.equal(true)

    store.commit(SIDEBAR_MODULE_PREFIX + TOGGLE_SIDEBAR)

    expect(store.state.sidebar.isOpened).to.equal(false)
    expect(store.state.sidebar.isStartedOpening).to.equal(false)

    store.commit(SIDEBAR_MODULE_PREFIX + START_SIDEBAR_OPENING)

    expect(store.state.sidebar.isOpened).to.equal(false)
    expect(store.state.sidebar.isStartedOpening).to.equal(true)
  })

  it("toggles sidebar", () => {
    expect(store.state.sidebar.isOpened).to.equal(false)
    expect(store.state.sidebar.isStartedOpening).to.equal(true)

    store.commit(SIDEBAR_MODULE_PREFIX + TOGGLE_SIDEBAR)

    expect(store.state.sidebar.isOpened).to.equal(true)
    expect(store.state.sidebar.isStartedOpening).to.equal(true)

    store.commit(SIDEBAR_MODULE_PREFIX + TOGGLE_SIDEBAR)

    expect(store.state.sidebar.isOpened).to.equal(false)
    expect(store.state.sidebar.isStartedOpening).to.equal(false)
  })
})
