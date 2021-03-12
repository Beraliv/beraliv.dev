import { useCallback, useLayoutEffect, useState } from "react"

const STORAGE_KEY = "dark"
const CLASSNAME = "dark"

export const INITIAL_DARK_MODE = (() => {
  try {
    const persistedDarkMode = localStorage.getItem(STORAGE_KEY)
    if (persistedDarkMode === null) {
      return false
    }

    return JSON.parse(persistedDarkMode)
  } catch (error) {
    return false
  }
})()

const updateStorage = (darkMode: boolean) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(darkMode))
}

const updateDom = (darkMode: boolean) => {
  document.body.classList.toggle(CLASSNAME, darkMode)
}

type UseDarkModeReturnValue = {
  darkMode: boolean
  toggle: VoidFunction
}

export const useDarkMode = (): UseDarkModeReturnValue => {
  const [darkMode, setDarkMode] = useState(INITIAL_DARK_MODE)

  const toggle = useCallback(() => {
    const nextDarkMode = !darkMode
    updateStorage(nextDarkMode)
    updateDom(nextDarkMode)
    setDarkMode(nextDarkMode)
  }, [darkMode, setDarkMode])

  return { darkMode, toggle }
}
