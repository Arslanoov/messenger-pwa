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
    expect((avatar.element as HTMLElement).style.getPropertyValue("background-image")).to.include(`url(${url})`)
  })
})

