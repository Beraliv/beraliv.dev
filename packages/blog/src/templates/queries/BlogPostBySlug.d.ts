/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BlogPostBySlug
// ====================================================

export interface BlogPostBySlug_site_siteMetadata {
  title: string | null;
}

export interface BlogPostBySlug_site {
  siteMetadata: BlogPostBySlug_site_siteMetadata | null;
}

export interface BlogPostBySlug_markdownRemark_frontmatter {
  title: string | null;
  date: any | null;
  description: string | null;
}

export interface BlogPostBySlug_markdownRemark {
  id: string;
  excerpt: string | null;
  html: string | null;
  frontmatter: BlogPostBySlug_markdownRemark_frontmatter | null;
}

export interface BlogPostBySlug_previous_fields {
  slug: string | null;
}

export interface BlogPostBySlug_previous_frontmatter {
  title: string | null;
}

export interface BlogPostBySlug_previous {
  fields: BlogPostBySlug_previous_fields | null;
  frontmatter: BlogPostBySlug_previous_frontmatter | null;
}

export interface BlogPostBySlug_next_fields {
  slug: string | null;
}

export interface BlogPostBySlug_next_frontmatter {
  title: string | null;
}

export interface BlogPostBySlug_next {
  fields: BlogPostBySlug_next_fields | null;
  frontmatter: BlogPostBySlug_next_frontmatter | null;
}

export interface BlogPostBySlug {
  site: BlogPostBySlug_site | null;
  markdownRemark: BlogPostBySlug_markdownRemark | null;
  previous: BlogPostBySlug_previous | null;
  next: BlogPostBySlug_next | null;
}

export interface BlogPostBySlugVariables {
  id: string;
  previousPostId?: string | null;
  nextPostId?: string | null;
}
