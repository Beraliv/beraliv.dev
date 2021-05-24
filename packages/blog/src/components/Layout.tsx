import React, { FunctionComponent } from "react"
import { Link, PageProps } from "gatsby"
// import { DarkModeToggle } from "./DarkModeToggle"
// import { SubscriptionForm } from "./SubscriptionForm"

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

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">
        <div className="global-menu">
          <Link to="/">About me</Link>
          <Link to="/">Contacts</Link>
        </div>
        {isRootPath && (
          <>
            <h1 className="main-heading">{title}</h1>
            <div className="main-description">
              frontend developer based in Munich
            </div>
          </>
        )}
        {/* <DarkModeToggle /> */}
      </header>
      <main className="global-main">{children}</main>
      {/* <SubscriptionForm /> */}
      <footer className="global-footer">
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
