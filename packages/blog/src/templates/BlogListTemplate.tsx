import React from "react"
import { Link, graphql, PageProps } from "gatsby"
import { Bio } from "../components/Bio"
import { Layout } from "../components/Layout"
import { Seo } from "../components/Seo"
import { BlogListQueryVariables, BlogListQuery } from "../types/generated"
import { GatsbyImage } from "gatsby-plugin-image"
import { range } from "../functions/range"

interface BlogListTemplateProps
  extends PageProps<BlogListQuery, BlogListQueryVariables> {
  pageContext: BlogListQueryVariables & {
    numberOfPages: number
    currentPage: number
  }
}

const BlogListTemplate: React.FC<BlogListTemplateProps> = ({
  data,
  location,
  pageContext,
}) => {
  if (!data.site?.siteMetadata?.title) {
    throw new Error(`Cannot find siteMetadata.title in gatsby-config.ts`)
  }

  const { title } = data.site.siteMetadata
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={title}>
        <Seo title="All posts" pathname={location.pathname} />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  const { currentPage, numberOfPages } = pageContext

  return (
    <Layout location={location} title={title}>
      <Seo title="All posts" pathname={location.pathname} />
      <Bio />
      <ol>
        {posts.map((post, index) => {
          if (!post.fields?.slug) {
            throw new Error(`Cannot extract slug for post #${index + 1}`)
          }

          if (!post.frontmatter?.title) {
            throw new Error(`Cannot find title in ${post.fields.slug}index.md`)
          }

          if (!post.frontmatter.description) {
            throw new Error(
              `Cannot find description in ${post.fields.slug}index.md`
            )
          }

          const { description, title, image } = post.frontmatter

          return (
            <li className="post-list-item" key={post.fields.slug}>
              <article itemScope itemType="http://schema.org/Article">
                <header>
                  <small>{post.frontmatter.date}</small>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                </header>
                <section>
                  {image?.childImageSharp?.gatsbyImageData && (
                    <GatsbyImage
                      image={image?.childImageSharp.gatsbyImageData}
                      alt={title}
                    />
                  )}
                </section>
                <footer>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: description,
                    }}
                    itemProp="description"
                  />
                </footer>
              </article>
            </li>
          )
        })}
      </ol>
      {numberOfPages && (
        <ol>
          {range(1, numberOfPages).map(page => (
            <li className="pagination-item">
              <Link
                key={`pagination-${page}`}
                to={page === 1 ? `/` : `/${page}`}
              >
                {page}
              </Link>
            </li>
          ))}
        </ol>
      )}
    </Layout>
  )
}

export default BlogListTemplate

export const pageQuery = graphql`
  query BlogList($limit: Int!, $skip: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
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
`
