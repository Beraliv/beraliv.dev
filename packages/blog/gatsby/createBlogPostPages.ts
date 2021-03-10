import { CreatePagesArgs } from "gatsby"
import path from "path"
import { CreatePageQuery } from "../src/types/generated"

export const createBlogPostPages = async ({
  graphql,
  actions,
  reporter,
}: CreatePagesArgs) => {
  const BlogPostTemplate = path.resolve(`src/templates/BlogPostTemplate.tsx`)

  const result = await graphql<CreatePageQuery>(`
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
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Cannot execute query CreatePage`, result.errors)
    return
  }

  const posts = result.data?.allMarkdownRemark.nodes
  if (!posts || posts.length === 0) {
    reporter.panicOnBuild(`Cannot find posts for BlogPostPages`)
    return
  }

  const { createPage } = actions

  posts.forEach((post, index) => {
    if (!post.fields?.slug) {
      reporter.panicOnBuild(`Cannot find slug for post #${index + 1}`)
      return
    }

    const previousPostId = index === 0 ? null : posts[index - 1].id
    const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

    createPage({
      path: post.fields.slug,
      component: BlogPostTemplate,
      context: {
        id: post.id,
        previousPostId,
        nextPostId,
      },
    })
  })
}
