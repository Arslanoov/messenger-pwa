import { expect } from "chai"

import { capitalize } from "@/utils/capitalize"

describe("capitalize util", () => {
  it("works", () => {
    const name = "vasya"
    expect(capitalize(name)).to.equal("Vasya")

    const name2 = "ivan"
    expect(capitalize(name2)).to.equal("Ivan")
  })
})
