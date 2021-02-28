/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BlogIndexQuery
// ====================================================

export interface BlogIndexQuery_site_siteMetadata {
  title: string | null;
}

export interface BlogIndexQuery_site {
  siteMetadata: BlogIndexQuery_site_siteMetadata | null;
}

export interface BlogIndexQuery_allMarkdownRemark_nodes_fields {
  slug: string | null;
}

export interface BlogIndexQuery_allMarkdownRemark_nodes_frontmatter {
  date: any | null;
  title: string | null;
  description: string | null;
}

export interface BlogIndexQuery_allMarkdownRemark_nodes {
  excerpt: string | null;
  fields: BlogIndexQuery_allMarkdownRemark_nodes_fields | null;
  frontmatter: BlogIndexQuery_allMarkdownRemark_nodes_frontmatter | null;
}

export interface BlogIndexQuery_allMarkdownRemark {
  nodes: BlogIndexQuery_allMarkdownRemark_nodes[];
}

export interface BlogIndexQuery {
  site: BlogIndexQuery_site | null;
  allMarkdownRemark: BlogIndexQuery_allMarkdownRemark;
}
