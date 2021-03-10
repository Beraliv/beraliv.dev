import { RenderBodyArgs } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"

export const onRenderBody = ({
  setHtmlAttributes,
  setBodyAttributes,
  setHeadComponents,
  setPreBodyComponents,
}: RenderBodyArgs) => {
  const helmet = Helmet.renderStatic()
  setHtmlAttributes(helmet.htmlAttributes.toComponent())
  setBodyAttributes(helmet.bodyAttributes.toComponent())
  setHeadComponents([
    helmet.title.toComponent(),
    helmet.link.toComponent(),
    helmet.meta.toComponent(),
    helmet.noscript.toComponent(),
    helmet.script.toComponent(),
    helmet.style.toComponent(),
  ])

  setPreBodyComponents([
    <script
      key="initial-dark-mode"
      type="text/javascript"
      dangerouslySetInnerHTML={{
        __html: `
          ;(function () {
            var STORAGE_KEY = "dark"
            var CLASSNAME = "dark"
          
            var INITIAL_DARK_MODE = (() => {
              try {
                var persistedDarkMode = localStorage.getItem(STORAGE_KEY)
                if (persistedDarkMode === null) {
                  return false
                }
          
                return JSON.parse(persistedDarkMode)
              } catch (error) {
                return false
              }
            })()
          
            document.body.classList.toggle(CLASSNAME, INITIAL_DARK_MODE)
          })()
        `,
      }}
    />,
  ])
}
