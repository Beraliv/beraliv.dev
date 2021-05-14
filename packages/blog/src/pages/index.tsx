import React from "react"
import { graphql, PageProps } from "gatsby"
import { BlogIndexQuery } from "../types/generated"
import { BlogList } from "../components/BlogList"

const BlogIndex = ({ data, location }: PageProps<BlogIndexQuery>) => {
  if (!data.site?.siteMetadata?.title) {
    throw new Error(`Cannot find siteMetadata.title in gatsby-config.ts`)
  }

  const { title } = data.site.siteMetadata
  const posts = data.allMarkdownRemark.nodes

  return (
    <BlogList
      location={location}
      seoTitle="All posts"
      title={title}
      posts={posts}
    />
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query BlogIndex {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          categories
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
`
