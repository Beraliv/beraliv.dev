import React from "react"
import { useDarkMode } from "../hooks/useDarkMode"

export const DarkModeToggle = () => {
  const { darkMode, toggle } = useDarkMode()

  return (
    <input
      className="dark-mode-toggle"
      type="button"
      value={darkMode ? "☀" : "☾"}
      onClick={toggle}
    />
  )
}
