/**
 * @jest-environment jsdom
 */

import { expect } from "earljs";
import { act, renderHook } from "@testing-library/react-hooks";
import { DARK_MODE_CLASSNAME, DARK_MODE_STORAGE_KEY, useDarkMode } from ".";

describe(useDarkMode.name, () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("uses false as initial value for the first time", () => {
    const { result } = renderHook(() => useDarkMode());

    expect(result.current.darkMode).toEqual(false);
  });

  it("uses false as initial value if it was false before", () => {
    localStorage.setItem(DARK_MODE_STORAGE_KEY, JSON.stringify(false));

    const { result } = renderHook(() => useDarkMode());

    expect(result.current.darkMode).toEqual(false);
  });

  it("uses true as initial value if it was true before", () => {
    localStorage.setItem(DARK_MODE_STORAGE_KEY, JSON.stringify(true));

    const { result } = renderHook(() => useDarkMode());

    expect(result.current.darkMode).toEqual(true);
  });

  it("updates value (undefined => true) in storage and dom if the value is changed", () => {
    const { result } = renderHook(() => useDarkMode());

    act(() => {
      result.current.toggle();
    });

    expect(
      JSON.parse(localStorage.getItem(DARK_MODE_STORAGE_KEY) ?? "")
    ).toEqual(true);
    expect(document.body.classList.value).toEqual(DARK_MODE_CLASSNAME);
  });

  it("updates value (false => true) in storage and dom if the value is changed", () => {
    localStorage.setItem(DARK_MODE_STORAGE_KEY, JSON.stringify(false));

    const { result } = renderHook(() => useDarkMode());

    act(() => {
      result.current.toggle();
    });

    expect(
      JSON.parse(localStorage.getItem(DARK_MODE_STORAGE_KEY) ?? "")
    ).toEqual(true);
    expect(document.body.classList.value).toEqual(DARK_MODE_CLASSNAME);
  });

  it("updates value (true => false) in storage and dom if the value is changed", () => {
    localStorage.setItem(DARK_MODE_STORAGE_KEY, JSON.stringify(true));

    const { result } = renderHook(() => useDarkMode());

    act(() => {
      result.current.toggle();
    });

    expect(
      JSON.parse(localStorage.getItem(DARK_MODE_STORAGE_KEY) ?? "")
    ).toEqual(false);
    expect(document.body.classList.value).toEqual("");
  });

  it("obtains correctly after remount value (false)", () => {
    localStorage.setItem(DARK_MODE_STORAGE_KEY, JSON.stringify(false));

    const { result: firstComponentResult, unmount } = renderHook(() =>
      useDarkMode()
    );

    const darkModeBefore = firstComponentResult.current.darkMode;

    unmount();

    const { result: secondComponentResult } = renderHook(() => useDarkMode());

    expect(secondComponentResult.current.darkMode).toEqual(darkModeBefore);
  });

  it("obtains correctly after remount value (true)", () => {
    localStorage.setItem(DARK_MODE_STORAGE_KEY, JSON.stringify(true));

    const { result: firstComponentResult, unmount } = renderHook(() =>
      useDarkMode()
    );

    const darkModeBefore = firstComponentResult.current.darkMode;

    unmount();

    const { result: secondComponentResult } = renderHook(() => useDarkMode());

    expect(secondComponentResult.current.darkMode).toEqual(darkModeBefore);
  });
});
