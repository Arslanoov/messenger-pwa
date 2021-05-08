import { expect } from "chai"

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

export const testAction = (action, payload, state, getters, dispatch, expectedMutations, done) => {
  let count = 0

  const commit = (type: string, payload: never) => {
    const mutation = expectedMutations[count]

    try {
      expect(type).to.equal(mutation.type)
      expect(payload).to.deep.equal(mutation.payload)
    } catch (error) {
      done(error)
    }

    count++
    if (count >= expectedMutations.length) {
      done()
    }
  }

  action({ state, commit, getters, dispatch }, payload)

  if (expectedMutations.length === 0) {
    expect(count).to.equal(0)
    done()
  }
}
