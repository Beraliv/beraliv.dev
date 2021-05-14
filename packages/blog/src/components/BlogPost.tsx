import { Link } from "gatsby"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import React, { FC } from "react"

interface BlogPostProps {
  date: string
  slug: string
  title: string
  gatsbyImageData?: IGatsbyImageData | null
  html: string
}

export const BlogPost: FC<BlogPostProps> = ({
  date,
  gatsbyImageData,
  html,
  slug,
  title,
}) => {
  return (
    <article itemScope itemType="http://schema.org/Article">
      <header>
        <small>{date}</small>
        <h2>
          <Link to={slug} itemProp="url">
            <span itemProp="headline">{title}</span>
          </Link>
        </h2>
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
