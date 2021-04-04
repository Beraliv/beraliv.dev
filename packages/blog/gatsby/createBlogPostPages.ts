import { CreatePagesArgs } from "gatsby"
import path from "path"
import { POSTS_PER_PAGE } from "../src/constants/POSTS_PER_PAGE"
import { getNumberOfPages } from "../src/functions/getNumberOfPages"
import { range } from "../src/functions/range"
import { CreatePageQuery } from "../src/types/generated"

export const createBlogPostPages = async ({
  graphql,
  actions,
  reporter,
}: CreatePagesArgs) => {
  const BlogListTemplate = path.resolve(`src/templates/BlogListTemplate.tsx`)
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

  const numberOfPages = getNumberOfPages(posts.length)
  range(1, numberOfPages).forEach(currentPage => {
    createPage({
      path: currentPage === 1 ? `/` : `/${currentPage}`,
      component: BlogListTemplate,
      context: {
        limit: POSTS_PER_PAGE,
        skip: (currentPage - 1) * POSTS_PER_PAGE,
        numberOfPages,
        currentPage,
      },
    })
  })

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
