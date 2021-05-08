import { shallowMount } from "@vue/test-utils"
import { expect } from "chai"

import Avatar from "@/components/base/avatar/Avatar.vue"

describe("Avatar.vue", () => {
  it("renders", () => {
    const url = "url"
    const wrapper = shallowMount(Avatar, {
      props: {
        src: "url",
        isOnline: true,
        withMargin: false
      }
    })

    const avatar = wrapper.find(".avatar")
    const avatarElement = avatar.element as HTMLElement
    expect(avatarElement.style.getPropertyValue("background-image")).to.include(`url(${url})`)
    expect(avatarElement.classList.contains("avatar_with-margin"))

    const onlineIndicators = wrapper.findAll(".avatar__online")
    expect(onlineIndicators.length === 1).to.be.true
  })
})

