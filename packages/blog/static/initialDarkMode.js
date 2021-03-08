;(function () {
  var STORAGE_KEY = "dark"

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

  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DARK_MODE))
})()
