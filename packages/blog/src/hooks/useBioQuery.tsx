import { graphql, useStaticQuery } from "gatsby"
import { BioQuery } from "../types/generated"

export const useBioQuery = (): BioQuery =>
  useStaticQuery(graphql`
    query Bio {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50, quality: 95) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)
