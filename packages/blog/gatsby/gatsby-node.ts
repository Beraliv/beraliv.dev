import { GatsbyNode } from "gatsby"
import { createFilePath } from "gatsby-source-filesystem"
import { createBlogPostPages } from "./createBlogPostPages"

export const createPages: GatsbyNode["createPages"] = async gatsbyNode => {
  await createBlogPostPages(gatsbyNode)
}

// export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = async (
//   args: CreateSchemaCustomizationArgs
// ) => {
// }

export const onCreateNode: GatsbyNode["onCreateNode"] = async ({
  actions,
  getNode,
  node,
}) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
