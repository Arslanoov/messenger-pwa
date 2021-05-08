import { shallowMount } from "@vue/test-utils"
import { expect } from "chai"

import Line from "@/components/base/line/Line.vue"

describe("Line.vue", () => {
  it("renders", () => {
    const wrapper = shallowMount(Line)

    const line = wrapper.findAll(".line")
    expect(line.length === 1).to.be.true
  })
})

