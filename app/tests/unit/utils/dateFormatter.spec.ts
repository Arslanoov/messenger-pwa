import { expect } from "chai"

import { isToday, isYesterday, isNotOlderThanMonth } from "@/utils/dateFormatter"

describe("date-formatter util", () => {
  it("is today", () => {
    expect(isToday(new Date(), new Date())).to.be.true
    expect(isToday(new Date(2021, 3, 11), new Date(2021, 3, 12))).to.be.false
    expect(isToday(new Date(2021, 3, 18), new Date(2021, 3, 18))).to.be.true
  })

  it("is yesterday", () => {
    expect(isYesterday(new Date(), new Date())).to.be.false
    expect(isYesterday(new Date(2021, 3, 11), new Date(2021, 3, 12))).to.be.true
    expect(isYesterday(new Date(2021, 3, 18), new Date(2021, 3, 18))).to.be.false
  })

  it("is not older than month", () => {
    expect(isNotOlderThanMonth(new Date(), new Date())).to.be.true
    expect(isNotOlderThanMonth(new Date(2021, 3, 11), new Date(2021, 3, 12))).to.be.true
    expect(isNotOlderThanMonth(new Date(2021, 1, 18), new Date(2021, 3, 18))).to.be.false
    expect(isNotOlderThanMonth(new Date(2020, 9, 18), new Date(2021, 3, 18))).to.be.false
  })
})
