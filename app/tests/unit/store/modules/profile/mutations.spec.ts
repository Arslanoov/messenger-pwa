import { expect } from "chai"

import { store } from "@/store"

import { PROFILE_MODULE_PREFIX } from "@/store/modules/profile"

import { SET_CHANGE_FORM_ABOUT } from "@/store/modules/profile/mutations"

describe("profile main mutations", () => {
  it("sets change form about", () => {
    expect(store.state.profile.changeForm.about).to.equal("")

    const about = "some info"

    store.commit(PROFILE_MODULE_PREFIX + SET_CHANGE_FORM_ABOUT, about)

    expect(store.state.profile.changeForm.about).to.equal(about)
  })
})
