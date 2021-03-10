import { RenderBodyArgs } from "gatsby"
import React from "react"

export const onRenderBody = ({ setPreBodyComponents }: RenderBodyArgs) => {
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
