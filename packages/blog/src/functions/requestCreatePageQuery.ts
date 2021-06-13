import { graphql } from "gatsby"

graphql`
  query CreatePage {
    allMdx(sort: { fields: [frontmatter___date], order: ASC }, limit: 1000) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            keywords
            labels
            categories
            description
            image: featured {
              childImageSharp {
                gatsbyImageData(
                  width: 640
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
          }
        }
      }
    }
  }
`
