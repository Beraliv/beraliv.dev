import { graphql } from "gatsby"

graphql`
  query CreatePage {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: ASC }
      limit: 1000
    ) {
      nodes {
        id
        fields {
          slug
        }
      }
    }
  }
`
