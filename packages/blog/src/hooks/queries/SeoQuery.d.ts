/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SeoQuery
// ====================================================

export interface SeoQuery_site_siteMetadata_social {
  twitter: string | null;
}

export interface SeoQuery_site_siteMetadata {
  title: string | null;
  description: string | null;
  social: SeoQuery_site_siteMetadata_social | null;
}

export interface SeoQuery_site {
  siteMetadata: SeoQuery_site_siteMetadata | null;
}

export interface SeoQuery {
  site: SeoQuery_site | null;
}
