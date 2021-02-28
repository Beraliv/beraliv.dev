import React from "react"
import { graphql, PageProps } from "gatsby"
import { Layout } from "../components/Layout"
import { Seo } from "../components/Seo"
import { NotFoundQuery } from './queries/NotFoundQuery'

const NotFoundPage = ({ data, location }: PageProps<NotFoundQuery>) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="404: Not Found" />
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query NotFoundQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
