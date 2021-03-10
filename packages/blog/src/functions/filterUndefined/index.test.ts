import { filterUndefined } from "."

describe("filterUndefined", () => {
  test("does nothing with empty array", () => {
    const result = filterUndefined([])

    expect(result).toEqual<typeof result>([])
  })

  test("filters out undefined from array", () => {
    const result = filterUndefined([1, undefined, 3, undefined])

    expect(result).toEqual<typeof result>([1, 3])
  })

  test("does not filter falsy values except for undefined", () => {
    const result = filterUndefined([false, NaN, "", 0, undefined, null])

    expect(result).toEqual<typeof result>([false, NaN, "", 0, null])
  })
})
