import { graphql, useStaticQuery } from "gatsby"
import { SeoQuery } from './queries/SeoQuery'

export const useSeoQuery = (): SeoQuery['site'] => {
  const { site } = useStaticQuery(
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