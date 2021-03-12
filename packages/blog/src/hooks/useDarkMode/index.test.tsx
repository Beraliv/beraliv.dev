import { act, renderHook } from "@testing-library/react-hooks"
import { DARK_MODE_CLASSNAME, DARK_MODE_STORAGE_KEY, useDarkMode } from "."

describe("useDarkMode", () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    localStorage.clear()
    jest.resetAllMocks()
  })

  test("uses false as initial value for the first time", () => {
    const { result } = renderHook(() => useDarkMode())

    expect(result.current.darkMode).toBe(false)
  })

  test("uses false as initial value if it was false before", () => {
    localStorage.setItem(DARK_MODE_STORAGE_KEY, JSON.stringify(false))

    const { result } = renderHook(() => useDarkMode())

    expect(result.current.darkMode).toBe(false)
  })

  test("uses true as initial value if it was true before", () => {
    localStorage.setItem(DARK_MODE_STORAGE_KEY, JSON.stringify(true))

    const { result } = renderHook(() => useDarkMode())

    expect(result.current.darkMode).toBe(true)
  })

  test("updates value (undefined => true) in storage and dom if the value is changed", () => {
    const { result } = renderHook(() => useDarkMode())

    act(() => {
      result.current.toggle()
    })

    expect(JSON.parse(localStorage.getItem(DARK_MODE_STORAGE_KEY))).toBe(true)
    expect(document.body.classList.value).toBe(DARK_MODE_CLASSNAME)
  })

  test("updates value (false => true) in storage and dom if the value is changed", () => {
    localStorage.setItem(DARK_MODE_STORAGE_KEY, JSON.stringify(false))

    const { result } = renderHook(() => useDarkMode())

    act(() => {
      result.current.toggle()
    })

    expect(JSON.parse(localStorage.getItem(DARK_MODE_STORAGE_KEY))).toBe(true)
    expect(document.body.classList.value).toBe(DARK_MODE_CLASSNAME)
  })

  test("updates value (true => false) in storage and dom if the value is changed", () => {
    localStorage.setItem(DARK_MODE_STORAGE_KEY, JSON.stringify(true))

    const { result } = renderHook(() => useDarkMode())

    act(() => {
      result.current.toggle()
    })

    expect(JSON.parse(localStorage.getItem(DARK_MODE_STORAGE_KEY))).toBe(false)
    expect(document.body.classList.value).toBe("")
  })
})
