/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CreatePageQuery
// ====================================================

export interface CreatePageQuery_allMarkdownRemark_nodes_fields {
  slug: string | null;
}

export interface CreatePageQuery_allMarkdownRemark_nodes {
  id: string;
  fields: CreatePageQuery_allMarkdownRemark_nodes_fields | null;
}

export interface CreatePageQuery_allMarkdownRemark {
  nodes: CreatePageQuery_allMarkdownRemark_nodes[];
}

export interface CreatePageQuery {
  allMarkdownRemark: CreatePageQuery_allMarkdownRemark;
}
