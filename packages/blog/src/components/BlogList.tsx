import { Link, PageProps } from "gatsby"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import React from "react"
import { Bio } from "./Bio"
import { BlogPost } from "./BlogPost"
import { BlogPostSandwich } from "./BlogPostSandwich"
import { Layout } from "./Layout"
import { Seo } from "./Seo"

export interface Postable {
  fields?: {
    slug?: string | null
  } | null
  frontmatter?: {
    categories?: (string | null)[] | null
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

  posts.forEach((post, index) => {
    if (!post.fields?.slug) {
      throw new Error(`Cannot extract slug for post #${index + 1}`)
    }

    if (!post.frontmatter) {
      throw new Error(`Cannot find frontmatter in ${post.fields.slug}index.md`)
    }

    if (!post.frontmatter.title) {
      throw new Error(`Cannot find title in ${post.fields.slug}index.md`)
    }

    if (!post.frontmatter.description) {
      throw new Error(`Cannot find description in ${post.fields.slug}index.md`)
    }
  })

  let postsWithoutCategories: T[] = []
  let postsByCategories: Record<string, T[]> = {}

  for (const post of posts) {
    const categories = post.frontmatter?.categories ?? []
    if (categories.length > 0) {
      categories.forEach(category => {
        if (!category) {
          return
        }

        if (!postsByCategories[category]) {
          postsByCategories[category] = []
        }

        postsByCategories[category].push(post)
      })
    } else {
      postsWithoutCategories.push(post)
    }
  }

  const categories = Object.keys(postsByCategories).filter(
    category =>
      // subcategory
      !category.includes(":")
  )

  return (
    <Layout location={location} title={title}>
      <Seo title={seoTitle} pathname={location.pathname} />
      <Bio />
      {tag && <h1>{`#${tag}`}</h1>}
      <ol>
        {categories.map(category => {
          const postsByCategory = postsByCategories[category].map(post => ({
            date: post.frontmatter!.date!,
            slug: post.fields!.slug!,
            gatsbyImageData:
              post.frontmatter?.image?.childImageSharp?.gatsbyImageData,
            title: post.frontmatter!.title!,
            html: post.frontmatter!.description!,
          }))
          const mainPost = postsByCategories[`${category}:main`][0]

          if (!mainPost) {
            throw new Error(`Cannot find ${category}:main post`)
          }

          const slug = mainPost.fields!.slug!

          const main = {
            date: mainPost.frontmatter!.date!,
            slug,
            gatsbyImageData:
              mainPost.frontmatter?.image?.childImageSharp?.gatsbyImageData,
            title: mainPost.frontmatter!.title!,
            html: mainPost.frontmatter!.description!,
          }

          return (
            <li className="post-list-item" key={`${category}-${slug}`}>
              <BlogPostSandwich posts={postsByCategory} main={main} />
            </li>
          )
        })}
        {postsWithoutCategories.map(post => {
          const { description, title, image } = post.frontmatter!

          const slug = post.fields!.slug!

          return (
            <li className="post-list-item" key={slug}>
              <BlogPost
                date={post.frontmatter!.date!}
                slug={slug}
                gatsbyImageData={image?.childImageSharp?.gatsbyImageData}
                title={title!}
                html={description!}
              />
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}
