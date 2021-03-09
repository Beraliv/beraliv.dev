/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { FunctionComponent } from "react"
import { Helmet } from "react-helmet"
import { useSeoQuery } from "../hooks/useSeoQuery"
import { ImageSharpResize } from "../types/generated"

type SeoProps = {
  description?: string
  lang?: string
  meta?:
    | {
        property: string
        content: any
        name?: undefined
      }
    | {
        name: string
        content: any
        property?: undefined
      }[]
  image?: Pick<ImageSharpResize, "src" | "width" | "height">
  title: string
  pathname: string
}

export const Seo: FunctionComponent<SeoProps> = ({
  description = ``,
  lang = `en`,
  meta = [],
  image,
  title,
  pathname,
}) => {
  const site = useSeoQuery()

  const metaDescription = description || site.siteMetadata.description
  const metaKeywords = site.siteMetadata.keywords.join(",")
  const metaImage =
    site.siteMetadata.siteUrl && image?.src
      ? `${site.siteMetadata.siteUrl}${image.src}`
      : undefined

  const canonical =
    site.siteMetadata.siteUrl && pathname
      ? `${site.siteMetadata.siteUrl}${pathname}`
      : null

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      link={
        canonical
          ? [
              {
                rel: "canonical",
                href: canonical,
              },
            ]
          : []
      }
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: "keywords",
          content: metaKeywords,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        site.siteMetadata?.social?.twitter
          ? {
              name: `twitter:creator`,
              content: site.siteMetadata.social.twitter,
            }
          : undefined,
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ]
        .concat(
          image
            ? [
                {
                  property: "og:image",
                  content: metaImage,
                },
                {
                  property: "og:image:width",
                  content: `${image.width}`,
                },
                {
                  property: "og:image:height",
                  content: `${image.height}`,
                },
                {
                  name: "twitter:card",
                  content: "summary_large_image",
                },
              ]
            : [
                {
                  name: "twitter:card",
                  content: "summary",
                },
              ]
        )
        .concat(meta)
        .filter(Boolean)}
    />
  )
}
