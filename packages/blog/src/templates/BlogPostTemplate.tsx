import React from "react"
import { Link, graphql, PageProps } from "gatsby"
import { Layout } from "../components/Layout"
import { Seo } from "../components/Seo"
import { BlogPostBySlugQuery as BlogPostBySlugQueryType } from "../types/generated"
import { MDXRenderer } from "gatsby-plugin-mdx"

type FilterUndefined<T> = T extends undefined ? never : T
type FilterNull<T> = T extends null ? never : T
type FilterUndefinedAndNull<T> = FilterUndefined<FilterNull<T>>

type VisibleLink = {
  fields: {
    slug: FilterUndefinedAndNull<
      FilterUndefinedAndNull<
        FilterUndefinedAndNull<
          BlogPostBySlugQueryType["previous"] | BlogPostBySlugQueryType["next"]
        >["fields"]
      >["slug"]
    >
  }
  frontmatter: {
    title: FilterUndefinedAndNull<
      FilterUndefinedAndNull<
        FilterUndefinedAndNull<
          BlogPostBySlugQueryType["previous"] | BlogPostBySlugQueryType["next"]
        >["frontmatter"]
      >["title"]
    >
  }
}

const isVisibleLink = (
  link: BlogPostBySlugQueryType["previous"] | BlogPostBySlugQueryType["next"]
): link is VisibleLink => {
  if (!link?.fields?.slug) return false
  if (!link.frontmatter?.title) return false

  return true
}

const BlogPostTemplate = ({
  data,
  location,
}: PageProps<BlogPostBySlugQueryType>) => {
  const post = data.mdx

  if (!post) {
    throw new Error(`Cannot find site.mdx in ${location.href}`)
  }

  if (!data.site?.siteMetadata?.title) {
    throw new Error(
      `Cannot find data.site.siteMetadata.title in ${location.href}`
    )
  }

  let { title: siteTitle } = data.site.siteMetadata

  if (!post.frontmatter) {
    throw new Error(`Cannot find post.frontmatter in ${location.href}`)
  }

  if (!post.frontmatter.title) {
    throw new Error(`Cannot find post.frontmatter.title in ${location.href}`)
  }

  if (!post.frontmatter.description) {
    throw new Error(
      `Cannot find post.frontmatter.description in ${location.href}`
    )
  }

  if (!post.frontmatter.labels) {
    throw new Error(`Cannot find post.frontmatter.labels in ${location.href}`)
  }

  if (!post.fields) {
    throw new Error(`Cannot find post.fields in ${location.href}`)
  }

  if (!post.fields.slug) {
    throw new Error(`Cannot find post.fields in ${location.href}`)
  }

  if (!post.body) {
    throw new Error(`Cannot find post.body in ${location.href}`)
  }

  if (!post.frontmatter.image?.childImageSharp?.resize) {
    throw new Error(
      `Cannot find post.frontmatter.image.childImageSharp.resize in ${location.href}`
    )
  }

  const { resize: image } = post.frontmatter.image.childImageSharp
  const { description, keywords, labels, title } = post.frontmatter
  const { slug } = post.fields

  const { previous, next } = data

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={title}
        description={description}
        image={image}
        pathname={location.pathname}
        keywords={keywords}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          {/* <div className="metadata">
            <small>{post.frontmatter.date}</small>
            <small>
              <ViewCounter slug={slug} />
            </small>
          </div> */}
        </header>
        <MDXRenderer>{post.body}</MDXRenderer>
        {/* {labels.map(label => label && <Label key={label} title={label} />)} */}
        {/* <footer>
          <Bio />
        </footer> */}
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {isVisibleLink(previous) && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {isVisibleLink(next) && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(id: { eq: $id }) {
      id
      body
      fields {
        slug
      }
      frontmatter {
        keywords
        labels
        title
        date(formatString: "MMMM DD, YYYY")
        description
        image: featured {
          childImageSharp {
            resize(width: 1200) {
              src
              height
              width
            }
          }
        }
      }
    }
    previous: mdx(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
