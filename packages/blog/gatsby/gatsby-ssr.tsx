import React from "react"
import { RenderBodyArgs } from "gatsby"
import { INITIAL_DARK_MODE } from "../src/hooks/useDarkMode"

export const onRenderBody = ({ setPreBodyComponents }: RenderBodyArgs) => {
  if (INITIAL_DARK_MODE) {
    setPreBodyComponents([
      <script
        key="initial-dark-mode"
        type="text/javascript"
        src="/initialDarkMode.js"
      />,
    ])
  }
}
