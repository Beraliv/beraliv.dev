import { Link } from "gatsby"
import React from "react"
import { BlogPostProps } from "./BlogPost"
import { Label } from "./Label"

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
        <small>{posts[0].date}</small>
        <h2 className="hover:">
          <Link to={slug} itemProp="url">
            <span itemProp="headline">{title}</span>
          </Link>
        </h2>
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
        <div className="block-sandwich-gallery">
          {posts.map(post => (
            <div className="block-sandwich-gallery-item" key={post.title}>
              <Label title={post.title} to={post.slug} />
            </div>
          ))}
        </div>
      </footer>
    </article>
  )
}
