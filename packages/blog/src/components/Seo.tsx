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

interface SeoProps {
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
  const metaImageSrc =
    site?.siteMetadata?.siteUrl && image?.src
      ? `${site.siteMetadata.siteUrl}${image.src}`
      : undefined
  const metaTitle = site?.siteMetadata?.title
  const titleTemplate = metaTitle ? `%s | ${metaTitle}` : undefined
  const canonicalLink = getSeoCanonicalLink({ site, pathname })
  const twitterNickname = site?.siteMetadata?.social?.twitter
    ? `@${site.siteMetadata.social.twitter}`
    : undefined

  const generalMeta: SeoMetaProp[] = filterUndefined([
    {
      name: `description`,
      content: metaDescription,
    },
    metaImageSrc
      ? {
          name: `image`,
          content: metaImageSrc,
        }
      : undefined,
    site?.siteMetadata?.keywords
      ? {
          name: "keywords",
          content: site.siteMetadata.keywords.join(","),
        }
      : undefined,
  ])

  const openGraphMeta: SeoMetaProp[] = filterUndefined([
    metaTitle
      ? {
          property: `og:site_name`,
          content: metaTitle,
        }
      : undefined,
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
    site?.siteMetadata?.siteUrl
      ? {
          property: `og:url`,
          content: `${site.siteMetadata.siteUrl}${pathname}`,
        }
      : undefined,
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
    twitterNickname
      ? {
          name: `twitter:creator`,
          content: twitterNickname,
        }
      : undefined,
    twitterNickname
      ? {
          name: `twitter:site`,
          content: twitterNickname,
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
