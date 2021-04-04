import { range } from "."

describe(range.name, () => {
  test(`returns empty array if start > end`, () => {
    expect(range(1, 0)).toEqual([])
  })

  test(`returns array with only one element if start = end`, () => {
    expect(range(1, 1)).toEqual([1])
  })

  test(`returns all digits`, () => {
    expect(range(0, 9)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  })
})
