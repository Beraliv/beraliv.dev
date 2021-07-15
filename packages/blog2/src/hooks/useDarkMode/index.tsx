import { useCallback, useState } from "react"

export const DARK_MODE_STORAGE_KEY = "dark"
export const DARK_MODE_CLASSNAME = "dark"

export const getInitialDarkMode = () => {
  try {
    const persistedDarkMode = localStorage.getItem(DARK_MODE_STORAGE_KEY)
    if (persistedDarkMode === null) {
      return false
    }

    return JSON.parse(persistedDarkMode)
  } catch (error) {
    return false
  }
}

const updateStorage = (darkMode: boolean) => {
  localStorage.setItem(DARK_MODE_STORAGE_KEY, JSON.stringify(darkMode))
}

const updateDom = (darkMode: boolean) => {
  document.body.classList.toggle(DARK_MODE_CLASSNAME, darkMode)
}

type UseDarkModeReturnValue = {
  darkMode: boolean
  toggle: VoidFunction
}

export const useDarkMode = (): UseDarkModeReturnValue => {
  const [darkMode, setDarkMode] = useState(getInitialDarkMode())

  const toggle = useCallback(() => {
    const nextDarkMode = !darkMode
    updateStorage(nextDarkMode)
    updateDom(nextDarkMode)
    setDarkMode(nextDarkMode)
  }, [darkMode, setDarkMode])

  return { darkMode, toggle }
}
