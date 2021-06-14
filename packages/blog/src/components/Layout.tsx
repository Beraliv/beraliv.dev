import React, { FunctionComponent } from "react"
import { Link, PageProps } from "gatsby"
import { DarkModeToggle } from "./DarkModeToggle"
import { SubscriptionForm } from "./SubscriptionForm"
import { MDXProvider } from "@mdx-js/react"
import { mdxConfig } from "./Mdx"

declare const __PATH_PREFIX__: string

interface LayoutProps {
  location: PageProps["location"]
  title: string
}

export const Layout: FunctionComponent<LayoutProps> = ({
  location,
  title,
  children,
}) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">
        {header}
        <DarkModeToggle />
      </header>
      <main>
        <MDXProvider components={mdxConfig}>{children}</MDXProvider>
      </main>
      <SubscriptionForm />
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a
          href="https://www.gatsbyjs.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Gatsby
        </a>
      </footer>
    </div>
  )
}
