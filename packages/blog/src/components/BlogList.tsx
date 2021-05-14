import { Link, PageProps } from "gatsby"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import React from "react"
import { Bio } from "./Bio"
import { Layout } from "./Layout"
import { Seo } from "./Seo"

interface Postable {
  fields?: {
    slug?: string | null
  } | null
  frontmatter?: {
    categories?: any[] | null
    description?: string | null
    image?: {
      childImageSharp?: {
        gatsbyImageData: IGatsbyImageData | null
      } | null
    } | null
    title?: string | null
    date?: string | null
  } | null
}

export interface BlogListProps<T extends Postable | null | undefined> {
  location: PageProps["location"]
  posts: T[]
  seoTitle: string
  tag?: string
  title: string
}

export const BlogList = <T extends Postable>({
  posts,
  seoTitle,
  title,
  tag,
  location,
}: BlogListProps<T>) => {
  if (posts.length === 0) {
    return (
      <Layout location={location} title={title}>
        <Seo title={seoTitle} pathname={location.pathname} />
        <Bio />
        {tag && <h1>{`#${tag}`}</h1>}
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  let postsWithCategories = []
  let postsWithoutCategories = []

  for (const post of posts) {
    const length = post.frontmatter?.categories?.length ?? 0
    if (length > 0) {
      postsWithCategories.push(post)
    } else {
      postsWithoutCategories.push(post)
    }
  }

  return (
    <Layout location={location} title={title}>
      <Seo title={seoTitle} pathname={location.pathname} />
      <Bio />
      {tag && <h1>{`#${tag}`}</h1>}
      <ol>
        {postsWithoutCategories.map((post, index) => {
          if (!post.fields?.slug) {
            throw new Error(`Cannot extract slug for post #${index + 1}`)
          }

          if (!post.frontmatter) {
            throw new Error(
              `Cannot find frontmatter in ${post.fields.slug}index.md`
            )
          }

          if (!post.frontmatter.title) {
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
    </Layout>
  )
}
