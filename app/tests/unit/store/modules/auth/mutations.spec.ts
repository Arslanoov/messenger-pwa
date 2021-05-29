import { assert, expect } from "chai"

import { store } from "@/store"

import { AUTH_MODULE_PREFIX } from "@/store/modules/auth"

import {
  SET_AUTH_TOKEN,
  SET_CURRENT_USER,
  CLEAR_CURRENT_USER_INFO,
  SET_AVATAR,
  REMOVE_AVATAR,
  SET_AUTH_FORM_USERNAME,
  SET_AUTH_FORM_PASSWORD,
  SET_AUTH_FORM_ERROR,
  SET_SIGN_UP_FORM_USERNAME,
  SET_SIGN_UP_FORM_PASSWORD,
  SET_SIGN_UP_FORM_REPEAT_PASSWORD,
  SET_SIGN_UP_FORM_VIOLATIONS,
  SET_SIGN_UP_FORM_ERROR,
  CLEAR_SIGN_UP_FORM_VIOLATIONS,
  CLEAR_SIGN_UP_FORM_ERROR,
  CLEAR_AUTH_FORM_ERROR
} from "@/store/modules/auth/mutations"

import { UserInterface } from "@/types/user"
import { ViolationInterface } from "@/types/violation"

describe("auth main mutations", () => {
  it("sets auth token", () => {
    expect(store.state.auth.token).to.equal(null)

    const token = "auth_token"

    store.commit(AUTH_MODULE_PREFIX + SET_AUTH_TOKEN, token)

    expect(store.state.auth.token).to.equal(token)
  })

  it("sets current user", () => {
    expect(store.state.auth.user).to.equal(null)

    const user = {
      uuid: "uuid",
      username: "username",
      aboutMe: "about",
      avatar: "avatar",
      isOnline: true,
      messagesCount: 0
    }

    store.commit(AUTH_MODULE_PREFIX + SET_CURRENT_USER, user)

    assert.deepEqual(store.state.auth.user, user)
  })

  it("sets avatar", () => {
    const newAvatar = "new_avatar"

    expect(store.state.auth.user).to.not.equal(null)
    expect((store.state.auth.user as UserInterface).avatar).to.not.equal(newAvatar)

    store.commit(AUTH_MODULE_PREFIX + SET_AVATAR, newAvatar)

    assert.deepEqual((store.state.auth.user as UserInterface).avatar, newAvatar)
  })

  it("removes avatar avatar", () => {
    expect(store.state.auth.user).to.not.equal(null)
    expect((store.state.auth.user as UserInterface).avatar).to.not.equal(null)

    store.commit(AUTH_MODULE_PREFIX + REMOVE_AVATAR)

    expect((store.state.auth.user as UserInterface).avatar).to.equal(null)
  })

  it("clears user info", () => {
    expect(store.state.auth.user).to.not.equal(null)
    expect(store.state.auth.token).to.not.equal(null)

    store.commit(AUTH_MODULE_PREFIX + CLEAR_CURRENT_USER_INFO)

    expect(store.state.auth.user).to.equal(null)
    expect(store.state.auth.token).to.equal(null)
  })
})

describe("auth form mutations", () => {
  it("auth form", () => {
    assert.deepEqual(store.state.auth.authForm, {
      username: "",
      password: "",
      error: null
    })

    const newUsername = "new_username"
    const newPassword = "new_password"
    const newError = "new_error"

    const newAuthForm = {
      username: newUsername,
      password: newPassword,
      error: newError
    }

    store.commit(AUTH_MODULE_PREFIX + SET_AUTH_FORM_USERNAME, newUsername)
    store.commit(AUTH_MODULE_PREFIX + SET_AUTH_FORM_PASSWORD, newPassword)
    store.commit(AUTH_MODULE_PREFIX + SET_AUTH_FORM_ERROR, newError)

    assert.deepEqual(store.state.auth.authForm, newAuthForm)

    store.commit(AUTH_MODULE_PREFIX + CLEAR_AUTH_FORM_ERROR)

    assert.deepEqual(store.state.auth.authForm, {
      ...newAuthForm,
      error: null
    })
  })

  it("sign up form", () => {
    assert.deepEqual(store.state.auth.signUpForm, {
      username: "",
      password: "",
      repeatPassword: "",
      error: null,
      violations: []
    })

    const newUsername = "new_username"
    const newPassword = "new_password"
    const newRepeatPassword = "new_repeat_password"
    const newError = "Some error"
    const newViolations: ViolationInterface[] = [
      {
        propertyPath: "username",
        title: "error"
      }
    ]

    const newSignUpForm = {
      username: newUsername,
      password: newPassword,
      repeatPassword: newRepeatPassword,
      error: newError,
      violations: newViolations
    }

    store.commit(AUTH_MODULE_PREFIX + SET_SIGN_UP_FORM_USERNAME, newUsername)
    store.commit(AUTH_MODULE_PREFIX + SET_SIGN_UP_FORM_PASSWORD, newPassword)
    store.commit(AUTH_MODULE_PREFIX + SET_SIGN_UP_FORM_REPEAT_PASSWORD, newRepeatPassword)
    store.commit(AUTH_MODULE_PREFIX + SET_SIGN_UP_FORM_VIOLATIONS, newViolations)
    store.commit(AUTH_MODULE_PREFIX + SET_SIGN_UP_FORM_ERROR, newError)

    assert.deepEqual(store.state.auth.signUpForm, newSignUpForm)

    store.commit(AUTH_MODULE_PREFIX + CLEAR_SIGN_UP_FORM_VIOLATIONS)

    assert.deepEqual(store.state.auth.signUpForm.violations, [])

    store.commit(AUTH_MODULE_PREFIX + CLEAR_SIGN_UP_FORM_ERROR)

    expect(store.state.auth.signUpForm.error).to.equal(null)
  })
})
