import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import { BlogPostProps } from "./BlogPost"

interface BlogPostSandwichProps<T extends BlogPostProps> {
  posts: T[]
  main: T
}

export const BlogPostSandwich = <T extends BlogPostProps>({
  posts,
  main: { slug, html, title },
}: BlogPostSandwichProps<T>) => {
  const challengesToShow = Math.min(posts.length, 6)

  if (challengesToShow === 0) {
    return null
  }

  return (
    <article
      className="blog-post-sandwich"
      itemScope
      itemType="http://schema.org/Article"
    >
      <header>
        <h2>
          <Link to={slug} itemProp="url">
            <span itemProp="headline">{title}</span>
          </Link>
        </h2>
        <small>{/* <ViewReader slug={slug} /> */}</small>
      </header>
      <section>
        <p
          dangerouslySetInnerHTML={{
            __html: html,
          }}
          itemProp="description"
        />
      </section>
      <footer>
        <h3>
          Last {challengesToShow}{" "}
          {challengesToShow > 1 ? "challenges" : "challenge"}
        </h3>
        <div className="block-sandwich-gallery">
          {posts.slice(0, 6).map(post => (
            <div className="block-sandwich-gallery-item" key={post.title}>
              <Link to={post.slug} itemProp="url">
                <h5>{post.title}</h5>
                {post.gatsbyImageData && (
                  <GatsbyImage image={post.gatsbyImageData} alt={post.title} />
                )}
              </Link>
            </div>
          ))}
        </div>
      </footer>
    </article>
  )
}
