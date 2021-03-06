import React from "react"
import useDarkMode from "use-dark-mode"

export const DarkModeToggle = () => {
  const { value: isDarkMode, toggle } = useDarkMode(false, {
    classNameDark: "dark",
  })

  return (
    <input
      className="dark-mode-toggle"
      type="button"
      value={isDarkMode ? "☀" : "☾"}
      onClick={toggle}
    />
  )
}
