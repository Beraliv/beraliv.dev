import React, { FunctionComponent, useCallback } from "react"
import { Link, PageProps } from "gatsby"
import { ScrollUp } from "./ScrollUp"
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

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [])

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
        <div className="global-menu">
          <div className="scroll-up-container">
            <ScrollUp onClick={scrollToTop} />
          </div>
          <Link to="/">About me</Link>
          <Link to="/">Contacts</Link>
        </div>
        <p className="footer-heading">{title}</p>
      </footer>
    </div>
  )
}
