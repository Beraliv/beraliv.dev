import React from "react"
import { graphql, PageProps } from "gatsby"
import {
  BlogTagListQuery,
  BlogTagListQueryVariables,
  CreatePageQuery,
} from "../types/generated"
import { BlogList } from "../components/BlogList"

interface BlogTagListTemplateProps
  extends PageProps<BlogTagListQuery, BlogTagListQueryVariables> {
  pageContext: BlogTagListQueryVariables & {
    tag: string
    posts: CreatePageQuery["allMarkdownRemark"]["nodes"]
  }
}

const BlogTagListTemplate: React.FC<BlogTagListTemplateProps> = ({
  data,
  location,
  pageContext,
}) => {
  if (!data.site?.siteMetadata?.title) {
    throw new Error(`Cannot find siteMetadata.title in gatsby-config.ts`)
  }

  const { title } = data.site.siteMetadata
  const { tag, posts } = pageContext

  const seoTitle = `All posts | ${tag}`

  return (
    <BlogList
      location={location}
      seoTitle={seoTitle}
      tag={tag}
      title={title}
      posts={posts}
    />
  )
}

export default BlogTagListTemplate

export const pageQuery = graphql`
  query BlogTagList {
    site {
      siteMetadata {
        title
      }
    }
  }
`
