/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { useBioQuery } from "../hooks/useBioQuery"

export const Bio = () => {
  const data = useBioQuery()

  if (!data.site?.siteMetadata?.author) {
    throw new Error(`Cannot find site.siteMetadata.author in gatsby-config.ts`)
  }

  if (!data.site.siteMetadata.social) {
    throw new Error(`Cannot find site.siteMetadata.social in gatsby-config.ts`)
  }

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const { author, social } = data.site.siteMetadata

  if (!author.name) {
    throw new Error(
      `Cannot find site.siteMetadata.author.name in gatsby-config.ts`
    )
  }

  if (!data.avatar?.childImageSharp?.gatsbyImageData) {
    throw new Error(`Cannot find blog/content/assets/profile-pic.jpg`)
  }

  const avatar = data.avatar.childImageSharp.gatsbyImageData

  return (
    <div className="bio">
      {avatar && (
        <GatsbyImage
          image={avatar}
          alt={author.name}
          className="bio-avatar"
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
      )}
      <p>
        Written by <strong>{author.name}</strong> {author.summary}
        {` `}
        <a
          href={`https://twitter.com/${social.twitter}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Follow me on Twitter
        </a>
      </p>
    </div>
  )
}
