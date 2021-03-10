import { getSeoDescription } from "."

describe("getSeoDescription", () => {
  test("returns description if it is non-empty", () => {
    const result = getSeoDescription({
      description: "Testing description",
      site: {},
      pathname: "/testing/pathname",
    })

    expect(result).toEqual<typeof result>("Testing description")
  })

  test("returns description from site metadata if it is non-empty", () => {
    const result = getSeoDescription({
      site: {
        siteMetadata: {
          description: "Testing metadata description",
        },
      },
      pathname: "/testing/pathname",
    })

    expect(result).toEqual<typeof result>("Testing metadata description")
  })

  test("throws error if description is empty in params and metadata", () => {
    expect(() =>
      getSeoDescription({
        description: "",
        site: {
          siteMetadata: {
            description: "",
          },
        },
        pathname: "/testing/pathname",
      })
    ).toThrowError("Cannot find description for /testing/pathname")
  })

  test("throws error if description is absent in params and metadata", () => {
    expect(() =>
      getSeoDescription({
        site: {
          siteMetadata: {},
        },
        pathname: "/testing/pathname",
      })
    ).toThrowError("Cannot find description for /testing/pathname")
  })
})
