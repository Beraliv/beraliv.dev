import React from "react"
import { graphql, PageProps } from "gatsby"
import { Layout } from "../components/Layout"
import { Seo } from "../components/Seo"
import { NotFoundQuery } from "../types/generated"

const NotFoundPage = ({ data, location }: PageProps<NotFoundQuery>) => {
  if (!data.site?.siteMetadata?.title) {
    throw new Error("Cannot find config.siteMetadata.title in gatsby-config.ts")
  }

  const { title } = data.site.siteMetadata

  return (
    <Layout location={location} title={title}>
      <Seo title="404: Not Found" pathname={location.pathname} />
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query NotFound {
    site {
      siteMetadata {
        title
      }
    }
  }
`
