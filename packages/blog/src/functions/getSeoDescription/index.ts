import { SeoQuery } from "../../types/generated"

type GetSeoDescriptionParameters = {
  description?: string
  site: SeoQuery["site"]
  pathname: string
}

export const getSeoDescription = ({
  description,
  site,
  pathname,
}: GetSeoDescriptionParameters): string => {
  if (description) {
    return description
  }

  if (site?.siteMetadata?.description) {
    return site.siteMetadata.description
  }

  throw new Error(`Cannot find description for ${pathname}`)
}
