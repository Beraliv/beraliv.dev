export const filterUndefined = <T>(elements: (T | undefined)[]): T[] =>
  elements.filter<T>(
    (element: T | undefined): element is T => element !== undefined
  )
