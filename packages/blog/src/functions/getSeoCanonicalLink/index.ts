import { SeoQuery } from "../../types/generated"

type GetSeoCanonicalLinkParameters = {
  site: SeoQuery["site"]
  pathname: string
}

export const getSeoCanonicalLink = ({
  site,
  pathname,
}: GetSeoCanonicalLinkParameters) => {
  if (!site?.siteMetadata?.siteUrl) {
    return []
  }

  const canonical = `${site.siteMetadata.siteUrl}${pathname}`
  if (!canonical) {
    return []
  }

  return [
    {
      rel: "canonical",
      href: canonical,
    },
  ]
}
