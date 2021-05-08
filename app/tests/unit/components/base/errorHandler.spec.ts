import { shallowMount } from "@vue/test-utils"
import { expect } from "chai"

import ErrorHandler from "@/components/base/error-handler/ErrorHandler.vue"

import { capitalize } from "@/utils/capitalize"

describe("ErrorHandler.vue", () => {
  it("renders", () => {
    const violations = [
      {
        propertyPath: "username",
        title: "Username error"
      },
      {
        propertyPath: "password",
        title: "Password error"
      }
    ]

    const message = "Message error"

    const wrapper = shallowMount(ErrorHandler, {
      props: {
        violations,
        message
      }
    })

    const errors = wrapper.findAll(".error")
    expect(errors.length === 3).to.be.true

    expect((errors[0].element as HTMLElement).textContent)
      .to.equal(`${capitalize(violations[0].propertyPath)}: ${violations[0].title}`)
    expect((errors[1].element as HTMLElement).textContent)
      .to.equal(`${capitalize(violations[1].propertyPath)}: ${violations[1].title}`)
    expect((errors[2].element as HTMLElement).textContent).to.equal(message)
  })
})

