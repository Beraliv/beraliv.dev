import { graphql } from "gatsby";

export const requestCreatePageQuery = graphql`
  query CreatePageQuery {
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
`;