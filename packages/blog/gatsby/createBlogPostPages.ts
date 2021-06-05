import { Actions, CreatePagesArgs, Reporter } from "gatsby"
import path from "path"
import { CreatePageQuery } from "../src/types/generated"

type CreatePageOptions = {
  createPage: Actions["createPage"]
  reporter: Reporter
}

const createBlogPost = (
  posts: CreatePageQuery["allMarkdownRemark"]["nodes"],
  { createPage, reporter }: CreatePageOptions
): void => {
  const BlogPostTemplate = path.resolve(`src/templates/BlogPostTemplate.tsx`)

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

const createBlogTagList = (
  posts: CreatePageQuery["allMarkdownRemark"]["nodes"],
  { createPage, reporter }: CreatePageOptions
): void => {
  const BlogTagListTemplate = path.resolve(
    `src/templates/BlogTagListTemplate.tsx`
  )

  const listByLabels: Record<
    string,
    CreatePageQuery["allMarkdownRemark"]["nodes"]
  > = {}
  posts.forEach((post, index) => {
    if (!post.frontmatter) {
      reporter.panicOnBuild(`Cannot find frontmatter for post #${index + 1}`)
      return
    }

    if (!post.frontmatter.labels) {
      reporter.panicOnBuild(`Cannot find labels for post #${index + 1}`)
      return
    }

    const { labels } = post.frontmatter
    labels.forEach(label => {
      if (!label) {
        return
      }

      if (!listByLabels[label]) {
        listByLabels[label] = []
      }

      listByLabels[label].push(post)
    })
  })

  const labels = Object.keys(listByLabels)
  labels.forEach(label => {
    const posts = listByLabels[label].reverse()

    createPage({
      path: `/tag/${label}`,
      component: BlogTagListTemplate,
      context: {
        tag: label,
        posts,
      },
    })
  })
}

export const createBlogPostPages = async ({
  graphql,
  actions,
  reporter,
}: CreatePagesArgs) => {
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

  createBlogPost(posts, {
    createPage,
    reporter,
  })

  createBlogTagList(posts, {
    createPage,
    reporter,
  })
}
