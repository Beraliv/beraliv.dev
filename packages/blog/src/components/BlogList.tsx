import { PageProps } from "gatsby"
import { IGatsbyImageData } from "gatsby-plugin-image"
import React from "react"
import { DEFAULT_KEYWORDS } from "../constants/DEFAULT_KEYWORDS"
import { CreatePageQuery } from "../types/generated"
import { Bio } from "./Bio"
import { BlogPost } from "./BlogPost"
import { BlogPostSandwich } from "./BlogPostSandwich"
import { Layout } from "./Layout"
import { Seo } from "./Seo"

export interface BlogListProps {
  location: PageProps["location"]
  posts: CreatePageQuery["allMdx"]["edges"]
  seoTitle: string
  tag?: string
  title: string
}

export const BlogList = ({
  posts,
  seoTitle,
  title,
  tag,
  location,
}: BlogListProps) => {
  if (posts.length === 0) {
    return (
      <Layout location={location} title={title}>
        <Seo
          title={seoTitle}
          pathname={location.pathname}
          keywords={DEFAULT_KEYWORDS}
        />
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

  posts.forEach(({ node }, index) => {
    if (!node.fields?.slug) {
      throw new Error(`Cannot extract slug for post #${index + 1}`)
    }

    if (!node.frontmatter) {
      throw new Error(`Cannot find frontmatter in ${node.fields.slug}index.md`)
    }

    if (!node.frontmatter.title) {
      throw new Error(`Cannot find title in ${node.fields.slug}index.md`)
    }

    if (!node.frontmatter.description) {
      throw new Error(`Cannot find description in ${node.fields.slug}index.md`)
    }
  })

  let postsWithoutCategories: CreatePageQuery["allMdx"]["edges"] = []
  let postsByCategories: Record<string, CreatePageQuery["allMdx"]["edges"]> = {}

  for (const { node } of posts) {
    const categories = node.frontmatter?.categories ?? []
    if (categories.length > 0) {
      categories.forEach(category => {
        if (!category) {
          return
        }

        if (!postsByCategories[category]) {
          postsByCategories[category] = []
        }

        postsByCategories[category].push({ node })
      })
    } else {
      postsWithoutCategories.push({ node })
    }
  }

  const categories = Object.keys(postsByCategories).filter(
    category =>
      // subcategory
      !category.includes(":")
  )

  const keywordSet = new Set<string>()
  for (const { node } of posts) {
    for (const label of node.frontmatter?.keywords ?? []) {
      if (label) {
        keywordSet.add(label)
      }
    }
  }

  const keywords = [...keywordSet.values()]

  return (
    <Layout location={location} title={title}>
      <Seo title={seoTitle} pathname={location.pathname} keywords={keywords} />
      <Bio />
      {tag && <h1>{`#${tag}`}</h1>}
      <ol>
        {categories.map(category => {
          const postsByCategory = postsByCategories[category].map(
            ({ node }) => ({
              date: node.frontmatter!.date!,
              slug: node.fields!.slug!,
              gatsbyImageData:
                node.frontmatter?.image?.childImageSharp?.gatsbyImageData,
              title: node.frontmatter!.title!,
              html: node.frontmatter!.description!,
            })
          )
          const { node: mainPost } = postsByCategories[`${category}:main`]?.[0]

          if (!mainPost) {
            console.warn(
              `Cannot find ${category}:main post for BlogPostSandwich, use BlogPost instead`
            )
            return postsByCategory.map(post => (
              <li className="post-list-item" key={post.slug}>
                <BlogPost {...post} />
              </li>
            ))
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
        {postsWithoutCategories.map(({ node }) => {
          const { description, title, image } = node.frontmatter!

          const slug = node.fields!.slug!

          return (
            <li className="post-list-item" key={slug}>
              <BlogPost
                date={node.frontmatter!.date!}
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
