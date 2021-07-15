import { Query } from "../src/types/generated"

module.exports = {
  siteMetadata: {
    title: `beraliv`,
    author: {
      name: `Alexey Berezin`,
      summary: `who loves London 🏴󠁧󠁢󠁥󠁮󠁧󠁿, players ⏯ and TypeScript.`,
    },
    description: `Alexey Berezin blog`,
    siteUrl: `https://blog.beraliv.dev/`,
    social: {
      twitter: `beraliv`,
    },
  },
  flags: {
    FAST_DEV: true,
    // Umbrella Issue (​https://github.com/gatsbyjs/gatsby/discussions/28331
    PRESERVE_WEBPACK_CACHE: true,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [`UA-191938568-1`],
        pluginConfig: {
          head: true,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/../content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/../content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [".md"],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          {
            resolve: `gatsby-remark-figure-caption`,
            options: { figureClassName: "md-figure" },
          },
        ],
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }: { query: Query }) =>
              allMdx.edges.map(edge => {
                const description =
                  edge.node.frontmatter?.description ?? edge.node.excerpt
                const date = edge.node.frontmatter?.date ?? ""
                const url =
                  site?.siteMetadata?.siteUrl && edge.node.fields?.slug
                    ? site.siteMetadata.siteUrl + "/" + edge.node.fields.slug
                    : ""

                return Object.assign({}, edge.node.frontmatter, {
                  description,
                  date,
                  url,
                  guid: url,
                })
              }),
            query: `
              {
                allMdx(sort: { order: DESC, fields: [frontmatter___date] }, limit: 1000) {
                  edges {
                    node {
                      excerpt(pruneLength: 250)
                      fields {
                        slug
                      }
                      frontmatter {
                        description
                        title
                        date(formatString: "MMMM DD, YYYY")
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Blog RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Alexey Berezin blog`,
        short_name: `beraliv blog`,
        lang: `en`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#005b99`,
        display: `standalone`,
        icon: `./content/assets/profile-pic.jpg`,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    `gatsby-plugin-postcss`,
  ],
}
