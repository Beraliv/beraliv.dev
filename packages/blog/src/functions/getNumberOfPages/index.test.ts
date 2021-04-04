import { getNumberOfPages } from "."
import { range } from "../range"

describe(getNumberOfPages.name, () => {
  test("returns 0 without posts", () => {
    expect(getNumberOfPages(0)).toEqual(0)
  })

  range(1, 10).forEach(length => {
    test(`returns 1 for ${length} post${length > 1 ? "s" : ""}`, () => {
      expect(getNumberOfPages(length)).toEqual(1)
    })
  })

  range(11, 19).forEach(length => {
    test(`returns 2 for ${length} posts`, () => {
      expect(getNumberOfPages(length)).toEqual(2)
    })
  })
})
