import React from "react"

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([
    <script
      key="initial-dark-mode"
      type="text/javascript"
      src="/initialDarkMode.js"
    />,
  ])
}
