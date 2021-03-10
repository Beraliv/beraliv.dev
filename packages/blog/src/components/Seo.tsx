/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { FunctionComponent } from "react"
import { Helmet } from "react-helmet"
import { filterUndefined } from "../functions/filterUndefined"
import { getSeoCanonicalLink } from "../functions/getSeoCanonicalLink"
import { getSeoDescription } from "../functions/getSeoDescription"
import { useSeoQuery } from "../hooks/useSeoQuery"
import { ImageSharpResize } from "../types/generated"

type SeoMetaProp =
  | {
      property: string
      content: string
    }
  | {
      name: string
      content: string
    }

type SeoProps = {
  description?: string
  lang?: string
  meta?: SeoMetaProp[]
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

  const metaDescription = getSeoDescription({ description, site, pathname })
  const metaKeywords = site?.siteMetadata?.keywords?.join(",")
  const metaImageSrc =
    site?.siteMetadata?.siteUrl && image?.src
      ? `${site.siteMetadata.siteUrl}${image.src}`
      : undefined
  const titleTemplate = site?.siteMetadata?.title
    ? `%s | ${site.siteMetadata.title}`
    : undefined
  const canonicalLink = getSeoCanonicalLink({ site, pathname })
  const metaUrl = site?.siteMetadata?.siteUrl
    ? `${site.siteMetadata.siteUrl}${pathname}`
    : undefined

  const generalMeta: SeoMetaProp[] = filterUndefined([
    {
      name: `description`,
      content: metaDescription,
    },
    {
      name: `image`,
      content: metaImageSrc,
    },
    metaKeywords
      ? {
          name: "keywords",
          content: metaKeywords,
        }
      : undefined,
  ])

  const openGraphMeta: SeoMetaProp[] = filterUndefined([
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
    {
      property: `og:url`,
      content: metaUrl,
    },
    metaImageSrc
      ? {
          property: "og:image",
          content: metaImageSrc,
        }
      : undefined,
    image
      ? {
          property: "og:image:width",
          content: `${image.width}`,
        }
      : undefined,
    image
      ? {
          property: "og:image:height",
          content: `${image.height}`,
        }
      : undefined,
  ])

  const twitterMeta: SeoMetaProp[] = filterUndefined([
    site?.siteMetadata?.social?.twitter
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
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    metaImageSrc
      ? {
          property: "twitter:image",
          content: metaImageSrc,
        }
      : undefined,
  ])

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      titleTemplate={titleTemplate}
      link={canonicalLink}
      meta={[...generalMeta, ...openGraphMeta, ...twitterMeta, ...meta]}
    />
  )
}
