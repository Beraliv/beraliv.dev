import { graphql, useStaticQuery } from "gatsby"
import { SeoQuery } from "../types/generated"

export const useSeoQuery = (): SeoQuery["site"] => {
  const { site } = useStaticQuery<SeoQuery>(
    graphql`
      query Seo {
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
