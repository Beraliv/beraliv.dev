/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import Image from "gatsby-image"
import { useBioQuery } from "../hooks/useBioQuery"

export const Bio = () => {
  const data = useBioQuery()

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const { author, social } = data.site.siteMetadata

  const avatar = data.avatar.childImageSharp.fixed

  return (
    <div className="bio">
      {avatar && (
        <Image
          fixed={avatar}
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
        <a href={`https://twitter.com/${social.twitter}`} target="_blank" rel="noopener noreferrer">
          Follow me on Twitter
        </a>
      </p>
    </div>
  )
}
