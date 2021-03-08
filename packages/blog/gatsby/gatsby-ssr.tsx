import { RenderBodyArgs } from "gatsby"
import React from "react"

export const onRenderBody = ({ setPreBodyComponents }: RenderBodyArgs) => {
  setPreBodyComponents([
    <script
      key="initial-dark-mode"
      type="text/javascript"
      src="/initialDarkMode.js"
    />,
  ])
}
