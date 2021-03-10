import { getSeoCanonicalLink } from "."

describe("getSeoCanonicalLink", () => {
  test("returns empty array if siteUrl is undefined", () => {
    const result = getSeoCanonicalLink({
      site: {},
      pathname: "/testing/path",
    })

    expect(result).toEqual<typeof result>([])
  })

  test("returns empty array if siteUrl and pathname are empty strings", () => {
    const result = getSeoCanonicalLink({
      site: {
        siteMetadata: {
          siteUrl: "",
        },
      },
      pathname: "",
    })

    expect(result).toEqual<typeof result>([])
  })

  test("returns array with one canonical link", () => {
    const result = getSeoCanonicalLink({
      site: {
        siteMetadata: {
          siteUrl: "my.testing.site",
        },
      },
      pathname: "/2020-01-01-testing-blog-post",
    })

    expect(result).toEqual<typeof result>([
      {
        rel: "canonical",
        href: "my.testing.site/2020-01-01-testing-blog-post",
      },
    ])
  })
})
