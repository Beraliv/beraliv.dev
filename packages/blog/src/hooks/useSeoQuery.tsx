import { graphql, useStaticQuery } from "gatsby"
import { SeoQueryQuery as SeoQueryType } from "../types/generated"

export const useSeoQuery = (): SeoQueryType["site"] => {
  const { site } = useStaticQuery<SeoQueryType>(
    graphql`
      query SeoQuery {
        site {
          siteMetadata {
            title
            description
            social {
              twitter
            }
          }
        }
      }
    `
  )

  return site
}
