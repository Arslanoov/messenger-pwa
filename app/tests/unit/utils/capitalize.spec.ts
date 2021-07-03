import { expect } from "chai"

import { capitalize } from "@/utils/capitalize"

describe("capitalize util", () => {
  it("works", () => {
    const name = "vasya"
    const capName = capitalize(name)
    expect(capName).to.equal("Vasya")

    const name2 = "ivan"
    const capName2 = capitalize(name2)
    expect(capName2).to.equal("Ivan")
  })
})
