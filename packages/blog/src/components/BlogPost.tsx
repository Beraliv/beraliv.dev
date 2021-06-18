import { Link } from "gatsby"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import React, { FC } from "react"
import { ViewReader } from "./ViewReader"

export interface BlogPostProps {
  slug: string
  title: string
  gatsbyImageData?: IGatsbyImageData | null
  html: string
}

export const BlogPost: FC<BlogPostProps> = ({
  gatsbyImageData,
  html,
  slug,
  title,
}) => {
  return (
    <article itemScope itemType="http://schema.org/Article">
      <header>
        <h2>
          <Link to={slug} itemProp="url">
            <span itemProp="headline">{title}</span>
          </Link>
        </h2>
        <small>
          <ViewReader slug={slug} />
        </small>
      </header>
      <section>
        {gatsbyImageData && (
          <GatsbyImage image={gatsbyImageData} alt={title!} />
        )}
      </section>
      <footer>
        <p
          dangerouslySetInnerHTML={{
            __html: html,
          }}
          itemProp="description"
        />
      </footer>
    </article>
  )
}
